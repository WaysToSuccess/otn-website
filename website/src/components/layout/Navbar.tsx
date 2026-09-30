import { useState, useEffect } from 'react'
import { MenuIcon as Menu, XIcon as X } from '../icons'

const links = [
  { label: 'Übersicht', href: '/#uebersicht' },
  { label: 'Ergebnisse', href: '/#anmelden' },
  { label: 'Zeitplan', href: '/#zeitplan' },
  { label: 'Strecke', href: '/#strecke' },
  { label: 'Sponsoren', href: '/#sponsoren' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Kontakt', href: '/#kontakt' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      setScrolled(window.scrollY > 40)
      const el = document.documentElement
      const scrolled = el.scrollTop || document.body.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0)
    }
    const handler = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999999] focus:bg-[#003399] focus:text-white focus:font-semibold focus:px-4 focus:py-2.5 focus:rounded-lg"
    >
      Zum Inhalt springen
    </a>
    <header
      className="fixed top-0 left-0 right-0 z-[999999] transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.35)',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(10px)',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'blur(10px)',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(255,255,255,0.25)',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-transparent">
        <div
          className="h-full bg-[#003399] origin-left"
          style={{
            width: `${progress}%`,
            transition: 'width 0.1s linear',
            boxShadow: '0 0 8px rgba(26,58,92,0.5)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <a href="#" className="flex items-center gap-3">
            <img
              src="/images/otn_logo_sm.webp"
              alt="o.t.n"
              width={100}
              height={49}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-8 w-auto"
            />
            <img
              src="/images/MSTV_Olympia_sm.webp"
              alt="MSTV Olympia Neumünster"
              width={32}
              height={32}
              loading="eager"
              decoding="async"
              className="h-8 w-auto"
            />
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium px-3 py-2 rounded-lg transition-all"
                style={{ color: '#111827' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#003399')}
                onMouseLeave={e => (e.currentTarget.style.color = '#111827')}
              >
                {l.label}
              </a>
            ))}
            <a href="/#anmelden" className="ml-3 relative inline-flex items-center" style={{ isolation: 'isolate' }}>
              {/* Spark pixels */}
              {[
                { style: { top: '-4px', left: '12px',  animationDelay: '0s',    animationName: 'sparkUp' } },
                { style: { top: '-4px', left: '40px',  animationDelay: '0.4s',  animationName: 'sparkUp' } },
                { style: { top: '-4px', right: '16px', animationDelay: '0.8s',  animationName: 'sparkUp' } },
                { style: { bottom: '-4px', left: '20px',  animationDelay: '0.2s',  animationName: 'sparkDown' } },
                { style: { bottom: '-4px', right: '24px', animationDelay: '0.6s',  animationName: 'sparkDown' } },
                { style: { left: '-4px', top: '6px',   animationDelay: '0.3s',  animationName: 'sparkLeft' } },
                { style: { right: '-4px', top: '6px',  animationDelay: '0.7s',  animationName: 'sparkRight' } },
                { style: { right: '-4px', bottom: '6px', animationDelay: '0.1s', animationName: 'sparkRight' } },
              ].map((p, i) => (
                <span
                  key={i}
                  className="absolute rounded-sm pointer-events-none"
                  style={{
                    ...p.style,
                    width: 3,
                    height: 3,
                    background: '#003399',
                    animationDuration: '1.4s',
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                  }}
                />
              ))}
              <span className="relative z-10 bg-[#003399] hover:bg-[#0040cc] text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all shadow-md hover:scale-105 active:scale-95 inline-block">
                Ergebnisse
              </span>
            </a>
            <style>{`
              @keyframes sparkUp    { 0%,100%{opacity:0;transform:translateY(0)}  50%{opacity:1;transform:translateY(-5px)} }
              @keyframes sparkDown  { 0%,100%{opacity:0;transform:translateY(0)}  50%{opacity:1;transform:translateY(5px)}  }
              @keyframes sparkLeft  { 0%,100%{opacity:0;transform:translateX(0)}  50%{opacity:1;transform:translateX(-5px)} }
              @keyframes sparkRight { 0%,100%{opacity:0;transform:translateX(0)}  50%{opacity:1;transform:translateX(5px)}  }
            `}</style>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="md:hidden p-3 -m-1 rounded-lg transition-colors"
            style={{ color: '#111827' }}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm text-gray-700 hover:text-[#0d9488] rounded-lg hover:bg-teal-50 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#anmelden"
            onClick={() => setOpen(false)}
            className="block mt-2 text-center bg-[#003399] text-white font-semibold px-4 py-3 rounded-xl text-sm"
          >
            Ergebnisse
          </a>
        </div>
      )}
    </header>
    </>
  )
}
