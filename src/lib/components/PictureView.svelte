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
  <button class="btn btn-neutral px-8" onclick={() => fetchImage()}>Load Image</button>
{/if}
