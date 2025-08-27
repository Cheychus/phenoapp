<script lang="ts">
    import Table from "$lib/components/Table.svelte";
    import {arcData} from "$lib/store/appData";

    let assayData = $derived(
        $arcData["@graph"].filter((element) => {
            return (
                element["@type"] === "Dataset" &&
                element["additionalType"] === "Assay"
            );
        }),
    );
    //  console.log(assayData);


</script>

<main class="flex flex-col">
    {#if assayData.length > 0}
        <Table tableData={assayData}
               tableType="assay"
               url="/explorer/assays"
        />
    {:else}
        <p>Arc data is loading...</p>
    {/if}
</main>


