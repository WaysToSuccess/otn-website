import VlHero from '../components/volkslauf/VlHero'
import VlOverview from '../components/volkslauf/VlOverview'
import VlRegister from '../components/volkslauf/VlRegister'
import VlSchedule from '../components/volkslauf/VlSchedule'
import VlRoute from '../components/volkslauf/VlRoute'
import VlFAQ from '../components/volkslauf/VlFAQ'
import VlContact from '../components/volkslauf/VlContact'
import VlSponsors from '../components/volkslauf/VlSponsors'
import PageBackground from '../components/layout/PageBackground'

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

function DiagonalCut({ colorTop, colorBottom }: { colorTop: string; colorBottom: string }) {
  return (
    <div style={{ lineHeight: 0, position: 'relative', height: 80, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: colorBottom }} />
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 80, position: 'relative' }} aria-hidden="true">
        <polygon points="0,0 1440,0 1440,30 0,80" fill={colorTop} />
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
        <div style={{ background: WHITE, position: 'relative' }}>
          <Orb style={{
            width: 780, height: 780, top: -280, right: -240,
            background: 'radial-gradient(circle, rgba(0,60,200,0.13) 0%, rgba(0,80,220,0.05) 45%, transparent 70%)',
            filter: 'blur(70px)',
          }} />
          <Orb style={{
            width: 620, height: 620, bottom: -200, left: -220,
            background: 'radial-gradient(circle, rgba(13,148,136,0.12) 0%, rgba(0,120,200,0.05) 45%, transparent 70%)',
            filter: 'blur(65px)',
          }} />
          <Orb style={{
            width: 400, height: 400, top: '30%', left: -180,
            background: 'radial-gradient(circle, rgba(0,80,220,0.10) 0%, transparent 65%)',
            filter: 'blur(55px)',
          }} />
          <Orb style={{
            width: 350, height: 350, bottom: '10%', right: -140,
            background: 'radial-gradient(circle, rgba(13,148,136,0.10) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }} />
          <VlOverview />
        </div>

        <WaveBottom color={WHITE} />

        {/* ③ Anmeldung — blauer Background */}
        <VlRegister />

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
          <VlSchedule />
        </div>

        <WaveBottom color={WHITE} />

        {/* ⑤ Strecke — blauer Background */}
        <VlRoute />

        <WaveTop color={WHITE} />

        {/* ⑥ FAQ — weiß mit Blurs */}
        <div style={{ background: WHITE, position: 'relative' }}>
          <Orb style={{
            width: 720, height: 720, top: -240, right: -240,
            background: 'radial-gradient(circle, rgba(0,60,200,0.13) 0%, rgba(0,90,230,0.05) 45%, transparent 70%)',
            filter: 'blur(72px)',
          }} />
          <Orb style={{
            width: 560, height: 560, bottom: -180, left: -200,
            background: 'radial-gradient(circle, rgba(13,148,136,0.12) 0%, rgba(0,100,200,0.05) 45%, transparent 70%)',
            filter: 'blur(65px)',
          }} />
          <Orb style={{
            width: 380, height: 380, top: '30%', left: -160,
            background: 'radial-gradient(circle, rgba(0,51,153,0.10) 0%, transparent 65%)',
            filter: 'blur(52px)',
          }} />
          <Orb style={{
            width: 300, height: 300, bottom: '20%', right: -130,
            background: 'radial-gradient(circle, rgba(0,80,200,0.10) 0%, transparent 65%)',
            filter: 'blur(46px)',
          }} />
          <VlFAQ />
        </div>

        <DiagonalCut colorTop={WHITE} colorBottom={BLUE_DARK} />

        {/* ⑦ Kontakt — dunkelblau */}
        <VlContact />

        <WaveTop color={WHITE} />

        {/* ⑧ Sponsoren — weiß mit Blurs */}
        <div style={{ background: WHITE, position: 'relative' }}>
          <Orb style={{
            width: 800, height: 800, top: -280, left: -260,
            background: 'radial-gradient(circle, rgba(0,51,153,0.12) 0%, rgba(0,70,200,0.05) 45%, transparent 70%)',
            filter: 'blur(75px)',
          }} />
          <Orb style={{
            width: 640, height: 640, bottom: -220, right: -240,
            background: 'radial-gradient(circle, rgba(0,80,220,0.12) 0%, rgba(13,148,136,0.05) 45%, transparent 70%)',
            filter: 'blur(68px)',
          }} />
          <Orb style={{
            width: 460, height: 460, top: '30%', right: -180,
            background: 'radial-gradient(circle, rgba(13,148,136,0.10) 0%, transparent 65%)',
            filter: 'blur(58px)',
          }} />
          <Orb style={{
            width: 380, height: 380, bottom: '25%', left: -150,
            background: 'radial-gradient(circle, rgba(0,60,200,0.10) 0%, transparent 65%)',
            filter: 'blur(52px)',
          }} />
          <Orb style={{
            width: 300, height: 300, top: '55%', left: '40%',
            background: 'radial-gradient(circle, rgba(0,51,153,0.08) 0%, transparent 65%)',
            filter: 'blur(45px)',
          }} />
          <VlSponsors />
        </div>

      </main>
    </>
  )
}
