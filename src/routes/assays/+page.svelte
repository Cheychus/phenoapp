<script lang="ts">
    import Table from '$lib/components/Table.svelte';
   // import type { PageProps } from './$types';
    import {onMount} from "svelte";

   // let { data }: PageProps = $props();

    let assayData = [];
    let data;


    onMount(async () => {
        console.log('load Data...')
        const response = await fetch('/'); // fetch from local proxy endpoint
        data = await response.json();
        console.log(data['@graph']);

        // Extract Study Data
        data['@graph'].forEach(element => {
            if(element['@type'] === 'Dataset' && element['additionalType'] === 'Assay'){
                assayData = [...assayData, element];
            }
        });
        console.log(assayData);
    });

    function onchange(event){
        console.log('do something');
    }


</script>

<h1 class="text-center text-2xl font-bold p-2">Assay Data</h1>

<select {onchange} class="border p-1 mb-1 max-w-32 rounded-sm">
    {#each assayData as assay}
        <option value={assay.identifier}>{assay.identifier}</option>
    {/each}
</select>

<Table tableData={assayData} />