import { experiences } from '@/data/experience'
import { education, languages, domains } from '@/data/education'
import { Reveal } from '@/components/Reveal'

export function Experience() {
  return (
    <section id="experience" className="section sheet sheet-dark">
      <div className="shell">
        <div className="split-head">
          <div className="split-left">
            <Reveal>
              <p className="eyebrow">
                <span className="eyebrow-rule" />
                03 — Experience
              </p>
              <h2 className="section-title">
                Built in <span className="serif-accent">production.</span>
              </h2>
              <p className="section-intro">
                Roles where I owned frontend architecture, delivery and the quality of the last
                mile.
              </p>
              <div className="experience-figure">
                <span>4.5+</span>
                <span>years in production frontends</span>
              </div>
            </Reveal>
          </div>

          <div className="roles">
            {experiences.map((experience, index) => (
              <Reveal key={experience.id} className="role" delay={index * 0.06}>
                <div className="role-top">
                  <span className="role-period">{experience.period}</span>
                  {experience.current ? (
                    <span className="role-current">
                      <span className="dot" />
                      Current
                    </span>
                  ) : null}
                </div>
                <h3 className="role-company">
                  {experience.company}
                  {experience.via ? (
                    <span className="role-via"> via {experience.via}</span>
                  ) : null}
                </h3>
                <p className="role-title">{experience.role}</p>
                <p className="role-summary">{experience.summary}</p>
                <ul className="role-highlights">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <p className="role-stack">{experience.stack.join(' · ')}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="background">
          <div>
            <span className="label">Education</span>
            <p>
              {education.degree}
              <br />
              {education.institution} · {education.period}
            </p>
            <p className="muted">{education.grade}</p>
          </div>
          <div>
            <span className="label">Languages</span>
            <p>{languages.map((language) => `${language.name} (${language.level})`).join(' · ')}</p>
          </div>
          <div>
            <span className="label">Domains</span>
            <p>{domains.join(' · ')}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
