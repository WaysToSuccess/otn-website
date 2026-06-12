import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Clock, Euro, User } from 'lucide-react'

const included = [
  'Fußauftritt und Fußgewölbeanalyse',
  'Beinachsenbeurteilung für Knie- und Hüftstabilität',
  'Becken- und Rumpfhaltungsanalyse',
  'Empfehlungen für Schuhwahl und Einlagenversorgung',
  'Kräftigungsübungen für muskuläre Dysbalancen',
]

export default function LauflaborPage() {
  return (
    <main className="pt-16">
      <section className="bg-gradient-to-br from-[#1a3a5c] to-[#0d9488] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link to="/leistungen" className="text-[#2dd4bf] text-sm hover:underline mb-3 inline-block">← Alle Leistungen</Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">Lauflabor</h1>
          <p className="text-blue-100 text-xl">Mehr Leistung. Weniger Beschwerden. Maximale Kontrolle über Ihre Bewegung.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-[#1a3a5c] mb-4">Professionelle Gangbildanalyse</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Das Lauflabor der Orthopädie Technik Nord GmbH bietet eine professionelle Lauf- und Bewegungsanalyse mit Hochgeschwindigkeitskameras und Spezialsoftware. Wir erkennen kleine biomechanische Auffälligkeiten, die Leistung und Gesundheit beeinflussen.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6">
                Geeignet für Einsteiger, ambitionierte Hobbyläufer und Profisportler. Wir geben individuell zugeschnittene Empfehlungen statt Standardaussagen.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Clock className="w-5 h-5 text-[#0d9488] mx-auto mb-2" />
                  <div className="font-bold text-[#1a3a5c]">~60 Min.</div>
                  <div className="text-gray-400 text-xs">Dauer</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Euro className="w-5 h-5 text-[#0d9488] mx-auto mb-2" />
                  <div className="font-bold text-[#1a3a5c]">109 €</div>
                  <div className="text-gray-400 text-xs">Kosten</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <User className="w-5 h-5 text-[#0d9488] mx-auto mb-2" />
                  <div className="font-bold text-[#1a3a5c]">Alle Level</div>
                  <div className="text-gray-400 text-xs">Zielgruppe</div>
                </div>
              </div>

              <h3 className="font-bold text-[#1a3a5c] text-lg mb-4">Inhalte der Analyse</h3>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#0d9488] shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="bg-[#1a3a5c] rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Ihr Ansprechpartner</h3>
                <p className="text-[#2dd4bf] font-semibold mb-1">Dr. Marco Weingarten</p>
                <p className="text-blue-200 text-sm mb-4">Sportwissenschaftler</p>
                <p className="text-blue-200 text-sm mb-4">Wendenstraße 1, 24539 Neumünster</p>
                <a href="tel:04321979449" className="block bg-white/10 hover:bg-white/20 text-white text-center py-3 rounded-xl transition-colors text-sm font-medium mb-2">
                  04321/9794-49 anrufen
                </a>
                <a href="mailto:info@o-t-n.de" className="block bg-[#0d9488] hover:bg-[#0f766e] text-white text-center py-3 rounded-xl transition-colors text-sm font-medium">
                  Termin anfragen
                </a>
              </div>

              <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                <h3 className="font-bold text-[#1a3a5c] mb-2">Tipp: Volkslauf 2026</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Bereiten Sie sich optimal auf den o.t.n. Volkslauf vor — mit einer Laufanalyse und dem kostenlosen Vorbereitungstraining!
                </p>
                <Link to="/volkslauf" className="inline-flex items-center gap-1 text-[#0d9488] text-sm font-medium hover:underline">
                  Zum Volkslauf <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
