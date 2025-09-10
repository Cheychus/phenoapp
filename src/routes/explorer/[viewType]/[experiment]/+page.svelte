<script lang="ts">
    import ProcessTable from "$lib/components/ProcessTable.svelte";
    import { arcData } from "$lib/store/ArcData.svelte.js";
    import type { GraphNode } from "$lib/types/types.js";

    let { data } = $props();
    let { experimentName } = data;

    let processData: any = $derived(arcData.graph.find((e: GraphNode) => e.identifier === experimentName));

    // $inspect(processData);
</script>

<section class="mx-layout">
    {experimentName}

    <ProcessTable data={processData} identifier={experimentName} type={"assay"} />

</section>
