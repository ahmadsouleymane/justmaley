import { useLocale } from '../i18n.jsx'

export default function LocaleSwitch({ compact = false }) {
  const { lang, setLang } = useLocale()
  const other = lang === 'fr' ? 'en' : 'fr'
  return (
    <button
      onClick={() => setLang(other)}
      className={`text-offwhite/55 hover:text-orange transition-colors ${compact ? 'text-[11px]' : 'text-xs'}`}
      aria-label={`Switch to ${other.toUpperCase()}`}
    >
      <span className="font-semibold">{lang.toUpperCase()}</span>
      <span className="text-offwhite/25 mx-1.5">/</span>
      <span>{other.toUpperCase()}</span>
    </button>
  )
}
