import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLocale } from '../i18n.jsx'
import { OFFERS, PILLARS, formatPrice } from '../data/offers.js'
import { EMAIL, WHATSAPP_URL, LINKEDIN_URL } from '../data/contact.js'
import StudioNav from '../components/StudioNav.jsx'
import StudioFooter from '../components/StudioFooter.jsx'

// Une seule page pour les trois piliers : BRAND, GROW et BUILD partagent la même
// structure (hero → livrables → niveaux → process → limites → contact) et ne
// diffèrent que par leur contenu (src/data/offers.js) et leur fond.
//
// Le fond reprend la couleur du pilier sur le portail, donc quand on clique
// BRAND depuis l'accueil, on atterrit littéralement dans le même blanc. C'est
// ce qui fait tenir les trois pages comme un seul système plutôt que comme
// trois pages qui se ressemblent.

const STR = {
  fr: {
    quote: 'Sur devis',
    otherPillars: 'Les deux autres piliers',
    nextStep: 'Ensuite',
    contactTitle: 'On en parle ?',
    contactSub: "Un appel de 30 minutes, gratuit. Tu m'expliques où tu en es, je te dis ce que je ferais et combien ça coûte. Si ce n'est pas mon métier, je te le dis aussi.",
    email: 'Écrire un e-mail',
    whatsapp: 'WhatsApp',
    backHome: "Retour à l'accueil",
  },
  en: {
    quote: 'On quote',
    otherPillars: 'The other two pillars',
    nextStep: 'Then',
    contactTitle: "Let's talk?",
    contactSub: "A free 30-minute call. You tell me where you're at, I tell you what I'd do and what it costs. If it's not my trade, I'll tell you that too.",
    email: 'Send an email',
    whatsapp: 'WhatsApp',
    backHome: 'Back home',
  },
}

