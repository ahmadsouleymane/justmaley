/**
 * config.js — chargement de la configuration du scraper.
 *
 * Centralise tout ce qui est paramétrable (variables d'environnement + fichier
 * de requêtes) afin que le reste du code ne dépende pas de chemins ou de valeurs
 * en dur.
 */

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Racine du projet = dossier parent de src/.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const RACINE = path.resolve(__dirname, '..');

/**
 * Lit une variable d'environnement et la convertit en entier, avec repli.
 * @param {string} nom - Nom de la variable.
 * @param {number} defaut - Valeur par défaut si absente ou invalide.
 * @returns {number}
 */
function entierEnv(nom, defaut) {
  const brut = process.env[nom];
  if (brut === undefined || brut === '') return defaut;
  const valeur = Number.parseInt(brut, 10);
  return Number.isNaN(valeur) ? defaut : valeur;
}

/** @typedef {Object} ConfigScraper */
/**
 * @returns {ConfigScraper} Config globale, alimentée par .env (via dotenv).
 */
export function chargerConfig() {
  return {
    headless: process.env.HEADLESS === '1',
    // Nombre de pages ouvertes en parallèle pour extraire les fiches (vitesse).
    concurrence: entierEnv('CONCURRENCE', 3),
    // Mode rapide (délais réduits) — à activer délibérément.
    rapide: process.env.MODE_RAPIDE === '1',
    viewport: {
      width: entierEnv('VIEWPORT_WIDTH', 1440),
      height: entierEnv('VIEWPORT_HEIGHT', 900),
    },
    navTimeoutMs: entierEnv('NAV_TIMEOUT_MS', 30000),
    delaiFiche: {
      min: entierEnv('DELAI_FICHE_MIN_MS', 1200),
      max: entierEnv('DELAI_FICHE_MAX_MS', 3000),
    },
    delaiScroll: {
      min: entierEnv('DELAI_SCROLL_MIN_MS', 800),
      max: entierEnv('DELAI_SCROLL_MAX_MS', 2200),
    },
    pauseLongue: {
      min: entierEnv('PAUSE_LONGUE_MIN_MS', 15000),
      max: entierEnv('PAUSE_LONGUE_MAX_MS', 40000),
    },
    outputDir: path.resolve(RACINE, process.env.OUTPUT_DIR || 'data/output'),
    checkpointDir: path.resolve(RACINE, 'data/checkpoints'),
  };
}

/**
 * Active le mode rapide : réduit les délais anti-détection pour aller plus vite.
 * Le risque de blocage (CAPTCHA) augmente en proportion. Utilisé par le CLI
 * (`--rapide`) et par l'interface web (case « Mode rapide »).
 *
 * @param {ConfigScraper} config - Config globale (mutée sur place).
 * @returns {ConfigScraper}
 */
export function appliquerModeRapide(config) {
  config.rapide = true;
  config.delaiFiche = { min: 300, max: 700 };
  config.delaiScroll = { min: 300, max: 600 };
  config.pauseLongue = { min: 4000, max: 8000 };
  return config;
}

/**
 * Charge et valide la liste des requêtes depuis config/requetes.json.
 *
 * @returns {Array<{requete: string, categorie: string, max: number}>}
 * @throws {Error} si le fichier est absent ou mal formé.
 */
export function chargerRequetes() {
  const chemin = path.resolve(RACINE, 'config', 'requetes.json');
  if (!existsSync(chemin)) {
    throw new Error(`Fichier de requêtes introuvable : ${chemin}`);
  }

  let contenu;
  try {
    contenu = JSON.parse(readFileSync(chemin, 'utf8'));
  } catch (err) {
    throw new Error(`config/requetes.json n'est pas du JSON valide : ${err.message}`);
  }

  if (!Array.isArray(contenu)) {
    throw new Error('config/requetes.json doit contenir un tableau d\'objets.');
  }

  return contenu.map((entree, index) => {
    const requete = typeof entree.requete === 'string' ? entree.requete.trim() : '';
    const categorie = typeof entree.categorie === 'string' ? entree.categorie.trim() : '';
    const max = Number.isFinite(entree.max) && entree.max > 0 ? Math.floor(entree.max) : 0;

    if (!requete || !categorie) {
      throw new Error(`Entrée ${index} invalide dans config/requetes.json (requete/categorie requis).`);
    }
    return { requete, categorie, max };
  });
}

/**
 * Construit l'URL de recherche Google Maps pour une requête donnée.
 * L'encodage est volontairement effectué ici pour garder une URL lisible et sûre.
 *
 * @param {string} requete - Texte libre de la recherche.
 * @returns {string} URL complète prête à naviguer.
 */
export function urlRecherche(requete) {
  const encodée = encodeURIComponent(requete);
  return `https://www.google.com/maps/search/${encodée}?hl=fr&gl=ne`;
}
