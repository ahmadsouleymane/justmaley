import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

/* ======================== ANIMATED COUNTER ======================== */
function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const startValue = target * 3
    let current = startValue
    const duration = 2000
    const decrement = (startValue - target) / (duration / 16)
    const timer = setInterval(() => {
      current -= decrement
      if (current <= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString('fr-FR')}
    </span>
  )
}

/* ======================== CHECK ICON ======================== */
function CheckIcon() {
  return (
    <div
      className="shrink-0"
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'rgba(252,122,30,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#FC7A1E" strokeWidth="2" strokeLinecap="round">
        <path d="M2 6l3 3 5-5" />
      </svg>
    </div>
  )
}

/* ======================== DATA ======================== */
const processSteps = [
  {
    title: 'Tournage',
    desc: 'Photos & vidéos sur place',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FC7A1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    title: 'Montage',
    desc: 'Vidéos & visuels créés',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FC7A1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    title: 'Publication',
    desc: 'Posté sur vos réseaux',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FC7A1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    title: 'Gestion',
    desc: 'Suivi & performance',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FC7A1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
]

const abonnementPlans = [
  {
    name: 'Starter',
    postCount: 10,
    price: 50000,
    deliverables: [
      'Photos & vidéos professionnelles',
      'Visuels et affiches',
      'Publication sur vos réseaux',
      'Support WhatsApp',
    ],
  },
  {
    name: 'Standard',
    postCount: 20,
    price: 75000,
    popular: true,
    deliverables: [
      'Photos & vidéos professionnelles',
      'Visuels et affiches',
      'Publication sur vos réseaux',
      'Stories & Reels inclus',
      'Rapport de performance',
      'Support WhatsApp prioritaire',
    ],
  },
  {
    name: 'Premium',
    postCount: 30,
    price: 120000,
    deliverables: [
      'Photos & vidéos professionnelles',
      'Visuels et affiches premium',
      'Publication sur vos réseaux',
      'Stories & Reels inclus',
      'Rapport de performance détaillé',
      'Stratégie de contenu',
      'Support WhatsApp prioritaire',
    ],
  },
]

const creationPlans = [
  {
    name: 'Vitrine Simple',
    pageLabel: '3 pages',
    price: 100000,
    maintenance: '1 mois de maintenance',
    features: [
      'Design UI/UX personnalisé',
      'Nom de domaine offert',
      'Responsive mobile',
      'Optimisation SEO de base',
      'Livraison en 2 semaines',
    ],
  },
  {
    name: 'Vitrine Complet',
    pageLabel: '5 pages',
    price: 150000,
    popular: true,
    maintenance: '2 mois de maintenance',
    features: [
      'Design UI/UX personnalisé',
      'Nom de domaine offert',
      'Responsive mobile',
      'Optimisation SEO avancée',
      'Hébergement 1 an offert',
      'Livraison en 2 semaines',
    ],
  },
  {
    name: 'E-commerce',
    pageLabel: 'Boutique',
    price: 300000,
    maintenance: '6 mois de maintenance',
    features: [
      'Boutique en ligne complète',
      'Gestion produits & commandes',
      'Paiement en ligne intégré',
      'Design UI/UX personnalisé',
      'Nom de domaine offert',
      'Responsive mobile',
      'Optimisation SEO avancée',
      'Hébergement 1 an offert',
    ],
  },
]

/* ======================== PROCESS PIPELINE ======================== */
function ProcessPipeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <p className="text-offwhite/50 text-sm text-center mb-6 tracking-wide">
        Chaque mois, je m&apos;occupe de tout :
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-3 mx-auto" style={{ maxWidth: '700px' }}>
        {processSteps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
            className="relative flex flex-col items-center text-center"
          >
            {/* Connecting line (desktop only, not on last) */}
            {i < processSteps.length - 1 && (
              <div
                className="hidden md:block absolute top-7 right-0 translate-x-1/2 h-px"
                style={{
                  width: 'calc(100%)',
                  background: 'linear-gradient(90deg, rgba(252,122,30,0.3), rgba(252,122,30,0.08))',
                }}
              />
            )}
            <div
              className="flex items-center justify-center mb-3"
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: 'rgba(252,122,30,0.08)',
                border: '1px solid rgba(252,122,30,0.15)',
              }}
            >
              {step.icon}
            </div>
            <span className="text-offwhite text-sm font-semibold mb-1">{step.title}</span>
            <span className="text-offwhite/30 text-xs">{step.desc}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/* ======================== SUBSCRIPTION CARD ======================== */
