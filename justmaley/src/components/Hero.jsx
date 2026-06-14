import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from '../i18n.jsx'

gsap.registerPlugin(ScrollTrigger)

const TECHS = ['React', 'Node.js', 'PostgreSQL', 'Supabase', 'LangChain', 'Groq', 'React Native', 'Stripe', 'Vercel']

export default function Hero() {
  const { t } = useLocale()
  const titleRef = useRef(null)
  const portraitRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          letterSpacing: '-0.03em',
          ease: 'none',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
      if (portraitRef.current) {
        gsap.to(portraitRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: portraitRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
        gsap.to(portraitRef.current, {
          y: '+=8',
          duration: 4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black-deep px-6 md:px-10 pt-24 pb-16"
    >
      {/* ============ BACKGROUND IMMERSIF ============ */}
      {/* Couche 1 : gradient radial orange massif */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '1600px', height: '1600px',
          top: '-500px', right: '-300px',
          background: 'radial-gradient(circle, rgba(252,122,30,0.30) 0%, rgba(252,122,30,0.10) 30%, transparent 60%)',
          filter: 'blur(20px)',
        }}
        aria-hidden="true"
      />
      {/* Couche 2 : second glow orange profond, bas-gauche */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '900px', height: '900px',
          bottom: '-300px', left: '-200px',
          background: 'radial-gradient(circle, rgba(252,122,30,0.12) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />
      {/* Couche 3 : grille de blueprint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(227,231,211,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(227,231,211,0.035) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 25%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      {/* Couche 4 : noise / grain (SVG) — la touche qui rend ça "physique" */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07] mix-blend-overlay"
        aria-hidden="true"
      >
        <filter id="hero-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>
      {/* Couche 5 : barre de scanline horizontale qui flotte */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.4 }}
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: '38%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(252,122,30,0.4), transparent)',
        }}
        aria-hidden="true"
      />
      {/* Couche 6 : coordonnées géo Côte d'Ivoire — discret */}
      <div className="absolute top-24 right-8 hidden lg:block pointer-events-none" aria-hidden="true">
        <div className="text-orange/30 text-[10px] font-mono tracking-widest leading-tight text-right">
          <div>LAT 7.5400° N</div>
          <div>LNG 5.5471° W</div>
        </div>
      </div>

      {/* ============ CONTENU ============ */}
      <div className="relative z-10 mx-auto w-full" style={{ maxWidth: '1280px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Gauche : copy de conversion */}
          <div>
            {/* Preuve sociale d'entrée — pas un statut, un proof */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 bg-offwhite/[0.04] border border-offwhite/10 rounded-full pl-1.5 pr-4 py-1.5 mb-10"
            >
              <span className="bg-orange text-black-deep text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full">{t('hero.proofBadge')}</span>
              <span className="text-offwhite/75 text-xs md:text-sm">{t('hero.proof')}</span>
            </motion.div>

            <h1
              ref={titleRef}
              className="text-offwhite"
              style={{
                fontSize: 'clamp(2.6rem, 6.6vw, 5rem)',
                fontFamily: 'var(--font-cool-cond)',
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
              }}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {t('hero.h1a')}
              </motion.span>
              <motion.span
                className="block text-orange"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                {t('hero.h1b')}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-7 text-offwhite/70 text-base md:text-lg leading-relaxed"
              style={{ maxWidth: '560px' }}
            >
              {t('hero.sub')}
            </motion.p>

            {/* CTAs — primaire fort + secondaire texte */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 bg-orange text-black-deep px-7 py-4 rounded-full font-bold tracking-wide hover:bg-orange-dark transition-all text-sm md:text-base"
                style={{ boxShadow: '0 20px 50px -12px rgba(252,122,30,0.65)' }}
              >
                {t('hero.cta1')}
                <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 text-offwhite/85 hover:text-orange transition-colors text-sm font-medium underline decoration-offwhite/20 hover:decoration-orange underline-offset-[6px]"
              >
                {t('hero.cta2')}
              </a>
            </motion.div>

            {/* Microcopy de réassurance — la trinité conversion */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-offwhite/55 text-xs md:text-[13px]"
            >
              <span className="inline-flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FC7A1E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t('hero.r1')}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FC7A1E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t('hero.r2')}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FC7A1E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t('hero.r3')}
              </span>
            </motion.div>
          </div>

          {/* Droite : portrait isolé sans cadre, sur le BG */}
          <motion.div
            ref={portraitRef}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full"
            style={{ maxWidth: '520px' }}
          >
            {/* Halo orange discret, plus diffus, sans bord net */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: '140%', height: '110%',
                top: '-5%', left: '-20%',
                background: 'radial-gradient(ellipse 55% 50% at 50% 55%, rgba(252,122,30,0.30) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              aria-hidden="true"
            />
            {/* Portrait — transparent, sans cadre, sans ombre dure */}
            <img
              src="/p1.png"
              alt="Ahmad Souleymane"
              className="relative block w-full h-auto"
            />
            {/* Badge flottant : 14 jours livré */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-2 left-0 bg-black-deep border border-orange/40 rounded-2xl px-4 py-3 flex items-center gap-3 backdrop-blur"
              style={{ boxShadow: '0 20px 40px -12px rgba(0,0,0,0.7)' }}
            >
              <span className="text-3xl font-bold text-orange leading-none tracking-tight">14</span>
              <div className="text-left">
                <div className="text-offwhite text-[10px] uppercase tracking-widest font-bold leading-tight">{t('hero.badge.days')}</div>
                <div className="text-offwhite/50 text-[10px] uppercase tracking-widest leading-tight">{t('hero.badge.delivered')}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Marquee tech */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="relative mt-16 md:mt-24"
          style={{ maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)' }}
        >
          <div className="overflow-hidden">
            <div className="marquee-track gap-10 items-center">
              {[...TECHS, ...TECHS].map((tech, i) => (
                <span
                  key={i}
                  className="text-offwhite/25 text-base font-medium tracking-wide whitespace-nowrap flex items-center gap-3"
                >
                  {tech}
                  <span className="w-1 h-1 rounded-full bg-orange/40" />
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
