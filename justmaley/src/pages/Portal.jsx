import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useLocale } from '../i18n.jsx'
import { OFFERS, PILLARS } from '../data/offers.js'
import { SEO_PAGES } from '../data/seo.js'
import Seo from '../components/Seo.jsx'

// Portail JustMaley — trois piliers, une échelle.
//
// Avant, le portail demandait « tu es créatif ou développeur ? » : une question
// sur moi. Maintenant il demande « où en est ton activité ? » : une question sur
// le visiteur. Même geste, mais il vend au lieu de jouer.
//
// Les trois fonds ne sont pas trois couleurs, c'est un dégradé en trois crans :
// papier clair (BRAND) → pierre (GROW) → noir (BUILD). On part de l'image, on
// traverse la visibilité, on finit par le système. La DA du site entier découle
// de cette échelle — les pages d'offre reprennent le fond de leur pilier
// (voir src/data/offers.js), donc la continuité est totale du portail à la vente.
//
// Le nom central garde le mix-blend-difference : il s'inverse tout seul selon
// le fond, ce qui lui permet de traverser les trois panneaux sans qu'on ait à
// gérer trois couleurs de texte.

const STR = {
  fr: {
    brand: { state: "J'existe, mais je ne ressemble à rien.", sub: 'Identité · Logo · Charte' },
    grow: { state: 'Je ressemble à quelque chose, personne ne le voit.', sub: 'Contenu · Vidéo · Réseaux' },
    build: { state: "On me voit, il me manque l'outil.", sub: 'Site · App · Automatisation' },
    hint: 'Où en est ton activité ?',
    enter: 'Entrer',
  },
  en: {
    brand: { state: "I exist, but I don't look like anything.", sub: 'Identity · Logo · Guidelines' },
    grow: { state: 'I look like something, nobody sees it.', sub: 'Content · Video · Social' },
    build: { state: "People see me, I'm missing the tool.", sub: 'Site · App · Automation' },
    hint: 'Where is your business at?',
    enter: 'Enter',
  },
}

