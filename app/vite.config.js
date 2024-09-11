import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    root: '.',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: 'public/index.html'
            }
        },
        manifest: true
    },
    server: {
        logLevel: 'info',
        host: '0.0.0.0',
        port: 3000,
        strictPort: true,
        watch: {
            usePolling: true
        }
    },
    //publicPath: '/'
});
