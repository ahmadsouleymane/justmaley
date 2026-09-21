/**
 * scraper.js — logique Playwright : navigation, scroll, extraction des fiches.
 *
 * Ce module orchestre le navigateur Chromium et délègue l'extraction pure au
 * module extractors.js. L'extraction des fiches est parallélisée (pool de pages)
 * pour aller plus vite ; la robustesse anti-détection et anti-échec reste :
 * délais aléatoires, timeouts explicites, reprise sur erreur par fiche.
 */

import { chromium } from 'playwright';
import {
  extraireAdresse,
  extraireCoordonnees,
  extraireHoraires,
  extraireNombreAvis,
  extraireNote,
  extraireSiteWeb,
  extraireTelephone,
} from './extractors.js';
import { urlRecherche } from './config.js';
import {
  cleDedup,
  Stockage,
  chargerCheckpoint,
  sauvegarderCheckpoint,
} from './storage.js';
import { emetteur, etat } from './emetteur.js';
import * as log from './logger.js';

/** User-Agent réaliste d'un Chrome récent sur macOS (cohérent avec le viewport). */
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

/**
 * Pause aléatoire entre deux bornes (millisecondes).
 * @param {number} min - Borne basse incluse.
 * @param {number} max - Borne haute incluse.
 * @returns {Promise<void>}
 */
export function sleep(min, max) {
  const duree = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, duree));
}

/**
 * Lance le navigateur avec un contexte durci, et ouvre un pool de pages
 * (une page de recherche + `concurrence - 1` pages de travail).
 *
 * @param {import('./config.js').ConfigScraper} config - Config globale.
 * @returns {Promise<{browser: import('playwright').Browser, context: import('playwright').BrowserContext, pages: import('playwright').Page[]}>}
 */
export async function demarrerNavigateur(config) {
  const browser = await chromium.launch({
    headless: config.headless,
    args: ['--disable-blink-features=AutomationControlled'],
  });

  const context = await browser.newContext({
    locale: 'fr-FR',
    timezoneId: 'Africa/Niamey',
    userAgent: USER_AGENT,
    viewport: config.viewport,
  });

  // Supprime les marqueurs d'automatisation exposés par Playwright.
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    Object.defineProperty(navigator, 'plugins', {
      get: () => [1, 2, 3, 4, 5],
    });
    Object.defineProperty(navigator, 'languages', {
      get: () => ['fr-FR', 'fr', 'en-US', 'en'],
    });
    // Restaure un chrome cohérent (ruse classique mais peu coûteuse).
    window.chrome = window.chrome || { runtime: {} };
  });

  const pages = [];
  const total = Math.max(1, config.concurrence);
  for (let i = 0; i < total; i++) {
    const page = await context.newPage();
    page.setDefaultTimeout(config.navTimeoutMs);
    pages.push(page);
  }

  return { browser, context, pages };
}

/**
 * Gère l'éventuel bandeau de consentement cookies.
 * @param {import('playwright').Page} page - Page Playwright.
 * @returns {Promise<void>}
 */
async function accepterCookies(page) {
  const selecteurs = [
    'button:has-text("Tout accepter")',
    'button:has-text("Accept all")',
    'button:has-text("Accepter")',
    'button:has-text("J\'accepte")',
  ];
  for (const selecteur of selecteurs) {
    try {
      const bouton = page.locator(selecteur).first();
      if ((await bouton.count()) > 0) {
        await bouton.click({ timeout: 5000 });
        log.info('Consentement cookies accepté.');
        return;
      }
    } catch {
      // Le bouton a pu disparaître entre la détection et le clic.
    }
  }
}

/**
 * Scrolle le panneau de résultats comme un humain jusqu'à un nombre cible
 * de fiches ou jusqu'à la fin de la liste.
 *
 * @param {import('playwright').Page} page - Page Playwright.
 * @param {number} cible - Nombre de fiches souhaité.
 * @param {string} selecteurFin - Sélecteur de l'élément feed à scroller.
 * @param {{min: number, max: number}} delai - Délai aléatoire entre scrolls.
 * @returns {Promise<void>}
 */
