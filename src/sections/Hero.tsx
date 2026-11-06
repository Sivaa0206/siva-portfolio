import { useEffect, useLayoutEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { AnimatedText } from '@/components/AnimatedText'
import { MagneticButton } from '@/components/MagneticButton'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsapConfig'
import { profile } from '@/data/profile'
import { scrollToSection } from '@/lib/scroll'

type HeroProps = {
  ready: boolean
}

const disciplines = ['Angular', 'React', 'TypeScript', 'Micro-Frontends', 'Accessibility', 'Performance']

export function Hero({ ready }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ready) return
    const root = rootRef.current
    if (!root) return

    const reduced = prefersReducedMotion()
    const ctx = gsap.context(() => {
      const fadeItems = root.querySelectorAll<HTMLElement>('[data-hero-fade]')
      if (reduced) {
        gsap.set(fadeItems, { opacity: 1, y: 0 })
        return
      }
      gsap.fromTo(
        fadeItems,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 1.1, delay: 0.35, stagger: 0.1, ease: 'power3.out' },
      )
    }, root)

    return () => ctx.revert()
  }, [ready])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (prefersReducedMotion()) return

    let frame = 0
    const onMove = (event: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const rect = root.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100
        root.style.setProperty('--mx', `${x}%`)
        root.style.setProperty('--my', `${y}%`)
      })
    }

    root.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      root.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.to('[data-hero-parallax]', {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to('[data-hero-content]', {
        yPercent: 8,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={rootRef}
      className="spotlight relative flex min-h-[100svh] flex-col overflow-hidden pt-20 sm:pt-24"
      style={{ ['--mx' as string]: '50%', ['--my' as string]: '35%' }}
      aria-labelledby="hero-title"
    >
      <div className="hero-aurora pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        ref={orbRef}
        data-hero-parallax
        className="pointer-events-none absolute -right-24 top-1/4 h-[26rem] w-[26rem] rounded-full border border-white/[0.06] sm:h-[34rem] sm:w-[34rem]"
        aria-hidden="true"
      >
        <div className="absolute inset-10 rounded-full border border-white/[0.05]" />
        <div className="absolute inset-24 rounded-full border border-accent/10" />
        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-soft shadow-[0_0_24px_6px_rgba(124,107,255,0.45)]" />
      </div>

      <div data-hero-content className="shell relative z-10 flex flex-1 flex-col justify-center pb-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 sm:mb-10" data-hero-fade style={{ opacity: 0 }}>
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-glow opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-glow" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-bone-dim sm:text-[11px]">
              {profile.availability} — {profile.location}
            </span>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.26em] text-bone-muted sm:block">
            01 — Introduction
          </span>
        </div>

        <h1 id="hero-title" className="display leading-[0.92] text-bone">
          <span className="block text-[clamp(3rem,10.5vw,9.5rem)]">
            <AnimatedText text={profile.hero.lineOne} by="char" play={ready} stagger={0.028} delay={0.15} />
          </span>
          <span className="block text-[clamp(3rem,10.5vw,9.5rem)]">
            <span className="serif-italic text-accent-soft">
              <AnimatedText text={profile.hero.lineTwo} by="char" play={ready} stagger={0.03} delay={0.32} />
            </span>
            <span className="text-[0.38em] align-top text-bone-muted" aria-hidden="true">/</span>
          </span>
          <span className="block text-[clamp(3rem,10.5vw,9.5rem)]">
            <AnimatedText text={profile.hero.lineThree} by="char" play={ready} stagger={0.028} delay={0.45} />
          </span>
        </h1>

        <div className="mt-8 grid gap-8 border-t border-white/10 pt-6 lg:mt-10 lg:grid-cols-12 lg:items-start lg:gap-6">
          <p
            className="max-w-xl text-[15px] leading-relaxed text-bone-dim sm:text-base lg:col-span-5"
            data-hero-fade
            style={{ opacity: 0 }}
          >
            {profile.hero.intro}
          </p>

          <div className="flex flex-col gap-5 lg:col-span-4 lg:col-start-7" data-hero-fade style={{ opacity: 0 }}>
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton onClick={() => scrollToSection('projects')} >
                <span>View selected work</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </MagneticButton>
              <MagneticButton href={profile.resume} download variant="ghost" ariaLabel="Download résumé (PDF)">
                <span>Download résumé</span>
                <Download size={14} aria-hidden="true" />
              </MagneticButton>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-muted">
                4.5+ Years
              </span>
              <span className="hidden h-3 w-px bg-white/15 sm:block" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-muted">
                Angular &amp; React Specialist
              </span>
            </div>
          </div>

          <div className="hidden justify-self-end lg:col-span-2 lg:block lg:justify-self-end" data-hero-fade style={{ opacity: 0 }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-muted vertical-text">
              Scroll to explore
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-y border-white/10 bg-ink-950/40 backdrop-blur-[2px]" data-hero-fade style={{ opacity: 0 }}>
        <div className="shell flex flex-col divide-y divide-white/[0.07] sm:flex-row sm:divide-x sm:divide-y-0">
          {profile.stats.map((stat) => (
            <div key={stat.label} className="flex flex-1 items-baseline gap-4 py-4 sm:px-6 sm:py-5 first:sm:pl-0 last:sm:pr-0">
              <span className="display text-3xl text-bone sm:text-4xl">{stat.value}</span>
              <span className="text-[11px] leading-snug text-bone-muted sm:text-xs">{stat.label}</span>
            </div>
          ))}
          <div className="hidden flex-1 items-center justify-end py-5 pl-6 lg:flex">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-muted">
              <ArrowDown size={12} aria-hidden="true" /> Available for work
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 overflow-hidden border-b border-white/10 py-3" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0 items-center">
              {disciplines.map((item) => (
                <span key={`${group}-${item}`} className="flex items-center whitespace-nowrap">
                  <span className="px-6 text-[11px] uppercase tracking-[0.24em] text-bone-muted">{item}</span>
                  <span className="text-accent/70">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
