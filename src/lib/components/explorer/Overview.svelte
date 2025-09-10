<script>
    import { arcData } from "$lib/store/ArcData.svelte";
    import OrganizationView from "../OrganizationView.svelte";
    import PersonView from "../PersonView.svelte";

</script>
 <section class="pb-8 flex flex-col gap-2">
            <div
                class="collapse collapse-arrow bg-base-100 border-base-300 border"
            >
                <input type="checkbox" />
                <div class="collapse-title font-semibold">
                    Organizations ({arcData.organizations.length})
                </div>
                <div class="collapse-content">
                    <div class="grid grid-cols-2 gap-2">
                        {#each arcData.organizations as organization}
                            <OrganizationView {organization} />
                        {/each}
                    </div>
                </div>
            </div>

            <div
                class="collapse collapse-arrow bg-base-100 border-base-300 border"
            >
                <input type="checkbox" />
                <div class="collapse-title font-semibold">
                    Persons ({arcData.persons.length})
                </div>
                <div class="collapse-content">
                    <div class="grid grid-cols-2 gap-2">
                        {#each arcData.persons as person}
                            <PersonView {person} />
                        {/each}
                    </div>
                </div>
            </div>
        </section>