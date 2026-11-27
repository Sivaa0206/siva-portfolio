import { WordFill } from '@/components/WordFill'
import { Reveal } from '@/components/Reveal'

const statement =
  'Enterprise software is where design meets consequence. A KYC step, a payment, a migration — these are not screens. They are decisions people have to trust. I build interfaces that carry that weight quietly: fast under load, accessible by default, and predictable when things go wrong. The work is mostly invisible. A form that never traps you. A state that always makes sense. A system that holds when the stakes are real.'

const principles = [
  {
    title: 'Clarity over cleverness',
    body: 'The best interaction is the one nobody has to think about. I remove friction before I add polish.',
  },
  {
    title: 'Accessible by default',
    body: 'Keyboard paths, ARIA and contrast are part of the build, not a patch applied at the end.',
  },
  {
    title: 'Performance is a feature',
    body: 'Fast is a design decision. I treat bundle size, rendering and network cost like interface decisions.',
  },
]

export function Manifesto() {
  return (
    <section id="approach" className="section sheet sheet-dark">
      <div className="shell">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="eyebrow-rule" />
            01 — Approach
          </p>
        </Reveal>

        <WordFill text={statement} className="manifesto" />

        <div className="manifesto-foot">
          <Reveal>
            <p className="manifesto-sub">
              No decoration for its own sake. Just the shortest honest path between a person and
              what they came to do.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="manifesto-sign">
              — Siva Thangaraj
              <br />
              <span className="muted">Frontend Engineer, Chennai</span>
            </p>
          </Reveal>
        </div>

        <div className="principles">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} className="principle" delay={index * 0.08}>
              <span className="label">{String(index + 1).padStart(2, '0')}</span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
