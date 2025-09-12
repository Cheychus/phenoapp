<script lang="ts">
  import { arcData } from "$lib/store/ArcData.svelte";
  import { userSettings } from "$lib/store/UserSettings.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import type { GraphNode } from "$lib/types/types";
  import ArcResourceView from "./views/ArcResourceView.svelte";
  import { errorStore } from "$lib/store/ErrorStore.svelte";
  import { toArray } from "$lib/utils/helpers";
  import { onMount } from "svelte";
  import ProcessTableSettings from "./ProcessTableSettings.svelte";

  let { identifier, type, data = [] } = $props();

  interface Process {
    object?: any;
    executesLabProtocol?: any;
    result?: any;
  }

  interface TableObject {
    source: any;
    protocol: any;
    sample: any;
  }

  onMount(() => {});

  let tableData = $derived(createTableData(data));

  function createTableData(tableData: any) {
    if (!tableData || !tableData.about) {
      return [];
    }
    try {
      let about = toArray(tableData.about);
      let processes = about.map((e) => arcData.getObjectById(e["@id"]));
      return processes;
    } catch (error) {
      console.error("Error: ", error);
      errorStore.add("Could not create table objects.");
      return [];
    }
  }

  function createTableObject(process: Process): TableObject | null {
    try {
      const object = process.object ?? null;
      const source = object?.["@id"]
        ? arcData.getObjectById(object["@id"])
        : null;

      const executesLabProtocol = process.executesLabProtocol;
      const protocol = executesLabProtocol?.["@id"]
        ? arcData.getObjectById(executesLabProtocol["@id"])
        : null;

      const result = process.result ?? null;
      const sample = object?.["@id"]
        ? arcData.getObjectById(result["@id"])
        : null;

      const tableObj = {
        source,
        protocol,
        sample,
      };
      return tableObj;
    } catch (error) {
      console.error("Error: ", error);
      errorStore.add("Could not create table object.");
      return null;
    }
  }

</script>

{#if arcData.graph.length === 0}
  <p>Arc Data is loading...</p>
{:else if !data}
  <p>
    No Study or Assay with the name: <strong>{identifier}</strong> was found!
  </p>
{:else}
  <!-- <p>Study or Assay: <strong>{identifier}</strong> loaded!</p> -->
{/if}

<div class="flex flex-col justify-end p-2 shadow-sm">
  {#if !tableData}
    Create table...
  {:else}
    <ProcessTableSettings />
    <Pagination data={tableData}>
      {#snippet content(
        paginatedEntries: any,
        currentPage: number,
        maxEntries: number,
      )}
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
                  <td>
                    <div class="px-2 flex items-center">
                      <ArcResourceView
                        process={createTableObject(process)?.source}
                      />
                    </div>
                  </td>
                  <td>
                    <div class="flex items-center gap-2">
                      <ArcResourceView
                        process={createTableObject(process)?.protocol}
                      />
                    </div>
                  </td>
                  <td>
                    <div class="flex items-center">
                      <ArcResourceView
                        process={createTableObject(process)?.sample}
                      />
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/snippet}
    </Pagination>
  {/if}
</div>
