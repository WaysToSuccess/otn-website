import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Heart } from 'lucide-react'
import { useInView, anim } from '../../hooks/useInView'

const openAirSponsors = [
  { name: 'H-Projektierung', logo: '/images/Sponsor/Dabei/H-Projektierung Logo Transparent.webp', href: 'https://www.h-projektierung.de/' },
  { name: 'Doksbau', logo: '/images/Sponsor/Dabei/doksbau logo transparent.png', href: 'https://doksbau.de/' },
]

const topSponsors = [
  { name: 'o.t.n Neumünster', logo: '/images/o.t.n_Logo transparent.webp', href: 'https://www.o-t-n.de/' },
  { name: 'Doksbau', logo: '/images/Sponsor/Dabei/doksbau logo transparent.png', href: 'https://doksbau.de/' },
  { name: 'H-Projektierung', logo: '/images/Sponsor/Dabei/H-Projektierung Logo Transparent.webp', href: 'https://www.h-projektierung.de/' },
  { name: 'JUZO', logo: '/images/Sponsor/Dabei/juzo_logo transparent.png', href: 'https://www.juzo.com/' },
]

const midSponsors = [
  { name: 'Brandes', logo: '/images/Sponsor/Dabei/Brandes_logo transparent.webp', href: 'https://www.brandes.de/' },
  { name: 'Bauerfeind', logo: '/images/Sponsor/Dabei/Bauerfeind_Logo Transparent.png', href: 'https://www.bauerfeind.com/' },
]

const allSponsors = [
  { name: 'VR Bank', logo: '/images/Sponsor/Dabei/VR_Bank_zwischen_den_Meeren logo transparent.webp', href: 'https://www.meine-vrbank.de/startseite.html' },
  { name: 'Netkom', logo: '/images/Sponsor/Dabei/Netkom_Logo transparent.webp', href: 'http://www.netkom-nms.de/' },
  { name: 'Provinzial', logo: '/images/Sponsor/Dabei/Provinzial_Logo_transparent neu.png', href: 'https://www.provinzial.de/nord/neumuenster.mitte' },
  { name: 'MKS Bauelemente', logo: '/images/Sponsor/Dabei/mks_bauelemente transparent.webp', href: 'https://mks-bauelemente.de/' },
  { name: 'Össur', logo: '/images/Sponsor/Dabei/ossur logo transparent.webp', href: 'https://www.ossur.com/de-de' },
  { name: 'Tackmann Bäckerei', logo: '/images/Sponsor/Dabei/Tackmann_Bäckerei_Logo Transparent.png', href: '#' },
  { name: 'Lithon Betonwerk', logo: '/images/Sponsor/Dabei/Lithon_Betonwerk_Logo transparent.webp', href: 'https://www.lithon.de/' },
  { name: 'Mirek Bau', logo: '/images/Sponsor/Dabei/Mirek_Bau_logo transparent.webp', href: 'https://www.mirekbau.de/' },
  { name: 'Partnerschaft für Demokratie', logo: '/images/Sponsor/Dabei/Partnerschaft_für_Demokratie_logo transparent.webp', href: '#' },
  { name: 'Perfectone Werbeagentur', logo: '/images/Sponsor/Dabei/perfectone-werbeagentur-removebg-preview.png', href: '#' },
]

const tierStyles = {
  gold: {
    card: 'border-amber-400/70 hover:border-amber-500 hover:shadow-amber-200/60',
    bg: 'rgba(255,248,220,0.65)',
    shadow: '0 2px 16px rgba(251,191,36,0.18)',
    hoverShadow: '0 6px 28px rgba(251,191,36,0.35)',
  },
  silver: {
    card: 'border-gray-300/80 hover:border-gray-400 hover:shadow-gray-200/60',
    bg: 'rgba(240,242,245,0.70)',
    shadow: '0 2px 14px rgba(156,163,175,0.18)',
    hoverShadow: '0 6px 24px rgba(156,163,175,0.35)',
  },
  bronze: {
    card: 'border-orange-300/60 hover:border-orange-400 hover:shadow-orange-100/60',
    bg: 'rgba(255,244,235,0.55)',
    shadow: '0 1px 10px rgba(205,127,50,0.12)',
    hoverShadow: '0 4px 18px rgba(205,127,50,0.25)',
  },
  plain: {
    card: 'border-gray-100 hover:border-[#003399]/30 hover:shadow-[#003399]/10',
    bg: 'rgba(255,255,255,1)',
    shadow: '0 1px 4px rgba(0,0,0,0.04)',
    hoverShadow: '0 6px 20px rgba(0,51,153,0.10)',
  },
}

