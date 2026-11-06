import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

if (!registered) {
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({ ease: 'power3.out', duration: 1 })
  registered = true
}

export const EASE = {
  out: 'power3.out',
  expo: 'expo.out',
  inOut: 'power3.inOut',
  soft: 'power2.out',
} as const

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export { gsap, ScrollTrigger }
