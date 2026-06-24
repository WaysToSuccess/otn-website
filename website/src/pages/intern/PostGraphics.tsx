// Generiert passende SVG-Grafiken basierend auf Schlüsselwörtern im Text

function match(text: string, ...words: string[]): boolean {
  const t = text.toLowerCase()
  return words.some(w => t.includes(w))
}

// Läufer-Silhouette
const RUNNER = `<g>
  <circle cx="0" cy="-28" r="7" fill="currentColor"/>
  <line x1="0" y1="-21" x2="0" y2="-5" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
  <line x1="0" y1="-15" x2="14" y2="-8" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  <line x1="0" y1="-15" x2="-12" y2="-5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  <line x1="0" y1="-5" x2="10" y2="10" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
  <line x1="0" y1="-5" x2="-9" y2="8" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
</g>`

// Pokal
const TROPHY = `<g>
  <path d="M-18,-30 L18,-30 L14,10 Q0,20 0,20 Q0,20 -14,10 Z" fill="currentColor" opacity="0.9"/>
  <rect x="-6" y="18" width="12" height="14" fill="currentColor"/>
  <rect x="-14" y="30" width="28" height="5" rx="2" fill="currentColor"/>
  <path d="M18,-30 Q32,-30 32,-18 Q32,-6 18,2" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
  <path d="M-18,-30 Q-32,-30 -32,-18 Q-32,-6 -18,2" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
  <line x1="-8" y1="-10" x2="8" y2="-10" stroke="white" stroke-width="2" opacity="0.4"/>
  <line x1="-6" y1="-2" x2="6" y2="-2" stroke="white" stroke-width="2" opacity="0.4"/>
</g>`

// Kalender
const CALENDAR = `<g>
  <rect x="-22" y="-25" width="44" height="44" rx="5" fill="currentColor"/>
  <rect x="-22" y="-25" width="44" height="13" rx="5" fill="currentColor" opacity="0.6"/>
  <rect x="-22" y="-18" width="44" height="6" fill="currentColor" opacity="0.6"/>
  <circle cx="-8" cy="-28" r="3" fill="white" opacity="0.8"/>
  <circle cx="8" cy="-28" r="3" fill="white" opacity="0.8"/>
  <rect x="-16" y="-5" width="8" height="6" rx="1" fill="white" opacity="0.7"/>
  <rect x="-4" y="-5" width="8" height="6" rx="1" fill="white" opacity="0.7"/>
  <rect x="8" y="-5" width="8" height="6" rx="1" fill="white" opacity="0.7"/>
  <rect x="-16" y="6" width="8" height="6" rx="1" fill="white" opacity="0.7"/>
  <rect x="-4" y="6" width="8" height="6" rx="1" fill="white" opacity="0.5"/>
</g>`

// Stern / Motivation
const STAR = `<g>
  <polygon points="0,-30 7,-10 28,-10 12,4 18,25 0,13 -18,25 -12,4 -28,-10 -7,-10" fill="currentColor"/>
</g>`

// Herz / Gemeinschaft
const HEART = `<g>
  <path d="M0,20 Q-30,-5 -20,-22 Q-10,-38 0,-20 Q10,-38 20,-22 Q30,-5 0,20 Z" fill="currentColor"/>
</g>`

// Finanzband / Sponsor
const RIBBON = `<g>
  <rect x="-20" y="-32" width="40" height="48" rx="4" fill="currentColor"/>
  <polygon points="0,18 -20,35 -20,50 0,38 20,50 20,35" fill="currentColor" opacity="0.7"/>
  <circle cx="0" cy="-8" r="14" fill="white" opacity="0.2"/>
  <text x="0" y="-3" text-anchor="middle" font-size="14" fill="white" font-weight="bold">★</text>
</g>`

// Zielband / Finish
const FINISH = `<g>
  <rect x="-40" y="-4" width="80" height="8" fill="currentColor"/>
  <rect x="-40" y="-4" width="10" height="8" fill="white" opacity="0.5"/>
  <rect x="-20" y="-4" width="10" height="8" fill="white" opacity="0.5"/>
  <rect x="0" y="-4" width="10" height="8" fill="white" opacity="0.5"/>
  <rect x="20" y="-4" width="10" height="8" fill="white" opacity="0.5"/>
  <line x1="-40" y1="-20" x2="-40" y2="20" stroke="currentColor" stroke-width="4"/>
  <line x1="40" y1="-20" x2="40" y2="20" stroke="currentColor" stroke-width="4"/>
</g>`

// Medaille
const MEDAL = `<g>
  <circle cx="0" cy="8" r="22" fill="currentColor"/>
  <circle cx="0" cy="8" r="16" fill="currentColor" opacity="0.6"/>
  <text x="0" y="14" text-anchor="middle" font-size="16" fill="white" font-weight="900">1</text>
  <rect x="-6" y="-30" width="12" height="16" rx="2" fill="currentColor" opacity="0.7"/>
  <path d="M-6,-14 Q0,-8 6,-14" fill="none" stroke="currentColor" stroke-width="2"/>
</g>`

// Puls/Sport
const PULSE = `<g>
  <polyline points="-45,0 -25,0 -15,-25 -5,25 5,-15 15,15 25,0 45,0"
    fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</g>`

