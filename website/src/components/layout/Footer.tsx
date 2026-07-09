import { Mail, MapPin, Calendar } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#002080] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">

          <div>
            <p className="text-blue-300 text-sm leading-relaxed">
              51. o.t.n Volkslauf<br />
              Veranstalter: MTSV Olympia Neumünster, o.t.n, Gartenstadt
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xs mb-4 text-white/60 uppercase tracking-wider">Veranstaltung</h3>
            <ul className="space-y-2.5 text-sm text-blue-300">
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#2dd4bf] shrink-0" />
                5. September 2026
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2dd4bf] shrink-0" />
                Forstweg 5, 24537 Neumünster
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2dd4bf] shrink-0" />
                <a href="mailto:info@otn-olympia-volkslauf.de" className="hover:text-white transition-colors">
                  info@otn-olympia-volkslauf.de
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-xs mb-4 text-white/60 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {[
                ['/#uebersicht', 'Übersicht'],
                ['/#anmelden', 'Anmeldung'],
                ['/#zeitplan', 'Zeitplan'],
                ['/#strecke', 'Strecke'],
                ['/#faq', 'FAQ'],
                ['/#kontakt', 'Kontakt'],
                ['/ausschreibung', 'Ausschreibung'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-blue-300 hover:text-[#2dd4bf] transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-blue-400">
          <p>© 2026 MTSV Olympia Neumünster · o.t.n · Gartenstadt. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <a href="/impressum" className="hover:text-white transition-colors">Impressum</a>
            <a href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
