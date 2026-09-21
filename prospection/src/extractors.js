/**
 * extractors.js — fonctions pures d'extraction depuis le DOM.
 *
 * Chaque fonction prend un élément (ou une page) et renvoie une valeur
 * normalisée. Aucun appel réseau ni side-effect : ce module est testable
 * isolément et ne plante jamais (toutes les fonctions retournent une valeur
 * par défaut en cas d'absence du sélecteur).
 */

/**
 * Extrait les coordonnées lat/lng depuis l'URL d'une fiche.
 *
 * Google Maps utilise deux formats selon le type d'URL :
 *   - vue carte classique : /@12.345,1.234,15z
 *   - fiche lieu (le cas ici) : …!8m2!3d12.345!4d1.234!16s…
 * On tente les deux, dans cet ordre.
 *
 * @param {string} url - URL complète de la fiche.
 * @returns {{ latitude: number|null, longitude: number|null }}
 */
export function extraireCoordonnees(url) {
  const texte = url || '';
  // Format fiche lieu : !3d<lat>!4d<lng>
  const ficheLieu = /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/.exec(texte);
  if (ficheLieu) {
    return {
      latitude: Number.parseFloat(ficheLieu[1]),
      longitude: Number.parseFloat(ficheLieu[2]),
    };
  }
  // Format vue carte : @<lat>,<lng>
  const vueCarte = /@(-?\d+\.\d+),(-?\d+\.\d+)/.exec(texte);
  if (vueCarte) {
    return {
      latitude: Number.parseFloat(vueCarte[1]),
      longitude: Number.parseFloat(vueCarte[2]),
    };
  }
  return { latitude: null, longitude: null };
}

/**
 * Nettoie un texte issu du DOM de Google Maps.
 *
 * Le site insère des icônes de police (Material Icons) qui se retrouvent dans
 * le texte sous forme de caractères de la zone à usage privé Unicode
 * (U+E000–U+F8FF). Ni `\s` ni `trim()` ne les enlèvent : on les supprime
 * explicitement, puis on condense les espaces.
 *
 * @param {string} brut - Texte brut.
 * @returns {string} Texte nettoyé.
 */
