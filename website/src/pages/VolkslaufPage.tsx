import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import VlHero from '../components/volkslauf/VlHero'
import PageBackground from '../components/layout/PageBackground'

const VlOverview = lazy(() => import('../components/volkslauf/VlOverview'))
const VlRegister = lazy(() => import('../components/volkslauf/VlRegister'))
const VlSchedule = lazy(() => import('../components/volkslauf/VlSchedule'))
const VlGallery  = lazy(() => import('../components/volkslauf/VlGallery'))
const VlEventGallery = lazy(() => import('../components/volkslauf/VlEventGallery'))
const VlRoute    = lazy(() => import('../components/volkslauf/VlRoute'))
const VlFAQ      = lazy(() => import('../components/volkslauf/VlFAQ'))
const VlContact  = lazy(() => import('../components/volkslauf/VlContact'))
const VlSponsors = lazy(() => import('../components/volkslauf/VlSponsors'))

// Loads section chunk only when 300px away from viewport. `decor` (the animated background
// orbs) is gated by the same trigger — otherwise all ~16 orbs across the page would mount and
// start their infinite CSS animations immediately on load, which was costing a large chunk of
// main-thread "Style & Layout"/Rendering time (and mobile Lighthouse TBT) for content nobody
// has scrolled to yet.
function LazySection({ children, height = 500, bg, id, decor }: { children: React.ReactNode; height?: number; bg?: string; id?: string; decor?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setTriggered(true); return }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTriggered(true); obs.disconnect() } },
      { rootMargin: '300px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  // id lives on this always-mounted wrapper so anchor links (#kontakt, #strecke, ...)
  // can find the target even before the lazy content inside has loaded.
  return (
    <div ref={ref} id={id} style={bg ? { background: bg } : undefined}>
      {triggered
        ? <>
            {decor}
            <Suspense fallback={<div style={{ height, background: bg }} />}>{children}</Suspense>
          </>
        : <div style={{ height, background: bg }} />}
    </div>
  )
}

function WaveBottom({ color, bg }: { color: string; bg?: string }) {
  return (
    <div style={{ lineHeight: 0, marginBottom: -2, overflow: 'hidden', background: bg }}>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none"
        className="vl-wave" style={{ display: 'block', width: '112%', height: 90, marginLeft: '-6%' }} aria-hidden="true">
        <path d="M0,0 C240,90 480,10 720,50 C960,90 1200,20 1440,60 L1440,0 L0,0 Z" fill={color} />
      </svg>
    </div>
  )
}

function WaveTop({ color, bg }: { color: string; bg?: string }) {
  return (
    <div style={{ lineHeight: 0, marginTop: -2, overflow: 'hidden', background: bg }}>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none"
        className="vl-wave" style={{ display: 'block', width: '112%', height: 90, marginLeft: '-6%' }} aria-hidden="true">
        <path d="M0,90 C240,0 480,80 720,40 C960,0 1200,70 1440,30 L1440,90 L0,90 Z" fill={color} />
      </svg>
    </div>
  )
}

