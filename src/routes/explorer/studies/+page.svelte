<script lang="ts">
    import Table from "$lib/components/Table.svelte";
    import {arcData} from "$lib/store/appData";

    let studyData = $derived(
        $arcData["@graph"].filter((element) => {
            return (
                element["@type"] === "Dataset" &&
                element["additionalType"] === "Study"
            );
        }),
    );

    // function onchange(event) {
    //     console.log("event call...");
    // }
</script>

<main class="flex flex-col">
    {#if studyData.length > 0}
        <Table tableData={studyData}
               tableType="study"
               url="/explorer/studies"
        />
    {:else}
        <p>Arc Data is loading...</p>
    {/if}

</main>


