import { motion } from 'framer-motion'
import { useLocale } from '../i18n.jsx'

const GROUPS = [
  { key: 'front', items: [{ name: 'React', icon: 'react' }] },
  { key: 'back', items: [{ name: 'Node.js', icon: 'node' }, { name: 'Express', icon: 'express' }] },
  { key: 'db', items: [{ name: 'MongoDB', icon: 'mongo' }, { name: 'PostgreSQL', icon: 'postgres' }, { name: 'Supabase', icon: 'supabase' }] },
  { key: 'ai', items: [{ name: 'LangChain', icon: 'langchain' }, { name: 'Groq', icon: 'groq' }] },
  { key: 'mobile', items: [{ name: 'React Native (Expo)', icon: 'expo' }] },
]

const Icon = ({ name }) => {
  const c = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'react': return <svg {...c}><circle cx="12" cy="12" r="2" /><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /></svg>
    case 'node': return <svg {...c}><path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" /><path d="M9 14c0 1 .8 2 3 2s3-1 3-2-1-1.5-3-2-3-1-3-2 .8-2 3-2 3 1 3 2" /></svg>
    case 'express': return <svg {...c}><path d="M3 12h18" /><path d="M5 7l14 10M19 7L5 17" /></svg>
    case 'mongo': return <svg {...c}><path d="M12 2c2 4 5 7 5 11s-2 7-5 9c-3-2-5-5-5-9s3-7 5-11z" /><line x1="12" y1="2" x2="12" y2="22" /></svg>
    case 'postgres': return <svg {...c}><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></svg>
    case 'supabase': return <svg {...c}><path d="M13 2L4 14h7l-2 8 10-12h-7l1-8z" /></svg>
    case 'langchain': return <svg {...c}><circle cx="6" cy="12" r="3" /><circle cx="18" cy="12" r="3" /><path d="M9 12h6" /></svg>
    case 'groq': return <svg {...c}><circle cx="12" cy="12" r="9" /><path d="M8 12a4 4 0 014-4M12 16a4 4 0 004-4" /></svg>
    case 'expo': return <svg {...c}><path d="M12 3l9 16H3l9-16z" /></svg>
    default: return null
  }
}

export default function Stack() {
  const { t } = useLocale()
  return (
    <section id="stack" className="relative py-24 md:py-32 px-6 md:px-12 bg-black-deep overflow-hidden">
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-orange text-[11px] tracking-[0.4em] uppercase font-semibold mb-5 block"
          >
            {t('stack.tag')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-offwhite tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', lineHeight: 1.02, fontWeight: 700 }}
          >
            {t('stack.title1')} <span className="text-orange">{t('stack.title2')}</span>
          </motion.h2>
        </div>

        <div className="space-y-3">
          {GROUPS.map((g, i) => (
            <motion.div
              key={g.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-5 md:p-6 rounded-2xl border border-offwhite/10 bg-offwhite/[0.02] hover:border-orange/30 transition-colors"
            >
              <div className="md:w-44 shrink-0">
                <div className="text-[10px] uppercase tracking-widest text-offwhite/40 mb-1">{t('stack.cat')}</div>
                <div className="text-base font-bold text-offwhite">{t(`stack.${g.key}`)}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <div
                    key={it.name}
                    className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-black-deep border border-offwhite/10 text-offwhite/85 hover:border-orange hover:text-orange transition-colors"
                  >
                    <span className="text-orange"><Icon name={it.icon} /></span>
                    <span className="text-sm font-medium">{it.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
