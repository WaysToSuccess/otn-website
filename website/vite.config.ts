import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('html-to-image') || id.includes('html2canvas') || id.includes('qrcode.react')) {
            return 'vendor-heavy'
          }
          if (id.includes('lucide-react')) return 'vendor-lucide'
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('react-router')) {
            return 'vendor-react'
          }
        },
      },
    },
  },
})
