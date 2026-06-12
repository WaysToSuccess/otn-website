import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'

const leistungen = [
  { label: 'Sanitätshaus', to: '/leistungen/sanitaetshaus' },
  { label: 'Prothesen-Atelier', to: '/leistungen/prothesen-atelier' },
  { label: 'Orthopädietechnik', to: '/leistungen/orthopaedietechnik' },
  { label: 'Reha & Pflege', to: '/leistungen/reha-pflege' },
  { label: 'Schuhtechnik', to: '/leistungen/schuhtechnik' },
  { label: 'Lauflabor', to: '/leistungen/lauflabor' },
  { label: 'Rund ums Kind', to: '/leistungen/rund-ums-kind' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const isVolkslauf = location.pathname === '/volkslauf'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://o-t-n.de/assets/images/j/otn_logo_neu_2011-az9c925dm6a9aw8.svg"
              alt="o.t.n. Orthopädie Technik Nord"
              className="h-9 w-auto"
              onError={(e) => {
                const t = e.currentTarget
                t.style.display = 'none'
                const fb = t.nextElementSibling as HTMLElement | null
                if (fb) fb.style.display = 'flex'
              }}
            />
            <div className="hidden items-center justify-center w-10 h-9 bg-[#1a3a5c] rounded-lg">
              <span className="text-white font-bold text-xs">o.t.n</span>
            </div>
          </Link>

          {!isVolkslauf && (
            <nav className="hidden md:flex items-center gap-6">
              <div className="relative group" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                <button className="flex items-center gap-1 text-gray-600 hover:text-[#1a3a5c] text-sm font-medium transition-colors">
                  Leistungen <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg py-2 min-w-[200px] z-50">
                    {leistungen.map((l) => (
                      <Link key={l.to} to={l.to} onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-600 hover:text-[#1a3a5c] hover:bg-gray-50 transition-colors">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/filialen-kontakt" className="text-gray-600 hover:text-[#1a3a5c] text-sm font-medium transition-colors">Standorte</Link>
              <Link to="/ueber-o-t-n" className="text-gray-600 hover:text-[#1a3a5c] text-sm font-medium transition-colors">Über uns</Link>
              <Link to="/jobs" className="text-gray-600 hover:text-[#1a3a5c] text-sm font-medium transition-colors">Karriere</Link>
              <Link to="/volkslauf" className="text-[#0d9488] hover:text-[#0f766e] text-sm font-semibold transition-colors">Volkslauf 2026</Link>
              <Link to="/filialen-kontakt" className="bg-[#1a3a5c] hover:bg-[#1e4976] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">Kontakt</Link>
            </nav>
          )}

          {isVolkslauf && (
            <nav className="hidden md:flex items-center gap-6">
              <a href="#uebersicht" className="text-gray-600 hover:text-[#1a3a5c] text-sm font-medium transition-colors">Übersicht</a>
              <a href="#zeitplan" className="text-gray-600 hover:text-[#1a3a5c] text-sm font-medium transition-colors">Zeitplan</a>
              <a href="#strecke" className="text-gray-600 hover:text-[#1a3a5c] text-sm font-medium transition-colors">Strecke</a>
              <a href="#faq" className="text-gray-600 hover:text-[#1a3a5c] text-sm font-medium transition-colors">FAQ</a>
              <a href="#kontakt" className="text-gray-600 hover:text-[#1a3a5c] text-sm font-medium transition-colors">Kontakt</a>
              <Link to="/" className="text-gray-400 hover:text-[#1a3a5c] text-sm transition-colors">← o-t-n.de</Link>
              <a href="#anmelden" className="bg-[#0d9488] hover:bg-[#0f766e] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">Anmelden</a>
            </nav>
          )}

          <div className="flex items-center gap-3">
            <a href="tel:+494321979449" className="hidden lg:flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a3a5c] transition-colors">
              <Phone className="w-4 h-4" />
              <span>04321 9794-49</span>
            </a>
            <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-600">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {!isVolkslauf ? (
            <>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 py-1 mt-2">Leistungen</p>
              {leistungen.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block px-2 py-2 text-sm text-gray-600">{l.label}</Link>
              ))}
              <div className="border-t border-gray-100 my-2" />
              <Link to="/filialen-kontakt" onClick={() => setOpen(false)} className="block px-2 py-2 text-sm text-gray-700">Standorte</Link>
              <Link to="/ueber-o-t-n" onClick={() => setOpen(false)} className="block px-2 py-2 text-sm text-gray-700">Über uns</Link>
              <Link to="/jobs" onClick={() => setOpen(false)} className="block px-2 py-2 text-sm text-gray-700">Karriere</Link>
              <Link to="/volkslauf" onClick={() => setOpen(false)} className="block px-2 py-2 text-sm text-[#0d9488] font-semibold">Volkslauf 2026</Link>
            </>
          ) : (
            <>
              <a href="#uebersicht" onClick={() => setOpen(false)} className="block px-2 py-2 text-sm text-gray-700">Übersicht</a>
              <a href="#zeitplan" onClick={() => setOpen(false)} className="block px-2 py-2 text-sm text-gray-700">Zeitplan</a>
              <a href="#strecke" onClick={() => setOpen(false)} className="block px-2 py-2 text-sm text-gray-700">Strecke</a>
              <a href="#faq" onClick={() => setOpen(false)} className="block px-2 py-2 text-sm text-gray-700">FAQ</a>
              <a href="#kontakt" onClick={() => setOpen(false)} className="block px-2 py-2 text-sm text-gray-700">Kontakt</a>
              <Link to="/" onClick={() => setOpen(false)} className="block px-2 py-2 text-sm text-gray-500">← o-t-n.de</Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
