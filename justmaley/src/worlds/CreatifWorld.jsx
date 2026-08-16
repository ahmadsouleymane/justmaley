import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import BackToPortal from '../components/BackToPortal'
import { useLocale } from '../i18n.jsx'

const Contact = lazy(() => import('../components/Contact'))
const Footer = lazy(() => import('../components/Footer'))

// Monde Créatif : profil créateur de contenu, vidéo et design. Structure prête,
// à remplir avec les vrais projets créatifs d'Ahmad (reels, montages, identités).

const STR = {
  fr: {
    eyebrow: 'créateur de contenu',
    h1a: 'Je raconte des marques',
    h1b: 'en image et en vidéo.',
    sub: 'Montage vidéo, motion design, identité visuelle et réseaux sociaux. Je donne une image nette et cohérente à ce que tu construis.',
    workEyebrow: 'sélection',
    workTitle: 'Quelques réalisations.',
    workNote: 'Bientôt : mes reels, montages et visuels.',
    svcTitle: 'Ce que je crée.',
    services: [
      ['Montage vidéo', 'Reels, formats courts, vidéos de marque. Rythme, son, sous-titres.'],
      ['Motion design', 'Titres animés, habillages, transitions. Premiere Pro et After Effects.'],
      ['Identité visuelle', 'Logos, affiches, flyers, chartes. Une image cohérente partout.'],
      ['Réseaux sociaux', 'Contenu, direction artistique et community management.'],
    ],
  },
  en: {
    eyebrow: 'content creator',
    h1a: 'I tell brand stories',
    h1b: 'in image and video.',
    sub: 'Video editing, motion design, visual identity and social media. I give a sharp, consistent look to what you build.',
    workEyebrow: 'selection',
    workTitle: 'Some work.',
    workNote: 'Soon: my reels, edits and visuals.',
    svcTitle: 'What I create.',
    services: [
      ['Video editing', 'Reels, short form, brand videos. Pace, sound, captions.'],
      ['Motion design', 'Animated titles, overlays, transitions. Premiere Pro and After Effects.'],
      ['Visual identity', 'Logos, posters, flyers, brand kits. One consistent look.'],
      ['Social media', 'Content, art direction and community management.'],
    ],
  },
}

const GALLERY = ['/p2.png', '/p3.png', '/p4.png', '/misterall.png']

export default function CreatifWorld() {
  const { lang } = useLocale()
  const s = STR[lang] || STR.fr

  return (
    <>
      <BackToPortal />
      <main className="bg-black-deep">
        {/* HERO CRÉATIF */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-10 pt-24 pb-16">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1a0d05 0%, #0A0A0A 55%)' }} aria-hidden="true" />
          <div
            className="absolute pointer-events-none"
            style={{ width: '1400px', height: '1400px', top: '-400px', left: '-300px', background: 'radial-gradient(circle, rgba(252,122,30,0.32) 0%, transparent 60%)', filter: 'blur(30px)' }}
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto w-full" style={{ maxWidth: '1200px' }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2.5 text-orange text-sm mb-6">
              <span className="font-mono">01</span>
              <span className="w-8 h-px bg-orange/50" />
              <span className="lowercase tracking-wide">{s.eyebrow}</span>
            </motion.div>
            <h1 className="text-offwhite" style={{ fontFamily: 'var(--font-cool)', fontSize: 'clamp(2.6rem, 7vw, 5.5rem)', lineHeight: 0.98, fontWeight: 800 }}>
              <motion.span className="block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}>{s.h1a}</motion.span>
              <motion.span className="block text-orange" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}>{s.h1b}</motion.span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-7 text-offwhite/70 text-base md:text-lg leading-relaxed" style={{ maxWidth: '560px' }}>
              {s.sub}
            </motion.p>
          </div>
        </section>

        {/* GALERIE (placeholder à remplir avec les vrais projets créatifs) */}
        <section className="relative py-24 md:py-32 px-6 md:px-10">
          <div className="mx-auto" style={{ maxWidth: '1200px' }}>
            <div className="flex items-center gap-2.5 text-orange text-sm mb-4">
              <span className="font-mono">02</span>
              <span className="w-8 h-px bg-orange/50" />
              <span className="lowercase tracking-wide">{s.workEyebrow}</span>
            </div>
            <h2 className="text-offwhite tracking-tight mb-3" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', fontWeight: 700 }}>{s.workTitle}</h2>
            <p className="text-offwhite/40 text-sm italic mb-12">{s.workNote}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {GALLERY.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-offwhite/10 bg-offwhite/[0.02] group"
                >
                  <img src={src} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES CRÉATIFS */}
        <section className="relative py-24 md:py-32 px-6 md:px-10 bg-[#0d0805]">
          <div className="mx-auto" style={{ maxWidth: '1200px' }}>
            <div className="flex items-center gap-2.5 text-orange text-sm mb-4">
              <span className="font-mono">03</span>
              <span className="w-8 h-px bg-orange/50" />
              <span className="lowercase tracking-wide">{s.eyebrow}</span>
            </div>
            <h2 className="text-offwhite tracking-tight mb-12" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', fontWeight: 700 }}>{s.svcTitle}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {s.services.map(([title, desc], i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="p-7 rounded-2xl border border-offwhite/10 bg-black-deep/40 hover:border-orange/50 transition-colors"
                >
                  <div className="text-orange font-mono text-sm mb-3">0{i + 1}</div>
                  <h3 className="text-offwhite text-xl font-bold mb-2 tracking-tight">{title}</h3>
                  <p className="text-offwhite/60 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}
