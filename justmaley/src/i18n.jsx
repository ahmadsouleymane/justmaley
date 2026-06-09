import { createContext, useContext, useEffect, useMemo, useState } from 'react'

/* ---------- Détection automatique ---------- */

const FRANCOPHONE_TZ = new Set([
  'Africa/Abidjan', 'Africa/Bamako', 'Africa/Dakar', 'Africa/Lome', 'Africa/Niamey',
  'Africa/Ouagadougou', 'Africa/Porto-Novo', 'Africa/Brazzaville', 'Africa/Kinshasa',
  'Africa/Douala', 'Africa/Libreville', 'Africa/Bangui', 'Africa/Ndjamena',
  'Africa/Conakry', 'Africa/Nouakchott', 'Africa/Djibouti',
  'Europe/Paris', 'Europe/Brussels', 'Europe/Luxembourg', 'Europe/Monaco',
  'Indian/Antananarivo', 'Indian/Mauritius',
])

const XOF_TZ = new Set([
  'Africa/Abidjan', 'Africa/Bamako', 'Africa/Dakar', 'Africa/Lome', 'Africa/Niamey',
  'Africa/Ouagadougou', 'Africa/Porto-Novo',
])
const XAF_TZ = new Set([
  'Africa/Brazzaville', 'Africa/Douala', 'Africa/Libreville', 'Africa/Bangui',
  'Africa/Ndjamena', 'Africa/Malabo',
])
const EUR_TZ_PREFIX = ['Europe/']
const GBP_TZ = new Set(['Europe/London'])

function detectLocale() {
  if (typeof window === 'undefined') return { lang: 'fr', currency: 'XOF' }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    const navLang = (navigator.language || 'fr').slice(0, 2).toLowerCase()

    let currency = 'USD'
    if (XOF_TZ.has(tz)) currency = 'XOF'
    else if (XAF_TZ.has(tz)) currency = 'XAF'
    else if (GBP_TZ.has(tz)) currency = 'GBP'
    else if (EUR_TZ_PREFIX.some((p) => tz.startsWith(p))) currency = 'EUR'

    let lang = 'en'
    if (FRANCOPHONE_TZ.has(tz)) lang = 'fr'
    else if (navLang === 'fr') lang = 'fr'

    return { lang, currency }
  } catch {
    return { lang: 'fr', currency: 'XOF' }
  }
}

/* ---------- Conversion des prix (base EUR) ---------- */

// 1 EUR = X
const RATES = { EUR: 1, XOF: 655.957, XAF: 655.957, USD: 1.08, GBP: 0.85 }

function roundForCurrency(value, currency) {
  if (currency === 'XOF' || currency === 'XAF') return Math.round(value / 5000) * 5000
  if (currency === 'USD' || currency === 'EUR' || currency === 'GBP') return Math.round(value / 5) * 5
  return Math.round(value)
}

export function formatPrice(eurAmount, currency, lang) {
  const converted = roundForCurrency(eurAmount * (RATES[currency] || 1), currency)
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US'
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(converted)
  } catch {
    return `${converted} ${currency}`
  }
}

/* ---------- Traductions ---------- */

