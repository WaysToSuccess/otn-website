import { useEffect, useRef, useState } from 'react'
import { MapPin, Mail, Phone, Calendar, Ruler, Users, Trophy, Clock, Download, ArrowLeft, ExternalLink } from 'lucide-react'

const OTN_LOGO = 'https://o-t-n.de/assets/images/j/otn_logo_neu_2011-az9c925dm6a9aw8.svg'

function todayFormatted() {
  return new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const distances = [
  { name: 'Bambini-Lauf',       dist: '400 m',   priceEarly: '2,00 €',  priceLate: '5,00 €',  note: 'Jg. 2020 u. jünger' },
  { name: 'Jugendlauf',         dist: '1,2 km',  priceEarly: '4,00 €',  priceLate: '7,00 €',  note: 'Kinder & Jugend' },
  { name: 'Kurzstrecke',        dist: '5 km',  priceEarly: '15,00 €', priceLate: '18,00 €', note: 'Jg. 2007 u. älter' },
  { name: 'Kurzstrecke Jugend', dist: '5 km',  priceEarly: '6,00 €',  priceLate: '9,00 €',  note: 'Jg. 2008 – 2016' },
  { name: 'Hauptlauf',          dist: '10 km', priceEarly: '15,00 €', priceLate: '18,00 €', note: 'Jg. 2007 u. älter' },
  { name: 'Hauptlauf Jugend',   dist: '10 km', priceEarly: '6,00 €',  priceLate: '9,00 €',  note: 'Jg. 2008 – 2014' },
]

const zeitplan = [
  ['15:30 Uhr', 'Startnummernausgabe', false],
  ['16:15 Uhr', 'Bambini-Lauf 400 m & Jugendlauf 1,2 km', false],
  ['17:00 Uhr', 'Start 5 km & 10 km', false],
  ['18:30 Uhr', 'Zieleinlauf geschlossen', false],
  ['18:45 Uhr', 'Siegerehrung', false],
  ['19:00 Uhr', 'Gartenstadt Open Air', true],
] as const

const formSteps = [
  { step: 1, label: 'Laufauswahl', desc: 'Bambini (400 m) · Jugendlauf (1,2 km) · 5 km · 10 km' },
  { step: 2, label: 'Vor- und Nachname', desc: 'Vollständiger bürgerlicher Name' },
  { step: 3, label: 'Geburtsdatum', desc: 'TT.MM.JJJJ, Altersklassenzuordnung' },
  { step: 4, label: 'E-Mail-Adresse', desc: 'Für Bestätigung & Rennunterlagen' },
  { step: 5, label: 'Sponsor / Unterstützer', desc: 'Optional: Firma/Verein oder „Für mich selbst"' },
]

const sponsors = [
  { name: 'Brandes', logo: '/images/Sponsor/Dabei/Brandes_logo transparent.webp' },
  { name: 'Bauerfeind', logo: '/images/Sponsor/Dabei/Bauerfeind_Logo Transparent.png' },
  { name: 'JUZO', logo: '/images/Sponsor/Dabei/juzo_logo transparent.png' },
  { name: 'H-Projektierung', logo: '/images/Sponsor/Dabei/H-Projektierung Logo Transparent.webp' },
  { name: 'Netkom', logo: '/images/Sponsor/Dabei/Netkom_Logo transparent.webp' },
  { name: 'Provinzial', logo: '/images/Sponsor/Dabei/Provinzial_Logo_transparent neu.png' },
  { name: 'Doksbau', logo: '/images/Sponsor/Dabei/doksbau logo transparent.png' },
  { name: 'Glaus', logo: '/images/Sponsor/Dabei/glaus_logo transparent.webp' },
  { name: 'Perfectone Werbeagentur', logo: '/images/Sponsor/Dabei/perfectone-werbeagentur-removebg-preview.png' },
  { name: 'MKS Bauelemente', logo: '/images/Sponsor/Dabei/mks_bauelemente transparent.webp' },
  { name: 'Össur', logo: '/images/Sponsor/Dabei/ossur logo transparent.webp' },
  { name: 'VR Bank', logo: '/images/Sponsor/Dabei/VR_Bank_zwischen_den_Meeren logo transparent.webp' },
  { name: 'Tackmann Bäckerei', logo: '/images/Sponsor/Dabei/Tackmann_Bäckerei_Logo Transparent.png' },
  { name: 'Lithon Betonwerk', logo: '/images/Sponsor/Dabei/Lithon_Betonwerk_Logo transparent.webp' },
  { name: 'Mirek Bau', logo: '/images/Sponsor/Dabei/Mirek_Bau_logo transparent.webp' },
  { name: 'Partnerschaft für Demokratie', logo: '/images/Sponsor/Dabei/Partnerschaft_für_Demokratie_logo transparent.webp' },
]

function printViaPopup() {
  window.print()
}

function A4Content() {
  return (
    <div
      style={{
        width: '210mm', minHeight: '297mm',
        background: '#fff',
        position: 'relative', overflow: 'visible',
        display: 'flex', flexDirection: 'column',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Watermark */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 0 }}>
        <img src={OTN_LOGO} alt="" style={{ width: '65%', opacity: 0.04, filter: 'grayscale(1)' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* HEADER */}
        <div style={{ borderBottom: '3px solid #003399', padding: '12mm 14mm 8mm', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={OTN_LOGO} alt="O.T.N." style={{ height: 48, objectFit: 'contain' }} />
            <img src="/images/MSTV_Olympia_Neumünster transparent.webp" alt="MSTV Olympia" style={{ height: 48, objectFit: 'contain' }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ background: '#003399', color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 11px', borderRadius: 5, display: 'inline-block' }}>Ausschreibung 2026</div>
            <div style={{ fontSize: 8.5, color: '#666', marginTop: 4 }}>sportservice hamburg GmbH · Zeitmessung</div>
          </div>
        </div>
        {/* EMPFÄNGER */}
        <div style={{ padding: '6mm 14mm 4mm' }}>
          <div style={{ fontSize: 8, color: '#aaa', borderBottom: '0.5px solid #ddd', paddingBottom: 2, marginBottom: 8 }}>orthopädie.technik.nord GmbH · Wendenstraße 1 · 24539 Neumünster</div>
          <div style={{ height: 28 }} />
          <div style={{ textAlign: 'right', fontSize: 9, color: '#666' }}>Neumünster, den {todayFormatted()}</div>
        </div>
        {/* TITLE */}
        <div style={{ padding: '3mm 14mm 4mm', borderBottom: '1px solid #e5e7eb' }}>
          <h1 style={{ fontSize: 21, fontWeight: 900, color: '#003399', lineHeight: 1.1, margin: 0 }}>51. o.t.n Volkslauf bei Olympia in Neumünster</h1>
          <p style={{ fontSize: 9.5, color: '#555', marginTop: 4, marginBottom: 0 }}>Samstag, 5. September 2026 · 15:30 Uhr · MTSV Olympia von 1859 e.V., Forstweg 5, 24537 Neumünster</p>
        </div>
        {/* BODY */}
        <div style={{ padding: '4mm 14mm', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <p style={{ fontSize: 9.5, color: '#333', lineHeight: 1.6, margin: 0 }}>
            Der <strong>51. o.t.n Volkslauf bei Olympia in Neumünster</strong> wird am <strong>5. September 2026</strong> beim <strong>MTSV Olympia von 1859 e.V.</strong> ausgetragen.
            Zeitmessung via <strong>sportservice hamburg GmbH</strong>. Anschließend: <strong>1. Gartenstadt Open Air</strong> mit DJ & Live-Band (Einlass 19:00 Uhr).{' '}
            <strong>Der Erlös wird zu 100&nbsp;% einem gemeinnützigen Zweck gespendet.</strong>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
            {[
              { Icon: Calendar, label: 'Datum', value: '5. Sept. 2026' },
              { Icon: Clock,    label: 'Start',  value: '16:15 / 17:00 Uhr' },
              { Icon: MapPin,   label: 'Ort',    value: 'Forstweg 5, NMS' },
              { Icon: Users,    label: 'TN',     value: 'ca. 600 erwartet' },
            ].map(({ Icon, label, value }) => (
              <div key={label} style={{ background: '#f0f4ff', borderRadius: 6, padding: '6px 9px', borderLeft: '3px solid #003399' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Icon style={{ width: 9, height: 9, color: '#0d9488' }} />
                  <span style={{ fontSize: 7.5, color: '#0d9488', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
                </div>
                <span style={{ fontSize: 9.5, fontWeight: 700, color: '#003399' }}>{value}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div>
              <div style={sectionHeader('#003399')}><Ruler style={{ width: 8, height: 8, display: 'inline', marginRight: 4 }} />Strecken & Startgebühren</div>
              <div style={sectionBody}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 8.5 }}>
                  <thead><tr style={{ background: '#f0f4ff' }}>
                    <th style={{ padding: '4px 8px', textAlign: 'left', color: '#003399', fontWeight: 700, fontSize: 8 }}>Lauf</th>
                    <th style={{ padding: '4px 8px', textAlign: 'center', color: '#003399', fontWeight: 700, fontSize: 8 }}>Dist.</th>
                    <th style={{ padding: '4px 8px', textAlign: 'right', color: '#003399', fontWeight: 700, fontSize: 8 }}>bis 27.08.</th>
                    <th style={{ padding: '4px 8px', textAlign: 'right', color: '#003399', fontWeight: 700, fontSize: 8 }}>ab 28.08.</th>
                  </tr></thead>
                  <tbody>{distances.map((d, i) => (
                    <tr key={d.name + d.note} style={{ background: i % 2 ? '#fafbff' : '#fff', borderBottom: '0.5px solid #e5e7eb' }}>
                      <td style={{ padding: '4px 8px', color: '#333', fontWeight: 600 }}>{d.name}<div style={{ fontSize: 7, color: '#999', fontWeight: 400 }}>{d.note}</div></td>
                      <td style={{ padding: '4px 8px', textAlign: 'center', color: '#0d9488', fontWeight: 700 }}>{d.dist}</td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', color: '#003399', fontWeight: 800 }}>{d.priceEarly}</td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', color: '#92400e', fontWeight: 800 }}>{d.priceLate}</td>
                    </tr>
                  ))}</tbody>
                </table>
                <div style={{ background: '#f0fff4', borderTop: '0.5px solid #6ee7b7', padding: '4px 8px', fontSize: 8, color: '#047857' }}>Der Erlös wird zu 100&nbsp;% einem gemeinnützigen Zweck gespendet.</div>
              </div>
            </div>
            <div>
              <div style={sectionHeader('#0d9488')}><Clock style={{ width: 8, height: 8, display: 'inline', marginRight: 4 }} />Zeitplan</div>
              <div style={sectionBody}>
                {zeitplan.map(([time, event, hl], i) => (
                  <div key={String(time)} style={{ display: 'flex', gap: 8, padding: '4px 8px', background: hl ? '#f0fdfa' : (i % 2 ? '#fafbff' : '#fff'), borderBottom: i < 5 ? '0.5px solid #e5e7eb' : 'none' }}>
                    <span style={{ fontSize: 8.5, fontWeight: 800, color: hl ? '#0d9488' : '#003399', minWidth: 46 }}>{time}</span>
                    <span style={{ fontSize: 8.5, color: hl ? '#0d9488' : '#333', fontWeight: hl ? 700 : 400 }}>{event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div style={sectionHeader('#003399')}>Anmeldung über Race Result · Ablauf des Anmeldeformulars</div>
            <div style={{ ...sectionBody, padding: '7px 10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px' }}>
                {formSteps.map((s) => (
                  <div key={s.step} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <div style={{ width: 18, height: 18, background: '#003399', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 900, flexShrink: 0, marginTop: 1 }}>{s.step}</div>
                    <div>
                      <div style={{ fontSize: 8.5, fontWeight: 700, color: '#003399' }}>{s.label}</div>
                      <div style={{ fontSize: 8, color: '#666', lineHeight: 1.4 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 6, padding: '4px 8px', background: '#f0f4ff', borderRadius: 4, fontSize: 8, color: '#003399', borderLeft: '3px solid #0d9488' }}>
                <strong>Anmeldung:</strong> ausschließlich online über das Race Result Portal · <strong>Meldeschluss: 27.08.2026, 23:59 Uhr.</strong> Die Onlineanmeldung bleibt bis 05.09.2026 (60 min vor Wettbewerbsbeginn) offen. Nachmeldungen sind zzgl. 3,00 € Nachmeldegebühr online und vor Ort möglich.
              </div>
            </div>
          </div>
          <div style={{ border: '0.5px solid #e5e7eb', borderRadius: 6, overflow: 'hidden' }}>
            <div style={sectionHeader('#003399')}>Veranstalter</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 10, borderRight: '0.5px solid #e5e7eb' }}>
                <img src="/images/MSTV_Olympia_Neumünster transparent.webp" alt="MTSV Olympia" style={{ height: 34, objectFit: 'contain', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 8.5, fontWeight: 800, color: '#003399' }}>MTSV Olympia von 1859 e.V.</div>
                  <div style={{ fontSize: 8, color: '#555', lineHeight: 1.5, marginTop: 2 }}>Forstweg 5 · 24537 Neumünster</div>
                </div>
              </div>
              <div style={{ padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src={OTN_LOGO} alt="O.T.N." style={{ height: 34, objectFit: 'contain', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 8.5, fontWeight: 800, color: '#003399' }}>orthopädie.technik.nord GmbH</div>
                  <div style={{ fontSize: 8, color: '#555', lineHeight: 1.5, marginTop: 2 }}>Wendenstraße 1 · 24539 Neumünster</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div style={sectionHeader('#003399')}>Unsere Sponsoren</div>
            <div style={{ ...sectionBody, padding: '7px 10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6, alignItems: 'center' }}>
                {sponsors.map((s) => (
                  <div key={s.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <img src={s.logo} alt={s.name} style={{ height: 22, width: '100%', objectFit: 'contain' }} />
                    <span style={{ fontSize: 6, color: '#666', textAlign: 'center', lineHeight: 1.2 }}>{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background: '#fff7ed', border: '0.5px solid #fed7aa', borderRadius: 6, padding: '5px 10px', fontSize: 8.5, color: '#92400e', display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontSize: 11, flexShrink: 0 }}>⚠</span>
            <span><strong>Hinweis zur Rückerstattung:</strong> Die Startgebühr wird nach erfolgter Anmeldung nicht zurückerstattet. Eine Übertragung auf eine andere Person ist nicht möglich.</span>
          </div>
          <div style={{ background: '#f0fdfa', border: '0.5px solid #6ee7b7', borderRadius: 6, padding: '5px 10px', fontSize: 8.5, color: '#047857', display: 'flex', alignItems: 'center', gap: 7 }}>
            <Trophy style={{ width: 12, height: 12, flexShrink: 0, color: '#0d9488' }} />
            <span><strong>Der Erlös wird zu 100&nbsp;% einem gemeinnützigen Zweck gespendet.</strong> Teilnehmer geben im Anmeldeformular an, für welchen Sponsor oder Verein sie starten, alternativ „Für mich selbst".</span>
          </div>
        </div>
        {/* FOOTER */}
        <div style={{ background: '#003399', borderTop: '3px solid #003399', padding: '5mm 14mm', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={OTN_LOGO} alt="O.T.N." style={{ height: 30, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            <div style={{ color: '#fff' }}><div style={{ fontSize: 8.5, fontWeight: 800 }}>orthopädie.technik.nord GmbH</div></div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { Icon: MapPin, lines: ['Wendenstraße 1', '24539 Neumünster'] },
              { Icon: Phone,  lines: ['04321 / 9794-49'] },
              { Icon: Mail,   lines: ['info@otn-olympia-volkslauf.de'] },
            ].map(({ Icon, lines }) => (
              <div key={lines[0]} style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                <Icon style={{ width: 8, height: 8, color: '#2dd4bf', marginTop: 2, flexShrink: 0 }} />
                <div>{lines.map(l => <div key={l} style={{ fontSize: 8, color: '#cbd5e1', lineHeight: 1.5 }}>{l}</div>)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const sectionHeader = (bg: string): React.CSSProperties => ({
  background: bg, color: '#fff',
  borderRadius: '6px 6px 0 0',
  padding: '5px 10px',
  fontSize: 8, fontWeight: 800,
  letterSpacing: '0.12em', textTransform: 'uppercase',
})

const sectionBody: React.CSSProperties = {
  border: '0.5px solid #e5e7eb', borderTop: 'none',
  borderRadius: '0 0 6px 6px', overflow: 'hidden',
}

export default function AusschreibungPage() {
  useEffect(() => { document.title = 'Ausschreibung · 51. o.t.n Volkslauf bei Olympia in Neumünster 2026' }, [])
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const A4_WIDTH_PX = 794
    const update = () => {
      if (wrapperRef.current) {
        const available = wrapperRef.current.clientWidth - 32
        setScale(Math.min(1, available / A4_WIDTH_PX))
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <>
      <style>{`
        @page { size: A4; margin: 0; }
        .print-only { display: none; }
        @media print {
          body { margin: 0; background: white; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
        }
      `}</style>

      {/* ── TOP NAVBAR ── */}
      <div className="no-print bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50" ref={wrapperRef}>
        <img src={OTN_LOGO} alt="O.T.N." className="h-8 sm:h-10 object-contain" />
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/"
            className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium text-[#003399] hover:text-[#0040cc] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Zurück zur Volkslaufseite</span>
            <span className="sm:hidden">Zurück</span>
          </a>
          <a
            href="https://my.raceresult.com/407322/registration"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#003399] text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 py-2 rounded-lg hover:bg-[#0040cc] transition-colors shadow-md"
          >
            <span>Jetzt anmelden</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          A4 DOKUMENT – auf allen Geräten, skaliert (nur Bildschirm)
      ══════════════════════════════════════════ */}
      <div className="no-print flex flex-col items-center bg-gray-200 py-6 px-4" ref={wrapperRef}>
        <div style={{ width: 794 * scale, height: 1122 * scale + 64, position: 'relative', overflow: 'hidden' }}>
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: 794 }}>
            <div style={{ padding: 32 }}>
              <A4Content />
            </div>
          </div>
        </div>
        <button
          onClick={printViaPopup}
          className="mt-4 inline-flex items-center gap-2 bg-[#003399] text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#0040cc] transition-colors shadow-md"
        >
          <Download className="w-4 h-4" />
          Als PDF herunterladen
        </button>
      </div>

      {/* PRINT-ONLY: volle A4-Größe, nur beim Drucken sichtbar */}
      <div className="print-only">
        <A4Content />
      </div>
    </>
  )
}
