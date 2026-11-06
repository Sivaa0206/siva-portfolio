import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsapConfig'

type PreloaderProps = {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)
  const completedRef = useRef(false)

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem('siva-portfolio-loaded') === 'true'
    if (alreadyLoaded || prefersReducedMotion()) {
      completedRef.current = true
      onComplete()
      setHidden(true)
    }
  }, [onComplete])

  useLayoutEffect(() => {
    if (completedRef.current) return
    const root = rootRef.current
    if (!root) return

    document.body.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
      const counter = { value: 0 }
      const counterEl = root.querySelector<HTMLElement>('[data-counter]')
      const bar = root.querySelector<HTMLElement>('[data-bar]')
      const letters = root.querySelectorAll<HTMLElement>('[data-letter]')

      const finish = () => {
        if (completedRef.current) return
        completedRef.current = true
        document.body.style.overflow = ''
        sessionStorage.setItem('siva-portfolio-loaded', 'true')
        setHidden(true)
        onComplete()
      }

      const tl = gsap.timeline({ delay: 0.15 })

      tl.fromTo(
        letters,
        { yPercent: 130, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: 'expo.out' },
        0,
      )

      tl.to(
        counter,
        {
          value: 100,
          duration: 1.65,
          ease: 'power2.inOut',
          onUpdate: () => {
            const next = Math.round(counter.value)
            setProgress(next)
            if (counterEl) counterEl.textContent = String(next).padStart(3, '0')
            if (bar) bar.style.transform = `scaleX(${counter.value / 100})`
          },
        },
        0.1,
      )

      tl.to(
        letters,
        { yPercent: -130, opacity: 0, duration: 0.65, stagger: 0.045, ease: 'power3.in' },
        '+=0.12',
      )

      tl.to(
        root,
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.95,
          ease: 'expo.inOut',
          onStart: finish,
        },
        '-=0.28',
      )
    }, root)

    return () => {
      document.body.style.overflow = ''
      ctx.revert()
    }
  }, [onComplete])

  if (hidden) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink-950 px-5 py-6 sm:px-8 sm:py-8"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${progress} percent`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-muted">
          Portfolio — 2026
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-muted">
          Chennai, IN
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="flex overflow-hidden">
          {'SIVA'.split('').map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              data-letter
              className="display block text-[clamp(5rem,20vw,15rem)] leading-none text-bone"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="relative h-px w-full overflow-hidden bg-white/10">
          <div
            data-bar
            className="absolute inset-0 origin-left bg-gradient-to-r from-accent to-accent-glow"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        <div className="flex items-end justify-between gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-muted">
            Preparing the experience
          </span>
          <span className="font-mono text-[clamp(2rem,6vw,3.5rem)] leading-none tracking-tight text-bone" data-counter>
            000
          </span>
        </div>
      </div>
    </div>
  )
}
