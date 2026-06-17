import { useInView, anim } from '../../hooks/useInView'
import { ExternalLink, User, Calendar, Mail, Heart, Flag } from 'lucide-react'

const fields = [
  { icon: Flag, label: 'Laufauswahl', hint: 'Bambini · 5 km · 10 km' },
  { icon: User, label: 'Vor- und Nachname', hint: 'Vollständiger Name' },
  { icon: Calendar, label: 'Geburtsdatum', hint: 'TT.MM.JJJJ' },
  { icon: Mail, label: 'E-Mail-Adresse', hint: 'Für Bestätigung & Unterlagen' },
  { icon: Heart, label: 'Sponsor / Unterstützer', hint: 'Optional: Firma, Verein oder „Für mich selbst"' },
]

export default function VlRegister() {
  const { ref: headRef, visible: headVisible } = useInView()
  const { ref: formRef, visible: formVisible } = useInView()
  const { ref: infoRef, visible: infoVisible } = useInView()

  return (
    <section id="anmelden" className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={headRef} style={anim(headVisible)} className="text-center mb-14">
          <span className="inline-block text-[#0d9488] font-semibold text-xs uppercase tracking-[0.2em] px-4 py-1.5 bg-[#0d9488]/8 rounded-full mb-4">Anmeldung</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#003399] mt-2 mb-4">Jetzt einen Startplatz sichern</h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm">
            Anmeldung über Race Result, das offizielle Zeitmess- und Anmeldesystem für Laufveranstaltungen.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Info sidebar */}
          <div ref={infoRef} style={anim(infoVisible, 0, 'left')} className="lg:col-span-2 space-y-4">
            <div className="bg-[#003399] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Was wird abgefragt?</h3>
              <ul className="space-y-3">
                {fields.map(({ icon: Icon, label, hint }) => (
                  <li key={label} className="flex items-start gap-3 text-sm text-blue-200">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#2dd4bf]" />
                    </div>
                    <div>
                      <div className="font-semibold">{label}</div>
                      <div className="text-blue-300/70 text-xs">{hint}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-teal-50 rounded-2xl p-5 border border-teal-100">
              <h3 className="font-bold text-[#0d9488] mb-2 text-sm">Startgebühren</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>Bambini (400 m)</span>
                  <span className="font-semibold text-[#003399]">kostenlos</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>5 km / 10 km</span>
                  <span className="font-semibold text-[#003399]">15,00 €</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Kinder & Jugend</span>
                  <span className="font-semibold text-[#003399]">6,00 €</span>
                </div>
              </div>
              <p className="text-teal-600 text-xs mt-3">
                100 % der Einnahmen gehen an gemeinnützige Zwecke.
              </p>
            </div>
          </div>

          {/* Race Result embed placeholder */}
          <div ref={formRef} style={anim(formVisible, 120, 'right')} className="lg:col-span-3">
            <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden">

              {/* Placeholder header */}
              <div className="bg-[#003399] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 text-[#2dd4bf]" />
                  </div>
                  <span className="text-white font-semibold text-sm">Race Result · Anmeldeformular</span>
                </div>
                <span className="text-blue-300 text-xs border border-blue-300/30 rounded-full px-3 py-1">Wird eingebettet</span>
              </div>

              {/* Embed area */}
              <div className="p-8 text-center min-h-[400px] flex flex-col items-center justify-center gap-6">

                {/* Placeholder illustration */}
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                  <ExternalLink className="w-9 h-9 text-[#0d9488]" />
                </div>

                <div>
                  <h3 className="text-[#003399] font-bold text-lg mb-2">
                    Race Result Formular
                  </h3>
                  <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
                    Hier wird das offizielle Anmelde- und Ticketformular von <strong>Race Result</strong> eingebettet.
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    Ersetzen Sie diesen Bereich durch Ihren Race Result Embed-Code.
                  </p>
                </div>

                {/* Example embed code comment */}
                <div className="w-full bg-gray-900 rounded-xl p-4 text-left overflow-x-auto">
                  <p className="text-gray-400 text-xs mb-2">Embed-Code einfügen:</p>
                  <code className="text-[#2dd4bf] text-xs font-mono whitespace-pre-wrap break-all">
                    {'<iframe\n  src="https://my.raceresult.com/IHRE-EVENT-ID/registration"\n  width="100%" height="600"\n  frameborder="0" />'}
                  </code>
                </div>

                <a
                  href="https://my.raceresult.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm shadow-md hover:scale-105 active:scale-95"
                >
                  Zu Race Result
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