async function scrollerResultats(page, cible, selecteurFin, delai) {
  let dernierNombre = 0;
  let toursSansProgres = 0;

  // On scrolle jusqu'à atteindre la cible ou 3 tours sans nouveau résultat.
  for (let tour = 0; tour < 200; tour++) {
    if (etat.annule) return;

    const liens = page.locator('a[href*="/maps/place/"]');
    const nombre = await liens.count();

    if (nombre >= cible) return;

    // Fin de liste détectée via le message standard de Google Maps.
    const finVisible = await page
      .locator('text=Vous avez atteint la fin de la liste')
      .count();
    if (finVisible > 0) {
      log.info('Fin de liste atteinte.');
      return;
    }

    if (nombre === dernierNombre) {
      toursSansProgres++;
    } else {
      toursSansProgres = 0;
    }
    dernierNombre = nombre;

    if (toursSansProgres >= 3) {
      log.info('Aucun nouveau résultat après plusieurs scrolls, arrêt.');
      return;
    }

    // Scroll humain : molette avec un delta aléatoire.
    await page.mouse.move(700, 450);
    await page.mouse.wheel(0, 400 + Math.floor(Math.random() * 400));
    await sleep(delai.min, delai.max);
  }
}

/**
 * Récupère la liste des liens de fiches (URL + nom) visibles dans le feed.
 * @param {import('playwright').Page} page - Page Playwright.
 * @returns {Promise<Array<{url: string, nom: string}>>}
 */
async function listerFiches(page) {
  const liens = page.locator('a[href*="/maps/place/"]');
  const nombre = await liens.count();
  const fiches = [];
  const vus = new Set();

  for (let i = 0; i < nombre; i++) {
    try {
      const href = await liens.nth(i).getAttribute('href');
      if (!href) continue;
      const url = new URL(href, 'https://www.google.com').href;
      if (vus.has(url)) continue;
      vus.add(url);
      const nom = (await liens.nth(i).getAttribute('aria-label')) || '';
      fiches.push({ url, nom });
    } catch {
      // Une fiche illisible ne doit pas bloquer la liste.
    }
  }
  return fiches;
}

/**
 * Extrait tous les champs d'une fiche détail.
 * @param {import('playwright').Page} page - Page Playwright (déjà sur la fiche).
 * @param {string} nom - Nom issu du listing (repli si non trouvé sur la page).
 * @param {string} categorie - Catégorie de la requête.
 * @param {string} requete - Requête source.
 * @param {string} url - URL de la fiche.
 * @returns {Promise<Prospect>}
 */
async function extraireFiche(page, nom, categorie, requete, url) {
  // Attendre qu'un champ caractéristique de la page détail soit chargé.
  await page
    .waitForSelector('h1, button[data-item-id="address"], [data-item-id="phone"]', {
      timeout: 10000,
    })
    .catch(() => {});

  const nomPage = (await page.locator('h1').first().innerText().catch(() => '')) || nom;
  const { latitude, longitude } = extraireCoordonnees(url);

  const [adresse, telephone, siteWeb, note, nbAvis, horaires] = await Promise.all([
    extraireAdresse(page),
    extraireTelephone(page),
    extraireSiteWeb(page),
    extraireNote(page),
    extraireNombreAvis(page),
    extraireHoraires(page),
  ]);

  return {
    nom: nomPage.trim(),
    categorie,
    adresse,
    telephone,
    site_web: siteWeb,
    note,
    nb_avis: nbAvis,
    horaires,
    url_maps: url,
    latitude,
    longitude,
    requete_source: requete,
    date_scraping: new Date().toISOString(),
  };
}

