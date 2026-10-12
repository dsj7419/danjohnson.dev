/**
 * oklch → WCAG 2.x contrast, for asserting the design tokens in tests.
 * Conversion follows Björn Ottosson's reference OKLab matrices; luminance follows WCAG 2.1 §1.4.3.
 */

export type Rgb = { r: number; g: number; b: number }

const OKLCH = /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/

export function parseOklch(value: string): { l: number; c: number; h: number } {
  const match = OKLCH.exec(value.trim())
  if (!match) throw new Error(`Not an oklch() literal: ${value}`)
  const [, l, c, h] = match
  return { l: Number(l), c: Number(c), h: Number(h) }
}

/** Linear-light sRGB components, clipped to the display gamut. */
export function oklchToLinearSrgb(value: string): Rgb {
  const { l, c, h } = parseOklch(value)
  const hr = (h * Math.PI) / 180
  const a = c * Math.cos(hr)
  const b = c * Math.sin(hr)

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.291485548 * b

  const l3 = l_ ** 3
  const m3 = m_ ** 3
  const s3 = s_ ** 3

  const clip = (x: number) => Math.min(1, Math.max(0, x))
  return {
    r: clip(4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3),
    g: clip(-1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3),
    b: clip(-0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3),
  }
}

export function relativeLuminance({ r, g, b }: Rgb): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrastRatio(foreground: string, background: string): number {
  const lf = relativeLuminance(oklchToLinearSrgb(foreground))
  const lb = relativeLuminance(oklchToLinearSrgb(background))
  const [hi, lo] = lf > lb ? [lf, lb] : [lb, lf]
  return (hi + 0.05) / (lo + 0.05)
}

type TokenMap = Record<string, string>

function readBlock(css: string, selector: string): TokenMap {
  const start = css.indexOf(`${selector} {`)
  if (start === -1) throw new Error(`No "${selector}" block in stylesheet`)
  const end = css.indexOf('\n}', start)
  const body = css.slice(start, end)
  const tokens: TokenMap = {}
  for (const line of body.split('\n')) {
    const m = /^\s*(--[\w-]+):\s*([^;]+);/.exec(line)
    if (m?.[1] && m[2]) tokens[m[1]] = m[2].trim()
  }
  return tokens
}

/** Resolved token maps for both themes: `@theme` + `:root`, and the same with `.dark` overrides. */
export function readThemes(css: string): { light: TokenMap; dark: TokenMap } {
  const theme = readBlock(css, '@theme')
  const root = readBlock(css, ':root')
  const darkOverrides = readBlock(css, '.dark')
  const light = { ...theme, ...root }
  return { light, dark: { ...light, ...darkOverrides } }
}

/** Follows `var(--x)` references so paired tokens can point at ramp steps. */
export function resolveToken(tokens: TokenMap, name: string): string {
  let value = tokens[name]
  const seen = new Set<string>()
  while (value?.startsWith('var(')) {
    const ref = /^var\((--[\w-]+)\)$/.exec(value)?.[1]
    if (!ref || seen.has(ref)) throw new Error(`Unresolvable token reference in ${name}`)
    seen.add(ref)
    value = tokens[ref]
  }
  if (value === undefined) throw new Error(`Token ${name} is not defined`)
  return value
}
