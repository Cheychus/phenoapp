<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { themes, userSettings } from "$lib/store/UserSettings.svelte.js"

    // function setTheme(theme: string) {
    //     console.log('theme change');
    //     console.log(theme);
    //     currentTheme = theme;
    // }

    let selectedTab = $derived.by(() => {
        console.log('url change');
        if(page.url.pathname.startsWith('/studies')) {
            return 'studies';
        } else if (page.url.pathname.startsWith('/assays')) {
            return 'assays';
        } else {
            return '';
        }
    })

   // $effect(() => console.log(user.theme));

</script>

<div class="navbar px-layout bg-base-100 shadow-sm h-20 gap-8 ">
    <div class="text-primary text-4xl font-bold">
        <div class="relative">
            <button class="cursor-pointer hover:text-secondary"
                    onclick={() => {goto("/")}}>phenoapp</button>
            {#if page.url.pathname === "/"}
                <div class="absolute left-0 right-0 -bottom-5 h-2 bg-secondary"></div>
            {/if}
        </div>

    </div>

    <div class="flex-1 flex gap-4 text-base text-neutral font-bold items-center">
        <div class="relative">
            <button class="cursor-pointer hover:text-secondary"
                    onclick={() => {goto("/setup")}}>Arc Setup</button>
            {#if page.url.pathname === "/setup"}
                <div class="absolute left-0 right-0 -bottom-7 h-2 bg-secondary"></div>
            {/if}
        </div>
        <div class="relative">
            <button class="cursor-pointer hover:text-secondary"
                    onclick={() => {goto("/explorer/overview")}}>Arc Explorer</button>
            {#if page.url.pathname.startsWith('/explorer')}
                <div class="absolute left-0 right-0 -bottom-7 h-2 bg-secondary"></div>
            {/if}
        </div>
    </div>

    <div class="flex items-center gap-2">
        <button class="btn btn-primary" popovertarget="popover-1" style="anchor-name:--anchor-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
            </svg>
        </button>
        <ul class="dropdown menu overflow-y-auto w-52 rounded-box bg-base-100 shadow-sm"
            popover id="popover-1" style="position-anchor:--anchor-1">
            {#each themes as theme}
                <li><a onclick={() => {
                    userSettings.theme = theme;
                    userSettings.saveTheme();
                }}>{theme}</a></li>
            {/each}
        </ul>


    </div>



</div>


