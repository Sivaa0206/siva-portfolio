import { profile } from '@/data/profile'
import { LocalTime } from '@/components/LocalTime'
import { ArrowUpRight } from '@/components/Icons'
import { scrollToSection } from '@/lib/scroll'

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-frame">
        <span className="hero-ghost" aria-hidden="true">
          SIVA
        </span>

        <div className="hero-top hero-fade" style={{ animationDelay: '0.3s' }}>
          <p className="eyebrow">
            <span className="eyebrow-rule" />
            Frontend Engineer — Chennai, India
          </p>
          <p className="hero-status">
            <span className="dot" />
            {profile.availability}
          </p>
        </div>

        <div className="hero-main">
          <h1 className="hero-title display">
            <span className="hero-line">
              <span>{profile.hero.lineOne}</span>
            </span>
            <span className="hero-line">
              <span>{profile.hero.lineTwo}</span>
            </span>
            <span className="hero-line">
              <span className="serif-accent hero-em">{profile.hero.lineThree}</span>
            </span>
          </h1>

          <div className="hero-side hero-fade" style={{ animationDelay: '0.55s' }}>
            <p className="hero-intro">{profile.hero.intro}</p>
            <div className="hero-actions">
              <a
                className="btn btn-solid"
                href="#work"
                onClick={(event) => {
                  event.preventDefault()
                  scrollToSection('work')
                }}
              >
                See the work <ArrowUpRight />
              </a>
              <a
                className="btn btn-ghost"
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
              >
                Résumé
              </a>
            </div>
          </div>
        </div>

        <div className="hero-meta hero-fade" style={{ animationDelay: '0.7s' }}>
          <div>
            <span className="label">Currently</span>
            <p>
              Software Engineer, Freshworks <span className="muted">via Adixoo</span>
            </p>
          </div>
          <div>
            <span className="label">Focus</span>
            <p>Angular · React · TypeScript · Micro-frontends</p>
          </div>
          <div>
            <span className="label">Local time</span>
            <p>
              <LocalTime />
            </p>
          </div>
        </div>

        <div className="hero-foot hero-fade" style={{ animationDelay: '0.82s' }}>
          <dl className="hero-stats">
            {profile.stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
          <p className="hero-clients">
            <span className="label">Selected work with</span>
            <br />
            {profile.clients.join(' · ')}
          </p>
        </div>
      </div>
    </section>
  )
}
