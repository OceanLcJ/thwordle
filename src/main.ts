import "./app.css"
import Main from "./Main.svelte"
import { seoRouter } from "./lib/seo-router"

// 暂时禁用SEO路由器来测试移动端卡死问题
// seoRouter.init()

const app = new Main({
  target: document.getElementById("app"),
  intro: true,
  // hydrate: true,
})

export default app
