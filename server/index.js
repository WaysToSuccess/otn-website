import 'dotenv/config'
import crypto from 'crypto'
import express from 'express'
import nodemailer from 'nodemailer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

// Hinter nginx: X-Forwarded-For nur vom eigenen Reverse-Proxy vertrauen
app.set('trust proxy', 1)

// SMTP-Transporter — Zugangsdaten aus .env
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // rejectUnauthorized bleibt aktiv; für selbstsignierte Zertifikate stattdessen
  // SMTP_CA_CERT (PEM-Pfad) setzen statt die Prüfung global abzuschalten.
  ...(process.env.SMTP_CA_CERT ? { tls: { ca: [process.env.SMTP_CA_CERT] } } : {}),
})

// Basis-Security-Header (falls der Server ohne nginx davor direkt exponiert wird)
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()')
  next()
})

// JSON-Body parsen (max 10kb — kein Upload-Missbrauch)
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false, limit: '10kb' }))

// Einfaches Rate-Limiting pro IP (In-Memory, reicht für kleines Projekt)
const rateMap = new Map()
function rateLimit(ip, maxPerMinute = 3) {
  const now = Date.now()
  const entry = rateMap.get(ip) ?? { count: 0, reset: now + 60_000 }
  if (now > entry.reset) { entry.count = 0; entry.reset = now + 60_000 }
  entry.count++
  rateMap.set(ip, entry)
  return entry.count > maxPerMinute
}

// Abgelaufene Einträge periodisch entfernen, damit die Map nicht unbegrenzt wächst
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateMap) {
    if (now > entry.reset) rateMap.delete(ip)
  }
}, 5 * 60_000).unref()

// ── POST /api/intern-auth ──────────────────────────────────────────────────
// Passwortprüfung für den internen Bereich läuft serverseitig (INTERN_PASSWORD
// aus .env), damit kein Klartext-Passwort mehr im ausgelieferten JS-Bundle
// steht. Erfolgreiche Prüfung liefert ein signiertes, 8h gültiges Token.
const INTERN_TOKEN_TTL_MS = 8 * 60 * 60 * 1000
function signInternToken() {
  const expires = Date.now() + INTERN_TOKEN_TTL_MS
  const sig = crypto.createHmac('sha256', process.env.INTERN_TOKEN_SECRET ?? process.env.INTERN_PASSWORD ?? '')
    .update(String(expires)).digest('hex')
  return `${expires}.${sig}`
}
function verifyInternToken(token) {
  if (!token || typeof token !== 'string') return false
  const [expiresStr, sig] = token.split('.')
  const expires = Number(expiresStr)
  if (!expires || Date.now() > expires || !sig) return false
  const expected = crypto.createHmac('sha256', process.env.INTERN_TOKEN_SECRET ?? process.env.INTERN_PASSWORD ?? '')
    .update(expiresStr).digest('hex')
  return sig.length === expected.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
}

app.post('/api/intern-auth', (req, res) => {
  if (rateLimit(req.ip, 10)) return res.status(429).json({ ok: false })

  const { password } = req.body
  const expected = process.env.INTERN_PASSWORD
  if (!expected || typeof password !== 'string' ||
      password.length !== expected.length ||
      !crypto.timingSafeEqual(Buffer.from(password), Buffer.from(expected))) {
    return res.status(401).json({ ok: false })
  }
  res.json({ ok: true, token: signInternToken() })
})

app.post('/api/intern-verify', (req, res) => {
  res.json({ ok: verifyInternToken(req.body?.token) })
})

// ── POST /api/contact ──────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  if (rateLimit(req.ip)) return res.status(429).json({ ok: false, error: 'Zu viele Anfragen' })

  const { Name, Email, Nachricht, _honey } = req.body

  // Honeypot — Bots füllen dieses Feld aus
  if (_honey) return res.json({ ok: true }) // Fake-Erfolg

  // Eingaben validieren
  if (!Name || typeof Name !== 'string' || Name.trim().length > 100)
    return res.status(400).json({ ok: false })
  if (!Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email) || Email.length > 200)
    return res.status(400).json({ ok: false })
  if (!Nachricht || typeof Nachricht !== 'string' || Nachricht.trim().length > 2000)
    return res.status(400).json({ ok: false })

  const name    = Name.trim()
  const message = Nachricht.trim()

  try {
    await transporter.sendMail({
      from:    `"Volkslauf Website" <${process.env.SMTP_USER}>`,
      to:      process.env.MAIL_TO ?? 'info@otn-olympia-volkslauf.de',
      replyTo: Email,
      subject: 'Neue Kontaktanfrage – Volkslauf Neumünster',
      text: `Name: ${name}\nE-Mail: ${Email}\n\nNachricht:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>E-Mail:</strong> ${esc(Email)}</p>
        <hr>
        <p><strong>Nachricht:</strong></p>
        <p>${esc(message).replace(/\n/g, '<br>')}</p>
      `,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('Mail-Fehler:', err.message)
    res.status(500).json({ ok: false })
  }
})

// ── POST /api/newsletter ───────────────────────────────────────────────────
app.post('/api/newsletter', async (req, res) => {
  if (rateLimit(req.ip)) return res.status(429).json({ ok: false })

  const { Email, _honey } = req.body

  // Honeypot — Bots füllen dieses Feld aus
  if (_honey) return res.json({ ok: true }) // Fake-Erfolg

  if (!Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email))
    return res.status(400).json({ ok: false })

  try {
    await transporter.sendMail({
      from:    `"Volkslauf Website" <${process.env.SMTP_USER}>`,
      to:      process.env.MAIL_TO ?? 'info@otn-olympia-volkslauf.de',
      subject: 'Newsletter-Anmeldung – Volkslauf Neumünster',
      text:    `Neue Newsletter-Anmeldung:\n${Email}`,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('Newsletter-Fehler:', err.message)
    res.status(500).json({ ok: false })
  }
})

// ── Statische Dateien (Vite-Build) ausliefern ─────────────────────────────
const DIST = join(__dirname, '../website/dist')
app.use(express.static(DIST))

// SPA-Fallback: alle unbekannten Routen → index.html
app.get('*', (_req, res) => {
  res.sendFile(join(DIST, 'index.html'))
})

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`))

// HTML-Sonderzeichen escapen (XSS-Schutz im HTML-Mail)
function esc(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
