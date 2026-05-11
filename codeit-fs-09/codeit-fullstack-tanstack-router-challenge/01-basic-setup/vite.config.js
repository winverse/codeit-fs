import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { tanstackRouter } from '@tanstack/router-vite-plugin';

export default defineConfig({
  plugins: [react(), tanstackRouter()],
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
});
