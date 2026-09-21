import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Loader from './components/Loader'
import Portal from './pages/Portal'
import Offer from './pages/Offer'
import Apropos from './pages/Apropos'

// Routage du studio JustMaley.
//
//   /         portail des trois piliers (BRAND · GROW · BUILD)
//   /brand    offre identité
//   /grow     offre visibilité
//   /build    offre système
//   /apropos  la personne derrière le studio
//
// Les anciens univers /creatif et /dev ont été supprimés, avec leurs composants
// et leurs images. Le contenu reste récupérable dans l'historique git si besoin.

function App() {
  const [loading, setLoading] = useState(true)
  const { pathname } = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  // Remonte en haut à chaque changement de page.
  // behavior: 'instant' est indispensable : index.css définit
  // `html { scroll-behavior: smooth }`, donc un window.scrollTo(0, 0) nu
  // ferait défiler la nouvelle page depuis la position de l'ancienne — le
  // visiteur atterrissait au milieu de la page et la regardait remonter.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  if (loading) return <Loader />

  return (
    <>
      <Routes>
        <Route path="/" element={<Portal />} />
        <Route path="/brand" element={<Offer slug="brand" />} />
        <Route path="/grow" element={<Offer slug="grow" />} />
        <Route path="/build" element={<Offer slug="build" />} />
        <Route path="/apropos" element={<Apropos />} />
        <Route path="*" element={<Portal />} />
      </Routes>
      <Analytics />
    </>
  )
}

export default App