export function nettoyerTexte(brut) {
  return String(brut || '')
    // Icônes Material (zone à usage privé) : U+E000–U+F8FF.
    .replace(/[\uE000-\uF8FF]/g, '')
    // Largeur nulle, marques bidi et BOM.
    .replace(/[\u200B-\u200F\uFEFF]/g, '')
    // Espaces Unicode divers (insécable, fine, idéographique…).
    .replace(/[\u00A0\u2000-\u200A\u202F\u205F\u3000]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Lit le texte d'un élément identifié par un sélecteur, sans lever d'erreur.
 *
 * @param {import('playwright').Page} page - Page Playwright.
 * @param {string} selecteur - Sélecteur CSS.
 * @returns {Promise<string>} Texte nettoyé, ou "" si introuvable.
 */
export async function texteDepuisSelecteur(page, selecteur) {
  try {
    const locator = page.locator(selecteur).first();
    if ((await locator.count()) === 0) return '';
    const brut = await locator.innerText();
    return nettoyerTexte(brut);
  } catch {
    return '';
  }
}

/**
 * Extrait la note (ex: "4,3") depuis un attribut aria-label du type
 * "4,3 étoiles".
 *
 * @param {import('playwright').Page} page - Page Playwright.
 * @returns {Promise<number|null>} Note numérique ou null.
 */
export async function extraireNote(page) {
  try {
    // La note apparaît sous forme de "4,3" dans un aria-label ou un span.
    const candidats = page.locator(
      '[aria-label*="étoiles"], [aria-label*="stars"], span[aria-hidden="true"]'
    );
    const count = await candidats.count();
    for (let i = 0; i < count; i++) {
      const label = (await candidats.nth(i).getAttribute('aria-label')) || '';
      const texte = (await candidats.nth(i).innerText().catch(() => '')) || '';
      const source = `${label} ${texte}`;
      const match = /(\d{1,2}(?:[.,]\d{1,2})?)/.exec(source);
      if (match) {
        const valeur = Number.parseFloat(match[1].replace(',', '.'));
        if (Number.isFinite(valeur) && valeur >= 0 && valeur <= 5) {
          return valeur;
        }
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Extrait le nombre d'avis depuis le texte "(123 avis)" ou "(1 234)".
 *
 * @param {import('playwright').Page} page - Page Playwright.
 * @returns {Promise<number|null>} Nombre d'avis ou null.
 */
export async function extraireNombreAvis(page) {
  try {
    const texte = await texteDepuisSelecteur(
      page,
      'button[aria-label*="avis"], [aria-label*="avis"], span'
    );
    // Patterns : "123 avis", "(1 234)", "1,2 k avis".
    const motifs = [
      /(\d[\d\s]*)\s*avis/i,
      /\((\d[\d\s.,]*)\)/,
      /(\d[\d\s.,]*)\s*avis/i,
    ];
    for (const motif of motifs) {
      const match = motif.exec(texte);
      if (match) {
        const brut = match[1].replace(/[\s.,]/g, '');
        const valeur = Number.parseInt(brut, 10);
        if (Number.isFinite(valeur)) return valeur;
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Extrait le site web d'une fiche. Le lien est souvent un <a> avec
 * data-item-id="authority" ou un attribut href http(s) distinct de maps.
 *
 * @param {import('playwright').Page} page - Page Playwright.
 * @returns {Promise<string>} URL du site, ou "".
 */
export async function extraireSiteWeb(page) {
  try {
    const lien = page.locator('a[data-item-id="authority"]').first();
    if ((await lien.count()) > 0) {
      const href = (await lien.getAttribute('href')) || '';
      if (/^https?:\/\//.test(href)) return href;
    }
    return '';
  } catch {
    return '';
  }
}

/**
 * Normalise un numéro de téléphone : supprime espaces/points/tirets/parenthèses
 * pour obtenir une valeur compacte et exploitable en CSV (conserve un éventuel
 * préfixe "+" international).
 * @param {string} brut - Numéro brut.
 * @returns {string}
 */
function normaliserTelephone(brut) {
  return (brut || '').replace(/[\s.\-()]/g, '');
}

/**
 * Extrait le téléphone d'une fiche.
 * Google Maps expose le numéro à plusieurs endroits ; on tente dans l'ordre de
 * fiabilité : data-item-id "phone:tel:…", puis lien "tel:…", puis aria-label
 * "Numéro de téléphone: …". On évite le bouton « Envoyer vers un téléphone »
 * (présent sur tous les lieux, y compris sans numéro).
 *
 * @param {import('playwright').Page} page - Page Playwright.
 * @returns {Promise<string>} Numéro normalisé, ou "".
 */
export async function extraireTelephone(page) {
  try {
    // 1. Bouton téléphone : data-item-id="phone:tel:XXXXXXXX" (le plus fiable).
    const bouton = page.locator('button[data-item-id^="phone:tel:"]').first();
    if ((await bouton.count()) > 0) {
      const id = (await bouton.getAttribute('data-item-id')) || '';
      const match = /phone:tel:(.+)$/.exec(id);
      if (match && match[1].trim()) return normaliserTelephone(match[1]);
    }

    // 2. Lien tel: (href="tel:XXXXXXXX").
    const lien = page.locator('a[href^="tel:"]').first();
    if ((await lien.count()) > 0) {
      const href = (await lien.getAttribute('href')) || '';
      const numero = href.replace(/^tel:/, '').trim();
      if (numero) return normaliserTelephone(numero);
    }

    // 3. Bouton avec aria-label "Numéro de téléphone: …".
    const boutonNumero = page.locator('[aria-label*="Numéro de téléphone"]').first();
    if ((await boutonNumero.count()) > 0) {
      const label = (await boutonNumero.getAttribute('aria-label')) || '';
      const match = /Numéro de téléphone\s*:\s*(.+)$/i.exec(label);
      if (match && match[1].trim()) return normaliserTelephone(match[1].trim());
    }

    return '';
  } catch {
    return '';
  }
}

/**
 * Extrait l'adresse depuis le bouton de données "address".
 *
 * @param {import('playwright').Page} page - Page Playwright.
 * @returns {Promise<string>} Adresse, ou "".
 */
export async function extraireAdresse(page) {
  const brut = await texteDepuisSelecteur(page, 'button[data-item-id="address"]');
  // L'aria-label "Adresse : …" est plus propre que le texte du bouton, qui
  // commence par une icône (retour à la ligne parasite).
  const bouton = page.locator('button[data-item-id="address"]').first();
  if ((await bouton.count()) > 0) {
    const label = (await bouton.getAttribute('aria-label')) || '';
    const match = /Adresse\s*:\s*(.+)$/i.exec(label);
    if (match && match[1].trim()) return match[1].replace(/\s+/g, ' ').trim();
  }
  return brut.replace(/\s+/g, ' ').trim();
}

/**
 * Extrait les horaires condensés. Google Maps les stocke dans une table
 * ou un bouton avec aria-label "Horaires".
 *
 * @param {import('playwright').Page} page - Page Playwright.
 * @returns {Promise<string>} Horaires condensés, ou "".
 */
export async function extraireHoraires(page) {
  try {
    // La table d'horaires est la source fiable ; le sélecteur large
    // [aria-label*="Horaires"] attrapait aussi les barres de fréquentation
    // (« 5 | 4 | 3 | 2 | 1 »), d'où le filtrage ci-dessous.
    const lignes = await page.locator('table tr').allInnerTexts();
    const propres = lignes
      .map((l) => nettoyerTexte(l))
      .filter((l) => l && /(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)/i.test(l))
      // Le tableau contient aussi les fourchettes de prix : on les écarte.
      .filter((l) => !/F\s*CFA|\bprix\b|€|\$/i.test(l));

    if (propres.length) return propres.join(' | ');

    // Repli : aria-label des horaires, nettoyé des barres de fréquentation.
    const label = await page
      .locator('[aria-label*="Horaires"]')
      .first()
      .getAttribute('aria-label')
      .catch(() => '');
    if (label) {
      return label
        .replace(/^\s*Horaires\s*:?\s*/i, '')
        .replace(/\s+/g, ' ')
        .trim();
    }
    return '';
  } catch {
    return '';
  }
}
