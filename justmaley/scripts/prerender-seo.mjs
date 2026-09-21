// Prérendu SEO — s'exécute après `vite build`.
//
// Le site est une application React : sans ce script, dist/ ne contient qu'un
// seul index.html, et /brand, /grow, /build et /apropos servent tous exactement
// le même <head>. Quatre pages avec le même titre, c'est quatre pages qui se
// concurrencent au lieu de se renforcer.
//
// Pire : les robots d'aperçu (WhatsApp, LinkedIn, Facebook, X) n'exécutent pas
// JavaScript. Sans HTML statique par route, tous les liens partagés en
// prospection affichent le même aperçu générique.
//
// Ce script lit le index.html produit par Vite, remplace le bloc situé entre
// les marqueurs <!--seo:start--> et <!--seo:end--> par les balises de chaque
// route, et écrit un fichier par route.
//
// La source de vérité reste src/data/seo.js — le composant React Seo.jsx
// applique exactement les mêmes valeurs à la navigation. Les deux sorties ne
// peuvent pas diverger.

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SEO_PAGES, renderSeoBlock } from '../src/data/seo.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const indexFile = join(dist, 'index.html')

const START = '<!--seo:start-->'
const END = '<!--seo:end-->'

const template = await readFile(indexFile, 'utf-8')

if (!template.includes(START) || !template.includes(END)) {
  console.error(
    `\n[prerender-seo] Marqueurs ${START} / ${END} absents de dist/index.html.\n` +
      "Ils doivent être présents dans index.html à la racine du projet.\n",
  )
  process.exit(1)
}

const escapedStart = START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const escapedEnd = END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const blockPattern = new RegExp(`${escapedStart}[\\s\\S]*?${escapedEnd}`)

const written = []

for (const [key, page] of Object.entries(SEO_PAGES)) {
  const html = template.replace(blockPattern, `${START}\n${renderSeoBlock(page)}\n    ${END}`)

  const target = page.path === '/' ? indexFile : join(dist, page.path, 'index.html')
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, html, 'utf-8')

  written.push(`${page.path.padEnd(9)} → dist${page.path === '/' ? '/index.html' : page.path + '/index.html'}  « ${page.title} »`)
}

console.log(`\n[prerender-seo] ${written.length} pages écrites :`)
for (const line of written) console.log('  ' + line)
console.log('')
