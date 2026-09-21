// Données SEO, en un seul endroit.
//
// Ce fichier est importé par deux mondes :
//   - le navigateur (src/components/Seo.jsx) qui met à jour <head> à la
//     navigation, pour les utilisateurs et Googlebot ;
//   - Node (scripts/prerender-seo.mjs) qui écrit un vrai fichier HTML par
//     route après le build.
//
// Le prérendu n'est pas un luxe : les robots d'aperçu (WhatsApp, LinkedIn,
// Facebook, X) n'exécutent pas JavaScript. Sans HTML statique par route, tous
// tes liens de prospection affichent le même aperçu générique.
//
// C'est aussi la raison d'être du fichier : une seule vérité, deux sorties.
// Si tu changes un titre ici, il change à la fois dans le HTML livré aux
// robots et dans le <head> après navigation.

import { OFFERS, PILLARS } from './offers.js'
import { faqFor } from './faq.js'

export const SITE = {
  url: 'https://justmaley.tech',
  name: 'JustMaley',
  legalName: 'JustMaley — Studio digital',
  founder: 'Ahmad Souleymane',
  email: 'souleymane@justmaley.tech',
  phone: '+227 78 12 64 81',
  phoneE164: '+22778126481',
  locality: 'Niamey',
  country: 'NE',
  // Centre de Niamey. Sert au balisage local (geo) ; à ajuster si tu veux
  // publier une adresse exacte.
  lat: 13.5116,
  lng: 2.1254,
  ogImage: '/og.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
}

// Zones servies. Le Niger d'abord (marché principal), puis l'Afrique de
// l'Ouest francophone et les clients à distance.
const AREA_SERVED = [
  { '@type': 'Country', name: 'Niger' },
  { '@type': 'Country', name: 'Burkina Faso' },
  { '@type': 'Country', name: 'Mali' },
  { '@type': 'Country', name: 'Bénin' },
  { '@type': 'Country', name: 'Togo' },
  { '@type': 'Country', name: 'Sénégal' },
  { '@type': 'Country', name: "Côte d'Ivoire" },
]

const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  addressLocality: SITE.locality,
  addressCountry: SITE.country,
}

const GEO = {
  '@type': 'GeoCoordinates',
  latitude: SITE.lat,
  longitude: SITE.lng,
}

const STUDIO_ID = `${SITE.url}/#studio`
const WEBSITE_ID = `${SITE.url}/#website`
const FOUNDER_ID = `${SITE.url}/#ahmad`

// Retire les balises pour un titre propre côté partage social.
const plain = (s) => s.replace(/\s+/g, ' ').trim()

const provider = { '@id': STUDIO_ID }

// Construit une offre de catalogue à partir de la donnée commerciale, pour
// qu'un changement de prix ou de nom dans offers.js se répercute dans le
// balisage sans rien retoucher ici.
function serviceOffer(slug, lang = 'fr') {
  const o = OFFERS[slug]
  const c = o[lang]
  return {
    '@type': 'Service',
    '@id': `${SITE.url}/${slug}#service`,
    name: o.name,
    serviceType: c.tag,
    description: c.sub,
    url: `${SITE.url}/${slug}`,
    provider,
    areaServed: AREA_SERVED,
    offers: c.tiers.map((t) => ({
      '@type': 'Offer',
      name: t.name,
      description: t.desc,
      ...(t.price
        ? {
            price: t.price,
            priceCurrency: 'XOF',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: t.price,
              priceCurrency: 'XOF',
              unitText: t.unit === '/mois' ? 'mois' : 'projet',
            },
          }
        : {}),
      availability: 'https://schema.org/InStock',
    })),
  }
}

function faqPage(slug, lang = 'fr') {
  const items = faqFor(slug, lang)
  if (!items.length) return null
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

function breadcrumbs(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: SITE.url + t.path,
    })),
  }
}

