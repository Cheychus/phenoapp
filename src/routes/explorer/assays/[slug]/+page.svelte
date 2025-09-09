<script lang="ts">
    import type { PageProps } from "./$types";
    import ProcessTable from "$lib/components/ProcessTable.svelte";

    let { data }: PageProps = $props();

    console.log(data.slug);

</script>


<section class="p-4">
    <ProcessTable identifier={data.slug} type={"assay"} />
</section>



