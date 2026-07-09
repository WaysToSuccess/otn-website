import { Link } from 'react-router-dom'
import InternLayout from './InternLayout'

const PAGES = [
  {
    to: '/intern/zeitungsartikel',
    title: 'Zeitungsartikel',
    description: 'Grafiken für Zeitungsartikel und Startnummern erstellen',
    icon: '📰',
  },
  {
    to: '/intern/status',
    title: 'Öffentlichkeits-Status',
    description: 'Übersicht: was Google indexiert und was privat bleibt',
    icon: '🔒',
  },
]

export default function InternOverviewPage() {
  return (
    <InternLayout>
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Interner Bereich</h1>
        <p className="text-gray-500 text-sm mb-8">Wähle einen Bereich aus:</p>
        <div className="flex flex-col gap-4">
          {PAGES.map(page => (
            <Link
              key={page.to}
              to={page.to}
              className="flex items-center gap-5 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <span className="text-3xl">{page.icon}</span>
              <div>
                <div className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                  {page.title}
                </div>
                <div className="text-sm text-gray-400 mt-0.5">{page.description}</div>
              </div>
              <span className="ml-auto text-gray-300 group-hover:text-blue-400 text-xl transition-colors">→</span>
            </Link>
          ))}
        </div>
      </div>
    </InternLayout>
  )
}
