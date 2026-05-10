import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import netlifyReactRouter from "@netlify/vite-plugin-react-router"

export default defineConfig({
  base: '/bestElements/',
  plugins: [react(), netlifyReactRouter({edge: true})],
})
