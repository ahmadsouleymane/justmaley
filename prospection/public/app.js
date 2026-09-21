/**
 * app.js — logique du tableau de bord (frontend).
 *
 * Récupère la config, pilote le scraping via l'API, écoute la progression en
 * direct via Server-Sent Events, et affiche/filtre/exporte les résultats.
 * Aucun framework : JavaScript navigateur pur.
 */

const etat = {
  runCourant: null,     // date sélectionnée dans la liste des sessions
  prospects: [],        // prospects affichés
  totalFiches: 0,
  totalTelephones: 0,
  verifications: {},   // numéro international → { wa: boolean, profil }
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

/** Message WhatsApp pré-rempli (modifiable dans le dashboard, persistant). */
const MESSAGE_PAR_DEFAUT =
  'Bonjour {nom}\n\n' +
  "Je m'intéresse aux commerces de Niamey, et votre {categorie} " +
  'a retenu mon attention.\n\n' +
  'Je suis de JustMaley, on aide des établissements locaux à mieux se faire ' +
  'connaître en ligne et à attirer plus de clients.\n\n' +
  'Est-ce que je peux vous en dire 2 mots ? Si ça ne vous intéresse pas, ' +
  'dites-le moi simplement, je ne vous relancerai pas.\n\n' +
  'Bonne journée';
const CLE_MESSAGE = 'prospection.messageWhatsApp.v4';

/** Dernier instant de rafraîchissement des résultats (anti-rafale). */
let dernierRafraichissement = 0;

/* ------------------------------------------------------------------ */
/* Initialisation                                                      */
/* ------------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', async () => {
  relierEvenements();
  initialiserMessageWa();
  connecterSse();
  await chargerVerifications();
  await chargerRequetes();
  await chargerRuns();
});

function relierEvenements() {
  $('#formScrape').addEventListener('submit', (e) => {
    e.preventDefault();
    lancerScraping();
  });
  $('#btnArreter').addEventListener('click', arreterScraping);
  $('#btnToutCocher').addEventListener('click', basculerToutCocher);
  $('#selectRun').addEventListener('change', (e) => chargerResultats(e.target.value));
  $('#recherche').addEventListener('input', filtrerTableau);
  $('#filtreWhatsapp').addEventListener('change', async () => {
    await chargerVerifications(); // récupère les derniers numéros validés
    filtrerTableau();
  });
  $('#btnExportCsv').addEventListener('click', () => exporter('csv'));
  $('#btnExportJson').addEventListener('click', () => exporter('json'));
}

/* ------------------------------------------------------------------ */
/* Chargement initial (requêtes + sessions)                            */
/* ------------------------------------------------------------------ */

async function chargerRequetes() {
  const conteneur = $('#listeCategories');
  conteneur.innerHTML = '';
  try {
    const rep = await fetch('/api/requetes');
    const { requetes } = await rep.json();

    // Regroupe par catégorie : les catégories à fort volume sont déclinées
    // par quartier (ex. "restaurant Plateau Niamey"), on n'affiche qu'une
    // case par catégorie pour rester lisible.
    const parCategorie = new Map();
    for (const r of requetes) {
      if (!parCategorie.has(r.categorie)) parCategorie.set(r.categorie, []);
      parCategorie.get(r.categorie).push(r);
    }

    for (const [categorie, entrees] of parCategorie) {
      const label = document.createElement('label');
      label.className = 'categorie';
      const detail = entrees.length > 1
        ? `${entrees.length} requêtes`
        : `max ${entrees[0].max}`;
      label.innerHTML = `
        <input type="checkbox" value="${echapperHtml(categorie)}" checked />
        <span>${echapperHtml(categorie)}</span>
        <small style="color:var(--texte-faible)">${detail}</small>
      `;
      const caseCoche = label.querySelector('input');
      caseCoche.addEventListener('change', () => {
        label.classList.toggle('choisie', caseCoche.checked);
        majCompteurCategories();
      });
      label.classList.add('choisie');
      conteneur.appendChild(label);
    }
    majCompteurCategories();
  } catch {
    afficherConsole('Impossible de charger la liste des requêtes.', 'ERREUR');
  }
}

/** Coche / décoche toutes les catégories d'un coup. */
function basculerToutCocher() {
  const cases = $$('#listeCategories input');
  const toutCoche = cases.every((c) => c.checked);
  for (const c of cases) {
    c.checked = !toutCoche;
    c.closest('.categorie').classList.toggle('choisie', c.checked);
  }
  majCompteurCategories();
}

/** Met à jour le compteur et le libellé du bouton de sélection globale. */
function majCompteurCategories() {
  const cases = $$('#listeCategories input');
  const cochees = cases.filter((c) => c.checked).length;
  $('#compteurCategories').textContent = `${cochees} / ${cases.length} sélectionnée(s)`;
  $('#btnToutCocher').textContent = cochees === cases.length ? 'Tout décocher' : 'Tout cocher';
}

/** Charge le résultat de la vérification WhatsApp (numéro → présence). */
async function chargerVerifications() {
  try {
    const rep = await fetch('/api/whatsapp');
    const { verifications } = await rep.json();
    etat.verifications = verifications || {};
  } catch {
    etat.verifications = {};
  }
}

/**
 * Vrai si le numéro du prospect est confirmé sur WhatsApp.
 * Un numéro non encore vérifié n'est pas considéré comme valide : le filtre
 * « WhatsApp uniquement » ne montre que du certain.
 * @param {Object} prospect - Fiche prospect.
 * @returns {boolean}
 */
function estSurWhatsapp(prospect) {
  if (!prospect.telephone) return false;
  const numero = formatWaMe(prospect.telephone);
  return etat.verifications[numero]?.wa === true;
}

async function chargerRuns() {
  const select = $('#selectRun');
  try {
    const rep = await fetch('/api/resultats');
    const { runs } = await rep.json();
    select.innerHTML = '<option value="">— Choisir une session —</option>';
    for (const run of runs) {
      const option = document.createElement('option');
      option.value = run.date;
      option.textContent = `${run.date} (${run.nbFiches} fiche(s))`;
      select.appendChild(option);
    }
    if (runs.length > 0) {
      select.value = runs[0].date;
      await chargerResultats(runs[0].date);
    }
  } catch {
    afficherConsole('Impossible de lister les sessions.', 'ERREUR');
  }
}

async function chargerResultats(date) {
  if (!date) {
    viderTableau();
    return;
  }
  try {
    const rep = await fetch(`/api/resultats/${date}`);
    if (!rep.ok) throw new Error(rep.status);
    const { prospects } = await rep.json();
    etat.runCourant = date;
    etat.prospects = prospects;
    afficherStats();
    filtrerTableau();
  } catch {
    viderTableau();
  }
}

/** Rafraîchit les résultats en direct (au plus toutes les 3 s pendant le run). */
function rafraichirResultatsEnDirect() {
  const maintenant = Date.now();
  if (maintenant - dernierRafraichissement < 3000) return;
  dernierRafraichissement = maintenant;
  if (etat.runCourant) chargerResultats(etat.runCourant);
  else chargerRuns();
}

/* ------------------------------------------------------------------ */
/* Pilotage du scraping                                                */
/* ------------------------------------------------------------------ */

function categoriesChoisies() {
  return $$('#listeCategories input:checked').map((i) => i.value);
}

async function lancerScraping() {
  const corps = {
    categories: categoriesChoisies(),
    max: Number.parseInt($('#maxFiches').value, 10) || 60,
    concurrence: Number.parseInt($('#concurrence').value, 10) || 3,
    resume: $('#resume').checked,
    rapide: $('#rapide').checked,
    navigateurVisible: $('#navigateurVisible').checked,
  };

  const rep = await fetch('/api/scrape', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(corps),
  });
  if (rep.status === 409) {
    afficherConsole('Un scraping est déjà en cours.', 'WARN');
    return;
  }
  if (!rep.ok) {
    afficherConsole('Échec du lancement.', 'ERREUR');
    return;
  }
  preparerProgression();
  afficherConsole('Scraping lancé…', 'INFO');
}

