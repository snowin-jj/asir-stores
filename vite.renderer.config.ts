import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import { pluginExposeRenderer } from './vite.base.config';
import path from 'node:path';

// https://vitejs.dev/config
export default defineConfig((env) => {
    const forgeEnv = env as ConfigEnv<'renderer'>;
    const { root, mode, forgeConfigSelf } = forgeEnv;
    const name = forgeConfigSelf.name ?? '';

    return {
        root,
        mode,
        base: './',
        build: {
            chunkSizeWarningLimit: 1000,
            outDir: `.vite/renderer/${name}`,
        },
        plugins: [pluginExposeRenderer(name)],
        resolve: {
            preserveSymlinks: true,
            alias: {
                '@': path.resolve(__dirname, './src/'),
            },
        },
        clearScreen: false,
    } as UserConfig;
});
