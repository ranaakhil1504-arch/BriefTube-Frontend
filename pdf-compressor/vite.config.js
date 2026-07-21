
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  base: '/pdf-compressor/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    }
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
