<script lang="ts">
  import SpecialModal from "./SpecialSelectorModal.svelte"
  import SettingModal from "./SettingModal.svelte"
  import StatsModal from "./StatsModal.svelte"
  import { onMount } from "svelte"
  import { scale } from "svelte/transition"

  let show = false
  let menu = null

  onMount(() => {
    const handleOutsideClick = (event) => {
      if (show && !menu.contains(event.target)) {
        show = false
      }
    }

    const handleEscape = (event) => {
      if (show && event.key === "Escape") {
        show = false
      }
    }

    document.addEventListener("click", handleOutsideClick, false)
    document.addEventListener("keyup", handleEscape, false)

    return () => {
      document.removeEventListener("click", handleOutsideClick, false)
      document.removeEventListener("keyup", handleEscape, false)
    }
  })

  export let modes: string
  let statsModal = false
  let settingModal = false
  let showSpecialModal = false

  let daily: boolean = false
  let special = false
  let training = false

  if (modes == "daily") {
    daily = !daily
  } else if (modes == "special") {
    special = !special
  } else {
    training = !training
  }
</script>

<header class="mb-4 w-full h-10 py-2">
  <div class="flex justify-between w-full px-4 h-10">
    <span class="flex justify-center h-full dark:text-white">
      <!-- Help按钮移至右侧统一管理 -->
    </span>
    <h1
      class={`absolute text-center inset-x-0 top-4 leading-4 text-2xl text-sakura-pink mb-2 pointer-events-none ${
        training || special ? "left-12" : ""
      }`}
    >
      Thwordle
      {#if training}
        <span class="text-warm-orange text-xs relative top-3 right-12 px-1 rounded">Training</span>
      {/if}
      {#if special}
        <span class="text-elegant-grey text-xs relative top-3 right-12 px-1 rounded">Special</span>
      {/if}
    </h1>
    <div class="hidden md:block">
      <span class="flex gap-3 justify-center h-full dark:text-white">
        {#if training || special}
          <button
            class="text-sakura-pink hover:text-sakura-dark"
            on:click={() => {
              window.location.hash = ""
            }}
          >
            Daily
          </button>
        {/if}
        {#if daily || training}
          <button
            class="text-elegant-grey hover:text-elegant-dark"
            on:click={() => {
              showSpecialModal = !showSpecialModal
            }}
          >
            Special
          </button>
        {/if}
        {#if daily || special}
          <button
            class="text-warm-orange hover:text-warm-dark"
            on:click={() => {
              window.location.hash = "#/training"
            }}
          >
            Training
          </button>
        {/if}
        <button on:click={() => window.location.hash = '#/help'}>Help</button>
        <button
          class="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
          on:click={() => window.location.hash = '#/blog'}
        >
          Blog
        </button>
        <button on:click={() => (statsModal = true)}>สถิติ</button>
        <button on:click={() => (settingModal = true)}>ตั้งค่า</button>
      </span>
    </div>
    <div class="block md:hidden">
      <div class="relative" bind:this={menu}>
        <div>
          <button on:click={() => (show = !show)} class="flex justify-center h-full leading-10">
            Menu
          </button>

          {#if show}
            <div
              in:scale={{ duration: 100, start: 0.95 }}
              out:scale={{ duration: 75, start: 0.95 }}
              class="origin-top-right absolute right-0 w-48 py-2 mt-1 bg-white dark:bg-pure-charcoal
                rounded shadow-md border border-sakura-pink dark:border-elegant-grey"
            >
              {#if training || special}
                <button
                  class="block px-4 py-2 hover:bg-sakura-light hover:text-sakura-pink dark:text-white dark:hover:bg-elegant-dark w-full"
                  on:click={() => {
                    show = false
                    window.location.hash = ""
                  }}>Daily</button
                >
              {/if}
              {#if daily || training}
                <button
                  class="block px-4 py-2 hover:bg-sakura-light hover:text-elegant-grey dark:text-white dark:hover:bg-elegant-dark w-full"
                  on:click={() => {
                    show = false
                    showSpecialModal = !showSpecialModal
                  }}>Special</button
                >
              {/if}
              {#if daily || special}
                <button
                  class="block px-4 py-2 hover:bg-sakura-light hover:text-warm-orange dark:text-white dark:hover:bg-elegant-dark w-full"
                  on:click={() => {
                    show = false
                    window.location.hash = "#/training"
                  }}>Training</button
                >
              {/if}
              <button
                class="block px-4 py-2 hover:bg-sakura-light hover:text-sakura-dark dark:text-white dark:hover:bg-elegant-dark w-full"
                on:click={() => {
                  show = false
                  window.location.hash = '#/help'
                }}>Help</button
              >
              <button
                class="block px-4 py-2 hover:bg-sakura-light hover:text-purple-600 dark:text-white dark:hover:bg-elegant-dark w-full"
                on:click={() => {
                  show = false
                  window.location.hash = '#/blog'
                }}>Blog</button
              >
              <button
                class="block px-4 py-2 hover:bg-sakura-light hover:text-sakura-dark dark:text-white dark:hover:bg-elegant-dark w-full"
                on:click={() => {
                  show = false
                  statsModal = true
                }}>สถิติ</button
              >
              <button
                class="block px-4 py-2 hover:bg-sakura-light hover:text-sakura-dark dark:text-white dark:hover:bg-elegant-dark w-full"
                on:click={() => {
                  show = false
                  settingModal = true
                }}>ตั้งค่า</button
              >
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
  <hr />
</header>

{#if settingModal}
  <SettingModal
    onClose={() => {
      settingModal = false
    }}
  />
{/if}

{#if statsModal}
  <StatsModal
    onClose={() => {
      statsModal = false
    }}
    special={false}
  />
{/if}

{#if showSpecialModal}
  <SpecialModal
    onClose={() => {
      showSpecialModal = false
    }}
  />
{/if}
