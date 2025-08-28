<script lang="ts">
  import type { PageProps } from "./$types";
  import ProcessTable from "$lib/components/ProcessTable.svelte";

  let { data }: PageProps = $props();

  console.log(data.slug);

  function openModal() {
    let my_modal_1 = document.getElementById("my_modal_1");
    my_modal_1?.showModal();
  }

  //  const obj = $derived(getObjectByID("#Process_S_winter_2020_Growth_437"));


</script>


<section class="p-4">
  <ProcessTable identifier={data.slug} />
</section>



