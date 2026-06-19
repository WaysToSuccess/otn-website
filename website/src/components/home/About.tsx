import { CheckCircle } from 'lucide-react'

const highlights = [
  'Über 25 Jahre Erfahrung in der orthopädischen Versorgung',
  'Hochqualifizierte Fachkräfte und Meisterbetrieb',
  '8 Standorte für kurze Wege in Schleswig-Holstein',
  'Modernste Technik und individuelle Beratung',
  'Enge Zusammenarbeit mit Ärzten und Kliniken',
  'Kostenübernahme durch alle Krankenkassen',
]

export default function About() {
  return (
    <section id="ueber-uns" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#0d9488] font-semibold text-sm uppercase tracking-wider">Über uns</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mt-2 mb-6">
              Mehr als nur ein Ersatz
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Die Orthopädie Technik Nord GmbH steht seit über 25 Jahren für kompetente und einfühlsame Versorgung. Unser Team aus erfahrenen Orthopädietechnikern, Sanitätshausfachleuten und Pflegeexperten begleitet Sie auf dem Weg zu mehr Lebensqualität.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Ob Prothesen, Orthesen, Einlagen oder Pflegehilfsmittel — wir finden für jeden Menschen die passende Lösung. Dabei stehen Ihre Wünsche und Ihre Selbstständigkeit immer im Mittelpunkt.
            </p>
            <ul className="space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#0d9488] shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1a3a5c] rounded-2xl p-6 text-white text-center">
              <div className="text-4xl font-bold text-[#2dd4bf] mb-2">25+</div>
              <div className="text-blue-200 text-sm">Jahre Erfahrung</div>
            </div>
            <div className="bg-[#0d9488] rounded-2xl p-6 text-white text-center">
              <div className="text-4xl font-bold mb-2">8</div>
              <div className="text-teal-100 text-sm">Standorte</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
              <div className="text-4xl font-bold text-[#1a3a5c] mb-2">7</div>
              <div className="text-gray-500 text-sm">Fachbereiche</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
              <div className="text-4xl font-bold text-[#1a3a5c] mb-2">51.</div>
              <div className="text-gray-500 text-sm">Volkslauf in Folge</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
