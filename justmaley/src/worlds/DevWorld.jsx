import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import BackToPortal from '../components/BackToPortal'

const Work = lazy(() => import('../components/Portfolio'))
const About = lazy(() => import('../components/About'))
const Services = lazy(() => import('../components/Services'))
const Contact = lazy(() => import('../components/Contact'))
const Footer = lazy(() => import('../components/Footer'))

// Monde Développeur (yin, noir) : réutilise les sections existantes. On neutralise
// l'accent orange en offwhite via un override de la variable Tailwind, pour un
// rendu noir & blanc "terminal", cohérent avec le concept yin & yang.
const DARK_THEME = { '--color-orange': '#E3E7D3', '--color-orange-dark': '#c9cdbb' }

export default function DevWorld() {
  return (
    <div style={DARK_THEME} className="bg-black-deep">
      <BackToPortal />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Work />
          <About />
          <Services />
          <Contact theme="dark" />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer theme="dark" />
      </Suspense>
    </div>
  )
}
