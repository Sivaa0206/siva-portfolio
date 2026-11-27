export const profile = {
  name: 'Siva Thangaraj',
  fullName: 'Siva Thangaraj',
  role: 'Frontend Engineer',
  focus: 'Angular & React · Enterprise SaaS & FinTech',
  location: 'Chennai, India',
  experience: '4.5+ Years',
  availability: 'Open to ambitious frontend work',
  email: 'siva.frontenddev@gmail.com',
  phone: '+91 83446 36004',
  phoneHref: '+918344636004',
  linkedin: 'https://linkedin.com/in/siva-thangaraj-fe',
  github: null as string | null,
  resume: `${import.meta.env.BASE_URL}Siva-Thangaraj-Resume.html`,
  hero: {
    lineOne: 'Complex systems,',
    lineTwo: 'made to feel',
    lineThree: 'simple.',
    intro:
      "I'm Siva Thangaraj — a frontend engineer in Chennai building secure banking, payments and enterprise SaaS interfaces with Angular, React and TypeScript.",
  },
  stats: [
    { value: '4.5+', label: 'Years shipping production frontends' },
    { value: '3,000+', label: 'Monthly banking transactions secured' },
    { value: '5+', label: 'Feature domains deployed independently' },
    { value: '0', label: 'Reported security incidents' },
  ],
  clients: ['SBI', 'Axis Bank', 'Freshworks', 'RewardKart'],
  disciplines: ['Angular 2+', 'React', 'TypeScript', 'Micro-Frontends', 'Accessibility', 'TanStack Query'],
}

export const socials = [
  { label: 'LinkedIn', href: profile.linkedin, handle: 'siva-thangaraj-fe' },
  { label: 'Email', href: `mailto:${profile.email}`, handle: profile.email },
]
