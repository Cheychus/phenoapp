<script lang="ts">
    export const LoadType = {
        Circle: "circle",
        Skeleton: "skeleton",
    };

    let { loadType = LoadType.Circle } = $props();
</script>

{#if loadType === LoadType.Circle}
    <div>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="animate-spin inline-block lucide lucide-loader-circle-icon lucide-loader-circle"
            ><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg
        >
    </div>
{:else if loadType === LoadType.Skeleton}
    <div class="card animate-pulse w-full h-80 bg-base-200 shadow-sm">
    </div>
{/if}
