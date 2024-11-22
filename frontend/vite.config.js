import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import {nodePolyfills} from "vite-plugin-node-polyfills";
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,
    })
  ],
  assetsInclude: ["**/*.glb", "**/*.gltf", "**/*.png", "**/*.jpg", "**/*.jpeg"],
  server: {
    port: 3005,
    proxy: {
      // "/api": "http://localhost:3000",
      "/api": process.env.BACKEND_URL || "http://localhost:3000"
    }
  },
  resolve: {
    alias: {
      // Resolve the src folder if needed
      "@": "/src",
    },
  },
});