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
  import SpecialModal from "./lib/SpecialSelectorModal.svelte"
  import { layouts } from "./lib/layouts"
  import specialWords from "./lib/special-words"

  export let specialId

  const title = `Thwordle Special ${specialWords[specialId]?.day || ''} - ด่านพิเศษ Thwordle`
  const url = "https://thwordle.app"
  let words = []

  const description = `เล่น Thwordle ด่านพิเศษ ${specialWords[specialId]?.day || ''} - เกมทายคำภาษาไทยที่ท้าทายพิเศษ พร้อมคำศัพท์ที่คัดสรรมาเป็นพิเศษ`
  const imageUrl =
    "https://raw.githubusercontent.com/narze/timelapse/master/projects/thwordle_home.png"

  const gtagId = "G-F2Q37REQE6"

  if (!specialWords[specialId]) {
    alert("รหัสลับผิด กรุณาลองใหม่อีกครั้ง")
    window.location.href = "/"
  }

  $: rows = layouts[$settings.layout].rows
  $: rowsShifted = layouts[$settings.layout].rowsShifted

  const specialDay = specialWords[specialId]?.day

  const attemptLimit = 6

  let input = ""
  $: solution = specialWords[specialId]?.word
  let attempts: string[] = $data[specialDay]?.attempts || []
  $: validations = attempts.map((word) => validateWord(word, solution))
  let gameEnded = !!$data[specialDay]?.win || !!$data[specialDay]?.lose
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
    data.set({ ...$data, [`${specialDay}`]: { attempts, win, lose } })
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
          console.log({ score })
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
          console.log({ score })
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

    // Check if the word is in the dict or correct
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
    const results = getShareResults(validations)

    const score: string = (lose ? "X" : `${results.length}`) + `/${attemptLimit}`

    navigator.clipboard.writeText(
      `#Thwordle Special ${specialDay} ${score}\n\n${results.join("\n")}\n${window.location.href}`
    )

    copied = true

    setTimeout(() => {
      copied = false
    }, 2000)
  }

  function wordExists(input: string) {
    if (solution === input) {
      return true
    }
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
  <Navbar {modalViewed} modes="special" />

  <span class="flex gap-2 dark:text-white">
    <span class="bg-gray-200 dark:text-gray-700 rounded px-2">{specialDay}</span>
    <span>ครั้งที่ {attemptsLength}/{attemptLimit}</span>
  </span>

  <!-- DEBUG: Solution word -->
  <!-- <input type="text" class="border" bind:value={solution} /> -->
  <!-- Check Solution -->
  <div class="attempts grow overflow-y-auto" bind:this={attemptsContainer}>
    {#each attempts as input, n (n)}
      <div class="flex justify-center my-1">
        {#each validateWord(input, solution) as { correct, char }, idx (idx)}
          <div
            class={`${
              colors[correct] || "bg-white"
            } attempt-key border-solid border-2 flex items-center justify-center mx-0.5 text-3xl font-bold text-white
      rounded`}
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
            class={`${"bg-white dark:bg-slate-800"} attempt-key border-solid border-2 flex items-center justify-center mx-0.5 text-3xl font-bold text-white
      rounded`}
          />
        {/each}
      </div>
    {/each}
  </div>

  <!-- Layout -->
  <div class="layout my-4 w-full px-1 max-w-2xl">
    <input
      type="text"
      class="w-full sm:w-[400px] block border mb-1 px-6 py-2 mx-auto text-center dark:bg-gray-600 dark:text-white dark:placeholder:text-white"
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

  <!-- Input word -->
  <div class="share-button text-center flex">
    {#if gameEnded}
      <button
        on:click={copyResult}
        class="flex items-center justify-center rounded border mx-2 p-3 bg-green-300 border-green-500 text-xs font-bold cursor-pointer hover:bg-green-300 active:bg-green-400"
      >
        {copied ? "Copied" : "Share"}
      </button>
      <button
        on:click={() => {
          showSpecialModal = !showSpecialModal
        }}
        class="flex items-center justify-center rounded border mx-2 p-3 bg-blue-300 border-blue-500 text-xs font-bold cursor-pointer hover:bg-blue-300 active:bg-blue-400"
      >
        เลือกคำ
      </button>
      <a
        href="/"
        class="flex items-center justify-center rounded border mx-2 p-3  border-red-500 text-xs font-bold cursor-pointer bg-red-200 hover:bg-red-300 active:bg-red-400"
        >หน้าหลัก</a
      >
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

  {#if showSpecialModal}
    <SpecialModal
      onClose={() => {
        showSpecialModal = false
      }}
    />
  {/if}

  <!-- Extended Special Content Section - Second Screen -->
  <section class="w-full max-w-4xl mx-auto px-4 py-8 mt-16 dark:text-gray-200 text-gray-700">
    <!-- Special Challenge Hero -->
    <div class="text-center mb-12">
      <h2 class="text-2xl font-bold mb-4 dark:text-white text-gray-800">
        🌟 <strong>Thwordle Special {specialWords[specialId]?.day || ''}</strong> - ด่านท้าทายพิเศษ
      </h2>
      <p class="text-lg mb-4">
        <strong>Thwordle Special</strong> คือด่านพิเศษที่มีคำศัพท์ท้าทาย ทดสอบทักษะ <strong>Thwordle</strong> ของคุณในระดับสูงขึ้น
      </p>
      <p class="text-base">
        เฉลย <strong>Thwordle Special {specialWords[specialId]?.day || ''}</strong> และแชร์ความสำเร็จกับเพื่อนๆ เพื่อพิสูจน์ทักษะการเล่น <strong>Thwordle</strong>
      </p>
    </div>

    <!-- Special Challenge Features -->
    <div class="mb-12">
      <h3 class="text-xl font-bold mb-6 text-center dark:text-white text-gray-800">
        ✨ จุดเด่นของ Thwordle Special Challenges
      </h3>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="text-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div class="text-3xl mb-3">🎯</div>
          <h4 class="font-semibold mb-2 text-sakura-pink dark:text-sakura-light">คำศัพท์ท้าทาย</h4>
          <p class="text-sm">คำตอบใน <strong>Thwordle Special</strong> คัดสรรมาเป็นพิเศษ เพื่อทดสอบความรู้ภาษาไทย</p>
        </div>
        <div class="text-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div class="text-3xl mb-3">🏆</div>
          <h4 class="font-semibold mb-2 text-warm-orange dark:text-warm-light">ความสำเร็จพิเศษ</h4>
          <p class="text-sm">เล่น <strong>Thwordle Special</strong> สำเร็จจะได้รับความภาคภูมิใจเป็นพิเศษ</p>
        </div>
        <div class="text-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div class="text-3xl mb-3">🔗</div>
          <h4 class="font-semibold mb-2 text-elegant-grey dark:text-gray-300">แชร์ได้</h4>
          <p class="text-sm">แชร์ผลการเล่น <strong>Thwordle Special</strong> และเชิญเพื่อนมาลองเล่น</p>
        </div>
      </div>
    </div>

    <!-- How to Access Special Challenges -->
    <div class="mb-12">
      <h3 class="text-xl font-bold mb-6 text-center dark:text-white text-gray-800">
        🔐 วิธีเข้าถึง Thwordle Special Challenges
      </h3>
      <div class="space-y-4">
        <details class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <summary class="font-semibold cursor-pointer text-sakura-pink dark:text-sakura-light">
            💌 รับรหัสด่านพิเศษ Thwordle Special
          </summary>
          <p class="mt-3 text-sm">
            รหัส <strong>Thwordle Special</strong> จะถูกแชร์ผ่านช่องทางต่างๆ เช่น โซเชียลมีเดีย หรือจากเพื่อนที่เล่น <strong>Thwordle</strong> แล้ว
          </p>
        </details>
        <details class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <summary class="font-semibold cursor-pointer text-warm-orange dark:text-warm-light">
            🎮 เล่น Thwordle Special Challenge
          </summary>
          <p class="mt-3 text-sm">
            ใส่รหัสในหน้าหลักของ <strong>Thwordle</strong> หรือคลิกลิงก์ <strong>Thwordle Special</strong> ที่เพื่อนแชร์มาโดยตรง
          </p>
        </details>
        <details class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <summary class="font-semibold cursor-pointer text-elegant-grey dark:text-gray-300">
            🏁 ความท้าทายของ Thwordle Special
          </summary>
          <p class="mt-3 text-sm">
            ด่านพิเศษจะมีความยากแตกต่างกัน บางด่าน <strong>Thwordle Special</strong> อาจมีคำที่ยากกว่าปกติ เพื่อทดสอบผู้เล่นระดับสูง
          </p>
        </details>
      </div>
    </div>

    <!-- Special Challenge Statistics -->
    <div class="mb-12">
      <h3 class="text-xl font-bold mb-6 text-center dark:text-white text-gray-800">
        📊 สถิติ Thwordle Special Challenge
      </h3>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h4 class="font-semibold mb-3 text-sakura-pink dark:text-sakura-light">🎯 ด่านปัจจุบัน</h4>
          <div class="text-2xl font-bold mb-2">{specialWords[specialId]?.day || 'N/A'}</div>
          <p class="text-sm">คุณกำลังเล่น <strong>Thwordle Special</strong> ด่านที่ {specialWords[specialId]?.day?.replace('S', '') || 'N/A'}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h4 class="font-semibold mb-3 text-warm-orange dark:text-warm-light">🔤 คำตอบ</h4>
          <div class="text-2xl font-bold mb-2">"{specialWords[specialId]?.word || 'กำลังโหลด...'}"</div>
          <p class="text-sm">คำตอบของ <strong>Thwordle Special</strong> ด่านนี้ (แสดงหลังเล่นเสร็จแล้ว)</p>
        </div>
      </div>
    </div>

    <!-- Special Footer -->
    <footer class="text-center py-6 border-t border-gray-200 dark:border-gray-700">
      <p class="text-sm opacity-80 mb-2">
        <strong>Thwordle Special {specialWords[specialId]?.day || ''}</strong> - ด่านท้าทายพิเศษสำหรับผู้เล่น <strong>Thwordle</strong> ระดับสูง
      </p>
      <p class="text-xs opacity-60">
        เล่น <strong>Thwordle Special</strong> ให้สำเร็จ และแชร์ความภาคภูมิใจกับชุมชน <strong>Thwordle</strong>
      </p>
    </footer>
  </section>
</main>

<style>
  :root {
    font-family: "Noto Sans Thai", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .attempts {
    min-height: 96px;
  }

  .share-button {
    margin-bottom: 4rem;
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

  @media (max-width: 480px) {
    .attempt-key {
      width: 3rem;
      height: 3rem;
    }
  }
  @media (max-width: 440px) {
    .attempt-key {
      width: 2.75rem;
      height: 2.75rem;
    }
  }
  @media (max-width: 400px) {
    .attempt-key {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
  @media (max-width: 400px) {
    .attempt-key {
      width: 2rem;
    }
  }
</style>