async function arreterScraping() {
  await fetch('/api/scrape/stop', { method: 'POST' });
  afficherConsole('Arrêt demandé — attendre la fiche en cours…', 'WARN');
}

/* ------------------------------------------------------------------ */
/* Flux SSE (progression en direct)                                    */
/* ------------------------------------------------------------------ */

function connecterSse() {
  const source = new EventSource('/api/events');

  source.addEventListener('log', (e) => {
    const { niveau, message } = JSON.parse(e.data);
    afficherConsole(message, niveau);
  });

  source.addEventListener('debut', () => {
    preparerProgression();
  });

  source.addEventListener('requete:debut', (e) => {
    const { categorie, max } = JSON.parse(e.data);
    $('#progRequete').textContent = `Requête : ${categorie} (max ${max})`;
    $('#progCompteur').textContent = 'Préparation…';
    afficherConsole(`Début de la requête "${categorie}".`, 'INFO');
  });

  source.addEventListener('fiche', (e) => {
    const { index, total, nom, telephone } = JSON.parse(e.data);
    etat.totalFiches += 1;
    if (telephone) etat.totalTelephones += 1;
    $('#comptFiches').textContent = etat.totalFiches;
    $('#comptTelephones').textContent = etat.totalTelephones;
    $('#progCompteur').textContent = `${index} / ${total}`;
    majBarre(index, total);
    rafraichirResultatsEnDirect();
  });

  source.addEventListener('requete:fin', (e) => {
    const { categorie, extraites } = JSON.parse(e.data);
    afficherConsole(`Requête "${categorie}" terminée : ${extraites} fiche(s).`, 'INFO');
    rafraichirResultatsEnDirect();
  });

  source.addEventListener('fin', async () => {
    afficherConsole('Scraping terminé.', 'INFO');
    majStatut('en-attente', 'Terminé');
    basculerControles(false);
    await chargerRuns();
  });

  source.addEventListener('erreur', (e) => {
    const { message } = JSON.parse(e.data);
    afficherConsole(message || 'Erreur inconnue.', 'ERREUR');
    majStatut('erreur', 'Erreur');
    basculerControles(false);
  });

  source.addEventListener('etat', (e) => {
    const { enCours } = JSON.parse(e.data);
    majStatut(enCours ? 'en-cours' : 'en-attente', enCours ? 'En cours' : 'En attente');
    basculerControles(enCours);
  });
}

