<script lang="ts">
    export let tableData = [];
    export let tableType = "???";
    export let url = '';

    console.log(tableData);

    // Extract unique Keys from table Data

    let headers: Array<any> = [];
    // reactive statement needed because data will change after the fetch call is complete
    $: if (tableData.length > 0) {
        const tableHeader = new Set();
        tableData.forEach(element => {
            const keys = Object.keys(element);
            keys.forEach(key => {
                if (lookupHeaderName(key)) {
                    tableHeader.add(key);
                }
                // console.log(key);
            });
        });
        headers = Array.from(tableHeader);
        // console.log(headers);
    }

    function lookupHeaderName(key: string) {
        let mapping = {
            'about': 'Processes',
            'hasPart': 'Data Files',
            'identifier': 'Name',
            'dateModified': 'last modified',
            'comment': 'Comments',
        }
        return mapping[key] ? mapping[key] : false;
    }



    function onchange() {
        console.log('onchange select');
        console.log(selectedData);

    }
    let selectedData = tableData[0]?.identifier;

    function getDataByIdentifier(identifier: string) {
        return tableData.find(data => data.identifier === identifier);
    }

</script>


<p>Im Arc wurden {tableData.length} {tableType} gefunden: </p>

<select id="dataSelect" bind:value={selectedData} {onchange} class="border p-1 mb-1 max-w-32 rounded-sm">
    {#each tableData as data}
        <option value={data.identifier}>{data.identifier}</option>
    {/each}
</select>


<div class="grid grid-cols-2 items-start">
    {#each headers as header}
        <div class="p-2 font-bold border-b border-b-gray-300">
            {lookupHeaderName(header)}
        </div>
        <div class="p-2 border-b border-b-gray-300">
            {#if header === 'about'}
                <a class="link text-blue-400" href={`${url}/${getDataByIdentifier(selectedData)['identifier']}`}>Link</a>
            {:else}
                {JSON.stringify(getDataByIdentifier(selectedData)[header])}
            {/if}
        </div>
    {/each}
</div>
