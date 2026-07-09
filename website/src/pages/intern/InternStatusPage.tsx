import InternLayout from './InternLayout'

const PUBLIC = [
  { path: '/', label: 'Startseite', note: 'Vollständig indexiert, in Sitemap' },
  { path: '/ausschreibung', label: 'Ausschreibung', note: 'Vollständig indexiert, in Sitemap' },
]

const PRIVATE_PAGES = [
  { path: '/impressum', label: 'Impressum', note: 'noindex, nofollow — robots.txt geblockt' },
  { path: '/datenschutz', label: 'Datenschutz', note: 'noindex, nofollow — robots.txt geblockt' },
  { path: '/intern', label: 'Intern (Übersicht)', note: 'noindex, nofollow — passwortgeschützt' },
  { path: '/intern/zeitungsartikel', label: 'Zeitungsartikel', note: 'noindex, nofollow — passwortgeschützt' },
]

const BLOCKED_IMAGES = [
  { path: '/images/privat/', label: 'Bilder: privat/', note: 'robots.txt Disallow + Googlebot-Image geblockt' },
  { path: '/images/Sponsor/Bearbeitung - Raus/', label: 'Bilder: Sponsor/Bearbeitung - Raus/', note: 'robots.txt Disallow + Googlebot-Image geblockt' },
  { path: '/images/favicon o.t.n/', label: 'Bilder: favicon o.t.n/', note: 'robots.txt Disallow' },
]

const AI_BOTS = [
  'GPTBot', 'ChatGPT-User', 'Google-Extended', 'CCBot',
  'anthropic-ai', 'FacebookBot', 'Bytespider', 'PerplexityBot',
  'Applebot-Extended', 'Amazonbot', 'Googlebot-Image',
]

const FAVICON = [
  { file: 'favicon-96x96 - o.t.n.png', size: '96×96 px', note: 'Primär — Google Site-Icon (quadratisch)' },
  { file: 'favicon - o.t.n.ico', size: 'multi-size', note: 'Fallback für ältere Browser' },
  { file: 'favicon - o.t.n.svg', size: 'skalierbar', note: 'Moderner Browser-Fallback' },
]

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-5 py-3 font-semibold text-sm" style={{ background: color, color: '#fff' }}>
        {title}
      </div>
      <div className="divide-y divide-gray-50">{children}</div>
    </div>
  )
}

function Row({ label, sub, badge, badgeColor }: { label: string; sub: string; badge: string; badgeColor: string }) {
  return (
    <div className="flex items-start gap-3 px-5 py-3">
      <span className="text-xs font-semibold px-2 py-0.5 rounded-full mt-0.5 shrink-0" style={{ background: badgeColor + '18', color: badgeColor }}>
        {badge}
      </span>
      <div>
        <div className="text-sm font-medium text-gray-800">{label}</div>
        <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
      </div>
    </div>
  )
}

export default function InternStatusPage() {
  return (
    <InternLayout>
      <div className="max-w-2xl mx-auto py-10 px-4 flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Öffentlichkeits-Status</h1>
          <p className="text-sm text-gray-400 mt-1">Übersicht was Google indexiert und was privat bleibt.</p>
        </div>

        <Section title="✅ Öffentlich — Google indexiert" color="#16a34a">
          {PUBLIC.map(p => (
            <Row key={p.path} label={p.path} sub={`${p.label} · ${p.note}`} badge="PUBLIC" badgeColor="#16a34a" />
          ))}
        </Section>

        <Section title="🔒 Privat — noindex + robots.txt geblockt" color="#dc2626">
          {PRIVATE_PAGES.map(p => (
            <Row key={p.path} label={p.path} sub={`${p.label} · ${p.note}`} badge="PRIVAT" badgeColor="#dc2626" />
          ))}
        </Section>

        <Section title="🖼️ Bilder — nicht in Google Bildersuche" color="#7c3aed">
          {BLOCKED_IMAGES.map(p => (
            <Row key={p.path} label={p.path} sub={p.note} badge="GEBLOCKT" badgeColor="#7c3aed" />
          ))}
          <Row
            label="Alle anderen /images/ Pfade"
            sub="robots.txt: Disallow: / — kein Crawler kommt rein"
            badge="GEBLOCKT"
            badgeColor="#7c3aed"
          />
        </Section>

        <Section title="🤖 KI-Crawler — alle geblockt (robots.txt)" color="#0369a1">
          <div className="px-5 py-4 flex flex-wrap gap-2">
            {AI_BOTS.map(bot => (
              <span key={bot} className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded-lg border border-blue-100">
                {bot}
              </span>
            ))}
          </div>
        </Section>

        <Section title="🔖 Favicon — Google Site-Icon" color="#d97706">
          {FAVICON.map(f => (
            <Row key={f.file} label={f.file} sub={`${f.size} · ${f.note}`} badge="AKTIV" badgeColor="#d97706" />
          ))}
          <Row
            label="Crawlen: Google Search Console → URL-Prüfung → / → Indexierung beantragen"
            sub="Startet sofortiges Neu-Crawlen der Startseite und aktualisiert das Favicon"
            badge="TIPP"
            badgeColor="#6b7280"
          />
        </Section>

        <Section title="🗺️ Sitemap" color="#0f766e">
          <Row label="https://otn-olympia-volkslauf.de/sitemap.xml" sub="Enthält: / und /ausschreibung — verlinkt in robots.txt" badge="AKTIV" badgeColor="#0f766e" />
        </Section>
      </div>
    </InternLayout>
  )
}
