import localFont from 'next/font/local'

export const fontHeading = localFont({
  src: [
    { path: '../../public/fonts/source-serif-4-var.woff2', style: 'normal' },
    { path: '../../public/fonts/source-serif-4-var-italic.woff2', style: 'italic' },
  ],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Times New Roman',
})

export const fontBody = localFont({
  src: [
    { path: '../../public/fonts/inter-var.woff2', style: 'normal' },
    { path: '../../public/fonts/inter-var-italic.woff2', style: 'italic' },
  ],
  variable: '--font-body',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Arial',
})

export const fontMono = localFont({
  src: '../../public/fonts/jetbrains-mono-var.woff2',
  variable: '--font-mono',
  display: 'swap',
  preload: false,
})