function SponsorCard({ name, logo, href, size = 'small', tier = 'plain', index = 0 }: {
  name: string; logo: string; href: string
  size?: 'large' | 'medium' | 'small'
  tier?: 'gold' | 'silver' | 'bronze' | 'plain'
  index?: number
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  const t = tierStyles[tier]
  const sizeClass = size === 'large' ? 'p-5 h-32' : size === 'medium' ? 'p-4 h-24' : 'p-3 h-16'
  const imgClass = size === 'large' ? 'max-h-16 max-w-full w-full' : size === 'medium' ? 'max-h-12 max-w-full w-full' : 'max-h-9 max-w-[110px]'
  const imgW = size === 'large' ? 200 : size === 'medium' ? 160 : 110
  const imgH = size === 'large' ? 64 : size === 'medium' ? 48 : 36
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={name}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px) scale(0.95)',
        transition: `opacity 0.45s ease ${index * 60}ms, transform 0.45s ease ${index * 60}ms`,
        background: t.bg,
        backdropFilter: 'blur(8px)',
        boxShadow: hovered ? t.hoverShadow : t.shadow,
      }}
      className={`group rounded-2xl border flex items-center justify-center transition-all duration-200 ${t.card} ${sizeClass}`}
    >
      <img
        src={logo}
        alt={name}
        loading="lazy"
        decoding="async"
        width={imgW}
        height={imgH}
        className={`object-contain transition-all duration-200 group-hover:scale-105 ${imgClass}`}
      />
    </a>
  )
}

function TierBadge({ tier }: { tier: 'gold' | 'silver' | 'bronze' }) {
  const styles = {
    gold:   { label: 'Gold',   bg: 'rgba(255,248,220,0.9)', border: '#FBBF24', text: '#92600A', dot: '#F59E0B' },
    silver: { label: 'Silber', bg: 'rgba(240,242,245,0.9)', border: '#9CA3AF', text: '#374151', dot: '#9CA3AF' },
    bronze: { label: 'Bronze', bg: 'rgba(255,244,235,0.9)', border: '#FB923C', text: '#92400E', dot: '#CD7F32' },
  }
  const s = styles[tier]
  return (
    <div className="flex items-center justify-center gap-2 mb-5">
      <div className="h-px flex-1 max-w-[80px]" style={{ background: `linear-gradient(to right, transparent, ${s.border})` }} />
      <span
        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full border"
        style={{ background: s.bg, borderColor: s.border, color: s.text, backdropFilter: 'blur(6px)' }}
      >
        <span className="w-2 h-2 rounded-full inline-block" style={{ background: s.dot }} />
        {s.label}
      </span>
      <div className="h-px flex-1 max-w-[80px]" style={{ background: `linear-gradient(to left, transparent, ${s.border})` }} />
    </div>
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
              href="https://www.o-t-n.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 bg-white rounded-3xl px-6 sm:px-12 py-8 sm:py-10 border border-[#003399]/15 shadow-md hover:shadow-xl hover:shadow-[#003399]/12 hover:border-[#003399]/35 transition-all duration-300 w-full sm:w-auto"
            >
              <img
                src="/images/o.t.n_Logo transparent.webp"
                alt="o.t.n"
                loading="lazy"
                decoding="async"
                width={220}
                height={112}
                className="h-28 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
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
                width={112}
                height={112}
                className="h-28 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
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

          {/* Gold */}
          <TierBadge tier="gold" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {topSponsors.map((s, i) => (
              <SponsorCard key={s.name} {...s} size="large" tier="gold" index={i} />
            ))}
          </div>

          {/* Silber */}
          <TierBadge tier="silver" />
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
            {midSponsors.map((s, i) => (
              <SponsorCard key={s.name} {...s} size="medium" tier="silver" index={i} />
            ))}
          </div>

          {/* Bronze */}
          <TierBadge tier="bronze" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {allSponsors.map((s, i) => (
              <SponsorCard key={s.name} {...s} size="small" tier="bronze" index={i} />
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
              <SponsorCard key={s.name} {...s} size="large" index={i} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <SponsorCard name="MSTV Olympia 1859 e.V." logo="/images/MSTV_Olympia_Neumünster transparent.webp" href="https://www.mstv-olympia.de/" size="large" index={2} />
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
