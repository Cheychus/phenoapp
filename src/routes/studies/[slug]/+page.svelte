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

  let studyData = $derived(
    $arcData["@graph"].filter((element) => {
      return (
        element["@type"] === "Dataset" && element["additionalType"] === "Study"
      );
    }),
  );

 let study = studyData.find((study) => study.identifier === data.slug);
  // let processes = $derived(
  //     $arcData['@graph'].filter((element) => {
  //       console.log(study?.about,element['@id'], study?.about.includes(element['@id']) )
  //       return study?.about.includes(element['@id']);
  //     })


  
      // for(let i = 0; i < 10; i++){
      //   const processId = study.about[i]['@id'];
      //   const process = getObjectByID($arcData['@graph'], processId);
      //   processes = [...processes, process];

      //   // console.log(processId);
      //    // console.log(process);
      // }
  // );

    

  // $effect(() => {
  //   // const obj = getObjectByID($arcData['@graph'], '#Process_S_winter_2020_Growth_437');
  //   // console.log(obj);
  //   console.log(studyData);
  //   const study = studyData.find((study) => study.identifier === data.slug);
  //   console.log(study);

  //   if(study === undefined){
  //     console.log('Study does not exist!');
  //   }else{
  //     for(let i = 0; i < 10; i++){
  //       const processId = study.about[i]['@id'];
  //       const process = getObjectByID($arcData['@graph'], processId);
  //       processes = [...processes, process];

  //       // console.log(processId);
  //        // console.log(process);
  //     }
  //   }
  //   console.log(processes);
  // });

  // collect all processes (about)

  // const processes = $arcData['@graph']
</script>

<ul class="border">
  {study?.about.length}
  {#each study?.about as process}
    {#await getObjectByID($arcData['@graph'], process['@id'])}
      <li>Loading</li>
    {:then p} 
      <li>{p}</li>
    {/await}
  {/each}
</ul>


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
