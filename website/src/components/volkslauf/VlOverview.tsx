import { useRef, useEffect, useState } from 'react'
import { MapPin, Ruler, Users, Shield, Trophy, Music } from 'lucide-react'
import { useInView, anim } from '../../hooks/useInView'

const sponsorLogos = [
  { name: 'H-Projektierung', logo: '/images/Sponsor/H-Projektierung Logo Transparent.png' },
  { name: 'Rohrstar', logo: '/images/Sponsor/RohrStar Rorreinigung transparent Logo.png' },
  { name: 'Netkom', logo: '/images/Sponsor/Netkom_Logo transparent.png' },
  { name: 'Glaus', logo: '/images/Sponsor/glaus_logo transparent.png' },
  { name: 'PerfectOne', logo: '/images/Sponsor/perfectone-werbeagentur-removebg-preview.png' },
  { name: 'JUZO', logo: '/images/Sponsor/juzo_logo transparent.png' },
  { name: 'Provinzial', logo: '/images/Sponsor/provinzial_nord_logo-removebg-preview.png' },
  { name: 'MKS Bauelemente', logo: '/images/Sponsor/mks_bauelemente transparent.png' },
  { name: 'Össur', logo: '/images/Sponsor/ossur logo transparent.png' },
  { name: 'Bauerfeind', logo: '/images/Sponsor/Bauerfeind_Logo Transparent.png' },
  { name: 'Bäckerei Tackmann', logo: '/images/Sponsor/Tackmann_Bäckerei_Logo Transparent.png' },
  { name: 'VR Bank', logo: '/images/Sponsor/VR_Bank_zwischen_den_Meeren Logo Transparent.png' },
  { name: 'MediCar', logo: '/images/Sponsor/MediCar Logo transparent.png' },
  { name: 'Transcoject', logo: '/images/Sponsor/transcoject Logo transparent.png' },
]

const facts = [
  { icon: MapPin, label: 'Veranstaltungsort', value: 'MTSV Olympia · Forstweg 5, 24537 Neumünster' },
  { icon: Ruler, label: 'Strecken', value: 'Bambini 400 m · 5 km · 10 km' },
  { icon: Users, label: 'Teilnehmer', value: 'ab 1000 Personen · Familien, Vereine, Firmen' },
  { icon: Trophy, label: 'Auszeichnungen', value: 'Siegerehrung mit Pokalen · Race Result Zeitmessung' },
  { icon: Shield, label: 'Sicherheit', value: 'Sanitätsdienst & Rettungsfahrzeug vor Ort' },
  { icon: Music, label: 'Open Air', value: 'Ab 19:00 Uhr · 1. Gartenstadt Open Air' },
]

const distances = [
  { dist: '400 m', label: 'Bambini', desc: 'Für die jüngsten Sportler', color: '#2dd4bf' },
  { dist: '5 km', label: 'Freizeit', desc: 'Für Einsteiger & Familien', color: '#0d9488' },
  { dist: '10 km', label: 'Hauptlauf', desc: 'Für Vereine & Firmen', color: '#003399' },
]

function FactCard({ f, index }: { f: typeof facts[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`,
        boxShadow: hovered ? '0 8px 28px rgba(13,148,136,0.15)' : '0 1px 4px rgba(0,0,0,0.04)',
      }}
      className="bg-white rounded-2xl p-5 border border-gray-100 flex items-start gap-4 cursor-default"
    >
      <div
        style={{ transform: hovered ? 'rotate(8deg) scale(1.15)' : 'none', transition: 'transform 0.3s ease' }}
        className="w-11 h-11 bg-teal-50 rounded-xl flex items-center justify-center shrink-0"
      >
        <f.icon className="w-5 h-5 text-[#0d9488]" />
      </div>
      <div>
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{f.label}</p>
        <p className="font-semibold text-[#003399] text-sm leading-snug">{f.value}</p>
      </div>
    </div>
  )
}

export default function VlOverview() {
  const { ref: headRef, visible: headVisible } = useInView()
  const { ref: distRef, visible: distVisible } = useInView()

  return (
    <section id="uebersicht" className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={headRef} style={anim(headVisible, 0)} className="text-center mb-14">
          <span className="inline-block text-[#0d9488] font-semibold text-xs uppercase tracking-[0.2em] px-4 py-1.5 bg-[#0d9488]/8 rounded-full mb-4">Auf einen Blick</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#003399] mt-2 mb-4">Alles was Sie wissen müssen</h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm">
            Drei Distanzen, ein Ziel: Sport, Gemeinschaft, guter Zweck. Mit dem 1. Gartenstadt Open Air danach.
          </p>
        </div>

        {/* Distance cards */}
        <div ref={distRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {distances.map((d, i) => (
            <div
              key={d.dist}
              style={{
                opacity: distVisible ? 1 : 0,
                transform: distVisible ? 'none' : 'translateY(28px)',
                transition: `opacity 0.55s ease ${i * 120}ms, transform 0.55s ease ${i * 120}ms`,
              }}
              className="bg-white rounded-2xl p-6 border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="text-4xl font-extrabold mb-1"
                style={{ color: d.color }}
              >
                {d.dist}
              </div>
              <div className="font-bold text-[#003399] text-base mb-1">{d.label}</div>
              <div className="text-gray-400 text-xs">{d.desc}</div>
              <div
                className="mt-3 h-1 rounded-full mx-auto w-12"
                style={{ background: d.color, opacity: 0.4 }}
              />
            </div>
          ))}
        </div>

        {/* Fact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {facts.map((f, i) => <FactCard key={f.label} f={f} index={i} />)}
        </div>
      </div>

      {/* ── Sponsor Carousel ── */}
      <div className="relative mt-16 overflow-hidden">
        {/* fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, white, transparent)' }} />

        <div className="flex gap-12 items-center py-6" style={{ animation: 'sponsorScroll 30s linear infinite', width: 'max-content' }}>
          {[...sponsorLogos, ...sponsorLogos].map((s, i) => (
            <img
              key={i}
              src={s.logo}
              alt={s.name}
              title={s.name}
              className="h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              style={{ maxWidth: 120 }}
            />
          ))}
        </div>
      </div>

      {/* ── Wave overlap into next section ── */}
      <div className="relative -mb-1 pointer-events-none" style={{ marginTop: '-2px' }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-20 block">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>

      <style>{`
        @keyframes sponsorScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
