import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from '../i18n.jsx'

gsap.registerPlugin(ScrollTrigger)

const STACK = ['React', 'Node.js', 'Express', 'MongoDB', 'LangChain', 'Groq']

export default function Portfolio() {
  const { t } = useLocale()
  const statRefs = useRef([])

  useEffect(() => {
    const config = [
      { target: 350, format: (v) => `${Math.round(v)}+` },
      { target: 10000, format: (v) => (v < 1000 ? Math.round(v) : `${(v / 1000).toFixed(1).replace('.0', '')}k+`) },
      { target: 1, format: (v) => Math.round(v).toString() },
    ]
    const ctx = gsap.context(() => {
      statRefs.current.forEach((el, i) => {
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: config[i].target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => { el.textContent = config[i].format(obj.val) },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  const stats = [
    { label: t('work.stat1') },
    { label: t('work.stat2') },
    { label: t('work.stat3') },
  ]

  return (
    <section id="portfolio" className="relative py-24 md:py-36 px-6 md:px-12 bg-green-dark overflow-hidden">
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-orange text-[11px] tracking-[0.4em] uppercase font-semibold mb-5 block"
          >
            {t('work.tag')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-offwhite tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', lineHeight: 1.02, fontWeight: 700 }}
          >
            {t('work.title1')} <span className="text-orange">{t('work.title2')}</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[2rem] overflow-hidden border border-offwhite/10 bg-black-deep/50 backdrop-blur"
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            }}
          >
            <div className="p-8 md:p-12 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 bg-emerald-400/15 text-emerald-300 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t('work.live')}
                </span>
                <span className="text-offwhite/40 text-[10px] tracking-widest uppercase">{t('work.kind')}</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold text-offwhite mb-5 tracking-tight">MisterAll</h3>
              <p className="text-offwhite/70 text-base md:text-lg leading-relaxed mb-7">{t('work.desc')}</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((s, i) => (
                  <div key={s.label}>
                    <div
                      ref={(el) => { statRefs.current[i] = el }}
                      className="text-2xl md:text-3xl font-bold text-orange tracking-tight tabular-nums"
                    >
                      0
                    </div>
                    <div className="text-[11px] text-offwhite/50 mt-1 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <div className="text-[10px] text-offwhite/40 uppercase tracking-widest mb-3">{t('work.stack')}</div>
                <div className="flex flex-wrap gap-2">
                  {STACK.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-full border border-offwhite/15 text-offwhite/80 text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-3">
                <a
                  href="https://misterall.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-orange text-black-deep px-6 py-3 rounded-full font-bold tracking-wide hover:bg-orange-dark transition-colors text-sm"
                >
                  {t('work.see')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 border border-offwhite/20 text-offwhite hover:border-orange hover:text-orange px-6 py-3 rounded-full font-semibold tracking-wide transition-colors text-sm"
                >
                  {t('work.discuss')}
                </a>
              </div>
            </div>

            <div className="relative bg-orange/10 p-8 md:p-12 flex items-center justify-center overflow-hidden min-h-[360px]">
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: 0,
                  background: 'radial-gradient(circle at 70% 30%, rgba(252,122,30,0.4) 0%, transparent 60%)',
                }}
                aria-hidden="true"
              />
              <img
                src="/misterall.png"
                alt="MisterAll — interface de la plateforme"
                className="relative z-10 w-full max-w-lg rounded-2xl shadow-2xl border border-offwhite/10"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
