import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = Number(env.UI_PORT || process.env.UI_PORT) || 5173
  const proxyTarget = env.VITE_PROXY_TARGET || process.env.VITE_PROXY_TARGET || 'http://localhost:3000'

  const proxy = {
    '/api': { target: proxyTarget, changeOrigin: true },
    '/health': { target: proxyTarget, changeOrigin: true },
  }

  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: true,
      port,
      proxy,
    },
    preview: {
      host: true,
      port,
      proxy,
    },
  }
})
