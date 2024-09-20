import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [react(),
    nodePolyfills({})
  ],
  
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  
})