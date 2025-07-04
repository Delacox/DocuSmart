import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';

// Precaching (Vite inyecta el manifest en build)
precacheAndRoute(self.__WB_MANIFEST || []);

// Cache para archivos PDF en /docs (offline-first)
registerRoute(
  ({ url }) => url.pathname.startsWith('/docs/'),
  new StaleWhileRevalidate({ cacheName: 'pdf-cache' })
);

// Cache para peticiones a la API de Gemini (solo si es posible cachear)
registerRoute(
  ({ url }) => url.hostname.includes('generativelanguage.googleapis.com'),
  new NetworkFirst({ cacheName: 'gemini-api-cache' })
); 