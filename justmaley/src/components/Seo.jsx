import { useEffect } from 'react'
import { jsonLdFor, canonicalFor, SITE } from '../data/seo.js'

// Applique au <head> les métadonnées de la page courante, à chaque navigation.
//
// Pourquoi pas les balises JSX natives de React 19 : elles sont bien hissées
// dans <head>, mais React ne déduplique que ce qu'il a lui-même rendu. Comme
// le HTML prérendu contient déjà ces balises, on se retrouvait avec deux
// <meta name="description"> et deux <link rel="canonical">. Or les robots
// lisent la PREMIÈRE canonique trouvée — c'était celle de l'accueil, donc
// /brand, /grow et /build se déclaraient comme des copies de la page d'accueil
// et se faisaient désindexer.
//
// On gère donc le <head> à la main : on retire nos balises, puis on repose les
// bonnes. Le HTML statique garde les siennes pour les robots qui n'exécutent
// pas JavaScript ; ceux qui l'exécutent voient exactement les mêmes valeurs,
// puisque les deux sortent de src/data/seo.js.

const MANAGED = [
  'meta[name="description"]',
  'meta[name="keywords"]',
  'link[rel="canonical"]',
  'meta[property^="og:"]',
  'meta[name^="twitter:"]',
  'script[type="application/ld+json"]',
]

export default function Seo({ page }) {
  useEffect(() => {
    const head = document.head

    // 1. On retire tout ce qu'on gère, y compris le bloc du HTML prérendu.
    MANAGED.forEach((sel) => head.querySelectorAll(sel).forEach((n) => n.remove()))

    // Le titre se pose à la main lui aussi : sans ça, une navigation interne
    // depuis l'accueil garderait le titre de l'accueil sur toutes les pages.
    document.title = page.title

    // 2. On repose les balises de la page courante, dans l'ordre.
    const meta = (attr, key, content) => {
      const el = document.createElement('meta')
      el.setAttribute(attr, key)
      el.setAttribute('content', content)
      head.appendChild(el)
    }

    meta('name', 'description', page.description)
    meta('name', 'keywords', page.keywords)

    const link = document.createElement('link')
    link.rel = 'canonical'
    link.href = canonicalFor(page.path)
    head.appendChild(link)

    const url = canonicalFor(page.path)
    const img = SITE.url + SITE.ogImage

    meta('property', 'og:type', 'website')
    meta('property', 'og:site_name', SITE.name)
    meta('property', 'og:locale', 'fr_FR')
    meta('property', 'og:locale:alternate', 'en_US')
    meta('property', 'og:url', url)
    meta('property', 'og:title', page.ogTitle)
    meta('property', 'og:description', page.ogDescription)
    meta('property', 'og:image', img)
    meta('property', 'og:image:width', String(SITE.ogImageWidth))
    meta('property', 'og:image:height', String(SITE.ogImageHeight))
    meta('property', 'og:image:alt', `${SITE.name} — studio digital à Niamey`)

    meta('name', 'twitter:card', 'summary_large_image')
    meta('name', 'twitter:title', page.ogTitle)
    meta('name', 'twitter:description', page.ogDescription)
    meta('name', 'twitter:image', img)

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(jsonLdFor(page))
    head.appendChild(script)
  }, [page])

  return null
}
