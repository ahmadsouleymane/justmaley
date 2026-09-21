import { motion } from 'framer-motion'
import { useLocale } from '../i18n.jsx'
import { EMAIL, WHATSAPP_URL, LINKEDIN_URL, LOCATION } from '../data/contact.js'
import StudioNav from '../components/StudioNav.jsx'
import StudioFooter from '../components/StudioFooter.jsx'

// La personne derrière le studio.
//
// Avant, Ahmad était LE sujet du site (« développeur web freelance… »). Ici il
// est le visage qu'on met derrière une offre : le studio vend BRAND / GROW /
// BUILD, et cette page répond à « c'est qui, en face ? ». C'est un actif de
// confiance, pas un argument de vente — donc il reste sobre.

const THEME = {
  slug: 'apropos',
  n: '—',
  name: 'À propos',
  theme: 'dark',
  bg: '#0A0A0A',
  fg: '#E3E7D3',
  muted: 'rgba(227,231,211,0.62)',
  hair: 'rgba(227,231,211,0.14)',
  logo: '/logo-wt.svg',
  fr: { tag: 'la personne' },
  en: { tag: 'the person' },
}

const STR = {
  fr: {
    eyebrow: 'qui est derrière',
    h1a: 'Deux métiers,',
    h1b: 'un seul studio.',
    p1: "Je m'appelle Ahmad Souleymane. J'ai appris à fabriquer des images et à écrire du code, et pendant longtemps j'ai fait les deux séparément, pour des gens différents.",
    p2: "JustMaley est né de là : la plupart des entreprises que je croise ont besoin des deux à la fois. Une identité qui tient debout, et un outil qui fonctionne vraiment. Faire appel à deux prestataires pour ça, c'est deux fois les allers-retours, deux fois les malentendus.",
    p3: "Alors j'ai monté une structure qui prend les deux. BRAND pour ton image, GROW pour ta visibilité, BUILD pour tes outils. Trois offres, un seul interlocuteur.",
    factsTitle: 'Repères',
    facts: [
      ['Basé à', 'Niamey, Niger'],
      ['Langues', 'Français, Anglais'],
      ['Image', 'Premiere Pro, After Effects, Figma'],
      ['Code', 'React, Node.js, PostgreSQL, IA'],
    ],
    ctaTitle: 'On travaille ensemble ?',
    ctaSub: "Dis-moi où en est ton activité. Je te réponds sous 24h.",
  },
  en: {
    eyebrow: 'who’s behind it',
    h1a: 'Two trades,',
    h1b: 'one studio.',
    p1: "I'm Ahmad Souleymane. I learned to craft images and to write code, and for a long time I did both separately, for different people.",
    p2: "JustMaley came out of that: most businesses I meet need both at once. An identity that holds up, and a tool that actually works. Hiring two providers for that means twice the back-and-forth, twice the miscommunication.",
    p3: "So I built a structure that takes both. BRAND for your image, GROW for your visibility, BUILD for your tools. Three offers, one point of contact.",
    factsTitle: 'At a glance',
    facts: [
      ['Based in', 'Niamey, Niger'],
      ['Languages', 'French, English'],
      ['Image', 'Premiere Pro, After Effects, Figma'],
      ['Code', 'React, Node.js, PostgreSQL, AI'],
    ],
    ctaTitle: 'Shall we work together?',
    ctaSub: 'Tell me where your business is at. I reply within 24h.',
  },
}

export default function Apropos() {
  const { lang } = useLocale()
  const s = STR[lang] || STR.fr

  return (
    <div style={{ background: THEME.bg, color: THEME.fg }} className="min-h-screen">
      <StudioNav offer={THEME} />

      <main>
        {/* ---------- PORTRAIT + INTRO ---------- */}
        <section className="px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-24">
          <div
            className="mx-auto grid gap-12 md:gap-16 items-center"
            style={{ maxWidth: '1080px', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' }}
          >
            <div>
              <div className="flex items-center gap-3 text-sm mb-6">
                <span className="w-10 h-px" style={{ background: THEME.hair }} />
                <span className="lowercase tracking-wide" style={{ color: THEME.muted }}>{s.eyebrow}</span>
              </div>

              <h1
                className="tracking-tight"
                style={{ fontFamily: 'var(--font-cool)', fontSize: 'clamp(2.2rem, 5.4vw, 4rem)', lineHeight: 1.0, fontWeight: 800, letterSpacing: '-0.02em' }}
              >
                <motion.span className="block" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                  {s.h1a}
                </motion.span>
                <motion.span className="block" style={{ opacity: 0.45 }} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 0.45, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
                  {s.h1b}
                </motion.span>
              </h1>

              <div className="mt-8 space-y-5 text-base leading-relaxed" style={{ color: THEME.muted, maxWidth: '52ch' }}>
                <p>{s.p1}</p>
                <p>{s.p2}</p>
                <p>{s.p3}</p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto w-full float-y"
              style={{ maxWidth: '400px' }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(ellipse 55% 50% at 50% 55%, rgba(227,231,211,0.14) 0%, transparent 70%)', filter: 'blur(40px)' }}
                aria-hidden="true"
              />
              <img src="/profile face.png" alt="Ahmad Souleymane" className="relative block w-full h-auto" />
            </motion.div>
          </div>
        </section>

        {/* ---------- REPÈRES ---------- */}
        <section className="px-6 md:px-10 py-16 md:py-24" style={{ borderTop: `1px solid ${THEME.hair}` }}>
          <div className="mx-auto" style={{ maxWidth: '1080px' }}>
            <h2 className="tracking-tight mb-10" style={{ fontFamily: 'var(--font-cool)', fontSize: 'clamp(1.5rem, 3.2vw, 2.3rem)', fontWeight: 700 }}>
              {s.factsTitle}
            </h2>
            <dl className="grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: THEME.hair, border: `1px solid ${THEME.hair}` }}>
              {s.facts.map(([label, value], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="p-6 md:p-7"
                  style={{ background: THEME.bg }}
                >
                  <dt className="text-[11px] uppercase tracking-[0.16em] mb-2.5" style={{ color: THEME.muted }}>{label}</dt>
                  <dd className="text-sm font-semibold leading-snug">{value}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------- CONTACT ---------- */}
        <section id="contact" className="px-6 md:px-10 py-24 md:py-32" style={{ borderTop: `1px solid ${THEME.hair}` }}>
          {/* Même conteneur que les autres sections, sinon le bord gauche
              sautait par rapport au reste de la page. */}
          <div className="mx-auto" style={{ maxWidth: '1080px' }}>
            <h2 className="tracking-tight" style={{ fontFamily: 'var(--font-cool)', fontSize: 'clamp(1.9rem, 4.4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
              {s.ctaTitle}
            </h2>
            <p className="mt-5 text-base md:text-lg leading-relaxed" style={{ color: THEME.muted, maxWidth: '48ch' }}>
              {s.ctaSub}
            </p>
            <p className="mt-4 text-xs" style={{ color: THEME.muted }}>{LOCATION}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition-opacity hover:opacity-85"
                style={{ background: THEME.fg, color: THEME.bg }}
              >
                {EMAIL}
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-opacity hover:opacity-70" style={{ border: `1px solid ${THEME.hair}` }}>
                WhatsApp
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-opacity hover:opacity-70" style={{ border: `1px solid ${THEME.hair}` }}>
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter offer={THEME} />
    </div>
  )
}
