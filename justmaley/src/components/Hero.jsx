import { motion } from 'framer-motion'
import DashboardMockup from './DashboardMockup'

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-black-deep px-6 md:px-12 pt-28 pb-16"
    >
      {/* Glow d'ambiance subtil */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '900px', height: '900px',
          top: '-200px', right: '-200px',
          background: 'radial-gradient(circle, rgba(252,122,30,0.07) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      {/* Grille discrète */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(227,231,211,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(227,231,211,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      <div
        className="relative z-10 mx-auto w-full"
        style={{
          maxWidth: '1280px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        {/* Colonne texte */}
        <div>

          <h1
            className="text-offwhite leading-[1.02] tracking-tight"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', fontFamily: 'var(--font-cool-cond)' }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              Reprenez le contrôle
            </motion.span>
            <motion.span
              className="block"
              style={{ color: '#FC7A1E' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              de votre entreprise.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 text-offwhite/55 text-base md:text-lg leading-relaxed"
            style={{ maxWidth: '500px', fontFamily: 'var(--font-body)' }}
          >
            Vous perdez des heures sur des tâches répétitives. JustMaley conçoit des
logiciels de gestion sur mesure, propulsés par l'IA, pour les entreprises
ivoiriennes : nos agents IA automatisent, vous pilotez.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="https://api.whatsapp.com/message/EDN2SVYWK5WYF1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-orange text-black-deep px-7 py-4 rounded-full font-bold tracking-wider hover:bg-orange-dark transition-colors"
              style={{ fontSize: '1rem', fontFamily: 'var(--font-body)' }}
            >
              <WhatsAppIcon />
              Demander un devis gratuit
            </a>
            <a
              href="#processus"
              className="inline-flex items-center gap-2 text-offwhite/70 hover:text-orange px-2 py-4 font-semibold tracking-wider transition-colors"
              style={{ fontSize: '0.95rem', fontFamily: 'var(--font-body)' }}
            >
              Comment ça marche
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {['Satisfait ou remboursé 14 jours', 'Hébergement 1 an offert', 'Formation incluse'].map((t) => (
              <span key={t} className="flex items-center gap-2 text-offwhite/45 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FC7A1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Colonne visuel */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  )
}
