<script lang="ts">
  import { projectStore } from "$lib/store/ProjectsStore.svelte";
  import { onMount } from "svelte";

  let { url } = $props();
  let markdown = $state();

  // console.log(url);

  onMount(async () => {
      markdown = await projectStore.fetchMarkdownFile(url);
  });
</script>

{markdown}
