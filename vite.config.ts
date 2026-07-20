import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { imagetools } from "vite-imagetools";
import { execSync } from "node:child_process";

// Runs scripts/prerender.mjs right after `vite build` finishes writing
// dist/. This is what fixes crawler visibility: the app is a pure
// client-side SPA (createRoot, no SSR), so a crawler that doesn't run
// JavaScript only ever sees an empty <div id="root"></div> — this step
// snapshots each real route (see scripts/routes.mjs) into full static
// HTML so bots see actual page content.
function prerenderPlugin() {
  return {
    name: "prerender-after-build",
    apply: "build" as const,
    closeBundle() {
      if (process.env.VITE_SKIP_PRERENDER === "true") return;

      console.log("\nRunning post-build prerender step...");
      execSync("node scripts/prerender.mjs", { stdio: "inherit" });
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
