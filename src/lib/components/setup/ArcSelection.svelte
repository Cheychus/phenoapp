<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { Database } from "$lib/store/Database.svelte";
  import { projectStore } from "$lib/store/ProjectsStore.svelte";
  import { userSettings } from "$lib/store/UserSettings.svelte";
  import { showToast } from "$lib/utils/toast";
  import { onMount } from "svelte";

  function changeSelectedArc() {
    userSettings.selectArc();

    let path = page.url.pathname;
    let allowedPaths = [
      "/overview",
      "/studies",
      "/assays",
      "/explorer",
      "/setup",
    ];

    const isAllowed = allowedPaths.some((end) => path.endsWith(end));
    if (!isAllowed) {
      console.log("change is not allowed here, goto overview");
      goto("/explorer/overview");
    }
  }

  $inspect(projectStore.upgradeProjects);

  async function updateArcs(){
    const db = await Database.getInstance();
    
    
    projectStore.upgradeProjects.forEach(async(arcId) => {
        const newArc = await projectStore.downloadProject(arcId);
        if(!newArc){
            console.log(`Download updated version from ARC with id: ${arcId} failed!`);
            showToast("error", `Download updated version from ARC with id: ${arcId} failed!`);
            return;
        }

        await db.removeArc(arcId);
        await db.addArc(newArc);
        const idIndex = projectStore.upgradeProjects.indexOf(arcId);
        projectStore.upgradeProjects.splice(idIndex, 1);
        console.log(`ARC ${newArc.name} with id: ${newArc.id} was updated`);

        showToast("success" , `ARC ${newArc.name} with id: ${newArc.id} was updated`)
        
    })
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
      class="btn btn-accent px-8"
      onclick={() => goto("/explorer/overview")}
      >Explore Arc
    </button>
  {/if}

  <button class="btn btn-secondary" disabled={!(projectStore.upgradeProjects.length > 0)}
    onclick={() => updateArcs()}
    >Update Arcs ({projectStore.upgradeProjects.length})</button>
</div>
