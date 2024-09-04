import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  root: '/app/dependencies',
  build: {
    outDir: '/app/dependencies/dist',
    rollupOptions: {
      input: '/app/dependencies/index.html',
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
  },
});
