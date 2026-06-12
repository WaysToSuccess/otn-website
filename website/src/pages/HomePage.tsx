import Hero from '../components/home/Hero'
import Services from '../components/home/Services'
import OtnProthese from '../components/home/OtnProthese'
import About from '../components/home/About'
import Branches from '../components/home/Branches'
import Career from '../components/home/Career'
import Contact from '../components/home/Contact'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <OtnProthese />
      <About />
      <Branches />
      <Career />
      <Contact />
    </main>
  )
}
