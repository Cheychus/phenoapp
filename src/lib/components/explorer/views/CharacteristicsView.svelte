<script lang="ts">
    import { arcData } from "$lib/store/ArcData.svelte";
    import { toArray } from "$lib/utils/helpers";
    import { onMount } from "svelte";

    let { process } = $props();

    interface Sample {
        "@id": string;
        "@type": string;
        additionalProperty?: any[];
        additionalType: string;
        name: string;
    }

    interface CharacteristicValue {
        name: string;
        value: string;
    }

    function createCharacteristicObject(process) {
        let sample: Sample = arcData.getObjectById(process["@id"]);

        try {
            let properties = sample.additionalProperty;
            if (properties) {
                let values: CharacteristicValue[] = toArray(properties).map(
                    (property) => arcData.getObjectById(property["@id"]),
                );
                // console.log(values);

                return {
                    name: sample.name,
                    characteristics: values,
                };
            }
            return null;
        } catch (error) {
            console.error("Could not extract characteristic values: ", error);
            return null;
        }
    }
    let charObj: {
        name: string;
        characteristics: CharacteristicValue[];
    } | null = $state(null);
    onMount(() => {
        charObj = createCharacteristicObject(process);
    });
</script>

{#if !charObj?.characteristics}
    <p>- No Characteristics found for {process.name}</p>
{:else}
    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                {#each charObj?.characteristics as characteristic, i}
                    <tr>
                        <th>{characteristic.name}: </th>
                        <td>{characteristic.value}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
{/if}
