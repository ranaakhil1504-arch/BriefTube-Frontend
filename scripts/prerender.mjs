import fs from "fs";
import path from "path";
import http from "http";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { getAllRoutes } from "./routes.mjs";

const DIST_DIR = path.resolve("dist");
const PORT = 4173;

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

function createStaticServer() {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    let filePath = path.join(DIST_DIR, urlPath);

    // If the exact file doesn't exist on disk yet, fall back to
    // index.html so the client-side router can take over. This is
    // required for the FIRST pass: dist/blog/<slug>/index.html
    // doesn't exist until this script writes it, so the initial
    // request needs to boot the SPA shell instead.
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST_DIR, "index.html");
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    });
  });
}

function routeToOutputPath(route) {
  if (route === "/") {
    return path.join(DIST_DIR, "index.html");
  }

  return path.join(DIST_DIR, route, "index.html");
}

async function prerender() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error("Prerender skipped: dist/ not found. Run `vite build` first.");
    process.exit(1);
  }

  const server = createStaticServer();
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Local static server running at http://localhost:${PORT}`);

  // puppeteer-core + @sparticuz/chromium: no bundled download, no
  // install script to approve — the Chromium binary ships as a
  // regular package file and is unpacked at runtime. This is what
  // makes it work reliably inside Vercel's build container, where
  // there's no way to interactively approve npm install scripts.
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const routes = getAllRoutes().map((r) => r.url);

  console.log(`Prerendering ${routes.length} routes...`);

  for (const route of routes) {
    const page = await browser.newPage();

    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      // Small buffer so lazy-loaded route chunks (React.lazy in
      // App.tsx) and any data-driven content finish rendering
      // before we snapshot the DOM.
      await page.waitForSelector("#root", { timeout: 10000 });
      await new Promise((resolve) => setTimeout(resolve, 300));

      const html = await page.content();

      const outputPath = routeToOutputPath(route);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, html);

      console.log(`  done: ${route}`);
    } catch (error) {
      console.warn(`  failed: ${route} (${error.message})`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log("Prerendering complete.");
}

prerender();
