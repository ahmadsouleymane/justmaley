import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useLocale } from '../i18n.jsx'

// Portail "Deux mondes" — concept yin & yang.
// Blanc = Créatif (pureté, design, élégance). Noir = Développeur (terminal, code).
// On survole pour agrandir un côté, on clique pour y entrer. Le nom central
// utilise mix-blend-difference : il s'inverse tout seul selon le fond (noir sur
// blanc, blanc sur noir), comme le point de chaque moitié du taijitu.

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
  const headRef = useRef(null)
  const [hover, setHover] = useState(null)
  const [leaving, setLeaving] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([creaRef.current, devRef.current], { opacity: 0 })
      gsap.set(creaRef.current, { yPercent: 6 })
      gsap.set(devRef.current, { yPercent: 6 })
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to(creaRef.current, { opacity: 1, yPercent: 0, duration: 0.9 })
        .to(devRef.current, { opacity: 1, yPercent: 0, duration: 0.9 }, '<0.12')
        .from(headRef.current?.children || [], { opacity: 0, y: -14, duration: 0.7, stagger: 0.12 }, '-=0.5')
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const enter = (world) => {
    if (leaving) return
    setLeaving(world)
    const other = world === 'crea' ? devRef.current : creaRef.current
    const chosen = world === 'crea' ? creaRef.current : devRef.current
    gsap
      .timeline({ onComplete: () => navigate(world === 'crea' ? '/creatif' : '/dev') })
      .to(headRef.current, { opacity: 0, duration: 0.3 }, 0)
      .to(other, { opacity: 0, duration: 0.4, ease: 'power2.in' }, 0)
      .to(chosen, { flexGrow: 40, duration: 0.6, ease: 'power3.inOut' }, 0)
  }

  const grow = (side) => (hover === side ? 60 : hover ? 40 : 50)

  return (
    <div ref={rootRef} className="fixed inset-0 flex flex-col md:flex-row overflow-hidden bg-black-deep select-none">
      {/* ---------- CÔTÉ CRÉATIF (blanc) ---------- */}
      <Panel
        panelRef={creaRef}
        onHover={() => setHover('crea')}
        onLeave={() => setHover(null)}
        onClick={() => enter('crea')}
        grow={grow('crea')}
        active={hover === 'crea'}
        dimmed={hover === 'dev'}
        index="01"
        title={s.crea}
        sub={s.creaSub}
        line={s.creaLine}
        enterLabel={s.enter}
        variant="crea"
      />

      {/* ---------- CÔTÉ DÉVELOPPEUR (noir) ---------- */}
      <Panel
        panelRef={devRef}
        onHover={() => setHover('dev')}
        onLeave={() => setHover(null)}
        onClick={() => enter('dev')}
        grow={grow('dev')}
        active={hover === 'dev'}
        dimmed={hover === 'crea'}
        index="02"
        title={s.dev}
        sub={s.devSub}
        line={s.devLine}
        enterLabel={s.enter}
        variant="dev"
      />

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
          AHMAD SOULEYMANE
        </div>
        <div className="mt-2.5 inline-flex items-center gap-2 text-white/90 text-[10px] md:text-[11px] uppercase tracking-[0.28em]">
          <span className="w-5 h-px bg-white/70" />
          {s.hint}
          <span className="w-5 h-px bg-white/70" />
        </div>
      </div>
    </div>
  )
}

function Panel({ panelRef, onHover, onLeave, onClick, grow, active, dimmed, index, title, sub, line, enterLabel, variant }) {
  const isCrea = variant === 'crea'
  // Couleurs inversées d'un monde à l'autre (yin & yang).
  const fg = isCrea ? '#0A0A0A' : '#E3E7D3'
  const muted = isCrea ? 'rgba(10,10,10,0.60)' : 'rgba(227,231,211,0.60)'
  const hair = isCrea ? 'rgba(10,10,10,0.22)' : 'rgba(227,231,211,0.22)'

  return (
    <button
      ref={panelRef}
      type="button"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ flexGrow: grow, flexBasis: 0, transition: 'flex-grow 0.6s cubic-bezier(0.16,1,0.3,1)' }}
      className="group relative min-h-0 basis-0 overflow-hidden text-left"
      aria-label={title}
    >
      {/* fond */}
      <div
        className="absolute inset-0"
        style={{ background: isCrea ? 'linear-gradient(150deg, #ffffff 0%, #efeee8 100%)' : 'linear-gradient(150deg, #0d0d0d 0%, #060606 100%)' }}
      />
      {/* texture propre à chaque monde */}
      {isCrea ? (
        // grain fin, très léger — pureté, papier
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }}
        />
      ) : (
        // grille blueprint blanche
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
          style={{
            backgroundImage: 'linear-gradient(rgba(227,231,211,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(227,231,211,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at 60% 45%, black 20%, transparent 75%)',
          }}
        />
      )}

      {/* "œil" du taijitu : un cercle de la couleur opposée, qui flotte */}
      <span
        className="absolute rounded-full float-y"
        style={{
          width: '14px', height: '14px',
          top: '22%', [isCrea ? 'right' : 'left']: '16%',
          background: isCrea ? '#0A0A0A' : '#E3E7D3',
          opacity: active ? 0.9 : 0.55,
          transition: 'opacity 0.4s',
        }}
        aria-hidden="true"
      />

      {/* curseur code, côté dev */}
      {!isCrea && (
        <div className="absolute top-1/3 right-6 md:right-10 hidden lg:block pointer-events-none font-mono text-[11px] text-offwhite/25 leading-relaxed text-right">
          <div>const maley = () =&gt; {'{'}</div>
          <div>&nbsp;&nbsp;ship(idea)<span className="blink">_</span></div>
          <div>{'}'}</div>
        </div>
      )}

      {/* contenu ancré en bas */}
      <div className="relative z-10 h-full w-full flex flex-col justify-end p-8 md:p-12" style={{ opacity: dimmed ? 0.5 : 1, transition: 'opacity 0.5s' }}>
        <div className="flex items-center gap-2.5 text-sm mb-4" style={{ color: fg }}>
          <span className="font-mono opacity-60">{index}</span>
          <span className="w-8 h-px" style={{ background: hair }} />
          <span className="lowercase tracking-wide" style={{ color: muted }}>{sub}</span>
        </div>
        <h2
          style={{
            color: fg,
            fontFamily: 'var(--font-cool)',
            fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
            lineHeight: 0.95,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            transform: active ? 'translateY(-4px)' : 'none',
            transition: 'transform 0.4s',
          }}
        >
          {title}
        </h2>
        <p className="mt-4 text-sm md:text-base max-w-sm leading-relaxed" style={{ color: muted }}>{line}</p>
        <div
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold"
          style={{ color: fg, transform: active ? 'translateX(6px)' : 'none', opacity: active ? 1 : 0.8, transition: 'all 0.3s' }}
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