function Orb({ style, duration = 18, delay = 0 }: { style: React.CSSProperties; duration?: number; delay?: number }) {
  return (
    <div
      className="vl-orb absolute rounded-full pointer-events-none"
      style={{ ...style, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
      aria-hidden="true"
    />
  )
}

function BackgroundMotionStyles() {
  return (
    <style>{`
      @keyframes vlOrbFloat {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50%      { transform: translate(3%, -4%) scale(1.06); }
      }
      @keyframes vlWaveDrift {
        0%, 100% { transform: translateX(0); }
        50%      { transform: translateX(-1.5%); }
      }
      .vl-orb { animation-name: vlOrbFloat; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
      .vl-wave { animation: vlWaveDrift 14s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .vl-orb, .vl-wave { animation: none !important; }
      }
    `}</style>
  )
}

export default function VolkslaufPage() {
  const WHITE = '#ffffff'
  const BLUE_DARK = '#002080'

  return (
    <>
      <PageBackground />
      <BackgroundMotionStyles />
      <main id="main-content">

        {/* ① Hero — eager, loads immediately */}
        <VlHero />

        {/* ② Übersicht — deferred to an IntersectionObserver microtask (like every other section)
             instead of blocking the initial hydration pass; it's just past the fold anyway. */}
        <div style={{ background: WHITE, position: 'relative', overflow: 'visible', zIndex: 1 }}>
          <LazySection
            id="uebersicht" height={500} bg={WHITE}
            decor={<>
              <Orb duration={19} style={{ width: 780, height: 780, top: -200, right: -170, background: 'radial-gradient(circle, rgba(0,60,200,0.13) 0%, rgba(0,80,220,0.05) 40%, transparent 55%)', filter: 'blur(70px)', zIndex: 2 }} />
              <Orb duration={23} delay={3} style={{ width: 620, height: 620, bottom: -320, left: -160, background: 'radial-gradient(circle, rgba(13,148,136,0.18) 0%, rgba(0,120,200,0.07) 40%, transparent 55%)', filter: 'blur(65px)', zIndex: 2 }} />
            </>}
          >
            <VlOverview />
          </LazySection>
        </div>

        <WaveBottom color={WHITE} bg={BLUE_DARK} />

        {/* ③ Anmeldung — blue background with white text */}
        <div style={{ background: BLUE_DARK, position: 'relative', overflow: 'visible' }}>
          <LazySection
            id="anmelden" height={400} bg={BLUE_DARK}
            decor={<>
              <Orb duration={20} style={{ width: 640, height: 640, top: -190, right: -145, background: 'radial-gradient(circle, rgba(45,212,191,0.16) 0%, rgba(45,212,191,0.05) 40%, transparent 55%)', filter: 'blur(70px)' }} />
              <Orb duration={26} delay={2} style={{ width: 520, height: 520, bottom: -190, left: -125, background: 'radial-gradient(circle, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 40%, transparent 55%)', filter: 'blur(60px)' }} />
            </>}
          >
            <VlRegister />
          </LazySection>
        </div>

        <WaveTop color={WHITE} bg={BLUE_DARK} />

        {/* ③b Bildergalerie 2026 — Renntag-Fotos, white background */}
        <div style={{ background: WHITE, position: 'relative', overflow: 'visible' }}>
          <LazySection
            id="fotos" height={600} bg={WHITE}
            decor={<>
              <Orb duration={18} style={{ width: 560, height: 560, top: -150, right: -130, background: 'radial-gradient(circle, rgba(0,51,153,0.11) 0%, rgba(0,80,200,0.04) 40%, transparent 55%)', filter: 'blur(65px)' }} />
              <Orb duration={22} delay={2} style={{ width: 460, height: 460, bottom: -140, left: -110, background: 'radial-gradient(circle, rgba(13,148,136,0.11) 0%, rgba(13,148,136,0.03) 40%, transparent 55%)', filter: 'blur(60px)' }} />
            </>}
          >
            <VlEventGallery />
          </LazySection>
        </div>

        {/* ④ Zeitplan — white background */}
        <div style={{ background: WHITE, position: 'relative' }}>
          <LazySection
            id="zeitplan" height={400} bg={WHITE}
            decor={<>
              <Orb duration={21} style={{ width: 750, height: 750, top: -180, left: -190, background: 'radial-gradient(circle, rgba(0,51,153,0.13) 0%, rgba(0,80,200,0.05) 40%, transparent 55%)', filter: 'blur(70px)' }} />
              <Orb duration={17} delay={4} style={{ width: 580, height: 580, bottom: 30, right: -160, background: 'radial-gradient(circle, rgba(0,100,220,0.12) 0%, rgba(13,148,136,0.05) 40%, transparent 55%)', filter: 'blur(65px)' }} />
            </>}
          >
            <VlSchedule />
          </LazySection>
        </div>

        {/* ⑤ Galerie — Vorbereitung & Bekanntheit, white background */}
        <div style={{ background: WHITE, position: 'relative', overflow: 'visible' }}>
          <LazySection
            id="galerie" height={600} bg={WHITE}
            decor={<>
              <Orb duration={24} style={{ width: 560, height: 560, top: -160, right: -125, background: 'radial-gradient(circle, rgba(13,148,136,0.12) 0%, rgba(13,148,136,0.04) 40%, transparent 55%)', filter: 'blur(65px)' }} />
              <Orb duration={18} delay={5} style={{ width: 480, height: 480, bottom: -145, left: -115, background: 'radial-gradient(circle, rgba(0,51,153,0.10) 0%, rgba(0,51,153,0.03) 40%, transparent 55%)', filter: 'blur(60px)' }} />
            </>}
          >
            <VlGallery />
          </LazySection>
        </div>

        <WaveBottom color={WHITE} bg={BLUE_DARK} />

        {/* ⑥ Strecke — dark blue background (VlRoute styled for dark bg) */}
        <div style={{ background: BLUE_DARK, position: 'relative', overflow: 'visible' }}>
          <LazySection
            id="strecke" height={500} bg={BLUE_DARK}
            decor={<>
              <Orb duration={22} style={{ width: 620, height: 620, top: -170, left: -145, background: 'radial-gradient(circle, rgba(45,212,191,0.15) 0%, rgba(45,212,191,0.04) 40%, transparent 55%)', filter: 'blur(65px)' }} />
              <Orb duration={16} delay={3} style={{ width: 500, height: 500, bottom: -160, right: -125, background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, transparent 55%)', filter: 'blur(60px)' }} />
            </>}
          >
            <VlRoute />
          </LazySection>
        </div>

        <WaveTop color={WHITE} bg={BLUE_DARK} />

        {/* ⑥ FAQ — white background */}
        <div style={{ background: WHITE, position: 'relative', overflow: 'visible', zIndex: 1 }}>
          <LazySection
            id="faq" height={600} bg={WHITE}
            decor={<Orb duration={20} delay={2} style={{ width: 600, height: 600, top: -165, right: -135, background: 'radial-gradient(circle, rgba(0,51,153,0.10) 0%, rgba(0,80,200,0.04) 40%, transparent 55%)', filter: 'blur(65px)' }} />}
          >
            <VlFAQ />
          </LazySection>
        </div>

        <WaveBottom color={WHITE} bg={BLUE_DARK} />

        {/* ⑦ Kontakt — dark blue background (VlContact styles for dark bg) */}
        <div style={{ background: BLUE_DARK, position: 'relative', overflow: 'visible' }}>
          <LazySection
            id="kontakt" height={500} bg={BLUE_DARK}
            decor={<>
              <Orb duration={25} style={{ width: 600, height: 600, top: -170, left: -135, background: 'radial-gradient(circle, rgba(45,212,191,0.14) 0%, rgba(45,212,191,0.04) 40%, transparent 55%)', filter: 'blur(70px)' }} />
              <Orb duration={19} delay={4} style={{ width: 480, height: 480, bottom: -150, right: -120, background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, transparent 55%)', filter: 'blur(60px)' }} />
            </>}
          >
            <VlContact />
          </LazySection>
        </div>

        <WaveTop color={WHITE} bg={BLUE_DARK} />

        {/* ⑧ Sponsoren — white background */}
        <div style={{ background: WHITE, position: 'relative', overflow: 'visible' }}>
          <LazySection
            id="sponsoren" height={600} bg={WHITE}
            decor={<>
              <Orb duration={23} style={{ width: 640, height: 640, top: -180, right: -150, background: 'radial-gradient(circle, rgba(0,51,153,0.10) 0%, rgba(0,80,200,0.03) 40%, transparent 55%)', filter: 'blur(70px)' }} />
              <Orb duration={17} delay={3} style={{ width: 500, height: 500, bottom: -145, left: -120, background: 'radial-gradient(circle, rgba(13,148,136,0.11) 0%, rgba(13,148,136,0.03) 40%, transparent 55%)', filter: 'blur(60px)' }} />
            </>}
          >
            <VlSponsors />
          </LazySection>
        </div>

      </main>
    </>
  )
}
