<script lang='ts'>
    import Table from "$lib/components/Table.svelte";
   import { data } from "$lib/store/appData";

let response;
// let data;

let studyData = $derived($data['@graph'].filter((element) => {
    return element['@type'] === 'Dataset' && element['additionalType'] === 'Study';
}));


function onchange(event) {
    console.log('event call...');
}

</script>


<h1 class="text-center text-2xl font-bold p-2">Study Data</h1>

<select {onchange} class="border p-1 mb-1 max-w-32 rounded-sm">
    {#each studyData as study}
        <option value={study.identifier}>{study.name}</option>
    {/each}
</select>

<Table tableData={studyData}/>