const studio = {
  '@type': 'ProfessionalService',
  '@id': STUDIO_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  url: `${SITE.url}/`,
  image: SITE.url + SITE.ogImage,
  logo: `${SITE.url}/logo-bk.svg`,
  telephone: SITE.phoneE164,
  email: SITE.email,
  priceRange: 'XOF',
  currenciesAccepted: 'XOF',
  description:
    "Studio digital à Niamey : identité visuelle, production de contenu et de vidéo, création de sites web, d'applications et d'automatisations. Trois offres — Brand, Grow, Build.",
  address: POSTAL_ADDRESS,
  geo: GEO,
  areaServed: AREA_SERVED,
  founder: { '@id': FOUNDER_ID },
  knowsAbout: [
    'Identité visuelle',
    'Création de logo',
    'Charte graphique',
    'Community management',
    'Montage vidéo',
    'Motion design',
    'Création de site web',
    'Boutique en ligne',
    'Application web sur mesure',
    'Automatisation',
    'Intelligence artificielle',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Offres JustMaley',
    itemListElement: PILLARS.map((slug) => ({
      '@type': 'Offer',
      name: OFFERS[slug].name,
      url: `${SITE.url}/${slug}`,
      description: OFFERS[slug].fr.sub,
    })),
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
}

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE.url}/`,
  name: SITE.name,
  description: 'Studio digital à Niamey : identité, visibilité, outils.',
  inLanguage: 'fr-NE',
  publisher: { '@id': STUDIO_ID },
}

const person = {
  '@type': 'Person',
  '@id': FOUNDER_ID,
  name: SITE.founder,
  givenName: 'Ahmad',
  familyName: 'Souleymane',
  jobTitle: `Fondateur, ${SITE.name}`,
  description:
    "Fondateur de JustMaley. Formation d'image et de développement web, réunies dans un même studio à Niamey.",
  url: `${SITE.url}/apropos`,
  email: `mailto:${SITE.email}`,
  worksFor: { '@id': STUDIO_ID },
  knowsAbout: [
    'Identité visuelle',
    'Premiere Pro',
    'After Effects',
    'Figma',
    'React',
    'Node.js',
    'PostgreSQL',
    'Automatisation',
  ],
  sameAs: ['https://linkedin.com/in/ahmadsouleymane'],
}

// ---------------------------------------------------------------------------
// Les pages. Un titre, une description, un graphe de balisage par route.
// Les titres tiennent autour de 60 caractères : au-delà, Google tronque.
// ---------------------------------------------------------------------------

export const SEO_PAGES = {
  home: {
    path: '/',
    title: 'JustMaley — Studio digital à Niamey | Brand, Grow, Build',
    description:
      "Studio digital à Niamey. Brand pour votre identité visuelle, Grow pour votre visibilité en ligne, Build pour vos sites web et applications. Un seul interlocuteur, de l'image au système.",
    keywords:
      "studio digital Niamey, agence digitale Niger, agence communication Niamey, création site web Niamey, identité visuelle Niger, community management Niamey, JustMaley",
    ogTitle: 'JustMaley — Studio digital à Niamey',
    ogDescription:
      'Brand pour votre identité, Grow pour votre visibilité, Build pour vos outils. Un studio, trois offres, un seul interlocuteur.',
    graph: [studio, website, person],
  },

  brand: {
    path: '/brand',
    title: 'Création de logo et identité visuelle à Niamey | JustMaley',
    description:
      "Création de logo, charte graphique et supports de communication à Niamey. Trois niveaux, de l'Essentiel à la refonte complète. Appel de cadrage gratuit, fichiers sources livrés.",
    keywords:
      "création logo Niamey, identité visuelle Niamey, charte graphique Niger, graphiste Niamey, agence branding Niger, carte de visite Niamey, refonte logo",
    ogTitle: 'Brand — Création de logo et identité visuelle | JustMaley',
    ogDescription:
      'Logo, charte graphique et supports. Votre activité existe : on lui donne une image que vos clients reconnaissent en une seconde.',
    graph: [
      serviceOffer('brand'),
      faqPage('brand'),
      breadcrumbs([
        { name: 'Accueil', path: '/' },
        { name: 'Brand', path: '/brand' },
      ]),
    ],
  },

  grow: {
    path: '/grow',
    title: 'Community management et création de contenu à Niamey | JustMaley',
    description:
      "Gestion de vos réseaux sociaux à Niamey : production de contenu, montage vidéo, motion design et community management. Abonnement mensuel à partir de 75 000 FCFA, sans engagement.",
    keywords:
      "community management Niamey, gestion réseaux sociaux Niger, montage vidéo Niamey, motion design Niger, création contenu Niamey, agence social media Niger, community manager Niamey",
    ogTitle: 'Grow — Contenu, vidéo et réseaux sociaux | JustMaley',
    ogDescription:
      'On produit régulièrement, on soigne la direction artistique, et on vous rend visible là où vos clients passent vraiment leur temps.',
    graph: [
      serviceOffer('grow'),
      faqPage('grow'),
      breadcrumbs([
        { name: 'Accueil', path: '/' },
        { name: 'Grow', path: '/grow' },
      ]),
    ],
  },

  build: {
    path: '/build',
    title: 'Création de site web et application à Niamey | JustMaley',
    description:
      "Création de site vitrine, site business, boutique en ligne, application sur mesure et automatisation à Niamey. Code source remis au client, délai ferme au devis, appel de cadrage gratuit.",
    keywords:
      "création site web Niamey, site vitrine Niger, développeur web Niamey, boutique en ligne Niger, application web sur mesure, e-commerce Niamey, automatisation IA Niger, développeur freelance Niger",
    ogTitle: 'Build — Sites web, applications et automatisation | JustMaley',
    ogDescription:
      'Site, boutique, application, automatisation. On construit ce qui prend le relais quand vous dormez — et qui vous appartient, code source compris.',
    graph: [
      serviceOffer('build'),
      faqPage('build'),
      breadcrumbs([
        { name: 'Accueil', path: '/' },
        { name: 'Build', path: '/build' },
      ]),
    ],
  },

  apropos: {
    path: '/apropos',
    title: 'Ahmad Souleymane, fondateur de JustMaley | Niamey',
    description:
      "Ahmad Souleymane, fondateur de JustMaley. Deux métiers réunis dans un même studio à Niamey : l'image et le code. Voici qui vous aurez en face.",
    keywords:
      "Ahmad Souleymane, JustMaley, fondateur studio digital Niamey, créateur de contenu Niger, développeur web Niger",
    ogTitle: 'Ahmad Souleymane — Fondateur de JustMaley',
    ogDescription:
      'Deux métiers, un seul studio. Qui vous aurez en face quand vous travaillez avec JustMaley.',
    graph: [
      person,
      breadcrumbs([
        { name: 'Accueil', path: '/' },
        { name: 'À propos', path: '/apropos' },
      ]),
    ],
  },
}

// ---------------------------------------------------------------------------
// Rendu du bloc <head>.
// Utilisé par le script de prérendu ET, pour la partie JSON-LD, par le
// composant React. Une seule fonction, donc aucune divergence possible entre
// le HTML livré aux robots et celui vu par le navigateur.
// ---------------------------------------------------------------------------

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function canonicalFor(path) {
  return SITE.url + (path === '/' ? '/' : path)
}

export function jsonLdFor(page) {
  return {
    '@context': 'https://schema.org',
    '@graph': page.graph.filter(Boolean),
  }
}

export function renderSeoBlock(page) {
  const url = canonicalFor(page.path)
  const img = SITE.url + SITE.ogImage
  const ld = JSON.stringify(jsonLdFor(page), null, 2).replace(/<\//g, '<\\/')

  return [
    `    <title>${esc(page.title)}</title>`,
    `    <meta name="description" content="${esc(plain(page.description))}" />`,
    `    <meta name="keywords" content="${esc(page.keywords)}" />`,
    `    <link rel="canonical" href="${url}" />`,
    '',
    '    <!-- Open Graph — lu par WhatsApp, LinkedIn, Facebook. Sans prérendu,',
    '         tous les liens partagés afficheraient le même aperçu. -->',
    '    <meta property="og:type" content="website" />',
    `    <meta property="og:site_name" content="${esc(SITE.name)}" />`,
    '    <meta property="og:locale" content="fr_FR" />',
    '    <meta property="og:locale:alternate" content="en_US" />',
    `    <meta property="og:url" content="${url}" />`,
    `    <meta property="og:title" content="${esc(page.ogTitle)}" />`,
    `    <meta property="og:description" content="${esc(plain(page.ogDescription))}" />`,
    `    <meta property="og:image" content="${img}" />`,
    `    <meta property="og:image:width" content="${SITE.ogImageWidth}" />`,
    `    <meta property="og:image:height" content="${SITE.ogImageHeight}" />`,
    `    <meta property="og:image:alt" content="${esc(SITE.name)} — studio digital à Niamey" />`,
    '',
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name="twitter:title" content="${esc(page.ogTitle)}" />`,
    `    <meta name="twitter:description" content="${esc(plain(page.ogDescription))}" />`,
    `    <meta name="twitter:image" content="${img}" />`,
    '',
    '    <script type="application/ld+json">',
    ld,
    '    </script>',
  ].join('\n')
}
