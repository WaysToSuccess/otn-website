import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CookieBanner from './components/layout/CookieBanner'
import FloatingCTA from './components/layout/FloatingCTA'
import VolkslaufPage from './pages/VolkslaufPage'

const ImpressumPage           = lazy(() => import('./pages/ImpressumPage'))
const DatenschutzPage         = lazy(() => import('./pages/DatenschutzPage'))
const AusschreibungPage       = lazy(() => import('./pages/AusschreibungPage'))
const MarketplaceHowItWorksPage = lazy(() => import('./pages/MarketplaceHowItWorksPage'))
const InternSocialMediaPage = lazy(() => import('./pages/intern/InternSocialMediaPage'))
const InternBilderPage = lazy(() => import('./pages/intern/InternBilderPage'))
const ZeitungsartikelPage = lazy(() => import('./pages/ZeitungsartikelPage'))

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <FloatingCTA />
      <CookieBanner />
    </>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isIntern = location.pathname.startsWith('/intern')
  const isZeitungsartikel = location.pathname === '/zeitungsartikel'
  const isAusschreibung = location.pathname === '/ausschreibung'

  if (isZeitungsartikel) {
    return (
      <Routes>
        <Route path="/zeitungsartikel" element={<ZeitungsartikelPage />} />
      </Routes>
    )
  }

  if (isAusschreibung) {
    return (
      <Routes>
        <Route path="/ausschreibung" element={<AusschreibungPage />} />
      </Routes>
    )
  }

  if (isIntern) {
    return (
      <Routes>
        <Route path="/intern/social-media" element={<InternSocialMediaPage />} />
        <Route path="/intern/bilder" element={<InternBilderPage />} />
        <Route path="/intern" element={<InternSocialMediaPage />} />
      </Routes>
    )
  }

  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<VolkslaufPage />} />
        <Route path="/how-it-works" element={<MarketplaceHowItWorksPage />} />
        <Route path="/impressum" element={<ImpressumPage />} />
        <Route path="/datenschutz" element={<DatenschutzPage />} />
      </Routes>
    </PublicLayout>
  )
}

export default function App() {
  useEffect(() => {
    document.body.classList.add('app-ready')
  }, [])

  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  )
}
