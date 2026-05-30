import { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Probleme from './components/Probleme'
import Services from './components/Services'
import Automatisation from './components/Automatisation'
import Secteurs from './components/Secteurs'
import Processus from './components/Processus'
import Portfolio from './components/Portfolio'
import Offre from './components/Offre'
import FAQ from './components/FAQ'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

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
      </main>
      <Footer />
      <Analytics />
    </>
  )
}

export default App
