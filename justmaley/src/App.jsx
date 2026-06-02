import { useState, useEffect, lazy, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

// Sections sous la ligne de flottaison : chargées à la demande pour réduire le JS initial
const Probleme = lazy(() => import('./components/Probleme'))
const Services = lazy(() => import('./components/Services'))
const Automatisation = lazy(() => import('./components/Automatisation'))
const Secteurs = lazy(() => import('./components/Secteurs'))
const Processus = lazy(() => import('./components/Processus'))
const Portfolio = lazy(() => import('./components/Portfolio'))
const Offre = lazy(() => import('./components/Offre'))
const FAQ = lazy(() => import('./components/FAQ'))
const About = lazy(() => import('./components/About'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loader />

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Probleme />
          <Services />
          <Automatisation />
          <Secteurs />
          <Processus />
          <Portfolio />
          <Offre />
          <FAQ />
          <About />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Analytics />
    </>
  )
}

export default App
