<script>
    // import image from "$lib/assets/ARC-isa-cwl-decorations.png";
    import { goto } from "$app/navigation";

    export let username = "world";
</script>

<section class="mx-layout flex flex-col gap-8">
    <div class="bg-primary rounded-lg flex">
        <div class="w-1/2 p-12 flex flex-col gap-8">
            <div class="font-medium text-5xl text-primary-content">
                Explore ARC and RO Crate metadata
            </div>
            <p class="text-primary-content italic">
                phenoapp makes exploring arc metadata easy with an intuitive web
                interface and tools for displaying data
            </p>

            <div class="flex w-full gap-12">
                <button
                    class="btn btn-lg btn-accent"
                    onclick={() => {
                        goto("/setup");
                    }}>Get started</button
                >
            </div>
        </div>

        <div class="w-1/2 p-8 flex justify-center items-center h-full">
            <!-- <img src={image} alt="Image showing nice website features or another big eyecatcher. Not final yet"> -->
        </div>
    </div>

    <div
        class="p-4 bg-neutral flex flex-col gap-4 rounded-lg text-neutral-content"
    >
        <h1 class="text-2xl">What are ARC's?</h1>
        <p>
            The ARC is a framework for organizing and documenting research data,
            as well as a container that continuously supports collaboration,
            data exchange, and adherence to FAIR principles among various
            researchers. The ARC can be checked for completeness and quality at
            any time and converted into a citable data publication without
            interrupting the research or documentation process. It is built on
            widely accepted research data standards such as RO-Crate, ISA, and
            abstract CWL.
        </p>
        <a href="https://arc-rdm.org/" target="_blank" class="text-info link"><cite>https://arc-rdm.org/</cite></a>
    </div>
</section>
