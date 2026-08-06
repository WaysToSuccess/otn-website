import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import VlHero from '../components/volkslauf/VlHero'
import PageBackground from '../components/layout/PageBackground'

const VlOverview = lazy(() => import('../components/volkslauf/VlOverview'))
const VlRegister = lazy(() => import('../components/volkslauf/VlRegister'))
const VlSchedule = lazy(() => import('../components/volkslauf/VlSchedule'))
const VlRoute    = lazy(() => import('../components/volkslauf/VlRoute'))
const VlFAQ      = lazy(() => import('../components/volkslauf/VlFAQ'))
const VlContact  = lazy(() => import('../components/volkslauf/VlContact'))
const VlSponsors = lazy(() => import('../components/volkslauf/VlSponsors'))

// Loads section chunk only when 300px away from viewport
function LazySection({ children, height = 500, bg, id }: { children: React.ReactNode; height?: number; bg?: string; id?: string }) {
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
        ? <Suspense fallback={<div style={{ height, background: bg }} />}>{children}</Suspense>
        : <div style={{ height, background: bg }} />}
    </div>
  )
}

function WaveBottom({ color, bg }: { color: string; bg?: string }) {
  return (
    <div style={{ lineHeight: 0, marginBottom: -2, overflow: 'hidden', background: bg }}>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 90 }} aria-hidden="true">
        <path d="M0,0 C240,90 480,10 720,50 C960,90 1200,20 1440,60 L1440,0 L0,0 Z" fill={color} />
      </svg>
    </div>
  )
}

function WaveTop({ color, bg }: { color: string; bg?: string }) {
  return (
    <div style={{ lineHeight: 0, marginTop: -2, overflow: 'hidden', background: bg }}>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 90 }} aria-hidden="true">
        <path d="M0,90 C240,0 480,80 720,40 C960,0 1200,70 1440,30 L1440,90 L0,90 Z" fill={color} />
      </svg>
    </div>
  )
}

function Orb({ style }: { style: React.CSSProperties }) {
  return <div className="absolute rounded-full pointer-events-none" style={{ ...style }} aria-hidden="true" />
}

export default function VolkslaufPage() {
  const WHITE = '#ffffff'
  const BLUE_DARK = '#002080'

  return (
    <>
      <PageBackground />
      <main id="main-content">

        {/* ① Hero — eager, loads immediately */}
        <VlHero />

        {/* ② Übersicht — first section, loads right away */}
        <div style={{ background: WHITE, position: 'relative', overflow: 'visible', zIndex: 1 }}>
          <Orb style={{ width: 780, height: 780, top: -280, right: -240, background: 'radial-gradient(circle, rgba(0,60,200,0.13) 0%, rgba(0,80,220,0.05) 45%, transparent 70%)', filter: 'blur(70px)', zIndex: 2 }} />
          <Orb style={{ width: 620, height: 620, bottom: -320, left: -220, background: 'radial-gradient(circle, rgba(13,148,136,0.18) 0%, rgba(0,120,200,0.07) 45%, transparent 70%)', filter: 'blur(65px)', zIndex: 2 }} />
          <Suspense fallback={<div style={{ height: 500 }} />}>
            <VlOverview />
          </Suspense>
        </div>

        <WaveBottom color={WHITE} bg={BLUE_DARK} />

        {/* ③ Anmeldung — blue background with white text */}
        <LazySection id="anmelden" height={400} bg={BLUE_DARK}>
          <VlRegister />
        </LazySection>

        <WaveTop color={WHITE} bg={BLUE_DARK} />

        {/* ④ Zeitplan — white background */}
        <div style={{ background: WHITE, position: 'relative' }}>
          <Orb style={{ width: 750, height: 750, top: -250, left: -260, background: 'radial-gradient(circle, rgba(0,51,153,0.13) 0%, rgba(0,80,200,0.05) 45%, transparent 70%)', filter: 'blur(70px)' }} />
          <Orb style={{ width: 580, height: 580, bottom: -190, right: -220, background: 'radial-gradient(circle, rgba(0,100,220,0.12) 0%, rgba(13,148,136,0.05) 45%, transparent 70%)', filter: 'blur(65px)' }} />
          <LazySection id="zeitplan" height={400} bg={WHITE}>
            <VlSchedule />
          </LazySection>
        </div>

        <WaveBottom color={WHITE} />

        {/* ⑤ Strecke — white background */}
        <LazySection id="strecke" height={500} bg={WHITE}>
          <VlRoute />
        </LazySection>

        <WaveTop color={WHITE} />

        {/* ⑥ FAQ — white background */}
        <div style={{ background: WHITE, position: 'relative', overflow: 'visible', zIndex: 1 }}>
          <LazySection id="faq" height={600} bg={WHITE}>
            <VlFAQ />
          </LazySection>
        </div>

        {/* Gradient: white → dark blue */}
        <div style={{ height: 100, background: `linear-gradient(to bottom, ${WHITE}, ${BLUE_DARK})`, marginBottom: -1 }} />

        {/* ⑦ Kontakt — dark blue background (VlContact styles for dark bg) */}
        <LazySection id="kontakt" height={500} bg={BLUE_DARK}>
          <VlContact />
        </LazySection>

        {/* Gradient: dark blue → white */}
        <div style={{ height: 100, background: `linear-gradient(to bottom, ${BLUE_DARK}, ${WHITE})`, marginTop: -1 }} />

        {/* ⑧ Sponsoren — white background */}
        <div style={{ background: WHITE, position: 'relative' }}>
          <LazySection id="sponsoren" height={600} bg={WHITE}>
            <VlSponsors />
          </LazySection>
        </div>

      </main>
    </>
  )
}
