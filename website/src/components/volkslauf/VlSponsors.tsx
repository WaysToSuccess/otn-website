import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Heart } from 'lucide-react'
import { useInView, anim } from '../../hooks/useInView'

const openAirSponsors = [
  { name: 'H-Projektierung', logo: '/images/Sponsor/Dabei/H-Projektierung Logo Transparent.webp', href: 'https://www.h-projektierung.de/' },
  { name: 'Rohrstar', logo: '/images/Sponsor/Dabei/RohrStar Rorreinigung transparent Logo.webp', href: 'https://rohrstar.de/' },
]

const featuredSponsors = [
  { name: 'Brandes', logo: '/images/Sponsor/Dabei/Brandes_logo transparent.webp', href: 'https://www.brandes.de/' },
  { name: 'JUZO', logo: '/images/Sponsor/Bearbeitung - Raus/juzo_logo transparent.webp', href: 'https://www.juzo.com/' },
  { name: 'VR Bank', logo: '/images/Sponsor/Dabei/VR_Bank_zwischen_den_Meeren logo transparent.webp', href: 'https://www.meine-vrbank.de/startseite.html' },
]

const allSponsors = [
  { name: 'H-Projektierung', logo: '/images/Sponsor/Dabei/H-Projektierung Logo Transparent.webp', href: 'https://www.h-projektierung.de/' },
  { name: 'Rohrstar', logo: '/images/Sponsor/Dabei/RohrStar Rorreinigung transparent Logo.webp', href: 'https://rohrstar.de/' },
  { name: 'Netkom', logo: '/images/Sponsor/Dabei/Netkom_Logo transparent.webp', href: 'http://www.netkom-nms.de/' },
  { name: 'Provinzial', logo: '/images/Sponsor/Dabei/provinzial_nord_logo-removebg-preview.webp', href: 'https://www.provinzial.de/west/' },
  { name: 'MKS Bauelemente', logo: '/images/Sponsor/Dabei/mks_bauelemente transparent.webp', href: 'https://mks-bauelemente.de/' },
  { name: 'Össur', logo: '/images/Sponsor/Dabei/ossur logo transparent.webp', href: 'https://www.ossur.com/de-de' },
  { name: 'MediCar', logo: '/images/Sponsor/Dabei/MediCar Logo transparent.webp', href: 'https://www.medi-car.info/' },
  { name: 'Lithon Betonwerk', logo: '/images/Sponsor/Dabei/Lithon_Betonwerk_Logo transparent.webp', href: 'https://www.lithon.de/' },
  { name: 'Mirek Bau', logo: '/images/Sponsor/Dabei/Mirek_Bau_logo transparent.webp', href: 'https://www.mirekbau.de/' },
  { name: 'Partnerschaft für Demokratie', logo: '/images/Sponsor/Dabei/Partnerschaft_für_Demokratie_logo transparent.webp', href: '#' },
  { name: 'Tackmann Bäckerei', logo: '/images/Sponsor/Bearbeitung - Raus/Tackmann_Bäckerei_Logo Transparent.webp', href: '#' },
  { name: 'Perfectone Werbeagentur', logo: '/images/Sponsor/Bearbeitung - Raus/perfectone-werbeagentur-removebg-preview.webp', href: '#' },
]

function SponsorCard({ name, logo, href, large = false, index = 0 }: { name: string; logo: string; href: string; large?: boolean; index?: number }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={name}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px) scale(0.95)',
        transition: `opacity 0.45s ease ${index * 60}ms, transform 0.45s ease ${index * 60}ms`,
      }}
      className={`group bg-white rounded-2xl border border-gray-100 flex items-center justify-center hover:border-[#003399]/30 hover:shadow-lg hover:shadow-[#003399]/10 transition-all duration-200 ${large ? 'p-8 h-36' : 'p-5 h-24'}`}
    >
      <img
        src={logo}
        alt={name}
        loading="lazy"
        decoding="async"
        className={`object-contain transition-all duration-200 group-hover:scale-105 ${large ? 'max-h-20 max-w-[220px]' : 'max-h-12 max-w-[140px]'}`}
      />
    </a>
  )
}


