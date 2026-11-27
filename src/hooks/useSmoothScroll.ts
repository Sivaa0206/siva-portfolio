import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenis } from '@/lib/scroll'

export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    setLenis(lenis)

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = window.requestAnimationFrame(loop)
    }
    raf = window.requestAnimationFrame(loop)

    return () => {
      window.cancelAnimationFrame(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [enabled])
}
