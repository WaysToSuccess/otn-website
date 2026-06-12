import { useRef, useState, useEffect, useCallback } from 'react'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useInView, anim } from '../../hooks/useInView'

// ─── 7 layers representing the cross-sections of a prosthetic assembly ───────
const LAYERS = [
  { z: -150, w: 210, h: 46, bg: 'linear-gradient(145deg,#060d14 0%,#0d1b2a 40%,#0a1520 100%)', border: '#1a3040', glow: 'rgba(13,148,136,0.12)', label: '' },
  { z: -90,  w: 160, h: 38, bg: 'linear-gradient(145deg,#0c1e30 0%,#182d42 40%,#0c1e30 100%)', border: '#1e3d56', glow: 'rgba(13,148,136,0.15)', label: '' },
  { z: -30,  w: 178, h: 42, bg: 'linear-gradient(145deg,#0a2030 0%,#153347 40%,#0a2030 100%)', border: '#205070', glow: 'rgba(13,148,136,0.2)',  label: '' },
  { z: 35,   w: 192, h: 46, bg: 'linear-gradient(145deg,#052820 0%,#0d9488 35%,#0a3d36 100%)', border: '#2dd4bf', glow: 'rgba(45,212,191,0.65)', label: 'GELENK', highlight: true },
  { z: 95,   w: 162, h: 40, bg: 'linear-gradient(145deg,#1a2535 0%,#2e3f54 40%,#1a2535 100%)', border: '#3d5268', glow: 'rgba(61,82,104,0.25)', label: '' },
  { z: 148,  w: 192, h: 48, bg: 'linear-gradient(145deg,#1c2b3d 0%,#2d4159 40%,#1c2b3d 100%)', border: '#4a6278', glow: 'rgba(74,98,120,0.2)',  label: '' },
  { z: 198,  w: 214, h: 54, bg: 'linear-gradient(145deg,#4a5568 0%,#97a8ba 30%,#e2eaf2 55%,#b0bfcc 75%,#6b7a8d 100%)', border: '#dce8f0', glow: 'rgba(220,232,240,0.55)', label: 'SOCKET', chrome: true },
]

