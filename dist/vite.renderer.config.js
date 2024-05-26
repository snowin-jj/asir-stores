"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const vite_base_config_1 = require("./vite.base.config");
const node_path_1 = __importDefault(require("node:path"));
// https://vitejs.dev/config
exports.default = (0, vite_1.defineConfig)((env) => {
    const forgeEnv = env;
    const { root, mode, forgeConfigSelf } = forgeEnv;
    const name = forgeConfigSelf.name ?? '';
    return {
        root,
        mode,
        base: './',
        build: {
            outDir: `.vite/renderer/${name}`,
        },
        plugins: [(0, vite_base_config_1.pluginExposeRenderer)(name)],
        resolve: {
            preserveSymlinks: true,
            alias: {
                '@': node_path_1.default.resolve(__dirname, './src/'),
            },
        },
        clearScreen: false,
    };
});
//# sourceMappingURL=vite.renderer.config.js.map