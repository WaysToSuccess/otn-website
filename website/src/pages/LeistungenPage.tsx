import { Link } from 'react-router-dom'
import { Heart, Wrench, Activity, Bike, Footprints, Baby, ShoppingBag, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: ShoppingBag,
    title: 'Sanitätshaus',
    slug: 'sanitaetshaus',
    tagline: 'Ihr Wohlbefinden ist unser Ziel',
    description: 'Ausgewählte Gesundheitsprodukte, die Schmerzen lindern, sichere Bewegung ermöglichen und soziale Teilhabe fördern. Bandagen, Orthesen, Kompressionsstrümpfe, Alltagshilfen und mehr.',
    color: 'bg-blue-50 text-blue-600',
    contact: 'Dr. Marco Weingarten',
  },
  {
    icon: Wrench,
    title: 'Prothesen-Atelier',
    slug: 'prothesen-atelier',
    tagline: 'Wir bringen Sie in Bewegung',
    description: 'Individuelle Prothesenversorgung mit integriertem Dynamiklabor, Übungsparcours und eigenem Orthopädiewerkstatt. Modernste Systeme wie C-Leg, Genium X3 und Kenevo.',
    color: 'bg-teal-50 text-teal-600',
    contact: 'Stefan Fehlandt',
  },
  {
    icon: Activity,
    title: 'Orthopädietechnik',
    slug: 'orthopaedietechnik',
    tagline: 'Individuelle Lösungen für optimale Versorgung',
    description: 'Maßgefertigte Orthesen, Korsetts und Hilfsmittel. Individuelle Anpassung durch erfahrene Orthopädietechniker für bestmögliche Unterstützung.',
    color: 'bg-indigo-50 text-indigo-600',
    contact: 'Stefan Fehlandt',
  },
  {
    icon: Heart,
    title: 'Reha & Pflege',
    slug: 'reha-pflege',
    tagline: 'Selbstständigkeit erhalten und fördern',
    description: 'Umfassende Beratung und Versorgung mit Rehabilitations- und Pflegehilfsmitteln. Für zu Hause, im Alltag und für die professionelle Pflege.',
    color: 'bg-rose-50 text-rose-600',
    contact: '',
  },
  {
    icon: Footprints,
    title: 'Schuhtechnik',
    slug: 'schuhtechnik',
    tagline: 'Gesund gehen — von Anfang an',
    description: 'Orthopädische Einlagen nach Maß, Maßschuhe und Schuhzurichtungen. Für gesundes, schmerzfreies Gehen und optimale Druckverteilung.',
    color: 'bg-amber-50 text-amber-600',
    contact: '',
  },
  {
    icon: Bike,
    title: 'Lauflabor',
    slug: 'lauflabor',
    tagline: 'Mehr Leistung. Weniger Beschwerden.',
    description: 'Professionelle Gangbildanalyse mit Hochgeschwindigkeitskameras und Spezialsoftware. Ca. 60 Minuten, 109 €. Für Einsteiger bis Profis.',
    color: 'bg-green-50 text-green-600',
    contact: 'Dr. Marco Weingarten',
  },
  {
    icon: Baby,
    title: 'Rund ums Kind',
    slug: 'rund-ums-kind',
    tagline: 'Kindgemäß. Einfühlsam. Kompetent.',
    description: 'Spezialisierte Versorgung für Kinder von Geburt an. Kindgerechte Hilfsmittel, individuelle Anpassung und einfühlsame Beratung für die ganze Familie.',
    color: 'bg-purple-50 text-purple-600',
    contact: '',
  },
]

export default function LeistungenPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#003399] to-[#0d9488] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[#2dd4bf] font-semibold text-sm uppercase tracking-wider">Leistungen</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">Unser Leistungsangebot</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Sieben Fachbereiche unter einem Dach — kompetent, individuell und mit über 25 Jahren Erfahrung.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/leistungen/${s.slug}`}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 group"
              >
                <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <h2 className="font-bold text-[#003399] text-xl mb-1">{s.title}</h2>
                <p className="text-[#0d9488] text-sm font-medium mb-3">{s.tagline}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.description}</p>
                <div className="flex items-center gap-1 text-[#003399] text-sm font-medium group-hover:gap-2 transition-all">
                  Mehr erfahren <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#003399] mb-4">Nicht sicher, welcher Bereich für Sie passt?</h2>
          <p className="text-gray-500 mb-6">Wir beraten Sie gerne und finden gemeinsam die beste Lösung für Ihre Situation.</p>
          <Link to="/filialen-kontakt" className="inline-flex items-center gap-2 bg-[#003399] hover:bg-[#0040cc] text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            Termin vereinbaren <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
