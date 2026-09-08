import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Enable CORS for external PWA validation engines (PWABuilder, Lighthouse, Google Search)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, HEAD");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// Explicit PWA Manifest Endpoint with correct mime-type and CORS
app.get(["/manifest.json", "/manifest.webmanifest", "/562123/manifest.json", "/562123/manifest.webmanifest"], (req, res) => {
  const manifestPath = path.join(process.cwd(), "public", "manifest.json");
  res.setHeader("Content-Type", "application/manifest+json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.sendFile(manifestPath);
});

// Explicit Service Worker Endpoint with correct headers
app.get(["/sw.js", "/service-worker.js", "/562123/sw.js", "/562123/service-worker.js"], (req, res) => {
  const swPath = path.join(process.cwd(), "public", "sw.js");
  res.setHeader("Content-Type", "application/javascript; charset=utf-8");
  res.setHeader("Service-Worker-Allowed", "/");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-cache");
  res.sendFile(swPath);
});

// API routes FIRST
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Sandhya Enterprises Commercial LPG Official Portal",
    timestamp: new Date().toISOString()
  });
});

// Vite middleware setup for Development vs Production
async function startServer() {
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.use('/562123', express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Sandhya Commercial LPG Server] running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
