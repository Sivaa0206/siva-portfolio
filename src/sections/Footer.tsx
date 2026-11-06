import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { profile } from '@/data/profile'
import { scrollToTop } from '@/lib/scroll'
import { Reveal } from '@/components/Reveal'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.07]">
      <div className="shell py-8 sm:py-10">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between" y={24}>
          <div>
            <p className="display text-[clamp(2.2rem,6vw,4rem)] text-bone">
              Siva Thangaraj<span className="text-accent-soft">.</span>
            </p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.24em] text-bone-muted">
              Frontend Engineer — Chennai, India
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-12">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-bone-muted">
                Elsewhere
              </span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-1.5 text-[12.5px] text-bone-dim transition-colors duration-300 hover:text-bone"
              >
                LinkedIn
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="text-[12.5px] text-bone-dim transition-colors duration-300 hover:text-bone"
              >
                {profile.email}
              </a>
              <a
                href={profile.resume}
                download
                className="text-[12.5px] text-bone-dim transition-colors duration-300 hover:text-bone"
              >
                Download résumé
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="group flex w-fit items-center gap-3 rounded-full border border-white/12 px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-bone-dim transition-colors duration-300 hover:border-accent/60 hover:text-bone"
              aria-label="Back to top"
            >
              Back to top
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.06] transition-transform duration-300 group-hover:-translate-y-0.5">
                <ArrowUp size={13} aria-hidden="true" />
              </span>
            </button>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone-muted">
            © {year} Siva Thangaraj. All rights reserved.
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone-muted">
            Designed & built with React, TypeScript & GSAP
          </p>
        </div>
      </div>
    </footer>
  )
}
