import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    target: 'es2015'
  },
  base: "/shortest-path-finder/dist/"
})
