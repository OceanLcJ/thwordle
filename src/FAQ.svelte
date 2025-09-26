<!-- FAQ.svelte - 常见问题页面 -->
<script>
  import Head from "./lib/Head.svelte"
  import Navbar from "./lib/Navbar.svelte"
  import { modalViewed } from "./lib/store"

  const title = "FAQ - คำถามที่พบบ่อยเกี่ยวกับ Thwordle"
  const description = "คำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับ Thwordle เวอเดิ้ลภาษาไทย การเล่น การแชร์ และฟีเจอร์ต่าง ๆ"
  const url = "https://thwordle.app/faq"
  const imageUrl = "https://raw.githubusercontent.com/narze/timelapse/master/projects/thwordle_home.png"
  const gtagId = "G-N3FL38P2NM"
</script>

<Head {title} {description} {url} {imageUrl} {gtagId} />

<main class="min-h-screen bg-sakura-light dark:bg-pure-charcoal">
  <Navbar {modalViewed} modes="content" />

  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- 页面标题 -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4 dark:text-white text-gray-800">
        ❓ คำถามที่พบบ่อย
      </h1>
      <p class="text-xl dark:text-gray-200 text-gray-600">
        คำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับ <strong>Thwordle</strong> เวอเดิ้ลภาษาไทย
      </p>
    </div>

    <!-- FAQ หมวดหมู่ -->
    <div class="grid md:grid-cols-1 lg:grid-cols-1 gap-8">

      <!-- การเล่นเกม -->
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-6 text-sakura-pink dark:text-sakura-light">
          🎮 การเล่นเกม
        </h2>
        <div class="space-y-4">
          <details class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <summary class="font-semibold cursor-pointer text-lg">
              Thwordle คืออะไร และแตกต่างจาก Wordle อย่างไร?
            </summary>
            <div class="mt-4 text-gray-700 dark:text-gray-300">
              <p class="mb-3">
                <strong>Thwordle</strong> เป็นเกมทายคำภาษาไทยที่ได้รับแรงบันดาลใจจาก Wordle ต้นฉบับ โดยมีความแตกต่างดังนี้:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li><strong>ภาษาไทยแท้:</strong> ใช้คำศัพท์ภาษาไทยจากพจนานุกรมราชบัณฑิตยสถาน</li>
                <li><strong>สระและวรรณยุกต์:</strong> รองรับการใช้สระ วรรณยุกต์ และตัวการันต์</li>
                <li><strong>คีย์บอร์ดภาษาไทย:</strong> มีคีย์บอร์ดพิเศษสำหรับการพิมพ์ภาษาไทย</li>
                <li><strong>ความยากง่าย:</strong> ปรับระดับความยากให้เหมาะกับโครงสร้างภาษาไทย</li>
              </ul>
            </div>
          </details>

          <details class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <summary class="font-semibold cursor-pointer text-lg">
              เล่น Thwordle ได้กี่ครั้งต่อวัน?
            </summary>
            <div class="mt-4 text-gray-700 dark:text-gray-300">
              <p class="mb-3">
                เหมือนกับ Wordle ต้นฉบับ คุณสามารถเล่น <strong>Thwordle</strong> ได้วันละ 1 ครั้ง
                คำตอบจะเปลี่ยนทุกวันเที่ยงคืน (เวลาประเทศไทย)
              </p>
              <p class="mb-3">
                หากต้องการฝึกเล่น สามารถเข้าไปที่ <strong>"โหมดฝึกเล่น"</strong> ซึ่งเล่นได้ไม่จำกัดครั้ง
              </p>
            </div>
          </details>

          <details class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <summary class="font-semibold cursor-pointer text-lg">
              กติกาการเล่น Thwordle อย่างละเอียด
            </summary>
            <div class="mt-4 text-gray-700 dark:text-gray-300">
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-sakura-pink dark:text-sakura-light mb-2">🎯 เป้าหมาย</h4>
                  <p>ทายคำภาษาไทยที่ถูกต้องภายใน 6 ครั้ง</p>
                </div>
                <div>
                  <h4 class="font-semibold text-sakura-pink dark:text-sakura-light mb-2">🎨 ความหมายของสี</h4>
                  <ul class="space-y-2">
                    <li>🟥 <strong>สีชมพู:</strong> ตัวอักษรถูกต้องและอยู่ในตำแหน่งที่ถูก</li>
                    <li>🟧 <strong>สีส้ม:</strong> มีตัวอักษรนี้ในคำตอบ แต่อยู่ผิดตำแหน่ง</li>
                    <li>⬜ <strong>สีเทา:</strong> ไม่มีตัวอักษรนี้ในคำตอบ</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold text-sakura-pink dark:text-sakura-light mb-2">⌨️ การใช้งาน</h4>
                  <ul class="list-disc pl-6 space-y-1">
                    <li>ใช้คีย์บอร์ดบนหน้าจอ หรือคีย์บอร์ดคอมพิวเตอร์</li>
                    <li>กด Enter เพื่อยืนยันคำตอบ</li>
                    <li>กด Backspace เพื่อลบตัวอักษร</li>
                  </ul>
                </div>
              </div>
            </div>
          </details>

          <details class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <summary class="font-semibold cursor-pointer text-lg">
              ทำไมคำที่ฉันพิมพ์ไม่ยอมรับ?
            </summary>
            <div class="mt-4 text-gray-700 dark:text-gray-300">
              <p class="mb-3">คำที่คุณพิมพ์อาจไม่ยอมรับเนื่องจาก:</p>
              <ul class="list-disc pl-6 space-y-2">
                <li><strong>ไม่มีในพจนานุกรม:</strong> คำต้องอยู่ในฐานข้อมูลคำศัพท์ไทยของเรา</li>
                <li><strong>การสะกดผิด:</strong> ตรวจสอบการใส่สระ วรรณยุกต์ และตัวการันต์</li>
                <li><strong>ความยาวไม่ถูกต้อง:</strong> คำต้องมีจำนวนตัวอักษรเท่ากับคำตอบ</li>
                <li><strong>คำหยาบคาย:</strong> เราไม่รับคำที่ไม่เหมาะสม</li>
              </ul>
              <p class="mt-3 text-sm text-blue-600 dark:text-blue-400">
                💡 <strong>เคล็ดลับ:</strong> ลองใช้คำพื้นฐานที่รู้จักดี เช่น สี อาชีพ หรือสิ่งของในชีวิตประจำวัน
              </p>
            </div>
          </details>
        </div>
      </section>

      <!-- การแชร์และโซเชียล -->
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-6 text-warm-orange dark:text-warm-light">
          📱 การแชร์และโซเชียล
        </h2>
        <div class="space-y-4">
          <details class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <summary class="font-semibold cursor-pointer text-lg">
              จะแชร์ผลการเล่นไปยังโซเชียลมีเดียได้อย่างไร?
            </summary>
            <div class="mt-4 text-gray-700 dark:text-gray-300">
              <p class="mb-3">หลังจากเล่นเสร็จ (ไม่ว่าจะชนะหรือแพ้) จะมีปุ่มแชร์ปรากฏขึ้น:</p>
              <ul class="list-disc pl-6 space-y-2">
                <li><strong>แชร์อัตโนมัติ:</strong> กดปุ่มโซเชียลเฉพาะ (Facebook, Twitter) เพื่อแชร์ทันที</li>
                <li><strong>คัดลอกผล:</strong> กดปุ่ม "Share" เพื่อคัดลอกผลเป็นอีโมจิ</li>
                <li><strong>ลิงก์โดยตรง:</strong> แชร์ลิงก์ thwordle.app พร้อมข้อความ</li>
              </ul>
              <div class="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                <strong>ตัวอย่างผลการแชร์:</strong><br>
                #Thwordle 1245 3/6<br><br>
                🟥🟧⬜<br>
                🟧🟥🟧<br>
                🟥🟥🟥<br><br>
                เล่น Thwordle ฟรี: thwordle.app
              </div>
            </div>
          </details>

          <details class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <summary class="font-semibold cursor-pointer text-lg">
              ทำไมเพื่อนๆ ในโซเชียลถึงเห็นแค่สี่เหลี่ยม?
            </summary>
            <div class="mt-4 text-gray-700 dark:text-gray-300">
              <p class="mb-3">
                นี่เป็นจุดเด่นของ Wordle และ Thwordle! การใช้อีโมจิสี่เหลี่ยมแทนตัวอักษร:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li><strong>ไม่เผยคำตอบ:</strong> คนอื่นจะเห็นแค่รูปแบบ ไม่รู้คำตอบจริง</li>
                <li><strong>สร้างความลุ้น:</strong> เพื่อนๆ จะเข้าใจแค่ว่าคุณเล่นยากหรือง่าย</li>
                <li><strong>เชิญชวนเล่น:</strong> ทำให้คนอื่นอยากลองเล่นดู</li>
              </ul>
            </div>
          </details>
        </div>
      </section>

      <!-- ฟีเจอร์และการอัปเดต -->
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-6 text-elegant-grey dark:text-gray-300">
          ⚙️ ฟีเจอร์และการใช้งาน
        </h2>
        <div class="space-y-4">
          <details class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <summary class="font-semibold cursor-pointer text-lg">
              มี Dark Mode หรือไม่? จะเปิดใช้งานอย่างไร?
            </summary>
            <div class="mt-4 text-gray-700 dark:text-gray-300">
              <p class="mb-3">
                มี! Thwordle รองรับ Dark Mode เต็มรูปแบบ:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li><strong>เปิดใช้:</strong> กดไอคอนเฟือง (⚙️) ที่มุมบนขวา</li>
                <li><strong>เลือกโหมด:</strong> เลือก "Dark Mode" หรือ "Light Mode"</li>
                <li><strong>การบันทึก:</strong> ระบบจะจำการตั้งค่าไว้ให้</li>
              </ul>
              <p class="mt-3 text-sm text-blue-600 dark:text-blue-400">
                💡 Dark Mode ช่วยลดแสงจากหน้าจอ เหมาะสำหรับการเล่นในที่มืด
              </p>
            </div>
          </details>

          <details class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <summary class="font-semibold cursor-pointer text-lg">
              สถิติการเล่นเก็บไว้ที่ไหน? จะดูได้อย่างไร?
            </summary>
            <div class="mt-4 text-gray-700 dark:text-gray-300">
              <p class="mb-3">สถิติการเล่นของคุณเก็บอยู่ในเบราว์เซอร์ (Local Storage):</p>
              <ul class="list-disc pl-6 space-y-2">
                <li><strong>การดู:</strong> กดไอคอนสถิติ (📊) ที่แถบเมนู</li>
                <li><strong>ข้อมูลที่มี:</strong> จำนวนครั้งที่เล่น, อัตราชนะ, การกระจายของคะแนน</li>
                <li><strong>การสำรอง:</strong> ข้อมูลจะหายหากล้างข้อมูลเบราว์เซอร์</li>
              </ul>
              <p class="mt-3 text-sm text-yellow-600 dark:text-yellow-400">
                ⚠️ <strong>หมายเหตุ:</strong> สถิติจะรีเซ็ตหากล้างข้อมูลเบราว์เซอร์หรือเปลี่ยนอุปกรณ์
              </p>
            </div>
          </details>

          <details class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <summary class="font-semibold cursor-pointer text-lg">
              Thwordle รองรับอุปกรณ์ไหนบ้าง?
            </summary>
            <div class="mt-4 text-gray-700 dark:text-gray-300">
              <p class="mb-3">Thwordle รองรับอุปกรณ์ทุกประเภท:</p>
              <div class="grid md:grid-cols-2 gap-4 mt-3">
                <div>
                  <h5 class="font-semibold text-sakura-pink dark:text-sakura-light mb-2">📱 มือถือ</h5>
                  <ul class="text-sm space-y-1">
                    <li>• iOS (Safari, Chrome)</li>
                    <li>• Android (Chrome, Samsung Browser)</li>
                    <li>• การหมุนหน้าจอ landscape</li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-semibold text-sakura-pink dark:text-sakura-light mb-2">💻 คอมพิวเตอร์</h5>
                  <ul class="text-sm space-y-1">
                    <li>• Windows, Mac, Linux</li>
                    <li>• Chrome, Safari, Firefox, Edge</li>
                    <li>• รองรับคีย์บอร์ดฟิสิคัล</li>
                  </ul>
                </div>
              </div>
            </div>
          </details>
        </div>
      </section>

      <!-- การพัฒนาและอนาคต -->
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-6 text-green-600 dark:text-green-400">
          🚀 การพัฒนาและอนาคต
        </h2>
        <div class="space-y-4">
          <details class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <summary class="font-semibold cursor-pointer text-lg">
              จะมี Thwordle English หรือ Thwordle คณิต หรือไม่?
            </summary>
            <div class="mt-4 text-gray-700 dark:text-gray-300">
              <p class="mb-3">อยู่ในแผนการพัฒนา! เรากำลังศึกษาความเป็นไปได้:</p>
              <ul class="list-disc pl-6 space-y-2">
                <li><strong>Thwordle English:</strong> เวอร์ชันภาษาอังกฤษสำหรับผู้เรียนภาษา</li>
                <li><strong>Thwordle Math:</strong> ทายสมการคณิตศาสตร์แทนคำ</li>
                <li><strong>Thwordle Challenge:</strong> โหมดท้าทายพิเศษ</li>
              </ul>
              <p class="mt-3 text-sm text-blue-600 dark:text-blue-400">
                📬 ติดตามข่าวสารอัปเดตที่ Facebook หรือ Twitter ของ Thwordle
              </p>
            </div>
          </details>

          <details class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <summary class="font-semibold cursor-pointer text-lg">
              จะเสนอคำศัพท์ใหม่หรือรายงานบั๊กได้อย่างไร?
            </summary>
            <div class="mt-4 text-gray-700 dark:text-gray-300">
              <p class="mb-3">เรายินดีรับฟังข้อเสนอแนะ!</p>
              <ul class="list-disc pl-6 space-y-2">
                <li><strong>คำศัพท์ใหม่:</strong> แจ้งคำที่น่าสนใจแต่ยังไม่มีในระบบ</li>
                <li><strong>รายงานบั๊ก:</strong> แจ้งปัญหาการทำงานของเกม</li>
                <li><strong>ข้อเสนอแนะ:</strong> ไอเดียฟีเจอร์ใหม่ หรือการปรับปรุง</li>
              </ul>
              <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded">
                <p class="text-sm text-blue-700 dark:text-blue-300">
                  💌 <strong>ติดต่อเรา:</strong> ผ่านโซเชียลมีเดีย หรือส่งอีเมลมาที่ทีมพัฒนา
                </p>
              </div>
            </div>
          </details>
        </div>
      </section>

    </div>

    <!-- การนำทาง -->
    <div class="mt-12 text-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 class="text-xl font-bold mb-4 dark:text-white">🔗 หน้าอื่นๆ ที่น่าสนใจ</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <a href="/#/how-to-play" class="block p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
            <div class="text-2xl mb-2">📖</div>
            <div class="font-semibold text-blue-600 dark:text-blue-400">วิธีเล่น</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">เรียนรู้การเล่นอย่างละเอียด</div>
          </a>
          <a href="/#/archive" class="block p-4 bg-green-50 dark:bg-green-900/30 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
            <div class="text-2xl mb-2">📚</div>
            <div class="font-semibold text-green-600 dark:text-green-400">คลังคำตอบ</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">ดูคำตอบที่ผ่านมาพร้อมคำอธิบาย</div>
          </a>
          <a href="/" class="block p-4 bg-pink-50 dark:bg-pink-900/30 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/50 transition-colors">
            <div class="text-2xl mb-2">🎮</div>
            <div class="font-semibold text-pink-600 dark:text-pink-400">เล่นเลย</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">กลับไปเล่น Thwordle</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</main>