/**
 * Ouvre une fiche détail, l'extrait et l'enregistre (déduplication + checkpoint).
 * Ne lève jamais : une fiche qui échoue renvoie `null`.
 *
 * @param {import('playwright').Page} page - Page de travail.
 * @param {{url: string, nom: string}} fiche - Fiche à traiter.
 * @param {{requete: string, categorie: string, max: number}} tache - Requête en cours.
 * @param {import('./storage.js').Stockage} stockage - Stockage en flux.
 * @param {Set<string>} dejaTraites - Clés déjà traitées (resume).
 * @param {import('./config.js').ConfigScraper} config - Config globale.
 * @returns {Promise<{nom: string, telephone: string}|null>} Infos si ajoutée, sinon null.
 */
async function traiterFiche(page, fiche, tache, stockage, dejaTraites, config) {
  const { url: urlFiche, nom } = fiche;

  try {
    // Navigation avec retry (2 tentatives) en cas de timeout.
    let chargee = false;
    for (let tentative = 0; tentative < 3 && !chargee; tentative++) {
      try {
        await page.goto(urlFiche, {
          waitUntil: 'domcontentloaded',
          timeout: config.navTimeoutMs,
        });
        chargee = true;
      } catch {
        log.warn(`Timeout navigation fiche (tentative ${tentative + 1}/3) : ${nom}`);
        await sleep(800, 1500);
      }
    }
    if (!chargee) {
      log.warn(`Fiche ignorée (3 échecs de navigation) : ${nom}`);
      return null;
    }

    const prospect = await extraireFiche(page, nom, tache.categorie, tache.requete, urlFiche);
    const cle = cleDedup(prospect);

    if (dejaTraites.has(cle)) {
      log.info(`Déjà traitée (resume) : ${prospect.nom}`);
      return null;
    }

    if (!stockage.ajouter(prospect)) {
      return null; // doublon intra-session.
    }

    dejaTraites.add(cle);
    // Checkpoint immédiat : en cas d'arrêt/crash, la fiche ne sera pas
    // ré-extraite au prochain --resume (évite les doublons dans le CSV).
    sauvegarderCheckpoint(config.checkpointDir, tache.categorie, dejaTraites);
    return { nom: prospect.nom, telephone: prospect.telephone };
  } catch (err) {
    // Une fiche qui échoue n'arrête jamais le script.
    log.warn(`Erreur sur fiche "${nom}" : ${err.message}`);
    return null;
  }
}

/**
 * Traite un lot de fiches en parallèle avec un pool de pages.
 * Chaque page « ouvrier » pioche la prochaine fiche libre et l'extrait.
 *
 * @param {import('playwright').Page[]} pages - Pool de pages.
 * @param {Array<{url: string, nom: string}>} fiches - Fiches à traiter.
 * @param {{requete: string, categorie: string, max: number}} tache - Requête.
 * @param {import('./storage.js').Stockage} stockage - Stockage en flux.
 * @param {Set<string>} dejaTraites - Clés déjà traitées.
 * @param {import('./config.js').ConfigScraper} config - Config globale.
 * @returns {Promise<number>} Nombre de fiches nouvellement extraites.
 */
async function traiterLot(pages, fiches, tache, stockage, dejaTraites, config) {
  const total = fiches.length;
  let suivant = 0;   // index de la prochaine fiche à distribuer.
  let traitees = 0;  // compteur global (pour la progression et la pause longue).

  async function ouvrier(pageOuvriere) {
    while (true) {
      if (etat.annule) break;
      const index = suivant++;
      if (index >= total) break;

      const resultat = await traiterFiche(pageOuvriere, fiches[index], tache, stockage, dejaTraites, config);
      if (resultat) {
        traitees++;
        log.info(`[${traitees}/${total}] ${resultat.nom} — tel:${resultat.telephone || '—'}`);
        emetteur.emit('fiche', {
          categorie: tache.categorie,
          index: traitees,
          total,
          nom: resultat.nom,
          telephone: resultat.telephone,
        });
      }

      await sleep(config.delaiFiche.min, config.delaiFiche.max);

      // Pause longue toutes les 20 fiches (un seul ouvrier pause à la fois).
      if (traitees > 0 && traitees % 20 === 0) {
        log.info('Pause longue pour limiter la détection…');
        await sleep(config.pauseLongue.min, config.pauseLongue.max);
      }
    }
  }

  await Promise.all(pages.map((p) => ouvrier(p)));
  return traitees;
}

