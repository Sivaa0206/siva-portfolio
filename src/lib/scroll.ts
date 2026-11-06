import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance
}

export function getLenis(): Lenis | null {
  return lenisInstance
}

export function scrollToSection(id: string) {
  const target = document.getElementById(id)
  if (!target) return

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: 0, duration: 1.4 })
    return
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
}

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.4 })
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
