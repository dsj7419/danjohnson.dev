// @vitest-environment node
import { readFileSync } from 'node:fs'
import path from 'node:path'

import { contrastRatio, readThemes, resolveToken } from '../helpers/contrast'

const css = readFileSync(path.resolve(__dirname, '../../src/styles/globals.css'), 'utf8')
const themes = readThemes(css)

/** WCAG 2.1 1.4.3 for text under 18.66px bold / 24px regular, which is every size this site uses. */
const AA_TEXT = 4.5
/** WCAG 2.1 1.4.11 for the boundary of a control against its surroundings. */
const AA_UI = 3

/** Every (foreground, background) token pairing that components actually render as text. */
const TEXT_PAIRS: [fg: string, bg: string, where: string][] = [
  ['--color-text', '--color-bg', 'body copy'],
  ['--color-text', '--color-bg-alt', 'body copy on alt sections'],
  ['--color-text', '--color-bg-elevated', 'card copy'],
  ['--color-text-muted', '--color-bg', 'muted copy'],
  ['--color-text-muted', '--color-bg-alt', 'muted copy on alt sections'],
  ['--color-text-muted', '--color-bg-elevated', 'card descriptions'],
  ['--color-text-faint', '--color-bg', 'eyebrows and meta'],
  ['--color-text-faint', '--color-bg-alt', 'tag chips on alt'],
  ['--color-text-faint', '--color-bg-elevated', 'tag chips on cards'],
  ['--color-accent-500', '--color-bg', 'links and active nav'],
  ['--color-accent-500', '--color-bg-alt', 'links inside alt sections (success state, View all)'],
  ['--color-accent-600', '--color-bg', 'link hover'],
  ['--color-accent-600', '--color-bg-alt', 'link hover on alt sections'],
  ['--color-on-accent', '--color-accent-500', 'primary button label'],
  ['--color-on-accent', '--color-accent-600', 'primary button label on hover'],
  ['--color-danger', '--color-bg', 'form error text'],
  ['--color-danger', '--color-bg-alt', 'form error text inside the alt-background form'],
  ['--color-code-text', '--color-code-bg', 'inline code'],
]

const UI_PAIRS: [fg: string, bg: string, where: string][] = [
  ['--color-border-input', '--color-bg', 'text field border on the page background'],
  ['--color-border-input', '--color-bg-alt', 'text field border inside the alt-background form'],
  ['--color-danger', '--color-bg-alt', 'error border on a text field'],
  ['--color-accent-500', '--color-bg', 'focus ring'],
]

describe('contrast helper', () => {
  it('reproduces the reference extremes', () => {
    expect(contrastRatio('oklch(1 0 0)', 'oklch(0 0 0)')).toBeCloseTo(21, 0)
    expect(contrastRatio('oklch(0.5 0 0)', 'oklch(0.5 0 0)')).toBe(1)
  })

  it('reproduces the audit figure for white on the dark accent (3.22:1)', () => {
    expect(contrastRatio('oklch(1 0 0)', 'oklch(0.65 0.14 250)')).toBeCloseTo(3.22, 1)
  })
})

describe.each([
  ['light', themes.light],
  ['dark', themes.dark],
] as const)('%s theme tokens', (_name, tokens) => {
  it.each(TEXT_PAIRS)('%s on %s meets AA for text (%s)', (fg, bg) => {
    const ratio = contrastRatio(resolveToken(tokens, fg), resolveToken(tokens, bg))
    expect(ratio, `${fg} on ${bg} = ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(AA_TEXT)
  })

  it.each(UI_PAIRS)('%s against %s meets AA for UI boundaries (%s)', (fg, bg) => {
    const ratio = contrastRatio(resolveToken(tokens, fg), resolveToken(tokens, bg))
    expect(ratio, `${fg} on ${bg} = ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(AA_UI)
  })
})

describe('dark theme hover direction', () => {
  it('lightens link hover instead of darkening it against the dark background', () => {
    const base = contrastRatio(
      resolveToken(themes.dark, '--color-accent-500'),
      resolveToken(themes.dark, '--color-bg'),
    )
    const hover = contrastRatio(
      resolveToken(themes.dark, '--color-accent-600'),
      resolveToken(themes.dark, '--color-bg'),
    )
    expect(hover).toBeGreaterThanOrEqual(base)
  })
})
