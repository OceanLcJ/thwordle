<script lang="ts">
  import { onMount } from 'svelte'

  export let url: string = "https://thwordle.app"
  export let title: string = "Thwordle - เวอเดิ้ลภาษาไทย"

  let isExpanded = false
  let isMobile = false
  let isDragging = false
  let dragStart = { x: 0, y: 0 }
  let position = { x: 0, y: 0 }
  let hasCustomPosition = false

  onMount(() => {
    // 检测移动端
    isMobile = window.innerWidth < 768

    // 从localStorage恢复位置
    const savedPosition = localStorage.getItem('thwordle-share-button-position')
    if (savedPosition) {
      try {
        position = JSON.parse(savedPosition)
        hasCustomPosition = true
      } catch (e) {
        // 忽略解析错误
      }
    }

    // 监听窗口大小变化
    const handleResize = () => {
      isMobile = window.innerWidth < 768
      if (isMobile) isExpanded = false // 移动端默认收起

      // 检查位置是否仍在屏幕内
      constrainPosition()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  // 获取当前页面类型，用于调整位置
  function getPageType() {
    const hash = window.location.hash
    if (hash.includes('/help')) return 'help'
    if (hash.includes('/training')) return 'training'
    if (hash.includes('/s/')) return 'special'
    return 'main'
  }

  // 分享到LINE (泰国最重要)
  function shareToLine() {
    const text = encodeURIComponent(`🎯 เล่น Thwordle กันเถอะ! เกมทายคำไทยสุดฮิต 🔥\n\n${url}`)
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${text}`
    window.open(lineUrl, '_blank', 'width=600,height=600')
  }

  // 分享到Facebook
  function shareToFacebook() {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent('🎯 เล่น Thwordle เกมทายคำไทยสุดฮิต!')}`
    window.open(fbUrl, '_blank', 'width=600,height=600')
  }

  // 分享到Twitter
  function shareToTwitter() {
    const text = encodeURIComponent(`🎯 เล่น Thwordle เกมทายคำไทยสุดฮิต! 🔥\n\n#Thwordle #เวอเดิ้ลภาษาไทย #ThaiWordGame`)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank', 'width=600,height=600')
  }

  // 复制链接
  function copyLink() {
    const textToCopy = `🎯 เล่น Thwordle เกมทายคำไทยสุดฮิต! 🔥\n\n${url}`
    navigator.clipboard.writeText(textToCopy).then(() => {
      // 简单的成功提示
      alert('📋 คัดลอกลิงก์แล้ว!')
    })
  }

  // 切换展开/收起
  function toggleExpanded() {
    if (!isDragging) {
      isExpanded = !isExpanded
    }
  }

  // 约束位置在屏幕内
  function constrainPosition() {
    const buttonSize = isMobile ? 44 : 56 // 按钮大小 (11*4 或 14*4 = px)
    const margin = 8

    position.x = Math.max(margin, Math.min(window.innerWidth - buttonSize - margin, position.x))
    position.y = Math.max(margin, Math.min(window.innerHeight - buttonSize - margin, position.y))
  }

  // 保存位置到localStorage
  function savePosition() {
    localStorage.setItem('thwordle-share-button-position', JSON.stringify(position))
  }

  // 拖动开始
  function handleDragStart(event) {
    isDragging = true
    isExpanded = false // 拖动时收起

    const clientX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX
    const clientY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY

    dragStart = { x: clientX - position.x, y: clientY - position.y }

    // 添加移动和结束事件监听
    const handleMove = (e) => {
      e.preventDefault()

      const moveX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX
      const moveY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY

      position.x = moveX - dragStart.x
      position.y = moveY - dragStart.y

      constrainPosition()
      hasCustomPosition = true
    }

    const handleEnd = () => {
      isDragging = false
      savePosition()

      // 清理事件监听
      if (event.type === 'mousedown') {
        window.removeEventListener('mousemove', handleMove)
        window.removeEventListener('mouseup', handleEnd)
      } else {
        window.removeEventListener('touchmove', handleMove)
        window.removeEventListener('touchend', handleEnd)
      }
    }

    // 添加事件监听
    if (event.type === 'mousedown') {
      window.addEventListener('mousemove', handleMove)
      window.addEventListener('mouseup', handleEnd)
    } else {
      window.addEventListener('touchmove', handleMove, { passive: false })
      window.addEventListener('touchend', handleEnd)
    }
  }

  // 重置位置到默认
  function resetPosition() {
    position = { x: 0, y: 0 }
    hasCustomPosition = false
    localStorage.removeItem('thwordle-share-button-position')
  }
</script>

<!-- 悬浮社交分享组件 -->
<div
  class="floating-social"
  class:expanded={isExpanded}
  class:mobile={isMobile}
  class:game-page={getPageType() === 'main' || getPageType() === 'training' || getPageType() === 'special'}
  class:dragging={isDragging}
  class:custom-position={hasCustomPosition}
  style={hasCustomPosition ? `transform: translate(${position.x}px, ${position.y}px)` : ''}
>

  <!-- 主按钮 (分享图标) -->
  <button
    class="main-btn"
    on:click={toggleExpanded}
    on:mousedown={handleDragStart}
    on:touchstart={handleDragStart}
    title={isDragging ? "กำลังลาก..." : (hasCustomPosition ? "แชร์ Thwordle (ลากเพื่อย้าย)" : "แชร์ Thwordle")}
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
    </svg>
  </button>

  <!-- 分享按钮列表 -->
  <div class="share-buttons" class:show={isExpanded}>

    <!-- LINE (第一优先级) -->
    <button
      class="share-btn line-btn"
      on:click={shareToLine}
      title="แชร์ผ่าน LINE"
    >
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
      </svg>
      <span class="btn-text">LINE</span>
    </button>

    <!-- Facebook -->
    <button
      class="share-btn facebook-btn"
      on:click={shareToFacebook}
      title="แชร์ผ่าน Facebook"
    >
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
      <span class="btn-text">Facebook</span>
    </button>

    <!-- Twitter -->
    <button
      class="share-btn twitter-btn"
      on:click={shareToTwitter}
      title="แชร์ผ่าน Twitter"
    >
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
      <span class="btn-text">Twitter</span>
    </button>

    <!-- 复制链接 -->
    <button
      class="share-btn copy-btn"
      on:click={copyLink}
      title="คัดลอกลิงก์"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
      </svg>
      <span class="btn-text">Copy</span>
    </button>

  </div>

  <!-- 小提示文字 -->
  <div class="hint-text" class:show={!isExpanded && !isMobile}>
    {hasCustomPosition ? "ลากได้" : "แชร์"}
  </div>

  <!-- 重置位置按钮 (仅在自定义位置时显示) -->
  {#if hasCustomPosition && !isMobile}
    <button
      class="reset-btn"
      on:click={resetPosition}
      title="รีเซ็ตตำแหน่ง"
    >
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
      </svg>
    </button>
  {/if}
</div>

<style>
  .floating-social {
    @apply fixed right-4 top-1/2 transform -translate-y-1/2 z-50;
    @apply flex flex-col items-center gap-2;
    @apply transition-all duration-200;
  }

  .floating-social.mobile {
    @apply bottom-32 right-2 top-auto transform-none;
  }

  /* 自定义位置时移除默认定位 */
  .floating-social.custom-position {
    @apply top-0 right-0 bottom-auto left-0;
    @apply transform-none;
  }

  /* 拖动状态样式 */
  .floating-social.dragging {
    @apply scale-110 cursor-move;
    @apply transition-none;
  }

  .floating-social.dragging .main-btn {
    @apply shadow-2xl scale-105;
    @apply border-sakura-dark;
  }

  .main-btn {
    @apply w-14 h-14 bg-sakura-pink text-white rounded-full shadow-lg;
    @apply flex items-center justify-center;
    @apply hover:bg-sakura-dark transition-all duration-300;
    @apply hover:scale-110 active:scale-95;
    @apply border-2 border-white;
    @apply cursor-pointer select-none;
  }

  .reset-btn {
    @apply w-6 h-6 bg-gray-500 text-white rounded-full shadow-md;
    @apply flex items-center justify-center mt-1;
    @apply hover:bg-gray-600 transition-all duration-200;
    @apply hover:scale-110 active:scale-95;
    @apply opacity-70 hover:opacity-100;
  }

  .share-buttons {
    @apply flex flex-col gap-2 opacity-0 transform scale-95 pointer-events-none;
    @apply transition-all duration-300 ease-out;
  }

  .share-buttons.show {
    @apply opacity-100 scale-100 pointer-events-auto;
  }

  .mobile .share-buttons {
    @apply flex-row;
  }

  .share-btn {
    @apply w-12 h-12 rounded-full shadow-md text-white;
    @apply flex items-center justify-center gap-1;
    @apply hover:scale-110 transition-all duration-200;
    @apply border border-white/20;
  }

  .btn-text {
    @apply text-xs font-medium hidden;
  }

  .expanded .btn-text {
    @apply block;
  }

  .line-btn {
    @apply bg-green-500 hover:bg-green-600;
  }

  .facebook-btn {
    @apply bg-blue-600 hover:bg-blue-700;
  }

  .twitter-btn {
    @apply bg-blue-400 hover:bg-blue-500;
  }

  .copy-btn {
    @apply bg-gray-500 hover:bg-gray-600;
  }

  .hint-text {
    @apply text-xs text-gray-600 font-medium mt-2 opacity-0;
    @apply transition-opacity duration-300;
  }

  .hint-text.show {
    @apply opacity-100;
  }

  /* 悬停效果 */
  .floating-social:hover .hint-text {
    @apply opacity-100;
  }

  .floating-social:hover .main-btn {
    @apply shadow-xl;
  }

  /* 移动端适配 */
  @media (max-width: 768px) {
    .floating-social {
      @apply right-1 bottom-24;
    }

    /* 游戏页面需要避开键盘区域 */
    .floating-social.game-page {
      @apply bottom-40;
    }

    .main-btn {
      @apply w-11 h-11 shadow-md;
    }

    .share-btn {
      @apply w-9 h-9;
    }

    .hint-text {
      @apply hidden;
    }

    /* 移动端展开时横向排列，避免遮挡更多内容 */
    .share-buttons {
      @apply flex-row;
    }

    .share-buttons.show {
      @apply flex-row gap-1 mb-2;
    }
  }

  /* 桌面端悬停展开 */
  @media (min-width: 769px) {
    .floating-social:hover .share-buttons {
      @apply opacity-100 scale-100 pointer-events-auto;
    }
  }
</style>