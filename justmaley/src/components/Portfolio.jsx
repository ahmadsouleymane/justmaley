import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/*
  Chaque projet a :
  - cat    : tableau de catégories, ex: ['Web', 'Visual'] ou ['Video']
  - media  : tableau de medias { type: 'image'|'video', src: '...' }
  - link   : (optionnel) URL du site web
*/
const projects = [
  {
    id: 1,
    title: 'MisterAll',
    cat: ['Web'],
    desc: 'Plateforme de revision pour élèves et étudiants',
    link: 'https://misterall.tech',
    media: [
    ],
  },
  {
    id: 4,
    title: 'Club Santé et Environnement (UIYA)',
    cat: ['Video'],
    desc: 'Video promotionnel',
    media: [
      { type: 'image', src: '/portfolio/cse-uiya.jpg' },
      { type: 'video', src: 'https://youtube.com/shorts/OwTtf8diUOo' },
    ],
  },
  {
    id: 5,
    title: '48h du livre et des arts associés',
    cat: ['Visual', 'Web', 'Video'],
    desc: 'Evenement littéraire',
    media: [
      { type: 'image', src: '/portfolio/48h-livre.jpg' },
    ],
  },
  {
    id: 8,
    title: 'Bibliothèque UIYA',
    cat: ['Web'],
    desc: "Système de gestion d'une bibliothèque",
    link: 'https://uiya-biblio.vercel.app',
    media: [
      { type: 'image', src: '/portfolio/biblio-uiya.jpg' },
    ],
  },
  {
    id: 9,
    title: 'Atélier de lecture',
    cat: ['Visual', 'Video'],
    desc: "Activité organisée par les bénévoles de la bibliothèque de l'Université Internationale de Yamoussoukro",
    media: [
      { type: 'image', src: '/portfolio/ateliers-lecture.jpg' },
    ],
  },
]

const filters = ['Tous', 'Web', 'Visual', 'Video']

function getYouTubeEmbedUrl(url) {
  if (!url) return null
  let match = url.match(/youtube\.com\/shorts\/([^?&/]+)/)
  if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1`
  match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^?&/]+)/)
  if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1`
  return null
}

