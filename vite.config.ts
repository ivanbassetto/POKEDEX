import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/POKEDEX/', // 👈 importante para funcionar no GitHub Pages
  plugins: [react()],
  server: {
    host: '0.0.0.0'
  }
})
