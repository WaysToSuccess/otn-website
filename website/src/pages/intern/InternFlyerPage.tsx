import { useEffect, useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'
import { Download } from 'lucide-react'
import InternLayout from './InternLayout'

const REGISTRATION_URL = 'https://www.otn-olympia-volkslauf.de/#anmelden'
const AI = '/images/flyer-ai'

const goldSponsors = [
  { logo: '/images/o.t.n_Logo transparent.png', name: 'o.t.n' },
  { logo: '/images/Sponsor/Dabei/doksbau logo transparent.png', name: 'Doksbau' },
  { logo: '/images/Sponsor/Dabei/H-Projektierung Logo Transparent.webp', name: 'H-Projektierung' },
  { logo: '/images/Sponsor/Dabei/juzo_logo transparent.png', name: 'JUZO' },
]
const silverSponsors = [
  { logo: '/images/Sponsor/Dabei/Brandes_logo transparent.webp', name: 'Brandes' },
  { logo: '/images/Sponsor/Dabei/Bauerfeind_Logo Transparent.png', name: 'Bauerfeind' },
  { logo: '/images/Sponsor/Dabei/Farbenzauber.png', name: 'Farbenzauber' },
]
const bronzeSponsors = [
  { logo: '/images/Sponsor/Dabei/ARAG_Logo transparent.png', name: 'ARAG' },
  { logo: '/images/Sponsor/Dabei/glaus_logo transparent.webp', name: 'Glaus' },
  { logo: '/images/Sponsor/Dabei/VR_Bank_zwischen_den_Meeren logo transparent.webp', name: 'VR Bank' },
  { logo: '/images/Sponsor/Dabei/Netkom_Logo transparent.webp', name: 'Netkom' },
  { logo: '/images/Sponsor/Dabei/Provinzial_Logo_transparent neu.png', name: 'Provinzial' },
  { logo: '/images/Sponsor/Dabei/mks_bauelemente transparent.webp', name: 'MKS Bauelemente' },
  { logo: '/images/Sponsor/Dabei/ossur logo transparent.webp', name: 'Össur' },
  { logo: '/images/Sponsor/Dabei/Tackmann_Bäckerei_Logo Transparent.png', name: 'Tackmann Bäckerei' },
  { logo: '/images/Sponsor/Dabei/Lithon_Betonwerk_Logo transparent.webp', name: 'Lithon Betonwerk' },
  { logo: '/images/Sponsor/Dabei/Mirek_Bau_logo transparent.webp', name: 'Mirek Bau' },
  { logo: '/images/Sponsor/Dabei/Partnerschaft_für_Demokratie_logo transparent.webp', name: 'Partnerschaft für Demokratie' },
  { logo: '/images/Sponsor/Dabei/perfectone-werbeagentur-removebg-preview.png', name: 'Perfectone Werbeagentur' },
  { logo: '/images/Sponsor/Dabei/transcoject Logo transparent.webp', name: 'Transcoject' },
]

// ───────────────────────── Flyer 1 (Original) ─────────────────────────

function FlyerFrontV1() {
  return (
    <div className="flyer-page">
      <div className="flyer-header">
        <div className="flyer-logos-row">
          <img src="/images/o.t.n_Logo transparent.png" alt="o.t.n" />
          <div className="flyer-sep" />
          <img src="/images/MSTV_Olympia_Neumünster transparent.png" alt="MSTV Olympia" />
          <div className="flyer-veranstalter">Veranstalter:<br />o.t.n &amp; MSTV Olympia 1859 e.V.</div>
        </div>
        <div className="flyer-kicker flyer-kicker-white">Samstag, 5. September 2026</div>
        <div className="flyer-title">51. Volkslauf bei Olympia</div>
        <div className="flyer-subtitle">Bambinilauf · 5&nbsp;km · 10&nbsp;km · mitten in Neumünster</div>
      </div>

      <div className="flyer-training">
        <div className="flyer-t-title">Kostenlose Lauftrainings</div>
        <div className="flyer-t-body">Jeden Mittwoch ab 18:00 Uhr am MTSV Olympia, Forstweg 5, für Einsteiger &amp; Fortgeschrittene (ab 8. Juli 2026).</div>
      </div>

      <div className="flyer-openair">1. Gartenstadt Open Air mit DJ · Einlass ab 19:00 Uhr</div>

      <div className="flyer-facts">
        <div className="flyer-fact">
          <div className="flyer-dot">1</div>
          <div><b>Start: 17:00 Uhr (5/10 km)</b><span className="flyer-hint">Bambinilauf bereits um 16:15 Uhr</span></div>
        </div>
        <div className="flyer-fact">
          <div className="flyer-dot">2</div>
          <div><b>Forstweg 5, 24537 Neumünster</b><span className="flyer-hint">Olympia-Platz / Stadion</span></div>
        </div>
      </div>

      <div className="flyer-chips">
        <div className="flyer-chip">400&nbsp;m</div>
        <div className="flyer-chip">5&nbsp;km</div>
        <div className="flyer-chip">10&nbsp;km</div>
      </div>

      <div className="flyer-tier-block">
        <div className="flyer-tier-heading flyer-gold"><span className="flyer-line" />Gold-Sponsoren<span className="flyer-line flyer-r" /></div>
        <div className="flyer-tier-grid flyer-tier-grid-4">
          {goldSponsors.map(s => (
            <div key={s.name} className="flyer-tier-tile flyer-gold-tile"><img src={s.logo} alt={s.name} /></div>
          ))}
        </div>
        <div className="flyer-tier-heading flyer-silver"><span className="flyer-line" />Silber-Sponsoren<span className="flyer-line flyer-r" /></div>
        <div className="flyer-tier-grid">
          {silverSponsors.map(s => (
            <div key={s.name} className="flyer-tier-tile flyer-silver-tile"><img src={s.logo} alt={s.name} /></div>
          ))}
        </div>
        <div className="flyer-tier-heading flyer-bronze flyer-tier-heading-bronze"><span className="flyer-line" />Bronze-Sponsoren<span className="flyer-line flyer-r" /></div>
        <div className="flyer-tier-grid-bronze">
          {bronzeSponsors.map(s => (
            <div key={s.name} className="flyer-bronze-tile"><img src={s.logo} alt={s.name} /></div>
          ))}
        </div>
      </div>

      <div className="flyer-cta">
        <div className="flyer-qr"><QRCodeSVG value={REGISTRATION_URL} size={256} fgColor="#043598" bgColor="#ffffff" level="M" style={{ width: '100%', height: '100%' }} /></div>
        <div className="flyer-cta-txt"><b>Jetzt anmelden</b>otn-olympia-volkslauf.de<br />Anmeldung über Race Result<br />info@otn-olympia-volkslauf.de</div>
      </div>
    </div>
  )
}

function FlyerBackV1() {
  return (
    <div className="flyer-page">
      <div className="flyer-header">
        <div className="flyer-logos-row">
          <img src="/images/o.t.n_Logo transparent.png" alt="o.t.n" />
          <div className="flyer-sep" />
          <img src="/images/MSTV_Olympia_Neumünster transparent.png" alt="MSTV Olympia" />
          <div className="flyer-veranstalter">Veranstalter:<br />o.t.n &amp; MSTV Olympia 1859 e.V.</div>
        </div>
        <div className="flyer-kicker flyer-kicker-white">Für Unternehmen &amp; Vereine</div>
        <div className="flyer-title">Werden Sie Sponsor</div>
        <div className="flyer-subtitle">Sichtbarkeit für Ihre Marke · Unterstützung für einen guten Zweck</div>
      </div>

      <div className="flyer-intro">
        <p>Der 51. Volkslauf bei Olympia bringt jedes Jahr hunderte Läuferinnen und Läufer sowie Familien aus Neumünster und Umgebung zusammen. Als Sponsor werden Sie sichtbarer Teil dieses Gemeinschaftserlebnisses und unterstützen gleichzeitig einen gemeinnützigen Zweck.</p>
      </div>

      <div className="flyer-benefits">
        <div className="flyer-benefit"><div className="flyer-ic flyer-ic-lg" style={{ backgroundImage: `url('${AI}/feature-visibility.png')` }} /><div><b>Sichtbarkeit</b><span>Logo auf Bannern, Website &amp; Startnummern</span></div></div>
        <div className="flyer-benefit"><div className="flyer-ic flyer-ic-lg" style={{ backgroundImage: `url('${AI}/feature-participants.png')` }} /><div><b>Ca. 600 Teilnehmende</b><span>Plus Zuschauer und Familien vor Ort im Stadion</span></div></div>
        <div className="flyer-benefit"><div className="flyer-ic flyer-ic-lg" style={{ backgroundImage: `url('${AI}/feature-charity.png')` }} /><div><b>Gemeinnütziger Zweck</b><span>100&nbsp;% des Erlöses gehen an einen guten Zweck</span></div></div>
        <div className="flyer-benefit"><div className="flyer-ic flyer-ic-lg" style={{ backgroundImage: `url('${AI}/feature-community.png')` }} /><div><b>Regionale Präsenz</b><span>Verbunden mit o.t.n &amp; MSTV Olympia 1859 e.V.</span></div></div>
      </div>

      <div className="flyer-tiers-note">
        <b>Sponsoring-Pakete:</b> Wir bieten verschiedene Stufen mit unterschiedlicher Sichtbarkeit, sprechen Sie uns für die aktuellen Konditionen einfach an.
        <div className="flyer-badges">
          <div className="flyer-badge flyer-badge-gold">Gold</div>
          <div className="flyer-badge flyer-badge-silver">Silber</div>
          <div className="flyer-badge flyer-badge-bronze">Bronze</div>
        </div>
      </div>

      <div className="flyer-spacer" />

      <div className="flyer-contact-cta">
        <div className="flyer-c-title">Jetzt Sponsor werden</div>
        <div className="flyer-c-sub">Wir freuen uns auf Ihre Anfrage, melden Sie sich einfach bei uns:</div>
        <div className="flyer-c-row">✉️ <b>info@otn-olympia-volkslauf.de</b></div>
        <div className="flyer-c-row">📞 <b>04321 / 9794-49</b></div>
        <div className="flyer-c-row">📍 <b>Wendenstraße 1, 24539 Neumünster</b></div>
      </div>

      <div className="flyer-footer">
        orthopädie.technik.nord GmbH · Wendenstr. 1, 24539 Neumünster<br />
        <b>otn-olympia-volkslauf.de</b>
      </div>
    </div>
  )
}

// ───────────────────────── Flyer 2 (KI-Bilder): identisch zu Flyer 1, nur Header-Foto + Icon-Bilder ─────────────────────────

function FlyerFrontV2() {
  return (
    <div className="flyer-page flyer-page-v2 flyer-page-v2-front">
      <div className="flyer-bg" style={{ backgroundImage: `url('/images/privat/MSTV%20Olympia%20Neum%C3%BCnster%20Laufplatz%20open%20air%20party.png')` }} />
      <div className="flyer-header flyer-header-photo" style={{ '--flyer-header-bg': `url('${AI}/header-bg.png')` } as React.CSSProperties}>
        <div className="flyer-logos-row">
          <img src="/images/o.t.n_Logo transparent.png" alt="o.t.n" />
          <div className="flyer-sep" />
          <img src="/images/MSTV_Olympia_Neumünster transparent.png" alt="MSTV Olympia" />
          <div className="flyer-veranstalter">Veranstalter:<br />o.t.n &amp; MSTV Olympia 1859 e.V.</div>
        </div>
        <div className="flyer-kicker flyer-kicker-white">Samstag, 5. September 2026</div>
        <div className="flyer-title">51. Volkslauf bei Olympia</div>
        <div className="flyer-subtitle">Bambinilauf · 5&nbsp;km · 10&nbsp;km · mitten in Neumünster</div>
      </div>

      <div className="flyer-training">
        <div className="flyer-t-title">Kostenlose Lauftrainings</div>
        <div className="flyer-t-body">Jeden Mittwoch ab 18:00 Uhr am MTSV Olympia, Forstweg 5, für Einsteiger &amp; Fortgeschrittene (ab 8. Juli 2026).</div>
      </div>

      <div className="flyer-openair">1. Gartenstadt Open Air mit DJ · Einlass ab 19:00 Uhr</div>

      <div className="flyer-facts">
        <div className="flyer-fact">
          <div className="flyer-dot">1</div>
          <div><b>Start: 17:00 Uhr (5/10 km)</b><span className="flyer-hint">Bambinilauf bereits um 16:15 Uhr</span></div>
        </div>
        <div className="flyer-fact">
          <div className="flyer-dot">2</div>
          <div><b>Forstweg 5, 24537 Neumünster</b><span className="flyer-hint">Olympia-Platz / Stadion</span></div>
        </div>
      </div>

      <div className="flyer-chips">
        <div className="flyer-chip">400&nbsp;m</div>
        <div className="flyer-chip">5&nbsp;km</div>
        <div className="flyer-chip">10&nbsp;km</div>
      </div>

      <div className="flyer-tier-block">
        <div className="flyer-tier-heading flyer-gold"><span className="flyer-line" />Gold-Sponsoren<span className="flyer-line flyer-r" /></div>
        <div className="flyer-tier-grid flyer-tier-grid-4">
          {goldSponsors.map(s => (
            <div key={s.name} className="flyer-tier-tile flyer-gold-tile"><img src={s.logo} alt={s.name} /></div>
          ))}
        </div>
        <div className="flyer-tier-heading flyer-silver"><span className="flyer-line" />Silber-Sponsoren<span className="flyer-line flyer-r" /></div>
        <div className="flyer-tier-grid">
          {silverSponsors.map(s => (
            <div key={s.name} className="flyer-tier-tile flyer-silver-tile"><img src={s.logo} alt={s.name} /></div>
          ))}
        </div>
        <div className="flyer-tier-heading flyer-bronze flyer-tier-heading-bronze"><span className="flyer-line" />Bronze-Sponsoren<span className="flyer-line flyer-r" /></div>
        <div className="flyer-tier-grid-bronze">
          {bronzeSponsors.map(s => (
            <div key={s.name} className="flyer-bronze-tile"><img src={s.logo} alt={s.name} /></div>
          ))}
        </div>
      </div>

      <div className="flyer-cta">
        <div className="flyer-qr"><QRCodeSVG value={REGISTRATION_URL} size={256} fgColor="#043598" bgColor="#ffffff" level="M" style={{ width: '100%', height: '100%' }} /></div>
        <div className="flyer-cta-txt"><b>Jetzt anmelden</b>otn-olympia-volkslauf.de<br />Anmeldung über Race Result<br />info@otn-olympia-volkslauf.de</div>
      </div>
    </div>
  )
}

function FlyerBackV2() {
  return (
    <div className="flyer-page flyer-page-v2 flyer-page-v2-back">
      <div className="flyer-bg" style={{ backgroundImage: `url('/images/privat/MSTV%20Olympia%20Neum%C3%BCnster%20Laufplatz%20L%C3%A4ufer%20-%209%20zu%2016.png')` }} />
      <div className="flyer-header flyer-header-photo" style={{ '--flyer-header-bg': `url('${AI}/header-bg-back.png')` } as React.CSSProperties}>
        <div className="flyer-logos-row">
          <img src="/images/o.t.n_Logo transparent.png" alt="o.t.n" />
          <div className="flyer-sep" />
          <img src="/images/MSTV_Olympia_Neumünster transparent.png" alt="MSTV Olympia" />
          <div className="flyer-veranstalter">Veranstalter:<br />o.t.n &amp; MSTV Olympia 1859 e.V.</div>
        </div>
        <div className="flyer-kicker flyer-kicker-white">Für Unternehmen &amp; Vereine</div>
        <div className="flyer-title">Werden Sie Sponsor</div>
        <div className="flyer-subtitle">Sichtbarkeit für Ihre Marke · guter Zweck</div>
      </div>

      <div className="flyer-intro">
        <p>Der 51. Volkslauf bei Olympia bringt jedes Jahr hunderte Läuferinnen und Läufer sowie Familien aus Neumünster und Umgebung zusammen. Als Sponsor werden Sie sichtbarer Teil dieses Gemeinschaftserlebnisses und unterstützen gleichzeitig einen gemeinnützigen Zweck.</p>
      </div>

      <div className="flyer-benefits">
        <div className="flyer-benefit"><div className="flyer-ic flyer-ic-lg" style={{ backgroundImage: `url('${AI}/feature-visibility.png')` }} /><div><b>Sichtbarkeit</b><span>Logo auf Bannern, Website &amp; Startnummern</span></div></div>
        <div className="flyer-benefit"><div className="flyer-ic flyer-ic-lg" style={{ backgroundImage: `url('${AI}/feature-participants.png')` }} /><div><b>Ca. 600 Teilnehmende</b><span>Plus Zuschauer und Familien vor Ort im Stadion</span></div></div>
        <div className="flyer-benefit"><div className="flyer-ic flyer-ic-lg" style={{ backgroundImage: `url('${AI}/feature-charity.png')` }} /><div><b>Gemeinnütziger Zweck</b><span>100&nbsp;% des Erlöses gehen an einen guten Zweck</span></div></div>
        <div className="flyer-benefit"><div className="flyer-ic flyer-ic-lg" style={{ backgroundImage: `url('${AI}/feature-community.png')` }} /><div><b>Regionale Präsenz</b><span>Verbunden mit o.t.n &amp; MSTV Olympia 1859 e.V.</span></div></div>
      </div>

      <div className="flyer-tiers-note">
        <b>Sponsoring-Pakete:</b> Wir bieten verschiedene Stufen mit unterschiedlicher Sichtbarkeit, sprechen Sie uns für die aktuellen Konditionen einfach an.
        <div className="flyer-badges">
          <div className="flyer-badge flyer-badge-gold">Gold</div>
          <div className="flyer-badge flyer-badge-silver">Silber</div>
          <div className="flyer-badge flyer-badge-bronze">Bronze</div>
        </div>
      </div>

      <div className="flyer-spacer" />

      <div className="flyer-contact-cta">
        <div className="flyer-c-title">Jetzt Sponsor werden</div>
        <div className="flyer-c-sub">Wir freuen uns auf Ihre Anfrage, melden Sie sich einfach bei uns:</div>
        <div className="flyer-c-row"><img className="flyer-inline-ic flyer-inline-ic-light" src={`${AI}/icon-mail.png`} alt="" /> <b>info@otn-olympia-volkslauf.de</b></div>
        <div className="flyer-c-row"><img className="flyer-inline-ic flyer-inline-ic-light" src={`${AI}/icon-phone.png`} alt="" /> <b>04321 / 9794-49</b></div>
        <div className="flyer-c-row"><img className="flyer-inline-ic flyer-inline-ic-light" src={`${AI}/icon-pin.png`} alt="" /> <b>Wendenstraße 1, 24539 Neumünster</b></div>
      </div>

      <div className="flyer-footer">
        orthopädie.technik.nord GmbH · Wendenstr. 1, 24539 Neumünster<br />
        <b>otn-olympia-volkslauf.de</b>
      </div>
    </div>
  )
}

// ───────────────────────── Werbebanner (19:6) ─────────────────────────

function Banner() {
  return (
    <div className="banner-page">
      <div className="banner-bg" style={{ backgroundImage: `url('/images/privat/MSTV%20Olympia%20Neum%C3%BCnster%20Laufplatz%20open%20air%20party.png')` }} />
      <div className="banner-overlay" />
      <div className="banner-content">
        <div className="banner-logos-row">
          <img src="/images/o.t.n_Logo transparent.png" alt="o.t.n" />
          <div className="banner-sep" />
          <img src="/images/MSTV_Olympia_Neumünster transparent.png" alt="MSTV Olympia" />
        </div>
        <div className="banner-kicker">Samstag, 5. September 2026 · Forstweg 5, Neumünster</div>
        <div className="banner-title">51. Volkslauf bei Olympia</div>
        <div className="banner-subtitle">Bambinilauf · 5&nbsp;km · 10&nbsp;km · mitten in Neumünster</div>
        <div className="banner-chips">
          <div className="banner-chip">400&nbsp;m</div>
          <div className="banner-chip">5&nbsp;km</div>
          <div className="banner-chip">10&nbsp;km</div>
        </div>
      </div>
      <div className="banner-cta">
        <div className="banner-qr"><QRCodeSVG value={REGISTRATION_URL} size={256} fgColor="#043598" bgColor="#ffffff" level="M" style={{ width: '100%', height: '100%' }} /></div>
        <div className="banner-cta-txt"><b>Jetzt anmelden</b>otn-olympia-volkslauf.de</div>
      </div>
    </div>
  )
}

const FLYER_STYLES = `
  .flyer-page {
    width: 99mm; height: 210mm;
    position: relative; overflow: hidden;
    display: flex; flex-direction: column;
    background: #fff; color: #1a1a1a;
    font-family: 'Segoe UI', Arial, sans-serif;
  }
  .flyer-page, .flyer-page * { font-weight: 700; }
  /* Flyer 2 only: AI background photo, clearly visible across the whole page.
     Real element (not ::before) so html-to-image reliably captures it on export. */
  .flyer-bg {
    position: absolute; inset: 0;
    background-size: cover; background-position: center;
    z-index: 0;
  }
  /* Light translucent windows around text: thin enough that the photo still
     reads through clearly, but with enough white behind the letters to stay legible. */
  .flyer-page-v2 .flyer-facts,
  .flyer-page-v2 .flyer-intro,
  .flyer-page-v2 .flyer-benefits {
    background: rgba(255,255,255,0.85);
    border-radius: 2.4mm;
    box-shadow: 0 1px 8px rgba(0,0,0,0.06);
  }
  .flyer-page-v2 .flyer-facts { padding: 0.6mm 2.6mm; margin: 0.6mm 6mm 0; }
  .flyer-page-v2 .flyer-fact { padding: 0.3mm 0; }
  .flyer-page-v2 .flyer-intro { padding: 1.4mm 2.8mm; margin: 5mm 6mm 0; }
  .flyer-page-v2 .flyer-benefits { padding: 1.4mm 2.8mm; margin: 5mm 6mm 0; gap: 2mm; }

  .flyer-page-v2 .flyer-tier-block { margin: 0 6mm; }
  .flyer-page-v2 .flyer-chips { padding-top: 0.8mm; }
  .flyer-page-v2 .flyer-tier-heading {
    background: rgba(255,255,255,0.9);
    border-radius: 2mm; padding: 1mm 2mm; margin-left: -2mm; margin-right: -2mm;
    box-shadow: 0 1px 8px rgba(0,0,0,0.06);
  }
  .flyer-page-v2 .flyer-ic { box-shadow: 0 1px 6px rgba(0,0,0,0.15); }
  .flyer-page-v2 .flyer-hint,
  .flyer-page-v2 .flyer-intro p,
  .flyer-page-v2 .flyer-benefit span,
  .flyer-page-v2 .flyer-tiers-note,
  .flyer-page-v2 .flyer-fees-line { color: #000; }

  .flyer-page-v2 .flyer-tiers-note { margin-top: 5mm; }
  .flyer-page-v2 .flyer-contact-cta { margin-top: 0.8mm; margin-bottom: 1.6mm; }
  .flyer-page-v2 .flyer-chip,
  .flyer-page-v2 .flyer-tiers-note {
    background: rgba(255,255,255,0.85) !important;
  }
  .flyer-page-v2 .flyer-training {
    background: rgba(255,255,255,0.68); border-color: rgba(13,148,136,0.5);
  }
  .flyer-page-v2 > *:not(.flyer-bg) { position: relative; z-index: 1; }

  .flyer-header { background: linear-gradient(135deg, #2253b6 0%, #043598 60%, #001c7f 100%); padding: 2.4mm 6mm 2mm; color: #fff; flex: 0 0 auto; min-height: 33.4mm; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; }
  .flyer-header-photo {
    background-image:
      linear-gradient(135deg, rgba(34,83,182,0.86) 0%, rgba(4,53,152,0.72) 60%, rgba(0,28,127,0.88) 100%),
      var(--flyer-header-bg);
    background-size: cover;
    background-position: center;
  }
  .flyer-logos-row { display: flex; align-items: center; gap: 2.5mm; background: rgba(255,255,255,0.95); border-radius: 2.5mm; padding: 1mm 2.8mm; margin-bottom: 1.5mm; }
  .flyer-logos-row img { height: 5.4mm; width: auto; object-fit: contain; }
  .flyer-sep { width: 1px; height: 5.4mm; background: rgba(4,53,152,0.25); }
  .flyer-veranstalter { font-size: 12px; color: #043598; line-height: 1.05; }
  .flyer-kicker { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: #b9cdff; margin-bottom: 0.9mm; }
  .flyer-kicker-white { color: #fff; }
  .flyer-title { font-size: 13.5pt; line-height: 1.0; white-space: nowrap; }
  .flyer-subtitle { font-size: 12px; margin-top: 1.4mm; color: #e5ecff; line-height: 1.1; }
  .flyer-footer { flex: 0 0 auto; background: #043598; color: #cdd9ff; font-size: 12px; text-align: center; padding: 1.1mm 4mm; line-height: 1.15; }
  .flyer-footer b { color: #fff; }
  .flyer-spacer { flex: 1 1 auto; min-height: 3mm; }

  .flyer-inline-ic {
    display: inline-block; width: 3.6mm; height: 3.6mm; border-radius: 50%;
    object-fit: cover; vertical-align: middle; margin-right: 1mm; margin-top: -0.6mm;
  }
  .flyer-inline-ic-light { box-shadow: 0 0 0 1px rgba(255,255,255,0.4); }

  /* Front */
  .flyer-facts { padding: 1.2mm 6mm 0; flex: 0 0 auto; }
  .flyer-fact { display: flex; align-items: flex-start; gap: 2.4mm; padding: 0.7mm 0; border-bottom: 1px solid #eef0f4; font-size: 12px; line-height: 1.2; }
  .flyer-fact:last-child { border-bottom: none; }
  .flyer-fact b { color: #043598; display: block; font-size: 14px; }
  .flyer-hint { color: #6b7280; font-size: 12px; }
  .flyer-dot { flex: 0 0 auto; width: 5mm; height: 5mm; border-radius: 50%; background: #0d9488; color: #fff; font-size: 6.8pt; display: flex; align-items: center; justify-content: center; margin-top: 0.3mm; }
  .flyer-chips { display: flex; gap: 2mm; padding: 1.4mm 6mm 0; flex: 0 0 auto; }
  .flyer-chip { flex: 1; text-align: center; border: 1.4px solid rgba(4,53,152,0.2); border-radius: 2.2mm; padding: 1.3mm 1mm; font-size: 12px; color: #043598; }
  .flyer-tier-block { padding: 0 6mm; flex: 0 0 auto; }
  .flyer-tier-heading { display: flex; align-items: center; gap: 1.8mm; margin: 1.6mm 0 1mm; font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase; }
  .flyer-line { flex: 1; height: 1px; }
  .flyer-gold { color: #92600A; }
  .flyer-gold .flyer-line { background: linear-gradient(to right, transparent, #F59E0B); }
  .flyer-gold .flyer-line.flyer-r { background: linear-gradient(to left, transparent, #F59E0B); }
  .flyer-silver { color: #374151; }
  .flyer-silver .flyer-line { background: linear-gradient(to right, transparent, #9CA3AF); }
  .flyer-silver .flyer-line.flyer-r { background: linear-gradient(to left, transparent, #9CA3AF); }
  .flyer-bronze { color: #92400E; }
  .flyer-bronze .flyer-line { background: linear-gradient(to right, transparent, #FB923C); }
  .flyer-bronze .flyer-line.flyer-r { background: linear-gradient(to left, transparent, #FB923C); }
  .flyer-tier-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2mm; }
  .flyer-tier-grid-4 { grid-template-columns: repeat(4, 1fr); gap: 1.4mm; }
  .flyer-tier-tile { border-radius: 2.2mm; display: flex; align-items: center; justify-content: center; padding: 1.6mm; height: 14mm; border: 1.4px solid; }
  .flyer-tier-tile img { max-width: 100%; max-height: 100%; object-fit: contain; }
  .flyer-gold-tile { border-color: #F59E0B; background: #FFF3C4; }
  .flyer-silver-tile { border-color: #9CA3AF; background: #F1F3F5; height: 10mm; }
  .flyer-silver-tile img { max-width: 76%; max-height: 76%; }
  .flyer-tier-heading-bronze { margin: 1mm 0 0.6mm; }
  .flyer-tier-grid-bronze { display: flex; flex-wrap: wrap; gap: 0.8mm; }
  .flyer-bronze-tile { flex: 1 1 9mm; height: 8mm; padding: 0; border-radius: 1.2mm; border: 1px solid #FB923C; background: #FFF4EB; display: flex; align-items: center; justify-content: center; }
  .flyer-bronze-tile img { max-width: 88%; max-height: 88%; object-fit: contain; }
  .flyer-training { margin: 2mm 6mm 0; background: rgba(13,148,136,0.06); border: 1px solid rgba(13,148,136,0.33); border-radius: 2.4mm; padding: 1.3mm 3.2mm; flex: 0 0 auto; }
  .flyer-t-title { font-size: 14px; color: #0f6b60; margin-bottom: 0.4mm; text-align: center; }
  .flyer-t-body { font-size: 12px; color: #0f6b60; line-height: 1.2; }
  .flyer-openair { margin: 1.2mm 6mm 0; background: #0d9488; color: #fff; border-radius: 2.4mm; padding: 1.3mm 3.2mm; flex: 0 0 auto; font-size: 12px; text-align: center; display: flex; align-items: center; justify-content: center; }
  .flyer-cta { margin: 2mm 6mm 4mm; padding: 1.8mm; border-radius: 2.6mm; background: #043598; color: #fff; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1.6mm; flex: 0 0 auto; }
  .flyer-qr { width: 22mm; height: 22mm; background: #fff; border-radius: 1.8mm; padding: 1.4mm; flex: 0 0 auto; }
  .flyer-cta-txt { font-size: 12px; line-height: 1.15; }
  .flyer-cta-txt b { display: block; font-size: 14px; margin-bottom: 0.3mm; }

  /* Back */
  .flyer-intro { padding: 1mm 6mm 0; flex: 0 0 auto; }
  .flyer-intro p { font-size: 12px; color: #444; line-height: 1.15; }
  .flyer-benefits { padding: 1mm 6mm 0; flex: 0 0 auto; display: flex; flex-direction: column; gap: 0.8mm; }
  .flyer-benefit { display: flex; gap: 2.6mm; align-items: center; }
  .flyer-ic { flex: 0 0 auto; width: 9.5mm; height: 9.5mm; border-radius: 2.2mm; background-color: rgba(4,53,152,0.07); background-size: cover; background-position: center; box-shadow: 0 1px 6px rgba(0,0,0,0.18); }
  .flyer-ic-lg { width: 10.5mm; height: 10.5mm; }
  .flyer-benefit b { font-size: 14px; color: #043598; display: block; margin-bottom: 0; line-height: 1; }
  .flyer-benefit span { display: block; font-size: 12px; color: #666; line-height: 1; }
  .flyer-tiers-note { margin: 0.8mm 6mm 0; background: #f5f7fb; border-radius: 2.4mm; padding: 1mm 2.6mm; font-size: 12px; color: #444; line-height: 1.1; flex: 0 0 auto; }
  .flyer-tiers-note b { color: #043598; }
  .flyer-badges { display: flex; gap: 1.6mm; margin-top: 0.6mm; }
  .flyer-badge { flex: 1; text-align: center; border-radius: 1.6mm; padding: 0.7mm; font-size: 12px; border: 1px solid; }
  .flyer-badge-gold { background: rgba(255,248,220,0.9); color: #92600A; border-color: rgba(245,158,11,0.44); }
  .flyer-badge-silver { background: rgba(240,242,245,0.9); color: #374151; border-color: rgba(156,163,175,0.44); }
  .flyer-badge-bronze { background: rgba(255,244,235,0.9); color: #92400E; border-color: rgba(251,146,60,0.44); }
  .flyer-contact-cta { margin: 0.8mm 6mm 1.6mm; padding: 1.5mm; border-radius: 2.6mm; background: #043598; color: #fff; flex: 0 0 auto; display: flex; flex-direction: column; gap: 0.6mm; }
  .flyer-c-title { font-size: 14px; }
  .flyer-c-sub { font-size: 12px; color: #cdd9ff; line-height: 1.1; }
  .flyer-c-row { display: flex; align-items: center; gap: 2mm; font-size: 12px; margin-top: 0.2mm; }

  /* Werbebanner 19:6 */
  .banner-page {
    width: 1900px; height: 600px;
    position: relative; overflow: hidden;
    display: flex; align-items: center;
    background: #043598; color: #fff;
    font-family: 'Segoe UI', Arial, sans-serif;
  }
  .banner-page, .banner-page * { font-weight: 700; box-sizing: border-box; }
  .banner-bg { position: absolute; inset: 0; background-size: cover; background-position: center; z-index: 0; }
  .banner-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(100deg, rgba(4,53,152,0.94) 0%, rgba(4,53,152,0.86) 42%, rgba(4,53,152,0.35) 68%, rgba(4,53,152,0.15) 100%);
    z-index: 1;
  }
  .banner-content { position: relative; z-index: 2; flex: 1 1 auto; padding: 0 40px 0 70px; display: flex; flex-direction: column; gap: 14px; }
  .banner-logos-row { display: flex; align-items: center; gap: 16px; background: rgba(255,255,255,0.95); border-radius: 14px; padding: 10px 22px; width: fit-content; }
  .banner-logos-row img { height: 46px; width: auto; object-fit: contain; }
  .banner-sep { width: 2px; height: 40px; background: rgba(4,53,152,0.25); }
  .banner-kicker { font-size: 22px; letter-spacing: 0.08em; text-transform: uppercase; color: #b9cdff; margin-top: 6px; }
  .banner-title { font-size: 64px; line-height: 1.02; }
  .banner-subtitle { font-size: 26px; color: #e5ecff; }
  .banner-chips { display: flex; gap: 14px; margin-top: 6px; }
  .banner-chip { border: 2px solid rgba(255,255,255,0.5); border-radius: 12px; padding: 8px 22px; font-size: 22px; background: rgba(255,255,255,0.08); }
  .banner-cta { position: relative; z-index: 2; flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; gap: 10px; background: rgba(255,255,255,0.98); color: #043598; border-radius: 20px; padding: 26px 34px; margin-right: 70px; }
  .banner-qr { width: 150px; height: 150px; background: #fff; }
  .banner-cta-txt { font-size: 18px; text-align: center; line-height: 1.2; }
  .banner-cta-txt b { display: block; font-size: 22px; margin-bottom: 4px; color: #043598; }
`

function ScaledBox({ children, width, height }: { children: React.ReactNode; width: number; height: number }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      if (wrapperRef.current) {
        const available = wrapperRef.current.clientWidth
        setScale(Math.min(1, available / width))
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [width])

  return (
    <div ref={wrapperRef} style={{ width: '100%', maxWidth: width }}>
      <div style={{ width: width * scale, height: height * scale, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function ScaledPreview({ children, label, onDownload, downloading, downloadLabel = 'Als PDF herunterladen', width = 374, height = 794 }: { children: React.ReactNode; label: string; onDownload: () => void; downloading: boolean; downloadLabel?: string; width?: number; height?: number }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        <span className="text-white font-bold text-base">{label}</span>
        <button
          onClick={onDownload}
          disabled={downloading}
          className="flex items-center gap-1.5 bg-white text-[#043598] font-bold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition-colors text-xs disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5" />
          {downloading ? 'Wird erstellt…' : downloadLabel}
        </button>
      </div>
      <ScaledBox width={width} height={height}>{children}</ScaledBox>
    </div>
  )
}

const VARIANTS = [
  { id: 'v1', label: 'Flyer 1' },
  { id: 'v2', label: 'Flyer 2 (KI-Bilder)' },
  { id: 'banner', label: 'Banner (19:6)' },
] as const
type VariantId = typeof VARIANTS[number]['id']

export default function InternFlyerPage() {
  useEffect(() => { document.title = 'Flyer · 51. Volkslauf bei Olympia' }, [])
  const [variant, setVariant] = useState<VariantId>('v1')
  const [downloading, setDownloading] = useState(false)
  const [downloadingBanner, setDownloadingBanner] = useState(false)

  const captureContainerRef = useRef<HTMLDivElement>(null)
  const captureFrontRef = useRef<HTMLDivElement>(null)
  const captureBackRef = useRef<HTMLDivElement>(null)
  const captureBannerRef = useRef<HTMLDivElement>(null)

  const Front = variant === 'v1' ? FlyerFrontV1 : FlyerFrontV2
  const Back = variant === 'v1' ? FlyerBackV1 : FlyerBackV2

  const downloadPdf = async () => {
    const container = captureContainerRef.current
    const frontEl = captureFrontRef.current
    const backEl = captureBackRef.current
    if (!container || !frontEl || !backEl || downloading) return

    setDownloading(true)
    // Move off-screen but keep it laid out (display:none can't be rasterized)
    container.style.display = 'block'
    container.style.position = 'fixed'
    container.style.left = '-9999px'
    container.style.top = '0'
    await new Promise(r => setTimeout(r, 60))

    try {
      // Two passes: first warms up image/font loading, second is the clean capture
      await toPng(frontEl, { pixelRatio: 3, skipAutoScale: true })
      const frontPng = await toPng(frontEl, { pixelRatio: 3, skipAutoScale: true })
      await toPng(backEl, { pixelRatio: 3, skipAutoScale: true })
      const backPng = await toPng(backEl, { pixelRatio: 3, skipAutoScale: true })

      const doc = new jsPDF({ unit: 'mm', format: [198, 210] })
      doc.addImage(frontPng, 'PNG', 0, 0, 99, 210)
      doc.addImage(backPng, 'PNG', 99, 0, 99, 210)
      doc.save(`51-volkslauf-flyer-${variant}.pdf`)
    } catch (err) {
      console.error('PDF-Erstellung fehlgeschlagen:', err)
      alert(`PDF-Erstellung fehlgeschlagen: ${err}`)
    }

    container.style.display = 'none'
    container.style.position = ''
    container.style.left = ''
    container.style.top = ''
    setDownloading(false)
  }

  const downloadBannerPng = async () => {
    const container = captureContainerRef.current
    const bannerEl = captureBannerRef.current
    if (!container || !bannerEl || downloadingBanner) return

    setDownloadingBanner(true)
    container.style.display = 'block'
    container.style.position = 'fixed'
    container.style.left = '-9999px'
    container.style.top = '0'
    await new Promise(r => setTimeout(r, 60))

    try {
      await toPng(bannerEl, { pixelRatio: 2, skipAutoScale: true })
      const png = await toPng(bannerEl, { pixelRatio: 2, skipAutoScale: true })
      const link = document.createElement('a')
      link.href = png
      link.download = '51-volkslauf-banner.png'
      link.click()
    } catch (err) {
      console.error('Banner-Erstellung fehlgeschlagen:', err)
      alert(`Banner-Erstellung fehlgeschlagen: ${err}`)
    }

    container.style.display = 'none'
    container.style.position = ''
    container.style.left = ''
    container.style.top = ''
    setDownloadingBanner(false)
  }

  return (
    <InternLayout>
      <style>{FLYER_STYLES}</style>

      <div className="min-h-screen bg-gray-950 flex flex-col items-center gap-6 py-12 px-6">
        <p className="text-white/50 text-sm max-w-md text-center">
          Flyer-Entwürfe im Format 99×210&nbsp;mm (DIN lang). Vorderseite mit Hauptinfos, Gold-/Silber-Sponsoren und Lauftraining-Hinweis. Rückseite mit Sponsor-werden-Pitch.
        </p>

        {/* In-page navigation */}
        <div className="flex gap-1 bg-white/10 rounded-xl p-1">
          {VARIANTS.map(v => (
            <button
              key={v.id}
              onClick={() => setVariant(v.id)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              style={{
                background: variant === v.id ? '#fff' : 'transparent',
                color: variant === v.id ? '#043598' : 'rgba(255,255,255,0.65)',
              }}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Side by side */}
        {variant === 'banner' ? (
          <div className="flex justify-center w-full">
            <div className="w-full" style={{ maxWidth: 950 }}>
              <ScaledPreview label="Werbebanner" onDownload={downloadBannerPng} downloading={downloadingBanner} downloadLabel="Als PNG herunterladen" width={1900} height={600}>
                <Banner />
              </ScaledPreview>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 items-start justify-center w-full">
            <ScaledPreview label="Vorderseite" onDownload={downloadPdf} downloading={downloading}><Front /></ScaledPreview>
            <ScaledPreview label="Rückseite" onDownload={downloadPdf} downloading={downloading}><Back /></ScaledPreview>
          </div>
        )}
      </div>

      {/* Unscaled, off-screen copies used as the source for PDF/PNG rasterization */}
      <div ref={captureContainerRef} style={{ display: 'none' }}>
        <div ref={captureFrontRef}><Front /></div>
        <div ref={captureBackRef}><Back /></div>
        <div ref={captureBannerRef}><Banner /></div>
      </div>
    </InternLayout>
  )
}
