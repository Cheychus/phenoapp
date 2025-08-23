<script lang="ts">
    import type { PageProps } from "./$types";
    import {arcData} from "$lib/store/appData";

    let { data }: PageProps = $props();

    console.log(data.slug);



    let assay = $derived(
        $arcData["@graph"].find((e) => {
            return e.identifier === data.slug;
        }),
    );
    let processes = $derived(
        assay?.about
            ? assay.about.map((e) => arcData.getObjectByID(e["@id"]))
            : [],
    );



</script>



{#if $arcData["@graph"].length === 0}
    <p>Arc Data wird geladen...</p>
{:else if !assay}
    <p>Kein Assay mit dem Namen: <strong>{data.slug}</strong> gefunden</p>
{:else}
    <p>Assay: <strong>{data.slug}</strong> geladen!</p>
{/if}

<div class="h-2/3 overflow-x-auto border">
    <table class="table table-pin-rows">
        <thead>
        <tr>
            <th>Source</th>
            <th>Protocol</th>
            <th>Sample</th>
        </tr>
        </thead>
        <tbody>
        {#each processes as process}
            <tr>
                <td>{arcData.getObjectByID(process?.object["@id"]).name }</td>
                <td
                >{arcData.getObjectByID(process?.executesLabProtocol["@id"]).name}</td
                >
                <td>{arcData.getObjectByID(process?.result["@id"]).name}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>