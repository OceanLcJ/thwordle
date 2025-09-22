<!-- Main.svelte -->
<script>
  import url from "./lib/url"
  import App from "./App.svelte"
  import Special from "./Special.svelte"
  import Training from "./Training.svelte"
  import Help from "./Help.svelte"
  import FloatingSocial from "./lib/FloatingSocial.svelte"
</script>

{#if $url.hash.indexOf("#/s/") === 0}
  <Special specialId={$url.hash.split(["#/s/"])[1]} />
{:else if $url.hash.indexOf("#/training") === 0}
  <Training />
{:else if $url.hash.indexOf("#/help") === 0}
  <Help />
{:else}
  <App />
{/if}

<!-- 全局悬浮社交分享按钮 -->
<FloatingSocial />
