import { motion } from 'framer-motion'
import { useLocale } from '../i18n.jsx'

export default function About() {
  const { t } = useLocale()
  const facts = [
    { l: t('about.fact1.l'), v: t('about.fact1.v') },
    { l: t('about.fact2.l'), v: t('about.fact2.v') },
    { l: t('about.fact3.l'), v: t('about.fact3.v') },
    { l: t('about.fact4.l'), v: t('about.fact4.v') },
  ]
  return (
    <section id="about" className="relative py-24 md:py-32 px-6 md:px-10 bg-green-dark overflow-hidden">
      <div className="mx-auto" style={{ maxWidth: '1080px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-10 md:mb-14"
        >
          <div className="flex items-center gap-2.5 text-orange text-sm mb-4">
            <span className="font-mono">02</span>
            <span className="w-8 h-px bg-orange/50" />
            <span className="lowercase tracking-wide">{t('about.eyebrow')}</span>
          </div>
          <h2 className="text-offwhite tracking-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', lineHeight: 1.04, fontWeight: 700 }}>
            {t('about.h1')}
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '3.5rem',
            alignItems: 'start',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5 text-offwhite/75 text-base md:text-[17px] leading-relaxed"
          >
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {facts.map((f, i) => (
              <div
                key={f.l}
                className={`flex items-baseline justify-between gap-4 py-4 ${i === 0 ? '' : 'border-t border-offwhite/10'}`}
              >
                <span className="text-offwhite/45 text-xs uppercase tracking-widest shrink-0">{f.l}</span>
                <span className="text-offwhite text-sm md:text-base font-medium text-right">{f.v}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
