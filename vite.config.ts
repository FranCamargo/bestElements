import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite'
import netlifyReactRouter from "@netlify/vite-plugin-react-router"

export default defineConfig({
  base: '/bestElements/',
  plugins: [reactRouter(), netlifyReactRouter({edge: true})],
})
