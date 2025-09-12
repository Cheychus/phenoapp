<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { userSettings } from "$lib/store/UserSettings.svelte";

    function changeSelectedArc(){
        userSettings.selectArc()

        let path = page.url.pathname;
        let allowedPaths = [
            "/overview",
            "/studies",
            "/assays",
            "/explorer"
    ]

    const isAllowed = allowedPaths.some((end) => path.endsWith(end));
        if(!isAllowed){
            console.log('change is not allowed here, goto overview');
            goto("/explorer/overview");
        }
    }

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
            class="btn btn-accent"
            onclick={() => goto("/explorer/overview")}
            >Explore Arc
        </button>
    {/if}
</div>
