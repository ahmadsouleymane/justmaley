import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

function ParticlesBg({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(252, 122, 30, ${p.alpha})`
        ctx.fill()
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [canvasRef])

  return null
}

export default function Hero() {
  const canvasRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.9, ease: 'power3.out' })
      gsap.fromTo('.hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: 'power3.out' })
      gsap.fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 1.8 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black-deep px-6"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
      <ParticlesBg canvasRef={canvasRef} />

      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px', height: '600px',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(252,122,30,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center" style={{ maxWidth: '900px' }}>
        {/* Promesse — ligne 1 */}
        <div className="overflow-hidden pb-2">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-offwhite leading-[1] tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)', fontFamily: 'var(--font-cool-cond)' }}
          >
            Je transforme vos idées
          </motion.h1>
        </div>

        {/* Promesse — ligne 2 */}
        <div className="overflow-hidden pb-2">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="leading-[1] tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)', fontFamily: 'var(--font-cool-cond)', color: '#FC7A1E' }}
          >
            en expériences digitales.
          </motion.h1>
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle mt-6 md:mt-8 text-offwhite/50 text-base md:text-lg leading-relaxed" style={{ maxWidth: '520px', fontFamily: 'system-ui, sans-serif' }}>
          Sites web, identités visuelles, vidéos et stratégie de contenu — je donne vie à votre vision depuis Yamoussoukro.
        </p>

        {/* CTA */}
        <motion.a
          href="https://wa.me/2250160726314"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hero-cta mt-10 inline-flex items-center gap-3 bg-orange text-black-deep px-8 py-4 rounded-full tracking-wider hover:bg-orange-dark transition-colors"
          style={{ fontSize: '1rem', fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Discutons sur WhatsApp
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
      >
        <span className="text-offwhite/30 group-hover:text-orange text-xs tracking-[0.3em] uppercase transition-colors" style={{ fontFamily: 'system-ui, sans-serif' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 border-2 border-offwhite/20 group-hover:border-orange/50 rounded-full flex items-start justify-center p-1 transition-colors"
        >
          <div className="w-1 h-2 bg-orange rounded-full" />
        </motion.div>
      </a>
    </section>
  )
}
