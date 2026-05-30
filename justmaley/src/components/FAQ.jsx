import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Combien coûte un logiciel de gestion ?',
    a: "Le prix dépend de vos besoins réels : nombre de fonctionnalités, complexité, nombre d'utilisateurs. C'est pourquoi nous travaillons sur devis gratuit, après un échange pour bien comprendre votre activité. Aucun forfait imposé, vous payez pour ce qui vous sert vraiment.",
  },
  {
    q: 'Le site web est-il vraiment offert ?',
    a: "Oui. Tout projet de logiciel de gestion inclut un site web professionnel (vitrine ou e-commerce) sans frais supplémentaires, avec l'hébergement et le nom de domaine offerts la première année.",
  },
  {
    q: 'Comment fonctionne la garantie satisfait ou remboursé ?',
    a: "Si dans les 14 jours suivant la livraison vous n'êtes pas satisfait du résultat, nous vous remboursons intégralement votre investissement. C'est notre engagement pour que vous puissiez travailler avec nous en toute confiance, sans risque.",
  },
  {
    q: 'L\'IA, ce n\'est pas trop compliqué ou trop cher pour mon entreprise ?',
    a: "Pas du tout. Vous n'avez rien de technique à gérer : nous intégrons l'IA directement dans vos outils et vous l'utilisez sans même y penser. Nous commençons souvent par automatiser une ou deux tâches précises qui vous font perdre du temps, puis nous étendons selon vos résultats. C'est accessible, même pour une petite entreprise.",
  },
  {
    q: 'Combien de temps prend un projet ?',
    a: "Cela varie selon l'ampleur, mais la plupart des projets sont livrés entre 3 et 8 semaines. Le calendrier précis est défini et validé avec vous dès l'étape de conception, avant tout développement.",
  },
  {
    q: 'Le logiciel m\'appartient-il ?',
    a: "Oui. Une fois le projet livré et réglé, le logiciel et son code vous appartiennent. Vous n'êtes prisonnier d'aucun abonnement obligatoire pour l'utiliser.",
  },
  {
    q: 'Et si j\'ai besoin d\'aide après la livraison ?',
    a: "Vous n'êtes jamais seul. Chaque projet inclut la formation de vos équipes et un support continu. Pour les évolutions futures, nous restons disponibles pour faire grandir votre outil avec votre entreprise.",
  },
]

function Item({ faq, isOpen, onToggle }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(227,231,211,0.08)', backgroundColor: '#0E0E0E' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
        aria-expanded={isOpen}
      >
        <span className="text-offwhite font-semibold text-base md:text-lg tracking-tight">{faq.q}</span>
        <span
          className="shrink-0 flex items-center justify-center rounded-full transition-colors"
          style={{
            width: '30px', height: '30px',
            backgroundColor: isOpen ? '#FC7A1E' : 'rgba(252,122,30,0.12)',
            color: isOpen ? '#0A0A0A' : '#FC7A1E',
          }}
        >
          <motion.svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </motion.svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="px-6 pb-6 text-offwhite/55 text-sm md:text-base leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-24 md:py-36 px-6 md:px-12 bg-black-deep">
      <div
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: '3.5rem',
          alignItems: 'start',
        }}
      >
        <div className="md:sticky" style={{ top: '120px' }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-orange text-sm tracking-[0.3em] uppercase mb-4 block"
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-offwhite tracking-tight"
          >
            Vos questions,<br /><span className="text-orange">nos réponses.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-offwhite/55 text-base mt-6 leading-relaxed"
          >
            Une autre question ?{' '}
            <a href="#contact" className="text-orange hover:underline">Écrivez-nous</a>, nous répondons vite.
          </motion.p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Item
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
