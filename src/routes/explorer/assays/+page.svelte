<script lang="ts">
    import Table from "$lib/components/Table.svelte";
    import { arcData } from "$lib/store/ArcData.svelte";
</script>

<main class="flex flex-col">
    {#if arcData.assayData.length > 0}
        <Table
            tableData={arcData.assayData}
            tableType="assay"
            url="/explorer/assays"
        />
    {:else}
        <p>This Arc does not contain Assay-Data</p>
    {/if}
</main>
