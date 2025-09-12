<script lang="ts">
    import type {Person} from "$lib/types/types";

    let { person }: {person: Person} = $props();
</script>

<div class="flex flex-col shadow-sm p-2">
    <div>
        Name: {person.givenName}
    </div>
    <div>
        Family Name: {person.familyName}
    </div>
    <div>Additional Name: {person.additionalName}</div>
    <div class="flex gap-2">
        Email:
        <div class="text-info">
            {person.email}
        </div>
    </div>
    <div>Address: {person.address}</div>


</div>

