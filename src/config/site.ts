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
  capabilities: [
    {
      title: 'Product Engineering',
      description:
        'I design and build complete products — from concept to production — with a focus on usability, performance, and maintainability.',
    },
    {
      title: 'System Architecture',
      description:
        'I design scalable, maintainable architectures that support real-world product growth and operational complexity.',
    },
    {
      title: 'AI & Automation',
      description:
        'I build AI-powered tools and automation systems that turn complex workflows into reliable, repeatable processes.',
    },
    {
      title: 'Performance & Scalability',
      description:
        'I optimize systems for speed, efficiency, and the ability to scale without rewriting from scratch.',
    },
    {
      title: 'Security & Reliability',
      description:
        'I build systems that are safe, predictable, and resilient — not just functional.',
    },
    {
      title: 'Designer & Stakeholder Collaboration',
      description:
        'I work closely with designers and stakeholders to translate ideas into real, working software.',
    },
  ],
} as const
