<script lang="ts">
    import { page } from '$app/state';
    import type { LayoutProps } from './$types';

    let { children }: LayoutProps = $props();

    let viewType = $derived(page.params.viewType);
</script>

    <section class="mx-layout">
    <!-- name of each tab group should be unique -->
    <div role="tablist" class="tabs tabs-box">
        <a
            role="tab"
            href="/explorer/overview"
            class="tab {viewType === "overview"
                ? 'tab-active'
                : ''}"
        >
            Overview
        </a>
        <a
            role="tab"
            href="/explorer/studies"
            class="tab {viewType === "studies"
                ? 'tab-active'
                : ''}"
        >
            Studies
        </a>
        <a
            role="tab"
            href="/explorer/assays"
            class="tab {viewType === "assays"
                ? 'tab-active'
                : ''}"
        >
            Assays
        </a>
    </div>
</section>

{@render children?.()}