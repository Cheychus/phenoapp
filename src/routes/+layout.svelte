<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
    import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte'
	import { arcData, studyData, assayData } from '$lib/store/appData';
	
	let { children } = $props();


	// let {data = $state({})} = $props();
	// let studyData = [];
	// let assayData = [];

	onMount(async () => {
        console.log('load Data...')
        const response = await fetch('/'); // fetch from local proxy endpoint
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
        // console.log(studyData);
		// console.log(assayData);
    });

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
<div class="flex flex-col w-full justify-center p-2">

{@render children?.()}
</div>