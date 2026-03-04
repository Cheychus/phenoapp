<script lang="ts">
  import DownloadArc from '$lib/components/setup/DownloadArc.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();


    const { project } = data;

    console.log(data);
</script>

<DownloadArc {...project} />