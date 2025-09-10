<script lang="ts">
  import Table from "$lib/components/explorer/Table.svelte";
  import { arcData } from "$lib/store/ArcData.svelte";
  import { userSettings } from "$lib/store/UserSettings.svelte";
  import { onMount } from "svelte";

  let assays = arcData.assayData;
  let selectedAssay: string;


</script>

<main class="flex flex-col">
<div class="px-2 font-bold h-full flex items-center">
        Select:
      </div>
      <select id="dataSelect" bind:value={selectedAssay} class="select select-md m-0 select-primary border p-2 mb-1 w-fit pr-8 rounded-sm">
        {#each assays as assay}
          <option value={assay.identifier}>{assay.identifier}</option>
        {/each}
      </select>
      <div class="col-span-2 divider divider-primary m-0"></div>

  {#if arcData.assayData.length > 0}
    {#each arcData.assayData as tableData}
      <Table {tableData} tableType="assay" url="/explorer/assays" />
    {/each}
  {:else}
    <p>This Arc does not contain Assay-Data</p>
  {/if}
</main>
