import { Catalog } from './sections/catalog'
import { Contacts } from './sections/contacts'
import { Hero } from './sections/hero'
import { Novelties } from './sections/novelties'
import { Pricing } from './sections/pricing'
import { Process } from './sections/process'
import { Reviews } from './sections/reviews'
import { Sura } from './sections/sura'

const HomeView = () => {
  return (
    <main>
      <Hero />
      <Process />
      <Catalog />
      <Novelties />
      <Sura />
      <Pricing />
      <Reviews />
      <Contacts />
    </main>
  )
}

export default HomeView
