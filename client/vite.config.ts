import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa"
// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['apng',
    'png',
    'jpe?g',
    'jfif',
    'pjpeg',
    'pjp',
    'gif',
    'svg',
    'ico',
    'webp',
    'avif',
  ],
  plugins: [react(),
  VitePWA(
    {
      devOptions: { enabled: true, type: "module" },
      "filename": "sw.js",
      "manifest": {
        "name": "trackIt",
        "short_name": "trackIt",
        "orientation": "portrait",
        "start_url": "/",
        "id": "trackIt353535353",
        "icons": [
          { "src": "/512.png", type: "image/png", sizes: "512x512" },
          { "src": "/192.png", type: "image/png", sizes: "192x192" }
        ],
        "display": "standalone"

      },
      "srcDir": "src",
      "registerType": "autoUpdate",
      "strategies": "injectManifest"
    }
  )
    ,

  ],
})

// export default defineConfig({
//   ass
// })