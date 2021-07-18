import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import viteSvgIcons from "vite-plugin-svg-icons";
function pathResolve(dir) {
  return resolve(process.cwd(), ".", dir);
}
console.log('查看路径',resolve(process.cwd(), "src/assets/icons/svg"))
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), "src/assets/icons/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: pathResolve("src") + "/",
      },
      {
        find: /\/@\//,
        replacement: pathResolve("src") + "/",
      },
    ],
  },
  server: {
    proxy: {
      // 正则表达式写法
      "^/dev-api": {
        target: "http://vue.ruoyi.vip/prod-api/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ""),
      },
    },
  },
});

// detail: https://cli.vuejs.org/config/#devserver-proxy
// [import.meta.env.VITE_APP_BASE_API]: {
//   // target: `http://localhost:8080`,
//   target: `http://vue.ruoyi.vip/prod-api/`,
//   changeOrigin: true,
//   pathRewrite: {
//     ['^' + import.meta.env.VITE_APP_BASE_API]: ''
//   }
// }
