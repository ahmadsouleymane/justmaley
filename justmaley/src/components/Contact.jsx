import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocale } from '../i18n.jsx'

const EMAIL = 'souleymane@justmaley.tech'
const WHATSAPP_URL = 'https://api.whatsapp.com/message/EDN2SVYWK5WYF1?autoload=1&app_absent=0'
const LINKEDIN_URL = 'https://linkedin.com/in/ahmadsouleymane'

// Web3Forms access key. Destination email gérée depuis le dashboard Web3Forms.
const WEB3FORMS_KEY = '4dcec490-b2a4-4998-8b20-a5f25fb0e0ee'

const BUDGETS_FR = ['< 500 €', '500 à 1 500 €', '1 500 à 5 000 €', '> 5 000 €', 'Je ne sais pas encore']
const BUDGETS_EN = ['< $500', '$500 to $1,500', '$1,500 to $5,000', '> $5,000', 'Not sure yet']

const PROJECT_FR = ['App web de zéro', 'App avec IA', 'Reprise de projet', 'Autre']
const PROJECT_EN = ['Web app from zero', 'App with AI', 'Project rescue', 'Other']

export default function Contact() {
  const { t, lang } = useLocale()
  const [form, setForm] = useState({ name: '', email: '', project: '', budget: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errMsg, setErrMsg] = useState('')

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    // honeypot anti-spam — checkbox cachée, cochée = bot
    if (e.target.botcheck && e.target.botcheck.checked) return

    if (!WEB3FORMS_KEY) {
      setStatus('error')
      setErrMsg(t('contact.form.errKey'))
      return
    }

    setStatus('sending')
    setErrMsg('')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nouveau projet de ${form.name}${form.project ? ` (${form.project})` : ''}`,
          from_name: 'Just Maley · formulaire de contact',
          replyto: form.email,
          name: form.name,
          email: form.email,
          project: form.project,
          budget: form.budget,
          message: form.message,
          botcheck: '',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success !== false) {
        setStatus('sent')
        setForm({ name: '', email: '', project: '', budget: '', message: '' })
      } else {
        setStatus('error')
        setErrMsg(data.message || t('contact.form.errGeneric'))
      }
    } catch {
      setStatus('error')
      setErrMsg(t('contact.form.errNetwork'))
    }
  }

  const budgets = lang === 'fr' ? BUDGETS_FR : BUDGETS_EN
  const projects = lang === 'fr' ? PROJECT_FR : PROJECT_EN

  return (
    <section id="contact" className="relative py-28 md:py-40 px-6 md:px-10 bg-green-dark overflow-hidden">
      <div
        className="absolute pointer-events-none"
        style={{
          width: '1100px', height: '1100px',
          bottom: '-400px', right: '-300px',
          background: 'radial-gradient(circle, rgba(252,122,30,0.18) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto" style={{ maxWidth: '1100px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Colonne gauche : pitch + canaux directs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2.5 text-orange text-sm mb-5">
              <span className="font-mono">04</span>
              <span className="w-8 h-px bg-orange/50" />
              <span className="lowercase tracking-wide">{t('contact.eyebrow')}</span>
            </div>
            <h2 className="text-offwhite tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)', lineHeight: 1.02, fontWeight: 700 }}>
              {t('contact.h1')}
              <span className="block text-orange mt-1.5">{t('contact.h2')}</span>
            </h2>
            <p className="mt-6 text-offwhite/65 text-base md:text-lg leading-relaxed" style={{ maxWidth: '480px' }}>
              {t('contact.sub')}
            </p>

            <div className="mt-10 space-y-3">
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-offwhite/10 bg-black-deep/30 hover:border-orange transition-colors"
              >
                <div className="w-11 h-11 rounded-full bg-orange/15 text-orange flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="2" y="4" width="16" height="12" rx="2" />
                    <path d="M2 6l8 5 8-5" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase tracking-widest text-offwhite/40">Email</div>
                  <div className="text-offwhite group-hover:text-orange transition-colors truncate text-sm font-medium">{EMAIL}</div>
                </div>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-offwhite/10 bg-black-deep/30 hover:border-orange transition-colors"
              >
                <div className="w-11 h-11 rounded-full bg-orange/15 text-orange flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413A11.815 11.815 0 0012.05 0z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase tracking-widest text-offwhite/40">WhatsApp</div>
                  <div className="text-offwhite group-hover:text-orange transition-colors text-sm font-medium">{t('contact.waSub')}</div>
                </div>
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-offwhite/10 bg-black-deep/30 hover:border-orange transition-colors"
              >
                <div className="w-11 h-11 rounded-full bg-orange/15 text-orange flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase tracking-widest text-offwhite/40">LinkedIn</div>
                  <div className="text-offwhite group-hover:text-orange transition-colors text-sm font-medium">{t('contact.liSub')}</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Colonne droite : formulaire */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={onSubmit}
            className="relative p-7 md:p-9 rounded-3xl border border-offwhite/10 bg-black-deep/50 backdrop-blur space-y-6"
          >
            {status === 'sent' ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-orange/15 text-orange flex items-center justify-center mx-auto mb-5">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-offwhite text-2xl font-bold mb-2 tracking-tight">{t('contact.form.sentTitle')}</h3>
                <p className="text-offwhite/65 text-sm leading-relaxed mx-auto" style={{ maxWidth: '320px' }}>
                  {t('contact.form.sentSub')}
                </p>
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="c-name" className="block text-offwhite/55 text-[10px] tracking-widest uppercase mb-2">
                    {t('contact.form.name')}
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={set('name')}
                    placeholder={t('contact.form.namePh')}
                    className="w-full bg-transparent border-b border-offwhite/15 text-offwhite text-base py-2.5 px-0 focus:border-orange focus:outline-none transition-colors placeholder:text-offwhite/25"
                  />
                </div>

                <div>
                  <label htmlFor="c-email" className="block text-offwhite/55 text-[10px] tracking-widest uppercase mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={set('email')}
                    placeholder={t('contact.form.emailPh')}
                    className="w-full bg-transparent border-b border-offwhite/15 text-offwhite text-base py-2.5 px-0 focus:border-orange focus:outline-none transition-colors placeholder:text-offwhite/25"
                  />
                </div>

                <div>
                  <label className="block text-offwhite/55 text-[10px] tracking-widest uppercase mb-3">
                    {t('contact.form.project')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projects.map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setForm({ ...form, project: p })}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                          form.project === p
                            ? 'bg-orange text-black-deep border-orange'
                            : 'bg-offwhite/[0.03] text-offwhite/75 border-offwhite/15 hover:border-orange/60'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="c-budget" className="block text-offwhite/55 text-[10px] tracking-widest uppercase mb-2">
                    {t('contact.form.budget')}
                  </label>
                  <select
                    id="c-budget"
                    required
                    value={form.budget}
                    onChange={set('budget')}
                    className="w-full bg-transparent border-b border-offwhite/15 text-offwhite text-base py-2.5 px-0 focus:border-orange focus:outline-none transition-colors"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" disabled className="bg-black-deep">{t('contact.form.budgetPh')}</option>
                    {budgets.map((b) => (
                      <option key={b} value={b} className="bg-black-deep">{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="c-msg" className="block text-offwhite/55 text-[10px] tracking-widest uppercase mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="c-msg"
                    required
                    rows={4}
                    value={form.message}
                    onChange={set('message')}
                    placeholder={t('contact.form.messagePh')}
                    className="w-full bg-transparent border-b border-offwhite/15 text-offwhite text-base py-2.5 px-0 focus:border-orange focus:outline-none transition-colors resize-none placeholder:text-offwhite/25"
                  />
                </div>

                {/* honeypot anti-spam, caché */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                  aria-hidden="true"
                />

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-orange text-black-deep py-4 rounded-full font-bold tracking-wide hover:bg-orange-dark transition-colors text-sm md:text-base disabled:opacity-60"
                  style={{ boxShadow: '0 16px 36px -10px rgba(252,122,30,0.55)' }}
                >
                  {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
                </button>

                {status === 'error' && (
                  <p className="text-orange text-sm text-center">{errMsg}</p>
                )}

                <p className="text-offwhite/40 text-xs text-center">
                  {t('contact.form.reassurance')}
                </p>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
