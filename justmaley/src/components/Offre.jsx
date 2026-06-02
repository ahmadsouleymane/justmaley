import { motion } from 'framer-motion'

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
const included = [
  'Logiciel de gestion sur mesure adapté à votre activité',
  'Automatisations & agents IA pour vos tâches répétitives',
  'Site web professionnel offert',
  'Hébergement + nom de domaine offerts 1 an',
  'Formation de vos équipes',
  'Maintenance, mises à jour & support continu',
  'Garantie satisfait ou remboursé sous 14 jours',
]

/* ======================== MAIN COMPONENT ======================== */
export default function Offre() {
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
            Notre Offre
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-offwhite tracking-tight"
          >
            Tout compris. <span className="text-orange">Sur devis.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-offwhite/65 text-base md:text-lg mt-6 mx-auto"
            style={{ maxWidth: '560px' }}
          >
            Chaque entreprise est unique. Le prix dépend de vos besoins réels —
            pas de forfait imposé, juste une solution faite pour vous.
          </motion.p>
        </div>

        {/* Carte unique : ce qui est inclus */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-3xl p-8 md:p-12 mx-auto"
          style={{
            maxWidth: '720px',
            border: '2px solid #FC7A1E',
            background: 'linear-gradient(135deg, rgba(252,122,30,0.06), transparent)',
          }}
        >
          <span className="text-orange text-xs tracking-[0.3em] uppercase font-semibold">
            Projet sur mesure
          </span>

          <div className="mt-4 mb-2 flex items-baseline gap-3 flex-wrap">
            <span className="text-5xl md:text-6xl font-bold text-offwhite tracking-tight">
              Sur devis
            </span>
            <span className="text-offwhite/60 text-base">gratuit & sans engagement</span>
          </div>

          {/* Separator */}
          <div
            className="w-full h-px my-7"
            style={{ background: 'linear-gradient(90deg, rgba(252,122,30,0.3), transparent)' }}
          />

          {/* Inclus */}
          <ul className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}>
            {included.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-offwhite/70 text-base">
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>

          <a
            href="https://api.whatsapp.com/message/EDN2SVYWK5WYF1?autoload=1&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-base tracking-wider bg-orange text-black-deep hover:bg-orange-dark transition-all duration-300"
          >
            Demander un devis gratuit
          </a>
        </motion.div>

        {/* Bandeau garantie */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 md:mt-10 rounded-2xl p-6 md:p-8 mx-auto flex items-center gap-5 flex-wrap md:flex-nowrap"
          style={{
            maxWidth: '720px',
            border: '1px solid rgba(252,122,30,0.2)',
            backgroundColor: 'rgba(252,122,30,0.04)',
          }}
        >
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              backgroundColor: 'rgba(252,122,30,0.1)',
              border: '1px solid rgba(252,122,30,0.25)',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FC7A1E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V5z" />
              <polyline points="8.5 11.5 11 14 15.5 9.5" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-offwhite tracking-tight mb-2">
              Satisfait ou remboursé sous 14 jours.
            </h3>
            <p className="text-offwhite/65 text-sm md:text-base leading-relaxed">
              Nous croyons en la qualité de notre travail. Si vous n'êtes pas satisfait dans les
              14 jours suivant la livraison, nous vous remboursons intégralement votre investissement.
              Sans risque pour votre entreprise.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
