import { useEffect, useRef, useState } from 'react'
import { useLocale } from '../i18n.jsx'

const LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
]

const CURRENCIES = [
  { code: 'XOF', label: 'FCFA' },
  { code: 'XAF', label: 'FCFA (CEMAC)' },
  { code: 'EUR', label: 'EUR' },
  { code: 'USD', label: 'USD' },
  { code: 'GBP', label: 'GBP' },
]

export default function LocaleSwitch({ compact = false }) {
  const { lang, currency, setLang, setCurrency } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const currentCurrency = CURRENCIES.find((c) => c.code === currency)?.label ?? currency

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 rounded-full border border-offwhite/15 text-offwhite/80 hover:border-orange hover:text-orange transition-colors ${
          compact ? 'px-3 py-1.5 text-xs' : 'px-3.5 py-2 text-xs'
        }`}
        aria-label="Langue et devise"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
        </svg>
        <span className="font-semibold tracking-wider">{lang.toUpperCase()}</span>
        <span className="text-offwhite/40">·</span>
        <span className="font-semibold">{currentCurrency}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-offwhite/10 bg-black-deep/95 backdrop-blur p-4 shadow-2xl z-[200]">
          <div className="text-[10px] uppercase tracking-widest text-offwhite/40 mb-2">Language</div>
          <div className="flex gap-2 mb-4">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                  lang === l.code ? 'bg-orange text-black-deep' : 'bg-offwhite/5 text-offwhite/70 hover:bg-offwhite/10'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-offwhite/40 mb-2">Currency</div>
          <div className="grid grid-cols-1 gap-1">
            {CURRENCIES.map((c) => (
              <button
                key={c.code}
                onClick={() => setCurrency(c.code)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                  currency === c.code ? 'bg-orange/15 text-orange' : 'text-offwhite/70 hover:bg-offwhite/5'
                }`}
              >
                <span className="font-semibold">{c.label}</span>
                <span className="text-offwhite/40">{c.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
