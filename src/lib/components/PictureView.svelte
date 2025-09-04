<script lang="ts">

    // get a picture from a url and displays it
    import {onMount} from "svelte";
    import Loader from "$lib/components/Loader.svelte";
    import {userSettings} from "$lib/store/UserSettings.svelte";

    let {
        url,
    } = $props();
    let downloadImage = $derived(userSettings.options.autoDownloadImages)
    let imageUrl = $state();
    let loaded = $state(false);
    onMount(async () => {
        if (downloadImage) {
            await fetchImage();
        }
    })

    $effect(() => {
        if(downloadImage) {
            fetchImage();
        }
    })

    async function fetchImage() {
        downloadImage = true;
        const response = await fetch(`/?target=${encodeURIComponent(url)}`);
        const blob = await response.blob();
        imageUrl = URL.createObjectURL(blob);
        console.log(response);
        console.log(blob);
        console.log(imageUrl);
        loaded = true;
    }

    export function isSupportedType(type: string) {
        switch (type) {
            case '.jpg':
            case '.jpeg':
            case '.png':
                return true;
            default:
                return false;
        }
    }

    let modal;

    function showModal(){
        modal.showModal();
    }

</script>

<!-- Open the modal using ID.showModal() method -->
<dialog bind:this={modal} id="modal" class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold">Hello!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
            </form>
        </div>
    </div>
</dialog>

{#if downloadImage}
    {#if !loaded}
        <Loader />
    {:else}
        <button class="hover:cursor-pointer" onclick={() => showModal()}>
            <img class="w-16 object-contain" src={imageUrl} loading="lazy" alt="API Image">
        </button>

    {/if}
{:else}
    <button class="btn btn-neutral px-4" onclick={() => fetchImage()}>
        Download Image
    </button>
{/if}

