import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Loader from './components/Loader'
import Portal from './pages/Portal'
import DevWorld from './worlds/DevWorld'
import CreatifWorld from './worlds/CreatifWorld'

function App() {
  const [loading, setLoading] = useState(true)
  const { pathname } = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  // Remonte en haut à chaque changement de monde.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  if (loading) return <Loader />

  return (
    <>
      <Routes>
        <Route path="/" element={<Portal />} />
        <Route path="/dev" element={<DevWorld />} />
        <Route path="/creatif" element={<CreatifWorld />} />
        <Route path="*" element={<Portal />} />
      </Routes>
      <Analytics />
    </>
  )
}

export default App
