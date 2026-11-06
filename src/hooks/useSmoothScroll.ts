import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsapConfig'
import { setLenis } from '@/lib/scroll'

export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    setLenis(lenis)

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const timeout = window.setTimeout(refresh, 600)

    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener('load', refresh)
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [enabled])
}