export const translations = {
  fr: {
    'nav.about': 'À propos',
    'nav.services': 'Offres',
    'nav.work': 'Réalisations',
    'nav.contact': 'Contact',
    'nav.cta': 'Démarrer un projet',

    'hero.tag': 'Développeur Web · SaaS Builder',
    'hero.title1': 'Votre prochain produit.',
    'hero.title2': 'Pas dans 7 mois. Dans 7 jours.',
    'hero.sub': 'Je conçois, développe et déploie votre application web ou votre SaaS sur mesure. Vous validez l’idée le lundi — elle est en production le lundi suivant.',
    'hero.cta1': 'Voir mes offres',
    'hero.cta2': 'Démarrer un projet',
    'hero.live': 'En production',
    'hero.url': 'misterall.com',
    'hero.badge.users': '350+ utilisateurs',
    'hero.badge.usersSub': 'en production',
    'hero.badge.days': 'jours',
    'hero.badge.delivery': 'livraison',

    'about.tag': 'À propos',
    'about.title1': 'Un partenaire technique.',
    'about.title2': 'Un produit en ligne.',
    'about.p1': 'Ahmad Souleymane, développeur web full-stack. J’accompagne entrepreneurs et porteurs de projets dans la conception, le développement et la mise en production de leurs applications web et SaaS — du cadrage stratégique à la livraison du code source.',
    'about.p2': 'Double formation en développement et en économie-gestion : chaque ligne de code sert votre modèle d’affaires. L’objectif n’est pas une démonstration technique, mais un produit utilisable, en ligne, qui crée de la valeur.',
    'about.loc': 'Yamoussoukro, Côte d’Ivoire',
    'about.remote': 'Collaboration à distance · clients francophones et anglophones',

    'services.tag': 'Offres',
    'services.title1': 'Trois offres.',
    'services.title2': 'Un produit livré.',
    'services.popular': 'RECOMMANDÉ',
    'services.from': 'À partir de',
    'services.delay': 'Livraison',
    'services.days': 'jours',
    'services.discuss': 'Demander un devis',

    'services.1.title': 'Application web sur mesure',
    'services.1.desc': 'Une application centrée sur votre fonctionnalité clé, avec authentification, page de présentation et expérience responsive. Mise en production complète, code source remis.',
    'services.1.f1': 'Authentification utilisateur',
    'services.1.f2': 'Page de présentation',
    'services.1.f3': 'Mise en production',
    'services.1.f4': 'Code source remis',

    'services.2.title': 'Application web avec IA',
    'services.2.desc': 'Une application enrichie d’intelligence artificielle — assistant conversationnel, génération de contenu, traitement de documents. Production complète, code source remis.',
    'services.2.f1': 'Assistant IA intégré',
    'services.2.f2': 'Génération de contenu',
    'services.2.f3': 'Authentification & production',
    'services.2.f4': 'Code source remis',

    'services.3.title': 'Audit et reprise de projet',
    'services.3.desc': 'Diagnostic technique approfondi, correction des dysfonctionnements et finalisation des fonctionnalités d’un projet existant ou interrompu.',
    'services.3.f1': 'Diagnostic technique',
    'services.3.f2': 'Résolution des bogues',
    'services.3.f3': 'Finalisation des fonctionnalités',
    'services.3.f4': 'Rapport détaillé',

    'services.add.title': 'Modules complémentaires',
    'services.add.sub': 'Disponibles avec chaque offre',
    'services.add.1': 'Paiement en ligne (Stripe, PayPal)',
    'services.add.2': 'Tableau de bord administrateur',
    'services.add.3': 'Nom de domaine et adresses professionnelles',
    'services.add.4': 'Fonctionnalité sur mesure',
    'services.add.5': 'Pack complet prêt à commercialiser',
    'services.add.6': 'Maintenance mensuelle',
    'services.add.7': 'Livraison express',

    'work.tag': 'Réalisation phare',
    'work.title1': 'Une preuve.',
    'work.title2': 'En production.',
    'work.live': 'EN PRODUCTION',
    'work.kind': 'SaaS · Intelligence Artificielle',
    'work.desc': 'MisterAll, plateforme d’apprentissage propulsée par l’intelligence artificielle. À partir d’un cours, l’application génère automatiquement résumés, quiz et fiches de révision. Conçue, développée et déployée de l’idée initiale à la mise en ligne.',
    'work.stat1': 'Utilisateurs actifs',
    'work.stat2': 'Contenus générés',
    'work.stat3': 'Conception · Code · Production',
    'work.stack': 'Technologies utilisées',
    'work.see': 'Visiter le projet',
    'work.discuss': 'Construisons le vôtre',

    'stack.tag': 'Expertise technique',
    'stack.title1': 'Une stack moderne.',
    'stack.title2': 'Une exécution maîtrisée.',
    'stack.cat': 'Domaine',
    'stack.front': 'Front-end',
    'stack.back': 'Back-end',
    'stack.db': 'Bases de données',
    'stack.ai': 'Intelligence artificielle',
    'stack.mobile': 'Mobile',

    'why.tag': 'Engagements',
    'why.title1': 'Une démarche.',
    'why.title2': 'Quatre engagements.',
    'why.1.title': 'Un produit déjà en production',
    'why.1.text': 'MisterAll est en ligne, utilisé quotidiennement. Plus de 350 utilisateurs et 10 000 contenus générés via IA.',
    'why.2.title': 'Votre code, votre propriété',
    'why.2.text': 'Code source intégral, documentation et accès remis. Aucun verrou technique, une autonomie durable.',
    'why.3.title': 'Un interlocuteur unique',
    'why.3.text': 'Vous échangez directement avec l’expert qui conçoit, développe et déploie. Sans intermédiation.',
    'why.4.title': 'Délais contractualisés',
    'why.4.text': 'Livraison en sept jours pour les offres standards. La date annoncée est la date tenue.',

    'process.tag': 'Méthode',
    'process.title1': 'Quatre étapes.',
    'process.title2': 'Sept jours.',
    'process.1.title': 'Cadrage stratégique',
    'process.1.text': 'Définition des objectifs, de la fonctionnalité cœur et du périmètre de livraison.',
    'process.2.title': 'Conception et développement',
    'process.2.text': 'Architecture, base de données et interface. Aperçus partagés à chaque jalon.',
    'process.3.title': 'Mise en production',
    'process.3.text': 'Déploiement sur infrastructure professionnelle, configuration du domaine, tests multi-appareils.',
    'process.4.title': 'Transfert et accompagnement',
    'process.4.text': 'Remise du code source, des accès et de la documentation. Accompagnement au démarrage.',

    'contact.tag': 'Contact',
    'contact.title1': 'Parlons de',
    'contact.title2': 'votre projet.',
    'contact.sub': 'Un premier échange pour évaluer la faisabilité, le périmètre et le délai. Sans engagement.',
    'contact.email': 'Adresse électronique',
    'contact.wa': 'WhatsApp',
    'contact.waSub': 'Réponse sous 24 heures',
    'contact.form.name': 'Nom complet',
    'contact.form.namePh': 'Votre nom',
    'contact.form.email': 'Adresse électronique',
    'contact.form.emailPh': 'vous@entreprise.com',
    'contact.form.msg': 'Description du projet',
    'contact.form.msgPh': 'Présentez votre projet en quelques lignes…',
    'contact.form.send': 'Envoyer ma demande',

    'footer.title1': 'Donnez vie',
    'footer.title2': 'à votre projet.',
    'footer.sub': 'Sept jours de livraison. Un code source qui vous appartient. Un interlocuteur unique.',
    'footer.cta': 'Démarrer un projet',
    'footer.rights': 'Tous droits réservés.',
  },
  en: {
    'nav.about': 'About',
    'nav.services': 'Offerings',
    'nav.work': 'Case study',
    'nav.contact': 'Contact',
    'nav.cta': 'Start a project',

    'hero.tag': 'Full-Stack Web Dev · SaaS Builder',
    'hero.title1': 'Your next product.',
    'hero.title2': 'Not in 7 months. In 7 days.',
    'hero.sub': 'I design, build and ship your custom web app or SaaS. You validate the idea on Monday — it’s live in production the following Monday.',
    'hero.cta1': 'View offerings',
    'hero.cta2': 'Start a project',
    'hero.live': 'Live in production',
    'hero.url': 'misterall.com',
    'hero.badge.users': '350+ users',
    'hero.badge.usersSub': 'in production',
    'hero.badge.days': 'days',
    'hero.badge.delivery': 'delivery',

    'about.tag': 'About',
    'about.title1': 'A technical partner.',
    'about.title2': 'A product in production.',
    'about.p1': 'Ahmad Souleymane, full-stack web developer. I partner with founders and project owners to design, build and ship custom web applications and SaaS products — from strategic scoping to source code handover.',
    'about.p2': 'Dual training in software engineering and business administration: every line of code serves your business model. The goal is not a technical demo, but a usable, live product that creates value.',
    'about.loc': 'Yamoussoukro, Ivory Coast',
    'about.remote': 'Remote collaboration · English and French-speaking clients',

    'services.tag': 'Offerings',
    'services.title1': 'Three offerings.',
    'services.title2': 'One shipped product.',
    'services.popular': 'RECOMMENDED',
    'services.from': 'From',
    'services.delay': 'Delivery',
    'services.days': 'days',
    'services.discuss': 'Request a quote',

    'services.1.title': 'Custom web application',
    'services.1.desc': 'A web application centred on your core feature, with authentication, a presentation page and a responsive experience. Full production deployment, source code handed over.',
    'services.1.f1': 'User authentication',
    'services.1.f2': 'Presentation page',
    'services.1.f3': 'Production deployment',
    'services.1.f4': 'Source code handed over',

    'services.2.title': 'AI-powered web application',
    'services.2.desc': 'A web application augmented with artificial intelligence — conversational assistant, content generation, document processing. Full production, source code handed over.',
    'services.2.f1': 'Integrated AI assistant',
    'services.2.f2': 'Content generation',
    'services.2.f3': 'Authentication & production',
    'services.2.f4': 'Source code handed over',

    'services.3.title': 'Audit and project recovery',
    'services.3.desc': 'In-depth technical audit, resolution of malfunctions and completion of features on an existing or stalled project.',
    'services.3.f1': 'Technical audit',
    'services.3.f2': 'Bug resolution',
    'services.3.f3': 'Feature completion',
    'services.3.f4': 'Detailed report',

    'services.add.title': 'Add-on modules',
    'services.add.sub': 'Available with every offering',
    'services.add.1': 'Online payments (Stripe, PayPal)',
    'services.add.2': 'Administrator dashboard',
    'services.add.3': 'Custom domain and professional email',
    'services.add.4': 'Bespoke feature',
    'services.add.5': 'Turnkey, ready-to-sell bundle',
    'services.add.6': 'Monthly maintenance',
    'services.add.7': 'Express delivery',

    'work.tag': 'Featured case study',
    'work.title1': 'Proof.',
    'work.title2': 'In production.',
    'work.live': 'LIVE IN PRODUCTION',
    'work.kind': 'SaaS · Artificial Intelligence',
    'work.desc': 'MisterAll, a learning platform powered by artificial intelligence. From a single course, the application automatically generates summaries, quizzes and revision sheets. Designed, developed and deployed end-to-end.',
    'work.stat1': 'Active users',
    'work.stat2': 'Contents generated',
    'work.stat3': 'Design · Code · Production',
    'work.stack': 'Technologies used',
    'work.see': 'Visit the project',
    'work.discuss': 'Let’s build yours',

    'stack.tag': 'Technical expertise',
    'stack.title1': 'A modern stack.',
    'stack.title2': 'Mastered execution.',
    'stack.cat': 'Domain',
    'stack.front': 'Front-end',
    'stack.back': 'Back-end',
    'stack.db': 'Databases',
    'stack.ai': 'Artificial intelligence',
    'stack.mobile': 'Mobile',

    'why.tag': 'Commitments',
    'why.title1': 'One approach.',
    'why.title2': 'Four commitments.',
    'why.1.title': 'A product already in production',
    'why.1.text': 'MisterAll is live, used daily — over 350 active users and 10,000 AI-generated contents.',
    'why.2.title': 'Your code, your property',
    'why.2.text': 'Complete source code, documentation and access. No technical lock-in, lasting autonomy.',
    'why.3.title': 'A single point of contact',
    'why.3.text': 'You deal directly with the expert who designs, develops and deploys. No intermediaries.',
    'why.4.title': 'Contracted timelines',
    'why.4.text': 'Seven-day delivery for standard offerings. The announced date is the date kept.',

    'process.tag': 'Method',
    'process.title1': 'Four steps.',
    'process.title2': 'Seven days.',
    'process.1.title': 'Strategic scoping',
    'process.1.text': 'Defining the objectives, the core feature and the delivery scope.',
    'process.2.title': 'Design and development',
    'process.2.text': 'Architecture, database and interface. Previews shared at every milestone.',
    'process.3.title': 'Production deployment',
    'process.3.text': 'Deployment on professional infrastructure, domain setup, multi-device testing.',
    'process.4.title': 'Handover and support',
    'process.4.text': 'Handover of source code, access and documentation. Onboarding support.',

    'contact.tag': 'Contact',
    'contact.title1': 'Let’s discuss',
    'contact.title2': 'your project.',
    'contact.sub': 'A first conversation to assess feasibility, scope and timeline. No commitment.',
    'contact.email': 'Email address',
    'contact.wa': 'WhatsApp',
    'contact.waSub': 'Reply within 24 hours',
    'contact.form.name': 'Full name',
    'contact.form.namePh': 'Your name',
    'contact.form.email': 'Email address',
    'contact.form.emailPh': 'you@company.com',
    'contact.form.msg': 'Project brief',
    'contact.form.msgPh': 'A few lines about your project…',
    'contact.form.send': 'Send my request',

    'footer.title1': 'Bring your project',
    'footer.title2': 'to life.',
    'footer.sub': 'Seven days to delivery. Source code that belongs to you. A single point of contact.',
    'footer.cta': 'Start a project',
    'footer.rights': 'All rights reserved.',
  },
}

/* ---------- React context ---------- */

const LocaleContext = createContext(null)

const STORAGE_KEY = 'justmaley.locale.v1'

export function LocaleProvider({ children }) {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return { lang: 'fr', currency: 'XOF', auto: true }
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
      if (saved?.lang && saved?.currency) return { ...saved, auto: false }
    } catch { /* empty */ }
    const auto = detectLocale()
    return { ...auto, auto: true }
  })

  useEffect(() => {
    if (state.auto) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ lang: state.lang, currency: state.currency })) } catch { /* empty */ }
  }, [state])

  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = state.lang
  }, [state.lang])

  const value = useMemo(() => ({
    lang: state.lang,
    currency: state.currency,
    setLang: (lang) => setState((s) => ({ ...s, lang, auto: false })),
    setCurrency: (currency) => setState((s) => ({ ...s, currency, auto: false })),
    t: (key) => translations[state.lang]?.[key] ?? translations.fr[key] ?? key,
    price: (eur) => formatPrice(eur, state.currency, state.lang),
  }), [state])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider')
  return ctx
}
