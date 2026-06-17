import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Übersicht', href: '#uebersicht' },
  { label: 'Anmelden', href: '#anmelden' },
  { label: 'Zeitplan', href: '#zeitplan' },
  { label: 'Strecke', href: '#strecke' },
  { label: 'Sponsoren', href: '#sponsoren' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontakt', href: '#kontakt' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40)
      const el = document.documentElement
      const scrolled = el.scrollTop || document.body.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : 'none',
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
              src="https://o-t-n.de/assets/images/j/otn_logo_neu_2011-az9c925dm6a9aw8.svg"
              alt="o.t.n."
              className="h-8 w-auto"
              style={{ filter: 'none' }}
              onError={(e) => {
                const t = e.currentTarget
                t.style.display = 'none'
                const fb = t.nextElementSibling as HTMLElement | null
                if (fb) fb.style.display = 'flex'
              }}
            />
            <span
              className="hidden items-center justify-center w-9 h-8 bg-[#003399] rounded-lg text-white font-bold text-xs"
            >
              o.t.n
            </span>
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
            <a href="#anmelden" className="ml-3 relative inline-flex items-center" style={{ isolation: 'isolate' }}>
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
                Jetzt anmelden
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
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: '#111827' }}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
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
            href="#anmelden"
            onClick={() => setOpen(false)}
            className="block mt-2 text-center bg-[#003399] text-white font-semibold px-4 py-3 rounded-xl text-sm"
          >
            Jetzt anmelden
          </a>
        </div>
      )}
    </header>
  )
}
