export const siteConfig = {
  name: 'Dan Johnson',
  title: 'Dan Johnson — Product Engineer & Systems Architect',
  description:
    'I design and build complex, high-reliability software systems, AI-enabled products, and performance-critical applications.',
  url: process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://danjohnson.dev',
  social: {
    github: 'https://github.com/dsj7419',
    linkedin: 'https://linkedin.com/in/danjohnsondev',
  },
  nav: [
    { label: 'Work', href: '/work' },
    { label: 'How I Build', href: '/how-i-build' },
    { label: 'Writing', href: '/writing' },
    { label: 'About', href: '/about' },
    { label: 'Work With Me', href: '/work-with-me' },
  ],
} as const
