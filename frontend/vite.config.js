import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import dotenv from 'dotenv';

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
    port: 3005,
    proxy: mode === 'development' ? { "/api": process.env.VITE_BACKEND_URL } : undefined,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  base: mode === 'production' ? '/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: mode === 'development',
  },
}));
