import { motion } from 'framer-motion'

const services = [
  {
    title: 'Logiciels de gestion',
    desc: 'Nous concevons des systèmes sur mesure pour piloter votre entreprise : stocks, ventes, facturation, personnel et tableaux de bord — tout au même endroit.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="40" height="32" rx="3" />
        <line x1="4" y1="18" x2="44" y2="18" />
        <line x1="14" y1="30" x2="14" y2="35" />
        <line x1="22" y1="26" x2="22" y2="35" />
        <line x1="30" y1="29" x2="30" y2="35" />
        <line x1="38" y1="24" x2="38" y2="35" />
      </svg>
    ),
  },
  {
    title: 'Site web — Offert',
    desc: 'Un site vitrine ou e-commerce professionnel, offert gratuitement avec votre système de gestion. Votre entreprise visible et crédible en ligne.',
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
    title: 'IA & Automatisation',
    desc: "Nous intégrons l'intelligence artificielle et des agents IA sur mesure pour automatiser vos tâches répétitives. Votre entreprise travaille 24h/24, sans erreur.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="16" width="28" height="22" rx="4" />
        <path d="M24 16V8" /><circle cx="24" cy="6" r="2" fill="currentColor" stroke="none" />
        <line x1="19" y1="25" x2="19" y2="29" /><line x1="29" y1="25" x2="29" y2="29" />
        <path d="M10 26H5M43 26h-5" />
      </svg>
    ),
  },
  {
    title: 'Maintenance & support',
    desc: 'Hébergement et nom de domaine offerts pendant 1 an, mises à jour, sauvegardes et support continu. Vous restez serein, nous gérons la technique.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4l16 6v10c0 10-7 16-16 18-9-2-16-8-16-18V10z" />
        <polyline points="17 23 22 28 32 18" />
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
            La solution
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-offwhite tracking-tight"
          >
            Un outil unique<br />
            <span className="text-orange">pour tout piloter.</span>
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
