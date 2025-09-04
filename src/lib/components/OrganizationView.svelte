<script lang="ts">
    import type {Organization} from "$lib/types/types";

    let { organization }: {organization: Organization} = $props();
</script>

<div class="flex flex-col shadow-sm p-2">
    <div>
        Name: {organization.name}
    </div>
</div>