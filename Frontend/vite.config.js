import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: './',
  envFiles: ['.env.prod', '.env.dev'],
  build: {
    envDir: './',
    envFile: '.env.prod',
  },
})
