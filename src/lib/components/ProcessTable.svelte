<script lang="ts">
    import { arcData } from "$lib/store/ArcData.svelte";
    import SourceModal from "./SourceModal.svelte";

    let { identifier } = $props();

    let studyOrAssay = arcData.graph.find((e) => {
        return e.identifier === identifier;
    });

    let processes = $derived(
        studyOrAssay?.about
            ? studyOrAssay.about.map((e) => arcData.getObjectById(e["@id"]))
            : [],
    );

    function createPagination() {
        let currentPage = $state(0);
        let maxEntries = $state(10);
        let maxPages = $derived(Math.floor(processes.length / maxEntries));
        let startIndex = $derived(currentPage * maxEntries);
        let paginatedEntries = $derived(
            processes.slice(startIndex, startIndex + maxEntries),
        );

        return {
            get currentPage() {
                return currentPage;
            },
            set currentPage(value: number) {
                currentPage = value;
            },
            get maxPages() {
                return maxPages;
            },
            get paginatedEntrys() {
                return paginatedEntries;
            },
            get maxEntries() {
                return maxEntries;
            },
            set maxEntries(entries: number) {
                maxEntries = entries;
                currentPage = 0;
            },
            nextPage: () => (currentPage += 1),
            prevPage: () => (currentPage -= 1),
            debug: () => {
                console.log(
                    `Page number: ${currentPage} \t Max pages: ${maxPages} \t max Entrys: ${maxEntries}`,
                );
                console.log(`Paginated Entrys: ${paginatedEntries}`);
            },
        };
    }

    const pagination = createPagination();
    let modalProcess = $state();
    let modalSource = $state();

    let modal;
    function showModal() {
        //  console.log(modalProcess);
        modal.showModal();
    }
</script>


<dialog bind:this={modal} id="my_modal_2" class="modal">
    <div class="modal-box max-w-2/3">
        {#if modalSource}
            <SourceModal entity={modalSource} />
            {:else}
            <p>hello</p>
        {/if}
        
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>

{#if arcData.graph.length === 0}
    <p>Arc Data is loading...</p>
{:else if !studyOrAssay}
    <p>
        No Study or Assay with the name: <strong>{identifier}</strong> was found!
    </p>
{:else}
    <!-- <p>Study or Assay: <strong>{identifier}</strong> loaded!</p> -->
{/if}

<div class="flex justify-end">
    <p class="mr-auto">Processes: {processes.length}</p>
    <p class="mr-auto">Current Page: {pagination.currentPage}</p>
    <div class="flex gap-2">
        Max Entrys:
        <button
            onclick={() => (pagination.maxEntries = 10)}
            class="text-info hover:text-info-content"
            class:underline={pagination.maxEntries === 10}
        >
            10
        </button>
        <button
            onclick={() => (pagination.maxEntries = 50)}
            class="text-info hover:text-info-content"
            class:underline={pagination.maxEntries === 50 ? "underline" : ""}
        >
            50
        </button>
        <button
            onclick={() => (pagination.maxEntries = 100)}
            class="text-info hover:text-info-content"
            class:underline={pagination.maxEntries === 100 ? "underline" : ""}
        >
            100
        </button>
        <button
            onclick={() => (pagination.maxEntries = processes.length)}
            class="text-info hover:text-info-content"
            class:underline={pagination.maxEntries === processes.length
                ? "underline"
                : ""}
        >
            All
        </button>
    </div>
</div>

<div class="bg-base-200">
    <table class="table table-pin-rows">
        <thead>
            <tr class="bg-base-300">
                <th class="w-1"></th>
                <th>Source</th>
                <th>Protocol</th>
                <th>Sample</th>
            </tr>
        </thead>
        <tbody>
            {#each pagination.paginatedEntrys as process, i}
                <tr>
                    <td
                        >{i +
                            1 +
                            pagination.currentPage * pagination.maxEntries}</td
                    >
                    <td>
                        <button
                            class="cursor-pointer text-info hover:text-info-content"
                            onclick={() => {
                                modalProcess = process;
                                modalSource = arcData.getObjectById(
                                    process?.object['@id'],
                                );
                                console.log(modalSource);
                                showModal();
                            }}
                        >
                            {arcData.getObjectById(process?.object["@id"]).name}
                        </button>
                    </td>
                    <td
                        >{arcData.getObjectById(
                            process?.executesLabProtocol["@id"],
                        ).name}</td
                    >

                    <td>
                         <button
                            class="cursor-pointer text-info hover:text-info-content"
                            onclick={() => {
                                modalProcess = process;
                                modalSource = arcData.getObjectById(
                                    process?.result['@id'],
                                );
                                showModal();
                            }}
                        >
                            {arcData.getObjectById(process?.result["@id"]).name}
                        </button>
                        
                        </td
                    >
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<div class="w-full grid grid-cols-[1fr_2fr_2fr_1fr] gap-2">
    <button
        onclick={() => (pagination.currentPage = 0)}
        class="btn btn-secondary"
        >Start
    </button>
    <button
        onclick={() => pagination.prevPage()}
        class="btn btn-primary"
        class:btn-disabled={pagination.currentPage === 0}
    >
        Previous Page
    </button>
    <button
        onclick={() => pagination.nextPage()}
        class="btn btn-primary"
        class:btn-disabled={pagination.currentPage === pagination.maxPages}
    >
        Next Page</button
    >
    <button
        onclick={() => (pagination.currentPage = pagination.maxPages)}
        class="btn btn-secondary">End</button
    >
</div>
