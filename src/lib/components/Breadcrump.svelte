<script lang="ts">
    import {page} from '$app/state'

    let segments = $derived(() => {
        // console.log(segments.length);
        return page.url.pathname.split('/').filter(Boolean);
    });

    const buildPath = (i: number) => '/' + segments().slice(0, i + 1).join('/');

</script>


<div class="py-3 breadcrumbs text-sm text-neutral">
    <ul>
        <li><a href="/">Home</a></li>
        {#each segments() as segment, i}
            <li>
                {#if i === segments.length - 1}
                    <span class="font-semibold capitalize">{segment}</span>
                {:else}
                    <a href={buildPath(i)} class="capitalize">{segment}</a>
                {/if}
            </li>
        {/each}
    </ul>

</div>