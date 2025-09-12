<script lang="ts">
  import { page } from "$app/state";
  import { arcData } from "$lib/store/ArcData.svelte";
  import { errorStore } from "$lib/store/ErrorStore.svelte";
  import { resourceStore } from "$lib/store/ResourceStore.svelte";
  import type { ArcResource, ArcResourceType } from "$lib/types/types";
  import { toArray } from "$lib/utils/helpers";
  import { getResourceType } from "$lib/utils/typeHandler";
  import { onMount } from "svelte";

  let { tableData, tableType } = $props();

  // console.log(tableData);

  let selectedData = $state(tableData.identifier);
  const dataFiles = $derived.by(() => {
    if (tableType === "assays") {
      return arcData.assayDatafiles.get(selectedData);
    } else if (tableType === "studies") {
      return arcData.studyDatafiles.get(selectedData);
    }
    return [];
  });

  // $inspect(dataFiles);
  // extractDataFiles();

  function extractDataFiles(): ArcResource[] {
    try {
      const hasPart = toArray(tableData?.hasPart);
      const dataFiles: ArcResource[] = [];

      for (const df of hasPart) {
        const arcObject = arcData.getObjectById(df["@id"]);

        if (!arcObject) {
          throw new Error(`Arc object not found for id ${df["@id"]}`);
        }

        const path = arcObject?.name ?? "unknown";
        const res = resourceStore.addResource(path);
        dataFiles.push(res);
      }

      return dataFiles;
    } catch (error) {
      console.error("extract Data Files failed: ", error);
      errorStore.add(
        "Could  not extract some data files. See console for details.",
      );
      return [];
    }
  }

  // Extract unique Keys from table Data
  let headers: Array<any> = $state([]);

  const tableHeader = new Set();
  const keys = Object.keys(tableData);
  keys.forEach((key) => {
    if (lookupHeaderName(key)) {
      tableHeader.add(key);
    }
    // console.log(key);
  });
  headers = Array.from(tableHeader);
  // console.log(headers);

  function lookupHeaderName(key: string) {
    let mapping = {
      about: "Processes",
      hasPart: "Data Files",
      // 'identifier': 'Name',
      dateModified: "last modified",
      comment: "Comments",
    };
    return mapping[key] ? mapping[key] : false;
  }

  function onchange() {
    console.log("onchange select");
    console.log(selectedData);
  }


</script>

{#if tableData}
  <section>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead> </thead>
        <tbody>
          {#each headers as header}
            <tr>
              <th>{lookupHeaderName(header)}</th>
              <td>
                {#if header === "about"}
                  <a
                    class="btn btn-accent px-16"
                    href={`/explorer/${tableType}/${tableData.identifier}`}
                    >Open Processes</a
                  >
                {:else if header === "hasPart"}
                  {dataFiles.length} Datafiles found.
                  <div class="grid grid-cols-3 gap-2 overflow-auto max-h-96">
                    {#each dataFiles as datafile}
                      <a
                        href="{page.url
                          .pathname}/{selectedData}/data/{datafile.name}"
                        class="btn btn-neutral">{datafile.name}</a
                      >
                    {/each}
                  </div>
                {:else}
                  {JSON.stringify(tableData[header])}
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
{:else}
  Waiting for table Data...
{/if}
