import { useState, useRef } from 'react'
import { Mail, MapPin, Send, Bell, Phone } from 'lucide-react'
import { useInView, anim } from '../../hooks/useInView'

const RECIPIENT = 'info@otn-olympia-volkslauf.de'
const FORMSUBMIT_URL = `https://formsubmit.co/${RECIPIENT}`

export default function VlContact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [newsletter, setNewsletter] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [agreeError, setAgreeError] = useState(false)
  const honeypotRef = useRef<HTMLInputElement>(null)
  const { ref: headRef, visible: headVisible } = useInView()
  const { ref: leftRef, visible: leftVisible } = useInView()
  const { ref: rightRef, visible: rightVisible } = useInView()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!agreed) { setAgreeError(true); return }
    // Honeypot check — bots fill hidden field
    if (honeypotRef.current?.value) return

    const form = e.currentTarget
    const data = new FormData(form)
    data.append('_subject', 'Neue Kontaktanfrage – Volkslauf Neumünster')
    data.append('_template', 'table')
    data.append('_captcha', 'false')

    setStatus('sending')
    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
        setAgreed(false)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleNewsletterSubmit = async () => {
    if (!newsletterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) return
    const data = new FormData()
    data.append('Email', newsletterEmail)
    data.append('Anfrage', 'Newsletter-Anmeldung')
    data.append('_subject', 'Newsletter-Anmeldung – Volkslauf Neumünster')
    data.append('_template', 'table')
    data.append('_captcha', 'false')
    try {
      await fetch(FORMSUBMIT_URL, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
    } catch { /* silent */ }
    setNewsletter(true)
  }

  return (
    <section id="kontakt" className="py-24" style={{ background: '#002080' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headRef} style={anim(headVisible)} className="text-center mb-14">
          <span className="inline-block text-[#2dd4bf] font-semibold text-xs uppercase tracking-[0.2em] px-4 py-1.5 bg-white/10 rounded-full mb-4">Kontakt</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">Fragen zum Volkslauf?</h2>
          <p className="text-blue-300 text-sm">Wir helfen Ihnen gerne weiter.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div ref={leftRef} style={anim(leftVisible, 0, 'left')}>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#2dd4bf]" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-0.5 text-sm">E-Mail</div>
                  <a href="mailto:info@otn-olympia-volkslauf.de" className="text-blue-200 hover:text-white transition-colors text-sm">info@otn-olympia-volkslauf.de</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#2dd4bf]" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-0.5 text-sm">Telefon</div>
                  <a href="tel:+494321979449" className="text-blue-200 hover:text-white transition-colors text-sm">04321 / 9794-49</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#2dd4bf]" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-0.5 text-sm">Veranstaltungsort</div>
                  <p className="text-blue-200 text-sm">MTSV Olympia von 1859 e.V.<br />Forstweg 5, 24537 Neumünster</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Bell className="w-5 h-5 text-[#2dd4bf]" />
                <h3 className="font-semibold text-white text-sm">Bleiben Sie informiert</h3>
              </div>
              <p className="text-blue-300 text-xs mb-4">Newsletter für Updates zum Volkslauf & Gartenstadt Open Air</p>
              {newsletter ? (
                <p className="text-[#2dd4bf] text-sm font-medium">Danke! Sie erhalten bald unsere Updates.</p>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="Ihre E-Mail"
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-blue-300 text-sm focus:outline-none focus:border-[#2dd4bf] transition-colors"
                  />
                  <button
                    onClick={handleNewsletterSubmit}
                    className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-[#003399] font-semibold px-4 py-2.5 rounded-xl text-sm transition-all hover:scale-105 active:scale-95"
                  >
                    OK
                  </button>
                </div>
              )}
            </div>
          </div>

          <div ref={rightRef} style={anim(rightVisible, 150, 'right')}>
            {status === 'sent' ? (
              <div className="bg-white/10 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center border border-white/10">
                <div className="w-16 h-16 bg-[#2dd4bf] rounded-full flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-[#003399]" />
                </div>
                <h3 className="font-bold text-white text-xl mb-2">Nachricht gesendet!</h3>
                <p className="text-blue-200 text-sm">Wir melden uns schnellstmöglich bei Ihnen.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot — verstecktes Feld, Bots füllen es aus */}
                <input ref={honeypotRef} type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <div>
                  <label className="block text-xs font-medium text-blue-300 mb-1.5 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    name="Name"
                    required
                    maxLength={100}
                    autoComplete="name"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-400 text-sm focus:outline-none focus:border-[#2dd4bf] transition-colors"
                    placeholder="Ihr vollständiger Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-blue-300 mb-1.5 uppercase tracking-wider">E-Mail</label>
                  <input
                    type="email"
                    name="Email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-400 text-sm focus:outline-none focus:border-[#2dd4bf] transition-colors"
                    placeholder="ihre@email.de"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-blue-300 mb-1.5 uppercase tracking-wider">Nachricht</label>
                  <textarea
                    name="Nachricht"
                    rows={3}
                    required
                    maxLength={2000}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-400 text-sm focus:outline-none focus:border-[#2dd4bf] transition-colors resize-none"
                    placeholder="Ihre Frage oder Anmerkung..."
                  />
                </div>

                <div className={`rounded-xl p-4 border transition-colors ${agreeError ? 'border-red-400/60 bg-red-900/20' : 'border-white/15 bg-white/5'}`}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => { setAgreed(e.target.checked); setAgreeError(false) }}
                      className="mt-0.5 w-4 h-4 rounded accent-[#2dd4bf] shrink-0"
                    />
                    <span className="text-blue-200 text-xs leading-relaxed">
                      Ich stimme den{' '}
                      <a href="/datenschutz" target="_blank" className="text-[#2dd4bf] hover:underline font-medium">
                        Datenschutzbestimmungen
                      </a>{' '}
                      zu.
                    </span>
                  </label>
                  {agreeError && (
                    <p className="text-red-300 text-xs mt-2 ml-7">Bitte stimmen Sie den Datenschutzbestimmungen zu.</p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="text-red-300 text-xs text-center">
                    Fehler beim Senden. Bitte schreiben Sie direkt an{' '}
                    <a href="mailto:info@otn-olympia-volkslauf.de" className="underline">info@otn-olympia-volkslauf.de</a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-[#2dd4bf] hover:bg-[#14b8a6] text-[#003399] font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {status === 'sending' ? 'Wird gesendet…' : 'Nachricht senden'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
