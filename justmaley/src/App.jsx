import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Loader from './components/Loader'
import Portal from './pages/Portal'
import Offer from './pages/Offer'
import Apropos from './pages/Apropos'
import DevWorld from './worlds/DevWorld'
import CreatifWorld from './worlds/CreatifWorld'

// Routage du studio JustMaley.
//
//   /         portail des trois piliers (BRAND · GROW · BUILD)
//   /brand    offre identité
//   /grow     offre visibilité
//   /build    offre système
//   /apropos  la personne derrière le studio
//
// /creatif et /dev sont les anciens univers. Ils ne sont plus dans le parcours
// commercial — le portail ne pointe plus vers eux — mais ils restent en ligne
// et sont accessibles depuis /apropos, sous « Les archives ». Rien n'a été jeté.

function App() {
  const [loading, setLoading] = useState(true)
  const { pathname } = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  // Remonte en haut à chaque changement de page.
  useEffect(() => {
    window.scrollTo(0, 0)
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
        <Route path="/creatif" element={<CreatifWorld />} />
        <Route path="/dev" element={<DevWorld />} />
        <Route path="*" element={<Portal />} />
      </Routes>
      <Analytics />
    </>
  )
}

export default App
