import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    reporters: ['verbose'],
    watch: false,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['__test__/**', ...configDefaults.exclude]
    },
    exclude: [
      ...configDefaults.exclude,
      '**/node_modules/**',
      './coverage/**'
    ],
  },
});
