<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
  import { db } from "$lib/store/Database.svelte";
  import { projectStore } from "$lib/store/ProjectsStore.svelte";
    import { userSettings } from "$lib/store/UserSettings.svelte";

    function changeSelectedArc(){
        userSettings.selectArc()

        let path = page.url.pathname;
        let allowedPaths = [
            "/overview",
            "/studies",
            "/assays",
            "/explorer",
            "/setup"
    ]

    const isAllowed = allowedPaths.some((end) => path.endsWith(end));
        if(!isAllowed){
            console.log('change is not allowed here, goto overview');
            goto("/explorer/overview");
        }
    }
    // compare api pojects last activity with database last activitys
    const apiArcs = projectStore.projects
    const dbArcs = await db.instance.getArcs();

    

</script>

<div class="flex gap-2">
    <select
        bind:value={userSettings.selectedArcId}
        onchange={() => changeSelectedArc()}
        class="select select-primary"
    >
        <option disabled value="">Select your Arcs here</option>
        {#each userSettings.arcs as arc}
            <option value={String(arc.id)}>{arc.name}</option>
        {/each}
    </select>

    

    {#if !page.url.pathname.startsWith("/explorer")}
        <button
            class="btn btn-accent px-8"
            onclick={() => goto("/explorer/overview")}
            >Explore Arc
        </button>
    {/if}

    <button class="btn btn-secondary" disabled>Update Arcs (0)</button>
</div>
