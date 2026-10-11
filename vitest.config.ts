import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'out'],
    setupFiles: ['./tests/setup.ts'],
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/types/**',
        // RSC page bodies, layouts and image routes render only under Next; the API route is covered.
        'src/app/**/page.tsx',
        'src/app/**/layout.tsx',
        'src/app/**/opengraph-image.tsx',
        'src/app/not-found.tsx',
        'src/app/robots.ts',
        'src/app/sitemap.ts',
        'src/app/writing/feed.xml/route.ts',
        'src/config/**',
        'src/lib/fonts.ts',
        'src/components/layout/theme-toggle.tsx',
        'src/components/layout/nav-link.tsx',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
  },
})
