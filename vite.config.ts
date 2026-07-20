import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { imagetools } from "vite-imagetools";
import { execSync } from "node:child_process";

// Runs scripts/prerender.mjs right after `vite build` finishes writing
// dist/. This snapshots each route (see scripts/routes.mjs) into full
// static HTML so crawlers that don't execute JavaScript still see real
// page content instead of an empty <div id="root"></div>.
//
// IMPORTANT: wrapped in try/catch on purpose. If prerendering fails for
// any reason (Chromium launch issue, timeout, etc.), we log it and move
// on instead of throwing — a prerender failure must never take down the
// whole deployment. Worst case without it: crawlers see the plain SPA
// shell again, same as before this feature existed. That's a much
// better failure mode than "the entire site fails to deploy."
function prerenderPlugin() {
  return {
    name: "prerender-after-build",
    apply: "build" as const,
    closeBundle() {
      if (process.env.VITE_SKIP_PRERENDER === "true") return;

      console.log("\nRunning post-build prerender step...");

      try {
        execSync("node scripts/prerender.mjs", { stdio: "inherit" });
      } catch (error) {
        console.warn(
          "\n⚠️  Prerendering failed — deploying without it. " +
            "The site will still work normally for real users; " +
            "crawlers will temporarily see the unprerendered SPA shell " +
            "until this is fixed.\n",
          error instanceof Error ? error.message : error
        );
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools(),
    visualizer({
      filename: "stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    prerenderPlugin(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Only group icon libraries into their own chunk.
          // Everything else is left to Rollup's automatic splitting,
          // which prevents unrelated code from being bundled together
          // into one large blocking chunk.
          if (id.includes("node_modules/lucide-react")) {
            return "icons";
          }
        },
      },
    },
  },
});
