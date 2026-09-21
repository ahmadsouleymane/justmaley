/**
 * verifier-whatsapp.js — vérifie si un numéro possède un compte WhatsApp.
 *
 * Méthode : `https://wa.me/<numéro>` renvoie une page différente selon que le
 * numéro est enregistré ou non. Le discriminant est la balise og:description :
 *   - « WhatsApp Messenger: More than 2 billion people… » → PAS sur WhatsApp
 *   - « Business Account » / nom de profil            → SUR WhatsApp
 *
 * IMPORTANT — le rythme : interrogé trop vite (moins de ~5 s d'écart), WhatsApp
 * renvoie la page générique même pour des numéros valides, ce qui produit de
 * FAUX NÉGATIFS. Le délai par défaut est donc de 8 s (ajustable via --delai).
 *
 * Usage :
 *   node scripts/verifier-whatsapp.js [--delai 8000] [--max 50] [--resume]
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { lireCsvProspects } from '../src/storage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.resolve(__dirname, '..');
const DOSSIER_SORTIE = path.join(RACINE, 'data', 'output');
const FICHIER_ETAT = path.join(DOSSIER_SORTIE, 'whatsapp_verifie.json');

/** UA réaliste : wa.me sert la même page à tous, mais on reste cohérent. */
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

/**
 * Fragments de la page « numéro introuvable » de WhatsApp, toutes langues.
 * Le texte varie selon Accept-Language (« More than 2 billion » en anglais,
 * « plus de 2 milliards » en français) : on teste les deux pour ne pas
 * transformer des numéros absents en faux positifs.
 */
const FRAGMENTS_ABSENT = [
  'More than 2 billion',
  'plus de 2 milliards',
  'más de 2 mil millones',
  'mais de 2 bilhões',
];

/**
 * Vrai si la description correspond à la page générique « introuvable ».
 * @param {string} description - Contenu de og:description.
 * @returns {boolean}
 */
function estPageGenerique(description) {
  return FRAGMENTS_ABSENT.some((fragment) => description.includes(fragment));
}

/**
 * Pause simple.
 * @param {number} ms
 * @returns {Promise<void>}
 */
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Analyse les arguments CLI.
 * @returns {{delai: number, max: number|null, resume: boolean}}
 */
function parserArguments() {
  const argv = process.argv.slice(2);
  const options = { delai: 8000, max: null, resume: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--delai' && argv[i + 1]) options.delai = Number.parseInt(argv[++i], 10);
    else if (argv[i] === '--max' && argv[i + 1]) options.max = Number.parseInt(argv[++i], 10);
    else if (argv[i] === '--resume') options.resume = true;
  }
  return options;
}

/**
 * Formate un numéro nigérien au format international sans « + » (attendu par wa.me).
 * @param {string} telephone - Numéro brut.
 * @returns {string} Numéro normalisé, ou "".
 */
export function formatInternational(telephone) {
  let tel = (telephone || '').replace(/[^\d+]/g, '');
  if (!tel) return '';
  if (tel.startsWith('+')) tel = tel.slice(1);
  else if (tel.startsWith('00')) tel = tel.slice(2);
  if (tel.startsWith('227')) return tel;
  if (/^\d{8}$/.test(tel)) return '227' + tel;
  return tel;
}

/**
 * Interroge wa.me pour un numéro donné.
 *
 * @param {string} numero - Numéro au format international sans « + ».
 * @returns {Promise<{surWhatsApp: boolean|null, profil: string, erreur: string}>}
 *   `surWhatsApp` vaut null si la réponse est inexploitable (rate-limit, réseau).
 */
