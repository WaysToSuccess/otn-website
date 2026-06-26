import { lazy, Suspense } from 'react'
import VlHero from '../components/volkslauf/VlHero'
import PageBackground from '../components/layout/PageBackground'

const VlOverview = lazy(() => import('../components/volkslauf/VlOverview'))

const VlRegister = lazy(() => import('../components/volkslauf/VlRegister'))
const VlSchedule = lazy(() => import('../components/volkslauf/VlSchedule'))
const VlRoute    = lazy(() => import('../components/volkslauf/VlRoute'))
const VlFAQ      = lazy(() => import('../components/volkslauf/VlFAQ'))
const VlContact  = lazy(() => import('../components/volkslauf/VlContact'))
const VlSponsors = lazy(() => import('../components/volkslauf/VlSponsors'))

function WaveBottom({ color }: { color: string }) {
  return (
    <div style={{ lineHeight: 0, marginBottom: -2, overflow: 'hidden' }}>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 90 }} aria-hidden="true">
        <path d="M0,0 C240,90 480,10 720,50 C960,90 1200,20 1440,60 L1440,0 L0,0 Z" fill={color} />
      </svg>
    </div>
  )
}

function WaveTop({ color }: { color: string }) {
  return (
    <div style={{ lineHeight: 0, marginTop: -2, overflow: 'hidden' }}>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 90 }} aria-hidden="true">
        <path d="M0,90 C240,0 480,80 720,40 C960,0 1200,70 1440,30 L1440,90 L0,90 Z" fill={color} />
      </svg>
    </div>
  )
}


/* Dekorative Blur-Orbs für weiße Sektionen */
function Orb({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{ ...style }}
      aria-hidden="true"
    />
  )
}

export default function VolkslaufPage() {
  const WHITE = '#ffffff'
  const BLUE_DARK = '#002080'

  return (
    <>
      <PageBackground />
      <main>

        {/* ① Hero */}
        <VlHero />

        {/* ② Übersicht — weiß mit blauen Blurs */}
        <div style={{ background: WHITE, position: 'relative', overflow: 'visible', zIndex: 1 }}>
          <Orb style={{
            width: 780, height: 780, top: -280, right: -240,
            background: 'radial-gradient(circle, rgba(0,60,200,0.13) 0%, rgba(0,80,220,0.05) 45%, transparent 70%)',
            filter: 'blur(70px)',
            zIndex: 2,
          }} />
          <Orb style={{
            width: 620, height: 620, bottom: -320, left: -220,
            background: 'radial-gradient(circle, rgba(13,148,136,0.18) 0%, rgba(0,120,200,0.07) 45%, transparent 70%)',
            filter: 'blur(65px)',
            zIndex: 2,
          }} />
          <Orb style={{
            width: 400, height: 400, top: '30%', left: -180,
            background: 'radial-gradient(circle, rgba(0,80,220,0.10) 0%, transparent 65%)',
            filter: 'blur(55px)',
            zIndex: 2,
          }} />
          <Orb style={{
            width: 500, height: 500, bottom: -250, right: -140,
            background: 'radial-gradient(circle, rgba(13,148,136,0.15) 0%, transparent 65%)',
            filter: 'blur(60px)',
            zIndex: 2,
          }} />
          <Suspense fallback={<div style={{ height: 500 }} />}>
            <VlOverview />
          </Suspense>
        </div>

        <WaveBottom color={WHITE} />

        {/* ③ Anmeldung — blauer Background */}
        <Suspense fallback={<div style={{ height: 400, background: '#002080' }} />}>
          <div className="content-section"><VlRegister /></div>
        </Suspense>

        <WaveTop color={WHITE} />

        {/* ④ Zeitplan — weiß mit Blurs */}
        <div style={{ background: WHITE, position: 'relative' }}>
          <Orb style={{
            width: 750, height: 750, top: -250, left: -260,
            background: 'radial-gradient(circle, rgba(0,51,153,0.13) 0%, rgba(0,80,200,0.05) 45%, transparent 70%)',
            filter: 'blur(70px)',
          }} />
          <Orb style={{
            width: 580, height: 580, bottom: -190, right: -220,
            background: 'radial-gradient(circle, rgba(0,100,220,0.12) 0%, rgba(13,148,136,0.05) 45%, transparent 70%)',
            filter: 'blur(65px)',
          }} />
          <Orb style={{
            width: 420, height: 420, top: '40%', right: -170,
            background: 'radial-gradient(circle, rgba(30,60,220,0.10) 0%, transparent 65%)',
            filter: 'blur(55px)',
          }} />
          <Orb style={{
            width: 320, height: 320, bottom: '15%', left: -120,
            background: 'radial-gradient(circle, rgba(13,148,136,0.10) 0%, transparent 65%)',
            filter: 'blur(48px)',
          }} />
          <Suspense fallback={<div style={{ height: 400 }} />}>
            <div className="content-section"><VlSchedule /></div>
          </Suspense>
        </div>

        <WaveBottom color={WHITE} />

        {/* ⑤ Strecke — blauer Background */}
        <Suspense fallback={<div style={{ height: 500, background: '#f3f4f6' }} />}>
          <div className="content-section"><VlRoute /></div>
        </Suspense>

        <WaveTop color={WHITE} />

        {/* ⑥ FAQ — weiß mit Blurs */}
        <div style={{ background: WHITE, position: 'relative', overflow: 'visible', zIndex: 1 }}>
          <Suspense fallback={<div style={{ height: 600 }} />}>
            <div className="content-section"><VlFAQ /></div>
          </Suspense>
        </div>

        {/* Gradient-Übergang: weiß → dunkelblau */}
        <div style={{ height: 100, background: `linear-gradient(to bottom, ${WHITE}, ${BLUE_DARK})`, marginBottom: -1 }} />

        {/* ⑦ Kontakt — dunkelblau */}
        <Suspense fallback={<div style={{ height: 500, background: '#002080' }} />}>
          <div className="content-section"><VlContact /></div>
        </Suspense>

        {/* Gradient-Übergang: dunkelblau → weiß */}
        <div style={{ height: 100, background: `linear-gradient(to bottom, ${BLUE_DARK}, ${WHITE})`, marginTop: -1 }} />

        {/* ⑧ Sponsoren — weiß mit Blurs */}
        <div style={{ background: WHITE, position: 'relative' }}>
          <Suspense fallback={<div style={{ height: 600 }} />}>
            <div className="content-section"><VlSponsors /></div>
          </Suspense>
        </div>

      </main>
    </>
  )
}
