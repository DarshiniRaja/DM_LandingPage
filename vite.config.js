import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
        conversion: resolve(import.meta.dirname, 'conversion.html'),
        problemSolving: resolve(import.meta.dirname, 'problem-solving.html'),
        thankYou: resolve(import.meta.dirname, 'thank-you.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});
