import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    // The three.js chunk is intentionally large — it is lazy-loaded behind
    // React.lazy(), so it never blocks first paint.
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Split the heavy 3D stack away from the UI bundle so the DOM shell
        // (text, nav, sections) becomes interactive immediately.
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('three') && !id.includes('@react-three')) return 'three'
            if (id.includes('@react-three') || id.includes('postprocessing')) return 'r3f'
            if (id.includes('gsap') || id.includes('framer-motion') || id.includes('lenis')) return 'motion'
          }
          return undefined
        },
      },
    },
  },
})
