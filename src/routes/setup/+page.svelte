<script lang="ts">

import DownloadArc from "$lib/components/DownloadArc.svelte";
import {goto} from "$app/navigation";
</script>

<section class="mx-layout flex flex-col gap-4">
    <p>Setup your Arc data here...</p>

    <div class="flex gap-2">
        <select class="select select-primary">
            <option disabled selected>Select a Arc here</option>
            <option>Arc 1</option>
            <option>Arc 2</option>
            <option>Arc 3</option>
        </select>

        <button class="btn btn-primary" onclick={() => goto('/explorer/overview')}>Explore Arc</button>
    </div>


    <div class="flex flex-col gap-2">
        <div>Use this download buttons to get some Arc's</div>
        <DownloadArc
                url="https://git.nfdi4plants.org/api/v4/projects/1427/packages/generic/isa_arc_json/0.0.1/arc-ro-crate-metadata.json"
                name="Arc Ro Crate Metadata (Project 1427)"
        />
        <DownloadArc
                url="https://git.nfdi4plants.org/api/v4/projects/1427/packages/generic/isa_arc_json/0.0.1/arc-ro-crate-metadata.json"
                name="Arc Ro Crate Metadata (Project 1427)"
        />
        <DownloadArc
                url="https://git.nfdi4plants.org/api/v4/projects/1427/packages/generic/isa_arc_json/0.0.1/arc-ro-crate-metadata.json"
                name="Arc Ro Crate Metadata (Project 1427)"
        />
    </div>

</section>



