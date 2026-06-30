import { About } from './components/About'
import { Dishes } from './components/Dishes'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ImageStrip } from './components/ImageStrip'
import { ReservationCTA } from './components/ReservationCTA'
import { Specials } from './components/Specials'
import { Testimonials } from './components/Testimonials'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <ImageStrip />
        <Dishes />
        <Specials />
        <Experience />
        <Testimonials />
        <ReservationCTA />
      </main>
      <Footer />
    </>
  )
}
