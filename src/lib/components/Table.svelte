<script lang="ts">
  import { arcData } from "$lib/store/ArcData.svelte";
  import { resourceStore } from "$lib/store/ResourceStore.svelte";
  import type { ArcResource, ArcResourceType } from "$lib/types/types";
  import { getResourceType } from "$lib/utils/typeHandler";
  import { onMount } from "svelte";

  let { tableData, tableType, url } = $props();

  onMount(() => {

    
  });

    // console.log(tableData);
    const hasPart = tableData.hasPart ?? [];
    const dataFiles: ArcResource[] = [];
    hasPart.forEach((df) => {
      const arcObject = arcData.getObjectById(df["@id"]);
      const path = arcObject?.name;
      const resourceType: ArcResourceType = getResourceType(path);
      const res = resourceStore.addResource(path, resourceType);
      // console.log(res, " added");
      dataFiles.push(res);
    })
  

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

  let selectedData = $state(tableData.identifier);


</script>

<section>
  <div class="p-2 bg-base-200 rounded-md">
    <div class="grid grid-cols-2 items-start">
    

      {#each headers as header}
        <div class="p-4 font-bold border-b border-b-gray-300">
          {lookupHeaderName(header)}
        </div>

        <div class="p-2 border-b border-b-gray-300 overflow-y-auto">
          {#if header === "about"}
            <a class="btn btn-accent px-16" href={`${url}/${tableData.identifier}`}>Open Processes</a>
          {:else if header === "hasPart"}
          <div class="grid grid-cols-3 gap-2">
            {#each dataFiles as datafile}
              <a href="{datafile.normalizedPath}" class="btn btn-neutral">{datafile.name}</a>
            {/each}
            </div>
          {:else}
            {JSON.stringify(tableData[header])}
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
