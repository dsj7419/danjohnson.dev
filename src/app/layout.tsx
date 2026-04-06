import '@/styles/globals.css'

import { defaultMetadata } from '@/config/seo'
import { fontBody, fontHeading, fontMono } from '@/lib/fonts'

export const metadata = defaultMetadata

const themeScript =
  `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()` as const

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontHeading.variable} ${fontBody.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        {children}
      </body>
    </html>
  )
}
