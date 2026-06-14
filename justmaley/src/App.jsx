import { useState, useEffect, lazy, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

const Work = lazy(() => import('./components/Portfolio'))
const About = lazy(() => import('./components/About'))
const Services = lazy(() => import('./components/Services'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loader />

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Work />
          <About />
          <Services />
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
