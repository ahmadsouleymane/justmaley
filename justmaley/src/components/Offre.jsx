import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
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

const creation = [
  'Site web professionnel',
  'Design UI/UX personnalisé',
  'Responsive mobile',
  'Optimisation SEO',
  'Hébergement 1 an offert',
  'Livraison en 2 semaines',
]

const abonnement = [
  'Gestion réseaux sociaux',
  'Création de contenu mensuel',
  '8 publications/mois',
  'Stories & Reels',
  'Rapport de performance',
  'Support WhatsApp prioritaire',
]

export default function Offre() {
  return (
    <section id="offre" className="py-24 md:py-36 px-6 md:px-12 bg-black-deep">
      <div className="mx-auto" style={{ maxWidth: '1280px' }}>
        <div className="mb-16 md:mb-24 text-center">
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

        <div
          className="mx-auto"
          style={{
            maxWidth: '960px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: '2rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative border border-offwhite/10 rounded-3xl p-8 md:p-12 hover:border-orange/30 transition-colors duration-500"
          >
            <span className="text-orange text-sm tracking-[0.3em] uppercase">Création</span>
            <div className="mt-4 mb-8">
              <span className="text-5xl md:text-6xl font-bold text-offwhite tracking-tight">
                <AnimatedCounter target={150000} />
              </span>
              <span className="text-offwhite/40 text-xl ml-2">FCFA</span>
            </div>
            <ul className="space-y-4">
              {creation.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-offwhite/70">
                  <div className="shrink-0" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(252,122,30,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#FC7A1E" strokeWidth="2" strokeLinecap="round">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/2250160726314?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20l%27offre%20Cr%C3%A9ation"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 w-full inline-flex items-center justify-center gap-2 border-2 border-orange text-orange px-8 py-4 rounded-full font-bold tracking-wider hover:bg-orange hover:text-black-deep transition-all duration-300"
            >
              Commander
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative border-2 border-orange rounded-3xl p-8 md:p-12"
            style={{ background: 'linear-gradient(135deg, rgba(252,122,30,0.05), transparent)' }}
          >
            <div
              className="absolute rounded-full font-bold uppercase"
              style={{ top: '-14px', right: '2rem', backgroundColor: '#FC7A1E', color: '#0A0A0A', padding: '4px 16px', fontSize: '12px', letterSpacing: '0.05em' }}
            >
              Populaire
            </div>
            <span className="text-orange text-sm tracking-[0.3em] uppercase">Abonnement</span>
            <div className="mt-4 mb-8">
              <span className="text-5xl md:text-6xl font-bold text-offwhite tracking-tight">
                <AnimatedCounter target={75000} />
              </span>
              <span className="text-offwhite/40 text-xl ml-2">FCFA/mois</span>
            </div>
            <ul className="space-y-4">
              {abonnement.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-offwhite/70">
                  <div className="shrink-0" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(252,122,30,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#FC7A1E" strokeWidth="2" strokeLinecap="round">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/2250160726314?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20l%27Abonnement"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 w-full inline-flex items-center justify-center gap-2 bg-orange text-black-deep px-8 py-4 rounded-full font-bold tracking-wider hover:bg-orange-dark transition-colors duration-300"
            >
              S&apos;abonner
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