function SubscriptionCard({ plan, index }) {
  const whatsappText = encodeURIComponent(
    `Bonjour, je suis intéressé par l'abonnement ${plan.name} (${plan.postCount} posts/mois)`
  )
  const isPopular = plan.popular

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      className={`relative rounded-2xl p-6 md:p-8 transition-colors duration-500 flex flex-col ${
        isPopular
          ? 'border-2 border-orange'
          : 'border border-offwhite/10 hover:border-orange/30'
      }`}
      style={isPopular ? { background: 'linear-gradient(135deg, rgba(252,122,30,0.05), transparent)' } : {}}
    >
      {isPopular && (
        <div
          className="absolute rounded-full font-bold uppercase"
          style={{
            top: '-13px',
            right: '1.5rem',
            backgroundColor: '#FC7A1E',
            color: '#0A0A0A',
            padding: '4px 14px',
            fontSize: '11px',
            letterSpacing: '0.05em',
          }}
        >
          Populaire
        </div>
      )}

      <span className="text-orange text-xs tracking-[0.3em] uppercase font-semibold">{plan.name}</span>

      {/* Hero: post count */}
      <div className="mt-4 mb-1 flex items-baseline gap-2">
        <span className="text-5xl md:text-6xl font-bold text-offwhite tracking-tight">{plan.postCount}</span>
        <span className="text-offwhite/30 text-base">posts/mois</span>
      </div>

      {/* Price */}
      <div className="mb-6">
        <span className="text-xl md:text-2xl font-bold text-offwhite tracking-tight">
          <AnimatedCounter target={plan.price} />
        </span>
        <span className="text-offwhite/30 text-sm ml-1">FCFA/mois</span>
      </div>

      {/* Separator */}
      <div className="w-full h-px mb-5" style={{ background: 'linear-gradient(90deg, rgba(252,122,30,0.2), transparent)' }} />

      {/* Deliverables */}
      <ul className="space-y-3 flex-1">
        {plan.deliverables.map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-offwhite/60 text-sm">
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>

      <a
        href={`https://wa.me/2250160726314?text=${whatsappText}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-7 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm tracking-wider transition-all duration-300 ${
          isPopular
            ? 'bg-orange text-black-deep hover:bg-orange-dark'
            : 'border-2 border-orange text-orange hover:bg-orange hover:text-black-deep'
        }`}
      >
        S&apos;abonner
      </a>
    </motion.div>
  )
}

