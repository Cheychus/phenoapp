<script lang="ts">
    import type { PageProps } from "../$types";
    import { arcData } from "$lib/store/ArcData.svelte";
    import { userSettings } from "$lib/store/UserSettings.svelte";
    import Overview from "$lib/components/explorer/Overview.svelte";
    import Experiments from "$lib/components/explorer/Experiments.svelte";

    let assays = $derived(arcData.assayData);
    let studies = $derived(arcData.studyData);
 

    let { data = { viewType: "overview" } }: PageProps = $props();
    let { viewType } = $derived(data);

</script>

<section class="mx-layout flex flex-col gap-2">
    {#if !userSettings.selectedArc}
        <p>You need to select an Arc first!</p>
    {:else if viewType === "assays"}
        <Experiments experiments={assays}/>
    {:else if viewType === "studies"}
        <Experiments experiments={studies}/>
    {:else}
       <Overview />
    {/if}
</section>
