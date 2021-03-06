import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import vitePluginImp from "vite-plugin-imp";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000
  },
  plugins: [reactRefresh(), vitePluginImp({
    libList: [
      {
        libName: 'antd',
        style: (name) => `antd/es/${name}/style/index.less`
      }
    ],
  })],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    },
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'camelCase'
    }
  },
});