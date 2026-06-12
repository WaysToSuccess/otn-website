import { useRef, useEffect, useState } from 'react'
import { ArrowRight, Heart } from 'lucide-react'
import { useInView, anim } from '../../hooks/useInView'

const sponsors = Array.from({ length: 8 }, (_, i) => `Sponsor ${i + 1}`)

function SponsorBox({ label, index }: { label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? 'scale(1.05)' : 'none'
          : 'scale(0.85)',
        transition: `opacity 0.4s ease ${index * 80}ms, transform ${hovered ? '0.2s' : `0.4s ease ${index * 80}ms`}`,
        boxShadow: hovered ? '0 6px 20px rgba(13,148,136,0.18)' : undefined,
      }}
      className="bg-white rounded-2xl p-6 flex items-center justify-center border border-gray-100 h-20 cursor-pointer"
    >
      <span className={`text-sm font-medium transition-colors ${hovered ? 'text-[#0d9488]' : 'text-gray-300'}`}>
        {label}
      </span>
    </div>
  )
}

export default function VlSponsors() {
  const { ref: headRef, visible: headVisible } = useInView()
  const { ref: ctaRef, visible: ctaVisible } = useInView()

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headRef} style={anim(headVisible)} className="text-center mb-12">
          <span className="text-[#0d9488] font-semibold text-sm uppercase tracking-wider">Partner</span>
          <h2 className="text-3xl font-bold text-[#1a3a5c] mt-2 mb-4">Unterstützer des Volkslaufs</h2>
          <p className="text-gray-500">Wir danken unseren Sponsoren für die Unterstützung dieses Charity-Events.</p>
        </div>

        {/* Wave sponsor grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {sponsors.map((s, i) => (
            <SponsorBox key={s} label={s} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          style={anim(ctaVisible, 0, 'scale')}
          className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center"
        >
          <Heart className="w-8 h-8 text-rose-400 mx-auto mb-3" style={{ animation: ctaVisible ? 'heartbeat 1s ease 400ms' : 'none' }} />
          <h3 className="font-bold text-[#1a3a5c] text-xl mb-2">Werden Sie Sponsor</h3>
          <p className="text-gray-500 mb-5">Unterstützen Sie einen guten Zweck und profitieren Sie von der Sichtbarkeit bei über 900 Teilnehmern.</p>
          <a
            href="mailto:volkslauf@o-t-n.de?subject=Sponsoring Anfrage"
            className="inline-flex items-center gap-2 bg-[#1a3a5c] hover:bg-[#1e4976] text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            Sponsoring anfragen
            <ArrowRight className="w-4 h-4" />
          </a>
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
