import { useRef, useEffect, useState } from 'react'
import { MapPin, Ruler, Users, Euro, Trophy, Shirt, Dumbbell, Star } from 'lucide-react'
import { useInView, anim } from '../../hooks/useInView'

const facts = [
  { icon: MapPin, label: 'Veranstaltungsort', value: 'MTSV Olympia von 1859 e.V., Forstweg 5, Neumünster' },
  { icon: Ruler, label: 'Distanz', value: '5 km Rundkurs durch Park & Stadt' },
  { icon: Users, label: 'Kategorien', value: 'Einzel · Teams · Mixed · Unternehmen · Schulen' },
  { icon: Euro, label: 'Startgebühr', value: 'Ab 15 € · Kinder/Jugend ab 6 €' },
  { icon: Trophy, label: 'Auszeichnungen', value: 'Top 3 Pokale · Kreativstes Kostüm · Größtes Team' },
  { icon: Shirt, label: 'Teilnehmer-Shirt', value: 'Kostenloses Lauf-Shirt (solange Vorrat reicht)' },
]

const awards = [
  'Schnellster Einzelläufer (Damen / Herren)',
  'Schnellstes Team & größtes Team',
  'Schnellstes Unternehmen & Schule',
  'Kreativstes Kostüm / Outfit',
  'Älteste/r Teilnehmer/in',
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
      { threshold: 0.2 }
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
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms, box-shadow 0.2s`,
        boxShadow: hovered ? '0 8px 24px rgba(13,148,136,0.15)' : undefined,
      }}
      className="bg-white rounded-2xl p-5 border border-gray-100 flex items-start gap-4 cursor-default"
    >
      <div
        style={{
          transform: hovered ? 'rotate(8deg) scale(1.1)' : 'none',
          transition: 'transform 0.3s ease',
        }}
        className="w-11 h-11 bg-teal-50 rounded-xl flex items-center justify-center shrink-0"
      >
        <f.icon className="w-5 h-5 text-[#0d9488]" />
      </div>
      <div>
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{f.label}</p>
        <p className="font-semibold text-[#1a3a5c] text-sm leading-snug">{f.value}</p>
      </div>
    </div>
  )
}

export default function VlOverview() {
  const { ref: headRef, visible: headVisible } = useInView()
  const { ref: trainRef, visible: trainVisible } = useInView()
  const { ref: awardsRef, visible: awardsVisible } = useInView()

  return (
    <section id="uebersicht" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div ref={headRef} style={anim(headVisible, 0)} className="text-center mb-14">
          <span className="text-[#0d9488] font-semibold text-sm uppercase tracking-wider">Auf einen Blick</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mt-2 mb-4">Alles was Sie wissen müssen</h2>
        </div>

        {/* Fact cards — each animates individually */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {facts.map((f, i) => <FactCard key={f.label} f={f} index={i} />)}
        </div>

        {/* Training + Awards — slide in from sides */}
        <div className="grid md:grid-cols-2 gap-6">
          <div
            ref={trainRef}
            style={anim(trainVisible, 0, 'left')}
            className="bg-[#1a3a5c] rounded-2xl p-6 text-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"
                style={{ animation: trainVisible ? 'dumbbell 1.2s ease 400ms' : 'none' }}
              >
                <Dumbbell className="w-5 h-5 text-[#2dd4bf]" />
              </div>
              <h3 className="font-bold text-lg">Kostenloses Vorbereitungstraining</h3>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-3">
              Ab dem <span className="text-white font-semibold">27. Juli 2026</span> bieten wir 8 Wochen kostenloses Lauftraining an — jeden Montag um <span className="text-white font-semibold">18:00 Uhr</span> am MTSV Olympia Gelände.
            </p>
            <p className="text-blue-200 text-sm">Intervalltraining angepasst an alle Fitnesslevel. Für Anfänger und Fortgeschrittene geeignet.</p>
          </div>

          <div
            ref={awardsRef}
            style={anim(awardsVisible, 150, 'right')}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center"
                style={{ animation: awardsVisible ? 'starSpin 0.7s ease 300ms' : 'none' }}
              >
                <Star className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-bold text-lg text-[#1a3a5c]">Sonderauszeichnungen</h3>
            </div>
            <ul className="space-y-2">
              {awards.map((a, i) => (
                <li
                  key={a}
                  style={{
                    opacity: awardsVisible ? 1 : 0,
                    transform: awardsVisible ? 'none' : 'translateX(12px)',
                    transition: `opacity 0.4s ease ${300 + i * 80}ms, transform 0.4s ease ${300 + i * 80}ms`,
                  }}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <span className="w-1.5 h-1.5 bg-[#0d9488] rounded-full shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dumbbell {
          0%,100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg) scale(1.1); }
          75% { transform: rotate(15deg) scale(1.1); }
        }
        @keyframes starSpin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
        }
      `}</style>
    </section>
  )
}
