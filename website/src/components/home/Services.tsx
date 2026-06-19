import { Heart, Wrench, Activity, Bike, Footprints, Baby, ShoppingBag } from 'lucide-react'

const services = [
  {
    icon: ShoppingBag,
    title: 'Sanitätshaus',
    description: 'Umfassendes Sortiment an medizinischen Hilfsmitteln, Bandagen, Orthesen und Pflegeprodukten für Ihr Wohlbefinden.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Wrench,
    title: 'Prothesen-Atelier',
    description: 'Individuelle Prothesenversorgung mit modernster Technik. Wir fertigen und passen Prothesen für Arm und Bein präzise an.',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: Activity,
    title: 'Orthopädietechnik',
    description: 'Maßgefertigte orthopädische Hilfsmittel und Korsetts. Individuelle Anpassung für optimale Versorgung.',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: Heart,
    title: 'Reha & Pflege',
    description: 'Beratung und Versorgung mit Rehabilitationshilfsmitteln sowie Pflegehilfsmitteln für zu Hause.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Footprints,
    title: 'Schuhtechnik',
    description: 'Orthopädische Einlagen, Maßschuhe und Schuhzurichtungen für gesundes und schmerzfreies Gehen.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Bike,
    title: 'Lauflabor',
    description: 'Professionelle Laufanalyse mit modernster Technik. Optimieren Sie Ihren Laufstil und vermeiden Sie Verletzungen.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Baby,
    title: 'Rund ums Kind',
    description: 'Spezialisierte Versorgung für Kinder von Geburt an. Kindgemäße Hilfsmittel mit einfühlsamer Beratung.',
    color: 'bg-purple-50 text-purple-600',
  },
]

export default function Services() {
  return (
    <section id="leistungen" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#0d9488] font-semibold text-sm uppercase tracking-wider">Unsere Leistungen</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mt-2 mb-4">
            Mehr als nur Versorgung
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Wir bieten umfassende Lösungen für Ihre Gesundheit und Mobilität — von der Beratung bis zur maßgefertigten Versorgung.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group cursor-pointer">
              <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#1a3a5c] text-lg mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
