import { ArrowRight, MapPin, Clock, Star } from 'lucide-react'

const jobs = [
  { title: 'Orthopädietechniker/in (m/w/d)', location: 'Neumünster', type: 'Vollzeit', dept: 'Orthopädietechnik' },
  { title: 'Sanitätshausfachverkäufer/in (m/w/d)', location: 'Neumünster / Filialen', type: 'Vollzeit', dept: 'Sanitätshaus' },
  { title: 'Orthopädieschuhmachermeister/in (m/w/d)', location: 'Neumünster', type: 'Vollzeit', dept: 'Schuhtechnik' },
  { title: 'Pflegefachkraft (m/w/d)', location: 'Alle Standorte', type: 'Vollzeit / Teilzeit', dept: 'Reha & Pflege' },
  { title: 'Auszubildende/r Handelskaufmann/-frau', location: 'Neumünster', type: 'Ausbildung', dept: 'Sanitätshaus' },
  { title: 'Auszubildende/r Orthopädiemechaniker/in', location: 'Neumünster', type: 'Ausbildung', dept: 'Orthopädietechnik' },
]

const benefits = [
  'Sicherer Arbeitsplatz in einem wachsenden Familienunternehmen',
  'Fort- und Weiterbildungsmöglichkeiten',
  'Familiäres Betriebsklima mit flachen Hierarchien',
  'Flexible Arbeitszeiten nach Absprache',
  'Faire Vergütung und attraktive Zusatzleistungen',
  'Moderne Arbeitsausstattung an allen Standorten',
]

export default function JobsPage() {
  return (
    <main className="pt-16">
      <section className="bg-gradient-to-br from-[#003399] to-[#0d9488] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[#2dd4bf] font-semibold text-sm uppercase tracking-wider">Karriere</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">Lust auf einen Job, zu dem man gerne geht?</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Werden Sie Teil unseres Teams. Über 100 Mitarbeiter an 7 Standorten freuen sich auf Verstärkung.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#003399] mb-8">Aktuelle Stellen</h2>
          <div className="space-y-4">
            {jobs.map((j) => (
              <div key={j.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-bold text-[#003399] text-lg mb-1">{j.title}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#0d9488]" />{j.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#0d9488]" />{j.type}</span>
                    <span className="bg-teal-50 text-[#0d9488] px-2 py-0.5 rounded-full text-xs font-medium">{j.dept}</span>
                  </div>
                </div>
                <a
                  href={`mailto:info@o-t-n.de?subject=Bewerbung: ${j.title}`}
                  className="shrink-0 inline-flex items-center gap-2 bg-[#003399] hover:bg-[#0040cc] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
                >
                  Bewerben <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#003399] mb-8">Was wir bieten</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <Star className="w-5 h-5 text-[#0d9488] shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">{b}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-[#003399] rounded-2xl p-8 text-center">
            <h3 className="text-white font-bold text-xl mb-2">Keine passende Stelle dabei?</h3>
            <p className="text-blue-200 mb-5">Wir freuen uns jederzeit über Initiativbewerbungen!</p>
            <a
              href="mailto:info@o-t-n.de?subject=Initiativbewerbung"
              className="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Initiativbewerbung senden <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
