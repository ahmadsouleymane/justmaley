/**
 * logger.js — logs horodatés en console et dans un fichier.
 *
 * Le fichier est créé à la volée : chaque session écrit dans
 * data/output/scrape-<AAAA-MM-JJ>.log. On n'utilise aucun framework,
 * uniquement node:fs en mode append.
 */

import { appendFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { emetteur } from './emetteur.js';

let cheminFichier = null;

/**
 * Initialise le fichier de log du jour.
 * @param {string} dossierSortie - Dossier où écrire le fichier de log.
 */
export function initialiserLogger(dossierSortie) {
  mkdirSync(dossierSortie, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  cheminFichier = path.join(dossierSortie, `scrape-${date}.log`);
}

/** @param {string} niveau - Niveau (INFO, WARN, ERREUR…). */
function horodatage() {
  return new Date().toISOString();
}

/**
 * Écrit une ligne de log (console + fichier).
 * @param {string} niveau - Niveau du message.
 * @param {string} message - Contenu du message.
 */
function ecrire(niveau, message) {
  const ligne = `[${horodatage()}] [${niveau}] ${message}`;
  // eslint-disable-next-line no-console
  console.log(ligne);
  if (cheminFichier) {
    try {
      appendFileSync(cheminFichier, ligne + '\n', 'utf8');
    } catch {
      // Ne jamais faire échouer le scraper pour un souci de log.
    }
  }
  // Diffuse également au bus d'événements pour l'interface web (sans lever
  // d'erreur si aucun auditeur n'est présent).
  try {
    emetteur.emit('log', { niveau, message });
  } catch {
    /* ignore */
  }
}

/** @param {string} message */
export function info(message) {
  ecrire('INFO', message);
}

/** @param {string} message */
export function warn(message) {
  ecrire('WARN', message);
}

/** @param {string} message */
export function erreur(message) {
  ecrire('ERREUR', message);
}
