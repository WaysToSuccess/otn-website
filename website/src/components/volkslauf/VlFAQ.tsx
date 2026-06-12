import { useRef, useEffect, useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useInView, anim } from '../../hooks/useInView'

const faqs = [
  { q: 'Wie kann ich mich anmelden?', a: 'Die Anmeldung erfolgt online über das Anmeldeformular auf dieser Seite oder per E-Mail an volkslauf@o-t-n.de.' },
  { q: 'Muss ich trainiert sein, um teilzunehmen?', a: 'Nein! Der Volkslauf richtet sich an alle Hobbyläufer. Wichtig ist, dass Sie Spaß am Laufen haben.' },
  { q: 'Welche Altersgruppen gibt es?', a: 'Es gibt Wertungsgruppen für Frauen und Männer in verschiedenen Altersklassen sowie eine Schülerkategorie.' },
  { q: 'Was muss ich mitbringen?', a: 'Sportkleidung und Laufschuhe. Ihre Startnummer und den Chip erhalten Sie am Veranstaltungstag.' },
  { q: 'Gibt es Verpflegung auf der Strecke?', a: 'Ja, es gibt eine Wasserstation auf der Strecke sowie Obst und Getränke im Zielbereich.' },
  { q: 'Kann ich als Team teilnehmen?', a: 'Ja! Teams aus 2–5 Personen können sich gemeinsam anmelden und werden in der Teamwertung berücksichtigt.' },
  { q: 'Wie hoch ist die Startgebühr?', a: 'Die Startgebühr beträgt ab 15 € pro Person. Kinder/Jugendliche zahlen ab 6 €. Frühbucher erhalten einen Rabatt.' },
  { q: 'Gibt es genug Parkplätze?', a: 'Ja, direkt am Veranstaltungsgelände stehen ausreichend kostenlose Parkplätze zur Verfügung.' },
]

function FAQItem({ faq, index, isOpen, onToggle }: {
  faq: typeof faqs[0]; index: number; isOpen: boolean; onToggle: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const answerRef = useRef<HTMLDivElement>(null)

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
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: `opacity 0.45s ease ${index * 70}ms, transform 0.45s ease ${index * 70}ms`,
      }}
      className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:border-teal-200 transition-colors"
    >
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors ${isOpen ? 'bg-teal-50' : 'hover:bg-gray-50'}`}
      >
        <div className="flex items-center gap-3 pr-4">
          <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? 'text-[#0d9488]' : 'text-gray-300'}`} />
          <span className={`font-medium transition-colors ${isOpen ? 'text-[#0d9488]' : 'text-[#1a3a5c]'}`}>{faq.q}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-[#0d9488] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Smooth accordion */}
      <div
        ref={answerRef}
        style={{
          maxHeight: isOpen ? '200px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="px-6 pb-4 pt-1 text-gray-500 text-sm leading-relaxed border-t border-teal-100 ml-6">
          {faq.a}
        </div>
      </div>
    </div>
  )
}

export default function VlFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const { ref: headRef, visible: headVisible } = useInView()

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headRef} style={anim(headVisible)} className="text-center mb-14">
          <span className="text-[#0d9488] font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mt-2 mb-4">Häufige Fragen</h2>
          <p className="text-gray-400 text-sm">Alles Wichtige auf einen Blick — klicken Sie auf eine Frage.</p>
        </div>

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
      </div>
    </section>
  )
}
