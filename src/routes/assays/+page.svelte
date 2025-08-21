<script lang="ts">
    import Table from "$lib/components/Table.svelte";
    import { data } from "$lib/store/appData";

    let assayData = $derived(
        $data["@graph"].filter((element) => {
            return (
                element["@type"] === "Dataset" &&
                element["additionalType"] === "Assay"
            );
        }),
    );
    console.log(assayData);

    function onchange(event) {
        console.log("do something");
    }
</script>

<h1 class="text-center text-2xl font-bold p-2">Assay Data</h1>

<select {onchange} class="border p-1 mb-1 max-w-32 rounded-sm">
    {#each assayData as assay}
        <option value={assay.identifier}>{assay.identifier}</option>
    {/each}
</select>

<Table tableData={assayData} />
