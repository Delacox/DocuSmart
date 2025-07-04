// Registro del service worker con vite-plugin-pwa
export function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }
}

// El banner de instalación lo gestiona el navegador automáticamente con vite-plugin-pwa
export function setupInstallBanner() {} 