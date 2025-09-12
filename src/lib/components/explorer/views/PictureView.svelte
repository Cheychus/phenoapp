<script lang="ts">
  // get a picture from a url and displays it
  import { onMount } from "svelte";
  import Loader from "$lib/components/Loader.svelte";
  import { userSettings } from "$lib/store/UserSettings.svelte";

  let { url, title = "" } = $props();
  let downloadImage = $derived(userSettings.options.autoDownloadImages);
  let imageUrl = $state();
  let loaded = $state(false);
  onMount(async () => {
    if (downloadImage) {
      await fetchImage();
    }
  });

  // if user changes the auto download checkbox this effect will trigger
  // bug because it will be triggered from button and effect so 2x download
  // $effect(() => {
  //   if (downloadImage) {
  //     fetchImage();
  //   }
  // });

  async function fetchImage() {
    downloadImage = true;
    console.log("my url", url);
    const response = await fetch(`/?target=${encodeURIComponent(url)}`);
    const blob = await response.blob();
    imageUrl = URL.createObjectURL(blob);
    loaded = true;
  }

  let modal;

  function showModal() {
    modal.showModal();
  }
</script>

<dialog bind:this={modal} id="modal" class="modal">
  <div class="modal-box max-w-2/3 h-screen max-h-screen flex flex-col items-center justify-center">
    <h3 class="text-lg font-bold">{title}</h3>
    <div class="flex items-center justify-center w-full h-2/3 p-2">
      <img class="w-full h-full object-contain" src={imageUrl} loading="lazy" alt="API Image" />
    </div>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>


{#if downloadImage}
  {#if !loaded}
    <Loader />
  {:else}
    <button class="hover:cursor-pointer" onclick={() => showModal()}>
      <img class="w-16 object-contain" src={imageUrl} loading="lazy" alt="API Image" />
    </button>
  {/if}
{:else}
  <button class="btn btn-neutral px-8" onclick={() => fetchImage()}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
Load Image
</button>
{/if}
