<script lang="ts">
  import { userSettings } from "$lib/store/UserSettings.svelte";
  import { db } from "$lib/store/Database.svelte";
  import { showToast } from "$lib/utils/toast";
  import Loader from "./Loader.svelte";
  import LoadType from "./Loader.svelte";

  let { baseUrl, url, name, avatar_url, created_at, description = "No description", http_url_to_repo, id, last_activity_at, namespace, readme_url, star_count } = $props();

  const apiUrl = `https://git.nfdi4plants.org/api/v4/projects/${id}/packages/generic/isa_arc_json/0.0.1/arc-ro-crate-metadata.json`;
  let downloaded = $state(userSettings.isArcExisting(id));
  let loading = $state(false);

  async function downloadFile(name: string, url: string) {
    if (loading) {
      console.log("already downloading...");
      return;
    }
    if (userSettings.isArcExisting(id)) {
      showToast("error", "Arc is already downloaded!");
      return;
    }
    loading = true;
    const res = await fetch(`/?target=${encodeURIComponent(url)}`);
    if (!res.ok) {
      console.error("Download failed", res.status);
      return;
    }

    //const blob = await res.blob();
    // const text = await res.text();
    const json = await res.json();
    console.log(json, "downloaded Arc");
    // console.log(db, "db instance");
    const arcObject = {
      name: name,
      id: id,
      url: url,
      content: json,
    };
    userSettings.addArc(arcObject);
    downloaded = true;
    loading = false;
    showToast("success", "Successfully downloaded Arc");
  }

  async function removeFile(id: string) {
    await userSettings.removeArc(id);
    if (id === userSettings.selectedArcId) {
      userSettings.selectedArcId = "";
    }
    downloaded = false;
    showToast("success", "Removed Arc from list!");
  }

  function daysBetweenNow(dateString: string): number {
    // Datum aus String erzeugen
    const givenDate = new Date(dateString);

    // Heute (lokale Zeit)
    const now = new Date();

    // Unterschied in Millisekunden
    const diffMs = now.getTime() - givenDate.getTime();

    // In Tagen umrechnen
    return diffMs / (1000 * 60 * 60 * 24);
  }
</script>

<div class="card w-full bg-base-100 shadow-sm">
  <figure class="flex flex-col justify-start items-start">
    <div class="bg-primary w-full h-10"></div>
    {#if avatar_url}
      <img class="p-2 pl-6 mr-auto max-h-30 object-contain" src={avatar_url} alt="Project Image" />
    {/if}
  </figure>
  <div class="card-body pt-0">
    <h2 class="card-title pt-2 text-neutral flex items-center">
      <a href="/setup/{id}" class="text-info">{name}</a>
      <div class="ml-auto flex gap-2 text-base font-normal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-warning">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
        {star_count}
      </div>
    </h2>

    <div class="flex flex-col gap-2">
      {#if namespace}
        <div class="flex items-center gap-2">
          {#if namespace.avatar_url}
            <div>
              {#if namespace.avatar_url.startsWith("/uploads")}
                <img class="w-10 h-10 rounded-full" src={baseUrl + "/" + namespace.avatar_url} alt="User avatar" />
              {:else}
                <img class="w-10 h-10 rounded-full" src={namespace.avatar_url} alt="User avatar" />
              {/if}
            </div>
          {/if}

          <p>
            <a href={namespace?.web_url} class="text-info" target="_blank">{namespace?.name}</a>
          </p>
        </div>
      {/if}

      {#if description}
        <div class="collapse collapse-arrow bg-base-100 border-base-300 border">
          <input type="checkbox" />
          <div class="collapse-title font-semibold">Description</div>
          <div class="collapse-content text-sm">
            {description}
          </div>
        </div>
      {/if}

      <p>ID: {id}</p>
      <p>
        last activity: {new Date(last_activity_at).toLocaleDateString("de-DE")}
        ({Math.round(daysBetweenNow(last_activity_at))} days ago)
      </p>
      <p>
        created At: {new Date(created_at).toLocaleDateString("de-DE")} ({Math.round(daysBetweenNow(created_at))}
        days ago)
      </p>
      <div class="flex gap-2">
        <a href={readme_url} class="btn btn-primary btn-sm" target="_blank">Open Readme</a>
        <a href={http_url_to_repo} class="btn btn-primary btn-sm" target="_blank">Open Git Repository</a>
      </div>
    </div>
    <div class="card-actions justify-end">
      {#if !downloaded}
        <button type="button" class="btn relative flex items-center justify-center btn-accent px-12 min-w-42" onclick={() => downloadFile(name, apiUrl)}>
          {#if loading}
            <div class="absolute left-4 flex items-center justify-center">
              <Loader />
            </div>
          {/if}
          Download
        </button>
      {:else}
        <button type="button" class="btn btn-secondary px-12 min-w-42" onclick={() => removeFile(id)}>Remove</button>
      {/if}
    </div>
  </div>
</div>
