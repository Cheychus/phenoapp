<script lang="ts">
  import CsvView from '$lib/components/CsvView.svelte';
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
</script>


<section class="px-16">
<CsvView />
</section>
