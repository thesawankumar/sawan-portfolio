import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Raise warning threshold — we handle splitting manually
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — cached separately, rarely changes
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation — large but cacheable
          'vendor-motion': ['framer-motion'],
          // MUI icons — very large, isolate completely
          'vendor-mui': [
            '@mui/icons-material',
            '@mui/material',
            '@emotion/react',
            '@emotion/styled',
          ],
          // Swiper carousel
          'vendor-swiper': ['swiper'],
          // Misc UI libs
          'vendor-ui': [
            'lucide-react',
            'react-icons',
            'react-simple-typewriter',
            'react-toastify',
          ],
        },
      },
    },
  },
})
