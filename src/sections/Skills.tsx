import { useLayoutEffect, useRef } from 'react'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { gsap, prefersReducedMotion } from '@/animations/gsapConfig'
import { domains } from '@/data/education'
import { skillGroups } from '@/data/skills'

export function Skills() {
  const gridRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = gridRef.current
    if (!root) return
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const groups = root.querySelectorAll<HTMLElement>('[data-skill-group]')
      groups.forEach((group) => {
        const chips = group.querySelectorAll<HTMLElement>('[data-skill-chip]')
        gsap.fromTo(
          chips,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.045,
            scrollTrigger: { trigger: group, start: 'top 88%', once: true },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" className="section-pad relative border-t border-white/[0.06]" aria-labelledby="skills-heading">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="skills-heading"
            index="04"
            label="Technical Expertise"
            title="The stack"
            accent="I build with."
          />
          <div className="flex max-w-sm flex-col gap-3 lg:pb-3 lg:text-right">
            <p className="text-[13.5px] leading-relaxed text-bone-muted">
              Not a checklist of logos — a working toolkit shaped by enterprise delivery, code
              review and accessibility standards.
            </p>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone-muted">
              No arbitrary percentages. Just what I use.
            </span>
          </div>
        </div>

        <div ref={gridRef} className="mt-14 grid border-t border-white/[0.09] sm:grid-cols-2 lg:mt-20">
          {skillGroups.map((group, index) => {
            const isLastOdd = skillGroups.length % 2 === 1 && index === skillGroups.length - 1
            return (
            <div
              key={group.id}
              data-skill-group
              className={`group relative overflow-hidden border-b border-white/[0.09] py-9 sm:py-11 ${
                isLastOdd
                  ? 'sm:col-span-2 sm:border-b-0'
                  : index % 2 === 0
                    ? 'sm:border-r sm:pr-10'
                    : 'sm:pl-10'
              }`}
            >
              <span
                className="pointer-events-none absolute -right-2 top-2 font-mono text-[5rem] leading-none text-white/[0.035] transition-colors duration-700 group-hover:text-white/[0.06] sm:text-[6.5rem]"
                aria-hidden="true"
              >
                {group.index}
              </span>

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-accent-soft" aria-hidden="true" />
                  <h3 className="text-[15px] font-medium tracking-tight text-bone sm:text-base">
                    {group.title}
                  </h3>
                </div>
                <p className="mt-2.5 max-w-xs text-[12.5px] leading-relaxed text-bone-muted">
                  {group.caption}
                </p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      data-skill-chip
                      className="cursor-default rounded-full border border-white/[0.1] bg-white/[0.015] px-3.5 py-2 text-[12px] text-bone-dim transition-all duration-400 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/[0.08] hover:text-bone"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            )
          })}
        </div>

        <Reveal className="mt-10 flex flex-col gap-5 rounded-[2px] border border-white/[0.08] bg-white/[0.015] px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <span className="eyebrow">Domain experience</span>
            <p className="mt-2 text-[13.5px] text-bone-dim">
              Regulated, enterprise and AI-powered products.
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {domains.map((domain) => (
              <li
                key={domain}
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-muted"
              >
                {domain}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
