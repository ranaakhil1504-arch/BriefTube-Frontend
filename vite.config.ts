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
});