import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'À propos', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Offres', href: '#offre' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? 'bg-black-deep/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto px-6 md:px-12 flex items-center justify-between h-20" style={{ maxWidth: '1280px' }}>
        <a href="#" className="flex items-center gap-3" aria-label="Justmaley - Accueil">
          <img src="/logo-wt.svg" alt="JUSTMALEY" className="h-5 md:h-6" />
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-offwhite/70 hover:text-orange transition-colors text-sm tracking-widest uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/2250160726314"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange text-black-deep px-5 py-2.5 rounded-full text-sm font-bold tracking-wider hover:bg-orange-dark transition-colors"
          >
            WhatsApp
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-6 h-[2px] bg-offwhite block"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-[2px] bg-offwhite block"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-6 h-[2px] bg-offwhite block"
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black-deep/95 backdrop-blur-md overflow-hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-offwhite text-2xl tracking-wider uppercase hover:text-orange transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/2250160726314"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange text-black-deep px-8 py-3 rounded-full text-lg font-bold tracking-wider"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
