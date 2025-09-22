<script lang="ts">
  import { Facebook, Twitter } from "svelte-share-buttons-component"

  export let url: string
  export let title: string
  export let gameResult: string = ""
  export let gameNumber: string = ""

  // 优化的分享文案 - 针对泰国用户
  const shareTexts = {
    th: {
      line: `🎯 ฉันเล่น Thwordle ${gameNumber} ได้แล้ว!\n${gameResult}\n\n🔥 มาเล่น Thwordle กันเถอะ - เกมทายคำไทยสุดฮิต!`,
      facebook: `🎯 เล่น Thwordle ${gameNumber} สำเร็จ! เกมทายคำไทยที่ทุกคนติดใจ 🔥`,
      twitter: `🎯 Thwordle ${gameNumber}\n${gameResult}\n\n#Thwordle #เวอเดิ้ลภาษาไทย #ThaiWordGame`,
      instagram: `🎯 Thwordle Challenge Complete!\n${gameResult}\n\n#Thwordle #เวอเดิ้ลภาษาไทย`,
      tiktok: `🎯 Thwordle ${gameNumber} Challenge! เกมทายคำไทยสุดฮิต`,
      copy: `🎯 Thwordle ${gameNumber}\n${gameResult}\n\n🔥 เล่น Thwordle กันเถอะ: ${url}`
    }
  }

  // LINE 分享功能 (泰国最重要)
  function shareToLine() {
    const text = encodeURIComponent(shareTexts.th.line + `\n\n${url}`)
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${text}`
    window.open(lineUrl, '_blank', 'width=600,height=600')
  }

  // Instagram Stories 分享 (需要移动端)
  function shareToInstagram() {
    const text = encodeURIComponent(shareTexts.th.instagram)
    // Instagram 在移动端会自动检测
    if (navigator.share) {
      navigator.share({
        title: shareTexts.th.instagram,
        url: url
      })
    } else {
      // 桌面端复制链接
      copyToClipboard(shareTexts.th.instagram + '\n\n' + url)
    }
  }

  // TikTok 分享 (年轻用户群体)
  function shareToTikTok() {
    const text = encodeURIComponent(shareTexts.th.tiktok)
    // TikTok 主要是移动端，桌面端显示提示
    if (navigator.share) {
      navigator.share({
        title: shareTexts.th.tiktok,
        url: url
      })
    } else {
      copyToClipboard(shareTexts.th.tiktok + '\n\n' + url)
      alert('TikTok 链接已复制! 请在移动设备上打开 TikTok 分享 📱')
    }
  }

  // 复制到剪贴板功能
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      // 可以显示成功提示
    })
  }

  // 一键分享 (复制优化内容)
  function quickShare() {
    copyToClipboard(shareTexts.th.copy)
  }
</script>

<div class="enhanced-social-share">
  <!-- 主要分享按钮行 -->
  <div class="flex gap-2 justify-center mb-3">
    <!-- LINE 分享 (泰国第一优先级) -->
    <button
      on:click={shareToLine}
      class="social-btn line-btn flex items-center gap-2 px-4 py-2 rounded-full"
      title="分享到 LINE"
    >
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
      </svg>
      <span class="text-sm font-medium">LINE</span>
    </button>

    <!-- Facebook (优化版) -->
    <div class="social-btn facebook-btn">
      <Facebook
        class="w-10 h-10 rounded-full"
        {url}
        quote={shareTexts.th.facebook}
      />
    </div>

    <!-- Twitter (优化版) -->
    <div class="social-btn twitter-btn">
      <Twitter
        class="w-10 h-10 rounded-full"
        text={shareTexts.th.twitter}
        {url}
      />
    </div>
  </div>

  <!-- 次要分享按钮行 -->
  <div class="flex gap-2 justify-center mb-3">
    <!-- Instagram Stories -->
    <button
      on:click={shareToInstagram}
      class="social-btn instagram-btn flex items-center gap-1 px-3 py-2 rounded-full"
      title="分享到 Instagram"
    >
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
      <span class="text-xs">IG</span>
    </button>

    <!-- TikTok -->
    <button
      on:click={shareToTikTok}
      class="social-btn tiktok-btn flex items-center gap-1 px-3 py-2 rounded-full"
      title="分享到 TikTok"
    >
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.76 20.5a6.34 6.34 0 0 0 10.86-4.43V7.83a8.2 8.2 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.8-.26z"/>
      </svg>
      <span class="text-xs">TikTok</span>
    </button>

    <!-- 一键复制 (原有功能增强) -->
    <button
      on:click={quickShare}
      class="social-btn copy-btn flex items-center gap-1 px-3 py-2 rounded-full"
      title="复制分享内容"
    >
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <span class="text-xs">Copy</span>
    </button>
  </div>

  <!-- 分享提示文本 -->
  <p class="text-center text-xs text-gray-500 mt-2">
    🎯 แชร์ผลการเล่น Thwordle ไปยังโซเชียลมีเดีย!
  </p>
</div>

<style>
  .enhanced-social-share {
    @apply w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-sm border border-gray-100;
  }

  .social-btn {
    @apply transition-all duration-200 hover:scale-105 active:scale-95;
  }

  .line-btn {
    @apply bg-green-500 text-white hover:bg-green-600;
  }

  .facebook-btn :global(.svelte-share-buttons-component) {
    @apply hover:scale-110 transition-transform;
  }

  .twitter-btn :global(.svelte-share-buttons-component) {
    @apply hover:scale-110 transition-transform;
  }

  .instagram-btn {
    @apply bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600;
  }

  .tiktok-btn {
    @apply bg-black text-white hover:bg-gray-800;
  }

  .copy-btn {
    @apply bg-gray-100 text-gray-700 hover:bg-gray-200;
  }

  /* 移动端优化 */
  @media (max-width: 640px) {
    .enhanced-social-share {
      @apply p-3;
    }

    .social-btn {
      @apply text-xs;
    }
  }
</style>