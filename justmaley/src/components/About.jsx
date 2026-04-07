import { motion } from 'framer-motion'


export default function About() {
  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-12 bg-green-dark overflow-hidden">
      <div
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{ aspectRatio: '3/4', backgroundColor: '#0A0A0A' }}
          >
            <img
              src="/pic.png"
              alt="Justmaley — Freelance digital à Yamoussoukro"
              className="w-full h-full absolute inset-0"
              style={{
                objectFit: 'cover',
                filter: 'grayscale(100%) contrast(1.1)',
                mixBlendMode: 'luminosity',
              }}
              loading="lazy"
            />
            {/* Teinte orange */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(160deg, rgba(252,122,30,0.15) 0%, rgba(10,10,10,0.6) 100%)',
                mixBlendMode: 'color',
              }}
            />
            {/* Vignette */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 40% 30%, transparent 40%, rgba(10,10,10,0.5) 100%)',
              }}
            />
            {/* Grain */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                backgroundSize: '128px 128px',
              }}
            />
            {/* Bordure intérieure */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{ border: '1px solid rgba(252,122,30,0.12)' }}
            />
          </div>
          <div
            className="absolute rounded-2xl bg-orange"
            style={{ bottom: '-1.5rem', right: '-1.5rem', width: '60%', height: '40%', zIndex: -1 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-orange text-sm tracking-[0.3em] uppercase mb-4 block">
            À propos
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-offwhite tracking-tight mb-6">
            Salut, moi c&apos;est <span className="text-orange">Ahmad Souleymane.</span>
          </h2>
          <div className="space-y-4 text-offwhite/60 text-base leading-relaxed">
            <p>
              Je suis freelance digital basé à <span className="text-offwhite">Yamoussoukro, Côte d&apos;Ivoire</span>.
              Je transforme vos idées en expériences numériques qui marquent les esprits.
            </p>
            <p>
              Du site web au montage vidéo, du branding aux réseaux sociaux — je m&apos;occupe de tout
              votre univers digital avec une obsession : que chaque pixel, chaque frame, chaque mot
              serve votre vision.
            </p>
            <p>
              Mon approche est simple : <span className="text-offwhite">écouter, créer, livrer</span>.
              Pas de blabla, pas de délais interminables. Juste du travail bien fait, avec passion.
            </p>
          </div>

          
        </motion.div>
      </div>
    </section>
  )
}
