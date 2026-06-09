import { motion } from 'framer-motion'
import { useLocale } from '../i18n.jsx'

const EMAIL = 'ahmadsouleymane1302@gmail.com'
const WHATSAPP_URL = 'https://api.whatsapp.com/message/EDN2SVYWK5WYF1?autoload=1&app_absent=0'
const LINKEDIN_URL = 'https://linkedin.com/in/ahmadsouleymane'
const COMEUP_URL = 'https://comeup.com/@JustMaley'

export default function Footer() {
  const { t } = useLocale()
  return (
    <footer className="bg-black-deep border-t border-offwhite/10">
      <div className="mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-12 text-center" style={{ maxWidth: '900px' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-offwhite tracking-tight mb-5 leading-[1.02]"
        >
          {t('footer.title1')} <span className="text-orange">{t('footer.title2')}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-offwhite/55 text-base md:text-lg mb-9 mx-auto"
          style={{ maxWidth: '480px' }}
        >
          {t('footer.sub')}
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          href="#contact"
          className="inline-flex items-center gap-3 bg-orange text-black-deep px-8 py-4 rounded-full font-bold tracking-wide hover:bg-orange-dark transition-colors"
        >
          {t('footer.cta')}
        </motion.a>
      </div>

      <div
        className="mx-auto px-6 md:px-12 py-8 md:py-10 border-t border-offwhite/10"
        style={{
          maxWidth: '1200px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        <a href="#" aria-label="Justmaley">
          <img src="/logo-wt.svg" alt="JUSTMALEY" width="160" height="28" className="h-7 w-auto" />
        </a>

        <div className="flex items-center gap-5">
          <a href={`mailto:${EMAIL}`} aria-label="Email" className="text-offwhite/55 hover:text-orange transition-colors">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="2" y="4" width="16" height="12" rx="2" />
              <path d="M2 6l8 5 8-5" />
            </svg>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-offwhite/55 hover:text-orange transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413A11.815 11.815 0 0012.05 0z" />
            </svg>
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-offwhite/55 hover:text-orange transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
            </svg>
          </a>
          <a href={COMEUP_URL} target="_blank" rel="noopener noreferrer" className="text-offwhite/55 hover:text-orange transition-colors text-xs font-bold tracking-widest uppercase">
            ComeUp
          </a>
        </div>

        <p className="text-offwhite/30 text-xs tracking-wider">© 2026 Justmaley. {t('footer.rights')}</p>
      </div>
    </footer>
  )
}
