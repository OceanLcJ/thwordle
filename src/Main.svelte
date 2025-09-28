<!-- Main.svelte -->
<script>
  import url from "./lib/url"
  import App from "./App.svelte"
  import Special from "./Special.svelte"
  import Training from "./Training.svelte"
  import Help from "./Help.svelte"
  import NotFound from "./NotFound.svelte"
  import FloatingSocial from "./lib/FloatingSocial.svelte"

  // 新的内容页面
  import HowToPlay from "./HowToPlay.svelte"
  import FAQ from "./FAQ.svelte"
  import Archive from "./Archive.svelte"
  import Blog from "./Blog.svelte"
  import About from "./About.svelte"
  import Privacy from "./Privacy.svelte"
  import Terms from "./Terms.svelte"
</script>

{#if $url.hash.indexOf("#/s/") === 0}
  <Special specialId={$url.hash.split(["#/s/"])[1]} />
{:else if $url.hash.indexOf("#/training") === 0}
  <Training />
{:else if $url.hash.indexOf("#/help") === 0}
  <Help />
{:else if $url.hash.indexOf("#/how-to-play") === 0}
  <HowToPlay />
{:else if $url.hash.indexOf("#/faq") === 0}
  <FAQ />
{:else if $url.hash.indexOf("#/archive") === 0}
  <Archive />
{:else if $url.hash.indexOf("#/blog") === 0}
  <Blog />
{:else if $url.hash.indexOf("#/about") === 0}
  <About />
{:else if $url.hash.indexOf("#/privacy") === 0}
  <Privacy />
{:else if $url.hash.indexOf("#/terms") === 0}
  <Terms />
{:else if $url.hash === "" || $url.hash === "#/"}
  <App />
{:else if $url.hash.indexOf("#/404") === 0}
  <NotFound />
{:else}
  <!-- 未匹配的路由显示404页面 -->
  <NotFound />
{/if}

<!-- 全局悬浮社交分享按钮 -->
<FloatingSocial />
