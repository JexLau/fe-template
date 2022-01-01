import path from "path";
import { ConfigEnv, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    server: {
      port: 3010,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      vue(),
      vueJsx({}),
      viteMockServe({
        // mock 目录
        mockPath: "mock",
      }),
      viteMockServe({
        supportTs: true,
        mockPath: "mock",
        localEnabled: command === "serve",
        prodEnabled: command !== "serve",
        injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `,
      }),
    ],
  };
};
