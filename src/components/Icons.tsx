type IconProps = {
  className?: string
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowUp({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 10V2M2.5 5.5 6 2l3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Plus({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}
