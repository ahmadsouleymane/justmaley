import { Link } from 'react-router-dom'
import { useLocale } from '../i18n.jsx'

// Retour vers l'accueil du studio, présent dans chaque univers archivé.
// (/creatif et /dev ne sont plus dans le parcours commercial — voir App.jsx.)
export default function BackToPortal() {
  const { lang } = useLocale()
  const label = lang === 'en' ? 'Back home' : "Retour à l'accueil"
  return (
    <Link
      to="/"
      className="fixed bottom-5 left-5 z-[110] inline-flex items-center gap-2 rounded-full border border-offwhite/15 bg-black-deep/80 backdrop-blur px-4 py-2 text-xs font-medium text-offwhite/80 hover:text-orange hover:border-orange/60 transition-colors shadow-lg"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      {label}
    </Link>
  )
}
