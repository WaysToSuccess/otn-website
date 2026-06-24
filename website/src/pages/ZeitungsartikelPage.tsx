import { useEffect, useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { toPng } from 'html-to-image'
import { ArrowRight, Calendar, Info, MapPin, PartyPopper } from 'lucide-react'

const REGISTRATION_URL = 'https://my.raceresult.com/407322/registration'

// 16:9 = 1920×1080  |  9:16 = 1080×1920
const FORMATS = [
  { label: '16:9 (Querformat)', slug: '16x9', w: 1920, h: 1080 },
  { label: '9:16 (Hochformat)', slug: '9x16', w: 1080, h: 1920 },
] as const

function HeroContent({ format }: { format: typeof FORMATS[number] }) {
  const isPortrait = format.w < format.h

  // 16:9: 1920×1080 — alles größer, mehr horizontale Streckung
  // 9:16: 1080×1920 — mehr vertikaler Raum, größere Schrift
  const s = isPortrait
    ? { badge: 52, badgeText: 32, h1: 130, pill: 32, pillPad: '16px 32px', pillIcon: 30, gap: 40, ctaGap: 56, btnText: 38, btnPad: '28px 68px', btnIcon: 36, qr: 240, qrPad: 18, qrLabel: 22, px: 100, py: 120 }
    : { badge: 46, badgeText: 30, h1: 118, pill: 30, pillPad: '14px 30px', pillIcon: 28, gap: 32, ctaGap: 56, btnText: 36, btnPad: '26px 64px', btnIcon: 34, qr: 200, qrPad: 16, qrLabel: 20, px: 160, py: 80 }

  return (
    <>
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: isPortrait
            ? `url('/images/o.t.n Laufbild neu - 9 zu 16.png?v=20260623')`
            : `url('/images/o.t.n Laufbild neu.png?v=20260623')`,
          backgroundPosition: 'center center',
        }}
      />
      {/* Overlay — explicit rgba statt Tailwind-opacity (html2canvas versteht kein oklab) */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0.30) 50%, rgba(0,32,128,0.95) 100%)',
      }} />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          height: format.h,
          width: format.w,
          padding: `${s.py}px ${s.px}px`,
          gap: s.gap,
          boxSizing: 'border-box',
        }}
      >
        {/* Veranstalter badge */}
        <div style={{
          display: 'inline-flex',
          flexDirection: isPortrait ? 'column' : 'row',
          alignItems: 'center',
          gap: isPortrait ? 10 : 16,
          background: 'rgba(255,255,255,0.85)',
          borderRadius: isPortrait ? 24 : 9999,
          border: '1px solid rgba(0,51,153,0.20)',
          padding: `${s.badge * 0.3}px ${s.badge * 0.7}px`,
        }}>
          {/* Logos */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isPortrait ? 40 : 16 }}>
            <img
              src="/images/o.t.n_Logo transparent.png"
              alt="o.t.n"
              style={{ height: isPortrait ? s.badge * 1.6 : s.badge, width: 'auto', objectFit: 'contain', flexShrink: 0 }}
            />
            <img
              src="/images/MSTV_Olympia_Neumünster transparent.png"
              alt="MSTV Olympia"
              style={{ height: isPortrait ? s.badge * 1.6 : s.badge, width: 'auto', objectFit: 'contain', flexShrink: 0 }}
            />
          </div>
          {/* Text */}
          {isPortrait ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span style={{ color: '#003399', fontWeight: 800, letterSpacing: '0.05em', whiteSpace: 'nowrap', fontSize: s.badgeText }}>
                Veranstalter: o.t.n und
              </span>
              <span style={{ color: '#003399', fontWeight: 800, letterSpacing: '0.05em', whiteSpace: 'nowrap', fontSize: s.badgeText }}>
                MSTV Olympia 1859 e.V.
              </span>
            </div>
          ) : (
            <span style={{ color: '#003399', fontWeight: 800, letterSpacing: '0.05em', whiteSpace: 'nowrap', fontSize: s.badgeText }}>
              Veranstalter: o.t.n und MSTV Olympia 1859 e.V.
            </span>
          )}
        </div>

        {/* H1 — Volltonfarbe statt Gradient-Clip (html2canvas-kompatibel) */}
        <h1 style={{ fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', fontSize: s.h1, margin: 0 }}>
          <span style={{
            color: '#003399',
            textShadow: '2px 2px 0 rgba(255,255,255,0.7), 0 4px 20px rgba(0,51,153,0.3)',
          }}>
            51. o.t.n Volkslauf bei Olympia
          </span>
        </h1>

        {/* Info pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: s.gap * 0.35 }}>
          {[
            { icon: <PartyPopper style={{ width: s.pillIcon, height: s.pillIcon, color: '#003399', flexShrink: 0 }} />, text: 'Gartenstadt Open Air mit DJ ab 19 Uhr' },
            { icon: <Calendar style={{ width: s.pillIcon, height: s.pillIcon, color: '#003399', flexShrink: 0 }} />, text: '5. September 2026 · 15:30 Uhr' },
            { icon: <MapPin style={{ width: s.pillIcon, height: s.pillIcon, color: '#003399', flexShrink: 0 }} />, text: 'Forstweg 5, 24537 Neumünster' },
            { icon: <Info style={{ width: s.pillIcon, height: s.pillIcon, color: '#003399', flexShrink: 0 }} />, text: 'Kostenloses Lauftraining ab 8.7' },
          ].map(({ icon, text }) => (
            <span key={text} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.70)',
              color: '#003399',
              fontWeight: 800,
              borderRadius: 9999,
              border: '1px solid rgba(0,51,153,0.25)',
              fontSize: s.pill,
              padding: s.pillPad,
            }}>
              {icon}{text}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: s.ctaGap, marginTop: s.gap * 0.4 }}>
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              background: '#003399',
              color: '#ffffff',
              fontWeight: 800,
              borderRadius: 16,
              fontSize: s.btnText,
              padding: s.btnPad,
              boxShadow: '0 6px 32px rgba(0,51,153,0.55)',
              textDecoration: 'none',
            }}
          >
            Jetzt anmelden
            <ArrowRight style={{ width: s.btnIcon, height: s.btnIcon }} />
          </a>

          {/* QR */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ background: '#ffffff', borderRadius: 16, padding: s.qrPad, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              <QRCodeSVG
                value={REGISTRATION_URL}
                size={s.qr}
                fgColor="#003399"
                bgColor="#ffffff"
                level="M"
              />
            </div>
            <span style={{ color: 'rgba(255,255,255,0.80)', fontWeight: 500, fontSize: s.qrLabel }}>
              QR-Code scannen → Anmelden
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default function ZeitungsartikelPage() {
  const preview169 = useRef<HTMLDivElement>(null)
  const preview916 = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState<string | null>(null)

  const [on, setOn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setOn(true), 100); return () => clearTimeout(t) }, [])

  const download = async (previewRef: React.RefObject<HTMLDivElement | null>, fmt: typeof FORMATS[number]) => {
    const el = previewRef.current
    if (!el) return
    setDownloading(fmt.slug)

    // Remove CSS scale so html-to-image sees the element at native 1920×1080
    const prevTransform = el.style.transform
    const prevTransition = el.style.transition
    el.style.transform = 'none'
    el.style.transition = 'none'
    // Expand clipping wrapper so element isn't cropped
    const wrapper = el.parentElement as HTMLElement
    const prevOverflow = wrapper.style.overflow
    wrapper.style.overflow = 'visible'

    await new Promise(r => setTimeout(r, 50))

    try {
      // Two passes: first loads images/fonts, second is clean capture
      await toPng(el, { width: fmt.w, height: fmt.h, pixelRatio: 1, skipAutoScale: true })
      const dataUrl = await toPng(el, { width: fmt.w, height: fmt.h, pixelRatio: 1, skipAutoScale: true })

      const link = document.createElement('a')
      link.download = `otn-volkslauf-${fmt.slug}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Download fehlgeschlagen:', err)
      alert(`Download fehlgeschlagen: ${err}`)
    }

    // Restore
    el.style.transform = prevTransform
    el.style.transition = prevTransition
    wrapper.style.overflow = prevOverflow
    setDownloading(null)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center gap-16 py-12 px-8">

      {FORMATS.map((fmt, i) => {
        const previewRef = i === 0 ? preview169 : preview916
        const isPortrait = fmt.w < fmt.h
        const previewW = isPortrait ? 340 : 720
        const scale = previewW / fmt.w
        const previewH = fmt.h * scale

        return (
          <div key={fmt.slug} className="flex flex-col items-center gap-4">
            {/* Label + Download */}
            <div className="flex items-center gap-4">
              <span className="text-white font-bold text-lg">{fmt.label}</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>{fmt.w}×{fmt.h}px</span>
              <button
                onClick={() => download(previewRef, fmt)}
                disabled={downloading === fmt.slug}
                className="flex items-center gap-2 bg-white text-[#003399] font-bold px-5 py-2.5 rounded-xl shadow hover:bg-gray-100 transition-colors text-sm disabled:opacity-50"
              >
                {downloading === fmt.slug ? 'Wird erstellt…' : 'Als PNG herunterladen'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Scaled preview — also the capture target */}
            <div style={{ width: previewW, height: previewH, overflow: 'hidden', borderRadius: 0, boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}>
              <div
                ref={previewRef}
                style={{
                  width: fmt.w, height: fmt.h,
                  position: 'relative', overflow: 'hidden',
                  transformOrigin: 'top left',
                  transform: `scale(${scale})`,
                  opacity: on ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <HeroContent format={fmt} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
