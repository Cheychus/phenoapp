<script lang="ts">
  import CsvView from "$lib/components/explorer/views/CsvView.svelte";
  import { resourceStore } from "$lib/store/ResourceStore.svelte.js";

  let { data } = $props();
  let { filename } = data;

  let resource = $derived.by(() => resourceStore.getResourceWithName(filename));

</script>

<section class="p-4 flex flex-col items-stretch min-h-screen">
  <div class="flex-1">
    {#if resource}
      {#if resource.type === "csv" || resource.type === "tsv"}
        <CsvView {resource} />
      {:else if resource.type === "image"}
        <div class="mx-layout">
          <img src={resource.url} alt="" />
        </div>
      {:else}
        file type is not supported
      {/if}
    {:else}
      {filename} could not be rendered
    {/if}
  </div>
</section>
