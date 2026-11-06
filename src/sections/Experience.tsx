import { useLayoutEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { gsap, prefersReducedMotion } from '@/animations/gsapConfig'
import { experiences } from '@/data/experience'

export function Experience() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = prefersReducedMotion()

    const ctx = gsap.context(() => {
      const line = root.querySelector<HTMLElement>('[data-timeline-line]')
      const items = root.querySelectorAll<HTMLElement>('[data-timeline-item]')
      const dots = root.querySelectorAll<HTMLElement>('[data-timeline-dot]')

      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 })
        gsap.set(dots, { scale: 1 })
        if (line) gsap.set(line, { scaleY: 1 })
        return
      }

      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top 72%',
              end: 'bottom 72%',
              scrub: 0.6,
            },
          },
        )
      }

      items.forEach((item, index) => {
        const dot = dots[index]
        gsap.fromTo(
          item,
          { opacity: 0, y: 46 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 86%', once: true },
          },
        )
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.6,
              ease: 'back.out(2)',
              scrollTrigger: { trigger: item, start: 'top 86%', once: true },
            },
          )
        }
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="section-pad relative border-t border-white/[0.06]" aria-labelledby="experience-heading">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="experience-heading"
            index="03"
            label="Experience"
            title="The work"
            accent="so far."
          />
          <p className="max-w-sm text-[13.5px] leading-relaxed text-bone-muted lg:pb-3 lg:text-right">
            Three teams, one throughline: building interfaces that hold up under real enterprise
            complexity — from regulated banking journeys to platform-level architecture.
          </p>
        </div>

        <div ref={rootRef} className="relative mt-16 lg:mt-24">
          <div className="absolute left-0 top-0 hidden h-full w-px bg-white/10 lg:block" aria-hidden="true" />
          <div
            data-timeline-line
            className="timeline-line absolute left-0 top-0 hidden h-full w-px origin-top lg:block"
            aria-hidden="true"
          />

          <ol>
            {experiences.map((item, index) => (
              <li
                key={item.id}
                data-timeline-item
                className="group relative border-t border-white/[0.09] py-9 first:border-t-0 first:pt-0 sm:py-11 lg:pl-12 lg:first:pt-2"
              >
                <span
                  data-timeline-dot
                  className="absolute left-0 top-[0.6rem] hidden h-2 w-2 -translate-x-1/2 rounded-full bg-accent-soft shadow-[0_0_18px_4px_rgba(124,107,255,0.35)] lg:block"
                  aria-hidden="true"
                />

                <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-3 lg:block">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-muted">
                        {item.period}
                      </span>
                      {item.current ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-accent-soft lg:mt-3">
                          <span className="h-1 w-1 rounded-full bg-accent-soft" />
                          Current
                        </span>
                      ) : null}
                    </div>
                    <span className="mt-3 hidden font-mono text-[9px] uppercase tracking-[0.2em] text-bone-muted lg:block">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="lg:col-span-9">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
                      <h3 className="display text-[clamp(1.9rem,4vw,3rem)] text-bone transition-colors duration-500 group-hover:text-accent-soft">
                        {item.company}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-soft/90">
                        {item.role}
                      </span>
                    </div>
                    {item.via ? (
                      <p className="mt-2 flex items-center gap-2 text-[12px] text-bone-muted">
                        <span className="h-px w-6 bg-white/20" aria-hidden="true" />
                        via {item.via} — client {item.company}
                      </p>
                    ) : null}

                    <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-bone-dim sm:text-[15px]">
                      {item.summary}
                    </p>

                    <ul className="mt-6 grid gap-x-10 gap-y-2.5 md:grid-cols-2">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3 text-[13px] leading-relaxed text-bone-muted">
                          <span className="mt-[0.55rem] h-px w-3 shrink-0 bg-accent-soft/60" aria-hidden="true" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/[0.09] px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-bone-muted transition-colors duration-300 group-hover:border-white/20 group-hover:text-bone-dim"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <ArrowUpRight
                  size={18}
                  className="absolute right-0 top-9 hidden text-bone-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-soft lg:block"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
