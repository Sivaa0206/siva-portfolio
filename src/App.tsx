import { Navbar } from '@/components/Navbar'
import { Marquee } from '@/components/Marquee'
import { Hero } from '@/sections/Hero'
import { Manifesto } from '@/sections/Manifesto'
import { Work } from '@/sections/Work'
import { Experience } from '@/sections/Experience'
import { Capabilities } from '@/sections/Capabilities'
import { Contact } from '@/sections/Contact'
import { Footer } from '@/sections/Footer'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()

  return (
    <div className="page-root">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Marquee />
        <Manifesto />
        <Work />
        <Experience />
        <Capabilities />
        <Contact />
      </main>

      <Footer />

      <div className="grain-overlay" aria-hidden="true" />
    </div>
  )
}
