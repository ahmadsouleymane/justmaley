import { motion } from 'framer-motion'

const secteurs = [
  {
    nom: 'Commerce & distribution',
    desc: 'Gestion de stock, points de vente, fournisseurs et marges en temps réel.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l1-5h16l1 5" /><path d="M4 9v11a1 1 0 001 1h14a1 1 0 001-1V9" /><path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    nom: 'Restaurants & bars',
    desc: 'Commandes, caisse, gestion des tables, des serveurs et des approvisionnements.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7a3 3 0 003 3v10" /><path d="M6 2v6" /><path d="M9 2v6" /><path d="M16 2a4 4 0 00-2 7.5V22" />
      </svg>
    ),
  },
  {
    nom: 'Pharmacies & santé',
    desc: 'Suivi des lots, dates de péremption, ordonnances et inventaire automatisé.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" /><rect x="3" y="3" width="18" height="18" rx="3" />
      </svg>
    ),
  },
  {
    nom: 'Import-export & logistique',
    desc: 'Suivi des arrivages, douanes, clients, livraisons et facturation centralisée.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 3v5h-7z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    nom: 'Services & BTP',
    desc: 'Devis, factures, suivi de chantiers, planning des équipes et trésorerie.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a4 4 0 00-5.6 5.6L3 18v3h3l6.1-6.1a4 4 0 005.6-5.6l-2.5 2.5-2.5-2.5z" />
      </svg>
    ),
  },
  {
    nom: 'Écoles & formations',
    desc: 'Inscriptions, paiements, notes, présences et communication avec les parents.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10L12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5" />
      </svg>
    ),
  },
]

export default function Secteurs() {
  return (
    <section id="secteurs" className="py-24 md:py-36 px-6 md:px-12 bg-black-deep">
      <div className="mx-auto" style={{ maxWidth: '1280px' }}>
        <div className="mb-16 md:mb-20 text-center mx-auto" style={{ maxWidth: '680px' }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-orange text-sm tracking-[0.3em] uppercase mb-4 block"
          >
            Pour qui
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-offwhite tracking-tight"
          >
            Conçu pour <span className="text-orange">votre métier.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-offwhite/55 text-base md:text-lg mt-6 leading-relaxed"
          >
            Chaque secteur a ses réalités. Votre logiciel est construit autour de votre façon
            de travailler — pas l'inverse.
          </motion.p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '1.25rem',
          }}
        >
          {secteurs.map((s, i) => (
            <motion.div
              key={s.nom}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-start gap-4 rounded-2xl p-7 transition-colors duration-500"
              style={{ backgroundColor: '#0E0E0E', border: '1px solid rgba(227,231,211,0.08)' }}
            >
              <div
                className="shrink-0 flex items-center justify-center rounded-xl text-orange transition-colors duration-500 group-hover:bg-orange group-hover:text-black-deep"
                style={{ width: '52px', height: '52px', backgroundColor: 'rgba(252,122,30,0.1)' }}
              >
                {s.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-offwhite mb-1.5 tracking-tight">{s.nom}</h3>
                <p className="text-offwhite/65 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-offwhite/60 text-sm mt-12"
        >
          Votre secteur n'est pas listé ?{' '}
          <a href="#contact" className="text-orange hover:underline">Parlons-en</a>{' '}
          — nous construisons sur mesure.
        </motion.p>
      </div>
    </section>
  )
}
