import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import VolkslaufPage from './pages/VolkslaufPage'

const Footer       = lazy(() => import('./components/layout/Footer'))
const CookieBanner = lazy(() => import('./components/layout/CookieBanner'))
const FloatingCTA  = lazy(() => import('./components/layout/FloatingCTA'))

const ImpressumPage         = lazy(() => import('./pages/ImpressumPage'))
const DatenschutzPage       = lazy(() => import('./pages/DatenschutzPage'))
const AusschreibungPage     = lazy(() => import('./pages/AusschreibungPage'))
const InternOverviewPage  = lazy(() => import('./pages/intern/InternOverviewPage'))
const InternStatusPage    = lazy(() => import('./pages/intern/InternStatusPage'))
const ZeitungsartikelPage = lazy(() => import('./pages/ZeitungsartikelPage'))

const BLUE_FALLBACK = <div style={{ minHeight: '100vh', backgroundColor: '#002266' }} />

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Suspense fallback={null}><Footer /></Suspense>
      <Suspense fallback={null}><FloatingCTA /></Suspense>
      <Suspense fallback={null}><CookieBanner /></Suspense>
    </>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isIntern = location.pathname.startsWith('/intern')
  const isAusschreibung = location.pathname === '/ausschreibung'

  // React Router doesn't auto-scroll on client-side hash navigation (e.g. from
  // /impressum back to /#kontakt), so do it manually once the target route has mounted.
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const scrollToTarget = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    const raf = requestAnimationFrame(scrollToTarget)
    return () => cancelAnimationFrame(raf)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const isHome = location.pathname === '/' || location.pathname === '/ausschreibung'
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    if (!isHome) {
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'robots'
        document.head.appendChild(meta)
      }
      meta.content = 'noindex, nofollow'
    } else if (meta) {
      meta.remove()
    }
  }, [location.pathname])

  if (isAusschreibung) {
    return (
      <Suspense fallback={BLUE_FALLBACK}>
        <Routes>
          <Route path="/ausschreibung" element={<AusschreibungPage />} />
        </Routes>
      </Suspense>
    )
  }

  if (isIntern) {
    return (
      <Suspense fallback={BLUE_FALLBACK}>
        <Routes>
          <Route path="/intern/zeitungsartikel" element={<ZeitungsartikelPage />} />
          <Route path="/intern/status" element={<InternStatusPage />} />
          <Route path="/intern" element={<InternOverviewPage />} />
        </Routes>
      </Suspense>
    )
  }

  return (
    <PublicLayout>
      <Suspense fallback={BLUE_FALLBACK}>
        <Routes>
          <Route path="/" element={<VolkslaufPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
        </Routes>
      </Suspense>
    </PublicLayout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
