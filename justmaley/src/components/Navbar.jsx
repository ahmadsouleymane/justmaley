import { useState, useEffect } from 'react'
import { useLocale } from '../i18n.jsx'
import LocaleSwitch from './LocaleSwitch.jsx'

export default function Navbar() {
  const { t } = useLocale()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? 'bg-black-deep/80 backdrop-blur-md border-b border-offwhite/5' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto px-6 md:px-10 flex items-center justify-between h-16" style={{ maxWidth: '1280px' }}>
        <a href="#" className="flex items-center" aria-label="Just Maley">
          <img src="/logo-wt.svg" alt="Just Maley" width="140" height="24" className="h-6 md:h-7 w-auto" />
        </a>

        <div className="flex items-center gap-5 md:gap-7">
          <a href="#work" className="hidden md:inline text-offwhite/65 hover:text-orange transition-colors text-sm">{t('nav.work')}</a>
          <a href="#about" className="hidden md:inline text-offwhite/65 hover:text-orange transition-colors text-sm">{t('nav.about')}</a>
          <a href="#services" className="hidden md:inline text-offwhite/65 hover:text-orange transition-colors text-sm">{t('nav.services')}</a>
          <LocaleSwitch />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-orange text-black-deep px-4 py-2 rounded-full text-xs font-bold hover:bg-orange-dark transition-colors"
          >
            {t('nav.cta')}
          </a>
        </div>
      </div>
    </nav>
  )
}
