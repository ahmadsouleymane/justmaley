export default function Footer() {
  return (
    <footer className="bg-black-deep border-t border-offwhite/10">
      <div
        className="mx-auto px-6 md:px-10 py-10 flex flex-wrap items-center justify-between gap-6"
        style={{ maxWidth: '1280px' }}
      >
        <a href="#" aria-label="Just Maley" className="flex items-center gap-3">
          <img src="/logo-wt.svg" alt="" width="32" height="32" className="h-7 w-auto opacity-70" />
          <span className="text-offwhite/70 font-semibold tracking-tight text-sm">Just Maley</span>
        </a>

        <div className="flex items-center gap-6 text-sm">
          <a href="#contact" className="text-offwhite/60 hover:text-orange transition-colors">Email</a>
          <a href="#contact" className="text-offwhite/60 hover:text-orange transition-colors">WhatsApp</a>
          <a href="#contact" className="text-offwhite/60 hover:text-orange transition-colors">LinkedIn</a>
        </div>

        <p className="text-offwhite/30 text-xs tabular-nums">© 2026 Just Maley</p>
      </div>
    </footer>
  )
}
