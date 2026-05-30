import { motion } from 'framer-motion'

/*
  Mockup d'interface de logiciel de gestion — 100% CSS/JSX, aucune image.
  Pensé pour être immersif et réaliste : sidebar, topbar, KPIs, graphique en aire,
  anneau de stock et table de commandes. Sert de visuel produit dans le Hero.
*/

/* --- petites icônes de navigation --- */
const NavIcon = ({ d, active }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? '#0A0A0A' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
)

const navItems = [
  { label: 'Tableau de bord', active: true, icon: <><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></> },
  { label: 'Ventes', icon: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></> },
  { label: 'Stock', icon: <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /></> },
  { label: 'Clients', icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /></> },
  { label: 'Personnel', icon: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></> },
]

const kpis = [
  { label: 'Chiffre du jour', value: '1 240 K', trend: '+12%', up: true, spark: [8, 12, 9, 15, 13, 18, 22] },
  { label: 'Commandes', value: '38', trend: '+7%', up: true, spark: [4, 6, 5, 7, 6, 8, 9] },
  { label: 'Stock faible', value: '4', trend: 'Alerte', up: false, spark: [2, 3, 2, 4, 3, 4, 4] },
]

const rows = [
  { ref: '#1042', client: 'Boutique Adjamé', init: 'BA', montant: '320 K', statut: 'Payé' },
  { ref: '#1041', client: 'Resto Le Baobab', init: 'RB', montant: '85 K', statut: 'En cours' },
  { ref: '#1040', client: 'Pharma Plateau', init: 'PP', montant: '610 K', statut: 'Payé' },
]

