<script lang="ts">
  import { PathResolver } from "$lib/services/PathResolver";
  import { arcData } from "$lib/store/ArcData.svelte";
  import { resourceStore } from "$lib/store/ResourceStore.svelte";

  import type { ArcResource, ArcResourceType } from "$lib/types/types";
  import { getCleanPath, getResourceType, isPictureType } from "$lib/utils/typeHandler";
  import { onDestroy, onMount } from "svelte";
  import MarkdownView from "./MarkdownView.svelte";
  import PictureView from "./PictureView.svelte";
  import CsvView from "./CsvView.svelte";
  import { page } from "$app/state";

  let { process } = $props();

  let currentPath = page.url.pathname;
 

  // This component will take in a sample and try to display it in different ways depending on the type
  let resource = $state<ArcResource>();
  onMount(() => {
   // console.log(process, 'arc resource view process');
    const resourceType: ArcResourceType = getResourceType(process.name);

    resource = resourceStore.addResource(process.name, resourceType);
  });

</script>

{#if resource}
  {#if resource.type === "image"}
    <PictureView url={resource.url} title={process.name} />
  {/if}

  {#if resource.type === "markdown"}
    <MarkdownView {resource} url={resource.url} name={process.name} />
  {/if}

  {#if resource.type === "csv"}
    <a href="{currentPath}/{resource.name}" class="text-info">CSV Table</a>
  {/if}

  {#if resource.type === "other"}
    {process.name}
  {/if}
{/if}
