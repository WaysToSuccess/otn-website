import { useEffect, useRef, useState } from 'react'
import { useInView, anim } from '../../hooks/useInView'

const steps = [
  { time: '09:00', title: 'Startnummernausgabe', desc: 'Abholung von Startnummer und Zeitmesschip an der Ausgabestelle direkt am Veranstaltungsgelände.' },
  { time: '09:30', title: 'Gemeinsames Aufwärmen', desc: 'Professionelles Gruppenaufwärmen mit erfahrenen Trainern — für alle Teilnehmer empfohlen.' },
  { time: '10:00', title: 'Offizieller Startschuss', desc: 'Der Lauf beginnt! Alle Kategorien starten gemeinsam auf der 5 km Rundstrecke.' },
  { time: '11:30', title: 'Zielschluss', desc: 'Letzter Zeitpunkt für eine offizielle Wertung. Danach ist das Ziel weiterhin geöffnet.' },
  { time: '12:00', title: 'Siegerehrung & Tombola', desc: 'Pokalübergabe an die Top 3 jeder Kategorie sowie eine große Tombola mit attraktiven Preisen.' },
]

function Step({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

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

  const delay = index * 180

  return (
    <div
      ref={ref}
      className="flex gap-6 sm:gap-10 items-start relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateX(-20px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {/* Time */}
      <div className="w-20 sm:w-28 shrink-0 text-right pt-2">
        <span
          className="text-2xl sm:text-3xl font-extrabold tabular-nums leading-none"
          style={{
            color: visible ? '#0d9488' : '#d1d5db',
            transition: `color 0.4s ease ${delay + 200}ms`,
          }}
        >
          {step.time}
        </span>
        <span className="block text-xs text-gray-400 mt-0.5 uppercase tracking-wider">Uhr</span>
      </div>

      {/* Number circle */}
      <div className="relative flex flex-col items-center">
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-10 font-bold text-base sm:text-lg shadow-md"
          style={{
            background: visible ? '#1a3a5c' : '#e5e7eb',
            color: visible ? '#fff' : '#9ca3af',
            transform: visible ? 'scale(1)' : 'scale(0.7)',
            transition: `background 0.3s ease ${delay + 150}ms, color 0.3s ease ${delay + 150}ms, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${delay + 150}ms`,
          }}
        >
          {index + 1}
        </div>
        {/* Connector line that "fills" as visible */}
        {index < steps.length - 1 && (
          <div className="w-0.5 flex-1 min-h-[48px] bg-gray-100 mt-2 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 bg-[#0d9488]"
              style={{
                height: visible ? '100%' : '0%',
                transition: `height 0.6s ease ${delay + 400}ms`,
              }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-10">
        <h3
          className="text-xl sm:text-2xl font-bold mb-2 transition-colors"
          style={{ color: visible ? '#1a3a5c' : '#9ca3af', transition: `color 0.4s ease ${delay + 200}ms` }}
        >
          {step.title}
        </h3>
        <p className="text-gray-500 text-base leading-relaxed">{step.desc}</p>
      </div>
    </div>
  )
}

export default function VlSchedule() {
  const { ref: headRef, visible: headVisible } = useInView()

  return (
    <section id="zeitplan" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headRef} style={anim(headVisible)} className="text-center mb-16">
          <span className="text-[#0d9488] font-semibold text-sm uppercase tracking-wider">Zeitplan</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mt-2 mb-4">Ablauf des Tages</h2>
          <p className="text-gray-500">Alles was Sie für den 5. September 2026 wissen müssen.</p>
        </div>

        <div>
          {steps.map((step, i) => (
            <Step key={step.time} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
