import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.md'], // Ensure markdown files are treated as assets
  build: {
    // Increase chunk size warning limit (we have markdown content bundled)
    chunkSizeWarningLimit: 2000, // 2MB instead of default 500KB

    rollupOptions: {
      output: {
        // Manual chunks to separate vendor code from app code
        manualChunks: {
          // React and core libraries
          'react-vendor': ['react', 'react-dom', 'react-helmet-async'],

          // Framer Motion (animation library)
          'animation-vendor': ['framer-motion'],

          // Markdown processing libraries
          'markdown-vendor': ['react-markdown', 'remark-gfm', 'rehype-raw', 'gray-matter'],

          // Search library
          'search-vendor': ['fuse.js'],

          // Icons
          'icons-vendor': ['lucide-react'],
        },
      },
    },
  },
})
