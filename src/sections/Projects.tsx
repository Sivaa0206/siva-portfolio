import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { ProjectVisual } from '@/components/ProjectVisual'
import { gsap, prefersReducedMotion } from '@/animations/gsapConfig'
import { useMediaQuery } from '@/hooks/useReducedMotion'
import { projects, type Project } from '@/data/projects'
import { getLenis } from '@/lib/scroll'

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [hovered, setHovered] = useState<Project | null>(null)
  const finePointer = useMediaQuery('(pointer: fine)')
  const reduced = prefersReducedMotion()

  useLayoutEffect(() => {
    const root = sectionRef.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const rows = root.querySelectorAll<HTMLElement>('[data-project-row]')
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 90%', once: true },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    const preview = previewRef.current
    if (!preview || !finePointer || reduced) return

    const ctx = gsap.context(() => {
      gsap.set(preview, { autoAlpha: 0, scale: 0.96 })
      const xTo = gsap.quickTo(preview, 'x', { duration: 0.7, ease: 'power3.out' })
      const yTo = gsap.quickTo(preview, 'y', { duration: 0.7, ease: 'power3.out' })

      const onMove = (event: PointerEvent) => {
        const width = 360
        const x = Math.min(event.clientX + 28, window.innerWidth - width - 20)
        const y = Math.max(20, event.clientY - 130)
        xTo(x)
        yTo(y)
      }

      window.addEventListener('pointermove', onMove, { passive: true })
      return () => window.removeEventListener('pointermove', onMove)
    }, preview)

    return () => ctx.revert()
  }, [finePointer, reduced])

  const showPreview = useCallback(
    (project: Project) => {
      if (!finePointer || reduced) return
      setHovered(project)
      const preview = previewRef.current
      if (!preview) return
      gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power3.out' })
    },
    [finePointer, reduced],
  )

  const hidePreview = useCallback(() => {
    const preview = previewRef.current
    if (!preview) return
    gsap.to(preview, { autoAlpha: 0, scale: 0.96, duration: 0.3, ease: 'power2.out' })
  }, [])

  const closeModal = useCallback(() => {
    const modal = modalRef.current
    const panel = modal?.querySelector<HTMLElement>('[data-modal-panel]')
    const backdrop = modal?.querySelector<HTMLElement>('[data-modal-backdrop]')

    const finish = () => {
      setActiveProject(null)
      window.setTimeout(() => triggerRef.current?.focus(), 20)
    }

    if (!modal || !panel || !backdrop || reduced) {
      finish()
      return
    }

    gsap.to(backdrop, { opacity: 0, duration: 0.25, ease: 'power2.out' })
    gsap.to(panel, {
      opacity: 0,
      y: 24,
      scale: 0.985,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: finish,
    })
  }, [reduced])

  useEffect(() => {
    if (!activeProject) return
    const modal = modalRef.current
    const panel = modal?.querySelector<HTMLElement>('[data-modal-panel]')
    const backdrop = modal?.querySelector<HTMLElement>('[data-modal-backdrop]')

    document.body.style.overflow = 'hidden'
    getLenis()?.stop()

    if (panel && backdrop && !reduced) {
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      gsap.fromTo(
        panel,
        { opacity: 0, y: 42, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'expo.out' },
      )
    }

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 60)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeModal()
        return
      }
      if (event.key !== 'Tab' || !panel) return
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
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

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      getLenis()?.start()
    }
  }, [activeProject, closeModal, reduced])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-pad relative border-t border-white/[0.06]"
      aria-labelledby="projects-heading"
    >
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="projects-heading"
            index="05"
            label="Featured Projects"
            title="Selected"
            accent="work."
          />
          <p className="max-w-sm text-[13.5px] leading-relaxed text-bone-muted lg:pb-3 lg:text-right">
            Enterprise platforms, regulated journeys and frontend architecture. Shared at the level
            of detail the work allows.
          </p>
        </div>

        <div className="mt-12 border-t border-white/[0.09] lg:mt-20">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              data-project-row
              data-cursor-text="Open"
              onClick={(event) => {
                triggerRef.current = event.currentTarget
                hidePreview()
                window.dispatchEvent(new Event('cursor-reset'))
                setActiveProject(project)
              }}
              onMouseEnter={() => showPreview(project)}
              onMouseLeave={hidePreview}
              className="project-row group relative block w-full border-b border-white/[0.09] py-7 text-left focus-visible:bg-white/[0.02] sm:py-9"
              aria-label={`Open case study: ${project.title}`}
            >
              <div className="grid items-start gap-4 sm:grid-cols-[auto_1fr_auto] sm:gap-8">
                <span className="font-mono text-[10px] tracking-[0.2em] text-bone-muted sm:pt-2">
                  {project.index}
                </span>

                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="project-title display text-[clamp(1.75rem,4vw,3.1rem)] text-bone">
                      {project.title}
                    </h3>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent-soft/80">
                      {project.category}
                    </span>
                  </div>
                  <p className="mt-2.5 max-w-xl text-[13px] leading-relaxed text-bone-muted sm:mt-3 sm:text-[13.5px]">
                    {project.overview}
                  </p>

                  <ProjectVisual
                    variant={project.variant}
                    accent={project.accent}
                    className="mt-5 aspect-[4/3] w-full max-w-md lg:hidden"
                  />

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/[0.09] px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.12em] text-bone-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:gap-5 sm:pt-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-muted">
                    {project.year}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-bone-muted transition-all duration-500 group-hover:border-accent/60 group-hover:bg-accent/10 group-hover:text-accent-soft">
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.2em] text-bone-muted">
          Select a project to read the engineering detail
        </p>
      </div>

      {finePointer && !reduced ? (
        <div
          ref={previewRef}
          className="pointer-events-none fixed left-0 top-0 z-[60] hidden w-[360px] lg:block"
          aria-hidden="true"
        >
          <ProjectVisual
            variant={(hovered ?? projects[0]).variant}
            accent={(hovered ?? projects[0]).accent}
            className="aspect-[4/3] w-full shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
          />
          <div className="mt-2 flex items-center justify-between px-1">
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone-muted">
              {(hovered ?? projects[0]).category}
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-accent-soft">
              Case study
            </span>
          </div>
        </div>
      ) : null}

      {activeProject ? (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[88] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
        >
          <div
            data-modal-backdrop
            className="absolute inset-0 bg-ink-950/85 backdrop-blur-md"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div
            data-modal-panel
            data-lenis-prevent
            className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto overscroll-contain border border-white/[0.1] bg-ink-900 shadow-[0_60px_150px_-40px_rgba(0,0,0,0.95)] sm:max-h-[86vh]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.08] bg-ink-900/90 px-5 py-3 backdrop-blur sm:px-7">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone-muted">
                Case study / {activeProject.index}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-bone transition-colors duration-300 hover:border-accent/60 hover:text-accent-soft"
                aria-label="Close case study"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="px-5 pb-8 pt-5 sm:px-7 sm:pb-10">
              <ProjectVisual
                variant={activeProject.variant}
                accent={activeProject.accent}
                className="aspect-[16/9] w-full"
              />

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent-soft">
                  {activeProject.category}
                </span>
                <span className="h-3 w-px bg-white/15" aria-hidden="true" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-muted">
                  {activeProject.context}
                </span>
                <span className="h-3 w-px bg-white/15" aria-hidden="true" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-muted">
                  {activeProject.year}
                </span>
              </div>

              <h2
                id="project-dialog-title"
                className="display mt-4 text-[clamp(2rem,5vw,3.4rem)] text-bone"
              >
                {activeProject.title}
              </h2>

              <p className="mt-4 text-[14px] leading-relaxed text-bone-dim sm:text-[15px]">
                {activeProject.overview}
              </p>

              <div className="mt-8 border-l border-accent/40 pl-5">
                <h3 className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone-muted">
                  The engineering challenge
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-bone-dim sm:text-[14.5px]">
                  {activeProject.challenge}
                </p>
              </div>

              <div className="mt-8">
                <h3 className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone-muted">
                  Key contributions
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {activeProject.contribution.map((item) => (
                    <li key={item} className="flex gap-3 text-[13px] leading-relaxed text-bone-muted">
                      <span className="mt-2 h-px w-3 shrink-0 bg-accent-soft/60" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {activeProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/[0.1] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-bone-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
                <p className="max-w-sm text-[11px] leading-relaxed text-bone-muted">
                  Scope described reflects the responsibilities held on this work. No client data is
                  reproduced.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone-muted transition-colors duration-300 hover:text-bone"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

