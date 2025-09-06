<script lang="ts">
  import { projectStore } from "$lib/store/ProjectsStore.svelte";
  import { onMount } from "svelte";

  let { url } = $props();
  let markdown = $state();

  // console.log(url);

  onMount(async () => {
        const response = await fetch(url)
        const data = await response.text();
        markdown = data;
    
  });
</script>

{markdown}
