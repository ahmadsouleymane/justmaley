/**
 * generer-requetes.js — génère config/requetes.json (liste exhaustive).
 *
 * Google Maps plafonne à ~100–120 résultats par recherche. Pour couvrir au
 * maximum Niamey, on décline les catégories à fort volume par quartier :
 *   "restaurant Niamey"  →  "restaurant Plateau Niamey", "restaurant Yantala Niamey", …
 *
 * Le fichier config/requetes.json est REGÉNÉRÉ à chaque exécution de ce script.
 * Pour ajuster la liste, modifiez ce fichier puis relancez :
 *   node scripts/generer-requetes.js
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.resolve(__dirname, '..');
const CHEMIN_SORTIE = path.join(RACINE, 'config', 'requetes.json');

/** Nombre max de fiches par requête (ajustable). */
const MAX = 60;

/**
 * Catégories de base, recherchées à l'échelle de la ville.
 * Chaque requête se termine par "Niamey" pour permettre la déclinaison
 * par quartier (insertion du nom du quartier juste avant "Niamey").
 */
const BASE = [
  ['restaurant', 'restaurant Niamey'],
  ['maquis', 'maquis restaurant Niamey'],
  ['fast-food', 'fast food Niamey'],
  ['café', 'café Niamey'],
  ['boulangerie', 'boulangerie pâtisserie Niamey'],
  ['supermarché', 'supermarché Niamey'],
  ['épicerie', 'épicerie alimentation Niamey'],
  ['boucherie', 'boucherie Niamey'],
  ['poissonnerie', 'poissonnerie Niamey'],

  ['hôtel', 'hôtel Niamey'],
  ['auberge', 'auberge Niamey'],
  ['agence-voyage', 'agence de voyage Niamey'],
  ['location-voiture', 'location de voiture Niamey'],

  ['pharmacie', 'pharmacie Niamey'],
  ['parapharmacie', 'parapharmacie Niamey'],
  ['clinique', 'clinique Niamey'],
  ['cabinet-medical', 'cabinet médical Niamey'],
  ['cabinet-dentaire', 'cabinet dentaire Niamey'],
  ['laboratoire', "laboratoire d'analyses médicales Niamey"],
  ['optique', 'opticien Niamey'],
  ['institut-beauté', 'institut de beauté Niamey'],
  ['salon-coiffure', 'salon de coiffure Niamey'],
  ['barbier', 'barbier Niamey'],
  ['salle-sport', 'salle de sport Niamey'],

  ['vêtements', 'boutique de vêtements Niamey'],
  ['chaussures', 'boutique de chaussures Niamey'],
  ['bijouterie', 'bijouterie Niamey'],
  ['librairie', 'librairie papeterie Niamey'],
  ['téléphonie', 'boutique de téléphones Niamey'],
  ['électroménager', 'magasin électroménager Niamey'],
  ['quincaillerie', 'quincaillerie Niamey'],
  ['droguerie', 'droguerie Niamey'],
  ['meubles', 'magasin de meubles Niamey'],
  ['tissus', 'magasin de tissus Niamey'],
  ['friperie', 'friperie Niamey'],
  ['informatique', 'boutique informatique Niamey'],
  ['cybercafé', 'cybercafé Niamey'],

  ['avocat', "cabinet d'avocat Niamey"],
  ['notaire', 'notaire Niamey'],
  ['immobilier', 'agence immobilière Niamey'],
  ['comptable', 'cabinet comptable Niamey'],
  ['imprimerie', 'imprimerie Niamey'],
  ['communication', 'agence de communication Niamey'],
  ['studio-photo', 'studio photo Niamey'],
  ['architecture', "bureau d'études architecture Niamey"],
  ['assurance', "compagnie d'assurance Niamey"],

  ['banque', 'banque Niamey'],
  ['microfinance', 'microfinance Niamey'],
  ['bureau-change', 'bureau de change Niamey'],
  ['transfert-argent', "transfert d'argent Niamey"],

  ['garage-auto', 'garage automobile Niamey'],
  ['station-service', 'station service Niamey'],
  ['pièces-auto', 'pièces détachées auto Niamey'],
  ['lavage-auto', 'lavage auto Niamey'],
  ['concessionnaire', 'concessionnaire auto Niamey'],
  ['auto-école', 'auto-école Niamey'],
  ['transport', 'société de transport Niamey'],

  ['école-privée', 'école privée Niamey'],
  ['formation', 'centre de formation Niamey'],
  ['crèche', 'crèche garderie Niamey'],

  ['pressing', 'pressing blanchisserie Niamey'],
  ['cordonnerie', 'cordonnerie Niamey'],
  ['serrurier', 'serrurier Niamey'],
  ['menuiserie', 'menuiserie Niamey'],
  ['couture', 'couture tailleur Niamey'],
  ['photographe', 'photographe Niamey'],
  ['événementiel', 'location tentes événementiel Niamey'],
  ['btp', 'entreprise BTP Niamey'],
  ['ong', 'ONG Niamey'],
];

/** Quartiers de Niamey utilisés pour décliner les catégories à fort volume. */
const QUARTIERS = [
  'Plateau',
  'Yantala',
  'Goudel',
  'Koira Kano',
  'Lazaret',
  'Boukoki',
  'Kalley',
  'Talladjé',
  'Gamkallé',
  'Dar Es Salam',
  'Harobanda',
  'Lamordé',
  'Niamey 2000',
  'Aéroport',
  'Terminus',
  'Wadata',
  'Cité Député',
  'Francophonie',
];

/**
 * Catégories (par leur libellé) à décliner par quartier : celles qui dépassent
 * largement le plafond de ~120 résultats de Google Maps à l'échelle de la ville.
 */
const A_DECLINER = new Set([
  'restaurant',
  'maquis',
  'fast-food',
  'boulangerie',
  'épicerie',
  'salon-coiffure',
  'barbier',
  'vêtements',
  'téléphonie',
  'quincaillerie',
  'pharmacie',
  'hôtel',
  'pressing',
  'menuiserie',
]);

/**
 * Construit la liste finale : catégories de base + déclinaisons par quartier.
 * @returns {Array<{requete: string, categorie: string, max: number}>}
 */
function generer() {
  const resultat = [];

  for (const [categorie, requete] of BASE) {
    resultat.push({ requete, categorie, max: MAX });

    // Si la catégorie est à fort volume, on ajoute une requête par quartier.
    if (A_DECLINER.has(categorie)) {
      for (const quartier of QUARTIERS) {
        const requeteQuartier = requete.replace(' Niamey', ` ${quartier} Niamey`);
        resultat.push({ requete: requeteQuartier, categorie, max: MAX });
      }
    }
  }

  return resultat;
}

const liste = generer();
mkdirSync(path.dirname(CHEMIN_SORTIE), { recursive: true });
writeFileSync(CHEMIN_SORTIE, JSON.stringify(liste, null, 2) + '\n', 'utf8');

// eslint-disable-next-line no-console
console.log(
  `config/requetes.json généré : ${liste.length} requêtes ` +
  `(${BASE.length} catégories, dont ${A_DECLINER.size} déclinées sur ${QUARTIERS.length} quartiers).`
);
