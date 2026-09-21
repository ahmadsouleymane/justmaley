/**
 * storage.js — écriture CSV/JSON, déduplication et checkpoints.
 *
 * Le CSV est écrit en flux (une ligne à la fois) pour ne rien perdre en cas
 * de crash. L'encodage UTF-8 avec BOM garantit une ouverture correcte dans
 * Excel / Google Sheets (accents non cassés).
 */

import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

/** Colonnes du CSV, dans l'ordre des clés d'une fiche prospect. */
export const COLONNES = [
  'nom',
  'categorie',
  'adresse',
  'telephone',
  'site_web',
  'note',
  'nb_avis',
  'horaires',
  'url_maps',
  'latitude',
  'longitude',
  'requete_source',
  'date_scraping',
];

/**
 * Échappe une valeur pour le CSV (guillemets doubles doublés).
 * @param {unknown} valeur - Valeur brute.
 * @returns {string} Valeur prête pour CSV.
 */
function echapperCsv(valeur) {
  if (valeur === null || valeur === undefined) return '';
  const texte = String(valeur);
  if (/[",\n\r]/.test(texte)) {
    return `"${texte.replace(/"/g, '""')}"`;
  }
  return texte;
}

/** @typedef {Object} Prospect - fiche commerce normalisée. */

/**
 * Calcule une clé de déduplication déterministe pour un prospect.
 * On déduplique par URL Maps puis par couple (nom + adresse).
 *
 * @param {Prospect} prospect - Fiche extraite.
 * @returns {string} Clé normalisée (minuscules, sans espaces superflus).
 */
export function cleDedup(prospect) {
  const url = (prospect.url_maps || '').trim().toLowerCase();
  if (url) return `url:${url}`;
  const nom = (prospect.nom || '').trim().toLowerCase();
  const adresse = (prospect.adresse || '').trim().toLowerCase();
  return `nom:${nom}|adresse:${adresse}`;
}

/**
 * Construit le chemin de sortie CSV/JSON pour une date donnée.
 * @param {string} dossierSortie - Dossier de sortie.
 * @param {string} dateIso - Date ISO (AAAA-MM-JJ).
 * @param {'csv'|'json'} extension - Type de fichier.
 * @returns {string} Chemin complet.
 */
export function cheminSortie(dossierSortie, dateIso, extension) {
  return path.join(dossierSortie, `prospects_${dateIso}.${extension}`);
}

/**
 * Parse un texte CSV en lignes de champs, en gérant les champs entre guillemets
 * (y compris les sauts de ligne et guillemets doublés à l'intérieur d'un champ).
 * @param {string} texte - Contenu CSV.
 * @returns {Array<Array<string>>} Tableau de lignes, chaque ligne = tableau de champs.
 */
export function parseCsv(texte) {
  const lignes = [];
  let champ = '';
  let ligne = [];
  let dansGuillemets = false;
  for (let i = 0; i < texte.length; i++) {
    const c = texte[i];
    if (dansGuillemets) {
      if (c === '"') {
        if (texte[i + 1] === '"') { champ += '"'; i++; }
        else dansGuillemets = false;
      } else champ += c;
    } else if (c === '"') {
      dansGuillemets = true;
    } else if (c === ',') {
      ligne.push(champ); champ = '';
    } else if (c === '\n') {
      ligne.push(champ); champ = '';
      lignes.push(ligne); ligne = [];
    } else {
      champ += c;
    }
  }
  if (champ !== '' || ligne.length) { ligne.push(champ); lignes.push(ligne); }
  return lignes;
}

/**
 * Lit un CSV de prospects et le convertit en tableau d'objets, en restaurant
 * les types numériques (note, nb_avis, latitude, longitude).
 * @param {string} chemin - Chemin du fichier CSV.
 * @returns {Array<Prospect>}
 */
export function lireCsvProspects(chemin) {
  if (!existsSync(chemin)) return [];
  const brut = readFileSync(chemin, 'utf8').replace(/^﻿/, '');
  const lignes = parseCsv(brut);
  if (lignes.length < 2) return [];
  const entete = lignes[0];

  return lignes
    .slice(1)
    .map((ligne) => {
      const prospect = {};
      entete.forEach((col, i) => { prospect[col] = ligne[i] ?? ''; });
      prospect.note = prospect.note === '' ? null : Number(prospect.note);
      prospect.nb_avis = prospect.nb_avis === '' ? null : Number(prospect.nb_avis);
      prospect.latitude = prospect.latitude === '' ? null : Number(prospect.latitude);
      prospect.longitude = prospect.longitude === '' ? null : Number(prospect.longitude);
      return prospect;
    })
    .filter((p) => p.nom || p.url_maps);
}

/**
 * Charge un fichier JSON s'il existe, sinon renvoie un tableau vide.
 * @param {string} chemin - Chemin du fichier.
 * @returns {Array<unknown>}
 */
export function chargerJson(chemin) {
  if (!existsSync(chemin)) return [];
  try {
    const brut = JSON.parse(readFileSync(chemin, 'utf8'));
    return Array.isArray(brut) ? brut : [];
  } catch {
    return [];
  }
}

/**
 * Charge les checkpoints d'une requête (fiches déjà traitées) pour le --resume.
 * @param {string} dossierCheckpoint - Dossier data/checkpoints.
 * @param {string} categorie - Catégorie de la requête.
 * @returns {Set<string>} Clés de déduplication déjà traitées.
 */
export function chargerCheckpoint(dossierCheckpoint, categorie) {
  const fichier = path.join(dossierCheckpoint, `${categorie}.json`);
  const entrees = chargerJson(fichier);
  return new Set(entrees.map((e) => (typeof e === 'string' ? e : e.cle)));
}

/**
 * Sauvegarde le checkpoint d'une requête (clés déjà traitées).
 * @param {string} dossierCheckpoint - Dossier data/checkpoints.
 * @param {string} categorie - Catégorie de la requête.
 * @param {Set<string>} cles - Clés de déduplication traitées.
 */
export function sauvegarderCheckpoint(dossierCheckpoint, categorie, cles) {
  mkdirSync(dossierCheckpoint, { recursive: true });
  const fichier = path.join(dossierCheckpoint, `${categorie}.json`);
  writeFileSync(fichier, JSON.stringify([...cles], null, 2), 'utf8');
}

/**
 * Gère l'écriture en flux des fiches. Conserve en mémoire la liste complète
 * pour la sortie JSON finale, et écrit chaque fiche immédiatement dans le CSV.
 */
export class Stockage {
  /**
   * @param {string} dossierSortie - Dossier de sortie.
   * @param {string} dateIso - Date ISO (AAAA-MM-JJ).
   */
  constructor(dossierSortie, dateIso) {
    this.dossierSortie = dossierSortie;
    this.dateIso = dateIso;
    this.cheminCsv = cheminSortie(dossierSortie, dateIso, 'csv');
    this.cheminJson = cheminSortie(dossierSortie, dateIso, 'json');
    this.vues = new Set();
    this.fiches = [];
    mkdirSync(dossierSortie, { recursive: true });
    this._initialiserCsvSiNecessaire();
  }

  /** Crée l'en-tête CSV (avec BOM) si le fichier n'existe pas encore. */
  _initialiserCsvSiNecessaire() {
    if (existsSync(this.cheminCsv)) return;
    // BOM UTF-8 (﻿) pour Excel/Google Sheets.
    const entete = '﻿' + COLONNES.map(echapperCsv).join(',') + '\n';
    writeFileSync(this.cheminCsv, entete, 'utf8');
  }

  /**
   * Teste si une fiche a déjà été enregistrée (déduplication).
   * @param {Prospect} prospect - Fiche extraite.
   * @returns {boolean} true si déjà présent.
   */
  estDejaPresent(prospect) {
    return this.vues.has(cleDedup(prospect));
  }

  /**
   * Ajoute une fiche : écrit dans le CSV immédiatement et mémorise pour le JSON.
   * @param {Prospect} prospect - Fiche extraite.
   * @returns {boolean} false si doublon (ignorée), true sinon.
   */
  ajouter(prospect) {
    const cle = cleDedup(prospect);
    if (this.vues.has(cle)) return false;
    this.vues.add(cle);

    const ligne = COLONNES.map((c) => echapperCsv(prospect[c])).join(',') + '\n';
    appendFileSync(this.cheminCsv, ligne, 'utf8');
    this.fiches.push(prospect);
    return true;
  }

  /** Écrit le fichier JSON final (tableau d'objets identique au CSV). */
  finaliserJson() {
    writeFileSync(this.cheminJson, JSON.stringify(this.fiches, null, 2), 'utf8');
  }
}