/* ======================== LIGHTBOX ======================== */
function Lightbox({ project, onClose, allProjects, onNavigate }) {
  const [mediaIndex, setMediaIndex] = useState(0)
  const currentProjectIndex = allProjects.findIndex((p) => p.id === project.id)
  const hasMedia = project.media.length > 0
  const currentMedia = hasMedia ? project.media[mediaIndex] : null

  useEffect(() => { setMediaIndex(0) }, [project.id])

  const goPrevProject = useCallback(() => {
    if (currentProjectIndex > 0) onNavigate(allProjects[currentProjectIndex - 1])
  }, [currentProjectIndex, allProjects, onNavigate])

  const goNextProject = useCallback(() => {
    if (currentProjectIndex < allProjects.length - 1) onNavigate(allProjects[currentProjectIndex + 1])
  }, [currentProjectIndex, allProjects, onNavigate])

  const goPrevMedia = () => setMediaIndex((i) => Math.max(0, i - 1))
  const goNextMedia = () => setMediaIndex((i) => Math.min(project.media.length - 1, i + 1))

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') {
        if (hasMedia && project.media.length > 1 && mediaIndex > 0) goPrevMedia()
        else goPrevProject()
      }
      if (e.key === 'ArrowRight') {
        if (hasMedia && project.media.length > 1 && mediaIndex < project.media.length - 1) goNextMedia()
        else goNextProject()
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose, goPrevProject, goNextProject, mediaIndex, project.media.length])

  const embedUrl = currentMedia?.type === 'video' ? getYouTubeEmbedUrl(currentMedia.src) : null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-offwhite/60 hover:text-offwhite transition-colors z-50"
        aria-label="Fermer"
        style={{ background: 'none', border: 'none' }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {currentProjectIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrevProject() }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-offwhite/40 hover:text-orange transition-colors z-50"
          aria-label="Projet précédent"
          style={{ background: 'none', border: 'none' }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {currentProjectIndex < allProjects.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNextProject() }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-offwhite/40 hover:text-orange transition-colors z-50"
          aria-label="Projet suivant"
          style={{ background: 'none', border: 'none' }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      <motion.div
        key={project.id + '-' + mediaIndex}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full flex flex-col items-center px-4"
        style={{ maxWidth: '960px' }}
      >
        {hasMedia ? (
          currentMedia.type === 'video' && embedUrl ? (
            <div className="w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9', backgroundColor: '#000' }}>
              <iframe
                src={embedUrl}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
          ) : (
            <div className="w-full rounded-2xl overflow-hidden flex items-center justify-center" style={{ maxHeight: '70vh', backgroundColor: '#111' }}>
              <img
                src={currentMedia.src}
                alt={project.title}
                style={{ objectFit: 'contain', maxHeight: '70vh', maxWidth: '100%' }}
              />
            </div>
          )
        ) : null}

        {project.media.length > 1 && (
          <div className="mt-4 flex items-center gap-2 overflow-x-auto" style={{ maxWidth: '100%', paddingBottom: '4px' }}>
            {project.media.map((m, i) => (
              <button
                key={i}
                onClick={() => setMediaIndex(i)}
                className="relative shrink-0 rounded-lg overflow-hidden transition-all"
                style={{
                  width: '64px',
                  height: '48px',
                  border: i === mediaIndex ? '2px solid #FC7A1E' : '2px solid rgba(227,231,211,0.1)',
                  opacity: i === mediaIndex ? 1 : 0.5,
                  background: '#111',
                }}
              >
                {m.type === 'image' ? (
                  <img src={m.src} alt="" className="w-full h-full" style={{ objectFit: 'cover' }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black-deep">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FC7A1E">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-col md:flex-row items-center gap-3 md:gap-6 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-offwhite">{project.title}</h3>
          <span className="hidden md:block text-offwhite/20">—</span>
          <p className="text-offwhite/50 text-sm">{project.desc}</p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-orange text-sm hover:text-offwhite transition-colors"
              style={{ fontWeight: 600 }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5l-1 1" />
                <path d="M10 7.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5l1-1" />
              </svg>
              Visiter le site
            </a>
          )}
        </div>

        <div className="mt-3 flex items-center gap-4 text-offwhite/20 text-xs">
          <span>Projet {currentProjectIndex + 1}/{allProjects.length}</span>
          {project.media.length > 1 && (
            <span>Media {mediaIndex + 1}/{project.media.length}</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ======================== PORTFOLIO ======================== */
export default function Portfolio() {
  const [active, setActive] = useState('Tous')
  const [selectedProject, setSelectedProject] = useState(null)
  const filtered = active === 'Tous' ? projects : projects.filter((p) => p.cat.includes(active))

  return (
    <section id="portfolio" className="py-24 md:py-36 px-6 md:px-12 bg-black-deep">
      <div className="mx-auto" style={{ maxWidth: '1280px' }}>
        <div className="mb-16 md:mb-24" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem' }}>
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-orange text-sm tracking-[0.3em] uppercase mb-4 block"
            >
              Portfolio
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-offwhite tracking-tight"
            >
              Mes <span className="text-orange">réalisations.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-3 flex-wrap"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2 rounded-full text-sm tracking-wider uppercase transition-all duration-300 ${
                  active === f
                    ? 'bg-orange text-black-deep'
                    : 'border border-offwhite/20 text-offwhite/60 hover:border-orange/50 hover:text-orange'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '1.5rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => {
              const videoCount = project.media.filter((m) => m.type === 'video').length
              const imageCount = project.media.filter((m) => m.type === 'image').length

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="group relative block w-full overflow-hidden rounded-2xl text-left transition-all duration-500 hover:border-orange/50"
                    style={{
                      backgroundColor: '#111',
                      border: '1px solid rgba(227,231,211,0.08)',
                      padding: '2rem',
                      minHeight: '220px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                    data-hover
                  >
                    {/* Numéro décoratif */}
                    <span
                      className="absolute top-4 right-6 font-bold select-none"
                      style={{ fontSize: '6rem', lineHeight: 1, color: 'rgba(252,122,30,0.05)', fontFamily: 'var(--font-cool-cond)' }}
                    >
                      {String(project.id).padStart(2, '0')}
                    </span>

                    {/* Haut : catégories */}
                    <div className="flex items-center gap-2 flex-wrap relative z-10">
                      {project.cat.map((c) => (
                        <span
                          key={c}
                          className="text-xs tracking-wider uppercase"
                          style={{
                            color: '#FC7A1E',
                            backgroundColor: 'rgba(252,122,30,0.1)',
                            padding: '4px 10px',
                            borderRadius: '9999px',
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>

                    {/* Milieu : titre + desc */}
                    <div className="relative z-10 mt-6 flex-grow">
                      <h3 className="text-2xl md:text-3xl font-bold text-offwhite tracking-tight mb-2 group-hover:text-orange transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-offwhite/40 text-sm leading-relaxed" style={{ maxWidth: '320px' }}>
                        {project.desc}
                      </p>
                    </div>

                    {/* Bas : medias + lien */}
                    <div className="relative z-10 mt-6 flex items-center gap-3">
                      {imageCount > 0 && (
                        <span className="flex items-center gap-1.5 text-offwhite/30 text-xs">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                          {imageCount} image{imageCount > 1 ? 's' : ''}
                        </span>
                      )}
                      {videoCount > 0 && (
                        <span className="flex items-center gap-1.5 text-offwhite/30 text-xs">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                          {videoCount} vidéo{videoCount > 1 ? 's' : ''}
                        </span>
                      )}
                      {project.link && (
                        <span className="flex items-center gap-1.5 text-offwhite/30 text-xs">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                          Site web
                        </span>
                      )}

                      {/* Flèche */}
                      <div className="ml-auto opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FC7A1E" strokeWidth="2" strokeLinecap="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <Lightbox
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            allProjects={filtered}
            onNavigate={setSelectedProject}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
