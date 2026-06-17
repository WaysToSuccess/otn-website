import { ArrowRight, Star } from 'lucide-react'

const benefits = [
  'Sicherer Arbeitsplatz in einem wachsenden Unternehmen',
  'Fort- und Weiterbildungsmöglichkeiten',
  'Familiäres Betriebsklima mit flachen Hierarchien',
  'Flexible Arbeitszeiten möglich',
]

export default function Career() {
  return (
    <section id="karriere" className="py-20 bg-[#003399]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#2dd4bf] font-semibold text-sm uppercase tracking-wider">Karriere</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
              Lust auf einen Job, zu dem man gerne geht?
            </h2>
            <p className="text-blue-200 leading-relaxed mb-8">
              Wir suchen engagierte Menschen, die mit Herz und Fachkompetenz unsere Patienten begleiten möchten. Werden Sie Teil unseres Teams!
            </p>
            <ul className="space-y-3 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-[#2dd4bf] shrink-0 mt-0.5" />
                  <span className="text-blue-100 text-sm">{b}</span>
                </li>
              ))}
            </ul>
            <a href="mailto:info@o-t-n.de?subject=Stellenbewerbung" className="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Jetzt bewerben
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <h3 className="text-white font-semibold text-lg mb-6">Aktuelle Stellen</h3>
            <div className="space-y-4">
              {[
                'Orthopädietechniker/in (m/w/d)',
                'Sanitätshausfachverkäufer/in (m/w/d)',
                'Schuhmachermeister/in (m/w/d)',
                'Pflegefachkraft (m/w/d)',
              ].map((job) => (
                <div key={job} className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
                  <span className="text-white text-sm">{job}</span>
                  <ArrowRight className="w-4 h-4 text-[#2dd4bf]" />
                </div>
              ))}
            </div>
            <p className="text-blue-300 text-xs mt-4">Weitere Stellen auf Anfrage</p>
          </div>
        </div>
      </div>
    </section>
  )
}
