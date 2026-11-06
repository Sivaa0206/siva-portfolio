import { useLayoutEffect, useRef, type ElementType } from 'react'
import { gsap, ScrollTrigger } from '@/animations/gsapConfig'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type AnimatedTextProps = {
  text: string
  as?: ElementType
  by?: 'word' | 'char'
  className?: string
  pieceClassName?: string
  play?: boolean
  scroll?: boolean
  delay?: number
  stagger?: number
  start?: string
  duration?: number
}

export function AnimatedText({
  text,
  as: Tag = 'span',
  by = 'word',
  className = '',
  pieceClassName = '',
  play,
  scroll = false,
  delay = 0,
  stagger = 0.035,
  start = 'top 88%',
  duration = 1.05,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const words = text.split(' ')

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const pieces = el.querySelectorAll<HTMLElement>('[data-piece]')
    if (!pieces.length) return
    if (reduced || play === false) {
      gsap.set(pieces, { yPercent: 0, opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(pieces, { yPercent: 118, opacity: 0 })

      const animate = () => {
        gsap.to(pieces, {
          yPercent: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'expo.out',
          stagger,
          overwrite: true,
        })
      }

      if (scroll) {
        const inView = el.getBoundingClientRect().top < window.innerHeight * 0.94
        if (inView) {
          animate()
          return
        }
        ScrollTrigger.create({
          trigger: el,
          start,
          once: true,
          onEnter: animate,
        })
      } else {
        animate()
      }
    }, el)

    return () => ctx.revert()
  }, [text, by, play, scroll, delay, stagger, start, duration, reduced])

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
            {by === 'char' ? (
              Array.from(word).map((char, charIndex) => (
                <span
                  key={`${char}-${charIndex}`}
                  className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
                >
                  <span className={`inline-block will-change-transform ${pieceClassName}`} data-piece>
                    {char}
                  </span>
                </span>
              ))
            ) : (
              <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
                <span className={`inline-block will-change-transform ${pieceClassName}`} data-piece>
                  {word}
                </span>
              </span>
            )}
            {wordIndex < words.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </span>
    </Tag>
  )
}
