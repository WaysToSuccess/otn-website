import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Converts blocking <link rel="stylesheet"> to non-blocking preload.
// The static HTML in index.html uses only inline <style>, so the page
// paints immediately without waiting for the Tailwind CSS file.
function nonBlockingCss(): Plugin {
  return {
    name: 'non-blocking-css',
    apply: 'build',
    transformIndexHtml(html) {
      let result = html.replace(
        /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
        `<link rel="preload" as="style" crossorigin href="$1" onload="this.onload=null;this.rel='stylesheet'">` +
        `<noscript><link rel="stylesheet" crossorigin href="$1"></noscript>`
      )
      // Remove vendor-heavy preload — only needed on intern pages, loaded on demand
      result = result.replace(
        /<link rel="modulepreload" crossorigin href="[^"]*vendor-heavy[^"]*">/g,
        ''
      )
      // Remove lucide preload — Vite injects this because some lazy-loaded sections use it,
      // but forcing it to fetch/parse/execute before first paint was costing real TBT on the
      // eager render path. It still loads on demand once a lazy section that needs it mounts.
      result = result.replace(
        /<link rel="modulepreload" crossorigin href="[^"]*\/lucide-[^"]*">/g,
        ''
      )
      return result
    },
  }
}

export default defineConfig({
  // Aliases: TypeScript sees @types/react, but Vite resolves to preact/compat at runtime.
  // Preact/compat is API-compatible with React but 95% smaller → massive Safari parse speedup.
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
      'react-dom/client': 'preact/compat',
      'react-dom/server': 'preact/compat',
    },
  },
  plugins: [react(), tailwindcss(), nonBlockingCss()],
  build: {
    target: 'es2020',
    cssMinify: true,
    cssCodeSplit: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress known-harmless warnings: react-router v7 checks for React 19
        // hooks (use, useOptimistic) that preact/compat doesn't export yet.
        // These code paths are never hit in our app (no server actions / form hooks).
        if (warning.code === 'IMPORT_IS_UNDEFINED') return
        warn(warning)
      },
      output: {
        manualChunks(id) {
          // intern-only heavy deps — never loaded on main page
          if (id.includes('html-to-image') || id.includes('html2canvas') || id.includes('qrcode')) {
            return 'vendor-heavy'
          }
          // Preact + React-Router → small cacheable vendor chunk
          if (
            id.includes('/node_modules/preact/') ||
            id.includes('/node_modules/react-router')
          ) {
            return 'preact-vendor'
          }
          // All Lucide icons in one chunk (VlHero eager-loads it, cached for all lazy sections)
          if (id.includes('/node_modules/lucide-react/')) {
            return 'lucide'
          }
        },
      },
    },
  },
})
