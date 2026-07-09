import { useEffect, useRef } from 'react'
import { useInView, anim } from '../../hooks/useInView'
import { Music } from 'lucide-react'

const steps = [
  { time: '10:00', title: 'Aufbau der Veranstaltung', desc: 'Aufbau des Veranstaltungsgeländes auf dem Olympia Platz.' },
  { time: '14:00', title: 'Startnummernausgabe', desc: 'Abholung in der o.t.n Zentrale – Wendenstr. 1, 24539 Neumünster. Mittwoch, Donnerstag und Freitag in der Laufwoche (02.09, 03.09 und 04.09) von 14:00 – 17:00 Uhr.' },
  { time: '15:45', title: 'Begrüßung durch o.t.n und Olympia', desc: 'Offizielle Begrüßung durch o.t.n und den MTSV Olympia im Stadion.' },
  { time: '16:15', title: 'Start Bambinilauf', desc: 'Startschuss für den Bambinilauf im Stadion.' },
  { time: '17:00', title: 'Start 5 km & 10 km', desc: 'Offizieller Startschuss im Stadion. Zeitmessung via sportservice hamburg GmbH.' },
  { time: '18:30', title: 'Zieleinlauf beendet', desc: 'Letzter offizieller Zieleinlauf. Einsatz Security im Stadion.' },
  { time: '18:45', title: 'Auswertung & Siegerehrung', desc: 'Auswertung und anschließende Siegerehrung im Stadion.' },
  { time: '19:00', title: 'Einlass Gartenstadt Open Air', desc: 'Einlass zum 1. Gartenstadt Open Air auf dem Parkplatz / Gelände.', highlight: true },
  { time: '19:30', title: 'Gartenstadt Open Air Start', desc: 'Musik, Stimmung und gemeinsames Feiern nach dem Lauf.', highlight: true },
  { time: '01:00', title: 'Ende der Veranstaltung', desc: 'Offizielles Ende des 1. Gartenstadt Open Air.' },
]

// First highlight index (step 5) → color change at ~71% of steps
const HIGHLIGHT_FROM = 8
const COLOR_CHANGE_PCT = (HIGHLIGHT_FROM / (steps.length - 1)) * 100

const CIRCLE = 36
const LEFT = 80

export default function VlSchedule() {
  const { ref: headRef, visible: headVisible } = useInView()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const circleRefs = useRef<(HTMLDivElement | null)[]>([])
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const update = () => {
      const wrapper = wrapperRef.current
      const fill = fillRef.current
      if (!wrapper || !fill) return

      const vh = window.innerHeight
      const trigger = vh * 0.65

      // --- PHASE 1: all reads (no writes yet) ---
      const wRect = wrapper.getBoundingClientRect()
      const stepRects = stepRefs.current.map(el => el?.getBoundingClientRect() ?? null)

      // --- PHASE 2: all writes (no reads after this) ---
      const totalHeight = wRect.height
      const scrolled = trigger - wRect.top
      const pct = Math.min(1, Math.max(0, scrolled / totalHeight))
      fill.style.height = `${pct * 100}%`

      steps.forEach((step, i) => {
        const stepEl = stepRefs.current[i]
        const circleEl = circleRefs.current[i]
        const sRect = stepRects[i]
        if (!stepEl || !circleEl || !sRect) return

        const passed = sRect.top <= trigger
        const color = step.highlight ? '#0d9488' : '#003399'

        circleEl.style.background = passed ? color : '#e5e7eb'
        circleEl.style.color = passed ? '#fff' : '#9ca3af'
        circleEl.style.transform = passed ? 'scale(1)' : 'scale(0.82)'

        const timeEl = stepEl.querySelector<HTMLElement>('[data-time]')
        const titleEl = stepEl.querySelector<HTMLElement>('[data-title]')
        if (timeEl) timeEl.style.color = passed ? color : '#d1d5db'
        if (titleEl) titleEl.style.color = passed ? color : '#9ca3af'
      })
    }

    // defer initial call to after first paint to avoid forced reflow on load
    const raf = requestAnimationFrame(update)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', update)
    }
  }, [])

  return (
    <section className="py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headRef} style={anim(headVisible)} className="text-center mb-16">
          <span className="inline-block text-[#0d9488] font-semibold text-xs uppercase tracking-[0.2em] px-4 py-1.5 bg-[#0d9488]/8 rounded-full mb-4">Zeitplan</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#003399] mt-2 mb-4">Ablauf des 5. September 2026</h2>
          <p className="text-gray-500 text-sm">Von Startnummerausgabe zum Gartenstadt Open Air am 5. September 2026.</p>
        </div>

        {/* Timeline wrapper */}
        <div ref={wrapperRef} className="relative">

          {/* Single track line */}
          <div
            className="absolute overflow-hidden"
            style={{ left: LEFT - 1, top: CIRCLE / 2, bottom: CIRCLE / 2, width: 2, background: '#e5e7eb' }}
          >
            {/* Fill — gradient blue → teal at highlight boundary */}
            <div
              ref={fillRef}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '0%',
                transition: 'height 0.12s linear',
                background: `linear-gradient(
                  to bottom,
                  #003399 0%,
                  #003399 ${COLOR_CHANGE_PCT}%,
                  #0d9488 ${COLOR_CHANGE_PCT}%,
                  #0d9488 100%
                )`,
              }}
            />
          </div>

          {steps.map((step, i) => (
            <div
              key={step.time + step.title}
              ref={el => { stepRefs.current[i] = el }}
              className="relative flex items-start"
              style={{
                paddingLeft: LEFT + CIRCLE / 2 + 20,
                paddingBottom: i === steps.length - 1 ? 0 : 36,
              }}
            >
              {/* Circle */}
              <div
                ref={el => { circleRefs.current[i] = el }}
                className="absolute flex items-center justify-center rounded-full font-bold text-sm shadow-md"
                style={{
                  left: LEFT - CIRCLE / 2,
                  top: 0,
                  width: CIRCLE,
                  height: CIRCLE,
                  background: '#e5e7eb',
                  color: '#9ca3af',
                  transform: 'scale(0.82)',
                  transition: 'background 0.25s ease, color 0.25s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                  zIndex: 1,
                }}
              >
                {step.highlight ? <Music className="w-4 h-4" /> : i + 1}
              </div>

              {/* Time */}
              <div
                className="absolute text-right"
                style={{ right: `calc(100% - ${LEFT - CIRCLE / 2 - 8}px)`, top: 8 }}
              >
                <span
                  data-time
                  className="text-base sm:text-xl font-extrabold tabular-nums leading-none block"
                  style={{ color: '#d1d5db', transition: 'color 0.25s ease' }}
                >
                  {step.time}
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Uhr</span>
              </div>

              {/* Content */}
              <div className={`${step.highlight ? 'bg-teal-50 border border-teal-100 rounded-xl px-4 py-3' : 'pt-1'}`}>
                <h3
                  data-title
                  className="text-base sm:text-lg font-bold mb-1"
                  style={{ color: '#9ca3af', transition: 'color 0.25s ease' }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
