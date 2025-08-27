<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";

    let { currentTheme = $bindable(), themes } = $props();

    function setTheme(theme: string) {
        console.log('theme change');
        console.log(theme);
        currentTheme = theme;

    }

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

    <div>
        Theme:
        <select bind:value={currentTheme} onchange={() => setTheme(currentTheme)} class="select select-primary max-w-fit">
            <option disabled selected>Pick a theme</option>
            {#each themes as theme}
                <option value={theme}>{theme}</option>
            {/each}
        </select>
    </div>



</div>


