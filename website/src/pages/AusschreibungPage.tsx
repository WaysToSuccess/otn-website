import { useEffect } from 'react'
import { MapPin, Mail, Phone, Globe, Calendar, Ruler, Users, Trophy, Clock, Download } from 'lucide-react'

const OTN_LOGO = 'https://o-t-n.de/assets/images/j/otn_logo_neu_2011-az9c925dm6a9aw8.svg'

function todayFormatted() {
  return new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const distances = [
  { name: 'Bambini-Lauf', dist: '400 m', price: 'kostenlos', note: 'Kinder bis 10 J.' },
  { name: 'Freizeitlauf', dist: '5 km', price: '15,00 €', note: 'Alle Altersklassen' },
  { name: 'Hauptlauf', dist: '10 km', price: '15,00 €', note: 'Alle Altersklassen' },
  { name: 'Kinder & Jugend', dist: '5 / 10 km', price: '6,00 €', note: 'Jg. 2007–2014' },
]

const formSteps = [
  { step: 1, label: 'Laufauswahl', desc: 'Bambini (400 m) · 5 km · 10 km' },
  { step: 2, label: 'Vor- und Nachname', desc: 'Vollständiger bürgerlicher Name' },
  { step: 3, label: 'Geburtsdatum', desc: 'TT.MM.JJJJ, Altersklassenzuordnung' },
  { step: 4, label: 'E-Mail-Adresse', desc: 'Für Bestätigung & Rennunterlagen' },
  { step: 5, label: 'Sponsor / Unterstützer', desc: 'Optional: Firma/Verein oder „Für mich selbst"' },
]

const sponsors = [
  { name: 'H-Projektierung', logo: '/images/Sponsor/H-Projektierung Logo Transparent.png' },
  { name: 'Rohrstar', logo: '/images/Sponsor/RohrStar Rorreinigung transparent Logo.png' },
  { name: 'Netkom', logo: '/images/Sponsor/Netkom_Logo transparent.png' },
  { name: 'Glaus', logo: '/images/Sponsor/glaus_logo transparent.png' },
  { name: 'PerfectOne', logo: '/images/Sponsor/perfectone-werbeagentur-removebg-preview.png' },
  { name: 'JUZO', logo: '/images/Sponsor/juzo_logo transparent.png' },
  { name: 'Provinzial', logo: '/images/Sponsor/provinzial_nord_logo-removebg-preview.png' },
  { name: 'MKS Bauelemente', logo: '/images/Sponsor/mks_bauelemente transparent.png' },
  { name: 'Össur', logo: '/images/Sponsor/ossur logo transparent.png' },
  { name: 'Bauerfeind', logo: '/images/Sponsor/Bauerfeind_Logo Transparent.png' },
  { name: 'Bäckerei Tackmann', logo: '/images/Sponsor/Tackmann_Bäckerei_Logo Transparent.png' },
  { name: 'VR Bank', logo: '/images/Sponsor/VR_Bank_zwischen_den_Meeren Logo Transparent.png' },
  { name: 'MediCar', logo: '/images/Sponsor/MediCar Logo transparent.png' },
  { name: 'Transcoject', logo: '/images/Sponsor/transcoject Logo transparent.png' },
]

function printViaPopup() {
  const printEl = document.getElementById('ausschreibung-print')
  if (!printEl) return
  const win = window.open('', '_blank', 'width=900,height=1200')
  if (!win) return
  win.document.write(`<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8"/>
  <title>OTN-Ausschreibung-Volkslauf-2026_${todayFormatted().replace(/\./g, '-')}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    @page { size: A4; margin: 0; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>${printEl.outerHTML}</body>
</html>`)
  win.document.close()
  win.focus()
  setTimeout(() => { win.print(); win.close() }, 400)
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
  useEffect(() => { document.title = 'Ausschreibung · 51. O.T.N. Volkslauf 2026' }, [])

  return (
    <>
      <style>{`
        @page { size: A4; margin: 0; }
        @media print {
          body { margin: 0; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Toolbar */}
      <div className="no-print bg-gray-100 border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <span className="text-sm text-gray-600 font-medium">Ausschreibung · 51. O.T.N. Volkslauf 2026</span>
        <button
          onClick={printViaPopup}
          className="inline-flex items-center gap-2 bg-[#003399] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#0040cc] transition-colors shadow-md"
        >
          <Download className="w-4 h-4" />
          Als PDF herunterladen
        </button>
      </div>

      {/* A4 canvas */}
      <div className="bg-gray-200 py-8 px-4 flex justify-center">
        <div
          id="ausschreibung-print"
          style={{
            width: '210mm', height: '297mm',
            background: '#fff',
            position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          {/* Watermark */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none', zIndex: 0,
          }}>
            <img src={OTN_LOGO} alt="" style={{ width: '65%', opacity: 0.04, filter: 'grayscale(1)' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>

            {/* ── HEADER ── */}
            <div style={{
              borderBottom: '3px solid #003399',
              padding: '12mm 14mm 8mm',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={OTN_LOGO} alt="O.T.N." style={{ height: 48, objectFit: 'contain' }} />
                <div style={{ borderLeft: '2px solid #003399', paddingLeft: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#003399' }}>Orthopädie-Technik Neumünster GmbH</div>
                  <div style={{ fontSize: 9, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>Titelsponsor · 51. Volkslauf Neumünster</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ background: '#003399', color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 11px', borderRadius: 5, display: 'inline-block' }}>
                  Ausschreibung 2026
                </div>
                <div style={{ fontSize: 8.5, color: '#666', marginTop: 4 }}>Race Result · Zeitmessung & Anmeldung</div>
              </div>
            </div>

            {/* ── EMPFÄNGER ── */}
            <div style={{ padding: '6mm 14mm 4mm' }}>
              <div style={{ fontSize: 8, color: '#aaa', borderBottom: '0.5px solid #ddd', paddingBottom: 2, marginBottom: 8 }}>
                Orthopädie-Technik Neumünster GmbH · Boostedter Straße 31 · 24537 Neumünster
              </div>
              <div style={{ height: 28 }} />
              <div style={{ textAlign: 'right', fontSize: 9, color: '#666' }}>
                Neumünster, den {todayFormatted()}
              </div>
            </div>

            {/* ── TITLE ── */}
            <div style={{ padding: '3mm 14mm 4mm', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: 7.5, fontWeight: 700, color: '#0d9488', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 3 }}>Offiziell · Titelsponsor O.T.N.</div>
              <h1 style={{ fontSize: 21, fontWeight: 900, color: '#003399', lineHeight: 1.1, margin: 0 }}>51. O.T.N. Volkslauf Neumünster</h1>
              <p style={{ fontSize: 9.5, color: '#555', marginTop: 4, marginBottom: 0 }}>
                Samstag, 5. September 2026 · 15:30 Uhr · MTSV Olympia von 1859 e.V., Forstweg 5, 24537 Neumünster
              </p>
            </div>

            {/* ── BODY ── */}
            <div style={{ padding: '4mm 14mm', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

              {/* Intro */}
              <p style={{ fontSize: 9.5, color: '#333', lineHeight: 1.6, margin: 0 }}>
                Der <strong>51. Volkslauf Neumünster</strong> wird am <strong>5. September 2026</strong> vom <strong>MTSV Olympia von 1859 e.V.</strong> ausgetragen.
                Zeitmessung via <strong>Race Result</strong>. Anschließend: <strong>1. Gartenstadt Open Air</strong> mit DJ & Live-Band (Einlass 19:00 Uhr). 100&nbsp;% der Einnahmen fließen in gemeinnützige Zwecke.
              </p>

              {/* Key facts */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
                {[
                  { Icon: Calendar, label: 'Datum', value: '5. Sept. 2026' },
                  { Icon: Clock,    label: 'Start',  value: '15:30 Uhr' },
                  { Icon: MapPin,   label: 'Ort',    value: 'Forstweg 5, NMS' },
                  { Icon: Users,    label: 'TN',     value: 'ab 1.000 erwartet' },
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

              {/* Strecken + Zeitplan */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <div style={sectionHeader('#003399')}>
                    <Ruler style={{ width: 8, height: 8, display: 'inline', marginRight: 4 }} />
                    Strecken & Startgebühren
                  </div>
                  <div style={sectionBody}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 8.5 }}>
                      <thead>
                        <tr style={{ background: '#f0f4ff' }}>
                          <th style={{ padding: '4px 8px', textAlign: 'left', color: '#003399', fontWeight: 700, fontSize: 8 }}>Lauf</th>
                          <th style={{ padding: '4px 8px', textAlign: 'center', color: '#003399', fontWeight: 700, fontSize: 8 }}>Distanz</th>
                          <th style={{ padding: '4px 8px', textAlign: 'right', color: '#003399', fontWeight: 700, fontSize: 8 }}>Gebühr</th>
                        </tr>
                      </thead>
                      <tbody>
                        {distances.map((d, i) => (
                          <tr key={d.name} style={{ background: i % 2 ? '#fafbff' : '#fff', borderBottom: '0.5px solid #e5e7eb' }}>
                            <td style={{ padding: '4px 8px', color: '#333', fontWeight: 600 }}>
                              {d.name}
                              <div style={{ fontSize: 7, color: '#999', fontWeight: 400 }}>{d.note}</div>
                            </td>
                            <td style={{ padding: '4px 8px', textAlign: 'center', color: '#0d9488', fontWeight: 700 }}>{d.dist}</td>
                            <td style={{ padding: '4px 8px', textAlign: 'right', color: '#003399', fontWeight: 800 }}>{d.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ background: '#f0fff4', borderTop: '0.5px solid #6ee7b7', padding: '4px 8px', fontSize: 8, color: '#047857' }}>
                      100&nbsp;% der Einnahmen gehen an gemeinnützige Zwecke.
                    </div>
                  </div>
                </div>

                <div>
                  <div style={sectionHeader('#0d9488')}>
                    <Clock style={{ width: 8, height: 8, display: 'inline', marginRight: 4 }} />
                    Zeitplan
                  </div>
                  <div style={sectionBody}>
                    {[
                      ['15:30 Uhr', 'Startnummernausgabe', false],
                      ['16:30 Uhr', 'Start 5 km & 10 km', false],
                      ['16:45 Uhr', 'Bambini-Lauf 400 m', false],
                      ['18:00 Uhr', 'Zieleinlauf geschlossen', false],
                      ['18:15 Uhr', 'Siegerehrung', false],
                      ['19:00 Uhr', 'Gartenstadt Open Air', true],
                    ].map(([time, event, hl], i) => (
                      <div key={String(time)} style={{
                        display: 'flex', gap: 8, padding: '4px 8px',
                        background: hl ? '#f0fdfa' : (i % 2 ? '#fafbff' : '#fff'),
                        borderBottom: i < 5 ? '0.5px solid #e5e7eb' : 'none',
                      }}>
                        <span style={{ fontSize: 8.5, fontWeight: 800, color: hl ? '#0d9488' : '#003399', minWidth: 46 }}>{time}</span>
                        <span style={{ fontSize: 8.5, color: hl ? '#0d9488' : '#333', fontWeight: hl ? 700 : 400 }}>{event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Anmeldung Race Result */}
              <div>
                <div style={sectionHeader('#003399')}>
                  Anmeldung über Race Result · Ablauf des Anmeldeformulars
                </div>
                <div style={{ ...sectionBody, padding: '7px 10px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px' }}>
                    {formSteps.map((s) => (
                      <div key={s.step} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <div style={{
                          width: 18, height: 18, background: '#003399', color: '#fff',
                          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 8, fontWeight: 900, flexShrink: 0, marginTop: 1,
                        }}>{s.step}</div>
                        <div>
                          <div style={{ fontSize: 8.5, fontWeight: 700, color: '#003399' }}>{s.label}</div>
                          <div style={{ fontSize: 8, color: '#666', lineHeight: 1.4 }}>{s.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 6, padding: '4px 8px', background: '#f0f4ff', borderRadius: 4, fontSize: 8, color: '#003399', borderLeft: '3px solid #0d9488' }}>
                    <strong>Anmeldung:</strong> ausschließlich online über das Race Result Portal · <strong>www.o-t-n-volkslauf.de</strong>
                  </div>
                </div>
              </div>

              {/* Veranstalter + Titelsponsor */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div style={{ border: '0.5px solid #e5e7eb', borderRadius: 6, overflow: 'hidden' }}>
                  <div style={sectionHeader('#003399')}>Veranstalter</div>
                  <div style={{ padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src="/images/MSTV_Olympia_Neumünster transparent.png" alt="MTSV Olympia" style={{ height: 34, objectFit: 'contain', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 8.5, fontWeight: 800, color: '#003399' }}>MTSV Olympia von 1859 e.V.</div>
                      <div style={{ fontSize: 8, color: '#555', lineHeight: 1.5, marginTop: 2 }}>Forstweg 5 · 24537 Neumünster<br />Abteilung Laufsport</div>
                    </div>
                  </div>
                </div>
                <div style={{ border: '0.5px solid #e5e7eb', borderRadius: 6, overflow: 'hidden' }}>
                  <div style={sectionHeader('#0d9488')}>Titelsponsor</div>
                  <div style={{ padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={OTN_LOGO} alt="O.T.N." style={{ height: 34, objectFit: 'contain', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 8.5, fontWeight: 800, color: '#003399' }}>Orthopädie-Technik Neumünster GmbH</div>
                      <div style={{ fontSize: 8, color: '#555', lineHeight: 1.5, marginTop: 2 }}>Boostedter Straße 31 · 24537 Neumünster<br />www.o-t-n-volkslauf.de</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sponsors */}
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

              {/* Laufen für guten Zweck */}
              <div style={{ background: '#f0fdfa', border: '0.5px solid #6ee7b7', borderRadius: 6, padding: '5px 10px', fontSize: 8.5, color: '#047857', display: 'flex', alignItems: 'center', gap: 7 }}>
                <Trophy style={{ width: 12, height: 12, flexShrink: 0, color: '#0d9488' }} />
                <span>
                  <strong>Laufen für einen guten Zweck:</strong> Teilnehmer geben im Anmeldeformular an, für welchen Sponsor oder Verein sie starten, alternativ „Für mich selbst".
                </span>
              </div>
            </div>

            {/* ── FOOTER ── */}
            <div style={{
              background: '#003399', borderTop: '3px solid #003399',
              padding: '5mm 14mm',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src={OTN_LOGO} alt="O.T.N." style={{ height: 30, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                <div style={{ color: '#fff' }}>
                  <div style={{ fontSize: 8.5, fontWeight: 800 }}>Orthopädie-Technik Neumünster GmbH</div>
                  <div style={{ fontSize: 7.5, color: '#93c5fd', marginTop: 1 }}>Titelsponsor · 51. Volkslauf 2026</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                {[
                  { Icon: MapPin, lines: ['Boostedter Str. 31', '24537 Neumünster'] },
                  { Icon: Phone,  lines: ['04321 / 9794-49'] },
                  { Icon: Mail,   lines: ['info@o-t-n-volkslauf.de'] },
                  { Icon: Globe,  lines: ['www.o-t-n-volkslauf.de'] },
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
      </div>
    </>
  )
}
