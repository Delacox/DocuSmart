import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'PDF Chat PWA',
        short_name: 'PDFChat',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2d2d2d',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,pdf}'],
        runtimeCaching: [
          {
            urlPattern: /\/docs\/.*\.pdf$/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'pdf-cache' }
          },
          {
            urlPattern: /^https:\/\/generativelanguage\.googleapis\.com\//,
            handler: 'NetworkFirst',
            options: { cacheName: 'gemini-api-cache' }
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist',
  },
  server: {
    open: true,
  },
  preview: {
    host: true,
    allowedHosts: ['ca0a-94-124-25-233.ngrok-free.app'],
  },
}); 