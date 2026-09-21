/**
 * server.js — serveur web (interface de pilotage du scraper).
 *
 * S'appuie sur node:http (aucune dépendance supplémentaire) pour :
 *   - servir le frontend statique de public/,
 *   - exposer une petite API REST (requêtes, résultats, exports),
 *   - relayer la progression du scraper en temps réel via Server-Sent Events,
 *   - lancer/arrêter une session de scraping.
 *
 * Le scraping s'exécute dans le même processus (outil local), un seul job à la
 * fois pour rester simple et prévisible.
 */

import 'dotenv/config';
import { createServer } from 'node:http';
import { readFile, readdir } from 'node:fs/promises';
import { existsSync, createReadStream, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { RACINE, chargerConfig, chargerRequetes, appliquerModeRapide } from './config.js';
import { scraperTout } from './scraper.js';
import { emetteur, etat } from './emetteur.js';
import { lireCsvProspects } from './storage.js';
import { initialiserLogger } from './logger.js';
import * as log from './logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOSSIER_PUBLIC = path.resolve(__dirname, '..', 'public');

const config = chargerConfig();
initialiserLogger(config.outputDir);

/** Clients SSE connectés (une entrée = une réponse HTTP maintenue ouverte). */
const clientsSse = new Set();

/** Indique qu'un scraping est déjà en cours. */
let enCours = false;

/**
 * Types MIME pour le frontend statique.
 */
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.map': 'application/json',
};

/* ------------------------------------------------------------------ */
/* Utilitaires HTTP                                                     */
/* ------------------------------------------------------------------ */

/**
 * Envoie une réponse JSON.
 * @param {import('node:http').ServerResponse} res
 * @param {number} code - Code HTTP.
 * @param {unknown} donnees - Objet à sérialiser.
 */
function repondreJson(res, code, donnees) {
  const corps = JSON.stringify(donnees);
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(corps),
  });
  res.end(corps);
}

/**
 * Lit le corps d'une requête (JSON attendu).
 * @param {import('node:http').IncomingMessage} req
 * @returns {Promise<unknown>} Objet parsé, ou {} si corps vide/invalide.
 */
function lireCorpsJson(req) {
  return new Promise((resolve) => {
    let brut = '';
    req.on('data', (morceau) => {
      brut += morceau;
    });
    req.on('end', () => {
      if (!brut) return resolve({});
      try {
        resolve(JSON.parse(brut));
      } catch {
        resolve({});
      }
    });
  });
}

/**
 * Sert un fichier statique depuis public/ (avec garde contre le path traversal).
 * @param {import('node:http').ServerResponse} res
 * @param {string} cheminUrl - Chemin demandé (ex: /style.css).
 */
async function servirStatique(res, cheminUrl) {
  const relatif = cheminUrl === '/' ? 'index.html' : cheminUrl.replace(/^\/+/, '');
  const chemin = path.resolve(DOSSIER_PUBLIC, relatif);

  // La cible doit rester dans public/ pour interdire toute lecture hors périmètre.
  if (!chemin.startsWith(DOSSIER_PUBLIC + path.sep) || !existsSync(chemin)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 — introuvable');
    return;
  }

  const extension = path.extname(chemin).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME[extension] || 'application/octet-stream' });
  res.end(await readFile(chemin));
}

/* ------------------------------------------------------------------ */
/* API : requêtes, résultats, exports                                   */
/* ------------------------------------------------------------------ */

/** @returns {Promise<Array<{date: string, nbFiches: number}>>} */
async function listerRuns() {
  if (!existsSync(config.outputDir)) return [];
  // On lit le CSV (écrit en continu pendant le scraping), pas le JSON (écrit
  // seulement à la fin) : ainsi les résultats sont visibles en temps réel.
  const fichiers = (await readdir(config.outputDir)).filter((f) =>
    /^prospects_\d{4}-\d{2}-\d{2}\.csv$/.test(f)
  );
  const runs = [];
  for (const fichier of fichiers) {
    const date = fichier.slice(10, 20); // "prospects_" = 10 car. puis AAAA-MM-JJ
    runs.push({ date, nbFiches: lireCsvProspects(path.join(config.outputDir, fichier)).length });
  }
  return runs.sort((a, b) => b.date.localeCompare(a.date));
}

