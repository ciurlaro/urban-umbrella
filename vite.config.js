import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  root: 'public', // Set the root directory to public where index.html is located
  build: {
    outDir: '../dist', // Output directory for the build, relative to the root
    emptyOutDir: true, // Ensure the dist directory is cleaned before building
    rollupOptions: {
      input: resolve(__dirname, 'public/index.html'), // Specify the input HTML file
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Alias for the src directory
      '/src': resolve(__dirname, 'src'), // Ensure Vite knows how to resolve /src in index.html
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
  },
});
