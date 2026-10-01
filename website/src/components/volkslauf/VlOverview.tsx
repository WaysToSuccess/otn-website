import { useRef, useEffect, useState } from 'react'
import { MapPin, Ruler, Users, Shield, Trophy, Music, PersonStanding } from 'lucide-react'
import { useInView, anim } from '../../hooks/useInView'

const sponsorLogos = [
  { name: 'H-Projektierung', logo: '/images/Sponsor/Dabei/H-Projektierung Logo Transparent.webp' },
  { name: 'Doksbau', logo: '/images/Sponsor/Dabei/doksbau logo transparent.png' },
  { name: 'JUZO', logo: '/images/Sponsor/Dabei/juzo_logo transparent.png' },
  { name: 'Brandes', logo: '/images/Sponsor/Dabei/Brandes_logo transparent.webp' },
  { name: 'Bauerfeind', logo: '/images/Sponsor/Dabei/Bauerfeind_Logo Transparent.png' },
  { name: 'Farbenzauber', logo: '/images/Sponsor/Dabei/Farbenzauber.png' },
  { name: 'ARAG', logo: '/images/Sponsor/Dabei/ARAG_Logo transparent.png' },
  { name: 'Glaus', logo: '/images/Sponsor/Dabei/glaus_logo transparent.webp' },
  { name: 'VR Bank', logo: '/images/Sponsor/Dabei/VR_Bank_zwischen_den_Meeren logo transparent.webp' },
  { name: 'Netkom', logo: '/images/Sponsor/Dabei/Netkom_Logo transparent.webp' },
  { name: 'Provinzial', logo: '/images/Sponsor/Dabei/Provinzial_Logo_transparent neu.png' },
  { name: 'MKS Bauelemente', logo: '/images/Sponsor/Dabei/mks_bauelemente transparent.webp' },
  { name: 'Ossur', logo: '/images/Sponsor/Dabei/ossur logo transparent.webp' },
  { name: 'Tackmann Backerei', logo: '/images/Sponsor/Dabei/Tackmann_Bäckerei_Logo Transparent.png' },
  { name: 'Lithon Betonwerk', logo: '/images/Sponsor/Dabei/Lithon_Betonwerk_Logo transparent.webp' },
  { name: 'Mirek Bau', logo: '/images/Sponsor/Dabei/Mirek_Bau_logo transparent.webp' },
  { name: 'Perfectone Werbeagentur', logo: '/images/Sponsor/Dabei/perfectone-werbeagentur-removebg-preview.png' },
  { name: 'Transcoject', logo: '/images/Sponsor/Dabei/transcoject Logo transparent.webp' },
  { name: 'WVK', logo: '/images/Sponsor/Dabei/WVK logo transparent.webp' },
  { name: 'Meyers', logo: '/images/Sponsor/Dabei/Meyers-Logo.png' },
  { name: 'Schrott und Metallhandel Holstein', logo: '/images/Sponsor/Dabei/Schrott und Metallhandel Holstein.jpg' },
  { name: 'Lootsquad', logo: '/images/Sponsor/Dabei/lootsquad-logo-removebg-preview.png' },
  { name: 'MediCar', logo: '/images/Sponsor/Dabei/MediCar Logo transparent.webp' },
  { name: 'M. Fehrs', logo: '/images/Sponsor/Dabei/M. Fehrs Logo NEU.png' },
]

const distances = [
  { dist: '400 m', label: 'Bambini', desc: 'Für die jüngsten Sportler', color: '#2dd4bf' },
  { dist: '1,2 km', label: 'Jugendlauf', desc: 'Für Kinder & Jugendliche', color: '#f59e0b' },
  { dist: '5 km', label: 'Kurzstrecke', desc: 'Für Einsteiger & Familien', color: '#0d9488' },
  { dist: '10 km', label: 'Hauptlauf', desc: 'Für Vereine & Firmen', color: '#003399' },
]

const facts = [
  { icon: PersonStanding, label: 'Kostenlose Lauftrainings', value: 'Ab 8. Juli · Jeden Mittwoch um 18:00 Uhr · Für Einsteiger und Fortgeschrittene' },
  { icon: MapPin, label: 'Veranstaltungsort', value: 'MTSV Olympia · Forstweg 5, 24537 Neumünster' },
  { icon: Ruler, label: 'Strecken', value: 'Bambini 400 m · Jugendlauf 1,2 km · 5 km · 10 km' },
  { icon: Users, label: 'Teilnehmer', value: 'Sportler, Familien, Vereine, Firmen' },
  { icon: Trophy, label: 'Auszeichnungen', value: 'Siegerehrung mit Pokalen, Medaillen und Urkunden · Zeitmessung' },
  { icon: Shield, label: 'Sicherheit', value: 'Sanitätsdienst & Rettungsfahrzeug vor Ort' },
  { icon: Music, label: 'Open Air', value: 'Einlass ab 19:00 Uhr · 1. Gartenstadt Open Air', highlight: true },
]

