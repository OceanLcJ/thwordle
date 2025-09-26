<script lang="ts">
  import { sineInOut } from "svelte/easing"

  import Head from "./lib/Head.svelte"
  import Navbar from "./lib/Navbar.svelte"
  import EnhancedSocial from "./lib/EnhancedSocial.svelte"
  import { CharState, generateAlphabetStateMap, splitWord, validateWord } from "./lib/Wordle"
  import { onMount, tick } from "svelte"
  import Modal from "./lib/Modal.svelte"
  import { modalViewed, settings } from "./lib/store"
  import AlertModal from "./lib/AlertModal.svelte"
  import { layouts } from "./lib/layouts"

  const title = "Thwordle Training - ฝึกเล่น Thwordle ไร้ขีดจำกัด"
  const url = "https://thwordle.app"

  const description = "ฝึกฝน Thwordle ได้ไม่จำกัดครั้งด้วยโหมด Training - เตรียมพร้อมสำหรับการเล่น Thwordle รายวัน พัฒนาทักษะการทายคำภาษาไทยอย่างต่อเนื่อง"
  const imageUrl =
    "https://raw.githubusercontent.com/narze/timelapse/master/projects/thwordle_home.png"

  const gtagId = "G-N3FL38P2NM"
  let words = []

  $: rows = layouts[$settings.layout].rows
  $: rowsShifted = layouts[$settings.layout].rowsShifted

  const attemptLimit = 6
  let input = ""
  let dateIndex = 0
  $: solution = words[dateIndex % words.length] || ""
  let attempts: string[] = []
  $: validations = attempts.map((word) => validateWord(word, solution))
  let attemptsContainer
  let gameEnded = false
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
        setTimeout(() => {
          showAlertMessage("คุณชนะแล้ว!")
          gameEnded = true
        }, alertDelay)
      } else if (attemptsLength >= attemptLimit) {
        setTimeout(() => {
          showAlertMessage(`คุณแพ้แล้ว คำตอบคือ "${solution}"`)
          gameEnded = true
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
    dateIndex = Math.floor(Math.random() * words.length)
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

    input = ""

    await tick()
    attemptsContainer.scrollTop = attemptsContainer.scrollHeight
  }

  function restart() {
    attempts = []
    validations = []
    dateIndex = Math.floor(Math.random() * words.length)
    gameEnded = false
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
  <Navbar modes="training" />

  <span class="flex gap-4 dark:text-white my-2">
    <span>ครั้งที่ {attemptsLength}/{attemptLimit}</span>
  </span>

  <!-- Check Solution -->
  <div class="attempts grow overflow-y-auto" bind:this={attemptsContainer}>
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
            class={`bg-white attempt-key border-solid border-2 flex items-center justify-center mx-0.5 text-3xl font-bold rounded dark:bg-slate-800 dark:text-white`}
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
            class={`${"bg-white"} attempt-key border-solid border-2 flex items-center justify-center mx-0.5 text-3xl font-bold text-white rounded dark:bg-slate-800 dark:text-white`}
          />
        {/each}
      </div>
    {/each}
  </div>

  <!-- Layout -->
  <div class="layout my-4 w-full px-1 max-w-2xl">
    <input
      type="text"
      class="w-full sm:w-[400px] block border mb-3.5 px-6 py-2 mx-auto text-center dark:bg-gray-600 dark:text-white dark:placeholder:text-white"
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
                `${"⇧↵⬅".includes(alphabet) ? "border-gray-500" : ""}` +
                " " +
                `${$settings.layout === "ก-ฮ" ? "layout-no-shift" : ""}` +
                " " +
                "flex-grow layout-key border-solid border-2 flex items-end justify-end text-xl font-bold rounded text-black"}
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

  <!-- Training mode controls -->
  <div class="share-button text-center flex flex-col items-center gap-4">
    {#if gameEnded}
      <!-- Enhanced Social Share Component for Training -->
      <EnhancedSocial
        url="https://thwordle.app/#/training"
        gameResult={`🎯 ฉันเล่น Thwordle Training ได้แล้ว!\n${attempts} ครั้ง`}
        gameNumber="Training"
      />

      <!-- Training specific buttons -->
      <div class="flex gap-2">
        <button
          on:click={restart}
          class="flex items-center justify-center rounded border mx-2 p-2.5 border-green-300 text-xs font-bold cursor-pointer bg-green-200 hover:bg-green-300 active:bg-green-400"
        >
          เล่นใหม่
        </button>

        <button
          on:click={() => {
            showSpecialModal = !showSpecialModal
          }}
          class="flex items-center justify-center rounded border mx-2 p-3 bg-blue-300 border-blue-500 text-xs font-bold cursor-pointer hover:bg-blue-300 active:bg-blue-400"
        >
          Special
        </button>
      </div>
    {/if}
  </div>

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

  <!-- Extended Training Content Section - Second Screen -->
  <section class="w-full max-w-4xl mx-auto px-4 py-8 mt-16 dark:text-gray-200 text-gray-700">
    <!-- Training Hero Description -->
    <div class="text-center mb-12">
      <h2 class="text-2xl font-bold mb-4 dark:text-white text-gray-800">
        🎓 <strong>Thwordle Training</strong> - ฝึกฝนทักษะ Thwordle ไร้ขีดจำกัด
      </h2>
      <p class="text-lg mb-4">
        <strong>Thwordle Training</strong> คือโหมดฝึกฝนที่ให้คุณเล่น <strong>Thwordle</strong> ได้ไม่จำกัดครั้ง เพื่อพัฒนาทักษะการทายคำภาษาไทย
      </p>
      <p class="text-base">
        ฝึก <strong>Thwordle</strong> ให้เก่งขึ้นด้วยโหมด Training ที่มีคำศัพท์หลากหลาย เตรียมตัวให้พร้อมสำหรับ <strong>Thwordle</strong> รายวัน
      </p>
    </div>

    <!-- Training Benefits Section -->
    <div class="mb-12">
      <h3 class="text-xl font-bold mb-6 text-center dark:text-white text-gray-800">
        🎯 ประโยชน์ของ Thwordle Training
      </h3>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h4 class="font-semibold mb-3 text-sakura-pink dark:text-sakura-light">🎮 เล่นไร้ขีดจำกัด</h4>
          <ul class="space-y-2 text-sm">
            <li>• ฝึก <strong>Thwordle</strong> ได้ตลอดเวลา ไม่ต้องรอแค่วันละครั้ง</li>
            <li>• คำใหม่ทุกครั้งที่เล่น Training Mode</li>
            <li>• ไม่มีการบันทึกสถิติ เน้นการฝึกฝนเป็นหลัก</li>
            <li>• เล่นซ้ำได้ทันทีเมื่อจบเกม</li>
          </ul>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h4 class="font-semibold mb-3 text-warm-orange dark:text-warm-light">🧠 พัฒนาทักษะ</h4>
          <ul class="space-y-2 text-sm">
            <li>• เรียนรู้คำศัพท์ภาษาไทยใหม่ๆ จาก <strong>Thwordle</strong></li>
            <li>• ฝึกการคิดวิเคราะห์และใช้เหตุผล</li>
            <li>• เพิ่มความเร็วในการทายคำ</li>
            <li>• เตรียมความพร้อมสำหรับ <strong>Thwordle</strong> รายวัน</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Training Strategies Section -->
    <div class="mb-12">
      <h3 class="text-xl font-bold mb-6 text-center dark:text-white text-gray-800">
        💡 เทคนิคการเล่น Thwordle Training
      </h3>
      <div class="space-y-4">
        <details class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <summary class="font-semibold cursor-pointer text-sakura-pink dark:text-sakura-light">
            🎯 เทคนิคการเริ่มต้น Thwordle Training
          </summary>
          <p class="mt-3 text-sm">
            เริ่มต้นด้วยคำที่มีสระและพยัญชนะหลากหลาย เช่น "เสียง" หรือ "ความ" เพื่อทดสอบตัวอักษรที่มีในคำตอบของ <strong>Thwordle Training</strong>
          </p>
        </details>
        <details class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <summary class="font-semibold cursor-pointer text-warm-orange dark:text-warm-light">
            🔄 การใช้ข้อมูลจากการทาย Thwordle
          </summary>
          <p class="mt-3 text-sm">
            สังเกตสีของตัวอักษรใน <strong>Thwordle Training</strong>: สีชมพู (ถูกตำแหน่ง), สีส้ม (มีแต่ผิดที่), สีเทา (ไม่มีในคำตอบ)
          </p>
        </details>
        <details class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <summary class="font-semibold cursor-pointer text-elegant-grey dark:text-gray-300">
            📚 การเรียนรู้คำศัพท์ใหม่จาก Thwordle
          </summary>
          <p class="mt-3 text-sm">
            เมื่อไม่รู้คำตอบใน <strong>Thwordle Training</strong> ให้จดจำคำนั้น เพราะอาจจะเจอในโหมดอื่นหรือ <strong>Thwordle</strong> รายวัน
          </p>
        </details>
      </div>
    </div>

    <!-- Training vs Daily Comparison -->
    <div class="mb-12">
      <h3 class="text-xl font-bold mb-6 text-center dark:text-white text-gray-800">
        ⚖️ Training Mode vs Thwordle รายวัน
      </h3>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="text-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div class="text-3xl mb-3">🎓</div>
          <h4 class="font-semibold mb-2 text-sakura-pink dark:text-sakura-light">Thwordle Training</h4>
          <ul class="text-sm space-y-1">
            <li>• เล่นได้ไม่จำกัด</li>
            <li>• คำใหม่ทุกครั้ง</li>
            <li>• เน้นการฝึกฝน</li>
            <li>• ไม่บันทึกสถิติ</li>
          </ul>
        </div>
        <div class="text-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div class="text-3xl mb-3">📅</div>
          <h4 class="font-semibold mb-2 text-warm-orange dark:text-warm-light">Thwordle รายวัน</h4>
          <ul class="text-sm space-y-1">
            <li>• วันละ 1 ครั้งเท่านั้น</li>
            <li>• คำเดียวกันทั้งวัน</li>
            <li>• แข่งขันกับผู้เล่นคนอื่น</li>
            <li>• บันทึกสถิติและแชร์ผล</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Training Footer -->
    <footer class="text-center py-6 border-t border-gray-200 dark:border-gray-700">
      <p class="text-sm opacity-80 mb-2">
        <strong>Thwordle Training</strong> - โหมดฝึกฝนเพื่อเตรียมความพร้อมสำหรับ <strong>Thwordle</strong> รายวัน
      </p>
      <p class="text-xs opacity-60">
        ฝึกฝน <strong>Thwordle</strong> ให้เก่งขึ้นทุกวัน และเป็นมืออาชีพในการทายคำภาษาไทย
      </p>
    </footer>
  </section>
</main>

<style lang="postcss">
  :root {
    font-family: "Noto Sans Thai", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .attempts {
    min-height: 96px;
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
