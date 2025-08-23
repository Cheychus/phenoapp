<script lang="ts">
  import type { PageProps } from "./$types";
  import { arcData } from "$lib/store/appData";

  let { data }: PageProps = $props();

  console.log(data.slug);

  function openModal() {
    let my_modal_1 = document.getElementById("my_modal_1");
    my_modal_1?.showModal();
  }

  //  const obj = $derived(getObjectByID("#Process_S_winter_2020_Growth_437"));

  let study = $derived(
    $arcData["@graph"].find((e) => {
      return e.identifier === data.slug;
    }),
  );
  let processes = $derived(
    study?.about
      ? study.about.map((e) => arcData.getObjectByID(e["@id"]))
      : [],
  );
</script>


{#if $arcData["@graph"].length === 0}
<p>Arc Data wird geladen...</p>
{:else if !study}
  <p>Keine Studie mit dem Namen: <strong>{data.slug}</strong> gefunden</p>
{:else}
<p>Studie: <strong>{data.slug}</strong> geladen!</p>
{/if}

<div class="h-2/3 overflow-x-auto border">
<table class="table table-pin-rows">
  <thead>
    <tr>
      <th>Source</th>
      <th>Protocol</th>
      <th>Sample</th>
    </tr>
  </thead>
  <tbody>
    {#each processes as process}
      <tr>
        <td>{arcData.getObjectByID(process?.object["@id"]).name }</td>
        <td
          >{arcData.getObjectByID(process?.executesLabProtocol["@id"]).name}</td
        >
        <td>{arcData.getObjectByID(process?.result["@id"]).name}</td>
      </tr>
    {/each}
  </tbody>
</table>
</div>

<div class="w-full">
  <!-- Open the modal using ID.showModal() method -->
  <button class="btn" onclick={openModal}>open modal</button>
  <dialog id="my_modal_1" class="modal">
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
</div>


