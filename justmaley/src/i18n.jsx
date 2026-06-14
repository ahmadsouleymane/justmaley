import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const FRANCOPHONE_TZ = new Set([
  'Africa/Abidjan', 'Africa/Bamako', 'Africa/Dakar', 'Africa/Lome', 'Africa/Niamey',
  'Africa/Ouagadougou', 'Africa/Porto-Novo', 'Africa/Brazzaville', 'Africa/Kinshasa',
  'Africa/Douala', 'Africa/Libreville', 'Africa/Bangui', 'Africa/Ndjamena',
  'Africa/Conakry', 'Africa/Nouakchott', 'Africa/Djibouti',
  'Europe/Paris', 'Europe/Brussels', 'Europe/Luxembourg', 'Europe/Monaco',
  'Indian/Antananarivo', 'Indian/Mauritius',
])

function detectLang() {
  if (typeof window === 'undefined') return 'fr'
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    const navLang = (navigator.language || 'fr').slice(0, 2).toLowerCase()
    if (FRANCOPHONE_TZ.has(tz) || navLang === 'fr') return 'fr'
    return 'en'
  } catch {
    return 'fr'
  }
}

export const translations = {
  fr: {
    'nav.work': 'Le travail',
    'nav.about': 'Moi',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.cta': 'M’écrire',

    'hero.proofBadge': '350+',
    'hero.proof': 'utilisateurs actifs sur mon dernier SaaS',
    'hero.h1a': 'Ton idée d’app web,',
    'hero.h1b': 'en ligne dans 14 jours.',
    'hero.sub': 'Je code. Je teste. Je déploie. Tu reçois un produit qui tourne en prod, avec son nom de domaine, son hébergement et son code source. Si je dépasse les 14 jours, je te rembourse.',
    'hero.cta1': 'Démarrer mon projet',
    'hero.cta2': 'Voir un projet en prod',
    'hero.r1': 'Réponse sous 24h',
    'hero.r2': 'Devis gratuit',
    'hero.r3': 'Garantie 14 jours',
    'hero.badge.days': 'jours',
    'hero.badge.delivered': 'livré',

    'work.eyebrow': 'déjà en ligne',
    'work.h1': 'Mon dernier projet.',
    'work.live': 'Live',
    'work.kind': 'SaaS · IA · EdTech',
    'work.role': 'Pensé, codé, lancé. Tout seul.',
    'work.title': 'MisterAll',
    'work.desc': 'Tu lui donnes un cours. Il te sort un résumé, un quiz et des fiches de révision en moins d’une minute. 350 étudiants s’en servent chaque semaine pour réviser leurs partiels.',
    'work.stat1.v': '350+',
    'work.stat1.l': 'utilisateurs actifs',
    'work.stat2.v': '10k+',
    'work.stat2.l': 'contenus générés',
    'work.stat3.v': '14j',
    'work.stat3.l': 'd’idée à prod',
    'work.see': 'misterall.com',
    'work.next': 'Le tien ressemblerait à quoi ?',

    'about.eyebrow': 'qui parle ?',
    'about.h1': 'Développeur web full-stack.',
    'about.p1': 'Je m’appelle Ahmad Souleymane. Je code depuis la Côte d’Ivoire et je construis des applications web pour des entrepreneurs qui veulent voir leur produit en ligne avant la fin du mois.',
    'about.p2': 'Pas de démo qui marche seulement sur mon laptop. Je livre une appli en production, avec son nom de domaine branché, son hébergement payé et le code source dans tes mains. Tes utilisateurs peuvent l’ouvrir le jour de la livraison.',
    'about.p3': 'Je bosse en remote pour des clients en Afrique, en Europe et au Canada. Hors du code : basket, lecture, et j’ai un faible pour la cuisine ivoirienne (le yassa surtout).',
    'about.fact1.l': 'Basé en',
    'about.fact1.v': 'Côte d’Ivoire',
    'about.fact2.l': 'Stack favorite',
    'about.fact2.v': 'React, Node, PostgreSQL',
    'about.fact3.l': 'Langues',
    'about.fact3.v': 'Français, Anglais',
    'about.fact4.l': 'Délai',
    'about.fact4.v': '14 jours en moyenne',

    'services.eyebrow': 'ce que je peux faire pour toi',
    'services.h1': 'Trois façons de bosser ensemble.',
    'services.intro': 'Pas de grille tarifaire affichée. Chaque projet a son contexte. Tu m’écris, je te dis si je peux le faire, combien ça coûte, combien de temps ça prend. Réponse dans la journée.',
    'services.1.t': 'Ton app web de zéro',
    'services.1.d': 'Tu as une idée. Je te livre une app en ligne. Connexion utilisateur, base de données, design propre, hébergement et nom de domaine inclus. Le code est à toi.',
    'services.2.t': 'Une app avec de l’IA dedans',
    'services.2.d': 'Un chatbot qui connaît ton métier. Un assistant qui lit tes PDF. Du contenu généré à la volée. Branché à Groq, OpenAI ou Claude.',
    'services.3.t': 'Un projet à rattraper',
    'services.3.d': 'Un dev parti avant la fin. Une app qui plante. Du code que personne ne comprend plus. J’ouvre le capot, je diagnostique, je répare, je termine.',
    'services.cta': 'On en parle ?',

    'contact.eyebrow': 'on commence ?',
    'contact.h1': 'Parle-moi de ton projet.',
    'contact.h2': 'Je te réponds aujourd’hui.',
    'contact.sub': 'Cinq champs, trente secondes. Je lis chaque message moi-même et je réponds sous 24h. Souvent dans l’heure si tu passes par WhatsApp.',
    'contact.waSub': 'souvent dans l’heure',
    'contact.liSub': 'on se connecte ?',

    'contact.form.subjectPrefix': 'Nouveau projet',
    'contact.form.name': 'Comment tu t’appelles ?',
    'contact.form.namePh': 'Ton prénom',
    'contact.form.email': 'Où je peux te répondre ?',
    'contact.form.emailPh': 'toi@ton-email.com',
    'contact.form.project': 'C’est quel genre de projet ?',
    'contact.form.budget': 'Tu as un budget en tête ?',
    'contact.form.budgetPh': 'Choisis une fourchette',
    'contact.form.message': 'Raconte-moi ça en deux phrases',
    'contact.form.messagePh': 'Une idée, un objectif, une deadline. Pas besoin d’un brief de 4 pages.',
    'contact.form.send': 'Envoyer mon message',
    'contact.form.sending': 'Envoi…',
    'contact.form.sentTitle': 'Message envoyé.',
    'contact.form.sentSub': 'Je l’ai reçu dans ma boîte. Je te réponds dans la journée, souvent dans l’heure si tu m’as donné un WhatsApp.',
    'contact.form.reassurance': 'Je lis chaque message moi-même. Réponse sous 24h, promis.',
    'contact.form.errKey': 'Petite panne côté envoi. Écris-moi directement à souleymane@justmaley.tech, je te réponds dans la journée.',
    'contact.form.errNetwork': 'Pas de connexion. Réessaie dans un instant ou écris-moi sur WhatsApp.',
    'contact.form.errGeneric': 'Impossible d’envoyer. Réessaie ou écris-moi directement à souleymane@justmaley.tech.',

    'footer.rights': 'Tous droits réservés.',
  },
  en: {
    'nav.work': 'Work',
    'nav.about': 'Me',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.cta': 'Write me',

    'hero.proofBadge': '350+',
    'hero.proof': 'active users on my last SaaS',
    'hero.h1a': 'Your web app idea,',
    'hero.h1b': 'live in 14 days.',
    'hero.sub': 'I code. I test. I deploy. You get a product running in production, with its domain, its hosting and its source code. If I miss the 14 days, I refund you.',
    'hero.cta1': 'Start my project',
    'hero.cta2': 'See a project live',
    'hero.r1': 'Reply within 24h',
    'hero.r2': 'Free quote',
    'hero.r3': '14-day guarantee',
    'hero.badge.days': 'days',
    'hero.badge.delivered': 'shipped',

    'work.eyebrow': 'already live',
    'work.h1': 'My latest project.',
    'work.live': 'Live',
    'work.kind': 'SaaS · AI · EdTech',
    'work.role': 'Designed, coded, shipped. Solo.',
    'work.title': 'MisterAll',
    'work.desc': 'You give it a course. It hands you back a summary, a quiz and revision sheets in under a minute. 350 students use it every week to prep their exams.',
    'work.stat1.v': '350+',
    'work.stat1.l': 'active users',
    'work.stat2.v': '10k+',
    'work.stat2.l': 'AI contents generated',
    'work.stat3.v': '14d',
    'work.stat3.l': 'from idea to live',
    'work.see': 'misterall.com',
    'work.next': 'What would yours look like?',

    'about.eyebrow': 'who’s talking?',
    'about.h1': 'Full-stack web developer.',
    'about.p1': 'I’m Ahmad Souleymane. I code from Ivory Coast and I build web applications for founders who want to see their product live before the end of the month.',
    'about.p2': 'No demo running only on my laptop. I ship an app in production, with its domain plugged in, its hosting paid, and the source code in your hands. Your users can open it the day I deliver.',
    'about.p3': 'I work remote with clients in Africa, Europe and Canada. Outside code: basketball, books, and a soft spot for Ivorian food (yassa especially).',
    'about.fact1.l': 'Based in',
    'about.fact1.v': 'Ivory Coast',
    'about.fact2.l': 'Favorite stack',
    'about.fact2.v': 'React, Node, PostgreSQL',
    'about.fact3.l': 'Languages',
    'about.fact3.v': 'French, English',
    'about.fact4.l': 'Timeline',
    'about.fact4.v': '14 days on average',

    'services.eyebrow': 'what I can do for you',
    'services.h1': 'Three ways to work together.',
    'services.intro': 'No fixed price list. Every project has its context. You write me, I tell you if I can build it, how much it costs, how long it takes. Reply within the day.',
    'services.1.t': 'Your web app from zero',
    'services.1.d': 'You have an idea. I ship you a live app. Auth, database, clean design, hosting and domain name included. The code is yours.',
    'services.2.t': 'An app with AI inside',
    'services.2.d': 'A chatbot that knows your business. An assistant that reads your PDFs. Content generated on the fly. Wired to Groq, OpenAI or Claude.',
    'services.3.t': 'A project to rescue',
    'services.3.d': 'A dev gone before the end. An app that crashes. Code nobody understands anymore. I open the hood, I diagnose, I fix, I finish.',
    'services.cta': 'Let’s talk?',

    'contact.eyebrow': 'shall we?',
    'contact.h1': 'Tell me about your project.',
    'contact.h2': 'I’ll reply today.',
    'contact.sub': 'Five fields, thirty seconds. I read every message myself and I reply within 24h. Often within the hour if you use WhatsApp.',
    'contact.waSub': 'often within the hour',
    'contact.liSub': 'let’s connect',

    'contact.form.subjectPrefix': 'New project',
    'contact.form.name': 'What’s your name?',
    'contact.form.namePh': 'Your first name',
    'contact.form.email': 'Where can I reply?',
    'contact.form.emailPh': 'you@your-email.com',
    'contact.form.project': 'What kind of project?',
    'contact.form.budget': 'Got a budget in mind?',
    'contact.form.budgetPh': 'Pick a range',
    'contact.form.message': 'Tell me in two sentences',
    'contact.form.messagePh': 'An idea, a goal, a deadline. No need for a 4-page brief.',
    'contact.form.send': 'Send my message',
    'contact.form.sending': 'Sending…',
    'contact.form.sentTitle': 'Message sent.',
    'contact.form.sentSub': 'It just landed in my inbox. I’ll reply within the day, often within the hour if you left me a WhatsApp number.',
    'contact.form.reassurance': 'I read every message myself. Reply within 24h, promise.',
    'contact.form.errKey': 'Sending is down. Write me directly at souleymane@justmaley.tech, I’ll reply within the day.',
    'contact.form.errNetwork': 'No connection. Try again in a sec or message me on WhatsApp.',
    'contact.form.errGeneric': 'Couldn’t send. Try again or write me at souleymane@justmaley.tech.',

    'footer.rights': 'All rights reserved.',
  },
}

const LocaleContext = createContext(null)
const STORAGE_KEY = 'justmaley.locale.v2'

export function LocaleProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'fr'
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'fr' || saved === 'en') return saved
    } catch { /* empty */ }
    return detectLang()
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang) } catch { /* empty */ }
    if (typeof document !== 'undefined') document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => ({
    lang,
    setLang: setLangState,
    t: (key) => translations[lang]?.[key] ?? translations.fr[key] ?? key,
  }), [lang])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider')
  return ctx
}