/* ======================== CREATION CARD ======================== */
function CreationCard({ plan, index }) {
  const whatsappText = encodeURIComponent(
    `Bonjour, je suis intéressé par l'offre ${plan.name} (${plan.pageLabel})`
  )
  const isPopular = plan.popular

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      className={`relative rounded-2xl p-6 md:p-8 transition-colors duration-500 flex flex-col ${
        isPopular
          ? 'border-2 border-orange'
          : 'border border-offwhite/10 hover:border-orange/30'
      }`}
      style={isPopular ? { background: 'linear-gradient(135deg, rgba(252,122,30,0.05), transparent)' } : {}}
    >
      {isPopular && (
        <div
          className="absolute rounded-full font-bold uppercase"
          style={{
            top: '-13px',
            right: '1.5rem',
            backgroundColor: '#FC7A1E',
            color: '#0A0A0A',
            padding: '4px 14px',
            fontSize: '11px',
            letterSpacing: '0.05em',
          }}
        >
          Populaire
        </div>
      )}

      <span className="text-orange text-xs tracking-[0.3em] uppercase font-semibold">{plan.name}</span>

      {/* Hero: page label */}
      <div className="mt-4 mb-1">
        <span className="text-3xl md:text-4xl font-bold text-offwhite tracking-tight">{plan.pageLabel}</span>
      </div>

      {/* Price */}
      <div className="mb-5">
        <span className="text-xl md:text-2xl font-bold text-offwhite tracking-tight">
          <AnimatedCounter target={plan.price} />
        </span>
        <span className="text-offwhite/30 text-sm ml-1">FCFA</span>
      </div>

      {/* One-time badge */}
      <div className="mb-5 flex items-center gap-2">
        <div
          className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase"
          style={{
            color: 'rgba(227,231,211,0.4)',
            backgroundColor: 'rgba(227,231,211,0.05)',
            padding: '4px 10px',
            borderRadius: '9999px',
            border: '1px solid rgba(227,231,211,0.08)',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Projet unique
        </div>
        <div
          className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase"
          style={{
            color: 'rgba(227,231,211,0.4)',
            backgroundColor: 'rgba(227,231,211,0.05)',
            padding: '4px 10px',
            borderRadius: '9999px',
            border: '1px solid rgba(227,231,211,0.08)',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {plan.maintenance}
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-px mb-5" style={{ background: 'linear-gradient(90deg, rgba(252,122,30,0.2), transparent)' }} />

      {/* Features */}
      <ul className="space-y-3 flex-1">
        {plan.features.map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-offwhite/60 text-sm">
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>

      <a
        href={`https://wa.me/2250160726314?text=${whatsappText}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-7 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm tracking-wider transition-all duration-300 ${
          isPopular
            ? 'bg-orange text-black-deep hover:bg-orange-dark'
            : 'border-2 border-orange text-orange hover:bg-orange hover:text-black-deep'
        }`}
      >
        Commander
      </a>
    </motion.div>
  )
}

/* ======================== MAIN COMPONENT ======================== */
export default function Offre() {
  const [activeTab, setActiveTab] = useState('abonnement')

  return (
    <section id="offre" className="py-24 md:py-36 px-6 md:px-12 bg-black-deep">
      <div className="mx-auto" style={{ maxWidth: '1280px' }}>
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-orange text-sm tracking-[0.3em] uppercase mb-4 block"
          >
            Mes Offres
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-offwhite tracking-tight"
          >
            Des prix <span className="text-orange">clairs.</span>
          </motion.h2>
        </div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12 md:mb-16"
        >
          <div
            className="inline-flex rounded-full p-1"
            style={{ backgroundColor: 'rgba(227,231,211,0.05)', border: '1px solid rgba(227,231,211,0.08)' }}
          >
            <button
              onClick={() => setActiveTab('abonnement')}
              className={`flex items-center gap-2 px-5 md:px-7 py-3 rounded-full text-sm font-bold tracking-wider transition-all duration-300 ${
                activeTab === 'abonnement'
                  ? 'bg-orange text-black-deep'
                  : 'text-offwhite/50 hover:text-offwhite'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M17 3a2.85 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5z" />
              </svg>
              <span className="hidden sm:inline">Création de contenu</span>
              <span className="sm:hidden">Contenu</span>
            </button>
            <button
              onClick={() => setActiveTab('creation')}
              className={`flex items-center gap-2 px-5 md:px-7 py-3 rounded-full text-sm font-bold tracking-wider transition-all duration-300 ${
                activeTab === 'creation'
                  ? 'bg-orange text-black-deep'
                  : 'text-offwhite/50 hover:text-offwhite'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              <span className="hidden sm:inline">Création de site</span>
              <span className="sm:hidden">Site web</span>
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'abonnement' ? (
            <motion.div
              key="abonnement"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {/* Process pipeline */}
              <ProcessPipeline />

              {/* Subscription cards */}
              <div
                className="mx-auto grid gap-5"
                style={{
                  maxWidth: '1000px',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                }}
              >
                {abonnementPlans.map((plan, i) => (
                  <SubscriptionCard key={plan.name} plan={plan} index={i} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="creation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {/* Creation cards */}
              <div
                className="mx-auto grid gap-5"
                style={{
                  maxWidth: '1000px',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                }}
              >
                {creationPlans.map((plan, i) => (
                  <CreationCard key={plan.name} plan={plan} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment conditions - subtle strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-3 md:gap-5 flex-wrap text-offwhite/25 text-xs tracking-[0.15em] uppercase"
        >
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            50% à la commande
          </span>
          <span style={{ color: 'rgba(252,122,30,0.3)' }}>·</span>
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            50% à la livraison
          </span>
        </motion.div>
      </div>
    </section>
  )
}
