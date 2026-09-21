# gmaps-prospection-niamey

Outil en ligne de commande (Node.js + Playwright) qui extrait des **coordonnées
professionnelles publiques** depuis Google Maps, à Niamey (Niger), à des fins de
prospection B2B légitime : nom, adresse, téléphone, site web, note, horaires,
géolocalisation.

Le scraper est conçu pour être **robuste** : délais aléatoires, reprise sur
incident (`--resume`), écriture en flux (aucune perte en cas de crash),
déduplication, et gestion d'erreurs fiche par fiche.

---

## ⚠️ Conditions d'utilisation

- Les données extraites sont **publiques** (coordonnées professionnelles
  affichées par les commerces eux-mêmes). Ce sont des **données à caractère
  personnel** au sens du RGPD dès qu'elles concernent des personnes physiques :
  utilisez-les de façon licite et loyale, et respectez vos obligations locales
  (base légale, information, droit d'opposition, etc.).
- L'extraction automatisée de Google Maps est **contraire aux conditions
  d'utilisation de Google** et peut conduire au blocage de votre adresse IP ou
  de votre compte. Utilisez cet outil à **vos propres risques**, de manière
  raisonnable (volumes faibles, pauses longues), et pour un usage conforme à la
  loi.
- Ne contournez aucune mesure d'authentification ou de protection d'accès.
  L'outil ne fait que lire des pages publiques.

---

## Installation

Prérequis : **Node.js 20+**.

```bash
npm install
npx playwright install chromium
```

> `npx playwright install chromium` télécharge le navigateur Chromium utilisé
> par Playwright. C'est une étape indispensable après `npm install`.

## Configuration

1. **Requêtes à scraper** — `config/requetes.json` contient la liste complète
   (69 catégories, **321 requêtes** au total). Chaque entrée :

   ```json
   { "requete": "restaurant Plateau Niamey", "categorie": "restaurant", "max": 60 }
   ```

   - `requete` : texte de la recherche sur Google Maps.
   - `categorie` : libellé métier (sert de filtre `--requete` et de colonne).
   - `max` : nombre maximum de fiches à extraire pour cette requête.

2. **Couverture maximale** — Google Maps plafonne à ~100–120 résultats par
   recherche. Pour dépasser ce plafond, les catégories à fort volume
   (restaurant, maquis, salon de coiffure…) sont **déclinées par quartier**
   (Plateau, Yantala, Boukoki, Talladjé, Dar Es Salam…). La liste est générée
   par un script éditable :

   ```bash
   npm run gen:requetes   # régénère config/requetes.json
   ```

   Modifiez `scripts/generer-requetes.js` (catégories, quartiers, max) puis
   relancez la commande ci-dessus pour ajuster la couverture.

3. **Options (facultatif)** — copiez `.env.example` en `.env` et ajustez si
   besoin (headless, timeouts, délais, dossier de sortie…).

## Exécution

### Interface web (recommandé)

```bash
npm run web
```

Ouvrez ensuite **http://localhost:3000** dans votre navigateur. Le tableau de
bord permet de :

- sélectionner les catégories à scraper et le nombre max de fiches ;
- **lancer / arrêter** un scraping ;
- suivre la **progression en temps réel** (barre, compteurs, console de logs) ;
- consulter, **filtrer** et **exporter (CSV / JSON)** les résultats des sessions
  précédentes.

> En mode web, le navigateur de scraping est **headless par défaut** (vous
> regardez le tableau de bord). Cochez « Afficher le navigateur » pour lancer
> une fenêtre visible. Le port est modifiable via la variable `PORT`.

### Ligne de commande

```bash
# Scrape toutes les requêtes de la config
node src/index.js

# Scrape uniquement la catégorie "hotel"
node src/index.js --requete "hotel"

# Limite le nombre de fiches pour chaque requête (override du max)
node src/index.js --max 20

# Reprend là où le précédent run s'est arrêté
node src/index.js --resume

# Force le mode headless (déconseillé : détection plus probable)
node src/index.js --headless

# Extrait 5 fiches en parallèle (plus rapide)
node src/index.js --concurrence 5

# Mode rapide : délais anti-détection réduits (plus rapide, plus risqué)
node src/index.js --rapide
```

Les options se combinent, par exemple :

```bash
node src/index.js --requete "restaurant" --max 30 --resume --concurrence 4
```

## Vitesse

Deux leviers, tous deux exposés dans le dashboard (champs « Parallélisme » et
« Mode rapide ») et en CLI :

- **Parallélisme** (`--concurrence N`, défaut 3) : nombre de fiches extraites
  simultanément. C'est le principal accélérateur (×3 ≈ 3 fois plus rapide).
- **Mode rapide** (`--rapide`) : réduit les délais aléatoires entre deux fiches
  et les pauses longues.

> ⚠️ Plus vous accélérez, plus vous multipliez les requêtes vers Google et plus
> le risque de CAPTCHA/blocage augmente. Commencez modéré (`--concurrence 3`),
> et montez seulement si vous n'êtes pas bloqué. `--resume` est votre filet de
> sécurité : relancez et le scraping reprend là où il s'est arrêté.

## Sorties

- `data/output/prospects_<AAAA-MM-JJ>.csv` — séparateur virgule, **UTF-8 avec
  BOM** (s'ouvre correctement dans Excel / Google Sheets).
- `data/output/prospects_<AAAA-MM-JJ>.json` — tableau d'objets identique.
- `data/output/scrape-<AAAA-MM-JJ>.log` — journal horodaté.
- `data/checkpoints/<categorie>.json` — état de reprise (utilisé par `--resume`).

### Champs extraits

| Champ | Description |
| --- | --- |
| `nom` | Nom du commerce |
| `categorie` | Catégorie issue de la config |
| `adresse` | Adresse postale |
| `telephone` | Numéro brut (format international si fourni) |
| `site_web` | URL du site, ou `""` |
| `note` | Note moyenne (ex : `4.3`), ou `null` |
| `nb_avis` | Nombre d'avis, ou `null` |
| `horaires` | Horaires condensés, ou `""` |
| `url_maps` | URL complète de la fiche |
| `latitude` / `longitude` | Coordonnées, ou `null` |
| `requete_source` | Requête qui a produit la fiche |
| `date_scraping` | Date ISO 8601 |

## Architecture

```
src/
  index.js       → point d'entrée CLI, arguments, orchestration
  server.js      → serveur web (API REST + SSE + statique public/)
  scraper.js     → logique Playwright (navigation, scroll, extraction)
  extractors.js  → fonctions pures d'extraction depuis le DOM
  storage.js     → écriture CSV/JSON, déduplication, checkpoints
  config.js      → chargement config + requêtes
  logger.js      → logs horodatés console + fichier
  emetteur.js    → bus d'événements (progression partagée CLI/web)
public/
  index.html     → tableau de bord
  style.css      → styles du tableau de bord
  app.js         → logique frontend (SSE + résultats + export)
config/
  requetes.json  → liste des requêtes à scraper
```

## API web (résumé)

| Méthode | Route | Rôle |
| --- | --- | --- |
| `GET` | `/api/requetes` | Liste des requêtes de la config |
| `GET` | `/api/resultats` | Liste des sessions (dates + nb fiches) |
| `GET` | `/api/resultats/:date` | Prospects d'une session |
| `GET` | `/api/export?type=csv\|json&date=…` | Téléchargement CSV/JSON |
| `POST` | `/api/scrape` | Lance un scraping (`{categories, max, resume, navigateurVisible}`) |
| `POST` | `/api/scrape/stop` | Demande l'arrêt (coopératif) |
| `GET` | `/api/events` | Flux SSE de progression |

## Robustesse

- Navigateur **headful** par défaut (fenêtre 1440×900) pour limiter la détection.
- Timeouts explicites sur chaque attente + délais aléatoires (jamais de sleep
  fixe seul).
- Une fiche qui échoue n'arrête jamais le script : champ renseigné à `""`,
  warning logué, et on passe à la suivante.
- Déduplication par `url_maps` puis par `(nom + adresse)`.
- Pause longue aléatoire (15–40 s) toutes les 20 fiches.
- Fermeture propre du navigateur dans un bloc `finally`.

## Licence

MIT.
