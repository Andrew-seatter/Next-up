import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3001,
        open: true,
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
    },
});
