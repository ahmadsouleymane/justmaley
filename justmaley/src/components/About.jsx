import { motion } from 'framer-motion'
import { useLocale } from '../i18n.jsx'

export default function About() {
  const { t } = useLocale()
  return (
    <section id="about" className="relative py-24 md:py-36 px-6 md:px-12 bg-green-dark overflow-hidden">
      <div
        className="mx-auto"
        style={{
          maxWidth: '1200px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: '5rem',
          alignItems: 'center',
        }}
      >
        {/* Portrait — unique photo du site */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-full"
          style={{ maxWidth: '440px' }}
        >
          <div className="relative" style={{ aspectRatio: '1 / 1' }}>
            <div
              className="absolute inset-0 rounded-[2rem]"
              style={{
                background: 'linear-gradient(160deg, #FC7A1E 0%, #d9651a 70%, #b04a0d 100%)',
                boxShadow: '0 40px 100px -20px rgba(252,122,30,0.4)',
              }}
              aria-hidden="true"
            />
            <img
              src="/profile face.png"
              alt="Ahmad Souleymane, développeur web full-stack à Yamoussoukro"
              className="absolute inset-0 w-full h-full z-10"
              style={{
                objectFit: 'contain',
                objectPosition: 'center bottom',
                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.25))',
              }}
            />
          </div>
        </motion.div>

        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-orange text-[11px] tracking-[0.4em] uppercase font-semibold mb-5 block"
          >
            {t('about.tag')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-offwhite tracking-tight mb-8"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', lineHeight: 1.02, fontWeight: 700 }}
          >
            {t('about.title1')}<br /><span className="text-orange">{t('about.title2')}</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5 text-offwhite/75 text-base md:text-[17px] leading-relaxed"
          >
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-9 pt-6 border-t border-offwhite/10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-offwhite/55"
          >
            <span className="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#FC7A1E" strokeWidth="2">
                <path d="M10 2C6.13 2 3 5.13 3 9c0 5.25 7 9 7 9s7-3.75 7-9c0-3.87-3.13-7-7-7z" />
                <circle cx="10" cy="9" r="2.5" />
              </svg>
              {t('about.loc')}
            </span>
            <span className="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FC7A1E" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
              </svg>
              {t('about.remote')}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
