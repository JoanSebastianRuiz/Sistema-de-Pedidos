import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [react(), svgr()],

        resolve: {
            alias: {
                '@': path.resolve('src'),
            },
        },

        server: {
            port: env.VITE_PORT || 3000,
        },
    };
});
