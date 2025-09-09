<script lang="ts">
  import CsvView from '$lib/components/CsvView.svelte';
  import { resourceStore } from '$lib/store/ResourceStore.svelte.js';
  import type { ArcResource } from '$lib/types/types.js';


    let {data} = $props();
    let {filename} = data;
    
    console.log(data.filename);

    const resource: ArcResource | null = $derived(resourceStore.getResourceWithName(filename));
    // $inspect(resourceStore.resources);
    // console.log(resource);

    

</script>
    {#if resource}
      <CsvView csvUrl={resource?.url}/>
      {:else}
      No resource: {filename} found in Resource Store!
     {/if}