export default function Offer({ slug }) {
  const { lang } = useLocale()
  const s = STR[lang] || STR.fr
  const offer = OFFERS[slug]
  const c = offer[lang] || offer.fr

  const others = PILLARS.filter((p) => p !== slug)

  return (
    <div style={{ background: offer.bg, color: offer.fg }} className="min-h-screen">
      <StudioNav offer={offer} />

      <main>
        {/* ---------- HERO ---------- */}
        <section className="relative px-6 md:px-10 pt-32 md:pt-40 pb-20 md:pb-28">
          <div className="mx-auto" style={{ maxWidth: '1080px' }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 text-sm mb-7"
            >
              <span className="font-mono" style={{ color: offer.muted }}>{offer.n}</span>
              <span className="w-10 h-px" style={{ background: offer.hair }} />
              <span className="lowercase tracking-wide" style={{ color: offer.muted }}>{c.tag}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="tracking-tight"
              style={{
                fontFamily: 'var(--font-cool)',
                fontSize: 'clamp(2.1rem, 5.4vw, 4.2rem)',
                lineHeight: 1.02,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                maxWidth: '20ch',
              }}
            >
              {c.hook}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="mt-7 text-base md:text-lg leading-relaxed"
              style={{ color: offer.muted, maxWidth: '58ch' }}
            >
              {c.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition-opacity hover:opacity-85"
                style={{ background: offer.fg, color: offer.bg }}
              >
                {c.cta}
              </a>
              <a
                href="#tiers"
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-opacity hover:opacity-70"
                style={{ border: `1px solid ${offer.hair}` }}
              >
                {c.tiersTitle}
              </a>
            </motion.div>
          </div>
        </section>

        {/* ---------- LIVRABLES ---------- */}
        <Section offer={offer} n="01" title={c.deliverablesTitle}>
          <div className="grid gap-px" style={{ background: offer.hair, border: `1px solid ${offer.hair}` }}>
            {c.deliverables.map(([title, desc], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="grid md:grid-cols-[minmax(0,16rem)_1fr] gap-2 md:gap-10 p-6 md:p-8"
                style={{ background: offer.bg }}
              >
                <h3 className="text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-cool)' }}>
                  {title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: offer.muted }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ---------- NIVEAUX / CATALOGUE ---------- */}
        <Section offer={offer} n="02" title={c.tiersTitle} note={c.note} anchor="tiers">
          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
            {c.tiers.map((tier, i) => {
              // La carte en vedette s'inverse : elle prend la couleur de texte du
              // pilier comme fond, et son fond comme couleur de texte. Sur BRAND
              // (fond clair) elle devient donc noire, sur BUILD (fond noir) elle
              // devient claire. Le contraste va toujours vers l'opposé du pilier.
              const inverted = !!tier.featured
              const onDark = offer.theme !== 'dark'
              const cardBg = inverted ? offer.fg : 'transparent'
              const cardFg = inverted ? offer.bg : offer.fg
              const cardMuted = inverted
                ? (onDark ? 'rgba(246,245,240,0.68)' : 'rgba(10,10,10,0.62)')
                : offer.muted
              const cardHair = inverted
                ? (onDark ? 'rgba(246,245,240,0.24)' : 'rgba(10,10,10,0.16)')
                : offer.hair

              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="relative flex flex-col rounded-2xl p-7"
                  style={{ background: cardBg, border: `1px solid ${inverted ? 'transparent' : offer.hair}` }}
                >
                  {tier.badge && (
                    <span
                      className="absolute -top-3 left-7 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                      style={{ background: inverted ? offer.bg : offer.fg, color: inverted ? offer.fg : offer.bg }}
                    >
                      {tier.badge}
                    </span>
                  )}

                  <h3 className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-cool)', color: cardFg }}>
                    {tier.name}
                  </h3>

                  <div className="mt-4 mb-1 flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-2xl md:text-[1.7rem] font-bold tracking-tight" style={{ fontFamily: 'var(--font-cool)', color: cardFg }}>
                      {tier.price ? `${formatPrice(tier.price)} FCFA` : s.quote}
                    </span>
                    <span className="text-xs" style={{ color: cardMuted }}>{tier.unit}</span>
                  </div>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: cardMuted }}>{tier.desc}</p>

                  <ul className="space-y-2.5">
                    {tier.feats.map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm leading-snug" style={{ color: cardMuted }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* mt-auto : le bouton reste collé au bas de la carte, donc les
                      trois boutons s'alignent même quand les listes ont des
                      longueurs différentes. Les listes, elles, suivent la
                      description sans trou. */}
                  <div className="mt-auto pt-7">
                    <a
                      href="#contact"
                      className="flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition-opacity hover:opacity-85"
                      style={{
                        background: inverted ? offer.bg : 'transparent',
                        color: cardFg,
                        border: `1px solid ${inverted ? 'transparent' : cardHair}`,
                      }}
                    >
                      {c.cta}
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Section>

        {/* ---------- PROCESS ---------- */}
        <Section offer={offer} n="03" title={c.processTitle}>
          <ol className="grid gap-8 md:grid-cols-4">
            {c.process.map(([step, desc], i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <div className="text-xs font-mono mb-3" style={{ color: offer.muted }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-base font-bold mb-2 tracking-tight" style={{ fontFamily: 'var(--font-cool)' }}>
                  {step}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: offer.muted }}>{desc}</p>
              </motion.li>
            ))}
          </ol>
        </Section>

        {/* ---------- LIMITES ---------- */}
        <Section offer={offer} n="04" title={c.limitsTitle}>
          <ul className="grid gap-4 md:grid-cols-3">
            {c.limits.map((limit, i) => (
              <motion.li
                key={limit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="rounded-2xl p-6 text-sm leading-relaxed"
                style={{ border: `1px dashed ${offer.hair}`, color: offer.muted }}
              >
                {limit}
              </motion.li>
            ))}
          </ul>
        </Section>

        {/* ---------- LES DEUX AUTRES PILIERS ---------- */}
        <Section offer={offer} n="05" title={s.otherPillars}>
          <div className="grid gap-px sm:grid-cols-2" style={{ background: offer.hair, border: `1px solid ${offer.hair}` }}>
            {others.map((other) => {
              const o = OFFERS[other]
              const oc = o[lang] || o.fr
              return (
                <Link
                  key={other}
                  to={`/${other}`}
                  className="group flex flex-col justify-between gap-6 p-7 md:p-9 transition-opacity hover:opacity-80"
                  style={{ background: offer.bg, minHeight: '11rem' }}
                >
                  <div className="flex items-center gap-2.5 text-xs" style={{ color: offer.muted }}>
                    <span className="font-mono">{o.n}</span>
                    <span className="w-6 h-px" style={{ background: offer.hair }} />
                    <span className="lowercase">{oc.tag}</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold tracking-tight mb-2" style={{ fontFamily: 'var(--font-cool)' }}>
                      {o.name}
                    </div>
                    <p className="text-sm leading-snug" style={{ color: offer.muted, maxWidth: '34ch' }}>
                      {oc.hook}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </Section>

        {/* ---------- CONTACT ---------- */}
        <section id="contact" className="px-6 md:px-10 py-24 md:py-32" style={{ borderTop: `1px solid ${offer.hair}` }}>
          <div className="mx-auto" style={{ maxWidth: '760px' }}>
            <h2
              className="tracking-tight"
              style={{ fontFamily: 'var(--font-cool)', fontSize: 'clamp(1.9rem, 4.4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              {s.contactTitle}
            </h2>
            <p className="mt-5 text-base md:text-lg leading-relaxed" style={{ color: offer.muted, maxWidth: '52ch' }}>
              {s.contactSub}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(`${offer.name} — ${c.tag}`)}`}
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition-opacity hover:opacity-85"
                style={{ background: offer.fg, color: offer.bg }}
              >
                {s.email}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-opacity hover:opacity-70"
                style={{ border: `1px solid ${offer.hair}` }}
              >
                {s.whatsapp}
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-opacity hover:opacity-70"
                style={{ border: `1px solid ${offer.hair}` }}
              >
                LinkedIn
              </a>
            </div>

            <Link to="/" className="mt-10 inline-block text-xs underline underline-offset-4 transition-opacity hover:opacity-70" style={{ color: offer.muted }}>
              {s.backHome}
            </Link>
          </div>
        </section>
      </main>

      <StudioFooter offer={offer} />
    </div>
  )
}

// Bloc de section homogène : même rythme vertical, même en-tête numéroté
// partout, pour que les trois piliers se lisent comme un seul document.
function Section({ offer, n, title, note, anchor, children }) {
  return (
    <section id={anchor} className="px-6 md:px-10 py-16 md:py-24" style={{ borderTop: `1px solid ${offer.hair}` }}>
      <div className="mx-auto" style={{ maxWidth: '1080px' }}>
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-xs font-mono" style={{ color: offer.muted }}>{n}</span>
          <h2
            className="tracking-tight"
            style={{ fontFamily: 'var(--font-cool)', fontSize: 'clamp(1.5rem, 3.2vw, 2.3rem)', fontWeight: 700, letterSpacing: '-0.015em' }}
          >
            {title}
          </h2>
        </div>
        {note && (
          <p className="text-sm italic mb-10" style={{ color: offer.muted, maxWidth: '60ch' }}>{note}</p>
        )}
        {!note && <div className="mb-10" />}
        {children}
      </div>
    </section>
  )
}
