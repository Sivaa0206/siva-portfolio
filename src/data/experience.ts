export interface Experience {
  id: string
  company: string
  via?: string
  role: string
  start: string
  end: string
  period: string
  summary: string
  highlights: string[]
  stack: string[]
  current?: boolean
}

export const experiences: Experience[] = [
  {
    id: 'freshworks',
    company: 'Freshworks',
    via: 'Adixoo Brand Pvt Ltd',
    role: 'Software Engineer',
    start: 'Aug 2025',
    end: 'Present',
    period: '2025 — Present',
    current: true,
    summary:
      'Building platform-level frontend foundations with Web Components and micro-frontends across React and Angular enterprise applications.',
    highlights: [
      'Designed Web Components-based micro-frontend modules enabling independent deployments across 5+ feature domains.',
      'Contributed to frontend architecture decisions, promoting reusable patterns and long-term maintainability.',
      'Conducted code reviews and established frontend engineering standards across teams.',
      'Drove React and TypeScript modernization across enterprise applications, improving type safety and maintainability.',
      'Resolved complex production issues across enterprise modules.',
      'Collaborated with product managers, designers and QA to deliver features through Agile practices.',
    ],
    stack: ['React', 'Angular', 'TypeScript', 'Web Components', 'Micro-Frontends', 'TanStack Query'],
  },
  {
    id: 'constient',
    company: 'Constient Global Solutions',
    role: 'Frontend Developer',
    start: 'Jul 2023',
    end: 'Aug 2025',
    period: '2023 — 2025',
    summary:
      'Owned complex onboarding, banking and payment journeys — where validation, security and compliance meet user experience.',
    highlights: [
      'Developed digital banking onboarding for SBI and Axis Bank using Angular and React.',
      'Built multi-step onboarding workflows using Reactive Forms, dynamic validation and conditional routing.',
      'Implemented Crypto.ts-based payload encryption, securing 3,000+ monthly transactions with zero reported security incidents.',
      'Integrated DigiLocker and eSign for digital identity verification and document signing.',
      'Implemented SSO and token lifecycle management to strengthen authentication flows.',
      'Integrated the PayU payment gateway across RewardKart and VoucherKart.',
      'Created EARS-based application specifications and participated in code reviews.',
    ],
    stack: ['Angular', 'React', 'TypeScript', 'RxJS', 'Reactive Forms', 'SSO', 'PayU'],
  },
  {
    id: 'yamee',
    company: 'Yamee Cluster Pvt Ltd',
    role: 'Frontend Developer',
    start: 'May 2022',
    end: 'Jul 2023',
    period: '2022 — 2023',
    summary:
      'The foundation years — shipping responsive product interfaces with reusable systems and performance-minded delivery.',
    highlights: [
      'Delivered responsive, component-driven Angular applications with lazy loading and code splitting.',
      'Developed and maintained reusable Angular component libraries.',
      'Integrated REST APIs with backend developers for dynamic, data-driven interfaces.',
      'Tested cross-browser compatibility across Chrome, Firefox and Edge.',
    ],
    stack: ['Angular', 'React', 'TypeScript', 'HTML5', 'CSS3', 'Bootstrap', 'REST APIs'],
  },
]
