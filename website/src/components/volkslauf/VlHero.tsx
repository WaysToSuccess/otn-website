import { useEffect, useState } from 'react'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(target.getTime() - Date.now())
  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000)
    return () => clearInterval(id)
  }, [target])
  const d = Math.max(0, Math.floor(diff / 86400000))
  const h = Math.max(0, Math.floor((diff % 86400000) / 3600000))
  const m = Math.max(0, Math.floor((diff % 3600000) / 60000))
  const s = Math.max(0, Math.floor((diff % 60000) / 1000))
  return { d, h, m, s }
}

function CountBox({ value, label, delay }: { value: number; label: string; delay: number }) {
  const [on, setOn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setOn(true), delay); return () => clearTimeout(t) }, [delay])
  return (
    <div
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'none' : 'translateY(20px) scale(0.9)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
      className="bg-white/20 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-center border border-white/30 min-w-[80px] shadow-lg"
    >
      <div
        className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums leading-none"
        style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-white/80 text-xs sm:text-sm mt-2 uppercase tracking-widest font-medium">{label}</div>
    </div>
  )
}

export default function VlHero() {
  const race = new Date('2026-09-05T10:00:00')
  const { d, h, m, s } = useCountdown(race)
  const [on, setOn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setOn(true), 80); return () => clearTimeout(t) }, [])

  const fade = (delay: number, from = 'translateY(22px)') => ({
    opacity: on ? 1 : 0,
    transform: on ? 'none' : from,
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  })

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: `url('/images/volkslauf-hero.png')`,
          animation: 'heroZoom 12s ease-out forwards',
        }}
      />

      {/* Layered overlay: strong at edges, lighter in center for image visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a5c]/80 via-[#0f4c75]/60 to-[#0d9488]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">

        {/* Badge */}
        <div style={fade(100)} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-sm px-5 py-2.5 rounded-full mb-8 border border-white/30 shadow-md">
          <span className="w-2 h-2 bg-[#2dd4bf] rounded-full animate-pulse shrink-0" />
          MTSV Olympia von 1859 e.V. · Laufen für einen guten Zweck
        </div>

        {/* Title */}
        <h1
          style={{ ...fade(250), textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight"
        >
          51. o.t.n.<br />
          <span className="text-[#2dd4bf]" style={{ textShadow: '0 4px 20px rgba(45,212,191,0.4)' }}>
            Volkslauf
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{ ...fade(400), textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
          className="text-white text-xl mb-6 font-medium"
        >
          100 % der Einnahmen gehen an einen guten Zweck
        </p>

        {/* Info pills */}
        <div style={fade(550)} className="flex flex-wrap justify-center gap-4 text-white text-sm mb-10">
          <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-sm">
            <Calendar className="w-4 h-4 text-[#2dd4bf]" />
            5. September 2026 · 10:00 Uhr
          </span>
          <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-sm">
            <MapPin className="w-4 h-4 text-[#2dd4bf]" />
            Forstweg 5, 24537 Neumünster
          </span>
        </div>

        {/* Countdown */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-14">
          <CountBox value={d} label="Tage" delay={700} />
          <CountBox value={h} label="Stunden" delay={850} />
          <CountBox value={m} label="Minuten" delay={1000} />
          <CountBox value={s} label="Sekunden" delay={1150} />
        </div>

        {/* Buttons */}
        <div style={fade(1200, 'translateY(16px)')} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#anmelden"
            id="anmelden"
            className="inline-flex items-center justify-center gap-2 bg-[#2dd4bf] hover:bg-[#14b8a6] text-[#1a3a5c] font-bold px-8 py-4 rounded-xl transition-all text-lg shadow-xl shadow-teal-900/40 hover:scale-105 active:scale-95"
          >
            Jetzt anmelden
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#uebersicht"
            className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-all border border-white/30 text-lg backdrop-blur-sm hover:scale-105 active:scale-95"
          >
            Mehr Infos
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={fade(1400)} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 bg-white/70 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Fade transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />

      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.05); }
          to   { transform: scale(1); }
        }
      `}</style>
    </section>
  )
}