function preparerProgression() {
  etat.totalFiches = 0;
  etat.totalTelephones = 0;
  $('#comptFiches').textContent = '0';
  $('#comptTelephones').textContent = '0';
  $('#progCompteur').textContent = '0 / 0';
  majBarre(0, 1);
  $('#progressionVide').classList.add('cache');
  $('#progressionActive').classList.remove('cache');
}

function majBarre(index, total) {
  const pct = total > 0 ? Math.min(100, Math.round((index / total) * 100)) : 0;
  $('#progBarre').style.width = `${pct}%`;
}

function basculerControles(enCours) {
  $('#btnLancer').disabled = enCours;
  $('#btnArreter').disabled = !enCours;
}

function majStatut(etatClasse, texte) {
  const pastille = $('#statutPastille');
  pastille.className = `pastille ${etatClasse === 'en-cours' ? 'en-cours' : etatClasse === 'erreur' ? 'erreur' : ''}`;
  $('#statutTexte').textContent = texte;
}

/* ------------------------------------------------------------------ */
/* Console de logs                                                     */
/* ------------------------------------------------------------------ */

function afficherConsole(message, niveau = 'INFO') {
  const consoleEl = $('#console');
  const ligne = document.createElement('div');
  ligne.className = `ligne-log niveau-${niveau}`;
  const heure = new Date().toLocaleTimeString('fr-FR');
  ligne.textContent = `[${heure}] ${message}`;
  consoleEl.appendChild(ligne);

  // Borne la taille pour éviter une dérive mémoire sur de longues sessions.
  while (consoleEl.childElementCount > 300) {
    consoleEl.removeChild(consoleEl.firstChild);
  }
  consoleEl.scrollTop = consoleEl.scrollHeight;
}

