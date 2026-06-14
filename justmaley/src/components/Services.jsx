import { motion } from 'framer-motion'
import { useLocale } from '../i18n.jsx'

export default function Services() {
  const { t } = useLocale()
  const items = [
    { k: '1', n: '01' },
    { k: '2', n: '02' },
    { k: '3', n: '03' },
  ]
  return (
    <section id="services" className="relative py-24 md:py-32 px-6 md:px-10 bg-black-deep overflow-hidden">
      <div className="mx-auto" style={{ maxWidth: '1080px' }}>
        <div
          className="mb-12 md:mb-16"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full hidden md:block order-1"
            style={{ maxWidth: '360px', transform: 'scaleX(-1)' }}
          >
            <div
              className="absolute pointer-events-none"
              style={{
                width: '120%', height: '110%',
                top: '-5%', left: '-10%',
                background: 'radial-gradient(ellipse 55% 50% at 45% 55%, rgba(252,122,30,0.25) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
              aria-hidden="true"
            />
            <img
              src="/p2.png"
              alt="Ahmad Souleymane pointant vers les offres"
              className="relative block w-full h-auto"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2"
          >
            <div className="flex items-center gap-2.5 text-orange text-sm mb-4">
              <span className="font-mono">03</span>
              <span className="w-8 h-px bg-orange/50" />
              <span className="lowercase tracking-wide">{t('services.eyebrow')}</span>
            </div>
            <h2 className="text-offwhite tracking-tight mb-6" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', lineHeight: 1.04, fontWeight: 700 }}>
              {t('services.h1')}
            </h2>
            <p className="text-offwhite/60 text-base md:text-lg leading-relaxed" style={{ maxWidth: '620px' }}>
              {t('services.intro')}
            </p>
          </motion.div>
        </div>

        <div className="border-t border-offwhite/10">
          {items.map((it, i) => (
            <motion.a
              key={it.k}
              href="#contact"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-8 md:py-10 border-b border-offwhite/10 hover:bg-orange/[0.03] transition-colors px-2 -mx-2"
            >
              <span className="text-orange/60 text-sm font-mono shrink-0 md:w-12">{it.n}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-offwhite text-xl md:text-2xl font-bold leading-tight mb-2 group-hover:text-orange transition-colors">
                  {t(`services.${it.k}.t`)}
                </h3>
                <p className="text-offwhite/55 text-sm md:text-base leading-relaxed">
                  {t(`services.${it.k}.d`)}
                </p>
              </div>
              <span className="hidden md:inline-flex items-center gap-2 text-offwhite/40 group-hover:text-orange transition-colors text-sm font-medium shrink-0">
                {t('services.cta')}
                <svg className="group-hover:translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
