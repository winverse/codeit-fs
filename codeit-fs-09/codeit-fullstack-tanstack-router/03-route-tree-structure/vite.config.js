import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { tanstackRouter } from '@tanstack/router-vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tanstackRouter()],
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
});
