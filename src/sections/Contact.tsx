import { ArrowUpRight, Download, Mail, MapPin, Phone } from 'lucide-react'
import { AnimatedText } from '@/components/AnimatedText'
import { MagneticButton } from '@/components/MagneticButton'
import { Reveal } from '@/components/Reveal'
import { profile } from '@/data/profile'

const openings = ['Frontend Engineer roles', 'Frontend architecture', 'Angular / React systems']

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.06] pb-16 pt-24 sm:pb-24 sm:pt-32"
      aria-labelledby="contact-heading"
    >
      <div className="hero-aurora pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04] sm:h-[42rem] sm:w-[42rem]"
        aria-hidden="true"
      >
        <div className="absolute inset-16 rounded-full border border-white/[0.04]" />
        <div className="absolute inset-32 rounded-full border border-accent/[0.08]" />
      </div>

      <div className="shell relative z-10">
        <Reveal className="flex items-center justify-center gap-4" y={18}>
          <span className="font-mono text-[11px] tracking-[0.24em] text-accent-soft">06</span>
          <span className="h-px w-10 bg-white/20" aria-hidden="true" />
          <span className="eyebrow">Contact</span>
        </Reveal>

        <h2
          id="contact-heading"
          className="display mx-auto mt-8 max-w-5xl text-center text-[clamp(2.8rem,9vw,8rem)] text-bone"
        >
          <span className="block">
            <AnimatedText text="Have something" by="word" scroll stagger={0.05} />
          </span>
          <span className="block">
            <span className="serif-italic text-accent-soft">
              <AnimatedText text="ambitious" by="char" scroll stagger={0.03} delay={0.1} />
            </span>
            <AnimatedText text=" in mind?" by="word" scroll stagger={0.05} delay={0.2} />
          </span>
        </h2>

        <Reveal delay={0.15} className="mx-auto mt-8 max-w-md text-center">
          <p className="text-[14px] leading-relaxed text-bone-muted sm:text-[15px]">
            I'm open to frontend engineering roles and collaborations where architecture,
            accessibility and craft all matter. The fastest way to reach me is email or LinkedIn.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticButton href={`mailto:${profile.email}`} ariaLabel="Email Siva Thangaraj">
            <span>Email me</span>
            <Mail size={15} aria-hidden="true" />
          </MagneticButton>
          <MagneticButton
            href={profile.resume}
            download
            variant="ghost"
            ariaLabel="Download résumé (PDF)"
          >
            <span>Download résumé</span>
            <Download size={14} aria-hidden="true" />
          </MagneticButton>
        </Reveal>

        <Reveal delay={0.25} className="mx-auto mt-12 max-w-xl">
          <a
            href={`mailto:${profile.email}`}
            className="group flex flex-col items-center justify-center gap-2 border-y border-white/[0.08] py-5"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-bone-muted">
              Email
            </span>
            <span className="flex items-center gap-2 text-[clamp(0.9rem,2.6vw,1.25rem)] text-bone transition-colors duration-300 group-hover:text-accent-soft">
              {profile.email}
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </a>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-1.5 text-[12.5px] text-bone-dim transition-colors duration-300 hover:text-bone"
            >
              linkedin.com/in/siva-thangaraj-fe
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={`tel:${profile.phoneHref}`}
              className="flex items-center gap-1.5 text-[12.5px] text-bone-dim transition-colors duration-300 hover:text-bone"
            >
              <Phone size={12} aria-hidden="true" />
              {profile.phone}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.3} className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-glow blink-dot" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-muted">
              Available for select opportunities
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {openings.map((item) => (
              <span
                key={item}
                className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-bone-muted"
              >
                <span className="h-1 w-1 rounded-full bg-accent/60" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>

          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-bone-muted">
            <MapPin size={11} aria-hidden="true" /> Chennai, India
          </span>
        </Reveal>
      </div>
    </section>
  )
}
