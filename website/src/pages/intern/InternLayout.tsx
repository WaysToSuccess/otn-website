import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

const PASSWORD = 'otn2026-intern'

const BRAND = {
  primary: '#003399',
  secondary: '#1a3a5c',
  accent: '#0d9488',
}

const CRUMBS: Record<string, string> = {
  '/intern': 'Übersicht',
  '/intern/zeitungsartikel': 'Zeitungsartikel',
  '/intern/status': 'Öffentlichkeits-Status',
}

const NAV_LINKS = [
  { to: '/intern', label: 'Übersicht' },
  { to: '/intern/zeitungsartikel', label: 'Zeitungsartikel' },
  { to: '/intern/status', label: 'Status' },
]

function Breadcrumb({ pathname }: { pathname: string }) {
  const currentLabel = CRUMBS[pathname] ?? 'Seite'
  const isRoot = pathname === '/intern'

  return (
    <div className="border-b border-white/10 px-6 py-4" style={{ background: BRAND.secondary }}>
      <div className="flex items-center gap-2 text-white/50 text-sm">
        <Link to="/intern" className="hover:text-white transition-colors font-medium">
          OTN Intern
        </Link>
        {!isRoot && (
          <>
            <span className="text-white/30 text-lg leading-none">›</span>
            <span className="text-white font-semibold">{currentLabel}</span>
          </>
        )}
      </div>
      <h1 className="text-white text-2xl font-bold mt-1">
        {isRoot ? 'OTN Intern' : currentLabel}
      </h1>
    </div>
  )
}

export default function InternLayout({ children }: { children: ReactNode }) {
  const [pw, setPw] = useState('')
  const [auth, setAuth] = useState(() => sessionStorage.getItem('intern_auth') === 'true')
  const [error, setError] = useState(false)
  const location = useLocation()

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: BRAND.secondary }}>
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">
          <div className="text-center mb-6">
            <div className="text-2xl font-bold" style={{ color: BRAND.secondary }}>OTN Intern</div>
            <p className="text-gray-500 text-sm mt-1">Interner Bereich — Zugang erforderlich</p>
          </div>
          <input
            type="password"
            placeholder="Passwort"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false) }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (pw === PASSWORD) { sessionStorage.setItem('intern_auth', 'true'); setAuth(true) }
                else setError(true)
              }
            }}
            className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 mb-3"
            style={{ borderColor: error ? '#ef4444' : '#e5e7eb' }}
          />
          {error && <p className="text-red-500 text-xs mb-3">Falsches Passwort</p>}
          <button
            onClick={() => {
              if (pw === PASSWORD) { sessionStorage.setItem('intern_auth', 'true'); setAuth(true) }
              else setError(true)
            }}
            className="w-full text-white font-semibold py-3 rounded-xl transition-all hover:opacity-90"
            style={{ background: BRAND.primary }}
          >
            Einloggen
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Top nav bar */}
      <nav className="text-white px-6 py-3 flex items-center gap-2" style={{ background: BRAND.primary }}>
        {NAV_LINKS.map(link => {
          const active = link.to === '/intern'
            ? location.pathname === '/intern'
            : location.pathname.startsWith(link.to)
          return (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm px-3 py-1.5 rounded-lg transition-all"
              style={{
                background: active ? 'rgba(255,255,255,0.18)' : 'transparent',
                opacity: active ? 1 : 0.65,
                fontWeight: active ? 600 : 400,
              }}
            >
              {link.label}
            </Link>
          )
        })}
        <button
          onClick={() => { sessionStorage.removeItem('intern_auth'); setAuth(false) }}
          className="ml-auto text-xs opacity-50 hover:opacity-100 transition-opacity"
        >
          Ausloggen
        </button>
      </nav>

      {/* Breadcrumb header */}
      <Breadcrumb pathname={location.pathname} />

      <main className="p-6">{children}</main>
    </div>
  )
}
