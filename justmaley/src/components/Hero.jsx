import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from '../i18n.jsx'

gsap.registerPlugin(ScrollTrigger)

const TECHS = ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Supabase', 'LangChain', 'Groq', 'React Native', 'Expo', 'Stripe', 'Vercel']

export default function Hero() {
  const { t } = useLocale()
  const mockupRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    if (!mockupRef.current) return
    const ctx = gsap.context(() => {
      // Parallax & tilt au scroll sur le mockup
      gsap.to(mockupRef.current, {
        y: -60,
        rotateX: -6,
        scale: 0.96,
        ease: 'none',
        scrollTrigger: {
          trigger: mockupRef.current,
          start: 'top center',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Flottement subtil en boucle
      gsap.to(mockupRef.current, {
        y: '+=10',
        duration: 3.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      // Léger zoom sur le titre au scroll
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          letterSpacing: '-0.04em',
          ease: 'none',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black-deep px-6 md:px-12 pt-28 pb-20"
    >
      {/* Glow ambiance */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '1400px', height: '1400px',
          top: '-500px', left: '50%', transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(252,122,30,0.18) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(227,231,211,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(227,231,211,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 50% 35%, black 25%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Bloc texte centré — aéré */}
      <div className="relative z-10 mx-auto w-full text-center" style={{ maxWidth: '1080px' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-orange/30 bg-orange/5 mb-12 backdrop-blur"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-orange opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full w-2 h-2 bg-orange" />
          </span>
          <span className="text-orange text-[11px] tracking-[0.4em] uppercase font-semibold">{t('hero.tag')}</span>
        </motion.div>

        <h1
          ref={titleRef}
          className="text-offwhite mx-auto"
          style={{
            fontSize: 'clamp(2.6rem, 8.5vw, 6.6rem)',
            fontFamily: 'var(--font-cool-cond)',
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('hero.title1')}
          </motion.span>
          <motion.span
            className="block mt-3 md:mt-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: '#FC7A1E' }}
          >
            {t('hero.title2')}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 md:mt-12 text-offwhite/65 text-base md:text-xl leading-relaxed mx-auto"
          style={{ maxWidth: '640px' }}
        >
          {t('hero.sub')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 md:mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#services"
            className="group relative inline-flex items-center gap-2 bg-orange text-black-deep px-8 py-4 rounded-full font-bold tracking-wide hover:bg-orange-dark transition-all text-sm"
            style={{ boxShadow: '0 20px 40px -10px rgba(252,122,30,0.5)' }}
          >
            <span>{t('hero.cta1')}</span>
            <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-offwhite/20 text-offwhite hover:border-orange hover:text-orange px-8 py-4 rounded-full font-semibold tracking-wide transition-colors text-sm backdrop-blur"
          >
            {t('hero.cta2')}
          </a>
        </motion.div>
      </div>

      {/* Mockup browser + badges */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto mt-24 md:mt-32 w-full"
        style={{ maxWidth: '960px', perspective: '1400px' }}
      >
        <div ref={mockupRef} className="relative" style={{ transformStyle: 'preserve-3d' }}>
          <div
            className="relative rounded-2xl overflow-hidden border border-offwhite/15 bg-black-deep"
            style={{
              boxShadow: '0 60px 140px -30px rgba(252,122,30,0.4), 0 30px 70px -15px rgba(0,0,0,0.7)',
            }}
          >
            {/* Barre browser */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-offwhite/10 bg-black-deep/90 backdrop-blur">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="flex-1 mx-2 md:mx-6 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-offwhite/5 border border-offwhite/10 text-offwhite/70 text-xs">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <span className="hidden sm:inline">https://</span>{t('hero.url')}
              </div>
              <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t('hero.live')}
              </span>
            </div>
            {/* Capture */}
            <div className="relative bg-black-deep">
              <img
                src="/misterall.png"
                alt="MisterAll, SaaS d'apprentissage propulsé par l'IA, en production"
                className="w-full block"
                loading="eager"
              />
              <div
                className="absolute inset-x-0 top-0 h-20 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, rgba(252,122,30,0.12) 0%, transparent 100%)' }}
              />
            </div>
          </div>

          {/* Badge "350+ utilisateurs" — extérieur bas-gauche, large décalage */}
          <motion.div
            initial={{ opacity: 0, y: 30, x: -40 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.7, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute hidden lg:flex items-center gap-3 bg-black-deep/95 border border-offwhite/10 rounded-2xl px-5 py-3.5 backdrop-blur"
            style={{
              bottom: '-28px',
              left: '-72px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)',
            }}
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-400/15 text-emerald-400 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-offwhite font-bold text-sm leading-tight">{t('hero.badge.users')}</div>
              <div className="text-offwhite/50 text-[10px] uppercase tracking-widest mt-0.5">{t('hero.badge.usersSub')}</div>
            </div>
          </motion.div>

          {/* Badge "7 jours" — extérieur haut-droite */}
          <motion.div
            initial={{ opacity: 0, y: -30, x: 40 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.7, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute hidden lg:flex items-center gap-3 bg-orange text-black-deep rounded-2xl px-5 py-3.5"
            style={{
              top: '-28px',
              right: '-72px',
              boxShadow: '0 25px 50px -10px rgba(252,122,30,0.6)',
            }}
          >
            <div className="text-3xl font-bold leading-none tracking-tight">7</div>
            <div className="text-left">
              <div className="text-xs uppercase tracking-widest font-bold leading-tight">{t('hero.badge.days')}</div>
              <div className="text-[10px] uppercase tracking-widest font-semibold opacity-70 mt-0.5">{t('hero.badge.delivery')}</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Marquee tech */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="relative z-10 mt-24 md:mt-32"
        style={{ maskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)' }}
      >
        <div className="overflow-hidden">
          <div className="marquee-track gap-12 items-center">
            {[...TECHS, ...TECHS].map((tech, i) => (
              <span
                key={i}
                className="text-offwhite/30 text-base md:text-lg font-semibold tracking-wider whitespace-nowrap flex items-center gap-3"
              >
                {tech}
                <span className="w-1 h-1 rounded-full bg-orange/50" />
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
