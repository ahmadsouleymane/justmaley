import { motion } from 'framer-motion'

const benefits = [
  {
    title: 'Gagnez des heures',
    desc: 'Les tâches répétitives se font seules : relances, saisies, rapports.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Moins d\'erreurs',
    desc: 'Aucun oubli, aucun calcul faux. Tout est fait avec rigueur, à chaque fois.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V5z" /><polyline points="8.5 11.5 11 14 15.5 9.5" />
      </svg>
    ),
  },
  {
    title: 'Disponible 24h/24',
    desc: 'Vos clients sont servis jour et nuit. Un agent IA ne dort jamais.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" />
      </svg>
    ),
  },
]

const exemples = [
  'Relancer les impayés par WhatsApp',
  'Répondre aux clients 24/7',
  'Générer vos rapports de ventes',
  'Alerter en cas de stock bas',
]

export default function Automatisation() {
  return (
    <section id="ia" className="py-24 md:py-36 px-6 md:px-12 bg-green-dark overflow-hidden">
      <div className="mx-auto" style={{ maxWidth: '1280px' }}>
        {/* Header */}
        <div className="mb-12 md:mb-16" style={{ maxWidth: '720px' }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-orange text-sm tracking-[0.3em] uppercase mb-4 block"
          >
            IA & Automatisation
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-offwhite tracking-tight"
          >
            Vos tâches répétitives,<br />
            <span className="text-orange">faites toutes seules.</span>
          </motion.h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: '1.5rem',
            alignItems: 'stretch',
          }}
        >
          {/* Explainer : c'est quoi un agent IA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl p-8 md:p-9 overflow-hidden"
            style={{ backgroundColor: 'rgba(10,10,10,0.45)', border: '1px solid rgba(252,122,30,0.18)' }}
          >
            <div
              className="absolute pointer-events-none"
              style={{
                width: '280px', height: '280px', top: '-90px', right: '-50px',
                background: 'radial-gradient(circle, rgba(252,122,30,0.12) 0%, transparent 70%)',
              }}
            />
            <div className="relative z-10">
              <div
                className="flex items-center justify-center rounded-xl text-black-deep mb-5"
                style={{ width: '46px', height: '46px', background: '#FC7A1E' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="8" width="16" height="12" rx="2" /><path d="M12 8V4" /><circle cx="12" cy="3" r="1" />
                  <line x1="9" y1="13" x2="9" y2="15" /><line x1="15" y1="13" x2="15" y2="15" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-offwhite tracking-tight mb-3">
                C'est quoi un agent IA ?
              </h3>
              <p className="text-offwhite/65 text-base leading-relaxed mb-5">
                Un <span className="text-offwhite font-semibold">employé virtuel infatigable</span> :
                vous lui expliquez une tâche en langage simple, il l'exécute seul, jour et nuit.
                Il comprend, décide et s'adapte — en suivant vos règles, exactement comme vous le feriez.
              </p>
              <div className="flex flex-wrap gap-2">
                {exemples.map((ex) => (
                  <span
                    key={ex}
                    className="text-offwhite/70 text-xs md:text-sm rounded-full px-3 py-1.5"
                    style={{ backgroundColor: 'rgba(252,122,30,0.1)', border: '1px solid rgba(252,122,30,0.18)' }}
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bénéfices */}
          <div className="grid gap-4" style={{ gridTemplateRows: 'repeat(3, 1fr)' }}>
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4 rounded-2xl p-6"
                style={{ backgroundColor: 'rgba(10,10,10,0.45)', border: '1px solid rgba(227,231,211,0.08)' }}
              >
                <div
                  className="shrink-0 flex items-center justify-center rounded-xl text-orange"
                  style={{ width: '46px', height: '46px', backgroundColor: 'rgba(252,122,30,0.1)' }}
                >
                  {b.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-offwhite mb-1 tracking-tight">{b.title}</h3>
                  <p className="text-offwhite/65 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-offwhite/60 text-sm mt-8"
        >
          Dites-nous ce qui vous fait perdre du temps —{' '}
          <a href="#contact" className="text-orange hover:underline">nous vous montrons comment l'automatiser</a>.
        </motion.p>
      </div>
    </section>
  )
}
