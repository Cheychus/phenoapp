<script lang="ts">
    import { arcData } from "$lib/store/ArcData.svelte";
    import { onMount } from "svelte";

    type SourceObject = {
        name: string;
        additionalProperty: any;
    };

    let { entity } = $props();
         $inspect(entity);
         console.log(entity);

    let sourceObject = $derived(arcData.getObjectById(entity['@id'])) as
        | SourceObject
        | undefined;

    let additionalPropertys = $derived(sourceObject?.additionalProperty);


   // $inspect(sourceObject);
</script>

<div class="grid grid-cols-[auto_1fr]">
    {#if sourceObject}
        <div class="pr-4 py-2 font-bold border-r border-b">Name</div>
        <div class="border-b py-2 pl-2">{sourceObject.name}</div>

        {#if additionalPropertys}
            <div class="my-auto pr-4 py-2 font-bold">Characteristics</div>
            <div>
                {#each additionalPropertys as property}
                    <div
                        class="grid grid-cols-2 gap-2 border-b border-l p-1 pl-2"
                    >
                        <p>{arcData.getObjectById(property["@id"]).name}:</p>
                        <p>{arcData.getObjectById(property["@id"]).value}</p>
                    </div>
                {/each}
            </div>
        {/if}
    {:else}
        <p>No Information found</p>
    {/if}
</div>