/** @param {string} date - Date au format AAAA-MM-JJ. */
function validerDate(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date || '');
}

/**
 * Charge le résultat de la vérification WhatsApp (produit par
 * scripts/verifier-whatsapp.js). Renvoie un objet vide si absente.
 * @returns {Object<string, {wa: boolean, profil: string, date: string}>}
 */
function chargerVerificationsWhatsapp() {
  const chemin = path.join(config.outputDir, 'whatsapp_verifie.json');
  if (!existsSync(chemin)) return {};
  try {
    return JSON.parse(readFileSync(chemin, 'utf8'));
  } catch {
    return {};
  }
}

/**
 * Route les appels API et renvoie `true` si la requête a été traitée.
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 * @param {URL} url - URL parsée.
 * @returns {Promise<boolean>}
 */
async function routerApi(req, res, url) {
  const chemin = url.pathname;

  // Liste des requêtes de la config (pour le formulaire).
  if (req.method === 'GET' && chemin === '/api/requetes') {
    repondreJson(res, 200, { requetes: chargerRequetes() });
    return true;
  }

  // Liste des runs (dates + nombre de fiches).
  if (req.method === 'GET' && chemin === '/api/resultats') {
    repondreJson(res, 200, { runs: await listerRuns() });
    return true;
  }

  // Contenu d'un run donné (lu depuis le CSV, à jour en temps réel).
  const matchRun = chemin.match(/^\/api\/resultats\/(\d{4}-\d{2}-\d{2})$/);
  if (req.method === 'GET' && matchRun) {
    const date = matchRun[1];
    const cheminCsv = path.join(config.outputDir, `prospects_${date}.csv`);
    if (!existsSync(cheminCsv)) {
      repondreJson(res, 404, { erreur: 'Aucun résultat pour cette date.' });
      return true;
    }
    repondreJson(res, 200, { date, prospects: lireCsvProspects(cheminCsv) });
    return true;
  }

  // État de la vérification WhatsApp (numéro → présence sur WhatsApp).
  if (req.method === 'GET' && chemin === '/api/whatsapp') {
    repondreJson(res, 200, { verifications: chargerVerificationsWhatsapp() });
    return true;
  }

  // Export CSV/JSON (téléchargement).
  if (req.method === 'GET' && chemin === '/api/export') {
    const type = url.searchParams.get('type');
    const date = url.searchParams.get('date');
    if (!validerDate(date) || !['csv', 'json'].includes(type)) {
      repondreJson(res, 400, { erreur: 'Paramètres type/date invalides.' });
      return true;
    }
    const fichier = path.join(config.outputDir, `prospects_${date}.${type}`);
    if (!existsSync(fichier)) {
      repondreJson(res, 404, { erreur: 'Fichier introuvable.' });
      return true;
    }
    const contentType = type === 'csv'
      ? 'text/csv; charset=utf-8'
      : 'application/json; charset=utf-8';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="prospects_${date}.${type}"`,
    });
    createReadStream(fichier).pipe(res);
    return true;
  }

  // Lancement d'un scraping.
  if (req.method === 'POST' && chemin === '/api/scrape') {
    if (enCours) {
      repondreJson(res, 409, { erreur: 'Un scraping est déjà en cours.' });
      return true;
    }
    const corps = await lireCorpsJson(req);
    const taches = preparerTaches(corps);
    if (taches.length === 0) {
      repondreJson(res, 400, { erreur: 'Aucune requête sélectionnée.' });
      return true;
    }
    demarrerScrape(taches, corps);
    repondreJson(res, 202, { statut: 'demarre' });
    return true;
  }

  // Arrêt du scraping en cours.
  if (req.method === 'POST' && chemin === '/api/scrape/stop') {
    etat.annule = true;
    log.info('Demande d\'arrêt reçue.');
    repondreJson(res, 200, { statut: 'arretDemande' });
    return true;
  }

  return false;
}

/**
 * Filtre et adapte les tâches à partir du corps de la requête HTTP.
 * @param {unknown} corps - Corps JSON de la requête POST /api/scrape.
 * @returns {Array<{requete: string, categorie: string, max: number}>}
 */
function preparerTaches(corps) {
  const categories = Array.isArray(corps.categories) && corps.categories.length
    ? corps.categories.map((c) => String(c).toLowerCase())
    : null;

  let taches = chargerRequetes();
  if (categories) {
    taches = taches.filter((t) => categories.includes(t.categorie.toLowerCase()));
  }
  if (corps.max !== undefined && Number.isFinite(corps.max) && corps.max > 0) {
    taches = taches.map((t) => ({ ...t, max: Math.floor(corps.max) }));
  }
  return taches;
}

/**
 * Lance le scraping en arrière-plan (un seul job à la fois, géré par l'appelant).
 * @param {Array<{requete: string, categorie: string, max: number}>} taches - Tâches filtrées.
 * @param {unknown} corps - Corps JSON de la requête POST /api/scrape.
 */
function demarrerScrape(taches, corps) {
  // En mode web, le navigateur est headless par défaut (l'utilisateur regarde
  // le tableau de bord, pas une fenêtre). Option "navigateurVisible" = headful.
  const navigateurVisible = corps.navigateurVisible === true;
  config.headless = !navigateurVisible;

  // Vitesse : nombre de pages en parallèle + mode rapide (délais réduits).
  if (Number.isFinite(corps.concurrence) && corps.concurrence >= 1) {
    config.concurrence = Math.floor(corps.concurrence);
  }
  if (corps.rapide === true) {
    appliquerModeRapide(config);
  } else if (corps.rapide === false) {
    config.rapide = false;
  }

  enCours = true;
  etat.annule = false;
  log.info(
    `Lancement : ${taches.length} requête(s) ` +
    `(concurrence ${config.concurrence}${config.rapide ? ', mode rapide' : ''}).`
  );

  scraperTout(config, taches, corps.resume === true)
    .catch((err) => {
      log.erreur(`Erreur de scraping : ${err.stack || err.message}`);
      emetteur.emit('erreur', { message: err.message });
    })
    .finally(() => {
      enCours = false;
      emetteur.emit('etat', { enCours: false });
    });
}

/* ------------------------------------------------------------------ */
/* SSE : diffusion de la progression                                    */
/* ------------------------------------------------------------------ */

/**
 * Diffuse un événement SSE à tous les clients connectés.
 * @param {string} type - Nom de l'événement.
 * @param {unknown} donnees - Contenu sérialisé.
 */
function diffuser(type, donnees) {
  const charge = JSON.stringify(donnees);
  for (const res of clientsSse) {
    res.write(`event: ${type}\ndata: ${charge}\n\n`);
  }
}

// Abonnement unique aux événements du scraper, retransmis tels quels au web.
const TYPES_EVENEMENTS = [
  'debut',
  'log',
  'fiche',
  'requete:debut',
  'requete:fin',
  'fin',
  'erreur',
  'etat',
];
for (const type of TYPES_EVENEMENTS) {
  emetteur.on(type, (donnees) => diffuser(type, donnees));
}

/** Gère une nouvelle connexion SSE. */
function connexionSse(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.write(`event: etat\ndata: ${JSON.stringify({ enCours })}\n\n`);
  clientsSse.add(res);

  req.on('close', () => {
    clientsSse.delete(res);
  });
}

/* ------------------------------------------------------------------ */
/* Serveur                                                              */
/* ------------------------------------------------------------------ */

const PORT = Number.parseInt(process.env.PORT || '3000', 10);

const serveur = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  // Flux temps réel.
  if (url.pathname === '/api/events') {
    connexionSse(req, res);
    return;
  }

  // API JSON / exports.
  if (url.pathname.startsWith('/api/')) {
    const traite = await routerApi(req, res, url).catch((err) => {
      log.erreur(`Erreur API : ${err.stack || err.message}`);
      repondreJson(res, 500, { erreur: 'Erreur interne.' });
      return true;
    });
    if (traite) return;
    repondreJson(res, 404, { erreur: 'Route inconnue.' });
    return;
  }

  // Frontend statique.
  await servirStatique(res, url.pathname);
});

serveur.listen(PORT, () => {
  log.info(`Interface web disponible sur http://localhost:${PORT}`);
});
