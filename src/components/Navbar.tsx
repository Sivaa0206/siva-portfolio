import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/animations/gsapConfig'
import { profile } from '@/data/profile'
import { scrollToSection, getLenis } from '@/lib/scroll'

const navItems = [
  { id: 'home', label: 'Home', index: '01' },
  { id: 'about', label: 'About', index: '02' },
  { id: 'experience', label: 'Experience', index: '03' },
  { id: 'skills', label: 'Skills', index: '04' },
  { id: 'projects', label: 'Projects', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  const overlayRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const value = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${value})`
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-40% 0px -52% 0px', threshold: [0, 0.2, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = overlayRef.current
    if (!el) return
    const items = el.querySelectorAll<HTMLElement>('[data-menu-item]')

    if (open) {
      document.body.style.overflow = 'hidden'
      getLenis()?.stop()
      const ctx = gsap.context(() => {
        gsap.set(el, { visibility: 'visible', clipPath: 'inset(0% 0% 100% 0%)' })
        gsap
          .timeline()
          .to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75, ease: 'expo.inOut' })
          .fromTo(
            items,
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.06, ease: 'expo.out' },
            '-=0.35',
          )
      }, el)
      const focusTimer = window.setTimeout(() => {
        items[0]?.focus()
      }, 450)
      return () => {
        window.clearTimeout(focusTimer)
        ctx.revert()
      }
    }

    const ctx = gsap.context(() => {
      gsap.to(el, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.55,
        ease: 'expo.inOut',
        onComplete: () => gsap.set(el, { visibility: 'hidden' }),
      })
    }, el)

    document.body.style.overflow = ''
    getLenis()?.start()
    return () => ctx.revert()
  }, [open])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
      getLenis()?.start()
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!open) return
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return

      const overlay = overlayRef.current
      if (!overlay) return
      const focusable = Array.from(
        overlay.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ).filter((element) => element.tabIndex !== -1)
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useLayoutEffect(() => {
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => window.clearTimeout(timer)
  }, [])

  const handleNavigate = (id: string) => {
    const wasOpen = open
    setOpen(false)
    window.setTimeout(() => scrollToSection(id), wasOpen ? 250 : 0)
    if (wasOpen) {
      window.setTimeout(() => menuButtonRef.current?.focus(), 260)
    }
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70]">
        <div
          ref={progressRef}
          className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent via-accent-soft to-accent-glow"
          aria-hidden="true"
        />
        <div className="shell">
          <nav
            className={`mt-3 flex items-center justify-between rounded-full px-3 py-2 transition-all duration-500 sm:mt-5 sm:px-4 sm:py-2.5 ${
              scrolled ? 'nav-glass shadow-[0_18px_60px_-30px_rgba(0,0,0,0.9)]' : 'border border-transparent'
            }`}
            aria-label="Primary"
          >
            <a
              href="#home"
              onClick={(event) => {
                event.preventDefault()
                handleNavigate('home')
              }}
              className="group flex items-center gap-3 rounded-full pr-2"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] font-mono text-[11px] tracking-[0.1em] text-bone transition-colors duration-500 group-hover:border-accent/60">
                ST
              </span>
              <span className="hidden flex-col leading-none sm:flex">
                <span className="text-[13px] font-medium tracking-tight text-bone">Siva Thangaraj</span>
                <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.22em] text-bone-muted">
                  Frontend Engineer
                </span>
              </span>
              <span className="sr-only">— Back to top</span>
            </a>

            <ul className="hidden items-center gap-0.5 lg:flex">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault()
                      handleNavigate(item.id)
                    }}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`relative block rounded-full px-3.5 py-2 text-[12px] tracking-wide transition-colors duration-300 ${
                      active === item.id ? 'text-bone' : 'text-bone-muted hover:text-bone'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent-soft transition-opacity duration-300 ${
                        active === item.id ? 'opacity-100' : 'opacity-0'
                      }`}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="group hidden items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-bone transition-colors duration-300 hover:border-accent/60 hover:text-white sm:flex"
              >
                Let's talk
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-bone lg:hidden"
                aria-label="Open navigation menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                <Menu size={18} aria-hidden="true" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={overlayRef}
        className="fixed inset-0 z-[80] flex flex-col bg-ink-950 px-5 pb-8 pt-5 sm:px-8"
        style={{ visibility: 'hidden', clipPath: 'inset(0% 0% 100% 0%)' }}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-muted">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-bone"
            aria-label="Close navigation menu"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center" aria-label="Mobile">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id} className="overflow-hidden">
                <a
                  href={`#${item.id}`}
                  data-menu-item
                  onClick={(event) => {
                    event.preventDefault()
                    handleNavigate(item.id)
                  }}
                  className="group flex items-baseline gap-4 py-1.5"
                  tabIndex={open ? 0 : -1}
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-bone-muted">
                    {item.index}
                  </span>
                  <span className="display text-[clamp(2.6rem,11vw,5rem)] text-bone transition-colors duration-300 group-hover:text-accent-soft">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-muted">
              Chennai, India
            </span>
            <div className="flex items-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 text-[12px] text-bone link-line"
                tabIndex={open ? 0 : -1}
              >
                Email <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 text-[12px] text-bone link-line"
                tabIndex={open ? 0 : -1}
              >
                LinkedIn <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
