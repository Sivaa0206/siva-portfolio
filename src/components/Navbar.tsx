import { useEffect, useState } from 'react'
import { profile } from '@/data/profile'
import { scrollToSection, scrollToTop } from '@/lib/scroll'
import { ArrowUpRight } from '@/components/Icons'

const links = [
  { id: 'work', label: 'Work' },
  { id: 'approach', label: 'Approach' },
  { id: 'experience', label: 'Experience' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    const query = window.matchMedia('(min-width: 901px)')
    const onChange = () => {
      if (query.matches) setOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const go = (id: string) => {
    if (open) {
      setOpen(false)
      window.setTimeout(() => scrollToSection(id), 80)
      return
    }
    scrollToSection(id)
  }

  return (
    <>
      <header className={`site-nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="site-nav-inner">
          <a
            className="brand"
            href="#top"
            onClick={(event) => {
              event.preventDefault()
              setOpen(false)
              scrollToTop()
            }}
          >
            <span className="brand-mark" aria-hidden="true">
              S
            </span>
            <span className="brand-name">Siva Thangaraj</span>
          </a>

          <nav className="nav-pill" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={active === link.id ? 'is-active' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  go(link.id)
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-right">
            <span className="nav-status">
              <span className="dot" />
              Available for work
            </span>
            <a
              className="btn btn-solid nav-cta"
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
            >
              Résumé <ArrowUpRight />
            </a>
            <button
              type="button"
              className={`burger${open ? ' is-open' : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu${open ? ' is-open' : ''}`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile">
          {links.map((link, index) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(event) => {
                event.preventDefault()
                go(link.id)
              }}
            >
              <span className="mobile-index">0{index + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mobile-foot">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.resume} target="_blank" rel="noreferrer">
            Résumé <ArrowUpRight />
          </a>
        </div>
      </div>
    </>
  )
}