// Wellen-Dekor
const WAVE = `<g>
  <path d="M-60,0 Q-40,-20 -20,0 Q0,20 20,0 Q40,-20 60,0" fill="none" stroke="currentColor" stroke-width="4" opacity="0.5"/>
  <path d="M-60,15 Q-40,-5 -20,15 Q0,35 20,15 Q40,-5 60,15" fill="none" stroke="currentColor" stroke-width="3" opacity="0.3"/>
</g>`

function detectScene(text: string): { icon: string; deco: string } {
  const t = text.toLowerCase()

  if (match(t, 'volkslauf', 'lauf', 'läufer', 'runner', 'laufen', 'marathon', 'sprint', 'nordic')) {
    return {
      icon: RUNNER,
      deco: `
        <g transform="translate(80,80) scale(1.6)" color="white" opacity="0.08">${RUNNER}</g>
        <g transform="translate(260,200) scale(1.1)" color="white" opacity="0.05">${RUNNER}</g>
        <g transform="translate(160,280) scale(0.9)" color="white" opacity="0.06">${WAVE}</g>
        <g transform="translate(280,100) scale(0.8)" color="white" opacity="0.1">${FINISH}</g>
      `
    }
  }
  if (match(t, 'ergebnis', 'gewinner', 'platz', 'sieger', 'pokal', 'medal', 'podium', 'erste', '1.', '2.', '3.')) {
    return {
      icon: TROPHY,
      deco: `
        <g transform="translate(260,80) scale(1.8)" color="white" opacity="0.07">${TROPHY}</g>
        <g transform="translate(80,200) scale(1.2)" color="white" opacity="0.06">${MEDAL}</g>
        <g transform="translate(200,260) scale(0.9)" color="white" opacity="0.05">${STAR}</g>
      `
    }
  }
  if (match(t, 'anmeldung', 'registrier', 'datum', 'termin', 'wann', 'start')) {
    return {
      icon: CALENDAR,
      deco: `
        <g transform="translate(250,90) scale(1.6)" color="white" opacity="0.07">${CALENDAR}</g>
        <g transform="translate(80,240) scale(1.2)" color="white" opacity="0.05">${PULSE}</g>
        <g transform="translate(200,180) scale(0.9)" color="white" opacity="0.06">${WAVE}</g>
      `
    }
  }
  if (match(t, 'sponsor', 'partner', 'förder', 'unterstütz')) {
    return {
      icon: RIBBON,
      deco: `
        <g transform="translate(260,80) scale(1.6)" color="white" opacity="0.07">${RIBBON}</g>
        <g transform="translate(80,200) scale(1.4)" color="white" opacity="0.05">${STAR}</g>
        <g transform="translate(200,280) scale(0.9)" color="white" opacity="0.06">${WAVE}</g>
      `
    }
  }
  if (match(t, 'motivation', 'stark', 'power', 'energie', 'challenge', 'ziel')) {
    return {
      icon: STAR,
      deco: `
        <g transform="translate(260,80) scale(1.5)" color="white" opacity="0.08">${STAR}</g>
        <g transform="translate(80,230) scale(1.8)" color="white" opacity="0.05">${PULSE}</g>
        <g transform="translate(200,170) scale(1)" color="white" opacity="0.06">${STAR}</g>
      `
    }
  }
  if (match(t, 'gemeinschaft', 'gemeinsam', 'team', 'zusammen', 'wir', 'verein')) {
    return {
      icon: HEART,
      deco: `
        <g transform="translate(260,80) scale(1.5)" color="white" opacity="0.07">${HEART}</g>
        <g transform="translate(80,240) scale(1.8)" color="white" opacity="0.05">${RUNNER}</g>
        <g transform="translate(200,200) scale(0.9)" color="white" opacity="0.05">${WAVE}</g>
      `
    }
  }
  if (match(t, 'gesundheit', 'fitness', 'sport', 'aktiv', 'bewegung', 'orthopädie', 'otn')) {
    return {
      icon: PULSE,
      deco: `
        <g transform="translate(40,140) scale(1.6)" color="white" opacity="0.07">${PULSE}</g>
        <g transform="translate(200,260) scale(1.2)" color="white" opacity="0.05">${HEART}</g>
        <g transform="translate(250,80) scale(0.9)" color="white" opacity="0.06">${WAVE}</g>
      `
    }
  }
  // Default
  return {
    icon: WAVE,
    deco: `
      <g transform="translate(160,260) scale(1.8)" color="white" opacity="0.07">${WAVE}</g>
      <g transform="translate(260,100) scale(1.2)" color="white" opacity="0.05">${WAVE}</g>
    `
  }
}

export function PostGraphics({ text, accent, size }: { text: string; accent: string; size: number }) {
  const scene = detectScene(text)
  const scale = size / 340

  return (
    <svg
      viewBox="0 0 340 340"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dekor-Hintergrund */}
      <g dangerouslySetInnerHTML={{ __html: scene.deco }} />

      {/* Hauptgrafik oben rechts */}
      <g transform={`translate(${280 * scale + 60 * (1 - scale)}, ${80 * scale + 60 * (1 - scale)}) scale(${1.8 * scale})`}
        color={accent} opacity="0.18">
        <g dangerouslySetInnerHTML={{ __html: scene.icon }} />
      </g>
    </svg>
  )
}
