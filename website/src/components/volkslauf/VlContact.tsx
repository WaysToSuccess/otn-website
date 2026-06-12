import { useState } from 'react'
import { Mail, MapPin, Send, Bell } from 'lucide-react'
import { useInView, anim } from '../../hooks/useInView'

export default function VlContact() {
  const [sent, setSent] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [agreeError, setAgreeError] = useState(false)
  const { ref: headRef, visible: headVisible } = useInView()
  const { ref: leftRef, visible: leftVisible } = useInView()
  const { ref: rightRef, visible: rightVisible } = useInView()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) { setAgreeError(true); return }
    setSent(true)
  }

  return (
    <section id="kontakt" className="py-24 bg-[#1a3a5c]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headRef} style={anim(headVisible)} className="text-center mb-14">
          <span className="text-[#2dd4bf] font-semibold text-sm uppercase tracking-wider">Kontakt</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">Fragen zum Volkslauf?</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div ref={leftRef} style={anim(leftVisible, 0, 'left')}>
            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#2dd4bf]" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">E-Mail</div>
                  <a href="mailto:volkslauf@o-t-n.de" className="text-blue-200 hover:text-white transition-colors">volkslauf@o-t-n.de</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#2dd4bf]" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Veranstaltungsort</div>
                  <p className="text-blue-200">MTSV Olympia von 1859 e.V.<br />Forstweg 5, 24537 Neumünster</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Bell className="w-5 h-5 text-[#2dd4bf]" />
                <h3 className="font-semibold text-white">Bleiben Sie informiert</h3>
              </div>
              <p className="text-blue-200 text-sm mb-4">Newsletter für Updates zum Volkslauf</p>
              {newsletter ? (
                <p className="text-[#2dd4bf] text-sm">Danke! Sie erhalten bald unsere Updates.</p>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Ihre E-Mail"
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-blue-300 text-sm focus:outline-none focus:border-[#2dd4bf]"
                  />
                  <button
                    onClick={() => setNewsletter(true)}
                    className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-[#1a3a5c] font-semibold px-4 py-2 rounded-xl text-sm transition-colors"
                  >
                    Anmelden
                  </button>
                </div>
              )}
            </div>
          </div>

          <div ref={rightRef} style={anim(rightVisible, 150, 'right')}>
            {sent ? (
              <div className="bg-white/10 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center border border-white/10">
                <div className="w-16 h-16 bg-[#2dd4bf] rounded-full flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-[#1a3a5c]" />
                </div>
                <h3 className="font-bold text-white text-xl mb-2">Nachricht gesendet!</h3>
                <p className="text-blue-200">Wir melden uns schnellstmöglich bei Ihnen.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-300 text-sm focus:outline-none focus:border-[#2dd4bf] transition-colors"
                    placeholder="Ihr vollständiger Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">E-Mail</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-300 text-sm focus:outline-none focus:border-[#2dd4bf] transition-colors"
                    placeholder="ihre@email.de"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Nachricht</label>
                  <textarea
                    rows={3}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-300 text-sm focus:outline-none focus:border-[#2dd4bf] transition-colors resize-none"
                    placeholder="Ihre Frage oder Anmerkung..."
                  />
                </div>

                {/* Datenschutz Checkbox */}
                <div className={`rounded-xl p-4 border transition-colors ${agreeError ? 'border-red-400/60 bg-red-900/20' : 'border-white/15 bg-white/5'}`}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => { setAgreed(e.target.checked); setAgreeError(false) }}
                      className="mt-0.5 w-4 h-4 rounded accent-[#2dd4bf] shrink-0"
                    />
                    <span className="text-blue-200 text-sm leading-relaxed">
                      Hiermit stimme ich den{' '}
                      <a href="/datenschutz" target="_blank" className="text-[#2dd4bf] hover:underline font-medium">
                        Datenschutzbestimmungen
                      </a>{' '}
                      zu und bin damit einverstanden, dass meine Daten zur Bearbeitung meiner Anfrage verwendet werden.
                    </span>
                  </label>
                  {agreeError && (
                    <p className="text-red-300 text-xs mt-2 ml-7">Bitte stimmen Sie den Datenschutzbestimmungen zu.</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2dd4bf] hover:bg-[#14b8a6] text-[#1a3a5c] font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Nachricht senden
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
