import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CookieBanner from './components/layout/CookieBanner'
import FloatingCTA from './components/layout/FloatingCTA'
import VolkslaufPage from './pages/VolkslaufPage'
import ImpressumPage from './pages/ImpressumPage'
import DatenschutzPage from './pages/DatenschutzPage'
import AusschreibungPage from './pages/AusschreibungPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<VolkslaufPage />} />
        <Route path="/ausschreibung" element={<AusschreibungPage />} />
        <Route path="/impressum" element={<ImpressumPage />} />
        <Route path="/datenschutz" element={<DatenschutzPage />} />
      </Routes>
      <Footer />
      <FloatingCTA />
      <CookieBanner />
    </BrowserRouter>
  )
}
