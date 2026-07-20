import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { imagetools } from "vite-imagetools";


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