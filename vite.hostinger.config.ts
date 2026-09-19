import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  root: ".",
  plugins: [tailwindcss(), react(), tsconfigPaths()],
  build: {
    outDir: "hostinger-build",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(process.cwd(), "hostinger/index.html"),
    },
  },
});
