import { defineConfig } from "vite"

export default defineConfig({
  build: {
    rollupOptions: {
      input: "main.js",
      output: {
        format: "iife",
        entryFileNames: "main.js",
        esModule: false,
        compact: true,
      },
    },
  },
})
