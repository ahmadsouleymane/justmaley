import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black-deep"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        {/* Logo SVG animé */}
        <motion.img
          src="/logo-wt.svg"
          alt=""
          width="279"
          height="48"
          fetchPriority="high"
          initial={{ opacity: 0, scale: 0.6, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: '48px', width: 'auto' }}
        />

        {/* Barre de progression */}
        <div className="mt-8 overflow-hidden rounded-full" style={{ width: '160px', height: '3px', backgroundColor: 'rgba(252,122,30,0.1)' }}>
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="h-full bg-orange rounded-full"
          />
        </div>
      </div>
    </motion.div>
  )
}
