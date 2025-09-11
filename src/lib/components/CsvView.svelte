<script lang="ts">
  import { arcData } from "$lib/store/ArcData.svelte";
  import { onMount } from "svelte";
  import DataFrame from "dataframe-js";
  import { resourceStore } from "$lib/store/ResourceStore.svelte";
  import Pagination from "./Pagination.svelte";

  let csv = $state();
  let headers = $state([]);
  let filteredHeaders = $state([]);
  let data = $state([]);

  let { resource } = $props();

  onMount(async () => {
    console.log("init --> csv Viewer");
    let csv = await resourceStore.fetchData(resource);
    let df;
    if (resource.type === "csv") {
      df = await DataFrame.fromCSV(new File([csv], "file.csv"));
    } else if (resource.type === "tsv") {
      df = await DataFrame.fromTSV(new File([csv], "file.csv"));
    }

    // let df = await DataFrame.fromCSV(new File([csv], "file.csv"));
    // const df = new DataFrame(data, columns);
    let dict = df.toDict();
    headers = Object.keys(dict);
    filteredHeaders = headers;
    data = df.toCollection();

    // console.log(Object.keys(dict));
    // console.log(df.toArray());
    // console.log(df.toCollection());
  });

  let smallTable = $state(false);
  $inspect(filteredHeaders);

  function selectHeader(all: boolean) {
    if (all) {
      filteredHeaders = headers;
    } else {
      filteredHeaders = [];
    }
  }
</script>

<section class="flex flex-col overflow-hidden">
  <div class="flex flex-col gap-1 pb-4">
    <div class="collapse bg-base-100 border-base-300 border">
      <input type="checkbox" />
      <div class="collapse-title font-semibold flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
          />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        Table Settings
      </div>
      <div class="collapse-content text-sm">
        <div class="font-bold py-2">Options</div>
        <div class="flex gap-2">
          <input bind:checked={smallTable} type="checkbox" class="checkbox" />
          <div>Small Table</div>
        </div>

        <div class="font-bold py-2">Filter</div>

        <button class="btn btn-neutral" onclick={() => selectHeader(false)}>Unselect All</button>
        <button class="btn btn-neutral" onclick={() => selectHeader(true)}>Select All</button>

  
        <div class="grid grid-cols-6 gap-2 py-2">
          {#each headers as header}
            <div class="flex gap-2">
              <input bind:group={filteredHeaders} value={header} type="checkbox" class="checkbox" />
              <div>{header}</div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

<Pagination {data}>

  {#snippet content(paginatedEntries, currentPage, maxEntries)}
    <div class="overflow-x-auto h-full">
    <table class="table table-pin-rows table-pin-cols" class:table-xs={smallTable}>
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          {#each filteredHeaders as header}
            <th>{header}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each paginatedEntries as column, i}
          <tr>
            <th>{i + 1 + currentPage * maxEntries}</th>
            {#each filteredHeaders as header}
              <td class="text-nowrap">{column[header]}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  {/snippet}

</Pagination>

  
</section>
