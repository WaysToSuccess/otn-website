import { useRef, useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useInView, anim } from '../../hooks/useInView'

const faqs = [
  { q: 'Wie melde ich mich an?', a: 'Die Anmeldung erfolgt online über das Race Result Anmeldeformular auf dieser Seite. Benötigt werden Name, Geburtsjahr, Geschlecht (optional), Verein/Firma (optional) und ein Notfallkontakt.' },
  { q: 'Welche Strecken gibt es?', a: 'Es gibt vier Distanzen: Bambini (400 m), Jugendlauf (1,2 km), Kurzstrecke (5 km) und Hauptlauf (10 km). Alle Strecken starten und enden am MTSV Olympia Gelände.' },
  { q: 'Wo und wann kann ich meine Startunterlagen abholen?', a: 'Am Veranstaltungstag (5. September 2026) ab 14:00 Uhr im Stadion des MTSV Olympia, Forstweg 5. Zusätzlich vorab möglich in der o.t.n Zentrale, Wendenstraße 1, 24539 Neumünster (Mittwoch 02.09, Donnerstag 03.09 und Freitag 04.09 – jeweils 14:00–17:00 Uhr).' },
  { q: 'Muss ich trainiert sein?', a: 'Nein! Der Volkslauf richtet sich an Freizeitläufer, Einsteiger und Familien. Wichtig ist, dass Sie dabei sind und Spaß haben. Zusätzlich bieten wir kostenlose Lauftrainings für Anfänger und Fortgeschrittene an – jeden Mittwoch ab 18:00 Uhr am MTSV Olympia, Forstweg 5, 24537 Neumünster (ab 8. Juli 2026).' },
  { q: 'Wie wird die Zeit gemessen?', a: 'Die Zeitmessung erfolgt professionell durch die sportservice hamburg GmbH mit Zeitmesschip. Die Ergebnisse sind live abrufbar.' },
  { q: 'Was passiert nach dem Lauf?', a: 'Ab 18:45 Uhr findet die Siegerehrung statt. Ab 19:00 Uhr öffnet das 1. Gartenstadt Open Air mit Musik und Verpflegung für alle. Mit Ihrer Startnummer sind Sie herzlich eingeladen – Duschen und Umkleiden sind vor Ort vorhanden.' },
  { q: 'Gibt es Parkplätze?', a: 'Parken auf dem Veranstaltungsgelände ist nicht möglich, bitte auf umliegende Parkflächen ausweichen.' },
  { q: 'Wohin gehen die Startgebühren?', a: 'Der Erlös wurde zu 100 % einem gemeinnützigen Zweck gespendet.' },
  { q: 'Welche medizinische Versorgung gibt es?', a: 'Ein Sanitätsdienst mit Rettungsfahrzeug ist vor Ort. Es gibt definierte Rettungswege und ein Notfalltelefon.' },
  { q: 'Kann ich als Laufteilnehmer an der Gartenstadt Open Air Party teilnehmen?', a: 'Mit Ihrer Startnummer sind Sie herzlich zum Open Air eingeladen. Externe Open Air Party Besucher zahlen 5 € extra per Abendkasse. Unter allen Open Air Tickets werden 3x 100€ Verlost.' },
]

function FAQItem({ faq, index, isOpen, onToggle }: {
  faq: typeof faqs[0]; index: number; isOpen: boolean; onToggle: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: `opacity 0.45s ease ${index * 55}ms, transform 0.45s ease ${index * 55}ms`,
      }}
    >
      <div
        className={`rounded-2xl overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'bg-white shadow-lg shadow-[#003399]/8 ring-1 ring-[#003399]/15'
            : 'bg-white shadow-sm hover:shadow-md ring-1 ring-gray-100 hover:ring-[#003399]/15'
        }`}
      >
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${index}`}
          id={`faq-trigger-${index}`}
          className="w-full flex items-center justify-between px-6 py-5 text-left group"
        >
          {/* Number badge */}
          <div className="flex items-center gap-4 pr-4">
            <span
              className={`flex-shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors duration-300 ${
                isOpen ? 'bg-[#003399] text-white' : 'bg-[#003399]/8 text-[#003399] group-hover:bg-[#003399]/15'
              }`}
            >
              {index + 1}
            </span>
            <span className={`font-semibold text-sm sm:text-base transition-colors duration-200 ${isOpen ? 'text-[#003399]' : 'text-gray-800 group-hover:text-[#003399]'}`}>
              {faq.q}
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 text-[#003399]' : 'text-gray-300 group-hover:text-[#003399]'}`}
          />
        </button>

        <div
          id={`faq-panel-${index}`}
          role="region"
          aria-labelledby={`faq-trigger-${index}`}
          style={{
            maxHeight: isOpen ? '300px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="px-6 pb-6 pt-0">
            <div className="ml-11 pl-4">
              <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VlFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const { ref: headRef, visible: headVisible } = useInView()
  const { ref: ctaRef, visible: ctaVisible } = useInView()

  return (
    <section className="py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headRef} style={anim(headVisible)} className="text-center mb-14">
          <span className="inline-block text-[#0d9488] font-semibold text-xs uppercase tracking-[0.2em] px-4 py-1.5 bg-[#0d9488]/8 rounded-full mb-4">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Häufige <span className="text-[#003399]">Fragen</span>
          </h2>
          <p className="text-gray-500 text-sm">Klicken Sie auf eine Frage für die Antwort.</p>
        </div>

        {/* Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          style={anim(ctaVisible, 100)}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            Noch eine Frage?{' '}
            <a href="#kontakt" className="text-[#003399] font-semibold hover:underline">
              Schreiben Sie uns →
            </a>
          </p>
        </div>

      </div>
    </section>
  )
}
