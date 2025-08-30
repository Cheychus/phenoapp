<script lang="ts">

    import DownloadArc from "$lib/components/DownloadArc.svelte";
    import {goto} from "$app/navigation";
    import {userSettings} from "$lib/store/UserSettings.svelte";
    import {onMount} from "svelte";

    let db: IDBDatabase;
    let people: { name: string; age: number }[] = [];

    // DB öffnen/erstellen
    function openDB() {
        return new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open('TestDB', 1);

            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains('people')) {
                    db.createObjectStore('people', { keyPath: 'name' }); // keyPath = eindeutiger Name
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Person hinzufügen
    function addPerson(person: { name: string; age: number }) {
        const tx = db.transaction('people', 'readwrite');
        const store = tx.objectStore('people');
        store.put(person);
        tx.oncomplete = () => loadPeople();
    }

    // Alle Personen laden
    function loadPeople() {
        const tx = db.transaction('people', 'readonly');
        const store = tx.objectStore('people');
        const request = store.getAll();
        request.onsuccess = () => {
            people = request.result as typeof people;
        };
    }

    // Person löschen
    function deletePerson(name: string) {
        const tx = db.transaction('people', 'readwrite');
        const store = tx.objectStore('people');
        store.delete(name);
        tx.oncomplete = () => loadPeople();
    }

    let projects: JSON[] = $state([]);
    onMount(async () => {
        db = await openDB();
        loadPeople();

        projects = await fetchProjects('https://git.nfdi4plants.org/api/v4/projects/');
    });

    function testAdd() {
        const randomAge = Math.floor(Math.random() * 100);
        addPerson({ name: `Person-${Date.now()}`, age: randomAge });
    }



    async function fetchProjects(url: string){
        const res = await fetch(`/?target=${encodeURIComponent(url)}`);
        return await res.json();
    }

    $inspect(projects);






</script>

<!--<button onclick={testAdd}>Add Random Person</button>-->

<!--<ul>-->
<!--    {#each people as p}-->
<!--        <li>-->
<!--            {p.name} - {p.age} Jahre-->
<!--            <button class="btn" onclick={() => deletePerson(p.name)}>Delete</button>-->
<!--        </li>-->
<!--    {/each}-->
<!--</ul>-->

<section class="mx-layout flex flex-col gap-2">
    <div class="font-bold text-neutral text-2xl">
        Setup Arcs
    </div>
    <p>First you need to download some Arcs and then you can select them here for exploring</p>

    <div class="flex gap-2">
            <select class="select select-primary">
                <option disabled selected>Download some Arcs first</option>
                {#each userSettings.arcs as arcs}
                    <option>{arcs.name}</option>
                {/each}
            </select>

            <button class="btn btn-accent" onclick={() => goto('/explorer/overview')}>Explore Arc</button>
    </div>

    <div class="font-bold text-neutral text-2xl pt-4">
        Arc Database
    </div>
    <p>Here you can choose some Arcs to download for the Arc Explorer</p>

    <div class="flex gap-2 items-center">
        <label class="input input-primary">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2.5"
                        fill="none"
                        stroke="currentColor"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                </g>
            </svg>
            <input type="search" class="grow" placeholder="Search Arcs" />
        </label>

        {#if projects.length <= 0}
            <p>Load database...</p>
            {:else}
            <p>{projects.length} Arcs found</p>
        {/if}

    </div>


    {#each projects as project}
        <DownloadArc
                {...project}
                baseUrl = "http://git.nfdi4plants.org"
        />
    {/each}



</section>