export default function VlSponsors() {
  const { ref: headRef, visible: headVisible } = useInView()
  const { ref: veranstalterRef, visible: veranstalterVisible } = useInView()
  const { ref: openAirHeadRef, visible: openAirHeadVisible } = useInView()
  const { ref: allHeadRef, visible: allHeadVisible } = useInView()
  const { ref: ctaRef, visible: ctaVisible } = useInView()

  return (
    <section id="sponsoren">

      {/* ── Veranstalter ─────────────────────────────────────────── */}
      <div className="py-20 border-b border-[#003399]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headRef} style={anim(headVisible)} className="text-center mb-12">
            <span className="inline-block text-[#003399] font-semibold text-xs uppercase tracking-[0.2em] px-4 py-1.5 bg-[#003399]/8 rounded-full mb-4">Veranstalter</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#003399]">51. Volkslauf bei Olympia</h2>
            <p className="text-gray-500 mt-3 text-base">präsentiert von</p>
          </div>

          <div
            ref={veranstalterRef}
            style={anim(veranstalterVisible, 100, 'scale')}
            className="flex flex-col sm:flex-row items-center justify-center gap-10"
          >
            {/* OTN Logo */}
            <a
              href="#"
              className="group flex flex-col items-center gap-4 bg-white rounded-3xl px-6 sm:px-12 py-8 sm:py-10 border border-[#003399]/15 shadow-md hover:shadow-xl hover:shadow-[#003399]/12 hover:border-[#003399]/35 transition-all duration-300 w-full sm:w-auto"
            >
              <img
                src="https://o-t-n.de/assets/images/j/otn_logo_neu_2011-az9c925dm6a9aw8.svg"
                alt="o.t.n"
                className="h-28 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="text-center">
                <div className="font-bold text-[#003399] text-sm">o.t.n Neumünster</div>
                <div className="text-gray-400 text-xs mt-0.5">Orthopädie Technik Neumünster</div>
              </div>
            </a>

            {/* MSTV Olympia */}
            <a
              href="https://www.mstv-olympia.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 bg-white rounded-3xl px-6 sm:px-12 py-8 sm:py-10 border border-[#003399]/15 shadow-md hover:shadow-xl hover:shadow-[#003399]/12 hover:border-[#003399]/35 transition-all duration-300 w-full sm:w-auto"
            >
              <img
                src="/images/MSTV_Olympia_Neumünster transparent.webp"
                alt="MSTV Olympia Neumünster"
                loading="lazy"
                decoding="async"
                className="h-28 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="text-center">
                <div className="font-bold text-[#003399] text-sm">MSTV Olympia 1859 e.V.</div>
                <div className="text-gray-400 text-xs mt-0.5">Neumünster</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* ── Volkslauf Sponsoren ────────────────────────────────────────── */}
      <div className="py-20 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={allHeadRef} style={anim(allHeadVisible)} className="text-center mb-12">
            <span className="inline-block text-[#003399] font-semibold text-xs uppercase tracking-[0.2em] px-4 py-1.5 bg-[#003399]/8 rounded-full mb-4">Volkslauf Sponsoren</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Unsere Unterstützer</h3>
            <p className="text-gray-400 mt-2 text-sm">Wir danken allen Sponsoren für ihre Unterstützung.</p>
          </div>

          {/* Featured: Brandes + JUZO + VR Bank — größer, oben */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-6">
            {featuredSponsors.map((s, i) => (
              <SponsorCard key={s.name} {...s} large index={i} />
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {allSponsors.map((s, i) => (
              <SponsorCard key={s.name} {...s} index={i + featuredSponsors.length} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Gartenstadt Open Air Party Sponsoren ──────────────────────────────── */}
      <div className="py-20 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={openAirHeadRef} style={anim(openAirHeadVisible)} className="text-center mb-12">
            <span className="inline-block text-[#0d9488] font-semibold text-xs uppercase tracking-[0.2em] px-4 py-1.5 bg-[#0d9488]/8 rounded-full mb-4">Gartenstadt Open Air Party</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Sponsoren der Gartenstadt Open Air Party</h3>
            <p className="text-gray-400 mt-2 text-sm">mit DJ · Einlass ab 19 Uhr · 5. September 2026</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {openAirSponsors.map((s, i) => (
              <SponsorCard key={s.name} {...s} large index={i} />
            ))}
          </div>

          {/* CTA */}
          <div
            ref={ctaRef}
            style={anim(ctaVisible, 100, 'scale')}
            className="mt-14 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center"
          >
            <Heart className="w-8 h-8 text-rose-400 mx-auto mb-3" style={{ animation: ctaVisible ? 'heartbeat 1s ease 400ms' : 'none' }} />
            <h3 className="font-bold text-[#003399] text-xl mb-2">Werden Sie Sponsor</h3>
            <p className="text-gray-500 mb-5 max-w-md mx-auto">Unterstützen Sie einen guten Zweck und profitieren Sie von der enormen Sichtbarkeit.</p>
            <a
              href="mailto:info@otn-olympia-volkslauf.de?subject=Sponsoring Anfrage"
              className="inline-flex items-center gap-2 bg-[#003399] hover:bg-[#0040cc] text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              Sponsoring anfragen
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heartbeat {
          0%,100% { transform: scale(1); }
          30% { transform: scale(1.3); }
          60% { transform: scale(1.1); }
        }
      `}</style>
    </section>
  )
}
