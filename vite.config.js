import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    // 开发环境下的 history API fallback
    // 所有非静态资源的请求都会回退到 index.html
    // 让我们的SEO路由器在客户端处理URL转换
    historyApiFallback: {
      index: '/index.html',
      rewrites: [
        // 训练页面
        { from: /^\/training$/, to: '/index.html' },
        // 特殊关卡页面
        { from: /^\/special\/.*$/, to: '/index.html' }
      ]
    }
  }
})
