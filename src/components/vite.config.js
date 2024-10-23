import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['jwt-decode'], // Asegura que Vite optimice jwt-decode
  },
});
