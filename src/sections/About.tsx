import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { profile } from '@/data/profile'
import { education, impact, languages } from '@/data/education'

const principles = [
  {
    index: '01',
    title: 'Clarity over cleverness',
    body: 'Abstractions should make the next engineer faster, not just the author. I optimise for systems that are easy to reason about six months later.',
  },
  {
    index: '02',
    title: 'Accessibility is part of done',
    body: 'Keyboard flows, semantic structure, ARIA and WCAG 2.1 are engineering constraints — not a final checklist before release.',
  },
  {
    index: '03',
    title: 'Performance is a feature',
    body: 'Lazy loading, code splitting and measured animation budgets are product decisions. Speed changes how an interface feels.',
  },
]

export function About() {
  return (
    <section id="about" className="section-pad relative" aria-labelledby="about-heading">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SectionHeading
              id="about-heading"
              index="02"
              label="About"
              title="More than just"
              accent="writing code."
              className="mb-12"
            />

            <div className="space-y-7 text-[15px] leading-[1.8] text-bone-dim sm:text-[17px]">
              <Reveal>
                <p>
                  I'm Siva Thangaraj, a Frontend Engineer based in Chennai with{' '}
                  <span className="text-bone">4.5+ years</span> of experience shipping enterprise
                  web applications. I work across Angular and React, and I care as much about the
                  architecture behind an interface as the interface itself.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p>
                  Most of my work sits where complexity is unavoidable: multi-step banking
                  onboarding, encrypted payloads, KYC integrations, payment flows and
                  micro-frontend platforms. My job is to make that complexity feel simple to the
                  person on the other side of the screen.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  Recently I've been designing Web Components-based micro-frontend modules that
                  enable independent deployments across feature domains — and defining the
                  frontend engineering standards that keep those domains coherent.
                </p>
              </Reveal>
            </div>

            <Reveal className="mt-12 border-y border-white/[0.08]" y={24}>
              <div className="grid divide-y divide-white/[0.08] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {impact.map((item) => (
                  <div key={item.value} className="py-5 sm:px-6 sm:py-6">
                    <span className="display text-[clamp(1.7rem,3vw,2.3rem)] text-bone">
                      {item.value}
                    </span>
                    <p className="mt-1.5 text-[12px] leading-snug text-bone-dim">{item.label}</p>
                    <p className="mt-2 text-[11px] leading-relaxed text-bone-muted">{item.detail}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="mt-14">
              <Reveal className="eyebrow mb-6" y={16}>
                Engineering philosophy
              </Reveal>
              <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {principles.map((item, index) => (
                  <Reveal as="li" key={item.index} delay={index * 0.06} y={24}>
                    <div className="group grid gap-3 py-6 sm:grid-cols-[auto_1fr] sm:gap-8">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-accent-soft sm:pt-1">
                        {item.index}
                      </span>
                      <div>
                        <h3 className="text-[17px] font-medium tracking-tight text-bone transition-colors duration-300 group-hover:text-accent-soft sm:text-lg">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-lg text-[13.5px] leading-relaxed text-bone-muted">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal className="mt-12 grid gap-8 border-t border-white/[0.08] pt-8 sm:grid-cols-2" y={24}>
              <div>
                <span className="eyebrow">Education</span>
                <h3 className="mt-3 text-[15px] font-medium tracking-tight text-bone">
                  {education.institution}
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-bone-dim">
                  {education.degree}
                </p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-bone-muted">
                  {education.period} · {education.grade}
                </p>
              </div>
              <div>
                <span className="eyebrow">Languages</span>
                <ul className="mt-3 space-y-2.5">
                  {languages.map((language) => (
                    <li
                      key={language.name}
                      className="flex items-baseline justify-between border-b border-white/[0.07] pb-2.5 text-[12.5px] text-bone-dim"
                    >
                      <span>{language.name}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-bone-muted">
                        {language.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal className="lg:sticky lg:top-32" y={30}>
              <div className="card-surface relative overflow-hidden rounded-[2px] p-5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-ink-900">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(124,107,255,0.28),transparent_60%),radial-gradient(ellipse_at_75%_80%,rgba(0,212,255,0.12),transparent_55%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70" />
                  <div className="absolute inset-6 rounded-full border border-white/10" />
                  <div className="absolute inset-12 rounded-full border border-white/[0.06]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                    <span className="display text-[clamp(4rem,10vw,6rem)] text-bone/90">ST</span>
                    <span className="mt-3 text-[13px] font-medium tracking-tight text-bone">
                      Siva Thangaraj
                    </span>
                    <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.32em] text-bone-muted">
                      Frontend Engineer
                    </span>
                  </div>
                  <span className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.2em] text-bone-muted">
                    13.0827° N
                  </span>
                  <span className="absolute bottom-5 right-5 font-mono text-[9px] uppercase tracking-[0.2em] text-bone-muted">
                    80.2707° E
                  </span>
                  <span className="absolute bottom-5 left-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-bone-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-glow blink-dot" />
                    Chennai
                  </span>
                </div>

                <dl className="mt-5 space-y-3">
                  <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-3">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-muted">
                      Based in
                    </dt>
                    <dd className="text-[12.5px] text-bone-dim">Chennai, India</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-3">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-muted">
                      Experience
                    </dt>
                    <dd className="text-[12.5px] text-bone-dim">4.5+ years</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-muted">
                      Focus
                    </dt>
                    <dd className="text-right text-[12.5px] text-bone-dim">
                      Frontend architecture
                    </dd>
                  </div>
                </dl>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group mt-5 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4 text-[12px] text-bone-dim transition-colors duration-300 hover:text-bone"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  )
}
