import { useState } from 'react'
import { projects } from '@/data/projects'
import { profile } from '@/data/profile'
import { Reveal } from '@/components/Reveal'
import { ArrowUpRight, Plus } from '@/components/Icons'

export function Work() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section id="work" className="section sheet sheet-light">
      <div className="shell">
        <Reveal className="section-head two-col">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-rule" />
              02 — Selected systems
            </p>
            <h2 className="section-title">
              Selected <span className="serif-accent">systems.</span>
            </h2>
          </div>
          <p className="section-intro">
            Four products I've helped ship — banking journeys, an AI agent studio, a
            micro-frontend platform and payment flows. Open a row for the case notes.
          </p>
        </Reveal>

        <div className="work-list">
          {projects.map((project, index) => {
            const isOpen = open === project.id

            return (
              <Reveal key={project.id} delay={index * 0.04}>
                <article className="work-row" data-open={isOpen}>
                  <button
                    type="button"
                    className="work-head"
                    aria-expanded={isOpen}
                    aria-controls={`panel-${project.id}`}
                    onClick={() => setOpen(isOpen ? null : project.id)}
                  >
                    <span className="work-index">{project.index}</span>
                    <span className="work-main">
                      <span className="work-title">{project.title}</span>
                      <span className="work-cat">
                        {project.category} · {project.context}
                      </span>
                      <span className="work-overview">{project.overview}</span>
                    </span>
                    <span className="work-year">{project.year}</span>
                    <span className="work-toggle" aria-hidden="true">
                      <Plus />
                    </span>
                  </button>

                  <div
                    id={`panel-${project.id}`}
                    className="project-panel"
                    data-open={isOpen}
                    role="region"
                    aria-label={`${project.title} case notes`}
                    aria-hidden={!isOpen}
                  >
                    <div>
                      <div className="work-detail">
                        <div>
                          <h4 className="label">Challenge</h4>
                          <p>{project.challenge}</p>
                        </div>
                        <div>
                          <h4 className="label">Contribution</h4>
                          <ul>
                            {project.contribution.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="work-stack">
                        <span className="label">Stack</span>
                        <p>{project.stack.join(' · ')}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="work-foot">
          <span>More detail lives in the résumé.</span>
          <a href={profile.resume} target="_blank" rel="noreferrer">
            Open résumé <ArrowUpRight />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
