import { useEffect, useRef, type CSSProperties } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type WordFillProps = {
  text: string
  className?: string
}

export function WordFill({ text, className = '' }: WordFillProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const words = text.split(/\s+/)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (reduced) {
      element.style.setProperty('--p', '1')
      return
    }

    let raf = 0

    const update = () => {
      raf = 0
      const rect = element.getBoundingClientRect()
      const start = window.innerHeight * 0.85
      const end = window.innerHeight * 0.25
      const total = rect.height + (start - end)
      const progress = total > 0 ? (start - rect.top) / total : 1
      element.style.setProperty('--p', String(Math.min(1, Math.max(0, progress))))
    }

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <p
      ref={ref}
      className={`word-fill ${className}`.trim()}
      style={{ '--n': words.length + 3 } as CSSProperties}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="word"
          style={{ '--i': index } as CSSProperties}
        >
          {word}{' '}
        </span>
      ))}
    </p>
  )
}
