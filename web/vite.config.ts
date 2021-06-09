import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginImp from "vite-plugin-imp";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/questionFiles": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/testpaperFiles": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    vue(),
    vitePluginImp({
      libList: [
        {
          libName: "ant-design-vue",
          style(name) {
            if (/popconfirm/.test(name)) {
              return `ant-design-vue/es/popover/style/index.css`;
            } else if (/row/.test(name) || /col/.test(name)) {
              return `ant-design-vue/es/grid/style/index.css`;
            }
            return `ant-design-vue/es/${name}/style/index.css`;
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
