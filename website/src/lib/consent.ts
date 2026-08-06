export const CONSENT_KEY = 'otn_cookie_consent'
export const CONSENT_EVENT = 'otn-consent-change'

export type ConsentDecision = 'all' | 'necessary' | 'rejected'

export function getConsentDecision(): ConsentDecision | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    return JSON.parse(raw).decision ?? null
  } catch {
    return null
  }
}

/** True once the visitor has actively agreed to load third-party embeds (Google Maps). */
export function embedsAllowed(): boolean {
  return getConsentDecision() === 'all'
}

export function setConsentDecision(decision: ConsentDecision) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ decision, date: new Date().toISOString() }))
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: decision }))
}
