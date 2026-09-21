import { Link } from 'react-router-dom'
import { useLocale } from '../i18n.jsx'
import { OFFERS, PILLARS } from '../data/offers.js'
import { EMAIL, WHATSAPP_URL, LINKEDIN_URL, LOCATION } from '../data/contact.js'

// Pied de page du studio, thémé par pilier (comme StudioNav).
// Séparé de Footer.jsx, qui reste celui des pages d'archive.

export default function StudioFooter({ offer }) {
  const { lang } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer style={{ borderTop: `1px solid ${offer.hair}` }}>
      <div
        className="mx-auto px-6 md:px-10 py-12 grid gap-10 md:grid-cols-4"
        style={{ maxWidth: '1280px' }}
      >
        <div className="md:col-span-2">
          <img src={offer.logo} alt="JustMaley" width="130" height="22" className="h-5 w-auto mb-4" />
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: offer.muted }}>
            {lang === 'en'
              ? 'A digital studio in Niamey. Identity, visibility, systems — built for West Africa.'
              : "Studio digital à Niamey. Identité, visibilité, systèmes — pensés pour l'Afrique de l'Ouest."}
          </p>
          <p className="mt-4 text-xs" style={{ color: offer.muted }}>{LOCATION}</p>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] mb-4" style={{ color: offer.muted }}>
            {lang === 'en' ? 'Services' : 'Offres'}
          </div>
          <ul className="space-y-2.5">
            {PILLARS.map((slug) => (
              <li key={slug}>
                <Link
                  to={`/${slug}`}
                  className="text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ color: offer.fg }}
                >
                  {OFFERS[slug].name}
                </Link>
                <span className="text-xs ml-2" style={{ color: offer.muted }}>
                  {(OFFERS[slug][lang] || OFFERS[slug].fr).tag}
                </span>
              </li>
            ))}
            <li>
              <Link to="/apropos" className="text-sm transition-opacity hover:opacity-70" style={{ color: offer.muted }}>
                {lang === 'en' ? 'About' : 'À propos'}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] mb-4" style={{ color: offer.muted }}>
            Contact
          </div>
          <ul className="space-y-2.5">
            <li>
              <a href={`mailto:${EMAIL}`} className="text-sm transition-opacity hover:opacity-70" style={{ color: offer.fg }}>
                {EMAIL}
              </a>
            </li>
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm transition-opacity hover:opacity-70" style={{ color: offer.fg }}>
                WhatsApp
              </a>
            </li>
            <li>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-sm transition-opacity hover:opacity-70" style={{ color: offer.fg }}>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${offer.hair}` }}>
        <div
          className="mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ maxWidth: '1280px', color: offer.muted }}
        >
          <span>© {year} JustMaley · Ahmad Souleymane</span>
          <span>{lang === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}</span>
        </div>
      </div>
    </footer>
  )
}
