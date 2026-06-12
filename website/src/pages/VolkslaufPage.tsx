import VlHero from '../components/volkslauf/VlHero'
import VlOverview from '../components/volkslauf/VlOverview'
import VlSchedule from '../components/volkslauf/VlSchedule'
import VlRoute from '../components/volkslauf/VlRoute'
import VlFAQ from '../components/volkslauf/VlFAQ'
import VlSponsors from '../components/volkslauf/VlSponsors'
import VlContact from '../components/volkslauf/VlContact'

export default function VolkslaufPage() {
  return (
    <main>
      <VlHero />
      <VlOverview />
      <VlSchedule />
      <VlRoute />
      <VlFAQ />
      <VlSponsors />
      <VlContact />
    </main>
  )
}
