<script lang="ts">
  import { onMount } from 'svelte'
  import { seoRouter } from './seo-router'

  export let title: string
  export let description: string
  export let url: string
  export let imageUrl: string
  export let gtagId: string

  let canonicalUrl = url

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

  <!-- Google Search Console Verification -->
  <meta name="google-site-verification" content="YOUR_GSC_VERIFICATION_CODE_HERE" />
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
    <!-- Google Analytics 4 (GA4) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id={gtagId}"></script>
    <script>
      window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag("js", new Date())

      // Configure GA4 with enhanced tracking
      gtag("config", "{gtagId}", {
        // Enhanced measurement events
        enhanced_measurement: {
          scrolls: true,
          outbound_clicks: true,
          site_search: false,
          video_engagement: false,
          file_downloads: true
        },
        // Custom configuration
        send_page_view: true,
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        // Game-specific tracking
        custom_map: {
          'custom_parameter_1': 'game_mode',
          'custom_parameter_2': 'difficulty_level',
          'custom_parameter_3': 'completion_status'
        }
      })

      // Custom events for Thwordle
      gtag("event", "thwordle_load", {
        event_category: "game",
        event_label: "page_load"
      })
    </script>

    <!-- Google Tag Manager (GTM) - Optional for enhanced tracking -->
    <!-- <script>
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-YOUR_GTM_ID');
    </script> -->
  {/if}
</svelte:head>
