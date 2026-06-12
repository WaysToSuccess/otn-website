import { ArrowRight, Heart, Award, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1a3a5c] via-[#1e4976] to-[#0d9488] flex items-center pt-16 overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Logo */}
            <div className="mb-8">
              <img
                src="https://o-t-n.de/assets/images/j/otn_logo_neu_2011-az9c925dm6a9aw8.svg"
                alt="o.t.n. Orthopädie Technik Nord"
                className="h-14 w-auto brightness-0 invert"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>

            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#2dd4bf] rounded-full animate-pulse"></span>
              Seit 1996 — Ihr Partner in Schleswig-Holstein
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
              Für Freude und<br />
              <span className="text-[#2dd4bf]">Lebensqualität</span>
            </h1>

            <p className="text-[#2dd4bf]/80 text-xl font-medium italic mb-4">
              o.t.n. ...um Menschen zu helfen
            </p>

            <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-lg">
              Orthopädie Technik Nord GmbH — Ihr Fachbetrieb für orthopädische Hilfsmittel, Sanitätshaus und Rehabilitation. Kompetent und zuverlässig mit 7 Standorten in Norddeutschland.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/leistungen" className="inline-flex items-center justify-center gap-2 bg-white text-[#1a3a5c] font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
                Unsere Leistungen
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/filialen-kontakt" className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/20">
                Filiale finden
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex justify-center mb-2"><Heart className="w-6 h-6 text-[#2dd4bf]" /></div>
                <div className="text-2xl font-bold text-white">25+</div>
                <div className="text-blue-200 text-xs">Jahre Erfahrung</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2"><Users className="w-6 h-6 text-[#2dd4bf]" /></div>
                <div className="text-2xl font-bold text-white">7</div>
                <div className="text-blue-200 text-xs">Standorte</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2"><Award className="w-6 h-6 text-[#2dd4bf]" /></div>
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-blue-200 text-xs">Mitarbeiter</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              {/* Quick service overview */}
              <p className="text-white/60 text-xs uppercase tracking-widest mb-4">Unsere Fachbereiche</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {['Sanitätshaus', 'Prothesen-Atelier', 'Orthopädietechnik', 'Reha & Pflege', 'Schuhtechnik', 'Lauflabor'].map(s => (
                  <Link to={`/leistungen/${s.toLowerCase().replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/\s+/g,'-').replace('&-','')}`} key={s} className="bg-white/10 hover:bg-white/20 rounded-xl p-3 text-center transition-colors group">
                    <p className="text-white text-sm font-medium group-hover:text-[#2dd4bf] transition-colors">{s}</p>
                  </Link>
                ))}
              </div>

              {/* Volkslauf teaser */}
              <div className="bg-[#0d9488]/30 rounded-2xl p-4 border border-[#2dd4bf]/20">
                <p className="text-white/70 text-xs mb-1">Nächste Veranstaltung</p>
                <p className="text-white font-bold">51. o.t.n. Volkslauf</p>
                <p className="text-[#2dd4bf] text-sm">5. September 2026 · 10:00 Uhr</p>
                <Link to="/volkslauf" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mt-2 transition-colors">
                  Jetzt anmelden <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
