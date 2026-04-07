import { motion } from 'framer-motion'

const services = [
  {
    title: 'Web',
    desc: 'Je crée des sites vitrines, e-commerce et applications web sur-mesure qui convertissent et impressionnent.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="40" height="28" rx="3" />
        <line x1="4" y1="16" x2="44" y2="16" />
        <circle cx="9" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="14" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <line x1="16" y1="40" x2="32" y2="40" />
        <line x1="24" y1="36" x2="24" y2="40" />
      </svg>
    ),
  },
  {
    title: 'Graphisme',
    desc: "Je conçois des identités visuelles, logos, flyers et affiches. Un design qui marque les esprits.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 40l8-8 6 6-2 2z" />
        <path d="M16 32L36 12a4 4 0 015.66 5.66L22 38" />
        <circle cx="38" cy="10" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Vidéo',
    desc: 'Je réalise vos montages, motion design et contenus vidéo pour réseaux sociaux et publicité.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="10" width="28" height="28" rx="3" />
        <polygon points="36,18 44,13 44,35 36,30" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Contenu',
    desc: 'Je gère votre stratégie de contenu, community management et rédaction web optimisée SEO.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 10h32v28H20l-8 6v-6H8z" />
        <line x1="16" y1="20" x2="32" y2="20" />
        <line x1="16" y1="26" x2="28" y2="26" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-36 px-6 md:px-12 bg-black-deep">
      <div className="mx-auto" style={{ maxWidth: '1280px' }}>
        <div className="mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-orange text-sm tracking-[0.3em] uppercase mb-4 block"
          >
            Mes Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-offwhite tracking-tight"
          >
            Ce que je fais<br />
            <span className="text-orange">de mieux.</span>
          </motion.h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative border border-offwhite/10 rounded-2xl p-8 md:p-10 overflow-hidden hover:border-orange/50 transition-colors duration-500"
              style={{ backgroundColor: '#0A0A0A' }}
              data-hover
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(135deg, rgba(252,122,30,0.05), rgba(252,122,30,0.1))' }}
              />

              <div className="relative z-10">
                <div className="text-offwhite/60 group-hover:text-orange transition-colors duration-300 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-offwhite mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-offwhite/60 text-base leading-relaxed">
                  {service.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 text-orange opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-sm tracking-wider uppercase">En savoir plus</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
