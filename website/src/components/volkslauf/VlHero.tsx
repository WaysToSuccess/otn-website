import { useEffect, useState } from 'react'
import { ArrowRight, Calendar, Info, MapPin, PartyPopper } from 'lucide-react'

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(target.getTime() - Date.now())
  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000)
    return () => clearInterval(id)
  }, [target])
  const total = Math.max(0, diff)
  return {
    d: Math.floor(total / 86400000),
    h: Math.floor((total % 86400000) / 3600000),
    m: Math.floor((total % 3600000) / 60000),
    s: Math.floor((total % 60000) / 1000),
  }
}

function CountBox({ value, label, delay }: { value: number; label: string; delay: number }) {
  const [on, setOn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setOn(true), delay); return () => clearTimeout(t) }, [delay])
  return (
    <div
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'none' : 'translateY(16px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
      className="bg-white/15 backdrop-blur-md rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-center border border-white/25 flex-1 min-w-0"
    >
      <div className="text-2xl sm:text-4xl font-extrabold text-white tabular-nums leading-none"
        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-white/65 text-xs mt-1.5 uppercase tracking-widest">{label}</div>
    </div>
  )
}

export default function VlHero() {
  const raceStart = new Date('2026-09-05T15:30:00')
  const { d, h, m, s } = useCountdown(raceStart)
  const [on, setOn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setOn(true), 80); return () => clearTimeout(t) }, [])

  const fade = (delay: number) => ({
    opacity: on ? 1 : 0,
    transform: on ? 'none' : 'translateY(18px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  })

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: '#002266' }}>
      {/* Background image — hidden on mobile via CSS to skip download */}
      <div
        className="hero-bg-image absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/o.t.n Laufbild neu.webp?v=20260623')`,
          animation: 'heroZoom 14s ease-out forwards',
        }}
      />

      {/* Light overlay at top for dark-blue text, dark at bottom for white counter/buttons */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/30 to-[#002080]/95" />

      {/* Content */}
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center pt-10 sm:pt-12 pb-14 sm:pb-18 flex flex-col items-center gap-3 sm:gap-4">

        {/* Veranstalter badge */}
        <div style={fade(60)} className="flex flex-wrap items-center justify-center gap-2.5 bg-white/85 backdrop-blur-sm px-4 py-2 rounded-full border border-[#003399]/20 shadow-sm">
          <img src="/images/o.t.n_Logo transparent.webp" alt="o.t.n" className="h-6 sm:h-7 w-auto object-contain shrink-0" />
          <span className="text-[#003399]/30 text-sm font-light">|</span>
          <img src="/images/MSTV_Olympia_Neumünster transparent.webp" alt="MSTV Olympia" className="h-6 sm:h-7 w-auto object-contain shrink-0" />
          <span className="text-[#003399] text-[11px] sm:text-xs font-semibold tracking-wide whitespace-nowrap">Veranstalter: o.t.n und MSTV Olympia 1859 e.V.</span>
        </div>

        {/* H1 */}
        <h1 style={fade(160)} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight flex flex-wrap items-center justify-center gap-3 sm:gap-5 pb-1">
          <span
            style={{
              background: 'linear-gradient(135deg, #003399 0%, #0055ff 60%, #003db3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(2px 2px 0 rgba(255,255,255,0.6))',
            }}
          >
            51. Volkslauf bei Olympia
          </span>
        </h1>

        {/* Info cards */}
        <div style={fade(300)} className="flex flex-col items-center gap-2 w-full">
          {/* 3 white cards in a row on desktop */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 w-full">
            <a
              href="#uebersicht"
              className="flex items-center gap-2.5 bg-white backdrop-blur-sm text-[#003399] text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl border border-[#003399]/15 font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all justify-center sm:justify-start"
            >
              <Info className="w-4 h-4 text-[#003399] shrink-0" />
              Kostenloses Lauftraining ab 8.7
            </a>
            <span className="flex items-center gap-2.5 bg-white backdrop-blur-sm text-[#003399] text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl border border-[#003399]/15 font-semibold shadow-md justify-center sm:justify-start">
              <Calendar className="w-4 h-4 text-[#003399] shrink-0" />
              5. September 2026 · 15:30 Uhr
            </span>
            <span className="flex items-center gap-2.5 bg-white backdrop-blur-sm text-[#003399] text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl border border-[#003399]/15 font-semibold shadow-md justify-center sm:justify-start">
              <MapPin className="w-4 h-4 text-[#003399] shrink-0" />
              Forstweg 5, 24537 Neumünster
            </span>
          </div>
          {/* Green pill below, centered */}
          <span className="flex items-center gap-2 bg-[#0d9488]/90 backdrop-blur-sm text-white text-xs sm:text-sm px-5 py-2.5 rounded-full font-semibold shadow-md">
            <PartyPopper className="w-3.5 h-3.5 shrink-0" />
            Gartenstadt Open Air mit DJ ab 19 Uhr
          </span>
        </div>

        {/* Countdown — on dark area */}
        <div style={fade(480)} className="flex justify-center gap-2 sm:gap-3 w-full">
          <CountBox value={d} label="Tage" delay={580} />
          <CountBox value={h} label="Stunden" delay={700} />
          <CountBox value={m} label="Minuten" delay={820} />
          <CountBox value={s} label="Sekunden" delay={940} />
        </div>

        {/* CTAs */}
        <div style={fade(860)} className="flex flex-col sm:flex-row gap-4 justify-center relative z-[9999]">
          <a
            href="#anmelden"
            className="inline-flex items-center justify-center gap-2 bg-[#003399] hover:bg-[#0040cc] text-white font-extrabold px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl transition-all text-sm sm:text-base hover:scale-105 active:scale-95 w-full sm:w-auto"
            style={{ animation: 'heroGlow 2s ease-in-out infinite' }}
          >
            Jetzt anmelden
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#uebersicht"
            className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/35 text-white font-semibold px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl transition-all border border-white/30 text-sm sm:text-base backdrop-blur-sm hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            Mehr erfahren
          </a>
        </div>
      </div>

      {/* Soft bottom fade — taller, softer */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* Scroll indicator — dark blue, sits in the white fade zone */}
      <div
        style={{ opacity: on ? 1 : 0, transition: 'opacity 0.6s ease 1400ms' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="w-7 h-11 border-2 border-[#003399] rounded-full flex justify-center pt-2 bg-[#003399]/10">
          <div className="w-1.5 h-3 bg-[#003399] rounded-full animate-bounce" />
        </div>
      </div>

      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.05); }
          to   { transform: scale(1); }
        }
        @keyframes heroGlow {
          0%,100% { box-shadow: 0 4px 24px rgba(0,51,153,0.5); }
          50%     { box-shadow: 0 0 28px 8px rgba(0,51,153,0.75), 0 6px 32px rgba(0,51,153,0.6); }
        }
      `}</style>
    </section>
  )
}
