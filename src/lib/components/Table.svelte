<script lang="ts">

 export let tableData = [];
 console.log(tableData);

// Extract unique Keys from table Data

let headers : Array<any> = [];
// reactive statement needed because data will change after the fetch call is complete
$: if (tableData.length > 0) {
    const tableHeader = new Set();
    tableData.forEach(element => {
        const keys = Object.keys(element);
        keys.forEach(key => {
            tableHeader.add(key);
            // console.log(key);
        });
    });
    headers = Array.from(tableHeader);
   // console.log(headers);
}

function lookupHeaderName(key : string) {
    let mapping = {
        'about' : 'Processes',
        'hasPart' : 'Data Files',
        'identifier' : 'Name',
        'dateModified' : 'last modified'
    }
    return mapping[key]?mapping[key]:key;
}

</script>

<!-- {#if tableData.length > 0}
 { tableData[0].name }
{/if} -->
<table class="h-8 max-h-8 ">
<thead class="bg-gray-100">
    <tr>
        {#each headers as header}
        <th class="p-2 border">{lookupHeaderName(header)}</th>
        {/each}
    </tr>
</thead>
<tbody>
        {#each tableData as row}
    <tr class="max-h-8 text-nowrap overflow-auto max-w-24 w-24">
        {#each headers as header}
            <td class="p-2 border max-w-md overflow-auto">
                {JSON.stringify(row[header])}
            </td>
            {/each}
    </tr>
         {/each}
</tbody>
</table>