/* ------------------------------------------------------------------ */
/* Affichage des résultats                                             */
/* ------------------------------------------------------------------ */

function afficherStats() {
  const prospects = etat.prospects;
  const total = prospects.length;
  const telephones = prospects.filter((p) => p.telephone).length;
  const avecSite = prospects.filter((p) => p.site_web).length;
  const categories = new Set(prospects.map((p) => p.categorie)).size;
  $('#stats').innerHTML = `
    <div class="stat-mini">Fiches <b>${total}</b></div>
    <div class="stat-mini">Téléphones <b>${telephones}</b></div>
    <div class="stat-mini">Sites web <b>${avecSite}</b></div>
    <div class="stat-mini">Catégories <b>${categories}</b></div>
  `;
}

/* ------------------------------------------------------------------ */
/* Liens WhatsApp                                                      */
/* ------------------------------------------------------------------ */

/**
 * Formate un numéro pour wa.me : indicatif international sans "+".
 * Les numéros locaux nigériens (8 chiffres) reçoivent l'indicatif 227.
 * @param {string} telephone - Numéro brut extrait.
 * @returns {string} Numéro au format international, ou "".
 */
function formatWaMe(telephone) {
  let tel = (telephone || '').replace(/[^\d+]/g, '');
  if (!tel) return '';
  if (tel.startsWith('+')) tel = tel.slice(1);
  else if (tel.startsWith('00')) tel = tel.slice(2);
  if (tel.startsWith('227')) return tel;      // déjà international Niger
  if (/^\d{8}$/.test(tel)) return '227' + tel; // local nigérien (8 chiffres)
  return tel;                                  // autre indicatif (ex: 234…)
}

/** Message WhatsApp courant (localStorage, repli sur le défaut). */
function messageWhatsApp() {
  return localStorage.getItem(CLE_MESSAGE) || MESSAGE_PAR_DEFAUT;
}

/**
 * Remplace les jetons du message par les valeurs du commerce.
 * {nom} → nom du commerce ; {categorie} → secteur lisible (tirets → espaces).
 * @param {string} nom - Nom du commerce.
 * @param {string} categorie - Catégorie du commerce.
 * @returns {string} Message personnalisé.
 */
function composerMessage(nom, categorie) {
  return messageWhatsApp()
    .replace(/\{nom\}/g, nom || '')
    .replace(/\{categorie\}/g, (categorie || '').replace(/-/g, ' '));
}

/** Construit l'URL wa.me complète (numéro + message encodé). */
function lienWhatsApp(telephone, nom, categorie) {
  const tel = formatWaMe(telephone);
  if (!tel) return '';
  return `https://wa.me/${tel}?text=${encodeURIComponent(composerMessage(nom, categorie))}`;
}

/** Initialise la zone de message WhatsApp (persistance + re-rendu à la saisie). */
function initialiserMessageWa() {
  const zone = $('#messageWa');
  if (!zone) return;
  zone.value = messageWhatsApp();
  zone.addEventListener('input', () => {
    localStorage.setItem(CLE_MESSAGE, zone.value);
    rendreTableau(etat.prospects); // régénère les liens avec le nouveau message
  });
}

