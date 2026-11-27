import { skillGroups } from '@/data/skills'
import { Reveal } from '@/components/Reveal'

export function Capabilities() {
  return (
    <section id="capabilities" className="section sheet sheet-light">
      <div className="shell">
        <Reveal className="section-head two-col">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-rule" />
              04 — Capabilities
            </p>
            <h2 className="section-title">
              The toolkit, <span className="serif-accent">by problem.</span>
            </h2>
          </div>
          <p className="section-intro">
            Grouped by the work they solve, not by how many logos I can list.
          </p>
        </Reveal>

        <div className="cap-list">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} className="cap-row" delay={index * 0.04}>
              <span className="cap-index">{group.index}</span>
              <div className="cap-main">
                <h3>{group.title}</h3>
                <p>{group.caption}</p>
              </div>
              <p className="cap-skills">{group.skills.join(' · ')}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
