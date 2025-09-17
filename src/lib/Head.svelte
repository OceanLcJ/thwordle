<script lang="ts">
  import { onMount } from 'svelte'
  import { seoRouter } from './seo-router'

  export let title: string
  export let description: string
  export let url: string
  export let imageUrl: string
  export let gtagId: string

  let canonicalUrl = url

  $: analyticsSnippet = gtagId
    ? `<!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${gtagId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gtagId}');
    </script>`
    : ''

  onMount(() => {
    // 获取SEO友好的规范URL
    canonicalUrl = seoRouter.getCanonicalUrl()
  })
</script>

<svelte:head>
  <title>{title}</title>

  <meta name="title" content={title} />
  <meta name="description" content={description} />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- Canonical URL for SEO -->
  <link rel="canonical" href={canonicalUrl} />


  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={imageUrl} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content={imageUrl} />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;600&display=swap"
    rel="stylesheet"
  />


  {#if gtagId}
    {@html analyticsSnippet}
  {/if}
</svelte:head>
