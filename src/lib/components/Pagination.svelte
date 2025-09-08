<script lang="ts">
  let { data = [], content } = $props();

  let currentPage = $state(0);
  let maxEntries = $state(10);
  let maxPages = $derived(Math.ceil(data.length / maxEntries) - 1);
  let startIndex = $derived(currentPage * maxEntries);
  let paginatedEntries = $derived(data.slice(startIndex, startIndex + maxEntries));
</script>

<div class="w-full flex flex-col">
  <div class="pagination-top flex">
    <p class="mr-auto">Processes: {data.length}</p>
    <p class="mr-auto">Current Page: {currentPage}</p>
    <div class="flex gap-2">
      Max Entrys:
      <button onclick={() => (maxEntries = 10)} class="text-info hover:text-info-content" class:underline={maxEntries === 10}> 10 </button>
      <button onclick={() => (maxEntries = 50)} class="text-info hover:text-info-content" class:underline={maxEntries === 50 ? "underline" : ""}> 50 </button>
      <button onclick={() => (maxEntries = 100)} class="text-info hover:text-info-content" class:underline={maxEntries === 100 ? "underline" : ""}> 100 </button>
      <button onclick={() => (maxEntries = data.length)} class="text-info hover:text-info-content" class:underline={maxEntries === data.length ? "underline" : ""}> All </button>
    </div>
  </div>

  <div class="pagination-content">
    {@render content(paginatedEntries, currentPage, maxEntries)}
  </div>

  <div class="pagination-bottom">
    <div class="w-full grid grid-cols-[1fr_2fr_2fr_1fr] gap-2">
      <button onclick={() => (currentPage = 0)} class="btn btn-neutral">Start </button>
      <button onclick={() => (currentPage -= 1)} class="btn btn-neutral" class:btn-disabled={currentPage === 0}> Previous Page </button>
      <button onclick={() => (currentPage += 1)} class="btn btn-neutral" class:btn-disabled={currentPage === maxPages}> Next Page </button>
      <button onclick={() => (currentPage = maxPages)} class="btn btn-neutral">End </button>
    </div>
  </div>
</div>
