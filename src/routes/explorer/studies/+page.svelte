<script lang="ts">
    import Table from "$lib/components/Table.svelte";
    import { arcData } from "$lib/store/ArcData.svelte";
</script>

<main class="flex flex-col">
    {#if arcData.studyData.length > 0}
        <Table
            tableData={arcData.studyData}
            tableType="study"
            url="/explorer/studies"
        />
    {:else}
        <p>This Arc does not contain Study-Data</p>
    {/if}
</main>
