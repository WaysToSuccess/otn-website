export default function DatenschutzPage() {
  return (
    <main id="main-content" className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">

          <h1 className="text-3xl font-extrabold text-[#003399] mb-2">Datenschutzerklärung</h1>
          <div className="w-12 h-1 bg-[#003399] rounded-full mb-10" />

          <p className="text-gray-600 text-sm leading-relaxed mb-10 bg-blue-50 border border-blue-100 rounded-xl p-4">
            Diese Datenschutzerklärung gilt für die Veranstaltungs-Website{' '}
            <strong>otn-olympia-volkslauf.de</strong> („Volkslauf bei Olympia"). Verantwortliche Stelle
            ist die orthopädie.technik.nord GmbH (siehe Abschnitt „Hinweis zur verantwortlichen Stelle").
            Für Anfragen zu dieser Veranstaltung erreichen Sie uns unter{' '}
            <a href="mailto:info@otn-olympia-volkslauf.de" className="text-[#003399] hover:underline">info@otn-olympia-volkslauf.de</a>.
            Diese Seite bietet weder eine Warenkorbfunktion noch eine eigene Zahlungsabwicklung —
            entsprechende Hinweise in dieser Erklärung beziehen sich nicht auf diese Website.
          </p>

          {/* 1 */}
          <Section title="Allgemeine Hinweise">
            <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>
          </Section>

          {/* 2 */}
          <Section title="Datenerfassung auf unserer Website">
            <SubSection title="Wer ist verantwortlich für die Datenerfassung auf dieser Website?">
              <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
            </SubSection>

            <SubSection title="Wie erfassen wir Ihre Daten?">
              <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie unsere Website betreten.</p>
            </SubSection>

            <SubSection title="Wofür nutzen wir Ihre Daten?">
              <p>Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>
            </SubSection>

            <SubSection title="Welche Rechte haben Sie bezüglich Ihrer Daten?">
              <p>Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>
            </SubSection>

            <SubSection title="Analyse-Tools und Tools von Drittanbietern" last>
              <p>Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel anonym; das Surf-Verhalten kann nicht zu Ihnen zurückverfolgt werden. Sie können dieser Analyse widersprechen oder sie durch die Nichtbenutzung bestimmter Tools verhindern. Details hierzu entnehmen Sie unserer Datenschutzerklärung unter der Überschrift „Drittmodule und Analysetools". Sie können dieser Analyse widersprechen. Über die Widerspruchsmöglichkeiten werden wir Sie in dieser Datenschutzerklärung informieren.</p>
            </SubSection>
          </Section>

          {/* 3 */}
          <Section title="Allgemeine Hinweise und Pflichtinformationen">
            <SubSection title="Datenschutz">
              <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht. Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p>
            </SubSection>

            <SubSection title="Hinweis zur verantwortlichen Stelle">
              <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
              <p className="mt-3">
                orthopädie.technik.nord GmbH<br />
                Herr Fehlandt<br />
                Wendenstraße 1<br />
                24539 Neumünster<br /><br />
                Telefon: <a href="tel:+494321979449" className="text-[#003399] hover:underline">04321 / 9794-49</a><br />
                E-Mail: <a href="mailto:info@o-t-n.de" className="text-[#003399] hover:underline">info@o-t-n.de</a>
              </p>
              <p className="mt-3">Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.</p>
            </SubSection>

            <SubSection title="Widerruf Ihrer Einwilligung zur Datenverarbeitung">
              <p>Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.</p>
            </SubSection>

            <SubSection title="Beschwerderecht bei der zuständigen Aufsichtsbehörde">
              <p>Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde in datenschutzrechtlichen Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem unser Unternehmen seinen Sitz hat. Eine Liste der Datenschutzbeauftragten sowie deren Kontaktdaten können folgendem Link entnommen werden: <a href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html" target="_blank" rel="noopener noreferrer" className="text-[#003399] hover:underline break-all">https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html</a>.</p>
            </SubSection>

            <SubSection title="Zuständige Aufsichtsbehörde">
              <p>
                Unabhängiges Landeszentrum für Datenschutz Schleswig-Holstein<br />
                Marit Hansen<br />
                Holstenstraße 98<br />
                24103 Kiel<br />
                Postfach 71 16, 24171 Kiel<br /><br />
                Telefon: 0431 988 1200<br />
                Telefax: 0431 988 1223<br />
                E-Mail: <a href="mailto:mail@datenschutzzentrum.de" className="text-[#003399] hover:underline">mail@datenschutzzentrum.de</a><br />
                <a href="https://www.datenschutzzentrum.de/" target="_blank" rel="noopener noreferrer" className="text-[#003399] hover:underline">https://www.datenschutzzentrum.de/</a>
              </p>
            </SubSection>

            <SubSection title="Recht auf Datenübertragbarkeit">
              <p>Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.</p>
            </SubSection>

            <SubSection title="SSL- bzw. TLS-Verschlüsselung">
              <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.</p>
            </SubSection>

            <SubSection title="Auskunft, Sperrung, Löschung">
              <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.</p>
            </SubSection>

            <SubSection title="Widerspruch gegen Werbe-Mails" last>
              <p>Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.</p>
            </SubSection>
          </Section>

          {/* 4 */}
          <Section title="Datenschutzbeauftragter">
            <SubSection title="Gesetzlich vorgeschriebener Datenschutzbeauftragter" last>
              <p>Wir haben für unser Unternehmen einen Datenschutzbeauftragten bestellt.</p>
              <p className="mt-3">
                Frank-H. Rix Managementsysteme<br />
                Fax: 0431 570 37 52<br />
                E-Mail: <a href="mailto:info@rix-datenschutz.de" className="text-[#003399] hover:underline">info@rix-datenschutz.de</a>
              </p>
            </SubSection>
          </Section>

          {/* 5 */}
          <Section title="Datenerfassung auf unserer Website">
            <SubSection title="Cookies">
              <p>Diese Website selbst setzt keine Analyse- oder Tracking-Cookies und bindet keine Werbenetzwerke ein. Die beim Aufruf angezeigte Cookie-Auswahl steuert ausschließlich das Nachladen der unten genannten Drittanbieter-Inhalte (Google Maps, RaceResult). Technisch notwendige Session-Daten (z. B. Ihre Consent-Entscheidung) werden lokal in Ihrem Browser gespeichert (<code>localStorage</code>), nicht als Cookie und nicht an uns übertragen.</p>
              <p className="mt-3">Sie können Ihre Consent-Entscheidung jederzeit über den Cookie-Banner am unteren Bildschirmrand ändern; ein Klick auf „Einstellungen" beim erneuten Laden der Seite genügt dafür.</p>
            </SubSection>

            <SubSection title="Google Maps">
              <p>Auf der Seite „Strecke" binden wir eine interaktive Karte des Anbieters Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google") ein, um den Veranstaltungsort zu zeigen. Die Karte wird erst geladen, wenn Sie ihr im Cookie-Banner ausdrücklich zustimmen oder aktiv auf die Kartenvorschau klicken. Erst dann baut Ihr Browser eine Verbindung zu Google-Servern auf; dabei werden Ihre IP-Adresse und weitere Nutzungsdaten an Google übertragen und dort ggf. auch außerhalb der EU/des EWR verarbeitet. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#003399] hover:underline break-all">https://policies.google.com/privacy</a>.</p>
            </SubSection>

            <SubSection title="RaceResult (Anmeldeformular)">
              <p>Die Online-Anmeldung zum Volkslauf erfolgt über ein eingebettetes Formular des Anbieters RaceResult AG, Bahnhofstrasse 30, 6210 Sursee, Schweiz. Beim Laden des Formulars werden Ihre IP-Adresse und technische Nutzungsdaten an RaceResult übertragen; bei der Anmeldung selbst verarbeitet RaceResult die von Ihnen eingegebenen Teilnehmerdaten in unserem Auftrag zur Durchführung der Veranstaltung. Rechtsgrundlage ist die Erfüllung vorvertraglicher bzw. vertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO). Informationen des Anbieters: <a href="https://www.raceresult.com/de/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#003399] hover:underline break-all">https://www.raceresult.com/de/privacy/</a>.</p>
            </SubSection>

            <SubSection title="Kontaktformular und Newsletter-Anmeldung">
              <p>Wenn Sie uns über das Kontaktformular oder die Newsletter-Anmeldung eine Nachricht senden, werden die von Ihnen angegebenen Daten (Name, E-Mail-Adresse, ggf. Nachrichtentext) per E-Mail an unser Postfach <a href="mailto:info@otn-olympia-volkslauf.de" className="text-[#003399] hover:underline">info@otn-olympia-volkslauf.de</a> weitergeleitet. Eine Speicherung in einer Datenbank findet nicht statt; die Daten verbleiben ausschließlich in diesem Postfach, solange die Bearbeitung Ihrer Anfrage es erfordert bzw. solange sie nicht von Ihnen gelöscht werden. Rechtsgrundlage ist Ihre Einwilligung bei Absenden des Formulars (Art. 6 Abs. 1 lit. a DSGVO) bzw. die Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO).</p>
            </SubSection>

            <SubSection title="Server-Log-Dateien">
              <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="mt-3">Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.</p>
            </SubSection>

            <SubSection title="Verarbeiten von Anmeldedaten (Veranstaltungsteilnahme)">
              <p>Wenn Sie sich über das eingebundene RaceResult-Formular zum Volkslauf anmelden, erheben und verarbeiten wir die dafür notwendigen Teilnehmerdaten (z. B. Name, Geburtsjahr, Kontaktdaten, Lauf-Kategorie) zur Durchführung der Veranstaltung. Dies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Details zur Verarbeitung durch RaceResult selbst entnehmen Sie dem Abschnitt „RaceResult (Anmeldeformular)" weiter oben.</p>
            </SubSection>

            <SubSection title="Datenübermittlung an Dritte" last>
              <p>Wir übermitteln personenbezogene Daten an Dritte nur dann, wenn dies zur Durchführung der Veranstaltung notwendig ist (z. B. an RaceResult zur Anmeldeabwicklung, siehe oben) oder Sie ausdrücklich zugestimmt haben. Eine Weitergabe Ihrer Daten zu Werbezwecken erfolgt nicht.</p>
            </SubSection>
          </Section>

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
    <div className="mb-10 pb-10 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
      <h2 className="text-lg font-bold text-[#003399] mb-5">{title}</h2>
      <div className="space-y-5">{children}</div>
    </div>
  )
}

function SubSection({ title, children, last = false }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={last ? '' : 'pb-5 border-b border-gray-50'}>
      <h3 className="font-semibold text-gray-800 text-sm mb-2">{title}</h3>
      <div className="text-gray-600 text-sm leading-relaxed">{children}</div>
    </div>
  )
}
