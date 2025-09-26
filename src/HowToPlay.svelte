<!-- HowToPlay.svelte - วิธีเล่นหน้าโดยละเอียด -->
<script>
  import Head from "./lib/Head.svelte"
  import Navbar from "./lib/Navbar.svelte"

  const title = "How to Play Thwordle - วิธีเล่นเวอเดิ้ลภาษาไทย"
  const description = "เรียนรู้วิธีเล่น Thwordle ตั้งแต่เริ่มต้น กติกา เทคนิค และเคล็ดลับการทายคำภาษาไทยให้แม่นยำ"
  const url = "https://thwordle.app/how-to-play"
  const imageUrl = "https://raw.githubusercontent.com/narze/timelapse/master/projects/thwordle_home.png"
  const gtagId = "G-N3FL38P2NM"
</script>

<Head {title} {description} {url} {imageUrl} {gtagId} />

<main class="min-h-screen bg-sakura-light dark:bg-pure-charcoal">
  <Navbar modes="content" />

  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- หน้าแรก -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4 dark:text-white text-gray-800">
        📖 วิธีเล่น Thwordle
      </h1>
      <p class="text-xl dark:text-gray-200 text-gray-600 mb-6">
        คู่มือการเล่น <strong>เวอเดิ้ลภาษาไทย</strong> อย่างละเอียด สำหรับทั้งมือใหม่และผู้เล่นขั้นสูง
      </p>
      <div class="inline-block bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4">
        <p class="text-blue-700 dark:text-blue-300">
          ⏱️ <strong>เวลาอ่าน:</strong> ประมาณ 5-7 นาที |
          🎯 <strong>ระดับ:</strong> เหมาะสำหรับทุกคน
        </p>
      </div>
    </div>

    <!-- เป้าหมายของเกม -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-6 text-sakura-pink dark:text-sakura-light">
        🎯 เป้าหมายของเกม
      </h2>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">หลักการพื้นฐาน</h3>
            <ul class="space-y-3 text-gray-700 dark:text-gray-300">
              <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span><strong>ทายคำภาษาไทย</strong> ที่ถูกต้องภายใน <strong>6 ครั้ง</strong></span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>คำตอบมี <strong>ความยาวคงที่</strong> (แตกต่างกันแต่ละวัน)</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>ใช้ <strong>คำศัพท์ภาษาไทยมาตรฐาน</strong> จากพจนานุกรม</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>เล่นได้ <strong>วันละ 1 ครั้ง</strong> (คำตอบเปลี่ยนทุกเที่ยงคืน)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">จุดเด่นของ Thwordle</h3>
            <div class="space-y-3">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">🇹🇭</div>
                <span class="text-gray-700 dark:text-gray-300">รองรับ<strong>สระ วรรณยุกต์</strong> และ<strong>ตัวการันต์</strong></span>
              </div>
              <div class="flex items-center">
                <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">⌨️</div>
                <span class="text-gray-700 dark:text-gray-300">คีย์บอร์ด<strong>ภาษาไทยเฉพาะ</strong></span>
              </div>
              <div class="flex items-center">
                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">🧠</div>
                <span class="text-gray-700 dark:text-gray-300">ช่วย<strong>พัฒนาทักษะภาษาไทย</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- กติกาการเล่นแบบละเอียด -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-6 text-warm-orange dark:text-warm-light">
        🎮 กติกาการเล่นแบบละเอียด
      </h2>

      <!-- ระบบสี -->
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">🎨 ระบบสีและความหมาย</h3>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="grid md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="w-16 h-16 bg-sakura-pink rounded-lg mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">ก</div>
              <h4 class="font-semibold text-sakura-pink dark:text-sakura-light mb-2">สีชมพู (Correct)</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                ตัวอักษร<strong>ถูกต้อง</strong>และอยู่ใน<strong>ตำแหน่งที่ถูก</strong>
              </p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-warm-orange rounded-lg mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">า</div>
              <h4 class="font-semibold text-warm-orange dark:text-warm-light mb-2">สีส้ม (Present)</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                <strong>มีตัวอักษรนี้</strong>ในคำตอบ แต่อยู่<strong>ผิดตำแหน่ง</strong>
              </p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-gray-400 rounded-lg mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">ร</div>
              <h4 class="font-semibold text-gray-600 dark:text-gray-400 mb-2">สีเทา (Absent)</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                <strong>ไม่มีตัวอักษรนี้</strong>ในคำตอบเลย
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ตัวอย่างการเล่นทีละขั้นตอน -->
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">📝 ตัวอย่างการเล่นทีละขั้นตอน</h3>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <p class="text-center mb-6 text-gray-600 dark:text-gray-400">
            สมมติว่าคำตอบคือ <strong>"หมา"</strong> (3 ตัวอักษร) มาดูตัวอย่างการเล่น:
          </p>

          <div class="space-y-6">
            <!-- การทาย 1 -->
            <div class="border dark:border-gray-600 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="font-semibold">การทายครั้งที่ 1: "กบิ"</h4>
                <span class="text-sm text-red-500">❌ ผิด</span>
              </div>
              <div class="flex justify-center gap-2 mb-3">
                <div class="w-12 h-12 bg-gray-400 border-2 border-gray-400 rounded flex items-center justify-center text-white font-bold">ก</div>
                <div class="w-12 h-12 bg-gray-400 border-2 border-gray-400 rounded flex items-center justify-center text-white font-bold">บ</div>
                <div class="w-12 h-12 bg-gray-400 border-2 border-gray-400 rounded flex items-center justify-center text-white font-bold">ิ</div>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
                <strong>วิเคราะห์:</strong> ไม่มีตัวอักษรใดถูกเลย คำตอบไม่มี ก, บ, ิ
              </p>
            </div>

            <!-- การทาย 2 -->
            <div class="border dark:border-gray-600 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="font-semibold">การทายครั้งที่ 2: "หนา"</h4>
                <span class="text-sm text-orange-500">⚠️ ใกล้แล้ว</span>
              </div>
              <div class="flex justify-center gap-2 mb-3">
                <div class="w-12 h-12 bg-sakura-pink border-2 border-sakura-pink rounded flex items-center justify-center text-white font-bold">ห</div>
                <div class="w-12 h-12 bg-gray-400 border-2 border-gray-400 rounded flex items-center justify-center text-white font-bold">น</div>
                <div class="w-12 h-12 bg-warm-orange border-2 border-warm-orange rounded flex items-center justify-center text-white font-bold">า</div>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
                <strong>วิเคราะห์:</strong> "ห" ถูกตำแหน่ง, "า" มีในคำตอบแต่ผิดตำแหน่ง, "น" ไม่มีในคำตอบ
              </p>
            </div>

            <!-- การทาย 3 -->
            <div class="border dark:border-gray-600 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="font-semibold">การทายครั้งที่ 3: "หมา"</h4>
                <span class="text-sm text-green-500">✅ ถูกต้อง!</span>
              </div>
              <div class="flex justify-center gap-2 mb-3">
                <div class="w-12 h-12 bg-sakura-pink border-2 border-sakura-pink rounded flex items-center justify-center text-white font-bold">ห</div>
                <div class="w-12 h-12 bg-sakura-pink border-2 border-sakura-pink rounded flex items-center justify-center text-white font-bold">ม</div>
                <div class="w-12 h-12 bg-sakura-pink border-2 border-sakura-pink rounded flex items-center justify-center text-white font-bold">า</div>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
                <strong>ผลลัพธ์:</strong> ทายถูกใน 3 ครั้ง! 🎉
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- เทคนิคและกลยุทธ์ -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-6 text-elegant-grey dark:text-gray-300">
        🧠 เทคนิคและกลยุทธ์ขั้นสูง
      </h2>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- เทคนิคพื้นฐาน -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 class="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
            🎯 เทคนิคสำหรับมือใหม่
          </h3>
          <ul class="space-y-3 text-sm">
            <li class="flex items-start">
              <span class="text-green-500 mr-2 mt-0.5">•</span>
              <div>
                <strong>เริ่มด้วยคำที่มีสระ-พยัญชนะหลากหลาย</strong><br>
                <span class="text-gray-600 dark:text-gray-400">เช่น "เสาร์" "อาหาร" เพื่อทดสอบตัวอักษรหลายตัว</span>
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2 mt-0.5">•</span>
              <div>
                <strong>หลีกเลี่ยงการซ้ำตัวอักษรที่แสดงสีเทา</strong><br>
                <span class="text-gray-600 dark:text-gray-400">ประหยัดครั้งการทายโดยไม่ใช้ตัวอักษรที่รู้แล้วว่าไม่มี</span>
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2 mt-0.5">•</span>
              <div>
                <strong>ใช้คำพื้นฐานที่คุ้นเคย</strong><br>
                <span class="text-gray-600 dark:text-gray-400">เริ่มจากคำที่ใช้ในชีวิตประจำวัน เช่น สี อาหาร สัตว์</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- เทคนิคขั้นสูง -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 class="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
            ⚡ เทคนิคขั้นสูง
          </h3>
          <ul class="space-y-3 text-sm">
            <li class="flex items-start">
              <span class="text-purple-500 mr-2 mt-0.5">•</span>
              <div>
                <strong>ใช้ "วิธีการขจัด" (Elimination Method)</strong><br>
                <span class="text-gray-600 dark:text-gray-400">ทายคำที่ช่วยขจัดตัวอักษรหลายตัวในครั้งเดียว</span>
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-purple-500 mr-2 mt-0.5">•</span>
              <div>
                <strong>คำนึงถึงรูปแบบคำไทย</strong><br>
                <span class="text-gray-600 dark:text-gray-400">สังเกตลักษณะคำไทย เช่น คำที่ลงท้ายด้วย -าย, -าน</span>
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-purple-500 mr-2 mt-0.5">•</span>
              <div>
                <strong>จำตำแหน่งตัวอักษรสีส้ม</strong><br>
                <span class="text-gray-600 dark:text-gray-400">ใช้ข้อมูลจากตัวอักษรสีส้มวางในตำแหน่งอื่น</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- คำแนะนำพิเศษ -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 class="text-xl font-semibold mb-4 text-orange-600 dark:text-orange-400">
            💡 คำแนะนำพิเศษ
          </h3>
          <div class="space-y-4">
            <div class="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded">
              <h4 class="font-semibold text-yellow-700 dark:text-yellow-300 mb-1">📚 สร้างคลังคำในใจ</h4>
              <p class="text-sm text-yellow-600 dark:text-yellow-400">
                จำคำศัพท์ที่มีตัวอักษรหลากหลาย เช่น "ราชา" "โครง" "สีเขียว"
              </p>
            </div>
            <div class="p-3 bg-blue-50 dark:bg-blue-900/30 rounded">
              <h4 class="font-semibold text-blue-700 dark:text-blue-300 mb-1">⏰ จัดการเวลา</h4>
              <p class="text-sm text-blue-600 dark:text-blue-400">
                ไม่มีขีดจำกัดเวลา แต่ควรคิดให้รอบคอบก่อนยืนยันคำตอบ
              </p>
            </div>
          </div>
        </div>

        <!-- ข้อผิดพลาดที่พบบ่อย -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 class="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
            ⚠️ ข้อผิดพลาดที่ควรหลีกเลี่ยง
          </h3>
          <ul class="space-y-3 text-sm">
            <li class="flex items-start">
              <span class="text-red-500 mr-2 mt-0.5">✗</span>
              <div>
                <strong>ใช้คำที่ไม่มีในพจนานุกรม</strong><br>
                <span class="text-gray-600 dark:text-gray-400">หลีกเลี่ยงคำแปลก คำสแลง หรือชื่อเฉพาะ</span>
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-red-500 mr-2 mt-0.5">✗</span>
              <div>
                <strong>ไม่ใช้ข้อมูลจากการทายก่อนหน้า</strong><br>
                <span class="text-gray-600 dark:text-gray-400">อย่าลืมใช้ความรู้จากสีต่างๆ ที่ได้รับ</span>
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-red-500 mr-2 mt-0.5">✗</span>
              <div>
                <strong>รีบร้อนไม่คิดให้รอบคอบ</strong><br>
                <span class="text-gray-600 dark:text-gray-400">ใช้เวลาวิเคราะห์ก่อนยืนยันคำตอบ</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- การใช้งานคีย์บอร์ด -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-6 text-green-600 dark:text-green-400">
        ⌨️ การใช้งานคีย์บอร์ด
      </h2>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-xl font-semibold mb-4">🖱️ คีย์บอร์ดบนหน้าจอ</h3>
            <ul class="space-y-2 text-sm">
              <li>• <strong>คลิกตัวอักษร</strong> เพื่อพิมพ์</li>
              <li>• <strong>กด "⬅"</strong> เพื่อลบตัวอักษร</li>
              <li>• <strong>กด "↵"</strong> เพื่อยืนยันคำตอบ</li>
              <li>• <strong>กด "⇧"</strong> เพื่อเปลี่ยนคีย์บอร์ด</li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-4">💻 คีย์บอร์ดคอมพิวเตอร์</h3>
            <ul class="space-y-2 text-sm">
              <li>• <strong>พิมพ์ตรงๆ</strong> (ตั้งภาษาไทย)</li>
              <li>• <strong>Backspace</strong> เพื่อลบ</li>
              <li>• <strong>Enter</strong> เพื่อยืนยัน</li>
              <li>• สะดวกและรวดเร็วกว่า</li>
            </ul>
          </div>
        </div>

        <!-- คำแนะนำการตั้งค่า -->
        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <h4 class="font-semibold text-blue-700 dark:text-blue-300 mb-2">🔧 คำแนะนำการตั้งค่า</h4>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Windows:</strong>
              <ul class="list-disc pl-4 text-blue-600 dark:text-blue-400">
                <li>กด Windows + Space เพื่อเปลี่ยนภาษา</li>
                <li>ตั้งค่าภาษาไทยใน Control Panel</li>
              </ul>
            </div>
            <div>
              <strong>Mac:</strong>
              <ul class="list-disc pl-4 text-blue-600 dark:text-blue-400">
                <li>กด Cmd + Space เพื่อเปลี่ยนภาษา</li>
                <li>ตั้งค่าใน System Preferences</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- การปรับปรุงทักษะ -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
        📈 การปรับปรุงทักษะ
      </h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
          <div class="text-4xl mb-4">🏃‍♂️</div>
          <h3 class="text-lg font-semibold mb-3">ฝึกเล่นบ่อยๆ</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            ใช้โหมด "ฝึกเล่น" เพื่อพัฒนาทักษะโดยไม่มีข้อจำกัด
          </p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
          <div class="text-4xl mb-4">📖</div>
          <h3 class="text-lg font-semibold mb-3">เพิ่มพูนคำศัพท์</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            อ่านหนังสือ นิตยสาร เพื่อเรียนรู้คำศัพท์ใหม่ๆ
          </p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
          <div class="text-4xl mb-4">👥</div>
          <h3 class="text-lg font-semibold mb-3">แชร์และเรียนรู้</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            แชร์ผลและเรียนรู้จากกลยุทธ์ของเพื่อนๆ
          </p>
        </div>
      </div>
    </section>

    <!-- การนำทาง -->
    <div class="text-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 class="text-xl font-bold mb-4 dark:text-white">🚀 พร้อมเล่นแล้ว?</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <a href="/" class="block p-4 bg-pink-50 dark:bg-pink-900/30 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/50 transition-colors">
            <div class="text-2xl mb-2">🎮</div>
            <div class="font-semibold text-pink-600 dark:text-pink-400">เล่นเลย!</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">ท้าทายกับคำใหม่วันนี้</div>
          </a>
          <a href="/#/training" class="block p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
            <div class="text-2xl mb-2">🏋️‍♂️</div>
            <div class="font-semibold text-blue-600 dark:text-blue-400">ฝึกเล่น</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">ฝึกทักษะไม่จำกัด</div>
          </a>
          <a href="/#/faq" class="block p-4 bg-green-50 dark:bg-green-900/30 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
            <div class="text-2xl mb-2">❓</div>
            <div class="font-semibold text-green-600 dark:text-green-400">FAQ</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">คำถามที่พบบ่อย</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</main>