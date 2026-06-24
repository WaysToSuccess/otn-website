import { BadgeCheck, BarChart3, Camera, ChevronRight, DollarSign, LockKeyhole, MessageSquareText, ShieldCheck, Sparkles, UploadCloud, Users } from 'lucide-react'
import './MarketplaceHowItWorksPage.css'

const steps = [
  {
    icon: BadgeCheck,
    title: '1. Kostenlos registrieren',
    text: 'Lege dein Konto an, bestätige deine Angaben und richte dein Verkäuferprofil sauber ein. So entsteht von Anfang an Vertrauen.',
  },
  {
    icon: UploadCloud,
    title: '2. Inhalte hochladen',
    text: 'Erstelle deine ersten Angebote, lade Bilder oder Videos hoch und ordne alles in klare Kategorien ein. Schnell, übersichtlich und flexibel.',
  },
  {
    icon: DollarSign,
    title: '3. Preise festlegen und verkaufen',
    text: 'Bestimme deine Preise selbst, beantworte Anfragen und verdiene mit deinen Inhalten direkt über deine eigene Verkaufsseite.',
  },
]

const sellerActions = [
  {
    icon: MessageSquareText,
    title: 'Nachrichten beantworten',
    text: 'Reagiere auf Käuferanfragen direkt im Dashboard und halte den Kontakt professionell und schnell.',
  },
  {
    icon: BarChart3,
    title: 'Einnahmen verfolgen',
    text: 'Behalte Verkäufe, Klicks und Top-Inhalte im Blick, damit du weißt, was gut funktioniert.',
  },
  {
    icon: Sparkles,
    title: 'Angebote optimieren',
    text: 'Passe Titel, Preise und Vorschauen an, um deine Sichtbarkeit und Conversion zu verbessern.',
  },
  {
    icon: ShieldCheck,
    title: 'Privat bleiben',
    text: 'Arbeite diskret, kontrolliere deine Veröffentlichungen und nutze Einstellungen für mehr Schutz.',
  },
]

const perks = [
  'Schneller Start ohne komplizierte Technik',
  'Volle Kontrolle über Preise und Inhalte',
  'Sauberes Dashboard für Verkäufe und Anfragen',
  'Diskretes Arbeiten mit privatem Profil',
]

export default function MarketplaceHowItWorksPage() {
  return (
    <main className="marketplace-page">
      <section className="hero-shell">
        <div className="hero-copy">
          <span className="eyebrow">Verkäuferbereich</span>
          <h1>So funktioniert dein Verkauf in 3 einfachen Schritten</h1>
          <p className="lead">
            Eine moderne Plattform für Creator, die Inhalte übersichtlich anbieten, Preise selbst
            festlegen und ihre Verkäufe professionell verwalten möchten.
          </p>

          <div className="hero-actions">
            <a href="#steps" className="primary-btn">
              In 3 Schritten starten
              <ChevronRight size={18} />
            </a>
            <a href="#seller-tools" className="secondary-btn">
              Was du danach tun kannst
            </a>
          </div>

          <ul className="perks">
            {perks.map((perk) => (
              <li key={perk}>
                <LockKeyhole size={16} />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="hero-panel" aria-label="Plattform-Highlights">
          <div className="panel-card panel-card-top">
            <Camera className="panel-icon" />
            <div>
              <strong>Einfacher Content-Upload</strong>
              <p>Fotos, Videos und Pakete strukturiert verwalten.</p>
            </div>
          </div>
          <div className="panel-stat">
            <span>Alles im Blick</span>
            <strong>Upload · Preis · Anfrage · Auszahlung</strong>
          </div>
          <div className="panel-card">
            <Users className="panel-icon" />
            <div>
              <strong>Direkter Kontakt</strong>
              <p>Antworten auf Nachrichten, Bestellungen und Sonderwünsche.</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="section-block" id="steps">
        <div className="section-heading">
          <span className="eyebrow">Der Ablauf</span>
          <h2>In drei Schritten vom Profil zum Verkauf</h2>
          <p>Ein klarer, kompakter Prozess, der dir den Einstieg leicht macht.</p>
        </div>

        <div className="step-grid">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <article className="step-card" key={step.title}>
                <div className="step-icon-wrap">
                  <Icon className="step-icon" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section-block split-block" id="seller-tools">
        <div className="section-heading left">
          <span className="eyebrow">Als Verkäufer</span>
          <h2>Was du danach auf der Plattform tun kannst</h2>
          <p>
            Sobald dein Angebot steht, helfen dir die wichtigsten Tools dabei, professionell zu
            arbeiten und gezielt zu wachsen.
          </p>
        </div>

        <div className="action-grid">
          {sellerActions.map((item) => {
            const Icon = item.icon
            return (
              <article className="action-card" key={item.title}>
                <Icon className="action-icon" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="cta-block">
        <div>
          <span className="eyebrow light">Schnellstart</span>
          <h2>Starte mit einer sauberen, starken Verkäuferseite</h2>
          <p>
            Klare Struktur, starke Präsentation und ein Workflow, der dir den Alltag einfacher
            macht.
          </p>
        </div>
        <a href="#steps" className="primary-btn light">
          Jetzt loslegen
          <ChevronRight size={18} />
        </a>
      </section>
    </main>
  )
}
