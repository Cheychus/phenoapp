<script lang="ts">
  import { resourceStore } from "$lib/store/ResourceStore.svelte";
  import type { ArcResource } from "$lib/types/types";
  import { onMount } from "svelte";
  import CsvView from "./CsvView.svelte";

  let { resource }: { resource: ArcResource } = $props();

  let data = $state("");
  onMount(async () => {
    data = await resourceStore.fetchData(resource);

    // txt files could also be table files, so we need to check here
    let tableType = detectDelimiter(data);
    if (!tableType) {
      return;
    }

    // change text to table type
    resource.type = tableType;
  });

  function detectDelimiter(text: string): "csv" | "tsv" | null {
    const lines = text.trim().split("\n").slice(0, 5);
    const delimeters = [",", "\t", ";"];

    for (const delim of delimeters) {
      const columnCounts = lines.map((line) => line.split(delim).length);

      const allSame = columnCounts.every((count) => count === columnCounts[0]);
      if (allSame && columnCounts[0] > 1) {
        if (delim === ",") {
          return "csv";
        } else if (delim === "\t") {
          return "tsv";
        }
      }
    }
    return null;
  }
</script>

<section class="px-layout">
  {#if !data}
    <p>No txt content</p>
  {:else if resource.type === "txt"}
    {data}
  {:else}
    <CsvView {resource} />
  {/if}
</section>
