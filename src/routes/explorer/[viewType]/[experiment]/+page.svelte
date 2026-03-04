<script lang="ts">
  import ProcessTable from "$lib/components/explorer/ProcessTable.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import { arcData } from "$lib/store/ArcData.svelte.js";
  import { userSettings } from "$lib/store/UserSettings.svelte.js";
  import type { GraphNode } from "$lib/types/types.js";

  let { data } = $props();
  let { experimentName } = data;

  let processData: any[] = $derived(
    arcData.graph.find((e: GraphNode) => e.identifier === experimentName),
  );

  // let processData = $derived(arcData.studyProcesses.get(experimentName))

  // $inspect(arcData.studyProcesses.get(experimentName));

   // $inspect(processData);
</script>

<section class="mx-layout">
  {#if !processData}
    <p class="p-2">No Processes found for {experimentName} in <strong>{userSettings?.selectedArc?.name}</strong>!</p>
  {:else}
    <ProcessTable
      data={processData}
      identifier={experimentName}
      type={"assay"}
    />
  {/if}
</section>