function rendreTableau(prospects) {
  const corps = $('#corpsTableau');
  corps.innerHTML = '';
  if (prospects.length === 0) {
    corps.innerHTML = '<tr><td colspan="9" class="rien">Aucune fiche.</td></tr>';
    return;
  }
  for (const p of prospects) {
    const tr = document.createElement('tr');
    const telephone = p.telephone
      ? `<a href="tel:${echapperHtml(p.telephone)}">${echapperHtml(p.telephone)}</a>`
      : '<span class="vide-cellule">—</span>';
    const whatsapp = p.telephone
      ? `<a class="btn-wa" href="${echapperHtml(lienWhatsApp(p.telephone, p.nom, p.categorie))}" target="_blank" rel="noopener">WhatsApp</a>`
      : '<span class="vide-cellule">—</span>';
    const site = p.site_web
      ? `<a href="${echapperHtml(p.site_web)}" target="_blank" rel="noopener">Visiter</a>`
      : '<span class="vide-cellule">—</span>';
    const maps = `<a href="${echapperHtml(p.url_maps)}" target="_blank" rel="noopener">Ouvrir</a>`;
    const note = p.note != null ? p.note : '<span class="vide-cellule">—</span>';
    const avis = p.nb_avis != null ? p.nb_avis : '<span class="vide-cellule">—</span>';

    tr.innerHTML = `
      <td class="nom">${echapperHtml(p.nom)}</td>
      <td>${echapperHtml(p.categorie)}</td>
      <td>${telephone}</td>
      <td>${echapperHtml(p.adresse || '—')}</td>
      <td>${note}</td>
      <td>${avis}</td>
      <td>${site}</td>
      <td>${maps}</td>
      <td>${whatsapp}</td>
    `;
    corps.appendChild(tr);
  }
}

/**
 * Applique les filtres actifs (recherche texte + WhatsApp uniquement)
 * puis redessine le tableau.
 */
function filtrerTableau() {
  const terme = $('#recherche').value.trim().toLowerCase();
  const waSeulement = $('#filtreWhatsapp').checked;

  let filtres = etat.prospects;

  // Filtre WhatsApp : ne garder que les numéros confirmés.
  if (waSeulement) {
    filtres = filtres.filter(estSurWhatsapp);
  }

  // Filtre texte : nom, catégorie, téléphone, adresse ou site.
  if (terme) {
    filtres = filtres.filter((p) =>
      [p.nom, p.categorie, p.telephone, p.adresse, p.site_web]
        .filter(Boolean)
        .some((champ) => String(champ).toLowerCase().includes(terme))
    );
  }

  rendreTableau(filtres);
  majCompteurFiltre(filtres.length);
}

/** Indique combien de fiches sont affichées après filtrage. */
function majCompteurFiltre(affichees) {
  const total = etat.prospects.length;
  const zone = $('#stats');
  const existant = $('#compteurFiltre');
  const texte = affichees === total
    ? `${total} fiche(s)`
    : `<b>${affichees}</b> affichée(s) sur ${total}`;
  if (existant) existant.innerHTML = texte;
  else if (zone) zone.insertAdjacentHTML('afterbegin', `<div class="stat-mini" id="compteurFiltre">${texte}</div>`);
}

function viderTableau() {
  etat.prospects = [];
  $('#corpsTableau').innerHTML = '<tr><td colspan="9" class="rien">Aucun résultat.</td></tr>';
  $('#stats').innerHTML = '';
  $('#compteurFiltre')?.remove();
}

function exporter(type) {
  if (!etat.runCourant) return;
  const url = `/api/export?type=${type}&date=${etat.runCourant}`;
  window.open(url, '_blank');
}

/* ------------------------------------------------------------------ */
/* Utilitaires                                                         */
/* ------------------------------------------------------------------ */

/** Échappe les caractères HTML pour un rendu sûr (données externes). */
function echapperHtml(valeur) {
  return String(valeur)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
