import { useLayoutEffect, useRef, type ReactNode, type RefObject } from 'react'
import { gsap } from '@/animations/gsapConfig'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  duration?: number
  start?: string
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'footer'
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 42,
  duration = 1.1,
  start = 'top 88%',
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start, once: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [delay, y, duration, start, reduced])

  const Component = Tag as 'div'

  return (
    <Component ref={ref as RefObject<HTMLDivElement>} className={className} style={{ opacity: 0 }}>
      {children}
    </Component>
  )
}
