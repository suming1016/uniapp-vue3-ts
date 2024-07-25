import path from "node:path";
import dayjs from "dayjs";
import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
// @see https://uni-helper.js.org
import UniPages from "@uni-helper/vite-plugin-uni-pages";
import UniLayouts from "@uni-helper/vite-plugin-uni-layouts";
//vite-plugin-uni-platform需要与 @uni-helper/vite-plugin-uni-pages 插件一起使用
import UniPlatform from "@uni-helper/vite-plugin-uni-platform";
import UniManifest from "@uni-helper/vite-plugin-uni-manifest";
import Components from "@uni-helper/vite-plugin-uni-components";
import AutoImport from "unplugin-auto-import/vite";
import ViteRestart from "vite-plugin-restart";
import { visualizer } from "rollup-plugin-visualizer";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  // process.cwd(): 获取当前文件的目录跟地址
  // loadEnv(): 返回当前环境env文件中额外定义的变量
  console.log("command", command, mode, isSsrBuild, isPreview);
  const env = loadEnv(mode, process.cwd(), "");
  const { VITE_APP_PORT, VITE_SERVER_BASEURL, VITE_DELETE_CONSOLE, VITE_SHOW_SOURCEMAP, VITE_APP_PROXY, VITE_APP_PROXY_PREFIX } = env;
  const { UNI_PLATFORM } = process.env;
  console.log("环境变量 env -> ", env);
  console.log("isH5: ", UNI_PLATFORM === "h5"); // 得到 mp-weixin, h5, app 等
  return {
    resolve: {
      alias: {
        "@": path.join(process.cwd(), "./src"),
        "@img": path.join(process.cwd(), "./src/static/images")
      }
    },
    define: {
      __UNI_PLATFORM__: JSON.stringify(UNI_PLATFORM),
      __VITE_APP_PROXY__: JSON.stringify(VITE_APP_PROXY)
    },
    plugins: [
      UniPages({
        dts: "src/types/uni-pages.d.ts",
        exclude: ["**/components/**/**.*"],
        routeBlockLang: "json5", // 虽然设了默认值，但是vue文件还是要加上 lang="json5", 这样才能很好地格式化
        homePage: "pages/index/index",
        subPackages: ["src/pages-sub"] // 是个数组，可以配置多个
      }),
      UniLayouts(),
      UniPlatform(),
      UniManifest(),
      // 自动安装 src/components 里面的组件为全局组件，非全局组件不要放到 src/components
      Components({
        dts: "src/types/components.d.ts"
      }),
      uni(),
      AutoImport({
        imports: ["vue", "uni-app"],
        dts: "src/types/auto-import.d.ts",
        dirs: ["src/hooks"], // 自动导入 hooks
        eslintrc: { enabled: false },
        vueTemplate: true // default false
      }),
      ViteRestart({
        // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
        restart: ["vite.config.js"]
      }), // h5环境增加编译时间
      UNI_PLATFORM === "h5" && {
        name: "html-transform",
        transformIndexHtml(html) {
          return html.replace("%BUILD_DATE%", dayjs().format("YYYY-MM-DD HH:mm:ss"));
        }
      },
      // 打包分析插件
      mode === "production" &&
        visualizer({
          filename: "./node_modules/.cache/visualizer/stats.html",
          open: true,
          gzipSize: true,
          brotliSize: true
        })
    ],
    server: {
      host: "0.0.0.0",
      hmr: true,
      port: Number.parseInt(VITE_APP_PORT, 10),
      // 仅 H5 端生效，其他端不生效（其他端走build，不走devServer)
      proxy: JSON.parse(VITE_APP_PROXY)
        ? {
            [VITE_APP_PROXY_PREFIX]: {
              target: VITE_SERVER_BASEURL,
              changeOrigin: true,
              rewrite: path => path.replace(new RegExp(`^${VITE_APP_PROXY_PREFIX}`), "")
            }
          }
        : undefined
    },
    build: {
      // 方便非h5端调试
      sourcemap: VITE_SHOW_SOURCEMAP === "true", // 默认是false
      target: "es6",
      // 开发环境不用压缩
      minify: mode === "development" ? false : "terser",
      terserOptions: {
        compress: {
          drop_console: VITE_DELETE_CONSOLE === "true",
          drop_debugger: true
        }
      }
    }
  };
});
