<script lang="ts">
  import type { PageProps } from "./$types";
  import { getObjectByID, arcData } from "$lib/store/appData";

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
      ? study.about.map((e) => getObjectByID($arcData["@graph"], e["@id"]))
      : [],
  );
</script>

<table class="table">
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
        <td>{getObjectByID($arcData["@graph"], process.object["@id"]).name}</td>
        <td
          >{getObjectByID(
            $arcData["@graph"],
            process.executesLabProtocol["@id"],
          ).name}</td
        >
        <td>{getObjectByID($arcData["@graph"], process.result["@id"]).name}</td>
      </tr>
    {/each}
  </tbody>
</table>

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
