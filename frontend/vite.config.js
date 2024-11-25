import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true, 
    }),
  ],
  assetsInclude: ["**/*.glb", "**/*.gltf", "**/*.png", "**/*.jpg", "**/*.jpeg"],
  server: {
    port: 3005, // Development server port
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND_URL || "http://localhost:3000",
        changeOrigin: true, // Proxy requests to the backend
        secure: false, // Disable SSL verification for local testing
        ws: true, // Enable WebSocket proxying
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src", 
    },
  },
  base: mode === "production" ? "/" : "/", // Base public path for the app
  build: {
    outDir: "dist", // Output directory for production build
    sourcemap: mode === "development", // Enable sourcemaps only in development
    chunkSizeWarningLimit: 500, // Warn if chunks exceed 500KB (optional)
  },
  envPrefix: "VITE_", // Only allow variables prefixed with "VITE_" to be exposed
}));
