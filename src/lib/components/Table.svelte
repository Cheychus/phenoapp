<script lang="ts">
  let { tableData, tableType, url } = $props();

  // console.log(tableData);

  // Extract unique Keys from table Data
  let headers: Array<any> = $state([]);

  const tableHeader = new Set();
  tableData.forEach((element) => {
    const keys = Object.keys(element);
    keys.forEach((key) => {
      if (lookupHeaderName(key)) {
        tableHeader.add(key);
      }
      // console.log(key);
    });
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

  let selectedData = $state(tableData[0]?.identifier);

  function getDataByIdentifier(identifier: string) {
    return tableData.find((data) => data.identifier === identifier);
  }
</script>

<section>
  <div class="p-2 bg-base-200 rounded-md">
    <div class="grid grid-cols-2 items-start">
      <div class="px-2 font-bold h-full flex items-center">
        Select {tableType}:
      </div>
      <select id="dataSelect" bind:value={selectedData} {onchange} class="select select-md m-0 select-primary border p-2 mb-1 w-fit pr-8 rounded-sm">
        {#each tableData as data}
          <option value={data.identifier}>{data.identifier}</option>
        {/each}
      </select>
      <div class="col-span-2 divider divider-primary m-0"></div>

      {#each headers as header}
        <div class="p-2 font-bold border-b border-b-gray-300">
          {lookupHeaderName(header)}
        </div>
        <div class="p-2 border-b border-b-gray-300 max-h-60 overflow-y-auto">
          {#if header === "about"}
            <a class="link text-blue-400" href={`${url}/${getDataByIdentifier(selectedData)["identifier"]}`}>Link</a>
          {:else}
            {JSON.stringify(getDataByIdentifier(selectedData)[header])}
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
