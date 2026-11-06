export interface SkillGroup {
  id: string
  index: string
  title: string
  caption: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    index: '01',
    title: 'Frontend Engineering',
    caption: 'The everyday craft — interfaces that are fast, semantic and precise.',
    skills: [
      'Angular 2+',
      'React',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Bootstrap',
      'Reactive Forms',
    ],
  },
  {
    id: 'state',
    index: '02',
    title: 'State & Data Fetching',
    caption: 'Predictable data flow across complex, long-lived application journeys.',
    skills: ['Zustand', 'RxJS', 'Context API', 'TanStack Query', 'REST APIs', 'HTTP Interceptors'],
  },
  {
    id: 'architecture',
    index: '03',
    title: 'Architecture & Integration',
    caption: 'Systems designed to scale across teams, domains and deployments.',
    skills: [
      'Micro-Frontends',
      'Web Components',
      'SSO & Token Lifecycle',
      'API Integration',
      'DigiLocker',
      'eSign',
      'PayU',
    ],
  },
  {
    id: 'quality',
    index: '04',
    title: 'Testing & Quality',
    caption: 'Shipping with confidence — tested, reviewed, accessible and measurable.',
    skills: [
      'Jest',
      'Playwright',
      'SonarQube',
      'Unit Testing',
      'Integration Testing',
      'WCAG 2.1',
      'ARIA Patterns',
      'Keyboard Navigation',
      'axe DevTools',
      'Cross-Browser Compatibility',
    ],
  },
  {
    id: 'delivery',
    index: '05',
    title: 'Tools & Delivery',
    caption: 'How the work gets specified, reviewed and shipped to production.',
    skills: [
      'GitHub',
      'Jenkins CI/CD',
      'Postman',
      'Cursor AI',
      'Spec-Driven Development (SDD)',
      'EARS Notation',
      'Agile / Scrum',
    ],
  },
]
