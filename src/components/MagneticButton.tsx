import { useLayoutEffect, useRef, type ReactNode, type MouseEvent } from 'react'
import { gsap } from '@/animations/gsapConfig'
import { useReducedMotion, useMediaQuery } from '@/hooks/useReducedMotion'

type MagneticButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'ghost'
  strength?: number
  external?: boolean
  download?: boolean
  ariaLabel?: string
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  strength = 0.32,
  external = false,
  download = false,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const reduced = useReducedMotion()
  const finePointer = useMediaQuery('(pointer: fine)')
  const enabled = finePointer && !reduced

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' })

      const onMove = (event: globalThis.MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const relX = event.clientX - (rect.left + rect.width / 2)
        const relY = event.clientY - (rect.top + rect.height / 2)
        xTo(relX * strength)
        yTo(relY * strength)
      }

      const onLeave = () => {
        xTo(0)
        yTo(0)
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)

      return () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    }, el)

    return () => ctx.revert()
  }, [enabled, strength])

  const base = variant === 'primary' ? 'btn-primary' : 'btn-ghost'
  const classes = `${base} ${className}`
  const handleClick = (_event: MouseEvent<HTMLElement>) => {
    if (onClick) onClick()
  }

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        onClick={handleClick}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...(download ? { download: '' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button ref={ref} type="button" className={classes} onClick={handleClick} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
