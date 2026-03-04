<script lang="ts">
  import { arcData } from "$lib/store/ArcData.svelte";
  import { toArray } from "$lib/utils/helpers";
  import { onMount } from "svelte";

  let { characteristics } = $props();

  let charObj = {
    characteristics,
  };
</script>

<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each charObj.characteristics as characteristic}
        <tr>
          <th>{characteristic.name}: </th>
          <td>{characteristic.value}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
