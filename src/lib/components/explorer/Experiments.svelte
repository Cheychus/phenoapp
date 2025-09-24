<script lang="ts">
  import { arcData } from "$lib/store/ArcData.svelte";
  import { onMount } from "svelte";
  import Table from "./Table.svelte";
  import type { Experiment } from "$lib/types/types";

  let { experiments, viewType } = $props();
  let selectedExperiment: string = $state(experiments.at(0)?.identifier || "");

  let tableData = $derived.by(() => {
    if (experiments.length <= 0) {
      return null;
    }
    return experiments.find((experiment: Experiment) => experiment.identifier === selectedExperiment);
  });

  //  $inspect(selectedExperiment);
  // $inspect(tableData);
  // $inspect(experiments, "experiments" );
</script>

<section class="flex flex-col py-2">
  {#if !tableData}
  <p>This Arc does not contain {viewType} data</p>
  
  {:else}
    <div class="font-bold h-full flex items-center">Select Experiment:</div>
    <select id="dataSelect" bind:value={selectedExperiment} class="select select-md m-0 select-primary border p-2 mb-1 w-96 pr-8 rounded-sm">
      {#each experiments as experiment}
        <option value={experiment.identifier}>{experiment.identifier}</option>
      {/each}
    </select>
    <div class="col-span-2 divider divider-primary m-0"></div>
    {#key selectedExperiment}
      <Table {tableData} tableType={viewType} />
    {/key}
  {/if}
</section>
