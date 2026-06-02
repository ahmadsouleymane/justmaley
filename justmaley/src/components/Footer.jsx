import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-green-dark border-t border-offwhite/10">
      {/* CTA final */}
      <div className="mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-12 text-center" style={{ maxWidth: '900px' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-offwhite tracking-tight mb-6"
        >
          Prêt à <span className="text-orange">reprendre le contrôle</span> ?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-offwhite/55 text-base md:text-lg mb-9 mx-auto"
          style={{ maxWidth: '520px' }}
        >
          Un échange gratuit suffit pour savoir comment digitaliser votre entreprise. Sans engagement.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          href="https://api.whatsapp.com/message/EDN2SVYWK5WYF1?autoload=1&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-orange text-black-deep px-8 py-4 rounded-full font-bold tracking-wider hover:bg-orange-dark transition-colors"
        >
          Demander un devis gratuit
        </motion.a>
      </div>

      <div className="mx-auto px-6 md:px-12 py-8 md:py-12 border-t border-offwhite/10" style={{ maxWidth: '1280px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
        <a href="#" aria-label="Justmaley - Accueil">
          <img src="/logo-wt.svg" alt="JUSTMALEY" width="186" height="32" className="h-8 w-auto" />
        </a>

        <div className="flex items-center gap-6">
          {[
            {
              label: 'Instagram',
              href: '#',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              ),
            },
            {
              label: 'TikTok',
              href: '#',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.14a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.57z" />
                </svg>
              ),
            },
            {
              label: 'Facebook',
              href: '#',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              ),
            },
            {
              label: 'LinkedIn',
              href: '#',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              ),
            },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              whileHover={{ scale: 1.2 }}
              className="text-offwhite/60 hover:text-orange transition-colors"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        <p className="text-offwhite/30 text-sm">
          &copy; {new Date().getFullYear()} Justmaley. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
