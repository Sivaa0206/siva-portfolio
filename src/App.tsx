import { useCallback, useLayoutEffect, useState } from 'react'
import { Preloader } from '@/components/Preloader'
import { CustomCursor } from '@/components/CustomCursor'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Experience } from '@/sections/Experience'
import { Skills } from '@/sections/Skills'
import { Projects } from '@/sections/Projects'
import { Contact } from '@/sections/Contact'
import { Footer } from '@/sections/Footer'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { ScrollTrigger } from '@/animations/gsapConfig'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const handleLoaded = useCallback(() => {
    window.scrollTo(0, 0)
    setLoaded(true)
  }, [])

  useSmoothScroll(loaded)

  useLayoutEffect(() => {
    if (!loaded) return
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 400)
    let cancelled = false
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh()
      })
    }
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [loaded])

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Preloader onComplete={handleLoaded} />
      <CustomCursor />
      <Navbar />

      <main id="main">
        <Hero ready={loaded} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />

      <div className="grain-overlay" aria-hidden="true" />
    </div>
  )
}
