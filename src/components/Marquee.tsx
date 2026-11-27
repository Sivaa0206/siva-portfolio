const items = [
  'Angular 2+',
  'React',
  'TypeScript',
  'Micro-Frontends',
  'Web Components',
  'Accessibility',
  'TanStack Query',
  'RxJS',
  'Jest',
  'Playwright',
]

export function Marquee() {
  const row = [...items, ...items]

  return (
    <div className="marquee-band" aria-hidden="true">
      <div className="marquee-track">
        {row.map((item, index) => (
          <span className="marquee-item" key={`${item}-${index}`}>
            {item}
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
