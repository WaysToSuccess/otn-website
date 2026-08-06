export default function ImpressumPage() {
  return (
    <main id="main-content" className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">

          <h1 className="text-3xl font-extrabold text-[#003399] mb-2">Impressum</h1>
          <div className="w-12 h-1 bg-[#003399] rounded-full mb-10" />

          {/* Firmendaten */}
          <Section title="Angaben gemäß § 5 TMG">
            <p className="font-semibold text-gray-800">orthopädie.technik.nord GmbH</p>
            <p>Wendenstr. 1<br />24539 Neumünster</p>
            <p className="mt-3">
              Telefon: <a href="tel:+494321979449" className="text-[#003399] hover:underline">04321 / 9794-49</a><br />
              Telefax: 04321 / 9794-47<br />
              E-Mail: <a href="mailto:info@o-t-n.de" className="text-[#003399] hover:underline">info@o-t-n.de</a><br />
              Web: <a href="https://www.o-t-n.de" target="_blank" rel="noopener noreferrer" className="text-[#003399] hover:underline">www.o-t-n.de</a>
            </p>
          </Section>

          {/* IK-Nummern */}
          <Section title="IK-Nummern">
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="text-sm w-full">
                <tbody>
                  {[
                    ['330 101 649', 'Orthopädie'],
                    ['340 102 548', 'Schuh-Orthopädie'],
                    ['330 104 813', 'Filiale Kuhberg Neumünster'],
                    ['340 103 037', 'Filiale Kuhberg Neumünster Schuhorthopädie'],
                    ['330 106 358', 'Filiale Rendsburgerstraße Neumünster'],
                    ['330 106 928', 'Filiale Bordesholm'],
                    ['340 103 220', 'Filiale Bordesholm Schuhorthopädie'],
                    ['330 105 994', 'Filiale Kaltenkirchen'],
                    ['340 103 071', 'Filiale Kaltenkirchen Schuhorthopädie'],
                    ['330 106 531', 'Filiale Büdelsdorf'],
                    ['340 103 184', 'Filiale Büdelsdorf Schuhorthopädie'],
                    ['330 107 304', 'Filiale Nortorf'],
                    ['340 103 297', 'Filiale Nortorf Schuhorthopädie'],
                  ].map(([ik, label], i) => (
                    <tr key={ik} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 font-mono text-gray-700 whitespace-nowrap w-40">IK-Nr.: {ik}</td>
                      <td className="py-2 px-4 text-gray-600">{label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-gray-600">Zertifiziert gemäß DIN EN ISO 13485:2016</p>
          </Section>

          {/* Rechtliches */}
          <Section title="Vertretungsberechtigter Geschäftsführer">
            <p>Stefan Fehlandt</p>
          </Section>

          <Section title="Registereintrag">
            <p>Amtsgericht Kiel, HRB 1312 NM</p>
          </Section>

          <Section title="Umsatzsteuer-Identifikationsnummer">
            <p>USt.-ID-Nr.: DE 176 971 500</p>
          </Section>

          <Section title="Steuernummer">
            <p>Steuer-Nr.: 20 290 45728</p>
          </Section>

          <Section title="Inhaltlich verantwortlich gemäß § 6 Teledienstegesetz">
            <p>Stefan Fehlandt, Geschäftsführer.</p>
          </Section>

          {/* Streitschlichtung */}
          <Section title="Nichtteilnahme an der Verbraucherschlichtung">
            <p>Die o.t.n gmbh beteiligt sich nicht an Verbraucherschlichtungsverfahren nach dem Verbraucherstreitbeilegungsgesetz.</p>
            <p className="mt-3">Bei Streitigkeiten über den geschlossenen Vertrag und dessen Ausführung können Sie sich an die Vermittlungsstelle der Handwerkskammer Lübeck, Breite Straße 10–12, 23552 Lübeck, E-Mail: <a href="mailto:vermittlungsstelle@hwk-luebeck.de" className="text-[#003399] hover:underline">vermittlungsstelle@hwk-luebeck.de</a> wenden.</p>
          </Section>

          {/* Disclaimer */}
          <div className="mb-8 pb-8 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-900 mb-5">Disclaimer</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Haftung für Inhalte</h3>
                <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                  <p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
                  <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Haftung für Links</h3>
                <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                  <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
                  <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Urheberrecht</h3>
                <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                  <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
                  <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          <a href="/" className="hover:text-[#003399] transition-colors">← Zurück zur Volkslauf-Seite</a>
        </p>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 pb-8 border-b border-gray-100">
      <h2 className="text-base font-bold text-gray-900 mb-3">{title}</h2>
      <div className="text-gray-600 text-sm leading-relaxed">{children}</div>
    </div>
  )
}
