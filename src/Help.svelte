<!-- Help.svelte -->
<script>
  import { onMount } from 'svelte'
  import Head from "./lib/Head.svelte"

  // SEO数据配置
  const title = "Thwordle Help - คู่มือการเล่น เวอเดิ้ลภาษาไทย"
  const description = "คู่มือการเล่น Thwordle วิธีเล่น เทคนิค และ FAQ เกมทายคำภาษาไทย thwordle help ไทยเวอเดิ้ล เวอเดิลไทย"
  const url = "https://thwordle.app/help"
  const imageUrl = "https://raw.githubusercontent.com/narze/timelapse/master/projects/thwordle_home.png"
  const gtagId = "G-N3FL38P2NM"

  function goToGame() {
    window.location.hash = ''
  }

  function goToTraining() {
    window.location.hash = '#/training'
  }
</script>

<Head {title} {description} {url} {imageUrl} {gtagId} />

<main class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- 返回按钮 -->
    <div class="mb-8">
      <button
        on:click={goToGame}
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        กลับสู่เกม
      </button>
    </div>

    <!-- หัวข้อหลัก -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        คู่มือการเล่น Thwordle
      </h1>
      <p class="text-xl text-gray-600">
        เวอเดิ้ลภาษาไทย - เกมทายคำที่สนุกและท้าทาย
      </p>
    </div>

    <!-- วิธีการเล่น -->
    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 mb-6">วิธีการเล่น</h2>

      <div class="space-y-6">
        <div class="flex items-start">
          <div class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold mr-4">1</div>
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">เดาคำภาษาไทย 5 ตัวอักษร</h3>
            <p class="text-gray-600">คุณมี 6 ครั้งในการเดาคำศัพท์ภาษาไทยที่มี 5 ตัวอักษร</p>
          </div>
        </div>

        <div class="flex items-start">
          <div class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold mr-4">2</div>
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">ใส่คำเดาของคุณ</h3>
            <p class="text-gray-600">พิมพ์คำที่คุณคิดว่าถูกต้อง แล้วกด Enter เพื่อยืนยัน</p>
          </div>
        </div>

        <div class="flex items-start">
          <div class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold mr-4">3</div>
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">ดูผลลัพธ์จากสีที่แสดง</h3>
            <p class="text-gray-600">ระบบจะแสดงสีเพื่อบอกใบ้ว่าคำเดาของคุณถูกต้องแค่ไหน</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ความหมายของสี -->
    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 mb-6">ความหมายของสี</h2>

      <div class="space-y-4">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-green-500 rounded mr-4 flex items-center justify-center text-white font-bold">ก</div>
          <div>
            <h3 class="font-medium text-gray-900">สีเขียว</h3>
            <p class="text-gray-600">ตัวอักษรถูกต้องและอยู่ในตำแหน่งที่ถูกต้อง</p>
          </div>
        </div>

        <div class="flex items-center">
          <div class="w-12 h-12 bg-yellow-500 rounded mr-4 flex items-center justify-center text-white font-bold">ข</div>
          <div>
            <h3 class="font-medium text-gray-900">สีเหลือง</h3>
            <p class="text-gray-600">ตัวอักษรมีในคำตอบ แต่อยู่ผิดตำแหน่ง</p>
          </div>
        </div>

        <div class="flex items-center">
          <div class="w-12 h-12 bg-gray-400 rounded mr-4 flex items-center justify-center text-white font-bold">ค</div>
          <div>
            <h3 class="font-medium text-gray-900">สีเทา</h3>
            <p class="text-gray-600">ตัวอักษรไม่มีในคำตอบ</p>
          </div>
        </div>
      </div>
    </section>

    <!-- เทคนิคการเล่น -->
    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 mb-6">เทคนิคการเล่น</h2>

      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-3">💡 เคล็ดลับสำหรับผู้เริ่มต้น</h3>
          <ul class="space-y-2 text-gray-600">
            <li>• เริ่มด้วยคำที่มีสวรและพยัญชนะที่ใช้บ่อย</li>
            <li>• สังเกตสีที่ได้รับหลังจากแต่ละครั้ง</li>
            <li>• ใช้ข้อมูลจากการเดาก่อนหน้ามาปรับปรุง</li>
            <li>• อย่าใช้ตัวอักษรที่แสดงสีเทาแล้ว</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-3">🎯 ยุทธศาสตร์ขั้นสูง</h3>
          <ul class="space-y-2 text-gray-600">
            <li>• ใช้คำที่มีตัวอักษรหลากหลายในการเดาแรก</li>
            <li>• จำตำแหน่งของตัวอักษรที่ถูกต้อง</li>
            <li>• คิดถึงรูปแบบคำไทยที่เป็นไปได้</li>
            <li>• ฝึกฝนด้วยโหมดฝึกซ้อม</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- โหมดเกม -->
    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 mb-6">โหมดเกม</h2>

      <div class="grid md:grid-cols-3 gap-6">
        <div class="text-center p-4 border border-gray-200 rounded-lg">
          <div class="text-3xl mb-3">🎯</div>
          <h3 class="font-medium text-gray-900 mb-2">โหมดปกติ</h3>
          <p class="text-sm text-gray-600">เล่นเกม Thwordle ประจำวัน คำใหม่ทุกวัน</p>
          <button
            on:click={goToGame}
            class="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            เล่นเลย
          </button>
        </div>

        <div class="text-center p-4 border border-gray-200 rounded-lg">
          <div class="text-3xl mb-3">🏋️</div>
          <h3 class="font-medium text-gray-900 mb-2">โหมดฝึกซ้อม</h3>
          <p class="text-sm text-gray-600">ฝึกเล่นได้ไม่จำกัด เหมาะสำหรับผู้เริ่มต้น</p>
          <button
            on:click={goToTraining}
            class="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            ฝึกซ้อม
          </button>
        </div>

        <div class="text-center p-4 border border-gray-200 rounded-lg">
          <div class="text-3xl mb-3">⭐</div>
          <h3 class="font-medium text-gray-900 mb-2">ด่านพิเศษ</h3>
          <p class="text-sm text-gray-600">ความท้าทายพิเศษสำหรับผู้เล่นที่มีประสบการณ์</p>
          <button
            on:click={goToGame}
            class="mt-3 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
          >
            ดูด่านพิเศษ
          </button>
        </div>
      </div>
    </section>

    <!-- คำถามที่พบบ่อย -->
    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 mb-6">คำถามที่พบบ่อย (FAQ)</h2>

      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Thwordle คืออะไร?</h3>
          <p class="text-gray-600">Thwordle เป็นเกมทายคำภาษาไทยที่ได้แรงบันดาลใจจาก Wordle คุณต้องเดาคำภาษาไทย 5 ตัวอักษรภายใน 6 ครั้ง</p>
        </div>

        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">มีคำใหม่ทุกวันหรือไม่?</h3>
          <p class="text-gray-600">ใช่ครับ! Thwordle มีคำใหม่ทุกวัน คุณสามารถเล่นได้วันละ 1 ครั้งในโหมดปกติ หรือฝึกซ้อมได้ไม่จำกัดในโหมดฝึกซ้อม</p>
        </div>

        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Thwordle eng คืออะไร?</h3>
          <p class="text-gray-600">Thwordle eng คือโหมดภาษาอังกฤษของเกม ซึ่งกำลังอยู่ในขั้นตอนการพัฒนา เร็วๆ นี้จะสามารถเล่นได้ครับ</p>
        </div>

        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Thwordle คณิต คืออะไร?</h3>
          <p class="text-gray-600">Thwordle คณิต เป็นโหมดพิเศษที่ใช้ตัวเลขและสัญลักษณ์ทางคณิตศาสตร์แทนตัวอักษร กำลังอยู่ในขั้นตอนการพัฒนา</p>
        </div>

        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">ทำไมต้องเล่น Thwordle?</h3>
          <p class="text-gray-600">Thwordle ช่วยฝึกทักษะภาษาไทย เพิ่มคลังคำศัพท์ และเป็นเกมที่สนุก ท้าทาย เหมาะสำหรับทุกวัย</p>
        </div>

        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">สามารถแชร์ผลได้หรือไม่?</h3>
          <p class="text-gray-600">ได้ครับ! หลังจากเล่นเสร็จ คุณสามารถแชร์ผลลัพธ์ไปยัง Facebook, Twitter หรือ LINE ได้</p>
        </div>
      </div>
    </section>

    <!-- ข้อมูลเพิ่มเติม -->
    <section class="bg-blue-50 rounded-lg p-6 text-center">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">พร้อมเล่นแล้วหรือยัง?</h2>
      <p class="text-gray-600 mb-6">มาท้าทายทักษะภาษาไทยของคุณกับ Thwordle กันเลย!</p>

      <div class="space-x-4">
        <button
          on:click={goToGame}
          class="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          เริ่มเล่นเลย
        </button>

        <button
          on:click={goToTraining}
          class="inline-flex items-center px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          ฝึกซ้อมก่อน
        </button>
      </div>
    </section>

    <!-- ส่วนท้าย -->
    <footer class="text-center text-gray-500 text-sm mt-12 pt-8 border-t border-gray-200">
      <p>© 2024 Thwordle - เวอเดิ้ลภาษาไทย | เกมทายคำที่สนุกและท้าทาย</p>
      <p class="mt-2">
        <span class="mx-2">•</span>
        <span>thwordle help</span>
        <span class="mx-2">•</span>
        <span>ไทยเวอเดิ้ล</span>
        <span class="mx-2">•</span>
        <span>เวอเดิลไทย</span>
        <span class="mx-2">•</span>
        <span>เกม thwordle ภาษาไทย</span>
      </p>
    </footer>
  </div>
</main>