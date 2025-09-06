<script lang="ts">
    import { PathResolver } from "$lib/services/PathResolver";
    import { arcData } from "$lib/store/ArcData.svelte";
    import { resourceStore } from "$lib/store/ResourceStore.svelte";

    import type { ArcResourceType } from "$lib/types/types";
    import { getCleanPath, getResourceType, isPictureType } from "$lib/utils/typeHandler";
    import MarkdownView from "./MarkdownView.svelte";
    import PictureView from "./PictureView.svelte";

    let { sample,
     } = $props();

    // This component will take in a sample and try to display it in different ways depending on the type

     const resourceType: ArcResourceType = getResourceType(sample.name);
     
    const resource = resourceStore.addResource(sample.name, resourceType);
    console.log(resource, "resource" );

</script>

{#if resource.type === "image"}
    <PictureView url={resource.url} title={sample.name}/>
{/if}

{#if resource.type === "markdown"}
    <MarkdownView url={resource.url} />
{/if}

{#if resource.type === "other"}
    {sample.name}
{/if}