function FactCard({ f, index }: { f: typeof facts[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const hl = (f as any).highlight === true

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
        boxShadow: hovered
          ? hl ? '0 8px 28px rgba(13,148,136,0.40)' : '0 8px 28px rgba(13,148,136,0.15)'
          : hl ? '0 2px 12px rgba(13,148,136,0.22)' : '0 1px 4px rgba(0,0,0,0.04)',
        background: hl ? 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)' : 'white',
      }}
      className={`rounded-2xl p-5 flex items-start gap-4 cursor-default ${hl ? '' : 'border border-gray-100'}`}
    >
      <div
        style={{ transform: hovered ? 'rotate(8deg) scale(1.15)' : 'none', transition: 'transform 0.3s ease' }}
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${hl ? 'bg-white/20' : 'bg-teal-50'}`}
      >
        <f.icon className={`w-5 h-5 ${hl ? 'text-white' : 'text-[#0d9488]'}`} />
      </div>
      <div>
        <p className={`text-xs uppercase tracking-wider mb-1 ${hl ? 'text-white/70' : 'text-gray-500'}`}>{f.label}</p>
        <p className={`font-semibold text-sm leading-snug ${hl ? 'text-white' : 'text-[#003399]'}`}>{f.value}</p>
      </div>
    </div>
  )
}

export default function VlOverview() {
  const { ref: headRef, visible: headVisible } = useInView()
  const { ref: distRef, visible: distVisible } = useInView()

  return (
    <section className="pt-24 pb-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={headRef} style={anim(headVisible, 0)} className="text-center mb-14">
          <span className="inline-block text-[#0d9488] font-semibold text-xs uppercase tracking-[0.2em] px-4 py-1.5 bg-[#0d9488]/8 rounded-full mb-4">Auf einen Blick</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#003399] mt-2 mb-4">Alles was Sie wissen müssen</h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm">
            Vier Distanzen, ein Ziel: Sport, Gemeinschaft, guter Zweck. Mit dem 1. Gartenstadt Open Air danach.
          </p>
          <p className="text-gray-400 text-xs mt-3">Die einzelnen Läufe sind farblich unterschieden.</p>
        </div>

        {/* Distance cards */}
        <div ref={distRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {distances.map((d, i) => (
            <div
              key={d.dist}
              style={{
                opacity: distVisible ? 1 : 0,
                transform: distVisible ? 'none' : 'translateY(28px)',
                transition: `opacity 0.55s ease ${i * 120}ms, transform 0.55s ease ${i * 120}ms`,
              }}
              className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="text-2xl sm:text-4xl font-extrabold mb-1 whitespace-nowrap"
                style={{ color: d.color }}
              >
                {d.dist}
              </div>
              <div className="font-bold text-[#003399] text-base mb-1">{d.label}</div>
              <div
                className="mt-3 h-1 rounded-full mx-auto w-12"
                style={{ background: d.color, opacity: 0.4 }}
              />
            </div>
          ))}
        </div>

        {/* Fact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {facts.slice(0, 6).map((f, i) => <FactCard key={f.label} f={f} index={i} />)}
        </div>
        {facts.length > 6 && (
          <div className="flex justify-center mt-4">
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <FactCard f={facts[6]} index={6} />
            </div>
          </div>
        )}
      </div>

      {/* ── Sponsor Carousel — z-index 0 (ganz hinten), direkt an der Welle ── */}
      <div className="relative mt-16" style={{ position: 'relative', zIndex: 0, overflow: 'hidden' }}>
        <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" style={{ background: 'linear-gradient(to right, white, transparent)', zIndex: 1 }} />
        <div className="absolute inset-y-0 right-0 w-24 pointer-events-none" style={{ background: 'linear-gradient(to left, white, transparent)', zIndex: 1 }} />

        <div
          className="flex gap-12 items-center py-6"
          aria-hidden="true"
          style={{ animation: 'sponsorScroll 36s linear infinite', width: 'max-content', willChange: 'transform' }}
        >
          {[...sponsorLogos, ...sponsorLogos, ...sponsorLogos].map((s, i) => (
            <img
              key={i}
              src={s.logo}
              alt=""
              title={s.name}
              loading="lazy"
              decoding="async"
              width={120}
              height={40}
              className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              style={{ maxWidth: 120 }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes sponsorScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  )
}
