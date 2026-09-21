/**
 * reparer-csv.js — corrige un CSV de prospects déjà extrait.
 *
 * À utiliser quand un extracteur a été corrigé APRÈS un run : plutôt que de
 * re-scraper des heures, on recalcule ce qui est dérivable des données
 * existantes (coordonnées depuis l'URL, nettoyage adresse/horaires).
 *
 * Usage : node scripts/reparer-csv.js [chemin.csv]
 * Par défaut : le CSV du jour dans data/output/.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { COLONNES, lireCsvProspects } from '../src/storage.js';
import { extraireCoordonnees, nettoyerTexte } from '../src/extractors.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.resolve(__dirname, '..');
const DOSSIER = path.join(RACINE, 'data', 'output');

/**
 * Nettoie une adresse : supprime l'icône de tête (retour à la ligne) et les
 * espaces multiples, et préfère le texte après « Adresse : » s'il est présent.
 * @param {string} brut - Adresse brute.
 * @returns {string}
 */
function nettoyerAdresse(brut) {
  // nettoyerTexte retire les icônes Material (U+E000–U+F8FF) et condense
  // les espaces ; on privilégie le libellé propre de l'aria-label.
  const texte = String(brut || '');
  const apresLabel = /^\s*Adresse\s*:\s*/i.test(texte)
    ? texte.replace(/^\s*Adresse\s*:\s*/i, '')
    : texte;
  return nettoyerTexte(apresLabel);
}

/**
 * Nettoie des horaires : retire le suffixe de barres de fréquentation
 * (« | 5 | 4 | 3 | 2 | 1 ») ajouté par un ancien sélecteur trop large.
 * @param {string} brut - Horaires bruts.
 * @returns {string}
 */
function nettoyerHoraires(brut) {
  // On ne garde que les segments décrivant un jour d'ouverture : cela écarte
  // les barres de fréquentation et les fourchettes de prix ajoutées par
  // l'ancien sélecteur trop large.
  const segments = nettoyerTexte(brut).split('|');
  const jours = segments.filter((s) =>
    /(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)/i.test(s)
  );
  return jours.length ? nettoyerTexte(jours.join(' | ')) : '';
}
/**
 * Échappe une valeur pour le CSV.
 * @param {unknown} valeur
 * @returns {string}
 */
function echapperCsv(valeur) {
  if (valeur === null || valeur === undefined) return '';
  const texte = String(valeur);
  return /[",\n\r]/.test(texte) ? `"${texte.replace(/"/g, '""')}"` : texte;
}

const argument = process.argv[2];
let cheminCsv;
if (argument) {
  cheminCsv = path.resolve(argument);
} else {
  const fichiers = existsSync(DOSSIER)
    ? readdirSync(DOSSIER).filter((f) => /^prospects_\d{4}-\d{2}-\d{2}\.csv$/.test(f)).sort()
    : [];
  if (fichiers.length === 0) {
    console.error('Aucun CSV de prospects trouvé dans data/output/.');
    process.exit(1);
  }
  cheminCsv = path.join(DOSSIER, fichiers[fichiers.length - 1]);
}

const fiches = lireCsvProspects(cheminCsv);
let coordAjoutees = 0;
let adressesNettoyees = 0;
let horairesNettoyes = 0;

for (const fiche of fiches) {
  // 1. Coordonnées recalculées depuis l'URL (format !3d/!4d ou @lat,lng).
  if (fiche.latitude === null || fiche.longitude === null) {
    const { latitude, longitude } = extraireCoordonnees(fiche.url_maps);
    if (latitude !== null) {
      fiche.latitude = latitude;
      fiche.longitude = longitude;
      coordAjoutees++;
    }
  }

  // 2. Nettoyage de l'adresse.
  const adressePropre = nettoyerAdresse(fiche.adresse);
  if (adressePropre !== fiche.adresse) adressesNettoyees++;
  fiche.adresse = adressePropre;

  // 3. Nettoyage des horaires.
  const horairesPropres = nettoyerHoraires(fiche.horaires);
  if (horairesPropres !== fiche.horaires) horairesNettoyes++;
  fiche.horaires = horairesPropres;
}

// Réécriture complète du CSV (avec BOM, comme à l'origine).
const entete = '﻿' + COLONNES.map(echapperCsv).join(',') + '\n';
const corps = fiches
  .map((f) => COLONNES.map((c) => echapperCsv(f[c])).join(',') + '\n')
  .join('');
writeFileSync(cheminCsv, entete + corps, 'utf8');

console.log(`CSV réparé : ${path.relative(RACINE, cheminCsv)}`);
console.log(`  • ${fiches.length} fiches traitées`);
console.log(`  • ${coordAjoutees} coordonnées ajoutées`);
console.log(`  • ${adressesNettoyees} adresses nettoyées`);
console.log(`  • ${horairesNettoyes} horaires nettoyés`);
