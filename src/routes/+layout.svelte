<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import Header from "$lib/components/Header.svelte";
	import Breadcrump from "$lib/components/Breadcrump.svelte";
	import { userSettings } from "$lib/store/UserSettings.svelte.js";
	import { db } from "$lib/store/Database.svelte";
	import { onMount } from "svelte";
	import type { Arc } from "$lib/store/Database.svelte";

	let { children } = $props();
	let arcs = $state<Arc[]>([]);

	onMount(async () => {
		await db.init();
		arcs = await db.instance.getArcs();
		userSettings.arcs = arcs;
		const find = userSettings.arcs.find((el) => el.id === "2928");
		console.log("find arc:", find);
		            
		userSettings.init();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div data-theme={userSettings.theme} class="font-oswald flex flex-col h-screen">
	<Header />
	<main class="flex-1 justify-center overflow-auto">
		<div class="toast toast-end"></div>

		<section class="mx-layout">
			<Breadcrump />
		</section>

		{@render children?.()}
	</main>
</div>
