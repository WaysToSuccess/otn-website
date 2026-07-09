import { User, Calendar, Mail, Heart, Flag } from 'lucide-react'

const fields = [
  { icon: Flag, label: 'Laufauswahl', hint: 'Bambini · 5 km · 10 km' },
  { icon: User, label: 'Vor- und Nachname', hint: 'Vollständiger Name' },
  { icon: Calendar, label: 'Geburtsdatum', hint: 'TT.MM.JJJJ' },
  { icon: Mail, label: 'E-Mail-Adresse', hint: 'Für Bestätigung & Unterlagen' },
  { icon: Heart, label: 'Sponsor / Unterstützer', hint: 'Optional: Firma, Verein oder „Für mich selbst"' },
]

export default function VlRegister() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <span className="inline-block text-[#2dd4bf] font-semibold text-xs uppercase tracking-[0.2em] px-4 py-1.5 bg-white/10 rounded-full mb-4">Anmeldung</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">Jetzt einen Startplatz sichern</h2>
          <p className="text-white/70 max-w-lg mx-auto text-sm">
            Anmeldung über Race Result, das offizielle Zeitmess- und Anmeldesystem für Laufveranstaltungen.
          </p>
          <p className="mt-3 text-white/90 font-semibold text-sm">
            Der Erlös wird zu 100 % einem gemeinnützigen Zweck gespendet.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Info sidebar */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/10 rounded-2xl p-6 text-white border border-white/15">
              <h3 className="font-bold text-lg mb-4">Was wird abgefragt?</h3>
              <ul className="space-y-3">
                {fields.map(({ icon: Icon, label, hint }) => (
                  <li key={label} className="flex items-start gap-3 text-sm text-white/80">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#2dd4bf]" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{label}</div>
                      <div className="text-white/50 text-xs">{hint}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/10 rounded-2xl p-5 border border-white/15">
              <h3 className="font-bold text-[#2dd4bf] mb-2 text-sm">Startgebühren</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/80">
                  <span>Bambini (400 m)</span>
                  <span className="font-semibold text-white">2,00 €</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>5 km / 10 km</span>
                  <span className="font-semibold text-white">15,00 €</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Kinder & Jugend</span>
                  <span className="font-semibold text-white">6,00 €</span>
                </div>
              </div>
              <p className="text-[#2dd4bf] text-xs mt-3">
                Der Erlös wird zu 100 % einem gemeinnützigen Zweck gespendet.
              </p>
            </div>
          </div>

          {/* Race Result embed */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/20 bg-white overflow-hidden shadow-sm">
              <div className="bg-white/10 px-6 py-4 flex items-center gap-3 border-b border-white/15">
                <div className="w-2 h-2 bg-[#2dd4bf] rounded-full animate-pulse" />
                <span className="text-white font-semibold text-sm">Race Result · Anmeldeformular</span>
              </div>
              <iframe
                src="https://my.raceresult.com/407322/registration"
                width="100%"
                height="600"
                frameBorder="0"
                loading="lazy"
                title="Race Result Anmeldung"
                className="block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
