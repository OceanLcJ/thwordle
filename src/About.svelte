<!-- About.svelte - เกี่ยวกับ Thwordle -->
<script>
  import Head from "./lib/Head.svelte"
  import Navbar from "./lib/Navbar.svelte"
  import { modalViewed } from "./lib/store"

  const title = "เกี่ยวกับ Thwordle - เวอเดิ้ลภาษาไทย"
  const description = "ประวัติและที่มาของ Thwordle เกมทายคำภาษาไทย ทีมพัฒนา และวิสัยทัศน์ในการส่งเสริมภาษาไทย"
  const url = "https://thwordle.app/about"
  const imageUrl = "https://raw.githubusercontent.com/narze/timelapse/master/projects/thwordle_home.png"
  const gtagId = "G-N3FL38P2NM"
</script>

<Head {title} {description} {url} {imageUrl} {gtagId} />

<main class="min-h-screen bg-sakura-light dark:bg-pure-charcoal">
  <Navbar {modalViewed} modes="content" />

  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- หน้าแรก -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4 dark:text-white text-gray-800">
        🎯 เกี่ยวกับ Thwordle
      </h1>
      <p class="text-xl dark:text-gray-200 text-gray-600">
        เรื่องราวของ <strong>เวอเดิ้ลภาษาไทย</strong> และการเดินทางในการส่งเสริมภาษาไทย
      </p>
    </div>

    <!-- วิสัยทัศน์และภารกิจ -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-6 text-sakura-pink dark:text-sakura-light text-center">
        💡 วิสัยทัศน์และภารกิจ
      </h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 class="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">🌟 วิสัยทัศน์</h3>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            เป็นแพลตฟอร์มเกมทายคำภาษาไทยชั้นนำที่ช่วยส่งเสริมการเรียนรู้และความรักในภาษาไทย
            พร้อมสร้างชุมชนคนรักภาษาไทยที่แข็งแกร่ง
          </p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 class="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">🎯 ภารกิจ</h3>
          <ul class="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
            <li>• พัฒนาทักษะภาษาไทยผ่านการเล่นเกม</li>
            <li>• อนุรักษ์และส่งเสริมคำศัพท์ภาษาไทย</li>
            <li>• สร้างประสบการณ์การเรียนรู้ที่สนุกสนาน</li>
            <li>• เสริมสร้างความภาคภูมิใจในภาษาไทย</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ประวัติความเป็นมา -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-6 text-warm-orange dark:text-warm-light text-center">
        📜 ประวัติความเป็นมา
      </h2>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg flex-shrink-0">
              💡
            </div>
            <div>
              <h3 class="font-semibold text-lg mb-2">แรงบันดาลใจ</h3>
              <p class="text-gray-700 dark:text-gray-300">
                Thwordle เกิดขึ้นจากความรักในภาษาไทยและแรงบันดาลใจจาก Wordle ของ Josh Wardle
                เรามองเห็นโอกาสในการนำแนวคิดดีๆ มาปรับใช้เพื่อส่งเสริมภาษาไทย
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-lg flex-shrink-0">
              🚀
            </div>
            <div>
              <h3 class="font-semibold text-lg mb-2">การพัฒนา</h3>
              <p class="text-gray-700 dark:text-gray-300">
                การพัฒนา Thwordle เริ่มต้นในปี 2022 โดยคำนึงถึงความพิเศษของภาษาไทย
                ทั้งระบบสระ วรรณยุกต์ และโครงสร้างคำที่ซับซ้อน
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-lg flex-shrink-0">
              🌱
            </div>
            <div>
              <h3 class="font-semibold text-lg mb-2">การเติบโต</h3>
              <p class="text-gray-700 dark:text-gray-300">
                ปัจจุบัน Thwordle มีผู้เล่นมากกว่า 15,000 คนต่อวัน และยังคงเติบโตอย่างต่อเนื่อง
                พร้อมพัฒนาฟีเจอร์ใหม่ๆ เพื่อตอบสนองความต้องการของชุมชน
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- คุณค่าและหลักการ -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-6 text-elegant-grey dark:text-gray-300 text-center">
        ⭐ คุณค่าและหลักการ
      </h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
          <div class="text-4xl mb-4">🇹🇭</div>
          <h3 class="font-semibold text-lg mb-3 text-red-600 dark:text-red-400">ความเป็นไทย</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            ยึดมั่นในความถูกต้องของภาษาไทยตามมาตรฐานราชบัณฑิตยสถาน
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
          <div class="text-4xl mb-4">🎮</div>
          <h3 class="font-semibold text-lg mb-3 text-blue-600 dark:text-blue-400">ความสนุก</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            การเรียนรู้ที่สนุกสนานและท้าทาย ไม่น่าเบื่อ
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
          <div class="text-4xl mb-4">🤝</div>
          <h3 class="font-semibold text-lg mb-3 text-green-600 dark:text-green-400">ชุมชน</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            สร้างชุมชนคนรักภาษาไทยที่แบ่งปันและเรียนรู้ร่วมกัน
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
          <div class="text-4xl mb-4">🆓</div>
          <h3 class="font-semibold text-lg mb-3 text-purple-600 dark:text-purple-400">เข้าถึงได้</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            เล่นฟรี ไม่มีค่าใช้จ่าย เข้าถึงได้ทุกคน
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
          <div class="text-4xl mb-4">🔒</div>
          <h3 class="font-semibold text-lg mb-3 text-orange-600 dark:text-orange-400">ความปลอดภัย</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            เคารพความเป็นส่วนตัว ไม่เก็บข้อมูลส่วนบุคคล
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
          <div class="text-4xl mb-4">📚</div>
          <h3 class="font-semibold text-lg mb-3 text-indigo-600 dark:text-indigo-400">การศึกษา</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            มุ่งเน้นการเรียนรู้และพัฒนาทักษะภาษาไทย
          </p>
        </div>
      </div>
    </section>

    <!-- ทีมพัฒนา -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400 text-center">
        👥 ทีมพัฒนา
      </h2>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
        <div class="text-center mb-8">
          <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Thwordle พัฒนาโดยทีมงานที่หลงใหลในภาษาไทยและเทคโนโลยี
            ด้วยความมุ่งมั่นที่จะสร้างเครื่องมือที่ช่วยส่งเสริมการเรียนรู้ภาษาไทย
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="text-center">
            <h3 class="font-semibold text-lg mb-4 text-blue-600 dark:text-blue-400">🛠️ การพัฒนา</h3>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• นักพัฒนาเว็บแอปพลิเคชัน</li>
              <li>• ผู้เชี่ยวชาญ UX/UI Design</li>
              <li>• นักพัฒนาระบบฐานข้อมูล</li>
              <li>• ผู้ดูแลระบบและความปลอดภัย</li>
            </ul>
          </div>

          <div class="text-center">
            <h3 class="font-semibold text-lg mb-4 text-green-600 dark:text-green-400">📖 เนื้อหา</h3>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• อาจารย์ภาษาไทย</li>
              <li>• นักภาษาศาสตร์</li>
              <li>• ผู้เชี่ยวชาญคำศัพท์ไทย</li>
              <li>• นักเขียนและบรรณาธิการ</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- เทคโนโลยีที่ใช้ -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400 text-center">
        ⚙️ เทคโนโลยีที่ใช้
      </h2>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div class="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div class="text-3xl mb-2">🌐</div>
            <h3 class="font-semibold mb-2">Frontend</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Svelte, TypeScript, Tailwind CSS</p>
          </div>
          <div>
            <div class="text-3xl mb-2">⚡</div>
            <h3 class="font-semibold mb-2">Build Tools</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Vite, PostCSS, Autoprefixer</p>
          </div>
          <div>
            <div class="text-3xl mb-2">☁️</div>
            <h3 class="font-semibold mb-2">Hosting</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Vercel, CDN Global</p>
          </div>
          <div>
            <div class="text-3xl mb-2">📊</div>
            <h3 class="font-semibold mb-2">Analytics</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Google Analytics, Custom Metrics</p>
          </div>
        </div>
      </div>
    </section>

    <!-- แผนการพัฒนาอนาคต -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-6 text-green-600 dark:text-green-400 text-center">
        🚀 แผนการพัฒนาอนาคต
      </h2>
      <div class="space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
              Q1
            </div>
            <h3 class="text-xl font-semibold">ไตรมาสแรก 2025</h3>
          </div>
          <ul class="text-gray-700 dark:text-gray-300 space-y-2 ml-16">
            <li>• เพิ่มโหมดเล่นแบบทีม</li>
            <li>• ระบบ Achievement และ Badge</li>
            <li>• ปรับปรุง Mobile App Experience</li>
          </ul>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
              Q2
            </div>
            <h3 class="text-xl font-semibold">ไตรมาสที่สอง 2025</h3>
          </div>
          <ul class="text-gray-700 dark:text-gray-300 space-y-2 ml-16">
            <li>• เปิดตัว Thwordle English</li>
            <li>• ระบบการแข่งขันรายสัปดาห์</li>
            <li>• API สำหรับนักพัฒนา</li>
          </ul>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
              Q3
            </div>
            <h3 class="text-xl font-semibold">ไตรมาสที่สาม 2025</h3>
          </div>
          <ul class="text-gray-700 dark:text-gray-300 space-y-2 ml-16">
            <li>• Thwordle Math (เกมทายสมการ)</li>
            <li>• ระบบ Community Features</li>
            <li>• โหมด Multiplayer Real-time</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- การติดต่อ -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-6 text-orange-600 dark:text-orange-400 text-center">
        📞 การติดต่อ
      </h2>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center">
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
          เรายินดีรับฟังความคิดเห็น ข้อเสนอแนะ และคำถามจากชุมชนผู้เล่น
        </p>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <div class="text-2xl mb-2">💌</div>
            <h3 class="font-semibold text-blue-600 dark:text-blue-400 mb-2">อีเมล</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">contact@thwordle.app</p>
          </div>
          <div class="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <div class="text-2xl mb-2">📱</div>
            <h3 class="font-semibold text-green-600 dark:text-green-400 mb-2">โซเชียล</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Facebook, Twitter, Instagram</p>
          </div>
          <div class="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
            <div class="text-2xl mb-2">🐛</div>
            <h3 class="font-semibold text-purple-600 dark:text-purple-400 mb-2">รายงานบั๊ก</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">GitHub Issues</p>
          </div>
        </div>
      </div>
    </section>

    <!-- การนำทาง -->
    <div class="text-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 class="text-xl font-bold mb-4 dark:text-white">🔗 เรียนรู้เพิ่มเติม</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <a href="/#/how-to-play" class="block p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
            <div class="text-2xl mb-2">📖</div>
            <div class="font-semibold text-blue-600 dark:text-blue-400">วิธีเล่น</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">เรียนรู้การเล่น Thwordle</div>
          </a>
          <a href="/#/privacy" class="block p-4 bg-green-50 dark:bg-green-900/30 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
            <div class="text-2xl mb-2">🔒</div>
            <div class="font-semibold text-green-600 dark:text-green-400">ความเป็นส่วนตัว</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">นโยบายความเป็นส่วนตัว</div>
          </a>
          <a href="/" class="block p-4 bg-pink-50 dark:bg-pink-900/30 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/50 transition-colors">
            <div class="text-2xl mb-2">🎮</div>
            <div class="font-semibold text-pink-600 dark:text-pink-400">เล่นเลย</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">เริ่มเล่น Thwordle</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</main>