<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
    import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte'
	import { arcData, studyData, assayData } from '$lib/store/appData';
	import Breadcrump from "$lib/components/Breadcrump.svelte";
	
	let { children } = $props();


	// let {data = $state({})} = $props();
	// let studyData = [];
	// let assayData = [];

	onMount(async () => {
        console.log('load Data...')
        const response = await fetch('/'); // fetch from local proxy endpoint
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
        // console.log(studyData);
		// console.log(assayData);
    });

	const themes = [
		"ipk",
		"light",
		"dark",
		"cupcake",
		"bumblebee",
		"--default",
		"emerald",
		"corporate",
		"synthwave",
		"--prefersdark",
		"retro",
		"cyberpunk",
		"valentine",
		"halloween",
		"garden",
		"forest",
		"aqua",
		"lofi",
		"pastel",
		"fantasy",
		"wireframe",
		"black",
		"luxury",
		"dracula",
		"cmyk",
		"autumn",
		"business",
		"acid",
		"lemonade",
		"night",
		"coffee",
		"winter",
		"dim",
		"nord",
		"sunset",
		"caramellatte",
		"abyss",
		"silk",
	];



	let currentTheme = $state("ipk");

</script>


<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div data-theme={currentTheme} class="font-oswald flex flex-col h-screen">

<Header {themes} bind:currentTheme />
<main class="flex-1 justify-center overflow-auto">

	<section class="mx-layout">
		<Breadcrump />
	</section>


{@render children?.()}
</main>

</div>