import { Link } from 'react-router-dom'
import { useLocale } from '../i18n.jsx'

// Petit retour vers le portail des deux mondes, présent dans chaque univers.
export default function BackToPortal() {
  const { lang } = useLocale()
  const label = lang === 'en' ? 'Both worlds' : 'Les deux mondes'
  return (
    <Link
      to="/"
      className="fixed top-5 left-5 z-50 inline-flex items-center gap-2 rounded-full border border-offwhite/15 bg-black-deep/70 backdrop-blur px-4 py-2 text-xs font-medium text-offwhite/80 hover:text-orange hover:border-orange/60 transition-colors"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      {label}
    </Link>
  )
}
