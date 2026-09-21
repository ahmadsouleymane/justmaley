// Les trois piliers de JustMaley : BRAND → GROW → BUILD.
//
// Ce ne sont pas trois services, ce sont trois états du client :
//   BRAND  « j'existe, mais je ne ressemble à rien »   → identité
//   GROW   « je ressemble à quelque chose, personne ne me voit » → visibilité
//   BUILD  « on me voit, il me manque l'outil »        → système
//
// L'ordre est une échelle, et la DA la suit : papier clair → pierre → noir.
// Le portail (Portal.jsx) et les pages d'offre (Offer.jsx) partagent ces
// couleurs, donc l'identité reste continue du premier écran à la page de vente.
//
// PRIX — `price` en FCFA, ou `null` pour afficher « Sur devis ».
//   GROW   : arrêté (75 000 / 150 000 / 250 000 par mois).
//   BRAND  : prix à définir → null partout.
//   BUILD  : facturé au projet, catalogue sur devis → null partout.
// Pour publier un prix, remplace `price: null` par un nombre : "75 000 FCFA"
// se formate tout seul.

export const PILLARS = ['brand', 'grow', 'build']

export const OFFERS = {
  // ---------------------------------------------------------------------
  // 01 — BRAND : l'identité. Fond papier, encre noire.
  // ---------------------------------------------------------------------
  brand: {
    slug: 'brand',
    n: '01',
    name: 'Brand',
    theme: 'light',
    bg: '#f6f5f0',
    fg: '#0A0A0A',
    muted: 'rgba(10,10,10,0.62)',
    hair: 'rgba(10,10,10,0.12)',
    logo: '/logo-bk.svg',
    priceNote: 'projet',
    fr: {
      tag: 'identité',
      hook: 'Ton activité existe. Elle ne ressemble encore à rien.',
      sub: "Logo, charte, supports. On pose une image que tes clients reconnaissent en une seconde — et qui tient aussi bien sur un panneau que sur une story.",
      deliverablesTitle: 'Ce que tu obtiens',
      deliverables: [
        ['Logo', "Trois pistes travaillées, les déclinaisons, les fichiers sources. Utilisable partout, du favicon au panneau 4×3."],
        ['Charte graphique', "Couleurs, typographies, règles d'usage, mises en situation. Pour que tout ce qui sort de ta boîte se ressemble."],
        ['Supports', "Cartes, flyers, affiches, habillage réseaux. Les outils du quotidien, prêts à imprimer ou à publier."],
        ['Direction artistique', "Un cap visuel tenu dans le temps. Tu sais quoi publier, et surtout quoi ne pas publier."],
      ],
      tiersTitle: 'Les niveaux',
      tiers: [
        {
          name: 'Essentiel',
          price: null,
          unit: 'projet',
          desc: "Pour poser une base propre sans se ruiner.",
          feats: [
            'Logo + 3 déclinaisons',
            'Palette et typographies',
            'Mini-guide d’utilisation (PDF)',
            'Fichiers sources livrés',
            '2 allers-retours',
          ],
        },
        {
          name: 'Business',
          price: null,
          unit: 'projet',
          desc: "L’identité complète, prête à être utilisée partout.",
          featured: true,
          feats: [
            'Tout l’Essentiel',
            'Charte graphique complète',
            'Carte de visite + flyer',
            'Kit réseaux sociaux (avatars, couvertures, gabarits)',
            'Déclinaisons print et web',
            '4 allers-retours',
          ],
        },
        {
          name: 'Signature',
          price: null,
          unit: 'projet',
          desc: "Quand l’image doit porter l’ambition, pas juste exister.",
          feats: [
            'Tout le Business',
            'Audit de l’image actuelle',
            'Refonte complète de l’identité',
            'Habillage enseigne et véhicule',
            'Accompagnement 3 mois',
            'Allers-retours illimités',
          ],
        },
      ],
      processTitle: 'Comment ça se passe',
      process: [
        ['Brief', '30 minutes au téléphone. Ton métier, tes clients, tes concurrents, ce qui te dérange dans ton image actuelle.'],
        ['Pistes', 'Je te présente trois directions. On en choisit une, ou on en mélange deux.'],
        ['Construction', 'On affine la piste retenue : formes, couleurs, typographies, jusqu’au bout.'],
        ['Livraison', 'Tous les fichiers, dans tous les formats. Et je reste joignable si un imprimeur te pose une question.'],
      ],
      limitsTitle: 'Ce que je ne fais pas',
      limits: [
        "Je ne vends pas de logo à 10 000 FCFA fait en 20 minutes. Ça se voit, et ça te dessert.",
        "Je ne travaille pas sans brief. Un logo sans contexte, c'est un dessin.",
        "Je ne promets pas de « faire décoller » ton chiffre d'affaires avec un logo. BRAND pose ton image ; GROW s'occupe de la visibilité.",
      ],
      cta: 'Parler de mon identité',
    },
    en: {
      tag: 'identity',
      hook: 'Your business exists. It doesn’t look like anything yet.',
      sub: 'Logo, brand guidelines, collateral. We set a look your customers recognise in one second — one that works on a billboard as well as on a story.',
      deliverablesTitle: 'What you get',
      deliverables: [
        ['Logo', 'Three worked directions, all variations, source files. Usable everywhere, from favicon to billboard.'],
        ['Brand guidelines', 'Colours, typefaces, usage rules, mockups. So everything leaving your business looks related.'],
        ['Collateral', 'Cards, flyers, posters, social kits. Everyday tools, ready to print or publish.'],
        ['Art direction', 'A visual direction that holds over time. You know what to publish — and what not to.'],
      ],
      tiersTitle: 'The tiers',
      tiers: [
        {
          name: 'Essential',
          price: null,
          unit: 'project',
          desc: 'A clean base without breaking the bank.',
          feats: [
            'Logo + 3 variations',
            'Palette and typefaces',
            'Mini usage guide (PDF)',
            'Source files included',
            '2 rounds of revisions',
          ],
        },
        {
          name: 'Business',
          price: null,
          unit: 'project',
          desc: 'The full identity, ready to be used everywhere.',
          featured: true,
          feats: [
            'Everything in Essential',
            'Complete brand guidelines',
            'Business card + flyer',
            'Social kit (avatars, covers, templates)',
            'Print and web variations',
            '4 rounds of revisions',
          ],
        },
        {
          name: 'Signature',
          price: null,
          unit: 'project',
          desc: 'When the image has to carry ambition, not just exist.',
          feats: [
            'Everything in Business',
            'Audit of your current image',
            'Full identity overhaul',
            'Signage and vehicle livery',
            '3 months of support',
            'Unlimited revisions',
          ],
        },
      ],
      processTitle: 'How it goes',
      process: [
        ['Brief', '30 minutes on the phone. Your trade, your customers, your competitors, what bugs you about your current image.'],
        ['Directions', 'I present three directions. We pick one, or blend two.'],
        ['Build', 'We refine the chosen direction: shapes, colours, typefaces, all the way.'],
        ['Delivery', 'Every file, in every format. And I stay reachable if your printer has a question.'],
      ],
      limitsTitle: 'What I don’t do',
      limits: [
        'I don’t sell 20-minute logos. It shows, and it works against you.',
        'I don’t work without a brief. A logo without context is just a drawing.',
        'I don’t promise a logo will grow your revenue. BRAND sets your image; GROW handles visibility.',
      ],
      cta: 'Talk about my identity',
    },
  },

  // ---------------------------------------------------------------------
  // 02 — GROW : la visibilité. Fond pierre, encre noire. Abonnement.
  // ---------------------------------------------------------------------
  grow: {
    slug: 'grow',
    n: '02',
    name: 'Grow',
    theme: 'mid',
    bg: '#c9c9c4',
    fg: '#0A0A0A',
    muted: 'rgba(10,10,10,0.62)',
    hair: 'rgba(10,10,10,0.16)',
    logo: '/logo-bk.svg',
    priceNote: 'mois',
    fr: {
      tag: 'visibilité',
      hook: 'Tu ressembles à quelque chose. Personne ne le voit encore.',
      sub: "Contenu, vidéo, réseaux. On produit régulièrement, on soigne la direction artistique, et on te rend visible là où tes clients passent vraiment leur temps.",
      deliverablesTitle: 'Ce que tu obtiens',
      deliverables: [
        ['Contenu régulier', "Un calendrier tenu. Des publications qui sortent chaque semaine, sans que tu aies à y penser."],
        ['Vidéo', "Reels, formats courts, vidéos de marque. Tournage, montage, sous-titres, rythme."],
        ['Motion design', "Titres animés, habillages, transitions. Ce qui donne à tes vidéos l'air d'être produites, pas bricolées."],
        ['Community management', "Réponses, modération, veille. Ta page reste vivante même quand tu es au boulot."],
      ],
      tiersTitle: 'Les niveaux',
      note: 'Abonnement mensuel. Sans engagement de durée, résiliable au mois.',
      tiers: [
        {
          name: 'Essentiel',
          price: 75000,
          unit: '/mois',
          desc: "Pour exister régulièrement sur les réseaux.",
          feats: [
            '8 publications par mois',
            'Direction artistique des visuels',
            'Rédaction des légendes',
            'Programmation des publications',
            '1 rapport mensuel',
          ],
        },
        {
          name: 'Business',
          price: 150000,
          unit: '/mois',
          desc: "Le format le plus choisi. Contenu + vidéo.",
          featured: true,
          badge: 'Le plus choisi',
          feats: [
            'Tout l’Essentiel',
            '16 publications par mois',
            '4 vidéos courtes (reels) montées',
            'Motion design des habillages',
            'Community management (réponses, modération)',
            'Point mensuel de performance',
          ],
        },
        {
          name: 'Pro',
          price: 250000,
          unit: '/mois',
          desc: "Quand la communication devient un poste à part entière.",
          feats: [
            'Tout le Business',
            'Publications illimitées',
            '8 vidéos courtes + 1 vidéo de marque / trimestre',
            'Stratégie éditoriale et ligne graphique tenues',
            'Community management complet',
            'Tournage sur place à Niamey',
            'Rapport mensuel détaillé',
          ],
        },
      ],
      processTitle: 'Comment ça se passe',
      process: [
        ['Cadrage', 'On définit tes objectifs, ton audience et ce que tu veux qu’on retienne de toi.'],
        ['Ligne éditoriale', 'Les thèmes, le ton, le rythme. Ce qu’on publie et à quelle fréquence.'],
        ['Production', 'On produit le mois. Tu valides, on programme, ça sort.'],
        ['Mesure', 'Chaque mois, ce qui a marché et ce qu’on change.'],
      ],
      limitsTitle: 'Ce que je ne fais pas',
      limits: [
        "Je ne vends pas d'abonnés. Aucun achat de followers, aucune ferme à clics.",
        "Je ne promets pas de viralité. Je garantis la régularité et la qualité, pas l'algorithme.",
        "Je ne publie rien sans ta validation. Tu gardes la main sur ce qui sort sous ton nom.",
      ],
      cta: 'Booster ma visibilité',
    },
    en: {
      tag: 'visibility',
      hook: 'You look like something. Nobody sees it yet.',
      sub: 'Content, video, social. We produce on a schedule, hold the art direction, and make you visible where your customers actually spend their time.',
      deliverablesTitle: 'What you get',
      deliverables: [
        ['Consistent content', 'A calendar that holds. Posts going out every week without you thinking about it.'],
        ['Video', 'Reels, short form, brand films. Shooting, editing, captions, pace.'],
        ['Motion design', 'Animated titles, overlays, transitions. What makes your videos look produced, not improvised.'],
        ['Community management', 'Replies, moderation, monitoring. Your page stays alive while you’re at work.'],
      ],
      tiersTitle: 'The tiers',
      note: 'Monthly subscription. No lock-in, cancellable monthly.',
      tiers: [
        {
          name: 'Essential',
          price: 75000,
          unit: '/month',
          desc: 'To show up consistently on social.',
          feats: [
            '8 posts per month',
            'Art direction for visuals',
            'Caption writing',
            'Post scheduling',
            '1 monthly report',
          ],
        },
        {
          name: 'Business',
          price: 150000,
          unit: '/month',
          desc: 'The most picked plan. Content + video.',
          featured: true,
          badge: 'Most picked',
          feats: [
            'Everything in Essential',
            '16 posts per month',
            '4 edited short videos (reels)',
            'Motion design for overlays',
            'Community management (replies, moderation)',
            'Monthly performance review',
          ],
        },
        {
          name: 'Pro',
          price: 250000,
          unit: '/month',
          desc: 'When communication becomes a function of its own.',
          feats: [
            'Everything in Business',
            'Unlimited posts',
            '8 short videos + 1 brand film per quarter',
            'Editorial strategy and art direction held',
            'Full community management',
            'On-site shooting in Niamey',
            'Detailed monthly report',
          ],
        },
      ],
      processTitle: 'How it goes',
      process: [
        ['Framing', 'We define your goals, your audience, and what you want to be remembered for.'],
        ['Editorial line', 'Themes, tone, pace. What we publish and how often.'],
        ['Production', 'We produce the month. You approve, we schedule, it ships.'],
        ['Measure', 'Every month: what worked, and what we change.'],
      ],
      limitsTitle: 'What I don’t do',
      limits: [
        'I don’t sell followers. No purchased audiences, no click farms.',
        'I don’t promise virality. I guarantee consistency and quality, not the algorithm.',
        'I don’t publish anything without your approval. You stay in control of what goes out under your name.',
      ],
      cta: 'Boost my visibility',
    },
  },

  // ---------------------------------------------------------------------
  // 03 — BUILD : le système. Fond noir, encre offwhite. Facturé au projet.
  // ---------------------------------------------------------------------
  build: {
    slug: 'build',
    n: '03',
    name: 'Build',
    theme: 'dark',
    bg: '#0A0A0A',
    fg: '#E3E7D3',
    muted: 'rgba(227,231,211,0.62)',
    hair: 'rgba(227,231,211,0.14)',
    logo: '/logo-wt.svg',
    priceNote: 'projet',
    fr: {
      tag: 'système',
      hook: 'On te voit. Il te manque l’outil.',
      sub: "Site, boutique, application, automatisation. On construit ce qui prend le relais quand tu dors — et qui t'appartient, code source compris.",
      deliverablesTitle: 'Ce que tu obtiens',
      deliverables: [
        ['Un produit en ligne', "Pas une maquette, pas une démo. Un truc en production que tes clients peuvent ouvrir le jour de la livraison."],
        ['Le code source', "Il est à toi. Tu peux changer de prestataire demain sans repartir de zéro."],
        ['Le domaine et l’hébergement', "Branchés, payés la première année, configurés. Tu n'as rien à installer."],
        ['La prise en main', "Une session pour que toi ou ton équipe sachiez gérer le contenu au quotidien."],
      ],
      tiersTitle: 'Le catalogue',
      note: 'Chaque projet est différent. Le devis se fait après un appel de cadrage — gratuit, et sans engagement.',
      tiersUnitLabel: 'projet',
      tiers: [
        {
          name: 'Site vitrine',
          price: null,
          unit: 'projet',
          desc: "Ton activité présentée proprement, trouvable sur Google, avec un vrai moyen de te contacter.",
          feats: ['5 à 8 pages', 'Design sur mesure', 'Formulaire de contact', 'Référencement de base', 'Mise en ligne incluse'],
        },
        {
          name: 'Site business',
          price: null,
          unit: 'projet',
          desc: "Un site qui travaille : réservation, demande de devis, espace client, back-office.",
          featured: true,
          badge: 'Le plus demandé',
          feats: ['Tout le vitrine', 'Prise de rendez-vous ou de commande', 'Espace client', 'Tableau de bord admin', 'Notifications WhatsApp ou e-mail'],
        },
        {
          name: 'Boutique en ligne',
          price: null,
          unit: 'projet',
          desc: "Vendre en ligne et encaisser, avec un catalogue que tu gères toi-même.",
          feats: ['Tout le business', 'Catalogue produits', 'Panier et paiement', 'Gestion des commandes', 'Livraison et zones'],
        },
        {
          name: 'Application',
          price: null,
          unit: 'projet',
          desc: "Un vrai outil métier, web ou mobile, taillé pour ta façon de travailler.",
          feats: ['Application web ou mobile', 'Comptes et rôles utilisateurs', 'Base de données', 'Hors ligne si besoin', 'Maintenance disponible'],
        },
        {
          name: 'Automatisation & IA',
          price: null,
          unit: 'projet',
          desc: "Ce que tu fais à la main tous les jours, confié à une machine — sans changer tes habitudes.",
          feats: ['Assistant qui connaît ton métier', 'Lecture de documents et PDF', 'Rappels et relances automatiques', 'Suivi de tes prospects', 'Formation de ton équipe'],
        },
      ],
      processTitle: 'Comment ça se passe',
      process: [
        ['Appel de cadrage', '30 minutes. Ce que tu veux, pour qui, pour quand, et avec quel budget. Gratuit.'],
        ['Devis', 'Un montant ferme, un délai ferme, et la liste précise de ce qui est inclus. Pas de « ça dépend ».'],
        ['Construction', 'Tu vois le projet avancer chaque semaine. Un aperçu en ligne dès la première moitié.'],
        ['Livraison', 'Mise en ligne, domaine branché, code remis. Et tu sais t’en servir.'],
      ],
      limitsTitle: 'Ce que je ne fais pas',
      limits: [
        'Je ne vends pas de template recyclé. Chaque projet est construit pour le métier du client.',
        "Je ne livre pas sans que tu aies testé. C'est toi qui valides, pas moi.",
        "Je ne prends pas un projet que je ne sais pas terminer. Si ce n'est pas mon métier, je le dis.",
      ],
      cta: 'Demander un devis',
    },
    en: {
      tag: 'system',
      hook: 'People see you. You’re missing the tool.',
      sub: 'Website, store, application, automation. We build what keeps working while you sleep — and it belongs to you, source code included.',
      deliverablesTitle: 'What you get',
      deliverables: [
        ['A live product', 'Not a mockup, not a demo. Something in production your customers can open on delivery day.'],
        ['The source code', 'It’s yours. You can change provider tomorrow without starting over.'],
        ['Domain and hosting', 'Connected, paid for the first year, configured. Nothing for you to install.'],
        ['Handover', 'A session so you or your team know how to manage the content day to day.'],
      ],
      tiersTitle: 'The catalogue',
      note: 'Every project is different. The quote comes after a scoping call — free, no commitment.',
      tiersUnitLabel: 'project',
      tiers: [
        {
          name: 'Showcase site',
          price: null,
          unit: 'project',
          desc: 'Your business presented properly, findable on Google, with a real way to reach you.',
          feats: ['5 to 8 pages', 'Custom design', 'Contact form', 'Basic SEO', 'Deployment included'],
        },
        {
          name: 'Business site',
          price: null,
          unit: 'project',
          desc: 'A site that works: bookings, quote requests, customer area, back office.',
          featured: true,
          badge: 'Most requested',
          feats: ['Everything in showcase', 'Booking or ordering', 'Customer area', 'Admin dashboard', 'WhatsApp or email notifications'],
        },
        {
          name: 'Online store',
          price: null,
          unit: 'project',
          desc: 'Sell online and get paid, with a catalogue you manage yourself.',
          feats: ['Everything in business', 'Product catalogue', 'Cart and payment', 'Order management', 'Delivery and zones'],
        },
        {
          name: 'Application',
          price: null,
          unit: 'project',
          desc: 'A real business tool, web or mobile, shaped around how you actually work.',
          feats: ['Web or mobile app', 'Accounts and user roles', 'Database', 'Offline if needed', 'Maintenance available'],
        },
        {
          name: 'Automation & AI',
          price: null,
          unit: 'project',
          desc: 'What you do by hand every day, handed to a machine — without changing your habits.',
          feats: ['Assistant that knows your trade', 'Document and PDF reading', 'Automatic reminders and follow-ups', 'Prospect tracking', 'Team training'],
        },
      ],
      processTitle: 'How it goes',
      process: [
        ['Scoping call', '30 minutes. What you want, for whom, by when, and with what budget. Free.'],
        ['Quote', 'A fixed amount, a fixed deadline, and the exact list of what’s included. No “it depends”.'],
        ['Build', 'You see the project move every week. A live preview by the halfway mark.'],
        ['Delivery', 'Deployed, domain connected, code handed over. And you know how to use it.'],
      ],
      limitsTitle: 'What I don’t do',
      limits: [
        'I don’t sell recycled templates. Every project is built for the client’s trade.',
        'I don’t ship without you testing it. You approve, not me.',
        'I don’t take a project I can’t finish. If it’s not my trade, I say so.',
      ],
      cta: 'Request a quote',
    },
  },
}

// 75000 → « 75 000 ». Intl insère une espace fine insécable (U+202F) ;
// on la normalise en échappement pour ne pas laisser d'espace irrégulière
// dans le source (règle eslint no-irregular-whitespace).
export function formatPrice(value) {
  return new Intl.NumberFormat('fr-FR').format(value).replace(/[\u202F\u00A0]/g, '\u202F')
}
