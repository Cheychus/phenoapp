<script lang="ts">
    import Table from "$lib/components/Table.svelte";
    import { arcData } from "$lib/store/appData";

    let assayData = $derived(
        $arcData["@graph"].filter((element) => {
            return (
                element["@type"] === "Dataset" &&
                element["additionalType"] === "Assay"
            );
        }),
    );
    console.log(assayData);


</script>

<h1 class="text-center text-2xl font-bold p-2">Assay Data</h1>

<Table tableData={assayData}
       tableType="assay"
       url="/assays"
/>
