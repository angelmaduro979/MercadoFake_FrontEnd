import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'https://tu-backend.com', // Cambia esto por la URL de tu backend
        changeOrigin: true,
        secure: false, // Cambia a true si tu backend usa HTTPS con un certificado válido
      },
    },
  },
})
