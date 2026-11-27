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
    lenisInstance.scrollTo(target, { offset: -88, duration: 1.2 })
    return
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const top = target.getBoundingClientRect().top + window.scrollY - 88
  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
}

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.2 })
    return
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}
