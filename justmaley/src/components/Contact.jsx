import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocale } from '../i18n.jsx'

const EMAIL = 'ahmadsouleymane1302@gmail.com'
const WHATSAPP_URL = 'https://api.whatsapp.com/message/EDN2SVYWK5WYF1?autoload=1&app_absent=0'
const LINKEDIN_URL = 'https://linkedin.com/in/ahmadsouleymane'
const COMEUP_URL = 'https://comeup.com/@JustMaley'

export default function Contact() {
  const { t } = useLocale()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = encodeURIComponent(`${formData.name} (${formData.email})\n\n${formData.message}`)
    window.open(`${WHATSAPP_URL}&text=${text}`, '_blank')
  }

  return (
    <section id="contact" className="relative py-24 md:py-36 px-6 md:px-12 bg-green-dark overflow-hidden">
      <div
        className="mx-auto"
        style={{
          maxWidth: '1200px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: '4rem',
        }}
      >
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-orange text-[11px] tracking-[0.4em] uppercase font-semibold mb-5 block"
          >
            {t('contact.tag')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-offwhite tracking-tight mb-7"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', lineHeight: 1, fontWeight: 700 }}
          >
            {t('contact.title1')}<br /><span className="text-orange">{t('contact.title2')}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-offwhite/65 text-base md:text-lg mb-10"
          >
            {t('contact.sub')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-3"
          >
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-4 p-4 rounded-2xl border border-offwhite/10 bg-black-deep/30 hover:border-orange transition-colors group"
            >
              <div className="w-11 h-11 rounded-full bg-orange/15 text-orange flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="2" y="4" width="16" height="12" rx="2" />
                  <path d="M2 6l8 5 8-5" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-offwhite/40">{t('contact.email')}</div>
                <div className="text-offwhite group-hover:text-orange transition-colors truncate text-sm">{EMAIL}</div>
              </div>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl border border-offwhite/10 bg-black-deep/30 hover:border-orange transition-colors group"
            >
              <div className="w-11 h-11 rounded-full bg-orange/15 text-orange flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413A11.815 11.815 0 0012.05 0z" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-offwhite/40">{t('contact.wa')}</div>
                <div className="text-offwhite group-hover:text-orange transition-colors text-sm">{t('contact.waSub')}</div>
              </div>
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl border border-offwhite/10 bg-black-deep/30 hover:border-orange transition-colors group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-orange">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
                <span className="text-offwhite text-sm group-hover:text-orange transition-colors">LinkedIn</span>
              </a>
              <a
                href={COMEUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl border border-offwhite/10 bg-black-deep/30 hover:border-orange transition-colors group"
              >
                <span className="text-orange font-bold">C</span>
                <span className="text-offwhite text-sm group-hover:text-orange transition-colors">ComeUp</span>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="relative z-10 p-8 rounded-3xl border border-offwhite/10 bg-black-deep/50 backdrop-blur space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-offwhite/55 text-[10px] tracking-widest uppercase mb-2">
              {t('contact.form.name')}
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-transparent border-b-2 border-offwhite/20 text-offwhite text-lg py-3 px-0 focus:border-orange focus:outline-none transition-colors placeholder:text-offwhite/20"
              placeholder={t('contact.form.namePh')}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-offwhite/55 text-[10px] tracking-widest uppercase mb-2">
              {t('contact.form.email')}
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-b-2 border-offwhite/20 text-offwhite text-lg py-3 px-0 focus:border-orange focus:outline-none transition-colors placeholder:text-offwhite/20"
              placeholder={t('contact.form.emailPh')}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-offwhite/55 text-[10px] tracking-widest uppercase mb-2">
              {t('contact.form.msg')}
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-transparent border-b-2 border-offwhite/20 text-offwhite text-lg py-3 px-0 focus:border-orange focus:outline-none transition-colors resize-none placeholder:text-offwhite/20"
              placeholder={t('contact.form.msgPh')}
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-orange text-black-deep py-4 rounded-full font-bold text-base tracking-wide hover:bg-orange-dark transition-colors"
          >
            {t('contact.form.send')}
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}
