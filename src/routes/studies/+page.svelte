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

<h1 class="text-center text-2xl font-bold p-2">Study Data</h1>


{#if studyData.length > 0}
    <Table tableData={studyData}
           tableType="study"
           url="/studies"
    />
{:else}
    <p>Arc Data is loading...</p>
{/if}

