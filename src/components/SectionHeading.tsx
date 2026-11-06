import { AnimatedText } from './AnimatedText'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  id?: string
  index: string
  label: string
  title: string
  accent?: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  id,
  index,
  label,
  title,
  accent,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} ${className}`}>
      <Reveal className="mb-6 flex items-center gap-4 sm:mb-8" y={20}>
        <span className="font-mono text-[11px] tracking-[0.24em] text-accent-soft">{index}</span>
        <span className="h-px w-10 bg-white/20" aria-hidden="true" />
        <span className="eyebrow">{label}</span>
      </Reveal>

      <h2 id={id} className="display text-[clamp(2.6rem,7.4vw,6.6rem)] text-bone">
        <AnimatedText text={title} as="span" by="word" scroll stagger={0.05} />
        {accent ? (
          <span className="serif-italic ml-[0.12em] inline-block text-bone-dim">
            <AnimatedText text={accent} as="span" by="word" scroll stagger={0.05} delay={0.12} />
          </span>
        ) : null}
      </h2>

      {description ? (
        <Reveal
          delay={0.15}
          className={`mt-6 max-w-xl text-[15px] leading-relaxed text-bone-muted sm:text-base ${
            centered ? 'mx-auto' : ''
          }`}
        >
          <p>{description}</p>
        </Reveal>
      ) : null}
    </div>
  )
}
