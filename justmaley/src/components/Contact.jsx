import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = `Nouveau message de ${formData.name} (${formData.email}): ${formData.message}`
    window.open(`https://wa.me/2250160726314?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <section id="contact" className="py-24 md:py-36 px-6 md:px-12 bg-black-deep">
      <div
        className="mx-auto"
        style={{
          maxWidth: '1280px',
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
            className="text-orange text-sm tracking-[0.3em] uppercase mb-4 block"
          >
            Contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-offwhite tracking-tight mb-8"
          >
            Parlons de votre <span className="text-orange">projet.</span>
          </motion.h2>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="https://wa.me/2250160726314"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-3xl md:text-5xl font-bold text-orange hover:text-offwhite transition-colors duration-300 mb-8"
            data-hover
          >
            +225 01 60 72 63 14
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-3 text-offwhite/50"
          >
            <p className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange shrink-0">
                <path d="M10 2C6.13 2 3 5.13 3 9c0 5.25 7 9 7 9s7-3.75 7-9c0-3.87-3.13-7-7-7z" />
                <circle cx="10" cy="9" r="2.5" />
              </svg>
              Yamoussoukro, Côte d&apos;Ivoire
            </p>
            <p className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange shrink-0">
                <rect x="2" y="4" width="16" height="12" rx="2" />
                <path d="M2 6l8 5 8-5" />
              </svg>
              justmaleyagency@gmail.com
            </p>
          </motion.div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-offwhite/40 text-sm tracking-wider uppercase mb-2">
              Nom
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-transparent border-b-2 border-offwhite/20 text-offwhite text-lg py-3 px-0 focus:border-orange focus:outline-none transition-colors placeholder:text-offwhite/20"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-offwhite/40 text-sm tracking-wider uppercase mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-b-2 border-offwhite/20 text-offwhite text-lg py-3 px-0 focus:border-orange focus:outline-none transition-colors placeholder:text-offwhite/20"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-offwhite/40 text-sm tracking-wider uppercase mb-2">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-transparent border-b-2 border-offwhite/20 text-offwhite text-lg py-3 px-0 focus:border-orange focus:outline-none transition-colors resize-none placeholder:text-offwhite/20"
              placeholder="Décrivez votre projet..."
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-orange text-black-deep py-4 rounded-full font-bold text-lg tracking-wider hover:bg-orange-dark transition-colors"
          >
            Envoyer via WhatsApp
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}
