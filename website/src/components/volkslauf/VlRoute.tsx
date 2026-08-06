import { useEffect, useState } from 'react'
import { MapPin, Flag, Droplets, Navigation } from 'lucide-react'
import { useInView, anim } from '../../hooks/useInView'
import { CONSENT_EVENT, embedsAllowed, setConsentDecision } from '../../lib/consent'

const MAPS_URL = 'https://www.google.com/maps/dir/?api=1&destination=Forstweg+5%2C+24537+Neum%C3%BCnster'

const infoCards = [
  {
    icon: Flag,
    color: 'bg-green-50',
    iconColor: 'text-green-600',
    title: 'Start & Ziel',
    text: 'MTSV Olympia von 1859 e.V.\nForstweg 5, 24537 Neumünster',
  },
  {
    icon: Droplets,
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
    title: 'Versorgung',
    text: 'Wasser- und Verpflegungsstation auf halber Strecke. Am Ziel: Obst, Getränke und Verpflegung.',
  },
  {
    icon: MapPin,
    color: 'bg-teal-50',
    iconColor: 'text-[#0d9488]',
    title: 'Parken',
    text: 'Parken auf dem Veranstaltungsgelände nicht möglich, bitte ausweichen.',
  },
]

export default function VlRoute() {
  const { ref: headRef, visible: headVisible } = useInView()
  const { ref: leftRef, visible: leftVisible } = useInView()
  const { ref: rightRef, visible: rightVisible } = useInView()
  const [mapAllowed, setMapAllowed] = useState(embedsAllowed)

  useEffect(() => {
    const onChange = () => setMapAllowed(embedsAllowed())
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={headRef} style={anim(headVisible)} className="text-center mb-14">
          <span className="inline-block text-[#0d9488] font-semibold text-xs uppercase tracking-[0.2em] px-4 py-1.5 bg-[#0d9488]/8 rounded-full mb-4">Strecke</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#003399] mt-2 mb-4">
            Die schönste Route durch Neumünster
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            5 km und 10 km Rundkurs durch Park und Stadtgebiet. Gut ausgeschildert, mit Verpflegungsstation auf halber Strecke.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Info cards — slide from left */}
          <div ref={leftRef} className="space-y-4">
            {infoCards.map((c, i) => (
              <div
                key={c.title}
                style={anim(leftVisible, i * 120, 'left')}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 ${c.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <c.icon className={`w-5 h-5 ${c.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#003399] mb-1">{c.title}</h3>
                  <p className="text-gray-500 text-sm whitespace-pre-line">{c.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map + buttons — slide from right */}
          <div ref={rightRef} style={anim(rightVisible, 100, 'right')} className="flex flex-col gap-3">
            <div
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-64"
              style={{
                opacity: rightVisible ? 1 : 0,
                transition: 'opacity 0.7s ease 200ms',
              }}
            >
              {mapAllowed ? (
                <iframe
                  title="MSTV Olympia 1965 e.V. – Forstweg 5, Neumünster"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=MSTV+Olympia+1965+eV,+Forstweg+5,+24537+Neumünster&hl=de&z=16&output=embed"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gray-50 text-center px-6">
                  <MapPin className="w-6 h-6 text-gray-400" />
                  <p className="text-gray-500 text-xs max-w-xs">
                    Beim Laden der Karte werden Daten an Google übertragen.{' '}
                    <a href="/datenschutz" className="text-[#003399] hover:underline">Mehr erfahren</a>
                  </p>
                  <button
                    type="button"
                    onClick={() => { setConsentDecision('all'); setMapAllowed(true) }}
                    className="text-xs font-semibold text-white bg-[#003399] hover:bg-[#0040cc] px-4 py-2 rounded-lg transition-colors"
                  >
                    Karte laden
                  </button>
                </div>
              )}
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              style={anim(rightVisible, 350, 'right')}
              className="flex items-center justify-center gap-2.5 bg-[#003399] hover:bg-[#0040cc] text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <Navigation className="w-5 h-5" />
              Route planen mit Google Maps
            </a>
            <a
              href="https://maps.apple.com/?daddr=Forstweg+5,+24537+Neumünster"
              target="_blank"
              rel="noreferrer"
              style={anim(rightVisible, 450, 'right')}
              className="flex items-center justify-center gap-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-all text-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <MapPin className="w-4 h-4" />
              In Apple Maps öffnen
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
