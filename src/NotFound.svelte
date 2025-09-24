<!-- NotFound.svelte -->
<script>
  import Head from "./lib/Head.svelte"

  // SEO数据配置
  const title = "404 - ไม่พบหน้าที่ต้องการ | Thwordle"
  const description = "ขออภัย หน้าที่คุณต้องการไม่พบ กลับไปเล่น Thwordle เวอเดิ้ลภาษาไทยได้เลย"
  const url = "https://thwordle.app/404"
  const imageUrl = "https://raw.githubusercontent.com/narze/timelapse/master/projects/thwordle_home.png"
  const gtagId = "G-N3FL38P2NM"

  function goToGame() {
    window.location.hash = ''
  }

  function goToTraining() {
    window.location.hash = '#/training'
  }

  function goToHelp() {
    window.location.hash = '#/help'
  }
</script>

<Head {title} {description} {url} {imageUrl} {gtagId} />

<main class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8 text-center">
    <!-- 404 หมายเลข -->
    <div class="mb-8">
      <div class="text-9xl font-bold text-blue-600 mb-4">404</div>
      <div class="text-2xl font-medium text-gray-900 mb-2">
        ไม่พบหน้าที่ต้องการ
      </div>
      <p class="text-gray-600">
        ขออภัย หน้าที่คุณกำลังค้นหาไม่มีอยู่ในระบบ
      </p>
    </div>

    <!-- Thwordle Logo/Icon -->
    <div class="mb-8">
      <div class="text-4xl font-bold text-gray-800 mb-2">
        Thwordle
      </div>
      <div class="flex justify-center space-x-1 mb-4">
        <!-- แสดงตัวอย่างไทล์เกม -->
        <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold text-sm">
          ก
        </div>
        <div class="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-white font-bold text-sm">
          า
        </div>
        <div class="w-8 h-8 bg-gray-400 rounded flex items-center justify-center text-white font-bold text-sm">
          ร
        </div>
        <div class="w-8 h-8 bg-gray-400 rounded flex items-center justify-center text-white font-bold text-sm">
          ด
        </div>
        <div class="w-8 h-8 bg-gray-400 rounded flex items-center justify-center text-white font-bold text-sm">
          ?
        </div>
      </div>
      <p class="text-sm text-gray-500">
        เวอเดิ้ลภาษาไทยยังคงรออยู่!
      </p>
    </div>

    <!-- ปุ่มนำทาง -->
    <div class="space-y-4">
      <button
        on:click={goToGame}
        class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        กลับสู่หน้าแรก
      </button>

      <div class="grid grid-cols-2 gap-3">
        <button
          on:click={goToTraining}
          class="flex justify-center items-center py-2 px-4 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          ฝึกเล่น
        </button>

        <button
          on:click={goToHelp}
          class="flex justify-center items-center py-2 px-4 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          คู่มือ
        </button>
      </div>
    </div>

    <!-- ข้อความเพิ่มเติม -->
    <div class="text-xs text-gray-400 pt-4">
      หรือลองเข้าไปที่ URL ที่ถูกต้อง หรือติดต่อทีมงานหากเกิดปัญหาต่อเนื่อง
    </div>
  </div>
</main>