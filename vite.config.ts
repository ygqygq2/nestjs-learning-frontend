import path from "path";

import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import ViteComponents from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

function pathResolve(dir: string) {
  return path.resolve(__dirname, ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": pathResolve("src"),
      "~bootstrap": "bootstrap",
    },
  },
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      dts: true,
      imports: ["vue", "vue-router", "pinia"],
      eslintrc: {
        enabled: false,
      },
    }),
    ViteComponents({
      dts: true,
      resolvers: [VantResolver()],
    }),
  ],
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/variables";`,
      },
    },
  },
});
