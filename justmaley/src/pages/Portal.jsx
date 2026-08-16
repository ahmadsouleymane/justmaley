import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useLocale } from '../i18n.jsx'

// Portail "Deux mondes" : l'écran d'entrée se sépare en deux univers, Créatif et
// Développeur. On survole pour agrandir un côté, on clique pour y entrer. C'est
// la traduction directe du double profil d'Ahmad : créateur de contenu et
// développeur web & mobile.

const STR = {
  fr: {
    hint: 'Choisis un monde',
    crea: 'Créatif',
    creaSub: 'Vidéo · Contenu · Design',
    creaLine: 'Je façonne des images, des vidéos et des marques.',
    dev: 'Développeur',
    devSub: 'Web · Mobile · IA',
    devLine: 'Je conçois et je livre des applications qui tournent.',
    enter: 'Entrer',
  },
  en: {
    hint: 'Choose a world',
    crea: 'Creative',
    creaSub: 'Video · Content · Design',
    creaLine: 'I craft visuals, videos and brands.',
    dev: 'Developer',
    devSub: 'Web · Mobile · AI',
    devLine: 'I design and ship apps that run.',
    enter: 'Enter',
  },
}

export default function Portal() {
  const { lang } = useLocale()
  const s = STR[lang] || STR.fr
  const navigate = useNavigate()
  const rootRef = useRef(null)
  const creaRef = useRef(null)
  const devRef = useRef(null)
  const nameRef = useRef(null)
  const [hover, setHover] = useState(null) // 'crea' | 'dev' | null
  const [leaving, setLeaving] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([creaRef.current, devRef.current], { opacity: 0 })
      gsap.set(creaRef.current, { xPercent: -8 })
      gsap.set(devRef.current, { xPercent: 8 })
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to(creaRef.current, { opacity: 1, xPercent: 0, duration: 0.9 })
        .to(devRef.current, { opacity: 1, xPercent: 0, duration: 0.9 }, '<')
        .from(nameRef.current, { opacity: 0, scale: 0.9, duration: 0.8 }, '-=0.4')
    }, rootRef)
    return () => ctx.revert()
  }, [])

  // Transition de sortie puis navigation vers le monde choisi.
  const enter = (world) => {
    if (leaving) return
    setLeaving(world)
    const target = world === 'crea' ? devRef.current : creaRef.current
    const chosen = world === 'crea' ? creaRef.current : devRef.current
    gsap
      .timeline({ onComplete: () => navigate(world === 'crea' ? '/creatif' : '/dev') })
      .to(target, { opacity: 0, duration: 0.4, ease: 'power2.in' })
      .to(chosen, { flexGrow: 40, duration: 0.6, ease: 'power3.inOut' }, '<')
  }

  const grow = (side) => (hover === side ? 62 : hover ? 38 : 50)

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 flex flex-col md:flex-row overflow-hidden bg-black-deep select-none"
    >
      {/* ---------- CÔTÉ CRÉATIF ---------- */}
      <button
        ref={creaRef}
        type="button"
        onMouseEnter={() => setHover('crea')}
        onMouseLeave={() => setHover(null)}
        onClick={() => enter('crea')}
        style={{ flexGrow: grow('crea'), flexBasis: 0, transition: 'flex-grow 0.6s cubic-bezier(0.16,1,0.3,1)' }}
        className="group relative min-h-0 basis-0 overflow-hidden text-left"
        aria-label={s.crea}
      >
        {/* fond chaud */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1a0d05 0%, #0A0A0A 60%)' }} />
        <div
          className="absolute pointer-events-none transition-opacity duration-500"
          style={{
            width: '1200px', height: '1200px', top: '-300px', left: '-200px',
            background: 'radial-gradient(circle, rgba(252,122,30,0.38) 0%, transparent 60%)',
            filter: 'blur(30px)', opacity: hover === 'crea' ? 1 : 0.55,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }}
        />
        <PanelContent
          index="01"
          title={s.crea}
          sub={s.creaSub}
          line={s.creaLine}
          enter={s.enter}
          active={hover === 'crea'}
          accent="#FC7A1E"
        />
      </button>

      {/* ---------- CÔTÉ DÉVELOPPEUR ---------- */}
      <button
        ref={devRef}
        type="button"
        onMouseEnter={() => setHover('dev')}
        onMouseLeave={() => setHover(null)}
        onClick={() => enter('dev')}
        style={{ flexGrow: grow('dev'), flexBasis: 0, transition: 'flex-grow 0.6s cubic-bezier(0.16,1,0.3,1)' }}
        className="group relative min-h-0 basis-0 overflow-hidden text-left"
        aria-label={s.dev}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #0d1512 100%)' }} />
        {/* grille blueprint */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            backgroundImage:
              'linear-gradient(rgba(227,231,211,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(227,231,211,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at 60% 40%, black 20%, transparent 75%)',
            opacity: hover === 'dev' ? 1 : 0.6,
          }}
        />
        <div
          className="absolute pointer-events-none transition-opacity duration-500"
          style={{
            width: '1000px', height: '1000px', bottom: '-300px', right: '-200px',
            background: 'radial-gradient(circle, rgba(23,40,21,0.9) 0%, transparent 60%)',
            opacity: hover === 'dev' ? 1 : 0.5,
          }}
        />
        {/* ligne de code discrète */}
        <div className="absolute top-1/3 right-8 hidden lg:block pointer-events-none font-mono text-[11px] text-offwhite/20 leading-relaxed text-right">
          <div>const maley = () =&gt; {'{'}</div>
          <div>&nbsp;&nbsp;ship(idea)</div>
          <div>{'}'}</div>
        </div>
        <PanelContent
          index="02"
          title={s.dev}
          sub={s.devSub}
          line={s.devLine}
          enter={s.enter}
          active={hover === 'dev'}
          accent="#E3E7D3"
        />
      </button>

      {/* ---------- COUTURE CENTRALE : NOM ---------- */}
      <div
        ref={nameRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none text-center px-4"
      >
        <div
          className="text-offwhite font-bold leading-none tracking-tight"
          style={{ fontFamily: 'var(--font-cool)', fontSize: 'clamp(1.6rem, 4.5vw, 3.2rem)', textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}
        >
          AHMAD SOULEYMANE
        </div>
        <div className="mt-3 inline-flex items-center gap-2 text-offwhite/60 text-[11px] md:text-xs uppercase tracking-[0.25em]">
          <span className="w-6 h-px bg-orange/60" />
          {s.hint}
          <span className="w-6 h-px bg-orange/60" />
        </div>
      </div>
    </div>
  )
}

function PanelContent({ index, title, sub, line, enter, active, accent }) {
  return (
    <div className="relative z-10 h-full w-full flex flex-col justify-end p-8 md:p-12">
      <div className="flex items-center gap-2.5 text-sm mb-4" style={{ color: accent }}>
        <span className="font-mono opacity-70">{index}</span>
        <span className="w-8 h-px" style={{ background: `${accent}80` }} />
        <span className="lowercase tracking-wide opacity-80">{sub}</span>
      </div>
      <h2
        className="text-offwhite tracking-tight"
        style={{ fontFamily: 'var(--font-cool)', fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', lineHeight: 0.95, fontWeight: 800 }}
      >
        {title}
      </h2>
      <p className="mt-4 text-offwhite/60 text-sm md:text-base max-w-sm leading-relaxed">{line}</p>
      <div
        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300"
        style={{ color: accent, transform: active ? 'translateX(6px)' : 'none', opacity: active ? 1 : 0.75 }}
      >
        {enter}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </div>
  )
}
