import { motion } from 'framer-motion'
import BackToPortal from '../components/BackToPortal'
import { useLocale } from '../i18n.jsx'

// Monde Créatif (yang, blanc) : pureté, design, élégance. Fond clair, noir,
// typographie aérée. Autonome (contact et pied de page clairs) pour rester
// entièrement blanc, à l'opposé du monde développeur noir.

const EMAIL = 'souleymane@justmaley.tech'
const WHATSAPP_URL = 'https://api.whatsapp.com/message/EDN2SVYWK5WYF1?autoload=1&app_absent=0'
const LINKEDIN_URL = 'https://linkedin.com/in/ahmadsouleymane'

const STR = {
  fr: {
    eyebrow: 'créateur de contenu',
    h1a: 'Je raconte des marques',
    h1b: 'en image et en vidéo.',
    sub: 'Montage vidéo, motion design, identité visuelle et réseaux sociaux. Je donne une image nette et cohérente à ce que tu construis.',
    workEyebrow: 'sélection',
    workTitle: 'Quelques réalisations',
    workNote: 'Bientôt : mes reels, montages et visuels.',
    svcEyebrow: 'savoir-faire',
    svcTitle: 'Ce que je crée',
    services: [
      ['Montage vidéo', 'Reels, formats courts, vidéos de marque. Rythme, son, sous-titres.'],
      ['Motion design', 'Titres animés, habillages, transitions. Premiere Pro et After Effects.'],
      ['Identité visuelle', 'Logos, affiches, flyers, chartes. Une image cohérente partout.'],
      ['Réseaux sociaux', 'Contenu, direction artistique et community management.'],
    ],
    ctaEyebrow: 'on crée ensemble ?',
    ctaTitle: 'Parle-moi de ton projet.',
    ctaSub: 'Une marque à habiller, une vidéo à monter, une identité à poser. Écris-moi, je réponds vite.',
    write: 'M’écrire',
  },
  en: {
    eyebrow: 'content creator',
    h1a: 'I tell brand stories',
    h1b: 'in image and video.',
    sub: 'Video editing, motion design, visual identity and social media. I give a sharp, consistent look to what you build.',
    workEyebrow: 'selection',
    workTitle: 'Selected work',
    workNote: 'Soon: my reels, edits and visuals.',
    svcEyebrow: 'craft',
    svcTitle: 'What I create',
    services: [
      ['Video editing', 'Reels, short form, brand videos. Pace, sound, captions.'],
      ['Motion design', 'Animated titles, overlays, transitions. Premiere Pro and After Effects.'],
      ['Visual identity', 'Logos, posters, flyers, brand kits. One consistent look.'],
      ['Social media', 'Content, art direction and community management.'],
    ],
    ctaEyebrow: 'let’s create?',
    ctaTitle: 'Tell me about your project.',
    ctaSub: 'A brand to dress, a video to edit, an identity to set. Write me, I reply fast.',
    write: 'Write me',
  },
}

const GALLERY = ['/p2.png', '/p3.png', '/p4.png', '/p1.png']
const INK = '#0A0A0A'

function Eyebrow({ n, children }) {
  return (
    <div className="flex items-center gap-2.5 text-sm mb-5" style={{ color: INK }}>
      <span className="font-mono opacity-50">{n}</span>
      <span className="w-8 h-px bg-black/25" />
      <span className="lowercase tracking-wide opacity-70">{children}</span>
    </div>
  )
}

