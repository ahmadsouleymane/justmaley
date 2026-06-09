import { motion } from 'framer-motion'
import { useLocale } from '../i18n.jsx'

export default function Processus() {
  const { t } = useLocale()
  return (
    <section id="processus" className="relative py-24 md:py-36 px-6 md:px-12 bg-black-deep overflow-hidden">
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-orange text-[11px] tracking-[0.4em] uppercase font-semibold mb-5 block"
          >
            {t('process.tag')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-offwhite tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', lineHeight: 1.02, fontWeight: 700 }}
          >
            {t('process.title1')} <span className="text-orange">{t('process.title2')}</span>
          </motion.h2>
        </div>

        <div
          className="relative"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '1.25rem',
          }}
        >
          {[1, 2, 3, 4].map((i, idx) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative p-7 rounded-3xl border border-offwhite/10 bg-offwhite/[0.02] hover:border-orange/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-orange text-black-deep flex items-center justify-center font-bold text-sm">
                  0{i}
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-offwhite mb-2 leading-tight">{t(`process.${i}.title`)}</h3>
              <p className="text-offwhite/60 text-sm leading-relaxed">{t(`process.${i}.text`)}</p>
              {idx < 3 && (
                <div className="hidden xl:block absolute top-1/2 -right-3 -translate-y-1/2 text-orange/30" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
