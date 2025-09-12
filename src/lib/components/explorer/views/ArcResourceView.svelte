<script lang="ts">
    import { resourceStore } from "$lib/store/ResourceStore.svelte";

    import type { ArcResource } from "$lib/types/types";
    import { onMount } from "svelte";
    import MarkdownView from "./MarkdownView.svelte";
    import PictureView from "./PictureView.svelte";
    import { page } from "$app/state";
    import CharacteristicsView from "./CharacteristicsView.svelte";

    let { process } = $props();

    let modal;

    let currentPath = page.url.pathname;

    // This component will take in a sample and try to display it in different ways depending on the type
    let resource = $state<ArcResource>();
    let name = $state(process.name);
    onMount(() => {
        if (!process.name) {
            name = "undefined";
        } else {
            resource = resourceStore.addResource(process.name);
        }
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
        <a href="{currentPath}/data/{resource.name}" class="btn btn-neutral"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
</svg>
Open {resource.name}</a>
    {/if}

    {#if resource.type === "other"}


        <button bind:this={modal} class="btn min-w-40" onclick={() => modal.showModal()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
            {name}
            </button
        >
        <dialog bind:this={modal} id="modal" class="modal">
            <div class="modal-box min-w-11/12">
                <h3 class="text-lg font-bold">{name}</h3>
                <CharacteristicsView {process} />
                <p class="py-4 mt-auto">
                    Press ESC key or click the button below to close
                </p>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn btn-secondary">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    {/if}
{/if}