function Sparkline({ points, color }) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const w = 64
  const h = 22
  const step = w / (points.length - 1)
  const d = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i * step).toFixed(1)} ${(h - ((p - min) / range) * h).toFixed(1)}`)
    .join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <motion.path
        d={d}
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />
    </svg>
  )
}

export default function DashboardMockup() {
  // courbe en aire (chiffre d'affaires)
  const area = [30, 45, 38, 60, 52, 70, 64, 82, 76, 92]
  const aw = 320, ah = 96
  const amax = 100
  const astep = aw / (area.length - 1)
  const linePath = area.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i * astep).toFixed(1)} ${(ah - (p / amax) * ah).toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L ${aw} ${ah} L 0 ${ah} Z`

  return (
    <motion.div
      initial={{ rotateX: 8, rotateY: -10 }}
      whileInView={{ rotateX: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="@container relative w-full overflow-hidden rounded-2xl"
      style={{
        backgroundColor: '#0C0C0C',
        border: '1px solid rgba(227,231,211,0.1)',
        boxShadow: '0 40px 100px -25px rgba(0,0,0,0.9), 0 0 0 1px rgba(252,122,30,0.05)',
      }}
    >
      {/* Barre fenêtre */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ borderBottom: '1px solid rgba(227,231,211,0.06)', backgroundColor: '#121212' }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FC7A1E' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(227,231,211,0.18)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(227,231,211,0.18)' }} />
        <div
          className="ml-3 flex items-center gap-1.5 rounded-md px-2.5 py-1"
          style={{ backgroundColor: 'rgba(227,231,211,0.05)' }}
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(227,231,211,0.4)" strokeWidth="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <span className="text-offwhite/35" style={{ fontSize: '10px' }}>app.votre-entreprise.ci</span>
        </div>
      </div>

      <div className="grid grid-cols-1 @[360px]:grid-cols-[120px_1fr]">
        {/* Sidebar */}
        <div
          className="hidden @[360px]:flex flex-col py-3.5 px-2.5 gap-1"
          style={{ borderRight: '1px solid rgba(227,231,211,0.06)', backgroundColor: '#0A0A0A' }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 px-1.5 mb-3">
            <div className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-black-deep" style={{ background: '#FC7A1E', fontSize: '13px', fontFamily: 'var(--font-cool)' }}>J</div>
            <span className="text-offwhite font-bold" style={{ fontSize: '12px' }}>JustMaley</span>
          </div>

          {navItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5"
              style={{
                backgroundColor: item.active ? '#FC7A1E' : 'transparent',
                color: item.active ? '#0A0A0A' : 'rgba(227,231,211,0.5)',
              }}
            >
              <NavIcon d={item.icon} active={item.active} />
              <span style={{ fontSize: '10.5px', fontWeight: item.active ? 700 : 500 }}>{item.label}</span>
            </div>
          ))}

          <div className="mt-auto flex items-center gap-2 px-2 py-1.5 rounded-lg" style={{ color: 'rgba(227,231,211,0.4)' }}>
            <NavIcon d={<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></>} />
            <span style={{ fontSize: '10.5px' }}>Paramètres</span>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-3.5">
          {/* Topbar */}
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <div className="text-offwhite font-bold tracking-tight" style={{ fontSize: '13px' }}>Bonjour, Ahmad 👋</div>
              <div className="text-offwhite/35" style={{ fontSize: '10px' }}>Voici l'activité d'aujourd'hui</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5" style={{ backgroundColor: '#141414', border: '1px solid rgba(227,231,211,0.06)' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(227,231,211,0.35)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                <span className="text-offwhite/30" style={{ fontSize: '10px' }}>Rechercher</span>
              </div>
              <div className="relative flex items-center justify-center rounded-lg" style={{ width: '28px', height: '28px', backgroundColor: '#141414', border: '1px solid rgba(227,231,211,0.06)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(227,231,211,0.5)" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
                <span className="absolute rounded-full" style={{ top: '5px', right: '6px', width: '5px', height: '5px', background: '#FC7A1E' }} />
              </div>
              <div className="rounded-full flex items-center justify-center font-bold text-black-deep" style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #FC7A1E, #d9651a)', fontSize: '11px' }}>AS</div>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-2.5 mb-3">
            {kpis.map((k, i) => (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="rounded-xl p-2.5"
                style={{ backgroundColor: '#141414', border: '1px solid rgba(227,231,211,0.06)' }}
              >
                <div className="text-offwhite/40 mb-1" style={{ fontSize: '9px' }}>{k.label}</div>
                <div className="flex items-end justify-between">
                  <div className="text-offwhite font-bold tracking-tight" style={{ fontSize: '16px' }}>{k.value}</div>
                  <span className="hidden @[460px]:block">
                    <Sparkline points={k.spark} color={k.up ? '#FC7A1E' : 'rgba(227,231,211,0.3)'} />
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1" style={{ fontSize: '9px', color: k.up ? '#FC7A1E' : 'rgba(227,231,211,0.45)' }}>
                  {k.up ? (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15" /></svg>
                  ) : (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="9" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                  )}
                  {k.trend}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Graphique en aire + anneau stock */}
          <div className="grid gap-2.5 mb-3 grid-cols-1 @[420px]:grid-cols-[1.7fr_1fr]">
            {/* Area chart */}
            <div className="rounded-xl p-3" style={{ backgroundColor: '#141414', border: '1px solid rgba(227,231,211,0.06)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-offwhite/55" style={{ fontSize: '10px' }}>Chiffre d'affaires</span>
                <div className="flex items-center gap-1 text-orange font-semibold" style={{ fontSize: '10px' }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15" /></svg>+18%
                </div>
              </div>
              <svg width="100%" viewBox={`0 0 ${aw} ${ah}`} preserveAspectRatio="none" style={{ display: 'block', height: '80px' }}>
                <defs>
                  <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(252,122,30,0.35)" />
                    <stop offset="100%" stopColor="rgba(252,122,30,0)" />
                  </linearGradient>
                </defs>
                <motion.path
                  d={areaPath}
                  fill="url(#areaFill)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <motion.path
                  d={linePath}
                  fill="none"
                  stroke="#FC7A1E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.3, ease: 'easeOut', delay: 0.2 }}
                />
              </svg>
              <div className="flex justify-between mt-1.5 text-offwhite/25" style={{ fontSize: '8px' }}>
                <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span>
              </div>
            </div>

            {/* Donut stock */}
            <div className="rounded-xl p-3 flex flex-col items-center justify-center" style={{ backgroundColor: '#141414', border: '1px solid rgba(227,231,211,0.06)' }}>
              <span className="text-offwhite/55 self-start mb-1" style={{ fontSize: '10px' }}>Stock global</span>
              <div className="relative flex items-center justify-center" style={{ width: '74px', height: '74px' }}>
                <svg width="74" height="74" viewBox="0 0 74 74" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="37" cy="37" r="30" fill="none" stroke="rgba(227,231,211,0.08)" strokeWidth="8" />
                  <motion.circle
                    cx="37" cy="37" r="30" fill="none" stroke="#FC7A1E" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 30}
                    initial={{ strokeDashoffset: 2 * Math.PI * 30 }}
                    whileInView={{ strokeDashoffset: 2 * Math.PI * 30 * (1 - 0.72) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-offwhite font-bold tracking-tight" style={{ fontSize: '16px' }}>72%</span>
                  <span className="text-offwhite/35" style={{ fontSize: '8px' }}>dispo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table commandes */}
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#141414', border: '1px solid rgba(227,231,211,0.06)' }}>
            <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: '1px solid rgba(227,231,211,0.05)' }}>
              <span className="text-offwhite/55" style={{ fontSize: '10px' }}>Dernières commandes</span>
              <span className="text-orange" style={{ fontSize: '9px' }}>Tout voir</span>
            </div>
            {rows.map((r, i) => (
              <motion.div
                key={r.ref}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2.5 px-3 py-2"
                style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(227,231,211,0.04)' }}
              >
                <div className="rounded-md flex items-center justify-center font-bold shrink-0" style={{ width: '22px', height: '22px', backgroundColor: 'rgba(252,122,30,0.14)', color: '#FC7A1E', fontSize: '9px' }}>{r.init}</div>
                <span className="text-offwhite/30" style={{ fontSize: '10px', width: '34px' }}>{r.ref}</span>
                <span className="text-offwhite/75 flex-1 truncate" style={{ fontSize: '11px' }}>{r.client}</span>
                <span className="text-offwhite font-semibold" style={{ fontSize: '11px' }}>{r.montant}</span>
                <span
                  className="rounded-full px-2 py-0.5 flex items-center gap-1"
                  style={{
                    fontSize: '9px',
                    color: r.statut === 'Payé' ? '#FC7A1E' : 'rgba(227,231,211,0.45)',
                    backgroundColor: r.statut === 'Payé' ? 'rgba(252,122,30,0.12)' : 'rgba(227,231,211,0.06)',
                  }}
                >
                  <span className="rounded-full" style={{ width: '4px', height: '4px', background: 'currentColor' }} />
                  {r.statut}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
