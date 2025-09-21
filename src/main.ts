import "./app.css"
import Main from "./Main.svelte"
import { seoRouter } from "./lib/seo-router"

// 重新启用SEO路由器以支持 /help 路由
seoRouter.init()

const app = new Main({
  target: document.getElementById("app"),
  intro: true,
  // hydrate: true,
})

export default app