/**
 * Scrape une requête complète et alimente le stockage.
 *
 * @param {import('playwright').Page[]} pages - Pool de pages (pages[0] = recherche).
 * @param {{requete: string, categorie: string, max: number}} tache - Requête à traiter.
 * @param {import('./storage.js').Stockage} stockage - Stockage en flux.
 * @param {Set<string>} dejaTraites - Clés déjà traitées (resume).
 * @param {import('./config.js').ConfigScraper} config - Config globale.
 * @returns {Promise<number>} Nombre de fiches nouvellement extraites.
 */
export async function scraperRequete(pages, tache, stockage, dejaTraites, config) {
  const pageRecherche = pages[0];
  const url = urlRecherche(tache.requete);
  log.info(`Recherche : "${tache.requete}" (max ${tache.max})`);

  await pageRecherche.goto(url, { waitUntil: 'domcontentloaded', timeout: config.navTimeoutMs });
  await accepterCookies(pageRecherche);

  // Attendre le panneau de résultats (feed) — sélecteur stable de Google Maps.
  await pageRecherche
    .waitForSelector('div[role="feed"]', { timeout: config.navTimeoutMs })
    .catch(() => log.warn('Feed introuvable, tentative de poursuite.'));

  await scrollerResultats(pageRecherche, tache.max, 'div[role="feed"]', config.delaiScroll);
  const fiches = await listerFiches(pageRecherche);
  log.info(`${fiches.length} fiche(s) détectée(s) dans le feed.`);

  const lot = fiches.slice(0, Math.min(tache.max, fiches.length));
  return traiterLot(pages, lot, tache, stockage, dejaTraites, config);
}

/**
 * Scrape toutes les requêtes demandées et ferme proprement le navigateur.
 *
 * @param {import('./config.js').ConfigScraper} config - Config globale.
 * @param {Array<{requete: string, categorie: string, max: number}>} taches - Requêtes.
 * @param {boolean} resume - Reprendre depuis les checkpoints.
 * @returns {Promise<Array<{tache: Object, extraites: number, telephones: number}>>}
 */
export async function scraperTout(config, taches, resume) {
  const { browser, pages } = await demarrerNavigateur(config);
  const dateIso = new Date().toISOString().slice(0, 10);
  const stockage = new Stockage(config.outputDir, dateIso);

  const resultats = [];
  emetteur.emit('debut', { total: taches.length });

  try {
    for (const tache of taches) {
      emetteur.emit('requete:debut', {
        categorie: tache.categorie,
        requete: tache.requete,
        max: tache.max,
      });

      const dejaTraites = resume
        ? chargerCheckpoint(config.checkpointDir, tache.categorie)
        : new Set();

      const extraites = await scraperRequete(pages, tache, stockage, dejaTraites, config);

      const telephones = stockage.fiches.filter(
        (f) => f.requete_source === tache.requete && f.telephone
      ).length;

      resultats.push({ tache, extraites, telephones });
      sauvegarderCheckpoint(config.checkpointDir, tache.categorie, dejaTraites);
      emetteur.emit('requete:fin', { categorie: tache.categorie, extraites, telephones });
    }
  } finally {
    stockage.finaliserJson();
    await browser.close();
  }

  emetteur.emit('fin', {
    resultats,
    cheminCsv: stockage.cheminCsv,
    cheminJson: stockage.cheminJson,
    dateIso,
  });
  return resultats;
}
