<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
    import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte'
	import { arcData, studyData, assayData } from '$lib/store/appData';
	import Breadcrump from "$lib/components/Breadcrump.svelte";

	import { userSettings } from "$lib/store/UserSettings.svelte.js";
	
	let { children } = $props();

	onMount(async () => {
        console.log('load Data...')
        const response = await fetch('/?target=https://git.nfdi4plants.org/api/v4/projects/2928/packages/generic/isa_arc_json/0.0.1/arc-ro-crate-metadata.json'); // fetch from local proxy endpoint
		if(!response){
			return console.error('Error fetching Data...');
		}
        $arcData = await response.json();
        console.log($arcData['@graph']);
	
        // Extract Study Data
        $arcData['@graph'].forEach(element => {
            if(element['@type'] === 'Dataset' && element['additionalType'] === 'Study'){
                $studyData = [...$studyData, element];
            }
		// 	// Assay Data
			if(element['@type'] === 'Dataset' && element['additionalType'] === 'Assay'){
                $assayData = [...$assayData, element];
            }
	
        });
    });


</script>


<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div data-theme={userSettings.theme} class="font-oswald flex flex-col h-screen">

<Header />
<main class="flex-1 justify-center overflow-auto">

	<section class="mx-layout">
		<Breadcrump />
	</section>


{@render children?.()}
</main>

</div>