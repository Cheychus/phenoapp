<script>
    // import image from "$lib/assets/ARC-isa-cwl-decorations.png";
    import {goto} from "$app/navigation";

    export let username = 'world';
</script>

<section class="mx-layout flex flex-col gap-8">
    <div class="bg-primary rounded-lg flex ">
        <div class="w-1/2 p-12 flex flex-col gap-8">
            <div class="font-medium text-5xl text-primary-content">
                Explore ARC and RO Crate metadata
            </div>
            <p class="text-primary-content italic">phenoapp makes exploring arc metadata easy with an intuitive web interface and tools for displaying data</p>

            <div class="flex w-full gap-12">
                <button class="btn btn-lg btn-accent" onclick={() => {goto("/setup")}}>Get started</button>
            </div>
        </div>

        <div class="w-1/2 p-8 flex justify-center items-center h-full">
            <!-- <img src={image} alt="Image showing nice website features or another big eyecatcher. Not final yet"> -->
        </div>
    </div>

    <div class="p-4 bg-neutral flex flex-col gap-4 rounded-lg text-neutral-content">
        <h1 class="text-lg">What is Arc-Ro-Crate?</h1>
        <p>
            ARC RO-Crate is ARC’s machine-optimized packaging format leveraging RO-Crate’s JSON-LD structure—bundling data and metadata into a single archive.
            It faithfully implements ARC’s unified model of experimental (ISA) and computational (CWL) workflows via a process graph,
            enabling seamless exchange, preservation, and reuse of research context across platforms.
        </p>

    </div>

</section>




