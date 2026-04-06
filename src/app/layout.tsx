import '@/styles/globals.css'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
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
      <body className="flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
