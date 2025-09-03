<script>
    import {arcData} from "$lib/store/ArcData.svelte";

    let organization = arcData.graph.find((el) => {return el['@type'] === 'Organization'})


</script>

<p class="">Here you find some general information...</p>

<div>Organization: {organization?.name}</div>

