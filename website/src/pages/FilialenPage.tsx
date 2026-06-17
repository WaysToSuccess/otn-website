import { MapPin, Phone, Clock, Mail } from 'lucide-react'

const branches = [
  {
    name: 'Zentrale Neumünster',
    address: 'Wendenstraße 1',
    city: '24539 Neumünster',
    phone: '04321/9794-49',
    fax: '04321/9794-47',
    email: 'info@o-t-n.de',
    hours: [
      { days: 'Mo – Fr', time: '08:00 – 17:00 Uhr' },
    ],
    note: '',
    maps: 'https://www.google.com/maps/search/?api=1&query=Wendenstraße+1+24539+Neumünster',
  },
  {
    name: 'Neumünster – Kuhberg',
    address: 'Kuhberg 55',
    city: '24534 Neumünster',
    phone: '04321/5562211',
    fax: '',
    email: '',
    hours: [
      { days: 'Mo / Di / Do / Fr', time: '09:00 – 17:00 Uhr' },
      { days: 'Mi / Sa', time: '09:00 – 13:00 Uhr' },
    ],
    note: 'Samstag 13.06.2026 geschlossen',
    maps: 'https://www.google.com/maps/search/?api=1&query=Kuhberg+55+24534+Neumünster',
  },
  {
    name: 'Neumünster – Rendsburger Str.',
    address: 'Rendsburger Str. 2–10',
    city: '24534 Neumünster',
    phone: '04321/5583644',
    fax: '',
    email: '',
    hours: [
      { days: 'Mo – Fr', time: '09:00 – 13:00 Uhr' },
    ],
    note: '',
    maps: 'https://www.google.com/maps/search/?api=1&query=Rendsburger+Straße+2+24534+Neumünster',
  },
  {
    name: 'Bordesholm',
    address: 'Bahnhofstraße 77',
    city: '24582 Bordesholm',
    phone: '04322/4449370',
    fax: '',
    email: '',
    hours: [
      { days: 'Mo / Di / Do', time: '09:00 – 13:00 & 14:00 – 17:00' },
      { days: 'Mi / Fr', time: 'variiert' },
    ],
    note: '',
    maps: 'https://www.google.com/maps/search/?api=1&query=Bahnhofstraße+77+24582+Bordesholm',
  },
  {
    name: 'Büdelsdorf',
    address: 'Hollerstr. 99',
    city: '24782 Büdelsdorf',
    phone: '04331/2017280',
    fax: '',
    email: '',
    hours: [
      { days: 'Mo – Do', time: '08:00 – 13:00 & 14:00 – 17:00' },
      { days: 'Fr', time: '08:00 – 15:00 Uhr' },
    ],
    note: 'Parkplatz hinter dem Gebäude',
    maps: 'https://www.google.com/maps/search/?api=1&query=Hollerstraße+99+24782+Büdelsdorf',
  },
  {
    name: 'Kaltenkirchen',
    address: 'Am Bahnhof 2',
    city: '24568 Kaltenkirchen',
    phone: '04191/5027674',
    fax: '',
    email: '',
    hours: [
      { days: 'Mo / Di / Do', time: '09:00 – 13:00 & 14:00 – 17:00' },
      { days: 'Mi', time: '09:00 – 13:00' },
      { days: 'Fr', time: '09:00 – 15:00' },
    ],
    note: 'Schuhmacher: Mo & Do 14–17 Uhr',
    maps: 'https://www.google.com/maps/search/?api=1&query=Am+Bahnhof+2+24568+Kaltenkirchen',
  },
  {
    name: 'Nortorf',
    address: 'Am Markt 6',
    city: '24589 Nortorf',
    phone: '04392/9161888',
    fax: '',
    email: '',
    hours: [
      { days: 'Mo / Di / Do', time: '09:00 – 13:00 & 14:00 – 17:00' },
      { days: 'Mi', time: '09:00 – 13:00' },
      { days: 'Fr', time: '09:00 – 15:00' },
    ],
    note: 'Schuhmacher: Di 14–17 Uhr',
    maps: 'https://www.google.com/maps/search/?api=1&query=Am+Markt+6+24589+Nortorf',
  },
]

export default function FilialenPage() {
  return (
    <main className="pt-16">
      <section className="bg-gradient-to-br from-[#003399] to-[#0d9488] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[#2dd4bf] font-semibold text-sm uppercase tracking-wider">Standorte & Kontakt</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">Filialen & Kontakt</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Von Kaltenkirchen bis Büdelsdorf: Unser Team erwartet Sie in 7 Filialen in Schleswig-Holstein.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {branches.map((b) => (
              <div key={b.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#0d9488]" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[#003399]">{b.name}</h2>
                    <p className="text-gray-400 text-sm">{b.address}, {b.city}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-[#0d9488] shrink-0 mt-0.5" />
                    <a href={`tel:${b.phone}`} className="hover:text-[#0d9488] transition-colors">{b.phone}</a>
                  </div>
                  {b.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-[#0d9488] shrink-0" />
                      <a href={`mailto:${b.email}`} className="hover:text-[#0d9488] transition-colors">{b.email}</a>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    <Clock className="w-3.5 h-3.5" /> Öffnungszeiten
                  </div>
                  {b.hours.map((h, i) => (
                    <div key={i} className="flex justify-between text-sm text-gray-600">
                      <span className="text-gray-400">{h.days}</span>
                      <span className="font-medium">{h.time}</span>
                    </div>
                  ))}
                </div>

                {b.note && (
                  <p className="text-[#0d9488] text-xs mb-3">{b.note}</p>
                )}

                <a
                  href={b.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#003399] hover:bg-[#0040cc] text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Route planen
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