function Prosthetic3D() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [rot, setRot] = useState({ x: 22, y: -18 })
  const [mounted, setMounted] = useState(false)
  const rafRef = useRef<number>(0)
  const targetRef = useRef({ x: 22, y: -18 })

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300)
    return () => clearTimeout(t)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = sceneRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width * 0.7)
    const dy = (e.clientY - cy) / (rect.height * 0.7)
    targetRef.current = {
      x: 22 - Math.max(-1, Math.min(1, dy)) * 14,
      y: -18 + Math.max(-1, Math.min(1, dx)) * 18,
    }
  }, [])

  // Smooth interpolation loop
  useEffect(() => {
    const loop = () => {
      setRot(r => ({
        x: r.x + (targetRef.current.x - r.x) * 0.07,
        y: r.y + (targetRef.current.y - r.y) * 0.07,
      }))
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <div
      ref={sceneRef}
      className="relative flex items-center justify-center select-none"
      style={{ width: '360px', height: '420px' }}
    >
      {/* Ambient glow behind */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div style={{
          width: '280px', height: '280px',
          background: 'radial-gradient(circle, rgba(13,148,136,0.18) 0%, transparent 68%)',
          filter: 'blur(24px)',
          animation: 'ambientPulse 3s ease-in-out infinite',
        }} />
      </div>

      {/* 3D scene */}
      <div style={{ perspective: '1000px', perspectiveOrigin: '50% 45%' }}>
        <div style={{
          position: 'relative',
          width: '240px',
          height: '240px',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          opacity: mounted ? 1 : 0,
          scale: mounted ? '1' : '0.75',
          transition: mounted
            ? 'opacity 1s ease 0.3s, scale 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.3s'
            : 'none',
        }}>

          {/* Layers */}
          {LAYERS.map((layer, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%', top: '50%',
                width: `${layer.w}px`, height: `${layer.h}px`,
                marginLeft: `-${layer.w / 2}px`,
                marginTop: `-${layer.h / 2}px`,
                transform: `translateZ(${layer.z}px)`,
                background: layer.bg,
                border: `1.5px solid ${layer.border}`,
                borderRadius: '50%',
                boxShadow: [
                  `0 0 ${layer.highlight ? '28px 6px' : '12px 2px'} ${layer.glow}`,
                  `inset 0 1px 0 rgba(255,255,255,${layer.chrome ? 0.3 : 0.07})`,
                  `inset 0 -1px 0 rgba(0,0,0,0.3)`,
                ].join(', '),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'box-shadow 0.2s',
              }}
            >
              {(layer.highlight || layer.chrome) && (
                <span style={{
                  fontSize: '9px', fontWeight: 800,
                  letterSpacing: '0.25em',
                  color: layer.chrome ? '#0a1628' : '#2dd4bf',
                  textShadow: layer.chrome ? 'none' : '0 0 10px rgba(45,212,191,0.9)',
                  userSelect: 'none',
                }}>
                  {layer.label}
                </span>
              )}
            </div>
          ))}

          {/* Vertical center rod */}
          <div style={{
            position: 'absolute',
            left: '50%', top: '50%',
            width: '8px', height: '348px',
            marginLeft: '-4px', marginTop: '-174px',
            transform: 'translateZ(24px)',
            background: 'linear-gradient(to bottom, rgba(45,212,191,0.05), rgba(45,212,191,0.4), rgba(45,212,191,0.05))',
            borderRadius: '4px',
            boxShadow: '0 0 8px rgba(45,212,191,0.25)',
          }} />

          {/* Floating detail dots */}
          {[
            { z: 35, angle: 0,   r: 108 },
            { z: 35, angle: 120, r: 108 },
            { z: 35, angle: 240, r: 108 },
            { z: -90, angle: 60,  r: 88 },
            { z: 148, angle: 180, r: 104 },
          ].map((dot, i) => {
            const rad = (dot.angle * Math.PI) / 180
            const x = Math.cos(rad) * dot.r
            const y = Math.sin(rad) * dot.r * 0.28
            return (
              <div key={`dot-${i}`} style={{
                position: 'absolute',
                left: '50%', top: '50%',
                width: '7px', height: '7px',
                marginLeft: '-3.5px', marginTop: '-3.5px',
                transform: `translateX(${x}px) translateY(${y}px) translateZ(${dot.z}px)`,
                background: dot.z === 35 ? '#2dd4bf' : '#3d5268',
                borderRadius: '50%',
                boxShadow: dot.z === 35 ? '0 0 8px 3px rgba(45,212,191,0.7)' : 'none',
              }} />
            )
          })}
        </div>
      </div>

      {/* Side labels */}
      {mounted && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 text-right pointer-events-none"
          style={{ transform: 'translateY(-50%) translateX(8px)' }}>
          {['SOCKET', 'SCHAFT', 'GELENK', 'SYSTEM'].map((l, i) => (
            <div key={l} style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'none' : 'translateX(10px)',
              transition: `opacity 0.4s ease ${800 + i * 100}ms, transform 0.4s ease ${800 + i * 100}ms`,
              display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end',
            }}>
              <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(45,212,191,0.6)' }}>{l}</span>
              <div style={{ width: '20px', height: '1px', background: 'rgba(45,212,191,0.3)' }} />
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(45,212,191,0.5)' }} />
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes ambientPulse {
          0%,100% { opacity: 0.7; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.08); }
        }
      `}</style>
    </div>
  )
}

// ─── Section ────────────────────────────────────────────────────────────────
const highlights = [
  'Über 20 Jahre Erfahrung in der Prothesenversorgung',
  'Eigenes Dynamiklabor und Übungsparcours vor Ort',
  'Modernste Systeme: C-Leg, Genium X3, Kenevo',
  'Individuelle Anpassung durch Meister Stefan Fehlandt',
  'Komfortable Lounge — wir kümmern uns um alles',
]

export default function OtnProthese() {
  const { ref: headRef, visible: headV } = useInView()
  const { ref: leftRef, visible: leftV } = useInView()
  const { ref: rightRef, visible: rightV } = useInView()

  return (
    <section className="py-24 bg-[#0a1628] overflow-hidden relative">
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Heading */}
        <div ref={headRef} style={anim(headV)} className="text-center mb-16">
          <span className="text-[#2dd4bf] font-semibold text-sm uppercase tracking-wider">Prothesen-Atelier</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
            Mehr als nur<br />
            <span className="text-[#2dd4bf]">ein Ersatz</span>
          </h2>
          <p className="text-blue-200/70 max-w-xl mx-auto">
            Wir bringen Sie in Bewegung — mit Hightech-Prothesensystemen und jahrelanger Erfahrung.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: text */}
          <div ref={leftRef} style={anim(leftV, 0, 'left')}>
            <p className="text-blue-200/80 leading-relaxed mb-6">
              Im Prothesen-Atelier der Orthopädie Technik Nord GmbH verbinden wir modernste Technik mit handwerklicher Präzision. Unser integriertes Dynamiklabor ermöglicht die direkte Analyse Ihres Gangbildes während der Anpassung.
            </p>
            <p className="text-blue-200/80 leading-relaxed mb-8">
              Von computergesteuerten Kniegelenken bis zu wasserresistenten Hochleistungssystemen — wir finden die Lösung, die perfekt zu Ihrem Leben passt.
            </p>

            <ul className="space-y-3 mb-10">
              {highlights.map((h, i) => (
                <li
                  key={h}
                  style={anim(leftV, 200 + i * 80, 'left')}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#2dd4bf] shrink-0 mt-0.5" />
                  <span className="text-blue-100/80 text-sm">{h}</span>
                </li>
              ))}
            </ul>

            <div style={anim(leftV, 700)} className="flex flex-wrap gap-3">
              <Link
                to="/leistungen/prothesen-atelier"
                className="inline-flex items-center gap-2 bg-[#2dd4bf] hover:bg-[#14b8a6] text-[#0a1628] font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                Prothesen-Atelier <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:04321979449"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-medium px-6 py-3 rounded-xl transition-all border border-white/10"
              >
                04321 / 9794-49
              </a>
            </div>

            {/* Contact */}
            <div style={anim(leftV, 900)} className="mt-8 flex items-center gap-3 text-sm text-blue-300/70">
              <div className="w-8 h-8 bg-[#2dd4bf]/10 rounded-full flex items-center justify-center">
                <span className="text-[#2dd4bf] text-xs font-bold">SF</span>
              </div>
              <span>Stefan Fehlandt — Orthopädiemeister & Inhaber</span>
            </div>
          </div>

          {/* Right: 3D Prosthetic */}
          <div
            ref={rightRef}
            style={anim(rightV, 200, 'right')}
            className="flex items-center justify-center"
          >
            <Prosthetic3D />
          </div>
        </div>

        {/* Bottom stats bar */}
        <div
          style={anim(headV, 400)}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/5 pt-10"
        >
          {[
            { val: '20+', label: 'Jahre Erfahrung' },
            { val: '4', label: 'Prothesensysteme' },
            { val: '1', label: 'Dynamiklabor' },
            { val: '∞', label: 'Möglichkeiten' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-[#2dd4bf] mb-1">{s.val}</div>
              <div className="text-blue-300/50 text-xs uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