async function verifierNumero(numero) {
  const url = `https://wa.me/${numero}`;
  try {
    const reponse = await fetch(url, {
      // Pas d'Accept-Language : on garde la version anglaise, stable et
      // déjà couverte par nos marqueurs.
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'follow',
    });
    const html = await reponse.text();

    const description = /og:description"\s+content="([^"]*)"/.exec(html)?.[1] || '';

    // Réponse vide ou page générique sans og:description : inexploitable.
    if (!description) return { surWhatsApp: null, profil: '', erreur: 'og:description absente' };

    if (estPageGenerique(description)) {
      return { surWhatsApp: false, profil: '', erreur: '' };
    }
    return { surWhatsApp: true, profil: description.slice(0, 60), erreur: '' };
  } catch (err) {
    return { surWhatsApp: null, profil: '', erreur: err.message };
  }
}

/**
 * Charge l'état précédent (pour --resume).
 * @returns {Object<string, {wa: boolean, profil: string, date: string}>}
 */
function chargerEtat() {
  if (!existsSync(FICHIER_ETAT)) return {};
  try {
    return JSON.parse(readFileSync(FICHIER_ETAT, 'utf8'));
  } catch {
    return {};
  }
}

/** Fonction principale. */
async function main() {
  const options = parserArguments();

  // CSV de prospects le plus récent.
  const fichiers = listerCsvProspects(DOSSIER_SORTIE);
  if (fichiers.length === 0) {
    console.error('Aucun CSV de prospects dans data/output/.');
    process.exit(1);
  }
  const cheminCsv = path.join(DOSSIER_SORTIE, fichiers[fichiers.length - 1]);

  const prospects = lireCsvProspects(cheminCsv).filter((p) => p.telephone);
  const etat = options.resume ? chargerEtat() : {};

  // On ne vérifie que les numéros pas encore testés.
  const aVerifier = [];
  const vus = new Set();
  for (const p of prospects) {
    const numero = formatInternational(p.telephone);
    if (!numero || vus.has(numero)) continue;
    vus.add(numero);
    if (options.resume && etat[numero] !== undefined) continue;
    aVerifier.push(numero);
  }

  const liste = options.max ? aVerifier.slice(0, options.max) : aVerifier;
  const dureeEstimee = Math.round((liste.length * options.delai) / 60000);

  console.log(`Numéros à vérifier : ${liste.length} (délai ${options.delai} ms → ~${dureeEstimee} min)`);
  console.log(`Déjà vérifiés      : ${Object.keys(etat).length}`);
  console.log('');

  let surWa = 0;
  let pasSurWa = 0;
  let echecs = 0;

  for (let i = 0; i < liste.length; i++) {
    const numero = liste[i];
    const resultat = await verifierNumero(numero);

    if (resultat.surWhatsApp === null) {
      echecs++;
      console.log(`[${i + 1}/${liste.length}] ${numero} → ⚠️ ${resultat.erreur}`);
    } else if (resultat.surWhatsApp) {
      surWa++;
      etat[numero] = { wa: true, profil: resultat.profil, date: new Date().toISOString() };
      console.log(`[${i + 1}/${liste.length}] ${numero} → ✅ WhatsApp (${resultat.profil})`);
    } else {
      pasSurWa++;
      etat[numero] = { wa: false, profil: '', date: new Date().toISOString() };
      console.log(`[${i + 1}/${liste.length}] ${numero} → ❌ pas WhatsApp`);
    }

    // Sauvegarde régulière : un arrêt ne fait perdre que le dernier numéro.
    if ((i + 1) % 10 === 0) {
      mkdirSync(DOSSIER_SORTIE, { recursive: true });
      writeFileSync(FICHIER_ETAT, JSON.stringify(etat, null, 2), 'utf8');
    }

    if (i < liste.length - 1) await dormir(options.delai);
  }

  mkdirSync(DOSSIER_SORTIE, { recursive: true });
  writeFileSync(FICHIER_ETAT, JSON.stringify(etat, null, 2), 'utf8');

  console.log('');
  console.log('———— Résumé ————');
  console.log(`Sur WhatsApp     : ${surWa}`);
  console.log(`Pas sur WhatsApp : ${pasSurWa}`);
  console.log(`Échecs (à revoir): ${echecs}`);
  console.log(`Fichier          : ${path.relative(RACINE, FICHIER_ETAT)}`);
}

/**
 * Liste les CSV de prospects d'un dossier, triés par nom.
 * @param {string} dossier - Dossier à inspecter.
 * @returns {string[]} Noms de fichiers CSV triés.
 */
function listerCsvProspects(dossier) {
  if (!existsSync(dossier)) return [];
  return readdirSync(dossier)
    .filter((f) => /^prospects_\d{4}-\d{2}-\d{2}\.csv$/.test(f))
    .sort();
}

main().catch((err) => {
  console.error(`Erreur fatale : ${err.stack || err.message}`);
  process.exitCode = 1;
});
