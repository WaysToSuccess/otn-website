export interface InternEnv {
  INTERN_PASSWORD?: string
  INTERN_TOKEN_SECRET?: string
}

// Fallback so the intern area still works if the Cloudflare Pages
// env vars haven't been configured yet. Override via INTERN_PASSWORD
// in production.
export const FALLBACK_PASSWORD = 'otn2026-intern'
export const TOKEN_TTL_MS = 1000 * 60 * 60 * 12 // 12h

function toBase64Url(bytes: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export async function sign(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return toBase64Url(sig)
}

export function getSecret(env: InternEnv): { password: string; secret: string } {
  const password = env.INTERN_PASSWORD || FALLBACK_PASSWORD
  const secret = env.INTERN_TOKEN_SECRET || password
  return { password, secret }
}
