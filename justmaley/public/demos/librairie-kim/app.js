/**
 * app.js — interactions de la page Librairie Papeterie KIM.
 *
 * La page est entièrement fonctionnelle sans JavaScript : les liens WhatsApp
 * et téléphone sont de vrais liens. Ce script n'ajoute que du confort.
 */

/** Numéro WhatsApp de la librairie (format international, sans « + »). */
const NUMERO_WHATSAPP = '22796988130';

/** Message d'aide à la commande, proposé si le client ne sait pas quoi écrire. */
const MESSAGE_AIDE =
  'Bonjour, je voudrais commander des fournitures. Voici ce qu\'il me faut : ';

document.addEventListener('DOMContentLoaded', () => {
  // Sur mobile, le bouton flottant recouvre le bloc de rappel final :
  // on le masque quand ce bloc est visible.
  const rappel = document.querySelector('.rappel');
  const flottant = document.querySelector('.flottant');
  if (rappel && flottant && 'IntersectionObserver' in window) {
    new IntersectionObserver(
      ([entree]) => {
        const cache = entree.isIntersecting;
        flottant.style.opacity = cache ? '0' : '1';
        flottant.style.pointerEvents = cache ? 'none' : 'auto';
      },
      { threshold: 0.3 }
    ).observe(rappel);
  }

  // Ouvre la conversation WhatsApp avec un message d'aide pré-rempli,
  // pour ceux qui ne sauraient pas quoi écrire (le cas le plus fréquent).
  const aide = document.querySelector('[data-aide-commande]');
  if (aide) {
    aide.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(
        `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(MESSAGE_AIDE)}`,
        '_blank',
        'noopener'
      );
    });
  }
});