export default function CreatifWorld() {
  const { lang } = useLocale()
  const s = STR[lang] || STR.fr

  return (
    <div className="bg-[#f6f5f0] text-[#0A0A0A]">
      <BackToPortal />
      <main>
        {/* HERO */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-10 pt-24 pb-16">
          {/* fin grain / lumière douce */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 70% 30%, rgba(0,0,0,0.04) 0%, transparent 70%)' }} aria-hidden="true" />
          <div className="relative z-10 mx-auto w-full grid gap-10 items-center" style={{ maxWidth: '1200px', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' }}>
            <div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Eyebrow n="01">{s.eyebrow}</Eyebrow>
              </motion.div>
              <h1 style={{ fontFamily: 'var(--font-cool)', fontSize: 'clamp(2.6rem, 6.5vw, 5rem)', lineHeight: 0.98, fontWeight: 800, letterSpacing: '-0.02em' }}>
                <motion.span className="block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}>{s.h1a}</motion.span>
                <motion.span className="block" style={{ opacity: 0.45 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 0.45, y: 0 }} transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}>{s.h1b}</motion.span>
              </h1>
              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-7 text-black/60 text-base md:text-lg leading-relaxed" style={{ maxWidth: '520px' }}>
                {s.sub}
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="relative mx-auto w-full float-y" style={{ maxWidth: '440px' }}>
              <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(ellipse 55% 50% at 50% 55%, rgba(0,0,0,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} aria-hidden="true" />
              <img src="/profile face.png" alt="Ahmad Souleymane" className="relative block w-full h-auto" />
            </motion.div>
          </div>
        </section>

        {/* GALERIE */}
        <section className="relative py-24 md:py-32 px-6 md:px-10">
          <div className="mx-auto" style={{ maxWidth: '1200px' }}>
            <Eyebrow n="02">{s.workEyebrow}</Eyebrow>
            <h2 className="tracking-tight mb-3" style={{ fontFamily: 'var(--font-cool)', fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', fontWeight: 700 }}>{s.workTitle}</h2>
            <p className="text-black/40 text-sm italic mb-12">{s.workNote}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {GALLERY.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-black/10 group"
                >
                  <img src={src} alt="" className="w-full h-full object-cover object-top opacity-95 group-hover:scale-105 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="relative py-24 md:py-32 px-6 md:px-10 bg-white">
          <div className="mx-auto" style={{ maxWidth: '1200px' }}>
            <Eyebrow n="03">{s.svcEyebrow}</Eyebrow>
            <h2 className="tracking-tight mb-12" style={{ fontFamily: 'var(--font-cool)', fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', fontWeight: 700 }}>{s.svcTitle}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {s.services.map(([title, desc], i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="p-7 rounded-2xl border border-black/10 bg-[#f6f5f0] hover:border-black/40 transition-colors"
                >
                  <div className="font-mono text-sm mb-3 text-black/40">0{i + 1}</div>
                  <h3 className="text-xl font-bold mb-2 tracking-tight">{title}</h3>
                  <p className="text-black/60 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT (clair) */}
        <section className="relative py-24 md:py-32 px-6 md:px-10">
          <div className="mx-auto text-center" style={{ maxWidth: '720px' }}>
            <div className="flex items-center justify-center gap-2.5 text-sm mb-5">
              <span className="w-8 h-px bg-black/25" />
              <span className="lowercase tracking-wide text-black/60">{s.ctaEyebrow}</span>
              <span className="w-8 h-px bg-black/25" />
            </div>
            <h2 className="tracking-tight" style={{ fontFamily: 'var(--font-cool)', fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 700 }}>{s.ctaTitle}</h2>
            <p className="mt-5 text-black/60 text-base md:text-lg leading-relaxed mx-auto" style={{ maxWidth: '520px' }}>{s.ctaSub}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 bg-black text-white px-7 py-4 rounded-full font-bold tracking-wide hover:bg-black/85 transition-colors text-sm">
                {s.write}
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-black/20 px-6 py-4 rounded-full font-medium hover:border-black transition-colors text-sm">
                WhatsApp
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-black/20 px-6 py-4 rounded-full font-medium hover:border-black transition-colors text-sm">
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 py-8 px-6 md:px-10">
        <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-black/50 text-xs" style={{ maxWidth: '1200px' }}>
          <span>© {new Date().getFullYear()} Ahmad Souleymane · Justmaley</span>
          <span className="tracking-wide">{EMAIL}</span>
        </div>
      </footer>
    </div>
  )
}
