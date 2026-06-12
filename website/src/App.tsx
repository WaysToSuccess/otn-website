import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import VolkslaufPage from './pages/VolkslaufPage'
import LeistungenPage from './pages/LeistungenPage'
import LauflaborPage from './pages/LauflaborPage'
import ServicePage from './pages/ServicePage'
import FilialenPage from './pages/FilialenPage'
import UeberUnsPage from './pages/UeberUnsPage'
import JobsPage from './pages/JobsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/volkslauf" element={<VolkslaufPage />} />
        <Route path="/leistungen" element={<LeistungenPage />} />
        <Route path="/leistungen/lauflabor" element={<LauflaborPage />} />
        <Route path="/leistungen/sanitaetshaus" element={<ServicePage slug="sanitaetshaus" />} />
        <Route path="/leistungen/prothesen-atelier" element={<ServicePage slug="prothesen-atelier" />} />
        <Route path="/leistungen/orthopaedietechnik" element={<ServicePage slug="orthopaedietechnik" />} />
        <Route path="/leistungen/reha-pflege" element={<ServicePage slug="reha-pflege" />} />
        <Route path="/leistungen/schuhtechnik" element={<ServicePage slug="schuhtechnik" />} />
        <Route path="/leistungen/rund-ums-kind" element={<ServicePage slug="rund-ums-kind" />} />
        <Route path="/filialen-kontakt" element={<FilialenPage />} />
        <Route path="/ueber-o-t-n" element={<UeberUnsPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/stellenangebote" element={<JobsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
