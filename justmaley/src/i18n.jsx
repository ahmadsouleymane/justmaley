import { createContext, useContext, useEffect, useMemo, useState } from 'react'

// Contexte de langue du studio.
//
// Il ne porte plus de dictionnaire : chaque page du studio (Portal, Offer,
// Apropos, StudioNav, StudioFooter) déclare ses propres textes FR/EN dans un
// objet STR local, à côté du JSX qui les affiche. C'est plus lisible pour des
// pages dont les libellés sont courts et très liés à leur mise en page.
//
// Le fichier précédent contenait un dictionnaire global qui servait aux anciens
// univers /creatif et /dev, supprimés depuis. Il ne reste ici que ce qui est
// réellement partagé : détecter la langue et la mémoriser.

const FRANCOPHONE_TZ = new Set([
  'Africa/Abidjan', 'Africa/Bamako', 'Africa/Dakar', 'Africa/Lome', 'Africa/Niamey',
  'Africa/Ouagadougou', 'Africa/Porto-Novo', 'Africa/Brazzaville', 'Africa/Kinshasa',
  'Africa/Douala', 'Africa/Libreville', 'Africa/Bangui', 'Africa/Ndjamena',
  'Africa/Conakry', 'Africa/Nouakchott', 'Africa/Djibouti',
  'Europe/Paris', 'Europe/Brussels', 'Europe/Luxembourg', 'Europe/Monaco',
  'Indian/Antananarivo', 'Indian/Mauritius',
])

function detectLang() {
  if (typeof window === 'undefined') return 'fr'
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    const navLang = (navigator.language || 'fr').slice(0, 2).toLowerCase()
    if (FRANCOPHONE_TZ.has(tz) || navLang === 'fr') return 'fr'
    return 'en'
  } catch {
    return 'fr'
  }
}

const LocaleContext = createContext(null)
const STORAGE_KEY = 'justmaley.locale.v2'

export function LocaleProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'fr'
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'fr' || saved === 'en') return saved
    } catch { /* empty */ }
    return detectLang()
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang) } catch { /* empty */ }
    if (typeof document !== 'undefined') document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => ({ lang, setLang: setLangState }), [lang])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider')
  return ctx
}
