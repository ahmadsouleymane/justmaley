import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const listenersRef = useRef(new Set())

  useEffect(() => {
    if (window.innerWidth < 768) return

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }

    const hide = () => {
      setVisible(false)
      setHovering(false)
    }

    const show = () => setVisible(true)

    const over = () => setHovering(true)
    const out = () => setHovering(false)

    const attachListeners = (el) => {
      if (listenersRef.current.has(el)) return
      listenersRef.current.add(el)
      el.addEventListener('mouseenter', over)
      el.addEventListener('mouseleave', out)
    }

    const bindAll = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(attachListeners)
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    bindAll()

    const observer = new MutationObserver(bindAll)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
      observer.disconnect()
      listenersRef.current.forEach((el) => {
        el.removeEventListener('mouseenter', over)
        el.removeEventListener('mouseleave', out)
      })
      listenersRef.current.clear()
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
