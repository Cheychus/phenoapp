<script lang="ts">
  import { page } from "$app/state";
  import Graph from "$lib/components/explorer/views/Graph.svelte";
  import type { PageProps } from "./$types";
  import { resourceStore } from "$lib/store/ResourceStore.svelte";

  let { data }: PageProps = $props();

  console.log(page.params);
  let { filename, viewType, experiment } = page.params;

  if (!filename) {
    throw new Error("Filename is required.");
  }

  let resource = $derived(resourceStore.getResourceWithName(filename));

  $inspect(resource);

</script>

<section class="px-layout">
  {#if resource}
    <Graph {resource} />
  {:else}
    <p>No resource found with name: {filename}</p>
  {/if}
</section>
