import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginImp from "vite-plugin-imp";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginImp({
      libList: [
        {
          libName: "ant-design-vue",
          style(name) {
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
