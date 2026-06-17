import { CheckCircle, Users, Award, Heart } from 'lucide-react'

const values = [
  'Kundenkomfort und Zufriedenheit haben höchste Priorität',
  'Mitarbeiter werden als geschätzte Partner behandelt',
  'Weiterentwicklung handwerklicher Kompetenz in Orthopädie- und Schuhtechnik',
  'Umfassende Unterstützung bei Kostenträgern und Krankenkassen',
  'Moderne, barrierefreie Räumlichkeiten und Hausbesuchsoptionen',
  'Ausbildungsbetrieb in Handelskauf, Orthopädiemechanik und Schuhtechnik',
]

const testimonials = [
  { text: 'Kompetente, einfühlsame Beratung und individuelle Betreuung — ich fühle mich hier bestens versorgt.', name: 'Patient aus Neumünster' },
  { text: 'Das Team nimmt sich Zeit und geht auf meine Wünsche ein. Toller Service!', name: 'Patientin aus Bordesholm' },
  { text: 'Professionell, freundlich und schnell. Ich komme immer wieder gerne.', name: 'Patient aus Kaltenkirchen' },
]

export default function UeberUnsPage() {
  return (
    <main className="pt-16">
      <section className="bg-gradient-to-br from-[#003399] to-[#0d9488] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[#2dd4bf] font-semibold text-sm uppercase tracking-wider">Über uns</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">o.t.n. ...um Menschen zu helfen</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Seit 1996 Ihr kompetenter und zuverlässiger Partner in Schleswig-Holstein.
          </p>
        </div>
      </section>

      {/* Geschichte */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#003399] mb-6">Unsere Geschichte</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Die Orthopädie Technik Nord GmbH wurde 1996 gegründet. Aus einer kleinen orthopädischen Werkstatt ist ein erfolgreiches Sanitätshausunternehmen mit über 100 Mitarbeitern an sieben Standorten in Norddeutschland geworden.
              </p>
              <p className="text-gray-500 leading-relaxed mb-4">
                Im April 2021 feierten wir unser 25-jähriges Bestehen — ein Meilenstein, auf den wir stolz sind und der uns anspornt, weiterzumachen.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Allein in Neumünster betreiben wir vier Filialen. Unser Versorgungsgebiet erstreckt sich von Kaltenkirchen bis Büdelsdorf.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#003399] rounded-2xl p-6 text-white text-center">
                <div className="text-4xl font-bold text-[#2dd4bf] mb-2">1996</div>
                <div className="text-blue-200 text-sm">Gründungsjahr</div>
              </div>
              <div className="bg-[#0d9488] rounded-2xl p-6 text-white text-center">
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-teal-100 text-sm">Mitarbeiter</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                <div className="text-4xl font-bold text-[#003399] mb-2">7</div>
                <div className="text-gray-500 text-sm">Standorte</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                <div className="text-4xl font-bold text-[#003399] mb-2">7</div>
                <div className="text-gray-500 text-sm">Fachbereiche</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Führung */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#003399] mb-10 text-center">Führung & Team</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-[#003399] rounded-full flex items-center justify-center">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#003399] text-lg">Stefan Fehlandt</h3>
                  <p className="text-[#0d9488] text-sm">Orthopädiemeister · Inhaber</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Über 20 Jahre Erfahrung in der orthopädischen Versorgung. Spezialist für Prothesenwerkstatt und Orthopädietechnik.
              </p>
              <a href="tel:04321979449" className="mt-4 inline-block text-sm text-[#0d9488] hover:underline">04321/9794-49</a>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-[#0d9488] rounded-full flex items-center justify-center">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#003399] text-lg">Dr. Marco Weingarten</h3>
                  <p className="text-[#0d9488] text-sm">Sportwissenschaftler · Lauflabor</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Spezialist für Gangbildanalyse und Bewegungsoptimierung. Leitet das Lauflabor an der Zentrale in Neumünster.
              </p>
              <a href="mailto:info@o-t-n.de" className="mt-4 inline-block text-sm text-[#0d9488] hover:underline">info@o-t-n.de</a>
            </div>
          </div>
        </div>
      </section>

      {/* Werte */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#003399] mb-10 text-center">Unsere Werte</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {values.map((v) => (
              <div key={v} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-[#0d9488] shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#003399]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Was unsere Patienten sagen</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/10 rounded-2xl p-6 border border-white/10">
                <Heart className="w-5 h-5 text-[#2dd4bf] mb-3" />
                <p className="text-blue-100 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <p className="text-[#2dd4bf] text-xs font-medium">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
