import { motion } from 'framer-motion'

const pains = [
  {
    title: 'Tout est dans des cahiers',
    desc: 'Stocks, ventes, dettes clients... éparpillés sur des feuilles que personne ne retrouve quand il le faut.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
  },
  {
    title: 'Des fichiers Excel partout',
    desc: 'Plusieurs versions, des formules cassées, et personne ne sait laquelle est la bonne. Vous perdez un temps fou.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    title: 'Aucune visibilité',
    desc: 'Impossible de savoir en un coup d\'œil ce qui rentre, ce qui sort et où vous en êtes vraiment ce mois-ci.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
        <line x1="3" y1="3" x2="21" y2="21" />
      </svg>
    ),
  },
  {
    title: 'Vous dépendez de votre mémoire',
    desc: 'Si vous n\'êtes pas là, l\'entreprise tourne au ralenti. Tout repose sur vous, et ça vous épuise.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1" />
      </svg>
    ),
  },
]

export default function Probleme() {
  return (
    <section id="probleme" className="py-24 md:py-36 px-6 md:px-12 bg-green-dark">
      <div className="mx-auto" style={{ maxWidth: '1280px' }}>
        <div className="mb-16 md:mb-20" style={{ maxWidth: '720px' }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-orange text-sm tracking-[0.3em] uppercase mb-4 block"
          >
            Le problème
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-offwhite tracking-tight"
          >
            Gérer une entreprise à la main,<br />
            <span className="text-orange">ça finit toujours par coûter cher.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-offwhite/55 text-base md:text-lg mt-6 leading-relaxed"
          >
            Des erreurs de stock, des paiements oubliés, des heures perdues à chercher l'information.
            Chaque jour sans outil adapté, c'est de l'argent qui s'évapore sans que vous le voyiez.
          </motion.p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '1.25rem',
          }}
        >
          {pains.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl p-7"
              style={{ backgroundColor: 'rgba(10,10,10,0.35)', border: '1px solid rgba(227,231,211,0.08)' }}
            >
              <div className="text-orange mb-5">{p.icon}</div>
              <h3 className="text-xl font-bold text-offwhite mb-2 tracking-tight">{p.title}</h3>
              <p className="text-offwhite/50 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
