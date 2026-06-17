import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, Wrench, Activity, Heart, Footprints, Bike, Baby } from 'lucide-react'

const services = [
  { icon: ShoppingBag, title: 'Sanitätshaus', slug: 'sanitaetshaus', tagline: 'Alltagshilfen, Bandagen, Kompression und mehr', color: 'bg-blue-50 text-blue-600' },
  { icon: Wrench, title: 'Prothesen-Atelier', slug: 'prothesen-atelier', tagline: 'Modernste Prothesensysteme, individuell angepasst', color: 'bg-teal-50 text-teal-600' },
  { icon: Activity, title: 'Orthopädietechnik', slug: 'orthopaedietechnik', tagline: 'Maßgefertigte Orthesen und Korsetts', color: 'bg-indigo-50 text-indigo-600' },
  { icon: Heart, title: 'Reha & Pflege', slug: 'reha-pflege', tagline: 'Rehabilitations- und Pflegehilfsmittel', color: 'bg-rose-50 text-rose-600' },
  { icon: Footprints, title: 'Schuhtechnik', slug: 'schuhtechnik', tagline: 'Orthopädische Einlagen und Maßschuhe', color: 'bg-amber-50 text-amber-600' },
  { icon: Bike, title: 'Lauflabor', slug: 'lauflabor', tagline: 'Gangbildanalyse für mehr Leistung', color: 'bg-green-50 text-green-600' },
  { icon: Baby, title: 'Rund ums Kind', slug: 'rund-ums-kind', tagline: 'Versorgung für Kinder von Geburt an', color: 'bg-purple-50 text-purple-600' },
]

interface Props {
  slug: string
}

export default function ServicePage({ slug }: Props) {
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#003399] mb-4">Seite nicht gefunden</h1>
          <Link to="/leistungen" className="text-[#0d9488] hover:underline">← Zurück zu Leistungen</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-16">
      <section className="bg-gradient-to-br from-[#003399] to-[#0d9488] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/leistungen" className="text-[#2dd4bf] text-sm hover:underline mb-3 inline-block">← Alle Leistungen</Link>
          <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
            <service.icon className="w-8 h-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">{service.title}</h1>
          <p className="text-blue-100 text-xl">{service.tagline}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-500 text-lg mb-8">
            Für detaillierte Informationen zu diesem Bereich beraten wir Sie gerne persönlich in einer unserer Filialen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/filialen-kontakt" className="inline-flex items-center gap-2 bg-[#003399] hover:bg-[#0040cc] text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Termin vereinbaren <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:04321979449" className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-xl transition-colors">
              04321/9794-49 anrufen
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#003399] mb-6 text-center">Weitere Leistungen</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {services.filter((s) => s.slug !== slug).map((s) => (
              <Link key={s.slug} to={`/leistungen/${s.slug}`} className="bg-white rounded-xl p-3 text-center border border-gray-100 hover:border-[#0d9488] transition-colors group">
                <div className={`w-8 h-8 ${s.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <s.icon className="w-4 h-4" />
                </div>
                <p className="text-xs font-medium text-[#003399]">{s.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
