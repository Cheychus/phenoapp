<script lang="ts">
    import {arcData} from "$lib/store/ArcData.svelte";
    import SourceModal from "./SourceModal.svelte";
    import PictureView from "$lib/components/PictureView.svelte";
    import {userSettings} from "$lib/store/UserSettings.svelte";

    let {identifier} = $props();

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

    let results = $derived(pagination.paginatedEntrys.map((process) => arcData.getObjectById(process.result['@id'])));
    $inspect(results);
</script>


<dialog bind:this={modal} id="my_modal_2" class="modal">
    <div class="modal-box max-w-2/3">
        {#if modalSource}
            <SourceModal entity={modalSource}/>
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

<div class="shadow-sm p-2 flex flex-col gap-2 mb-2">
    <div class="font-bold text-lg">Table Options</div>
    <div class="flex gap-2">
        <div class="flex gap-2">
            <input bind:checked={userSettings.options.autoDownloadImages} type="checkbox" class="checkbox" />
            <div class="">Auto Download Images</div>
        </div>

        <!--    <input type="checkbox" checked="checked" class="checkbox" />-->
    </div>

</div>

<div class="flex justify-end p-2 shadow-sm">


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


                <td class="w-fit flex items-center justify-center">
                    {#if true}
                        <PictureView
                                url="https://git.nfdi4plants.org/api/v4/projects/2928/repository/files/assays%2Ftmp%2Fdataset%2Fphotos%2FHOR_10886.jpg/raw?lfs=true"

                        />
                    {:else }
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
                            {results[i].name}
                        </button>
                    {/if}


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
        Next Page
    </button
    >
    <button
            onclick={() => (pagination.currentPage = pagination.maxPages)}
            class="btn btn-secondary">End
    </button
    >
</div>
