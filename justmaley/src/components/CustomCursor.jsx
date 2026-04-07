import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 768) return

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }

    const over = () => setHovering(true)
    const out = () => setHovering(false)

    window.addEventListener('mousemove', move)

    const interactives = document.querySelectorAll('a, button, [data-hover]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', over)
      el.addEventListener('mouseleave', out)
    })

    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll('a, button, [data-hover]')
      els.forEach((el) => {
        el.addEventListener('mouseenter', over)
        el.addEventListener('mouseleave', out)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', over)
        el.removeEventListener('mouseleave', out)
      })
    }
  }, [visible])

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference hidden md:block"
        animate={{
          x: pos.x - (hovering ? 30 : 12),
          y: pos.y - (hovering ? 30 : 12),
          width: hovering ? 60 : 24,
          height: hovering ? 60 : 24,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="w-full h-full rounded-full border-2 border-orange" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none hidden md:block"
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 2000, damping: 50 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-orange" />
      </motion.div>
    </>
  )
}
