import { MapPin, Phone, Clock } from 'lucide-react'

const branches = [
  {
    city: 'Zentrale Neumünster',
    address: 'Wendenstraße 1, 24539 Neumünster',
    phone: '04321/9794-49',
    hours: 'Mo–Fr 08:00–17:00',
    note: '',
  },
  {
    city: 'Neumünster – Kuhberg',
    address: 'Kuhberg 55, 24534 Neumünster',
    phone: '04321/5562211',
    hours: 'Mo/Di/Do/Fr 09–17 · Mi/Sa 09–13',
    note: '',
  },
  {
    city: 'Neumünster – Rendsburger Str.',
    address: 'Rendsburger Str. 2–10, 24534 Neumünster',
    phone: '04321/5583644',
    hours: 'Mo–Fr 09:00–13:00',
    note: '',
  },
  {
    city: 'Bordesholm',
    address: 'Bahnhofstraße 77, 24582 Bordesholm',
    phone: '04322/4449370',
    hours: 'Mo/Di/Do 09–17 · Mi/Fr variiert',
    note: '',
  },
  {
    city: 'Büdelsdorf',
    address: 'Hollerstr. 99, 24782 Büdelsdorf',
    phone: '04331/2017280',
    hours: 'Mo–Do 08–13 & 14–17 · Fr 08–15',
    note: '',
  },
  {
    city: 'Kaltenkirchen',
    address: 'Am Bahnhof 2, 24568 Kaltenkirchen',
    phone: '04191/5027674',
    hours: 'Mo/Di/Do 09–17 · Mi 09–13 · Fr 09–15',
    note: 'Schuhmacher: Mo & Do 14–17',
  },
  {
    city: 'Nortorf',
    address: 'Am Markt 6, 24589 Nortorf',
    phone: '04392/9161888',
    hours: 'Mo/Di/Do 09–17 · Mi 09–13 · Fr 09–15',
    note: 'Schuhmacher: Di 14–17',
  },
]

export default function Branches() {
  return (
    <section id="standorte" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#0d9488] font-semibold text-sm uppercase tracking-wider">Standorte</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#003399] mt-2 mb-4">
            Von Kaltenkirchen bis Büdelsdorf
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Unser Team erwartet Sie in 7 Filialen in Schleswig-Holstein.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {branches.map((b) => (
            <div key={b.city} className="border border-gray-100 rounded-2xl p-5 hover:border-[#0d9488] hover:shadow-sm transition-all group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-teal-50 group-hover:bg-teal-100 rounded-lg flex items-center justify-center shrink-0 transition-colors">
                  <MapPin className="w-4 h-4 text-[#0d9488]" />
                </div>
                <h3 className="font-semibold text-[#003399] text-sm">{b.city}</h3>
              </div>
              <p className="text-gray-400 text-xs mb-2">{b.address}</p>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>{b.hours}</span>
              </div>
              {b.note && <p className="text-xs text-[#0d9488] mt-1">{b.note}</p>}
              <a href={`tel:${b.phone.replace(/\//g, '').replace(/\s/g, '')}`} className="flex items-center gap-1.5 text-[#0d9488] text-xs mt-2 hover:underline">
                <Phone className="w-3.5 h-3.5" />
                {b.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
