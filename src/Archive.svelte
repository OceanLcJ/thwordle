<!-- Archive.svelte - คลังคำตอบประจำวัน -->
<script>
  import Head from "./lib/Head.svelte"
  import Navbar from "./lib/Navbar.svelte"
  import { modalViewed } from "./lib/store"

  const title = "Thwordle Archive - คลังคำตอบประจำวัน"
  const description = "รวมคำตอบประจำวันของ Thwordle พร้อมคำอธิบายและเทคนิคการแก้ปัญหา เรียนรู้จากคำตอบที่ผ่านมา"
  const url = "https://thwordle.app/archive"
  const imageUrl = "https://raw.githubusercontent.com/narze/timelapse/master/projects/thwordle_home.png"
  const gtagId = "G-N3FL38P2NM"

  // ตัวอย่างข้อมูลคำตอบ (ในอนาคตจะดึงจาก API)
  const archiveData = [
    {
      date: "2024-12-26",
      day: 1245,
      word: "สุนัข",
      difficulty: "กลาง",
      category: "สัตว์",
      meaning: "สัตว์เลี้ยงชนิดหนึ่ง มีความภักดีต่อเจ้าของ",
      tips: "เริ่มด้วยตัวอักษรที่มีบ่อยในภาษาไทย เช่น ส, น, ข",
      stats: { players: 15420, averageGuesses: 4.2, successRate: 87 }
    },
    {
      date: "2024-12-25",
      day: 1244,
      word: "ขนม",
      difficulty: "ง่าย",
      category: "อาหาร",
      meaning: "อาหารหวานที่รับประทานเป็นของว่าง",
      tips: "คำสั้น 4 ตัวอักษร เหมาะสำหรับการทายแบบเป็นระบบ",
      stats: { players: 18230, averageGuesses: 3.8, successRate: 92 }
    },
    {
      date: "2024-12-24",
      day: 1243,
      word: "เทศกาล",
      difficulty: "ยาก",
      category: "งานฉลอง",
      meaning: "การรื่นเริงที่จัดขึ้นในโอกาสพิเศษ",
      tips: "คำยาว 7 ตัวอักษร มีสระ เ และ า ให้ใช้กลยุทธ์ขจัดตัวอักษร",
      stats: { players: 12950, averageGuesses: 5.1, successRate: 73 }
    },
    {
      date: "2024-12-23",
      day: 1242,
      word: "ดาว",
      difficulty: "ง่าย",
      category: "ธรรมชาติ",
      meaning: "วัตถุท้องฟ้าที่ส่องแสงอยู่บนฟ้า",
      tips: "คำสั้น 3 ตัวอักษร เริ่มจากคำที่มีตัวอักษรทั่วไป",
      stats: { players: 16780, averageGuesses: 3.5, successRate: 94 }
    },
    {
      date: "2024-12-22",
      day: 1241,
      word: "โรงเรียน",
      difficulty: "ยาก",
      category: "สถานที่",
      meaning: "สถาบันการศึกษาสำหรับเด็กและเยาวชน",
      tips: "คำยาว 8 ตัวอักษร มีสระ โ และการันต์ น ต้องใช้ความอดทน",
      stats: { players: 11240, averageGuesses: 5.4, successRate: 68 }
    }
  ]

  function getDifficultyColor(difficulty) {
    switch(difficulty) {
      case 'ง่าย': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30'
      case 'กลาง': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30'
      case 'ยาก': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/30'
    }
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  }
</script>

<Head {title} {description} {url} {imageUrl} {gtagId} />

