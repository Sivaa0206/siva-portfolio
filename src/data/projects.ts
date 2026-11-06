export type ProjectVariant = 'banking' | 'agent' | 'micro' | 'commerce'

export interface Project {
  id: string
  index: string
  title: string
  category: string
  context: string
  year: string
  overview: string
  challenge: string
  contribution: string[]
  stack: string[]
  variant: ProjectVariant
  accent: string
}

export const projects: Project[] = [
  {
    id: 'banking-onboarding',
    index: '01',
    title: 'Bank Onboarding Journeys',
    category: 'Enterprise Banking Applications',
    context: 'Constient Global Solutions',
    year: '2023 — 2025',
    overview:
      'Secure, multi-step onboarding flows for SBI and Axis Bank, covering identity, KYC and document signing — handling 3,000+ monthly banking transactions with zero reported security incidents.',
    challenge:
      'Multi-step regulated workflows demanded conditional routing, dynamic validation and encrypted payloads without compromising the experience or accessibility of the form flow.',
    contribution: [
      'Built Reactive Forms-based onboarding steps with dynamic validation.',
      'Implemented conditional routing across the journey.',
      'Applied Crypto.ts-based payload encryption for submitted data.',
      'Integrated DigiLocker and eSign for KYC verification and document signing.',
      'Implemented SSO and token lifecycle management.',
    ],
    stack: ['Angular', 'React', 'TypeScript', 'Reactive Forms', 'RxJS', 'SSO', 'DigiLocker', 'eSign'],
    variant: 'banking',
    accent: '#00d4ff',
  },
  {
    id: 'ai-agent-studio',
    index: '02',
    title: 'AI Agent Studio',
    category: 'AI Agent Studio',
    context: 'Freshworks via Adixoo Brand',
    year: '2025 — Present',
    overview:
      'Frontend contributions to an enterprise AI agent authoring experience, delivered through independently deployable Web Components micro-frontend modules.',
    challenge:
      'Feature domains needed to evolve and deploy independently while presenting a single, coherent product surface to the user.',
    contribution: [
      'Designed Web Components-based micro-frontend modules.',
      'Delivered a React + TypeScript modernization initiative for AI Agent Studio.',
      'Strengthened code quality with Jest and Playwright testing enforced by SonarQube quality gates.',
      'Contributed to frontend architecture decisions.',
      'Collaborated with product managers, designers and QA teams.',
    ],
    stack: ['React', 'Angular', 'TypeScript', 'Web Components', 'Micro-Frontends', 'Jest', 'Playwright'],
    variant: 'agent',
    accent: '#a99bff',
  },
  {
    id: 'micro-frontend-platform',
    index: '03',
    title: 'Micro-Frontend Platform',
    category: 'Micro-Frontend Architecture',
    context: 'Freshworks via Adixoo Brand',
    year: '2025 — Present',
    overview:
      'A modular frontend foundation enabling independent deployments across 5+ feature domains, with shared conventions and review standards.',
    challenge:
      'Independent deployment is only useful when consistency survives it. The platform needed clear boundaries, shared standards and a review culture around them.',
    contribution: [
      'Designed Web Components-based module boundaries.',
      'Enabled independent deployments across 5+ feature domains.',
      'Established frontend engineering standards.',
      'Designed a TanStack Query caching strategy that reduced unnecessary network requests.',
      'Conducted code reviews across teams.',
    ],
    stack: ['Web Components', 'Micro-Frontends', 'React', 'Angular', 'TypeScript', 'TanStack Query', 'CI/CD'],
    variant: 'micro',
    accent: '#7c6bff',
  },
  {
    id: 'gift-card-commerce',
    index: '04',
    title: 'RewardKart & VoucherKart',
    category: 'E-commerce Gift Card Applications',
    context: 'Constient Global Solutions',
    year: '2023 — 2025',
    overview:
      'E-commerce gift card purchasing flows for RewardKart and VoucherKart, with PayU payment gateway integration and resilient transaction handling.',
    challenge:
      'Payment journeys have no room for ambiguous states — the frontend must handle redirects, failures and confirmations clearly for the user.',
    contribution: [
      'Integrated the PayU payment gateway across RewardKart and VoucherKart.',
      'Built the frontend flow around payment initiation and confirmation.',
      'Implemented token lifecycle management alongside SSO.',
      'Documented application behaviour using EARS specifications.',
    ],
    stack: ['Angular', 'React', 'TypeScript', 'PayU', 'REST APIs', 'RxJS'],
    variant: 'commerce',
    accent: '#ff8a5c',
  },
]
