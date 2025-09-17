import "./app.css"
import Main from "./Main.svelte"
import { seoRouter } from "./lib/seo-router"

// 初始化SEO路由器
seoRouter.init()

const app = new Main({
  target: document.getElementById("app"),
  intro: true,
  // hydrate: true,
})

export default app
