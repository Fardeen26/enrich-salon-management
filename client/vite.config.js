import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': import.meta.env.VITE_BACKEND_URL
    }
  },
  plugins: [react()],
})
