import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import {defineConfig, Plugin} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

dotenv.config();

// LINT.IfChange(aistudio_media_plugin)
function aistudioMediaPlugin(): Plugin {
  return {
    name: 'vite-plugin-aistudio-media',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/assets/aistudio/')) {
          const rawPath = req.url.split('?')[0].split('#')[0];
          try {
            const decodedPath = decodeURIComponent(rawPath);
            const relativePath = decodedPath.replace(/^\//, '');
            const aistudioDir = path.resolve(
              __dirname,
              'public',
              'assets',
              'aistudio',
            );
            const filePath = path.resolve(__dirname, 'public', relativePath);
            if (
              filePath.startsWith(aistudioDir + path.sep) &&
              fs.existsSync(filePath) &&
              fs.statSync(filePath).isFile()
            ) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeMap: Record<string, string> = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml',
                '.bmp': 'image/bmp',
                '.ico': 'image/x-icon',
                '.mp4': 'video/mp4',
                '.webm': 'video/webm',
                '.ogv': 'video/ogg',
                '.mp3': 'audio/mpeg',
                '.wav': 'audio/wav',
                '.ogg': 'audio/ogg',
                '.pdf': 'application/pdf',
              };
              res.setHeader(
                'Content-Type',
                mimeMap[ext] || 'application/octet-stream',
              );
              res.setHeader('Cache-Control', 'no-cache');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          } catch {
            // Fall through if URI decoding or file access fails
          }
        }
        next();
      });
    },
  };
}
// LINT.ThenChange(//depot/google3/java/com/google/alkali/boq/makersuite/applet_dev_service/templates/initializers/react_theme/vite.config.ts:aistudio_media_plugin)

export default defineConfig(() => {
  const serviceId = (process.env.EMAILJS_SERVICE_ID && process.env.EMAILJS_SERVICE_ID !== 'EMAILJS_SERVICE_ID')
    ? process.env.EMAILJS_SERVICE_ID
    : (process.env.VITE_EMAILJS_SERVICE_ID && process.env.VITE_EMAILJS_SERVICE_ID !== 'EMAILJS_SERVICE_ID')
    ? process.env.VITE_EMAILJS_SERVICE_ID
    : 'service_31jj6yq';

  const templateId = (process.env.EMAILJS_TEMPLATE_ID && process.env.EMAILJS_TEMPLATE_ID !== 'EMAILJS_TEMPLATE_ID')
    ? process.env.EMAILJS_TEMPLATE_ID
    : (process.env.VITE_EMAILJS_TEMPLATE_ID && process.env.VITE_EMAILJS_TEMPLATE_ID !== 'EMAILJS_TEMPLATE_ID')
    ? process.env.VITE_EMAILJS_TEMPLATE_ID
    : 'template_sjy2r1b';

  const publicKey = (process.env.EMAILJS_PUBLIC_KEY && process.env.EMAILJS_PUBLIC_KEY !== 'EMAILJS_PUBLIC_KEY')
    ? process.env.EMAILJS_PUBLIC_KEY
    : (process.env.VITE_EMAILJS_PUBLIC_KEY && process.env.VITE_EMAILJS_PUBLIC_KEY !== 'EMAILJS_PUBLIC_KEY')
    ? process.env.VITE_EMAILJS_PUBLIC_KEY
    : 'mq2CSZgr-vlXBFP1';

  return {
    base: '/562123/',
    define: {
      'process.env.EMAILJS_SERVICE_ID': JSON.stringify(serviceId),
      'process.env.EMAILJS_TEMPLATE_ID': JSON.stringify(templateId),
      'process.env.EMAILJS_PUBLIC_KEY': JSON.stringify(publicKey),
      'process.env.VITE_EMAILJS_SERVICE_ID': JSON.stringify(serviceId),
      'process.env.VITE_EMAILJS_TEMPLATE_ID': JSON.stringify(templateId),
      'process.env.VITE_EMAILJS_PUBLIC_KEY': JSON.stringify(publicKey),
    },
    plugins: [
      react(),
      tailwindcss(),
      aistudioMediaPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.png', 'apple-touch-icon.png', 'icon.svg'],
        manifest: {
          id: '/562123/',
          name: 'Sandhya Enterprises - Commercial LPG Gas Agency',
          short_name: 'Sandhya LPG',
          description: 'Official Commercial LPG Gas Agency, Manifold Pipeline & Bulk Fuel Supply in Nelamangala, Dobbaspet & Tumkur',
          theme_color: '#ea580c',
          background_color: '#0f172a',
          display: 'standalone',
          orientation: 'portrait-primary',
          start_url: '/562123/',
          scope: '/562123/',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        },
        devOptions: {
          enabled: false,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});