<script lang="ts">
  import Stats from "./Stats.svelte"

  export let special = false
  export let onClose = () => {}
</script>

<div
  class="fixed z-10 inset-0 overflow-y-auto"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  >
  <div
    class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
  >
    <div
      class="fixed fadein inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      aria-hidden="true"
      on:click={() => onClose()}
    />

    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
      >&#8203;</span
    >

    <div
      class="inline-block align-bottom bg-white dark:bg-pure-charcoal rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full border border-sakura-pink dark:border-elegant-grey"
    >
      <div class="bg-white dark:bg-pure-charcoal px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="mt-3 text-left">
          <Stats isSpecialStats={special} />
        </div>

        <div class="mt-4 flex flex-row-reverse">
          <button
            type="button"
            class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-elegant-grey text-base font-medium text-white hover:bg-elegant-dark focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-sakura-pink sm:ml-3 sm:text-sm"
            on:click={() => {
              onClose()
            }}
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

