import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1a3a5c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <img
                src="https://o-t-n.de/assets/images/j/otn_logo_neu_2011-az9c925dm6a9aw8.svg"
                alt="o.t.n. Orthopädie Technik Nord"
                className="h-10 w-auto brightness-0 invert"
                onError={(e) => {
                  const t = e.currentTarget
                  t.style.display = 'none'
                  const fb = t.nextElementSibling as HTMLElement | null
                  if (fb) fb.style.display = 'block'
                }}
              />
              <span className="hidden text-white font-semibold text-lg">o.t.n.</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-3">
              o.t.n. ...um Menschen zu helfen
            </p>
            <p className="text-blue-300 text-xs leading-relaxed">
              Seit 1996 Ihr kompetenter Partner für Gesundheit, Sport und Bewegung in Schleswig-Holstein.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors text-xs font-bold">f</a>
              <a href="https://instagram.com/o.t.n_gmbh" target="_blank" rel="noreferrer" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors text-xs font-bold">ig</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-blue-100">Leistungen</h3>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li><Link to="/leistungen/sanitaetshaus" className="hover:text-white transition-colors">Sanitätshaus</Link></li>
              <li><Link to="/leistungen/prothesen-atelier" className="hover:text-white transition-colors">Prothesen-Atelier</Link></li>
              <li><Link to="/leistungen/orthopaedietechnik" className="hover:text-white transition-colors">Orthopädietechnik</Link></li>
              <li><Link to="/leistungen/reha-pflege" className="hover:text-white transition-colors">Reha & Pflege</Link></li>
              <li><Link to="/leistungen/schuhtechnik" className="hover:text-white transition-colors">Schuhtechnik</Link></li>
              <li><Link to="/leistungen/lauflabor" className="hover:text-white transition-colors">Lauflabor</Link></li>
              <li><Link to="/leistungen/rund-ums-kind" className="hover:text-white transition-colors">Rund ums Kind</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-blue-100">Unternehmen</h3>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li><Link to="/ueber-o-t-n" className="hover:text-white transition-colors">Über uns</Link></li>
              <li><Link to="/filialen-kontakt" className="hover:text-white transition-colors">Alle Standorte</Link></li>
              <li><Link to="/jobs" className="hover:text-white transition-colors">Karriere</Link></li>
              <li><Link to="/volkslauf" className="hover:text-white transition-colors text-[#2dd4bf]">Volkslauf 2026</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-blue-100">Kontakt</h3>
            <ul className="space-y-3 text-blue-200 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Wendenstraße 1<br />24539 Neumünster</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+494321979449" className="hover:text-white transition-colors">04321/9794-49</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:info@o-t-n.de" className="hover:text-white transition-colors">info@o-t-n.de</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-blue-300 text-sm">
          <p>© 2026 Orthopädie Technik Nord GmbH. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <a href="/impressum" className="hover:text-white transition-colors">Impressum</a>
            <a href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
            <a href="/bildnachweis" className="hover:text-white transition-colors">Bildnachweis</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