export default function Portal() {
  const { lang } = useLocale()
  const s = STR[lang] || STR.fr
  const navigate = useNavigate()
  const rootRef = useRef(null)
  const headRef = useRef(null)
  const panelRefs = useRef({})
  const [hover, setHover] = useState(null)
  const [leaving, setLeaving] = useState(null)

  useEffect(() => {
    const panels = PILLARS.map((p) => panelRefs.current[p]).filter(Boolean)
    const ctx = gsap.context(() => {
      gsap.set(panels, { opacity: 0, yPercent: 5 })
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      // Les trois crans apparaissent en cascade, de gauche à droite.
      tl.to(panels, { opacity: 1, yPercent: 0, duration: 0.85, stagger: 0.1 })
        .from(headRef.current?.children || [], { opacity: 0, y: -14, duration: 0.7, stagger: 0.12 }, '-=0.6')
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const enter = (slug) => {
    if (leaving) return
    setLeaving(slug)
    const chosen = panelRefs.current[slug]
    const others = PILLARS.filter((p) => p !== slug).map((p) => panelRefs.current[p])
    gsap
      .timeline({ onComplete: () => navigate(`/${slug}`) })
      .to(headRef.current, { opacity: 0, duration: 0.3 }, 0)
      .to(others, { opacity: 0, duration: 0.4, ease: 'power2.in' }, 0)
      .to(chosen, { flexGrow: 40, duration: 0.6, ease: 'power3.inOut' }, 0)
  }

  // Au survol : le pilier visé prend 60 %, les deux autres 20 % chacun.
  const grow = (slug) => (hover === slug ? 1.8 : hover ? 0.6 : 1)

  return (
    <div ref={rootRef} className="fixed inset-0 flex flex-col md:flex-row overflow-hidden bg-black-deep select-none">
      <Seo page={SEO_PAGES.home} />
      {PILLARS.map((slug) => (
        <Panel
          key={slug}
          panelRef={(el) => { panelRefs.current[slug] = el }}
          offer={OFFERS[slug]}
          copy={s[slug]}
          lang={lang}
          enterLabel={s.enter}
          grow={grow(slug)}
          active={hover === slug}
          dimmed={hover && hover !== slug}
          onHover={() => setHover(slug)}
          onLeave={() => setHover(null)}
          onClick={() => enter(slug)}
        />
      ))}

      {/* ---------- NOM (mix-blend : s'inverse selon le fond) ---------- */}
      <div
        ref={headRef}
        className="absolute top-0 left-0 right-0 z-30 pointer-events-none flex flex-col items-center pt-7 md:pt-9 px-4"
        style={{ mixBlendMode: 'difference' }}
      >
        <div
          className="font-bold leading-none tracking-tight text-center text-white"
          style={{ fontFamily: 'var(--font-cool)', fontSize: 'clamp(1.15rem, 2.6vw, 1.9rem)' }}
        >
          JUSTMALEY
        </div>
        <div className="mt-2.5 inline-flex items-center gap-2 text-white/90 text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-center">
          <span className="w-5 h-px bg-white/70" />
          {s.hint}
          <span className="w-5 h-px bg-white/70" />
        </div>
      </div>

      {/* Sélecteur de langue, dans le même calque que le nom pour rester lisible. */}
      <div className="absolute top-7 md:top-9 right-5 md:right-8 z-40" style={{ mixBlendMode: 'difference' }}>
        <LangToggle />
      </div>
    </div>
  )
}

function LangToggle() {
  const { lang, setLang } = useLocale()
  const other = lang === 'fr' ? 'en' : 'fr'
  return (
    <button
      type="button"
      onClick={() => setLang(other)}
      aria-label={`Switch to ${other.toUpperCase()}`}
      className="text-[11px] text-white/80 hover:text-white transition-colors tracking-wide"
    >
      <span className="font-semibold">{lang.toUpperCase()}</span>
      <span className="text-white/40 mx-1">/</span>
      <span>{other.toUpperCase()}</span>
    </button>
  )
}

function Panel({ panelRef, offer, copy, lang, enterLabel, grow, active, dimmed, onHover, onLeave, onClick }) {
  const isDark = offer.theme === 'dark'
  const tag = (offer[lang] || offer.fr).tag

  return (
    <button
      ref={panelRef}
      type="button"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        flexGrow: grow,
        flexBasis: 0,
        background: offer.bg,
        transition: 'flex-grow 0.6s cubic-bezier(0.16,1,0.3,1)',
      }}
      className="group relative min-h-0 basis-0 overflow-hidden text-left"
      aria-label={offer.name}
    >
      {/* Texture propre à chaque cran : papier → pierre → plan technique. */}
      {offer.theme === 'light' && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }}
        />
      )}
      {isDark && (
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
          style={{
            backgroundImage: 'linear-gradient(rgba(227,231,211,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(227,231,211,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at 60% 45%, black 20%, transparent 75%)',
          }}
        />
      )}

      {/* Le point : motif hérité du taijitu, dans la couleur opposée au fond.
          Masqué sur mobile : les panneaux n'y font qu'un tiers d'écran, donc il
          retomberait sur le titre fixe en haut de page. */}
      <span
        className="hidden md:block absolute rounded-full float-y"
        style={{
          width: '12px',
          height: '12px',
          top: '22%',
          left: '16%',
          background: isDark ? '#E3E7D3' : '#0A0A0A',
          opacity: active ? 0.85 : 0.45,
          transition: 'opacity 0.4s',
        }}
        aria-hidden="true"
      />

      {/* Contenu ancré en bas. */}
      <div
        className="relative z-10 h-full w-full flex flex-col justify-end p-7 md:p-10"
        style={{ opacity: dimmed ? 0.45 : 1, transition: 'opacity 0.5s' }}
      >
        <div className="flex items-center gap-2.5 text-sm mb-3" style={{ color: offer.fg }}>
          <span className="font-mono opacity-55">{offer.n}</span>
          <span className="w-8 h-px" style={{ background: offer.hair }} />
          <span className="lowercase tracking-wide" style={{ color: offer.muted }}>
            {tag}
          </span>
        </div>

        <h2
          style={{
            color: offer.fg,
            fontFamily: 'var(--font-cool)',
            fontSize: 'clamp(2rem, 4.6vw, 4.6rem)',
            lineHeight: 0.95,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            transform: active ? 'translateY(-4px)' : 'none',
            transition: 'transform 0.4s',
          }}
        >
          {offer.name}
        </h2>

        <p
          className="mt-3.5 hidden sm:block text-sm md:text-[15px] max-w-[22rem] leading-snug"
          style={{ color: offer.muted }}
        >
          {copy?.state}
        </p>

        <p className="mt-2 text-[11px] md:text-xs tracking-wide" style={{ color: offer.muted }}>
          {copy?.sub}
        </p>

        <div
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold"
          style={{
            color: offer.fg,
            transform: active ? 'translateX(6px)' : 'none',
            opacity: active ? 1 : 0.75,
            transition: 'all 0.3s',
          }}
        >
          {enterLabel}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </button>
  )
}
