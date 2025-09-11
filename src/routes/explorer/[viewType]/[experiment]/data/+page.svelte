<script lang="ts">
  import { page } from "$app/state";
  import { arcData } from "$lib/store/ArcData.svelte";
  import { resourceStore } from "$lib/store/ResourceStore.svelte";

  console.log(page.params);
  const experiment = page.params.experiment;

  let datafiles = $derived(arcData.assayDatafiles.get(experiment));

  // $inspect(datafiles);
</script>

<section class="mx-layout py-4">
  {datafiles?.length} datafiles found

  <div class="py-2 flex flex-col gap-2">
    {#each datafiles as df}
      <a href="./data/{df.name}" class="link text-info hover:text-info-content">
        {df.name}
      </a>
    {/each}
  </div>
</section>
