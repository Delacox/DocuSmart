# PDF Chat PWA

Aplicación web progresiva (PWA) para chatear sobre el contenido de un PDF usando Gemini API.

## Estructura

```
/public
  /icons/…           # Iconos PWA (reemplaza los placeholders)
  manifest.json       # Manifest PWA
  logo.svg            # Logo de la app (reemplazable)
/docs
  doc.pdf             # Tu PDF principal (reemplazable, debe llamarse doc.pdf)
/src
  main.jsx, App.jsx, ChatPage.jsx, api.js, sw.js, ...
/vite.config.js
.env.example          # Añade tu API key de Gemini
```

## Instalación

1. Clona el repo y entra en la carpeta.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Copia el archivo de entorno y añade tu API key de Gemini:
   ```bash
   cp .env.example .env
   # Edita .env y pon tu VITE_GEMINI_API_KEY
   ```
4. Ejecuta en desarrollo:
   ```bash
   npm run dev
   ```
5. Compila para producción y prueba la PWA:
   ```bash
   npm run build
   npm run preview
   ```
   Abre http://localhost:4173 en tu navegador (preferiblemente en modo incógnito o móvil para probar la PWA).

## Personalización
- Cambia `/public/logo.svg` y los colores en los CSS (`// TODO:` marcados en el código).
- Reemplaza `/docs/doc.pdf` por tu propio PDF (debe llamarse doc.pdf).
- Cambia los iconos en `/public/icons/`.

## PWA
- El banner de instalación aparece automáticamente en móviles compatibles.
- Funciona offline excepto las llamadas a la API de Gemini.

## Notas
- Solo responde preguntas sobre el PDF. Temas externos reciben una respuesta educada y restrictiva.
- Puedes ampliar la lista de temas prohibidos en `ChatPage.jsx`.

---

Desarrollado con Vite + React + pdfjs-dist + Gemini API + Workbox. 