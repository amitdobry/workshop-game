import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages serves this site from /workshop-game/, not from the root.
  base: '/workshop-game/',
  plugins: [react()],
  server: {
    port: 5173,
    // Anything the browser asks for at /api goes to our Express server.
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});
