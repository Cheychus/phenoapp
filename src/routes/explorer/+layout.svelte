<script lang="ts">
    import {arcData} from "$lib/store/appData";
    import {page} from "$app/state";

    let { children } = $props();

    let currentPath = $derived.by(() => page.url.pathname);

    let studyData = $derived(
        $arcData["@graph"].filter((element) => {
            return (
                element["@type"] === "Dataset" &&
                element["additionalType"] === "Study"
            );
        }),
    );
</script>




<section class="mx-layout flex flex-col gap-2">
    <!-- name of each tab group should be unique -->
    <div role="tablist" class="tabs tabs-box">
        <a role="tab" href="/explorer/overview"
           class="tab {currentPath.startsWith('/explorer/overview') ? 'tab-active' : ''}">
            Overview
        </a>
        <a role="tab" href="/explorer/studies"
           class="tab {currentPath.startsWith('/explorer/studies') ? 'tab-active' : ''}">
            Studies
        </a>
        <a role="tab" href="/explorer/assays"
           class="tab {currentPath.startsWith('/explorer/assays') ? 'tab-active' : ''}">
            Assays
        </a>
    </div>

    {@render children?.()}

</section>