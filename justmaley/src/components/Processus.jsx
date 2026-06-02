import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Audit',
    desc: "Nous analysons comment vous gérez votre entreprise aujourd'hui et identifions ce qui vous fait perdre du temps. Gratuit et sans engagement.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Conception',
    desc: "Nous définissons le cahier des charges, les fonctionnalités et la maquette de votre logiciel. Rien ne démarre sans votre validation.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Développement',
    desc: "Nous développons votre système de gestion et votre site web. Vous suivez chaque étape et testez à votre rythme.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Déploiement',
    desc: 'Nous déployons, formons vos équipes et vous accompagnons. Hébergement, maintenance et support inclus.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
]

export default function Processus() {
  return (
    <section id="processus" className="py-24 md:py-36 px-6 md:px-12 bg-black-deep overflow-hidden">
      <div className="mx-auto" style={{ maxWidth: '1280px' }}>
        <div className="mb-16 md:mb-24 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-orange text-sm tracking-[0.3em] uppercase mb-4 block"
          >
            Processus
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-offwhite tracking-tight"
          >
            Comment ça <span className="text-orange">marche.</span>
          </motion.h2>
        </div>

        {/* Desktop : 4 colonnes horizontales */}
        <div className="hidden md:block">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                style={{ padding: '0 1.5rem', position: 'relative' }}
              >
                {/* Ligne horizontale + point */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', position: 'relative' }}>
                  {/* Dot */}
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: i === 0 ? '#FC7A1E' : '#0A0A0A',
                      border: '3px solid #FC7A1E',
                      flexShrink: 0,
                      position: 'relative',
                      zIndex: 2,
                      boxShadow: i === 0 ? '0 0 20px rgba(252,122,30,0.4)' : 'none',
                    }}
                  />
                  {/* Ligne vers la droite */}
                  {i < steps.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.12 + 0.2 }}
                      style={{
                        height: '2px',
                        backgroundColor: 'rgba(252,122,30,0.2)',
                        flexGrow: 1,
                        transformOrigin: 'left',
                      }}
                    />
                  )}
                </div>

                {/* Icône */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    backgroundColor: i === 0 ? '#FC7A1E' : 'rgba(252,122,30,0.08)',
                    border: i === 0 ? 'none' : '1px solid rgba(252,122,30,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: i === 0 ? '#0A0A0A' : '#FC7A1E',
                    marginBottom: '1.25rem',
                  }}
                >
                  {step.icon}
                </div>

                <span
                  className="text-orange"
                  style={{ fontSize: '13px', letterSpacing: '0.1em', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}
                >
                  ÉTAPE {step.num}
                </span>
                <h3 className="text-2xl font-bold text-offwhite tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-offwhite/65 leading-relaxed" style={{ fontSize: '0.9rem' }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile : timeline verticale */}
        <div className="md:hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '56px 1fr',
                gap: '1.25rem',
                paddingBottom: i < steps.length - 1 ? '2.5rem' : '0',
              }}
            >
              {/* Icône + ligne */}
              <div className="flex flex-col items-center">
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    backgroundColor: i === 0 ? '#FC7A1E' : 'rgba(252,122,30,0.08)',
                    border: i === 0 ? 'none' : '1px solid rgba(252,122,30,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: i === 0 ? '#0A0A0A' : '#FC7A1E',
                  }}
                >
                  {step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div
                    style={{
                      width: '2px',
                      background: 'linear-gradient(180deg, rgba(252,122,30,0.3) 0%, rgba(252,122,30,0.05) 100%)',
                      marginTop: '12px',
                      flexGrow: 1,
                    }}
                  />
                )}
              </div>

              {/* Contenu */}
              <div style={{ paddingTop: '4px' }}>
                <span
                  className="text-orange"
                  style={{ fontSize: '13px', letterSpacing: '0.1em', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}
                >
                  ÉTAPE {step.num}
                </span>
                <h3 className="text-2xl font-bold text-offwhite tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-offwhite/65 leading-relaxed" style={{ fontSize: '0.9rem' }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
