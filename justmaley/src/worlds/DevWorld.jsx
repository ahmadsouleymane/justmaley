import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import BackToPortal from '../components/BackToPortal'

const Work = lazy(() => import('../components/Portfolio'))
const About = lazy(() => import('../components/About'))
const Services = lazy(() => import('../components/Services'))
const Contact = lazy(() => import('../components/Contact'))
const Footer = lazy(() => import('../components/Footer'))

// Monde Développeur : réutilise les sections existantes (web, mobile, IA, SaaS).
export default function DevWorld() {
  return (
    <>
      <BackToPortal />
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
    </>
  )
}
