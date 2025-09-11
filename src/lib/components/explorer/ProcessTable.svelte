<script lang="ts">
  import { arcData } from "$lib/store/ArcData.svelte";
  import SourceModal from "../SourceModal.svelte";
  import { userSettings } from "$lib/store/UserSettings.svelte";
  import Pagination from "../Pagination.svelte";
  import type { GraphNode } from "$lib/types/types";
  import ArcResourceView from "../ArcResourceView.svelte";
  import { errorStore } from "$lib/store/ErrorStore.svelte";
  import { toArray } from "$lib/utils/helpers";

  let { identifier, type, data = [] } = $props();

  let tableObjects = $derived.by(() => {
    if (data) {
      return createTableObjects(data);
    } else {
      return [];
    }
  });

  function createTableObjects(tableData: any) {
    if (!tableData || !tableData.about) {
      return [];
    }
    try {
      let about = toArray(tableData.about);
      let processes = about.map((e) => arcData.getObjectById(e["@id"]));
      let tableObjects = [];

      for (const process of processes) {
        if (!process) {
          console.warn("Missing process object");
          continue;
        }

        const object = process.object ?? null;
        const source = object?.["@id"] ? arcData.getObjectById(object["@id"]) : null;

        const executesLabProtocol = process.executesLabProtocol;
        const protocol = executesLabProtocol?.["@id"] ? arcData.getObjectById(executesLabProtocol["@id"]) : null;

        const result = process.result ?? null;
        const sample = object?.["@id"] ? arcData.getObjectById(result["@id"]) : null;

        const tableObj = {
          source,
          protocol,
          sample,
        };
        tableObjects.push(tableObj);
      }

      return tableObjects;
    } catch (error) {
      console.error("Error: ", error);
      errorStore.add("Could not create table objects.");
      return [];
    }
  }

  let modalProcess = $state();
  let modalSource = $state();

  let modal;

  function showModal() {
    modal.showModal();
  }
</script>

<dialog bind:this={modal} id="my_modal_2" class="modal">
  <div class="modal-box max-w-2/3">
    {#if modalSource}
      <SourceModal entity={modalSource} />
    {:else}
      <p>hello</p>
    {/if}
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

{#if arcData.graph.length === 0}
  <p>Arc Data is loading...</p>
{:else if !data}
  <p>
    No Study or Assay with the name: <strong>{identifier}</strong> was found!
  </p>
{:else}
  <!-- <p>Study or Assay: <strong>{identifier}</strong> loaded!</p> -->
{/if}

<!-- <CsvView /> -->

<div class="flex flex-col justify-end p-2 shadow-sm">
  <div class="dropdown">
    <div tabindex="0" role="button" class="btn m-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
        />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    </div>
    <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
      <div class="flex gap-2">
        <input bind:checked={userSettings.options.autoDownloadImages} type="checkbox" class="checkbox" />
        <div class="flex items-center">Auto Download Images</div>
      </div>
    </ul>
  </div>

  <Pagination data={tableObjects}>
    {#snippet content(paginatedEntries, currentPage, maxEntries)}
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>Source</th>
              <th>Protocol</th>
              <th>Sample</th>
            </tr>
          </thead>
          <tbody>
            {#each paginatedEntries as process, i (currentPage * maxEntries + i)}
              <tr>
                <th>{i + 1 + currentPage * maxEntries}</th>
                <td
                  ><div class="px-2 flex items-center">
                    <button
                      class="btn btn-ghost flex items-center px-3 cursor-pointer text-info hover:text-info-content"
                      onclick={() => {
                        modalProcess = process;
                        modalSource = arcData.getObjectById(process.source["@id"]);
                        showModal();
                      }}
                    >
                      <ArcResourceView process={process.source} />
                    </button>
                  </div></td
                >
                <td>
                  <div class="flex items-center gap-2">
                    <ArcResourceView process={process.protocol} />
                  </div></td
                >
                <td>
                  <div class="flex items-center">
                    <ArcResourceView process={process.sample} />
                  </div></td
                >
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/snippet}
  </Pagination>
</div>
