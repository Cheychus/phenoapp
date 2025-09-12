<script lang="ts">
    import type { Comment } from "$lib/types/types";

    let {comment}: {comment: Comment} = $props();

</script>

{#if comment}
<div class="flex flex-col shadow-sm p-2">
    <div>Name: {comment.name}</div>
    <div>Text: {comment.text}</div>
</div>
{:else}
    <p>No comment data...</p>
{/if}