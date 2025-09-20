import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将字典文件单独打包
          'dictionary': ['./src/lib/dict.json'],
          // 将核心库分离
          'vendor': ['svelte'],
          // 将测试库分离（如果需要）
          'svelte-share': ['svelte-share-buttons-component']
        },
        // 优化文件名，包含hash便于缓存
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    // 调整chunk大小警告阈值
    chunkSizeWarningLimit: 1000,
    // 启用CSS代码分割
    cssCodeSplit: true,
    // 启用sourcemap用于生产环境调试
    sourcemap: false,
    // 开启压缩（使用默认的 esbuild）
    minify: true
  },
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
