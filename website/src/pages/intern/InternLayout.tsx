import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

const PASSWORD = 'otn2025intern'

const BRAND = {
  primary: '#003399',
  secondary: '#1a3a5c',
  accent: '#0d9488',
  light: '#2dd4bf',
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
      <nav className="text-white px-6 py-4 flex items-center gap-6" style={{ background: BRAND.secondary }}>
        <span className="font-bold text-lg">OTN Intern</span>
        <Link
          to="/intern/social-media"
          className="text-sm px-4 py-2 rounded-lg transition-all"
          style={{
            background: location.pathname.includes('social-media') ? BRAND.accent : 'transparent',
            opacity: location.pathname.includes('social-media') ? 1 : 0.7,
          }}
        >
          Social Media
        </Link>
        <Link
          to="/intern/bilder"
          className="text-sm px-4 py-2 rounded-lg transition-all"
          style={{
            background: location.pathname.includes('bilder') ? BRAND.accent : 'transparent',
            opacity: location.pathname.includes('bilder') ? 1 : 0.7,
          }}
        >
          Bilder-Galerie
        </Link>
        <button
          onClick={() => { sessionStorage.removeItem('intern_auth'); setAuth(false) }}
          className="ml-auto text-xs opacity-60 hover:opacity-100 transition-opacity"
        >
          Ausloggen
        </button>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  )
}
