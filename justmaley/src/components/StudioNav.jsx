import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../i18n.jsx'
import { OFFERS, PILLARS } from '../data/offers.js'

// Barre de navigation du studio. Elle prend les couleurs du pilier courant
// (`offer`), donc la page BRAND a une nav claire et la page BUILD une nav noire,
// sans qu'on ait à maintenir trois barres différentes.
//
// Séparée de Navbar.jsx, qui reste celle des anciennes pages d'archive.

const SCRIM = {
  light: 'rgba(246,245,240,0.86)',
  mid: 'rgba(201,201,196,0.88)',
  dark: 'rgba(10,10,10,0.82)',
}

export default function StudioNav({ offer }) {
  const { lang, setLang } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const other = lang === 'fr' ? 'en' : 'fr'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] transition-colors duration-300"
      style={{
        background: scrolled ? SCRIM[offer.theme] : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${offer.hair}` : '1px solid transparent',
      }}
    >
      <div className="mx-auto px-6 md:px-10 flex items-center justify-between h-16" style={{ maxWidth: '1280px' }}>
        <Link to="/" className="flex items-center" aria-label="JustMaley, retour à l'accueil">
          <img src={offer.logo} alt="JustMaley" width="130" height="22" className="h-5 md:h-6 w-auto" />
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          {PILLARS.map((slug) => {
            const active = slug === offer.slug
            return (
              <Link
                key={slug}
                to={`/${slug}`}
                className="hidden sm:inline text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-100"
                style={{ color: offer.fg, opacity: active ? 1 : 0.5 }}
                aria-current={active ? 'page' : undefined}
              >
                {OFFERS[slug].name}
              </Link>
            )
          })}

          <Link
            to="/apropos"
            className="hidden md:inline text-xs transition-opacity hover:opacity-100"
            style={{ color: offer.muted }}
          >
            {lang === 'en' ? 'About' : 'À propos'}
          </Link>

          <button
            type="button"
            onClick={() => setLang(other)}
            aria-label={`Switch to ${other.toUpperCase()}`}
            className="text-[11px] transition-opacity hover:opacity-70"
            style={{ color: offer.muted }}
          >
            <span className="font-semibold">{lang.toUpperCase()}</span>
            <span className="opacity-40 mx-1">/</span>
            <span>{other.toUpperCase()}</span>
          </button>

          <a
            href="#contact"
            className="inline-flex items-center rounded-full px-3.5 py-2 text-[11px] md:text-xs font-bold transition-opacity hover:opacity-85"
            style={{ background: offer.fg, color: offer.bg }}
          >
            {lang === 'en' ? 'Write us' : 'Nous écrire'}
          </a>
        </div>
      </div>
    </nav>
  )
}
