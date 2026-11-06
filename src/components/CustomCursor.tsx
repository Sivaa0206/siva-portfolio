import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '@/animations/gsapConfig'
import { useReducedMotion, useMediaQuery } from '@/hooks/useReducedMotion'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [label, setLabel] = useState('')
  const [active, setActive] = useState(false)
  const finePointer = useMediaQuery('(pointer: fine)')
  const reduced = useReducedMotion()
  const enabled = finePointer && !reduced

  useLayoutEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add('custom-cursor')

    const ctx = gsap.context(() => {
      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 })

      const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' })
      const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' })
      const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
      const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

      let visible = false

      const onMove = (event: PointerEvent) => {
        if (!visible) {
          visible = true
          gsap.to([dot, ring], { opacity: 1, duration: 0.35 })
          gsap.set([dot, ring], { x: event.clientX, y: event.clientY })
          gsap.set(dot, { x: event.clientX, y: event.clientY })
          gsap.set(ring, { x: event.clientX, y: event.clientY })
        }
        dotX(event.clientX)
        dotY(event.clientY)
        ringX(event.clientX)
        ringY(event.clientY)

        const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
          'a, button, [data-cursor]',
        )
        const text = target?.getAttribute('data-cursor-text') ?? ''
        const isActive = Boolean(target)
        setActive(isActive)
        setLabel(text)
      }

      const onLeave = () => {
        visible = false
        gsap.to([dot, ring], { opacity: 0, duration: 0.25 })
      }

      const onDown = () => gsap.to(ring, { scale: 0.82, duration: 0.25 })
      const onUp = () => gsap.to(ring, { scale: 1, duration: 0.35 })
      const onReset = () => {
        setActive(false)
        setLabel('')
      }

      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('mouseleave', onLeave)
      window.addEventListener('pointerdown', onDown)
      window.addEventListener('pointerup', onUp)
      window.addEventListener('cursor-reset', onReset)

      return () => {
        window.removeEventListener('pointermove', onMove)
        document.removeEventListener('mouseleave', onLeave)
        window.removeEventListener('pointerdown', onDown)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('cursor-reset', onReset)
      }
    })

    return () => {
      ctx.revert()
      document.documentElement.classList.remove('custom-cursor')
    }
  }, [enabled])

  useLayoutEffect(() => {
    if (!enabled) return
    const ring = ringRef.current
    const labelEl = labelRef.current
    if (!ring) return
    gsap.to(ring, {
      width: active ? (label ? 92 : 54) : 36,
      height: active ? (label ? 92 : 54) : 36,
      backgroundColor: active ? 'rgba(124,107,255,0.16)' : 'rgba(124,107,255,0)',
      borderColor: active ? 'rgba(169,155,255,0.9)' : 'rgba(242,239,233,0.4)',
      duration: 0.45,
      ease: 'power3.out',
    })
    if (labelEl) {
      gsap.to(labelEl, { opacity: label ? 1 : 0, duration: 0.25 })
    }
  }, [active, label, enabled])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95] hidden md:block">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/40"
      >
        <span
          ref={labelRef}
          className="font-mono text-[9px] uppercase tracking-[0.16em] text-bone opacity-0"
        >
          {label}
        </span>
      </div>
      <div ref={dotRef} className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-bone" />
    </div>
  )
}
