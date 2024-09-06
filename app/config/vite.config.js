import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    root: '/app/entrypoint',
    build: {
        rollupOptions: {
            input: {
                main: '/app/entrypoint/index.html',
            },
        },
        emptyOutDir: true,
    },
});