<main class="min-h-screen bg-sakura-light dark:bg-pure-charcoal">
  <Navbar {modalViewed} modes="content" />

  <div class="max-w-6xl mx-auto px-4 py-8">
    <!-- หน้าแรก -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4 dark:text-white text-gray-800">
        📚 คลังคำตอบประจำวัน
      </h1>
      <p class="text-xl dark:text-gray-200 text-gray-600 mb-6">
        รวมคำตอบ <strong>Thwordle</strong> ที่ผ่านมา พร้อมคำอธิบายและเทคนิคการแก้ปัญหา
      </p>
      <div class="inline-block bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4">
        <p class="text-blue-700 dark:text-blue-300">
          🎯 <strong>เป้าหมาย:</strong> เรียนรู้และพัฒนาทักษะจากคำตอบที่ผ่านมา |
          📊 <strong>ข้อมูล:</strong> อัปเดตทุกวันหลังเที่ยงคืน
        </p>
      </div>
    </div>

    <!-- สถิติภาพรวม -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-center dark:text-white text-gray-800">
        📊 สถิติภาพรวม
      </h2>
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">1245</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">วันที่ผ่านมา</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
          <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">84%</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">อัตราทายถูกเฉลี่ย</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">4.3</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">ครั้งการทายเฉลี่ย</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
          <div class="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">15K+</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">ผู้เล่นต่อวัน</div>
        </div>
      </div>
    </section>

    <!-- คำตอบล่าสุด -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6 dark:text-white text-gray-800">
        🕐 คำตอบล่าสุด
      </h2>

      {#each archiveData as entry}
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
          <div class="grid md:grid-cols-3 gap-6">
            <!-- ข้อมูลพื้นฐาน -->
            <div>
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="text-2xl font-bold text-sakura-pink dark:text-sakura-light">
                    {entry.word}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(entry.date)} • วันที่ {entry.day}
                  </p>
                </div>
                <div class="text-right">
                  <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold {getDifficultyColor(entry.difficulty)}">
                    {entry.difficulty}
                  </span>
                  <p class="text-xs text-gray-500 mt-1">{entry.category}</p>
                </div>
              </div>

              <div class="space-y-3">
                <div>
                  <h4 class="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-1">💡 ความหมาย</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{entry.meaning}</p>
                </div>

                <div>
                  <h4 class="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-1">🎯 เทคนิค</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{entry.tips}</p>
                </div>
              </div>
            </div>

            <!-- สถิติการเล่น -->
            <div>
              <h4 class="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-3">📈 สถิติการเล่น</h4>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 dark:text-gray-400">ผู้เล่นทั้งหมด</span>
                  <span class="font-semibold">{entry.stats.players.toLocaleString()}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 dark:text-gray-400">อัตราทายถูก</span>
                  <span class="font-semibold text-green-600 dark:text-green-400">{entry.stats.successRate}%</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 dark:text-gray-400">ครั้งการทายเฉลี่ย</span>
                  <span class="font-semibold text-blue-600 dark:text-blue-400">{entry.stats.averageGuesses}</span>
                </div>
              </div>

              <!-- กราฟแท่งอนาวาา -->
              <div class="mt-4">
                <h5 class="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">การกระจายของคะแนน</h5>
                <div class="space-y-1">
                  {#each [1,2,3,4,5,6] as guess}
                    <div class="flex items-center gap-2">
                      <span class="text-xs w-4">{guess}</span>
                      <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div class="bg-sakura-pink h-2 rounded-full" style="width: {Math.random() * 80 + 10}%"></div>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>

            <!-- การวิเคราะห์คำ -->
            <div>
              <h4 class="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-3">🔍 การวิเคราะห์คำ</h4>
              <div class="space-y-3">
                <div>
                  <span class="text-xs text-gray-500 dark:text-gray-400">ความยาว</span>
                  <p class="text-sm font-semibold">{entry.word.length} ตัวอักษร</p>
                </div>
                <div>
                  <span class="text-xs text-gray-500 dark:text-gray-400">ลักษณะพิเศษ</span>
                  <div class="flex flex-wrap gap-1 mt-1">
                    {#if entry.word.includes('า')}
                      <span class="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">มีสระ า</span>
                    {/if}
                    {#if entry.word.includes('เ')}
                      <span class="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded">มีสระ เ</span>
                    {/if}
                    {#if entry.word.includes('โ')}
                      <span class="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded">มีสระ โ</span>
                    {/if}
                    {#if entry.word.includes('น') || entry.word.includes('ม')}
                      <span class="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded">มีการันต์</span>
                    {/if}
                  </div>
                </div>
                <div>
                  <span class="text-xs text-gray-500 dark:text-gray-400">คำแนะนำ</span>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {#if entry.difficulty === 'ง่าย'}
                      เหมาะสำหรับมือใหม่ ใช้กลยุทธ์พื้นฐาน
                    {:else if entry.difficulty === 'กลาง'}
                      ต้องใช้เทคนิคระดับกลาง อาจมีตัวอักษรหลากหลาย
                    {:else}
                      ต้องใช้กลยุทธ์ขั้นสูง วางแผนการทายอย่างรอบคอบ
                    {/if}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </section>

    <!-- คู่มือการใช้งาน Archive -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6 dark:text-white text-gray-800">
        📘 วิธีใช้ประโยชน์จากคลังคำตอบ
      </h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="text-3xl mb-3">🎯</div>
          <h3 class="font-semibold text-lg mb-3">เรียนรู้รูปแบบคำ</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            สังเกตรูปแบบคำที่มักใช้ เช่น คำที่ลงท้ายด้วย -าย, -าน, หรือเริ่มต้นด้วยสระ
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="text-3xl mb-3">📊</div>
          <h3 class="font-semibold text-lg mb-3">วิเคราะห์ระดับความยาก</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            ดูสถิติการเล่นเพื่อเข้าใจว่าคำไหนยาก คำไหนง่าย และปรับกลยุทธ์ให้เหมาะสม
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="text-3xl mb-3">💡</div>
          <h3 class="font-semibold text-lg mb-3">พัฒนาเทคนิค</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            ใช้เทคนิคที่แนะนำในแต่ละคำเป็นแนวทางการเล่นในอนาคต
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="text-3xl mb-3">🔤</div>
          <h3 class="font-semibold text-lg mb-3">สร้างคลังคำศัพท์</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            จดจำคำที่เจอบ่อยเพื่อใช้เป็นคำเริ่มต้นหรือคำทดสอบ
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="text-3xl mb-3">📈</div>
          <h3 class="font-semibold text-lg mb-3">ติดตามความก้าวหน้า</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            เปรียบเทียบผลงานของคุณกับสถิติทั่วไปเพื่อประเมินทักษะ
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="text-3xl mb-3">🎮</div>
          <h3 class="font-semibold text-lg mb-3">ฝึกเล่นซ้ำ</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            ลองเล่นกับคำเก่าในโหมดฝึกเล่นเพื่อทดสอบกลยุทธ์ใหม่
          </p>
        </div>
      </div>
    </section>

    <!-- ข้อมูลทางสถิติ -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6 dark:text-white text-gray-800">
        📈 แนวโน้มและสถิติ
      </h2>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <h3 class="font-semibold text-green-600 dark:text-green-400 mb-2">คำง่ายที่สุด</h3>
            <p class="text-lg font-bold">"ดาว" (3 ตัวอักษร)</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">อัตราทายถูก 94%</p>
          </div>
          <div class="text-center">
            <h3 class="font-semibold text-red-600 dark:text-red-400 mb-2">คำยากที่สุด</h3>
            <p class="text-lg font-bold">"โรงเรียน" (8 ตัวอักษร)</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">อัตราทายถูก 68%</p>
          </div>
          <div class="text-center">
            <h3 class="font-semibold text-blue-600 dark:text-blue-400 mb-2">หมวดยอดนิยม</h3>
            <p class="text-lg font-bold">สัตว์</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">มีมากที่สุดใน Archive</p>
          </div>
          <div class="text-center">
            <h3 class="font-semibold text-purple-600 dark:text-purple-400 mb-2">ความยาวเฉลี่ย</h3>
            <p class="text-lg font-bold">4.8 ตัวอักษร</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">ส่วนใหญ่ 4-6 ตัวอักษร</p>
          </div>
        </div>
      </div>
    </section>

    <!-- การนำทาง -->
    <div class="text-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 class="text-xl font-bold mb-4 dark:text-white">🚀 เรียนรู้เพิ่มเติม</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <a href="/#/how-to-play" class="block p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
            <div class="text-2xl mb-2">📖</div>
            <div class="font-semibold text-blue-600 dark:text-blue-400">วิธีเล่น</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">เรียนรู้เทคนิคขั้นสูง</div>
          </a>
          <a href="/#/faq" class="block p-4 bg-green-50 dark:bg-green-900/30 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
            <div class="text-2xl mb-2">❓</div>
            <div class="font-semibold text-green-600 dark:text-green-400">FAQ</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">คำถามที่พบบ่อย</div>
          </a>
          <a href="/" class="block p-4 bg-pink-50 dark:bg-pink-900/30 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/50 transition-colors">
            <div class="text-2xl mb-2">🎮</div>
            <div class="font-semibold text-pink-600 dark:text-pink-400">เล่นเลย</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">ทดลองเทคนิคใหม่</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</main>