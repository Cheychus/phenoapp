<script lang="ts">
    import DownloadArc from "$lib/components/DownloadArc.svelte";
    import {goto} from "$app/navigation";
    import {userSettings} from "$lib/store/UserSettings.svelte";
    import {onMount} from "svelte";
    import Loader from "$lib/components/Loader.svelte";
    import {projectStore} from "$lib/store/ProjectsStore.svelte";

   //  let projects: JSON[] = $state([]);
   //  let download = $state(true);

    onMount(async () => {
        // get all projects from api
        await projectStore.init();
    });

    async function fetchProjects(url: string) {
        const res = await fetch(`/?target=${encodeURIComponent(url)}`);
        return await res.json();
    }

    //  $inspect(userSettings.selectedArcId);
    // $inspect(userSettings.arcs, "arcs");
</script>

<section class="mx-layout flex flex-col gap-2">
    <div class="font-bold text-neutral text-2xl">Setup Arcs</div>
    <p>
        First you need to download some Arcs and then you can select them here
        for exploring
    </p>

    <div class="flex gap-2">
        <select
                bind:value={userSettings.selectedArcId}
                onchange={() => userSettings.selectArc()}
                class="select select-primary"
        >
            <option disabled value="">Select your Arcs here</option>
            {#each userSettings.arcs as arc}
                <option value={String(arc.id)}>{arc.name}</option>
            {/each}
        </select>

        <button
                class="btn btn-accent"
                onclick={() => goto("/explorer/overview")}>Explore Arc
        </button
        >
    </div>

    <div class="font-bold text-neutral text-2xl pt-4">Arc Database</div>
    <p>Here you can choose some Arcs to download for the Arc Explorer</p>

    <div class="flex gap-2 items-center">
        <label class="input input-primary">
            <svg
                    class="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
            >
                <g
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2.5"
                        fill="none"
                        stroke="currentColor"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                </g>
            </svg>
            <input type="search" class="grow" placeholder="Search Arcs"/>
        </label>

        {#if projectStore.downloadProjects}
            <Loader/>
        {:else}
            <p>{projectStore.projects.length} Arcs found</p>
        {/if}
    </div>
    <div class="w-2/3 flex flex-col gap-2">
        <div class="flex flex-col gap-2">
            {#if projectStore.projects.length <= 0}
                <Loader loadType="skeleton"/>
                <Loader loadType="skeleton"/>
                <Loader loadType="skeleton"/>
                <Loader loadType="skeleton"/>
                <Loader loadType="skeleton"/>
            {/if}
        </div>

        {#each projectStore.projects as project}
            <DownloadArc {...project} baseUrl="http://git.nfdi4plants.org"/>
        {/each}
    </div>
</section>
