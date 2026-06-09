import { motion } from 'framer-motion'
import { useLocale } from '../i18n.jsx'

const SERVICES = [
  {
    key: '1',
    eur: 290,
    days: 7,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
      </svg>
    ),
  },
  {
    key: '2',
    eur: 350,
    days: 7,
    featured: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="16" height="12" rx="3" />
        <circle cx="9" cy="12" r="1.2" fill="currentColor" />
        <circle cx="15" cy="12" r="1.2" fill="currentColor" />
        <path d="M12 2v4" />
      </svg>
    ),
  },
  {
    key: '3',
    eur: 190,
    days: 3,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
]

const ADDONS = ['services.add.1', 'services.add.2', 'services.add.3', 'services.add.4', 'services.add.5', 'services.add.6', 'services.add.7']

export default function Services() {
  const { t, price } = useLocale()
  return (
    <section id="services" className="relative py-24 md:py-36 px-6 md:px-12 bg-black-deep overflow-hidden">
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-orange text-[11px] tracking-[0.4em] uppercase font-semibold mb-5 block"
          >
            {t('services.tag')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-offwhite tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', lineHeight: 1.02, fontWeight: 700 }}
          >
            {t('services.title1')} <span className="text-orange">{t('services.title2')}</span>
          </motion.h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.25rem',
          }}
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative rounded-3xl p-7 border transition-all duration-300 flex flex-col ${
                s.featured
                  ? 'bg-gradient-to-b from-orange/15 to-orange/[0.03] border-orange/50 hover:border-orange'
                  : 'bg-offwhite/[0.02] border-offwhite/10 hover:border-orange/30'
              }`}
            >
              {s.featured && (
                <span className="absolute -top-3 left-7 bg-orange text-black-deep text-[10px] font-bold px-3 py-1 rounded-full tracking-widest">
                  {t('services.popular')}
                </span>
              )}
              <div className={`inline-flex w-12 h-12 rounded-2xl items-center justify-center mb-5 ${s.featured ? 'bg-orange text-black-deep' : 'bg-orange/10 text-orange'}`}>
                {s.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-offwhite mb-3 leading-tight">{t(`services.${s.key}.title`)}</h3>
              <p className="text-offwhite/55 text-sm leading-relaxed mb-6">{t(`services.${s.key}.desc`)}</p>

              <ul className="space-y-2 mb-7 flex-1">
                {['f1', 'f2', 'f3', 'f4'].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-offwhite/75 text-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FC7A1E" strokeWidth="3" strokeLinecap="round" className="shrink-0 mt-1">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {t(`services.${s.key}.${f}`)}
                  </li>
                ))}
              </ul>

              <div className="pt-5 border-t border-offwhite/10">
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <span className="text-[10px] uppercase tracking-widest text-offwhite/40">{t('services.from')}</span>
                  <span className="text-[10px] uppercase tracking-widest text-offwhite/40">{t('services.delay')} · {s.days} {t('services.days')}</span>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-offwhite tracking-tight mb-5">{price(s.eur)}</div>
                <a
                  href="#contact"
                  className={`group flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full font-bold tracking-wide transition-all text-sm ${
                    s.featured
                      ? 'bg-orange text-black-deep hover:bg-orange-dark'
                      : 'bg-offwhite/5 text-offwhite border border-offwhite/15 hover:bg-orange hover:text-black-deep hover:border-orange'
                  }`}
                >
                  {t('services.discuss')}
                  <svg className="group-hover:translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compléments */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 md:mt-16 p-7 md:p-9 rounded-3xl border border-offwhite/10 bg-offwhite/[0.02]"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
            <h3 className="text-lg md:text-xl font-bold text-offwhite">{t('services.add.title')}</h3>
            <span className="text-offwhite/45 text-sm">{t('services.add.sub')}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {ADDONS.map((k) => (
              <span
                key={k}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-offwhite/10 text-offwhite/75 text-sm hover:border-orange hover:text-orange transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-orange rounded-full" />
                {t(k)}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
