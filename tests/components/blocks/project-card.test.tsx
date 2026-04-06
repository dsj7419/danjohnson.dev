import { render, screen } from '@testing-library/react'

import { ProjectCard } from '@/components/blocks/project-card'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('ProjectCard', () => {
  const props = {
    title: 'Austin Eischeid Site',
    description: 'A designer portfolio built as a technical collaboration.',
    slug: 'austin-eischeid',
    tags: ['architecture', 'performance'],
    role: 'Lead Engineer',
  }

  it('renders the title', () => {
    render(<ProjectCard {...props} />)
    expect(screen.getByText('Austin Eischeid Site')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<ProjectCard {...props} />)
    expect(screen.getByText(/designer portfolio/)).toBeInTheDocument()
  })

  it('links to the case study page', () => {
    render(<ProjectCard {...props} />)
    const link = screen.getByText('Austin Eischeid Site').closest('a')
    expect(link).toHaveAttribute('href', '/work/austin-eischeid')
  })

  it('renders tags', () => {
    render(<ProjectCard {...props} />)
    expect(screen.getByText('architecture')).toBeInTheDocument()
    expect(screen.getByText('performance')).toBeInTheDocument()
  })

  it('renders the role', () => {
    render(<ProjectCard {...props} />)
    expect(screen.getByText('Lead Engineer')).toBeInTheDocument()
  })
})
