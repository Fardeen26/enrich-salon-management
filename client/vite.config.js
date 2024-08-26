import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://b7v4hvw7-3000.inc1.devtunnels.ms/'
    }
  },
  plugins: [react()],
})
