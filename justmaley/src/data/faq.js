// Questions fréquentes, par pilier.
//
// Deux usages, une seule source :
//   1. Affichées en bas des pages d'offre (Offer.jsx) — c'est ce texte visible
//      qui fait ranker la page, en répondant à des requêtes réelles.
//   2. Transformées en balisage FAQPage (src/data/seo.js) pour que Google
//      puisse les afficher directement dans les résultats.
//
// Les questions sont écrites comme les gens les tapent : « combien coûte un
// site web à Niamey », « est-ce que le code m'appartient ». Pas de jargon.

export const FAQ = {
  brand: {
    fr: [
      {
        q: 'Combien de temps prend la création d’un logo ?',
        a: 'Comptez une à deux semaines pour le niveau Essentiel, trois à quatre semaines pour le niveau Business, et jusqu’à six semaines pour une refonte complète. Le délai démarre à l’appel de brief, pas à la signature.',
      },
      {
        q: 'Est-ce que je reçois les fichiers sources ?',
        a: 'Oui, à tous les niveaux, sans supplément et sans condition. Vous recevez les fichiers vectoriels (utilisables en impression grand format), les versions PNG et SVG, et les déclinaisons fond clair / fond sombre. Votre logo vous appartient, vous n’avez pas à revenir vers moi pour l’utiliser.',
      },
      {
        q: 'Combien coûte un logo à Niamey ?',
        a: 'Les tarifs dépendent du niveau choisi et de ce dont vous avez besoin. Je ne les affiche pas publiquement parce qu’un logo seul et une identité complète avec charte et supports ne représentent pas le même travail. L’appel de cadrage est gratuit et vous repartez avec un montant ferme.',
      },
      {
        q: 'Puis-je faire imprimer mon logo n’importe où ?',
        a: 'Oui. C’est justement le rôle de la charte graphique : elle indique les couleurs exactes (CMJN pour l’imprimeur, RVB pour le web), les typographies, les tailles minimales et les marges à respecter. Votre imprimeur à Niamey travaille directement à partir de ces fichiers.',
      },
      {
        q: 'Travaillez-vous avec des entreprises hors de Niamey ?',
        a: 'Oui. Tout le processus se fait à distance — appel de brief, présentation des pistes, allers-retours. J’ai des clients dans plusieurs pays d’Afrique de l’Ouest et en Europe. Les fichiers se transmettent par lien de téléchargement.',
      },
      {
        q: 'Et si le logo ne me plaît pas ?',
        a: 'Je présente trois pistes différentes au départ, pas une seule. Vous en choisissez une, ou vous demandez un mélange de deux. Ensuite, chaque niveau prévoit un nombre d’allers-retours pour affiner — 2 pour l’Essentiel, 4 pour le Business, illimités pour Signature.',
      },
    ],
    en: [
      {
        q: 'How long does a logo take?',
        a: 'One to two weeks for the Essential tier, three to four for Business, up to six for a full overhaul. The clock starts at the brief call, not at signature.',
      },
      {
        q: 'Do I get the source files?',
        a: 'Yes, at every tier, at no extra cost and with no conditions. You get the vector files (usable for large-format printing), PNG and SVG versions, and light / dark background variations. The logo is yours — you never have to come back to me to use it.',
      },
      {
        q: 'How much does a logo cost in Niamey?',
        a: 'Pricing depends on the tier and on what you actually need. I do not publish it because a standalone logo and a full identity with guidelines and collateral are not the same work. The scoping call is free and you leave it with a fixed amount.',
      },
      {
        q: 'Can I have my logo printed anywhere?',
        a: 'Yes. That is exactly what the brand guidelines are for: exact colours (CMYK for the printer, RGB for web), typefaces, minimum sizes and clear space. Your printer in Niamey works straight from those files.',
      },
      {
        q: 'Do you work with businesses outside Niamey?',
        a: 'Yes. The whole process runs remotely — brief call, direction presentations, revisions. I have clients across West Africa and in Europe. Files are delivered by download link.',
      },
      {
        q: 'What if I don’t like the logo?',
        a: 'I present three different directions up front, not one. You pick one, or ask for a blend of two. Each tier then includes revisions to refine it — 2 for Essential, 4 for Business, unlimited for Signature.',
      },
    ],
  },

  grow: {
    fr: [
      {
        q: 'Combien de publications par mois ?',
        a: '8 pour l’Essentiel, 16 pour le Business, illimité pour le Pro. Le rythme est calé au moment du cadrage selon votre secteur et ce que vous avez à dire — publier pour publier ne sert à rien.',
      },
      {
        q: 'Qui fournit les photos et les vidéos ?',
        a: 'Vous fournissez la matière première quand vous en avez (photos de vos produits, de vos locaux, de votre équipe). Je m’occupe de la direction artistique, du montage et de l’habillage. Au niveau Pro, je viens tourner sur place à Niamey.',
      },
      {
        q: 'Y a-t-il un engagement de durée ?',
        a: 'Non. L’abonnement est mensuel et résiliable au mois. Je préfère que vous restiez parce que ça marche, pas parce qu’un contrat vous y oblige. Cela dit, comptez deux à trois mois avant de voir un effet réel sur les réseaux.',
      },
      {
        q: 'Vous gérez quels réseaux sociaux ?',
        a: 'Facebook, Instagram, TikTok et LinkedIn, qui sont ceux où vos clients passent vraiment du temps au Niger et en Afrique de l’Ouest. On choisit ensemble les deux ou trois qui valent le coup pour votre activité, plutôt que d’être partout à moitié.',
      },
      {
        q: 'Est-ce que vous répondez aux messages des clients ?',
        a: 'Oui, à partir du niveau Business. Je réponds aux commentaires et aux messages directs, je modère, et je vous remonte tout ce qui nécessite votre intervention personnelle. Vous n’êtes jamais mis devant le fait accompli.',
      },
      {
        q: 'Publiez-vous sans ma validation ?',
        a: 'Non, jamais. Vous validez le calendrier et les contenus avant publication. Vous gardez la main sur ce qui sort sous votre nom — c’est votre réputation, pas la mienne.',
      },
    ],
    en: [
      {
        q: 'How many posts per month?',
        a: '8 on Essential, 16 on Business, unlimited on Pro. The pace is set during onboarding based on your trade and what you actually have to say — posting for the sake of it achieves nothing.',
      },
      {
        q: 'Who provides the photos and videos?',
        a: 'You provide the raw material when you have it (product photos, your premises, your team). I handle art direction, editing and packaging. On the Pro tier I come and shoot on site in Niamey.',
      },
      {
        q: 'Is there a minimum contract?',
        a: 'No. The subscription is monthly and cancellable monthly. I would rather you stay because it works than because a contract forces you. That said, allow two to three months before seeing a real effect on social.',
      },
      {
        q: 'Which social networks do you manage?',
        a: 'Facebook, Instagram, TikTok and LinkedIn — where your customers genuinely spend time in Niger and West Africa. We pick the two or three that are worth it for your business rather than being half-present everywhere.',
      },
      {
        q: 'Do you reply to customer messages?',
        a: 'Yes, from the Business tier up. I answer comments and direct messages, moderate, and escalate anything that needs your personal input. You are never presented with a fait accompli.',
      },
      {
        q: 'Do you publish without my approval?',
        a: 'No, never. You approve the calendar and the content before publication. You stay in control of what goes out under your name — it is your reputation, not mine.',
      },
    ],
  },

  build: {
    fr: [
      {
        q: 'Combien de temps pour créer un site web ?',
        a: 'Un site vitrine prend deux à trois semaines. Un site business avec réservation ou espace client, quatre à six semaines. Une boutique en ligne ou une application sur mesure, six à douze semaines. Le délai est fixé dans le devis et je m’y tiens.',
      },
      {
        q: 'Le code source m’appartient ?',
        a: 'Oui. À la livraison, vous recevez l’intégralité du code. Vous pouvez changer de prestataire demain sans repartir de zéro, et personne ne peut vous retenir en otage. C’est une clause du devis, pas une promesse verbale.',
      },
      {
        q: 'Combien coûte un site web à Niamey ?',
        a: 'Chaque projet a son prix, mais la fourchette dépend surtout du nombre de fonctionnalités : un site vitrine n’a rien à voir avec une boutique avec paiement en ligne. L’appel de cadrage est gratuit et vous recevez un montant ferme, sans « ça dépend ».',
      },
      {
        q: 'Qui s’occupe du nom de domaine et de l’hébergement ?',
        a: 'Je m’en occupe, et la première année est incluse dans le devis. Le domaine est enregistré à votre nom — pas au mien — pour que vous en gardiez le contrôle total. À partir de la deuxième année, vous renouvelez directement.',
      },
      {
        q: 'Puis-je gérer le contenu moi-même après la livraison ?',
        a: 'Oui, c’est prévu. Une session de prise en main est incluse : vous apprenez à modifier vos textes, vos photos et vos produits depuis un tableau de bord. Si vous préférez ne rien toucher, une maintenance mensuelle est possible.',
      },
      {
        q: 'Que se passe-t-il si quelque chose casse après la livraison ?',
        a: 'Les 30 premiers jours, je corrige gratuitement tout ce qui relève d’un défaut de fabrication. Au-delà, deux formules : une maintenance mensuelle, ou des interventions ponctuelles facturées à la demande.',
      },
      {
        q: 'Travaillez-vous avec des clients hors du Niger ?',
        a: 'Oui. Je travaille à distance avec des clients dans toute l’Afrique de l’Ouest et en Europe. Les points d’avancement se font en visio, et vous voyez le projet en ligne dès la première moitié du délai.',
      },
    ],
    en: [
      {
        q: 'How long does a website take?',
        a: 'A showcase site takes two to three weeks. A business site with booking or a customer area, four to six weeks. An online store or a custom application, six to twelve weeks. The deadline is fixed in the quote and I hold to it.',
      },
      {
        q: 'Do I own the source code?',
        a: 'Yes. On delivery you receive the entire codebase. You can change provider tomorrow without starting over, and nobody can hold you hostage. It is a clause in the quote, not a verbal promise.',
      },
      {
        q: 'How much does a website cost in Niamey?',
        a: 'Every project has its price, but the range mostly depends on how many features you need: a showcase site has nothing to do with a store with online payment. The scoping call is free and you get a fixed amount, with no “it depends”.',
      },
      {
        q: 'Who handles the domain name and hosting?',
        a: 'I do, and the first year is included in the quote. The domain is registered in your name — not mine — so you keep full control. From year two, you renew directly.',
      },
      {
        q: 'Can I manage the content myself after delivery?',
        a: 'Yes, that is planned for. A handover session is included: you learn to edit your text, photos and products from a dashboard. If you would rather not touch anything, monthly maintenance is available.',
      },
      {
        q: 'What happens if something breaks after delivery?',
        a: 'For the first 30 days I fix anything that is a manufacturing defect, free of charge. After that, two options: monthly maintenance, or one-off work billed on request.',
      },
      {
        q: 'Do you work with clients outside Niger?',
        a: 'Yes. I work remotely with clients across West Africa and in Europe. Progress calls happen over video, and you see the project live from the halfway mark.',
      },
    ],
  },
}

export function faqFor(slug, lang) {
  const entry = FAQ[slug]
  if (!entry) return []
  return entry[lang] || entry.fr
}
