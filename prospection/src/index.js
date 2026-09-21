/**
 * index.js — point d'entrée CLI.
 *
 * Parse les arguments, charge la configuration, sélectionne les requêtes à
 * traiter, orchestre le scraping et affiche un résumé final.
 */

import 'dotenv/config';
import { chargerConfig, chargerRequetes, appliquerModeRapide } from './config.js';
import { scraperTout } from './scraper.js';
import { initialiserLogger } from './logger.js';
import * as log from './logger.js';

/** Aide affichée pour --help. */
function afficherAide() {
  // eslint-disable-next-line no-console
  console.log(`
Usage : node src/index.js [options]

Options :
  --requete <catégorie>   Scrape uniquement la catégorie donnée (ex: "hotel").
  --max <n>               Limite le nombre de fiches pour chaque requête.
  --resume                Reprend là où le précédent run s'est arrêté.
  --headless              Force le mode headless (déconseillé).
  --concurrence <n>       Nombre de fiches extraites en parallèle (défaut: 3).
  --rapide                Réduit les délais anti-détection (plus rapide, plus risqué).
  --help                  Affiche cette aide.
`);
}

/**
 * Parse les arguments de la ligne de commande.
 * @param {string[]} argv - Tableau des arguments (process.argv.slice(2)).
 * @returns {{requete: string|null, max: number|null, resume: boolean, headless: boolean, concurrence: number|null, rapide: boolean, aide: boolean}}
 */
function parserArguments(argv) {
  const options = {
    requete: null,
    max: null,
    resume: false,
    headless: false,
    concurrence: null,
    rapide: false,
    aide: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--requete' && argv[i + 1]) options.requete = argv[++i];
    else if (arg === '--max' && argv[i + 1]) {
      const valeur = Number.parseInt(argv[++i], 10);
      options.max = Number.isFinite(valeur) ? valeur : null;
    } else if (arg === '--concurrence' && argv[i + 1]) {
      const valeur = Number.parseInt(argv[++i], 10);
      options.concurrence = Number.isFinite(valeur) ? valeur : null;
    } else if (arg === '--resume') options.resume = true;
    else if (arg === '--headless') options.headless = true;
    else if (arg === '--rapide') options.rapide = true;
    else if (arg === '--help' || arg === '-h') options.aide = true;
  }
  return options;
}

/**
 * Sélectionne les tâches à scraper selon les arguments CLI.
 * @param {Array<{requete: string, categorie: string, max: number}>} taches - Toutes les requêtes.
 * @param {ReturnType<typeof parserArguments>} options - Options CLI.
 * @returns {Array<{requete: string, categorie: string, max: number}>}
 */
function filtrerTaches(taches, options) {
  let selection = taches;
  if (options.requete) {
    const cible = options.requete.trim().toLowerCase();
    selection = taches.filter((t) => t.categorie.toLowerCase() === cible);
    if (selection.length === 0) {
      log.warn(`Aucune catégorie ne correspond à "${options.requete}".`);
    }
  }

  // L'option --max override le champ max de chaque requête sélectionnée.
  if (options.max !== null) {
    selection = selection.map((t) => ({ ...t, max: options.max }));
  }
  return selection;
}

/** Fonction principale. */
async function main() {
  const options = parserArguments(process.argv.slice(2));
  if (options.aide) {
    afficherAide();
    return;
  }

  const config = chargerConfig();
  if (options.headless) config.headless = true;
  if (options.rapide) appliquerModeRapide(config);
  if (options.concurrence !== null && options.concurrence >= 1) {
    config.concurrence = options.concurrence;
  }

  initialiserLogger(config.outputDir);
  log.info('Démarrage du scraper Google Maps (Niamey).');

  const taches = chargerRequetes();
  const selection = filtrerTaches(taches, options);

  if (selection.length === 0) {
    log.warn('Aucune requête à traiter. Arrêt.');
    return;
  }

  const debut = Date.now();
  const resultats = await scraperTout(config, selection, options.resume);

  // Résumé final.
  const totalFiches = resultats.reduce((acc, r) => acc + r.extraites, 0);
  const totalTelephones = resultats.reduce((acc, r) => acc + r.telephones, 0);
  const duree = Math.round((Date.now() - debut) / 1000);

  log.info('———— Résumé ————');
  for (const r of resultats) {
    log.info(
      `• ${r.tache.categorie} : ${r.extraites} fiche(s), ${r.telephones} téléphone(s)`
    );
  }
  log.info(`Total : ${totalFiches} fiche(s), ${totalTelephones} téléphone(s).`);
  log.info(`Durée : ${duree} s.`);
}

main().catch((err) => {
  log.erreur(`Erreur fatale : ${err.stack || err.message}`);
  process.exitCode = 1;
});
