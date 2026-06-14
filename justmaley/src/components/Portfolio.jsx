import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from '../i18n.jsx'

gsap.registerPlugin(ScrollTrigger)

const STACK = ['React', 'Node.js', 'Express', 'MongoDB', 'LangChain', 'Groq']

export default function Work() {
  const { t } = useLocale()
  const statRefs = useRef([])

  useEffect(() => {
    const targets = [350, 10000, 14]
    const formats = [
      (v) => `${Math.round(v)}+`,
      (v) => `${(v / 1000).toFixed(v < 1000 ? 0 : 1).replace('.0', '')}k+`,
      (v) => `${Math.round(v)}j`,
    ]
    const ctx = gsap.context(() => {
      statRefs.current.forEach((el, i) => {
        if (!el) return
        const obj = { v: 0 }
        gsap.to(obj, {
          v: targets[i],
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => { el.textContent = formats[i](obj.v) },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" className="relative py-24 md:py-32 px-6 md:px-10 bg-black-deep overflow-hidden">
      <div className="mx-auto" style={{ maxWidth: '1280px' }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2.5 text-orange text-sm mb-4">
              <span className="font-mono">01</span>
              <span className="w-8 h-px bg-orange/50" />
              <span className="lowercase tracking-wide">{t('work.eyebrow')}</span>
            </div>
            <h2 className="text-offwhite tracking-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', lineHeight: 1.04, fontWeight: 700 }}>
              {t('work.h1')}
            </h2>
          </motion.div>
          <div className="text-offwhite/40 text-sm italic md:max-w-xs md:text-right">
            {t('work.role')}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[2rem] overflow-hidden border border-offwhite/10 bg-offwhite/[0.02]"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))' }}>
            {/* Texte */}
            <div className="p-8 md:p-12 flex flex-col">
              <div className="flex items-center gap-3 mb-7">
                <span className="inline-flex items-center gap-2 bg-emerald-400/15 text-emerald-300 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t('work.live')}
                </span>
                <span className="text-offwhite/40 text-[10px] tracking-widest uppercase">{t('work.kind')}</span>
              </div>

              <h3 className="text-5xl md:text-6xl font-bold text-offwhite mb-5 tracking-tight">{t('work.title')}</h3>
              <p className="text-offwhite/65 text-base md:text-lg leading-relaxed mb-9">{t('work.desc')}</p>

              <div className="grid grid-cols-3 gap-5 mb-9">
                {['stat1', 'stat2', 'stat3'].map((s, i) => (
                  <div key={s} className="border-l-2 border-orange/40 pl-3">
                    <div
                      ref={(el) => { statRefs.current[i] = el }}
                      className="text-2xl md:text-3xl font-bold text-offwhite tracking-tight tabular-nums"
                    >
                      0
                    </div>
                    <div className="text-[11px] text-offwhite/45 mt-1 leading-tight">{t(`work.${s}.l`)}</div>
                  </div>
                ))}
              </div>

              <div className="mb-9 flex flex-wrap gap-1.5">
                {STACK.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-md bg-offwhite/[0.04] border border-offwhite/10 text-offwhite/70 text-[11px] font-mono">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between gap-4 flex-wrap">
                <a
                  href="https://misterall.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-orange hover:text-orange-dark transition-colors text-base font-semibold"
                >
                  {t('work.see')}
                  <svg className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
                <a href="#contact" className="text-offwhite/50 hover:text-orange transition-colors text-sm italic">
                  {t('work.next')} →
                </a>
              </div>
            </div>

            {/* Visuel — chassis browser + screenshot, plus dense */}
            <div className="relative bg-gradient-to-br from-orange/10 via-orange/[0.04] to-transparent p-7 md:p-10 flex flex-col justify-center overflow-hidden min-h-[400px]">
              {/* Pattern dots décoratif */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(252,122,30,0.25) 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                  maskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%)',
                }}
                aria-hidden="true"
              />
              {/* Glow central */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: 0,
                  background: 'radial-gradient(circle at 60% 40%, rgba(252,122,30,0.35) 0%, transparent 60%)',
                }}
                aria-hidden="true"
              />

              {/* Chassis browser */}
              <div
                className="relative z-10 rounded-xl overflow-hidden border border-offwhite/15 bg-black-deep mx-auto w-full max-w-lg"
                style={{ boxShadow: '0 40px 80px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(252,122,30,0.1) inset' }}
              >
                <div className="flex items-center gap-2 px-3 py-2 border-b border-offwhite/10 bg-black-deep/95">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400/70" />
                    <span className="w-2 h-2 rounded-full bg-amber-400/70" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="flex-1 ml-3 px-2.5 py-1 rounded-md bg-offwhite/5 border border-offwhite/10 text-offwhite/60 text-[10px] font-mono">
                    misterall.com
                  </div>
                  <span className="text-emerald-400 text-[9px] font-bold tracking-widest">LIVE</span>
                </div>
                <img src="/misterall.png" alt="MisterAll" className="w-full block" />
              </div>

              {/* Tag overlay : "EdTech" */}
              <div className="relative z-10 mt-5 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange/30 bg-orange/5 text-orange text-[11px] font-medium">
                  <span className="w-1 h-1 rounded-full bg-orange" />
                  Conception
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange/30 bg-orange/5 text-orange text-[11px] font-medium">
                  <span className="w-1 h-1 rounded-full bg-orange" />
                  Code
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange/30 bg-orange/5 text-orange text-[11px] font-medium">
                  <span className="w-1 h-1 rounded-full bg-orange" />
                  Production
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
