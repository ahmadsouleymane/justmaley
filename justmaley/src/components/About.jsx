import { motion } from 'framer-motion'


export default function About() {
  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-12 bg-green-dark overflow-hidden">
      <div
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
          style={{ maxWidth: '460px' }}
        >
          {/* Bloc accent derrière */}
          <div
            className="absolute rounded-3xl bg-orange"
            style={{ inset: '1.25rem -1.25rem -1.25rem 1.25rem', zIndex: 0, opacity: 0.9 }}
          />

          {/* Carte photo */}
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{ aspectRatio: '4/4.6', backgroundColor: '#0A0A0A', border: '1px solid rgba(252,122,30,0.2)', zIndex: 1 }}
          >
            <img
              src="/founder.jpg"
              alt="Ahmad Souleymane — fondateur de JustMaley"
              className="w-full h-full absolute inset-0"
              style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
              loading="lazy"
            />
            {/* Teinte orange subtile */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(252,122,30,0.10) 0%, transparent 35%)', mixBlendMode: 'overlay' }}
            />
            {/* Dégradé bas pour lisibilité */}
            <div
              className="absolute inset-x-0 bottom-0"
              style={{ height: '55%', background: 'linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.55) 55%, rgba(10,10,10,0.92) 100%)' }}
            />

            {/* Badge garantie flottant */}
            <div
              className="absolute flex items-center gap-2 rounded-full px-3.5 py-2"
              style={{
                top: '1rem', left: '1rem',
                backgroundColor: 'rgba(10,10,10,0.55)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(252,122,30,0.3)',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FC7A1E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V5z" /><polyline points="8.5 11.5 11 14 15.5 9.5" />
              </svg>
              <span className="text-offwhite text-xs font-semibold tracking-wide">Satisfait ou remboursé</span>
            </div>

            {/* Nom + rôle en bas */}
            <div className="absolute inset-x-0 bottom-0 p-6 z-10">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="flex items-center justify-center rounded-lg font-bold text-black-deep"
                  style={{ width: '34px', height: '34px', background: '#FC7A1E', fontFamily: 'var(--font-cool)', fontSize: '18px' }}
                >
                  J
                </div>
                <div>
                  <div className="text-offwhite font-bold tracking-tight leading-none" style={{ fontSize: '17px' }}>
                    Ahmad Souleymane
                  </div>
                  <div className="text-offwhite/55 text-xs mt-1">Fondateur · JustMaley</div>
                </div>
              </div>

              {/* Stats en barre vitrée */}
              <div
                className="grid grid-cols-3 rounded-xl overflow-hidden"
                style={{ backgroundColor: 'rgba(10,10,10,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(227,231,211,0.1)' }}
              >
                {[
                  { v: '14 j', l: 'Garantie' },
                  { v: '1 an', l: 'Hébergement' },
                  { v: '100%', l: 'Sur mesure' },
                ].map((s, i) => (
                  <div
                    key={s.l}
                    className="px-2 py-3 text-center"
                    style={{ borderLeft: i === 0 ? 'none' : '1px solid rgba(227,231,211,0.1)' }}
                  >
                    <div className="text-orange font-bold tracking-tight" style={{ fontFamily: 'var(--font-cool)', fontSize: '20px' }}>
                      {s.v}
                    </div>
                    <div className="text-offwhite/45" style={{ fontSize: '10px' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-orange text-sm tracking-[0.3em] uppercase mb-4 block">
            À propos
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-offwhite tracking-tight mb-6">
            JustMaley, par <span className="text-orange">Ahmad Souleymane.</span>
          </h2>
          <div className="space-y-4 text-offwhite/60 text-base leading-relaxed">
            <p>
              JustMaley est une agence basée à <span className="text-offwhite">Yamoussoukro, Côte d'ivoire</span>,
              spécialisée dans les logiciels de gestion sur mesure pour les entreprises —
              PME, moyennes et grandes structures.
            </p>
            <p>
              Trop d&apos;entreprises pilotent encore leur activité dans des cahiers et des fichiers
              Excel éparpillés. Notre mission : vous donner un outil unique, fiable et simple pour
              gérer vos stocks, vos ventes, votre personnel et votre trésorerie — et reprendre le
              contrôle de votre activité.
            </p>
            <p>
              Notre approche est simple : <span className="text-offwhite">écouter, construire, garantir</span>.
              Un travail sérieux, livré dans les délais, et une garantie satisfait ou remboursé.
              Parce que votre confiance vaut plus que tout.
            </p>
          </div>

          
        </motion.div>
      </div>
    </section>
  )
}
