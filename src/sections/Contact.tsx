import { useState } from 'react'
import { profile } from '@/data/profile'
import { LocalTime } from '@/components/LocalTime'
import { Reveal } from '@/components/Reveal'
import { ArrowUpRight } from '@/components/Icons'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="section sheet sheet-dark contact">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">
            <span className="eyebrow-rule" />
            05 — Contact
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="contact-title display">
            Let’s build something
            <br />
            <span className="serif-accent">that holds up.</span>
          </h2>
        </Reveal>

        <div className="contact-grid">
          <Reveal delay={0.1}>
            <p className="contact-lede">
              I’m open to ambitious frontend work — enterprise products, design systems, or a team
              that cares about the last 10%.
            </p>
            <button type="button" className="contact-email" onClick={copyEmail}>
              {profile.email}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <div className="contact-actions">
              <a className="btn btn-solid" href={`mailto:${profile.email}`}>
                Email me <ArrowUpRight />
              </a>
              <a
                className="btn btn-ghost"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <ArrowUpRight />
              </a>
              <a
                className="btn btn-ghost"
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
              >
                Résumé <ArrowUpRight />
              </a>
            </div>
          </Reveal>

          <Reveal className="contact-meta" delay={0.15}>
            <div>
              <span className="label">Phone</span>
              <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
            </div>
            <div>
              <span className="label">Location</span>
              <p>
                Chennai, India — <LocalTime />
              </p>
            </div>
            <div>
              <span className="label">Availability</span>
              <p>
                <span className="dot" />
                Open to frontend roles & select freelance
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="contact-note">No forms. No funnels. Just a direct line.</p>
        </Reveal>
      </div>
    </section>
  )
}
