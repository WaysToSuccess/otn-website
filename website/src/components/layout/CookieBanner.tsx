import { useState, useEffect } from 'react'

const STORAGE_KEY = 'otn_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) setVisible(true)
  }, [])

  const save = (decision: 'all' | 'necessary' | 'rejected') => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ decision, date: new Date().toISOString() }))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-3 sm:p-5">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl shadow-black/15 border border-gray-100 overflow-hidden">
        <div className="h-[3px] bg-gradient-to-r from-[#003399] to-[#0d9488]" />

        <div className="p-5 sm:p-6">
          <p className="text-gray-900 font-bold text-sm mb-1">Wir verwenden Cookies 🍪</p>
          <p className="text-gray-500 text-xs leading-relaxed">
            Technisch notwendige Cookies sind immer aktiv. Mit „Alle akzeptieren" stimmen Sie auch der Verwendung optionaler Analyse-Cookies zu (Art. 6 Abs. 1 lit. a DSGVO).{' '}
            {!expanded ? (
              <button onClick={() => setExpanded(true)} className="text-[#003399] hover:underline font-medium">
                Mehr erfahren
              </button>
            ) : (
              <span>
                Sie können Ihre Einwilligung jederzeit widerrufen. Mehr dazu in unserer{' '}
                <a href="/datenschutz" className="text-[#003399] hover:underline font-medium">
                  Datenschutzerklärung
                </a>
                .
              </span>
            )}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-2 mt-5">
            {/* Primary */}
            <button
              onClick={() => save('all')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#003399] hover:bg-[#0040cc] transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-[#003399]/20"
            >
              Alle akzeptieren
            </button>

            {/* Secondary */}
            <button
              onClick={() => save('necessary')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-[#003399] border border-[#003399]/30 hover:border-[#003399] hover:bg-[#003399]/5 transition-all"
            >
              Nur notwendige
            </button>

            {/* Tertiary */}
            <button
              onClick={() => save('rejected')}
              className="w-full sm:w-auto px-3 py-2.5 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors sm:ml-auto"
            >
              Ablehnen
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
