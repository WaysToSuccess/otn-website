import { useState } from 'react'
import { Phone, Mail, MapPin, Send } from 'lucide-react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="kontakt" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#0d9488] font-semibold text-sm uppercase tracking-wider">Kontakt</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mt-2 mb-4">Wir sind für Sie da</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Haben Sie Fragen oder möchten einen Termin vereinbaren? Wir freuen uns auf Ihre Nachricht.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#0d9488]" />
                </div>
                <div>
                  <div className="font-semibold text-[#1a3a5c] mb-1">Telefon</div>
                  <a href="tel:+494321979449" className="text-gray-500 hover:text-[#0d9488] transition-colors">+49 4321 9794-49</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#0d9488]" />
                </div>
                <div>
                  <div className="font-semibold text-[#1a3a5c] mb-1">E-Mail</div>
                  <a href="mailto:info@o-t-n.de" className="text-gray-500 hover:text-[#0d9488] transition-colors">info@o-t-n.de</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#0d9488]" />
                </div>
                <div>
                  <div className="font-semibold text-[#1a3a5c] mb-1">Zentrale</div>
                  <p className="text-gray-500">Wendenstraße 1<br />24539 Neumünster</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-[#1a3a5c] mb-3">Öffnungszeiten</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between"><span>Mo – Fr</span><span>08:00 – 18:00 Uhr</span></div>
                <div className="flex justify-between"><span>Samstag</span><span>09:00 – 13:00 Uhr</span></div>
                <div className="flex justify-between text-gray-400"><span>Sonntag</span><span>Geschlossen</span></div>
              </div>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-[#0d9488] rounded-full flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-[#1a3a5c] text-xl mb-2">Nachricht gesendet!</h3>
                <p className="text-gray-500">Wir melden uns schnellstmöglich bei Ihnen.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vorname</label>
                    <input type="text" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0d9488] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nachname</label>
                    <input type="text" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0d9488] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                  <input type="email" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0d9488] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Betreff</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0d9488] transition-colors">
                    <option>Terminanfrage</option>
                    <option>Produktberatung</option>
                    <option>Allgemeine Frage</option>
                    <option>Sonstiges</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nachricht</label>
                  <textarea rows={4} required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0d9488] transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full bg-[#1a3a5c] hover:bg-[#1e4976] text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
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
