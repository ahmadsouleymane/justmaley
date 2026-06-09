import { motion } from 'framer-motion'
import { useLocale } from '../i18n.jsx'

const ICONS = {
  1: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  2: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  3: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  4: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
}

export default function Avantages() {
  const { t } = useLocale()
  return (
    <section id="avantages" className="relative py-24 md:py-36 px-6 md:px-12 bg-green-dark overflow-hidden">
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-orange text-[11px] tracking-[0.4em] uppercase font-semibold mb-5 block"
          >
            {t('why.tag')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-offwhite tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', lineHeight: 1.02, fontWeight: 700 }}
          >
            {t('why.title1')} <span className="text-orange">{t('why.title2')}</span>
          </motion.h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '1.25rem',
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-7 rounded-3xl bg-black-deep/40 border border-offwhite/10 hover:border-orange/40 transition-colors"
            >
              <div className="inline-flex w-12 h-12 items-center justify-center rounded-2xl bg-orange/15 text-orange mb-5">
                {ICONS[i]}
              </div>
              <h3 className="text-offwhite font-bold mb-2 text-lg">{t(`why.${i}.title`)}</h3>
              <p className="text-offwhite/60 text-sm leading-relaxed">{t(`why.${i}.text`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
