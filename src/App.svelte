<script lang="ts">
  import { sineInOut } from "svelte/easing"

  import Head from "./lib/Head.svelte"
  import Navbar from "./lib/Navbar.svelte"
  import {
    CharState,
    generateAlphabetStateMap,
    getShareResults,
    splitWord,
    validateWord,
  } from "./lib/Wordle"
  import { onMount, tick } from "svelte"
  import Modal from "./lib/Modal.svelte"
  import { data, modalViewed, settings } from "./lib/store"
  import AlertModal from "./lib/AlertModal.svelte"
  import { layouts } from "./lib/layouts"

  const title = "Thwordle : Thai Wordle เวอเดิ้ลภาษาไทย"

  const description = "Thwordle : เวอเดิ้ลภาษาไทย"
  const url = "https://thwordle.app"
  const imageUrl =
    "https://raw.githubusercontent.com/narze/timelapse/master/projects/thwordle_home.png"

  const gtagId = "G-F2Q37REQE6"
  let words = []

  $: rows = layouts[$settings.layout].rows
  $: rowsShifted = layouts[$settings.layout].rowsShifted

  // January 19, 2022 Game Epoch
  const epochMs = 1642525200000
  const now = Date.now()
  const msInDay = 86400000
  const dateIndex = Math.floor((now - epochMs) / msInDay)

  const attemptLimit = 6

  let input = ""
  $: solution = words[dateIndex % words.length] || ""
  let attempts: string[] = $data[dateIndex]?.attempts || []
  $: validations = attempts.map((word) => validateWord(word, solution))
  let gameEnded = !!$data[dateIndex]?.win || !!$data[dateIndex]?.lose
  let attemptsContainer
  let copied = false
  let lose = false
  let win = false
  let shifted = false
  let alertMessage = ""
  let showAlert = false
  let showSpecialModal = false
  let focusOnTextInput = false
  let dict: string[] = []
  let alertDelay = 1500

  $: attemptsLength = attempts.length
  $: solutionLength = splitWord(solution).length
  $: alertDelay = 500 + 150 * solutionLength
  $: currentRows = shifted ? rowsShifted : rows
  $: inverseRows = shifted ? rows : rowsShifted
  $: alphabetStateMap = generateAlphabetStateMap(
    [...rows, ...rowsShifted].flat(),
    validations.flat()
  )
  $: input = input.replace(/[^ก-๙]/g, "")
  $: splittedInput = splitWord(input)
  $: {
    data.set({ ...$data, [`${dateIndex}`]: { attempts, win, lose } })
  }
  $: {
    const validation = validations.slice(-1)[0]

    if (validation) {
      // if all validation is correct
      let allMatched = true
      validation.forEach((v) => {
        if (v.correct !== CharState.Correct) {
          allMatched = false
        }
      })

      if (allMatched) {
        if (!gameEnded) {
          const score = attemptLimit + 1 - validations.length
          // console.log({ score })
          window?.gtag("event", "post_score", { score })
        }

        setTimeout(() => {
          showAlertMessage("คุณชนะแล้ว!")
          gameEnded = true
          win = true
        }, alertDelay)
      } else if (attemptsLength >= attemptLimit) {
        if (!gameEnded) {
          const score = 0
          // console.log({ score })
          window?.gtag("event", "post_score", { score })
        }

        setTimeout(() => {
          showAlertMessage(`คุณแพ้แล้ว คำประจำวันนี้คือ "${solution}"`)
          gameEnded = true
          lose = true
        }, alertDelay)
      }
    }
  }

  // $: console.log(alphabetsLayout)

  // $: validate = validateWord(input, solution)

  const colors = {
    [CharState.Correct]: "bg-sakura-pink border-sakura-pink dark:bg-sakura-dark dark:border-sakura-dark text-white",
    [CharState.OutOfPlace]:
      "bg-warm-orange border-warm-orange dark:bg-warm-dark dark:border-warm-dark text-white",
    [CharState.Wrong]: "bg-elegant-grey border-elegant-grey dark:bg-elegant-dark dark:border-elegant-dark text-white",
    [CharState.NotUsed]: "bg-pure-white text-black dark:bg-pure-charcoal dark:text-white border-gray-200 dark:border-gray-600",
  }

  onMount(async () => {
    checkDarkMode()

    dict = (await import("./lib/dict.json")).default
    words = await getWords()
  })

  function checkDarkMode() {
    if ($settings.darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  async function getWords() {
    const res = await fetch(`/words.json`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    const json = await res.json()

    if (res.ok) {
      return json.words
    } else {
      throw new Error(await res.text())
    }
  }

  async function submit() {
    if (gameEnded) {
      return
    }

    // Check if the length is valid
    if (splitWord(input).length != solutionLength) {
      showAlertMessage("กรุณากรอกคำตอบ")
      return
    }

    // Check if the word is in the dict
    if (!wordExists(input)) {
      showAlertMessage("คำนี้ไม่มีในพจนานุกรม")
      return
    }

    // Add to solution array
    attempts = [...attempts, input]

    const validation = validateWord(input, solution)
    validations = [...validations, validation]

    if (validations.length == 1) {
      window?.gtag("event", "first_guess", {
        event_category: "general",
        event_label: input,
      })
    }

    input = ""

    await tick()
    attemptsContainer.scrollTop = attemptsContainer.scrollHeight
  }

  function copyResult() {
    const results = $settings.darkMode
      ? getShareResults(validations).map((result) => result.replaceAll("⬜", "⬛"))
      : getShareResults(validations)

    const score: string = (lose ? "X" : `${results.length}`) + `/${attemptLimit}`

    navigator.clipboard.writeText(`#Thwordle ${dateIndex + 1} ${score}\n\n${results.join("\n")}`)

    copied = true

    setTimeout(() => {
      copied = false
    }, 2000)
  }

  function wordExists(input: string) {
    if (words.includes(input)) {
      return true
    }
    if (dict.includes(input)) {
      return true
    }

    for (let i = 2; i < input.length - 1; i++) {
      const left = input.slice(0, i)
      const right = input.slice(i)
      if (dict.includes(left) && dict.includes(right)) {
        return true
      }
    }

    return false
  }

  function spinAnimation(_node, { duration, delay }) {
    return {
      delay,
      duration,
      css: (t) => {
        const eased = sineInOut(t)
        const bg = eased <= 0.5 ? "background-color: transparent;" : ""
        const border = eased <= 0.5 ? "border-color: rgb(229, 231, 235);" : ""

        return `
          ${bg}
          ${border}
          transform: rotateX(${eased * 360}deg);
        `
      },
    }
  }

  function showAlertMessage(message: string) {
    alertMessage = message

    showAlert = true
  }

  function inputKey(alphabet: string) {
    if (gameEnded) {
      return
    }

    if (alphabet === "⇧") {
      shifted = !shifted
    } else if (alphabet === "⬅") {
      input = input.slice(0, -1)
    } else if (alphabet === "↵" || alphabet === "Enter") {
      submit()
    } else if (
      // ตรวจสอบก่อนด้วยว่าสามารถใส่ตัวอักษรเพิ่มได้หรือไม่
      // \u0E31\u0E34-\u0E3A\u0E47-\u0EC4 คือพวกนสระบนล่างหรือวรรณยุกต์
      alphabet.match(/[\u0E31\u0E34-\u0E3A\u0E47-\u0EC4]/) ||
      splittedInput.length < solutionLength
    ) {
      input += alphabet
      shifted = false
    }
  }

  document.addEventListener("keydown", ({ key }) => {
    if (focusOnTextInput) {
      return
    }

    if (key == "Backspace") {
      inputKey("⬅")
    } else if (key == "Enter") {
      inputKey("↵")
    } else {
      inputKey(key)
    }
  })
</script>

<Head {title} {description} {url} {imageUrl} {gtagId} />

<main class="container min-h-screen flex flex-col items-center bg-sakura-light dark:bg-pure-charcoal">
  <Navbar {modalViewed} modes="daily" />

  <span class="flex gap-4 dark:text-white my-2">
    <span>วันที่ {dateIndex + 1}</span>
    <span>ครั้งที่ {attemptsLength}/{attemptLimit}</span>
  </span>

  <!-- DEBUG: Solution word -->
  <!-- <input type="text" class="border" bind:value={solution} /> -->
  <!-- Check Solution -->
  <div class="attempts" bind:this={attemptsContainer}>
    {#each attempts as input, n (n)}
      <div class="flex justify-center my-1">
        {#each validateWord(input, solution) as { correct, char }, idx (idx)}
          <div
            class={`${
              colors[correct] || "bg-white"
            } attempt-key border-solid border-2 flex items-center justify-center mx-0.5 text-3xl font-bold text-white rounded `}
            in:spinAnimation={{ duration: 500, delay: 150 * idx }}
          >
            {char ?? ""}
          </div>
        {/each}
      </div>
    {/each}

    {#if !gameEnded}
      <div class="flex justify-center my-1">
        {#each new Array(solutionLength).fill(0) as _, i}
          <div
            class={`bg-white attempt-key border-solid border-2 flex items-center justify-center mx-0.5 text-3xl font-bold rounded dark:bg-pure-charcoal dark:text-white border-gray-200 dark:border-gray-600`}
          >
            {splittedInput[i] || ""}
          </div>
        {/each}
      </div>
    {/if}

    {#each new Array(Math.max(0, attemptLimit - attempts.length - 1)) as _, n (n)}
      <div class="flex justify-center my-1">
        {#each new Array(solutionLength).fill(0) as _}
          <div
            class={`bg-white attempt-key border-solid border-2 flex items-center justify-center mx-0.5 text-3xl font-bold text-white rounded dark:bg-pure-charcoal dark:text-white border-gray-200 dark:border-gray-600`}
          />
        {/each}
      </div>
    {/each}
  </div>

  <!-- Layout -->
  <div class="layout my-4 w-full px-1 max-w-2xl">
    <input
      type="text"
      class="w-full sm:w-[400px] block border border-sakura-pink mb-3.5 px-6 py-2 mx-auto text-center bg-white dark:bg-pure-charcoal dark:text-white dark:placeholder:text-white focus:ring-2 focus:ring-sakura-pink focus:border-sakura-pink rounded-md"
      on:keypress|preventDefault={(e) => {
        inputKey(e.key)
      }}
      on:blur={() => {
        focusOnTextInput = false
      }}
      on:focus={() => {
        focusOnTextInput = true
      }}
      bind:value={input}
      disabled={gameEnded}
      placeholder="คลิกที่นี่เพื่อใช้คีย์บอร์ด"
    />
    {#each currentRows as row, rowIndex}
      <div class="w-full flex flex-row justify-center touch-manipulation">
        {#each row as alphabet, alphabetIndex}
          <div class="flex-grow flex m-0.5 relative">
            <button
              on:click={() => inputKey(alphabet)}
              class={colors[alphabetStateMap[alphabet]] +
                " " +
                `${"⇧↵⬅".includes(alphabet) ? "border-elegant-grey dark:border-elegant-dark" : ""}` +
                " " +
                `${$settings.layout === "ก-ฮ" ? "layout-no-shift" : ""}` +
                " " +
                "flex-grow layout-key border-solid border-2 flex items-end justify-end text-xl font-bold rounded"}
            >
              {alphabet}
              <!-- Inverse character -->
              {#if currentRows[rowIndex][alphabetIndex] !== inverseRows[rowIndex][alphabetIndex]}
                <div
                  class={colors[alphabetStateMap[inverseRows[rowIndex][alphabetIndex]]] +
                    " absolute top-1 left-1 border-solid border-1 rounded text-sm leading-4 p-0.5 w-4"}
                >
                  {inverseRows[rowIndex][alphabetIndex]}
                </div>
              {/if}
            </button>
          </div>
        {/each}
      </div>
    {/each}
  </div>

  <!-- Input word -->
  <div class="share-button text-center flex">
    {#if gameEnded}
      <button
        on:click={copyResult}
        class="flex items-center justify-center rounded border mx-2 p-2.5 bg-sakura-pink border-sakura-pink text-white text-xs font-bold cursor-pointer hover:bg-sakura-dark active:bg-sakura-dark"
      >
        {copied ? "Copied" : "Share"}
      </button>

      <button
        on:click={() => {
          showSpecialModal = !showSpecialModal
        }}
        class="flex items-center justify-center rounded border mx-2 p-3 bg-warm-orange border-warm-orange text-white text-xs font-bold cursor-pointer hover:bg-warm-dark active:bg-warm-dark"
      >
        Special
      </button>
    {/if}
  </div>

  <!-- Extended Content Section - Second Screen -->
  <section class="w-full max-w-4xl mx-auto px-4 py-8 mt-16 dark:text-gray-200 text-gray-700">
    <!-- Hero Description -->
    <div class="text-center mb-12">
      <h2 class="text-2xl font-bold mb-4 dark:text-white text-gray-800">
        🎯 <strong>Thwordle</strong> - เกมทายคำภาษาไทยที่สนุกที่สุด
      </h2>
      <p class="text-lg mb-4">
        <strong>Thwordle</strong> เป็นเกมทายคำภาษาไทยที่สนุกและท้าทาย เหมาะสำหรับผู้ที่ต้องการฝึกทักษะภาษาไทย
      </p>
      <p class="text-base">
        เล่น <strong>Thwordle</strong> ฟรีทุกวัน ทายคำใหม่ได้ทุก 24 ชั่วโมง พร้อมแชร์ผลการเล่นให้เพื่อนๆ ได้เห็น
      </p>
    </div>

    <!-- How to Play Section -->
    <div class="mb-12">
      <h3 class="text-xl font-bold mb-6 text-center dark:text-white text-gray-800">
        📖 วิธีเล่น Thwordle
      </h3>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h4 class="font-semibold mb-3 text-sakura-pink dark:text-sakura-light">🎲 กติกาการเล่น</h4>
          <ul class="space-y-2 text-sm">
            <li>• ทายคำภาษาไทยภายใน 6 ครั้ง</li>
            <li>• แต่ละคำตอบมีจำนวนตัวอักษรเท่ากัน</li>
            <li>• ใช้คีย์บอร์ดบนหน้าจอหรือคีย์บอร์ดคอมพิวเตอร์</li>
            <li>• คำตอบจะเปลี่ยนทุกวันเที่ยงคืน</li>
          </ul>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h4 class="font-semibold mb-3 text-warm-orange dark:text-warm-light">🎨 ความหมายของสี</h4>
          <ul class="space-y-2 text-sm">
            <li>• <span class="inline-block w-4 h-4 bg-sakura-pink rounded mr-2"></span>สีชมพู: ตัวอักษรถูกตำแหน่ง</li>
            <li>• <span class="inline-block w-4 h-4 bg-warm-orange rounded mr-2"></span>สีส้ม: มีตัวอักษรนี้แต่ผิดตำแหน่ง</li>
            <li>• <span class="inline-block w-4 h-4 bg-gray-400 rounded mr-2"></span>สีเทา: ไม่มีตัวอักษรนี้ในคำตอบ</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="mb-12">
      <h3 class="text-xl font-bold mb-6 text-center dark:text-white text-gray-800">
        ❓ คำถามที่พบบ่อยเกี่ยวกับ Thwordle
      </h3>
      <div class="space-y-4">
        <details class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <summary class="font-semibold cursor-pointer text-sakura-pink dark:text-sakura-light">
            Thwordle แตกต่างจาก Wordle อย่างไร?
          </summary>
          <p class="mt-3 text-sm">
            <strong>Thwordle</strong> เป็นเวอร์ชันภาษาไทยของ Wordle ที่ใช้คำศัพท์ภาษาไทย รองรับการใช้สระและวรรณยุกต์ภาษาไทย มีระบบคีย์บอร์ดพิเศษสำหรับภาษาไทย
          </p>
        </details>
        <details class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <summary class="font-semibold cursor-pointer text-warm-orange dark:text-warm-light">
            เล่น Thwordle ได้กี่ครั้งต่อวัน?
          </summary>
          <p class="mt-3 text-sm">
            เหมือนกับ Wordle ต้นฉบับ คุณสามารถเล่น <strong>Thwordle</strong> ได้วันละ 1 ครั้ง คำตอบจะเปลี่ยนทุกวันเที่ยงคืน
          </p>
        </details>
        <details class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <summary class="font-semibold cursor-pointer text-elegant-grey dark:text-gray-300">
            สามารถแชร์ผลการเล่น Thwordle ได้หรือไม่?
          </summary>
          <p class="mt-3 text-sm">
            ได้! หลังจากเล่นเสร็จแล้ว คุณสามารถกดปุ่ม "Share" เพื่อแชร์ผลการเล่น <strong>Thwordle</strong> ในรูปแบบอีโมจิไปยังโซเชียลมีเดียได้
          </p>
        </details>
      </div>
    </div>

    <!-- Features Section -->
    <div class="mb-12">
      <h3 class="text-xl font-bold mb-6 text-center dark:text-white text-gray-800">
        ⭐ จุดเด่นของ Thwordle
      </h3>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="text-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div class="text-3xl mb-3">🇹🇭</div>
          <h4 class="font-semibold mb-2 text-sakura-pink dark:text-sakura-light">ภาษาไทยแท้</h4>
          <p class="text-sm">รองรับคำศัพท์ภาษาไทยครบถ้วน พร้อมสระและวรรณยุกต์</p>
        </div>
        <div class="text-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div class="text-3xl mb-3">🌙</div>
          <h4 class="font-semibold mb-2 text-warm-orange dark:text-warm-light">Dark Mode</h4>
          <p class="text-sm">เล่น <strong>Thwordle</strong> ได้ทั้งในโหมดสว่างและโหมดมืด</p>
        </div>
        <div class="text-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div class="text-3xl mb-3">📱</div>
          <h4 class="font-semibold mb-2 text-elegant-grey dark:text-gray-300">ใช้งานง่าย</h4>
          <p class="text-sm">เล่นได้บนทุกอุปกรณ์ ทั้งมือถือ แท็บเล็ต และคอมพิวเตอร์</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="text-center py-6 border-t border-gray-200 dark:border-gray-700">
      <p class="text-sm opacity-80 mb-2">
        <strong>Thwordle</strong> - เวอเดิ้ลภาษาไทย | เกมทายคำที่ช่วยพัฒนาการใช้ภาษาไทยอย่างสร้างสรรค์
      </p>
      <p class="text-xs opacity-60">
        เล่น <strong>Thwordle</strong> ฟรีทุกวัน และร่วมสนุกกับชุมชนคนรักภาษาไทย
      </p>
    </footer>
  </section>

  <!-- Debug -->
  <!-- <div class="flex justify-center my-20">
    <div>DEBUG</div>
    {JSON.stringify(attempts)}
  </div> -->
  {#if !$modalViewed}
    <Modal
      onClose={() => {
        modalViewed.set(true)
      }}
    />
  {/if}

  {#if showAlert}
    <AlertModal
      message={alertMessage}
      onClose={() => {
        showAlert = false
      }}
    />
  {/if}
</main>

<style>
  :root {
    font-family: "Noto Sans Thai", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .attempts {
    min-height: 96px;
    margin-bottom: 2rem;
  }

  .share-button {
    margin-bottom: 4.2rem;
  }

  .layout-key.layout-no-shift {
    @apply h-10;
  }

  .layout-key {
    @apply px-0.5 h-14;
  }

  .attempt-key {
    @apply w-14 h-14;
  }

  @media (max-height: 800px) {
    .share-button {
      margin-bottom: 1rem;
    }

    .layout-key {
      @apply h-12;
    }

    .layout-key.layout-no-shift {
      @apply h-8;
    }

    .attempt-key {
      /* @apply w-13 h-13; */
      width: 3.25rem;
      height: 3.25rem;
    }
  }
  @media (max-height: 680px) {
    .attempt-key {
      @apply w-12 h-12;
    }
  }
</style>
