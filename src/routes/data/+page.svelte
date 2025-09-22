<script lang="ts">
  import CsvView from "$lib/components/explorer/views/CsvView.svelte";
  import Graph from "$lib/components/explorer/views/Graph.svelte";
  import { resourceStore } from "$lib/store/ResourceStore.svelte";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import type { ArcResource } from "$lib/types/types";
  import { CSV } from "$lib/classes/CSV";
  import { arcData } from "$lib/store/ArcData.svelte";

  let csv: CSV | undefined = $state();
  let xAxis: string = $state("");
  let yAxis: string = $state("");
  let variables: any[] = $state([]);

  onMount(async () => {
    // console.log(resourceStore.resources);
    const res: ArcResource = {
      name: "",
      normalizedPath: "",
      rawPath: "",
      type: "csv",
      url: "https://git.nfdi4plants.org/api/v4/projects/2928/repository/files/assays%2Ftmp%2Fdataset%2Fdf.csv/raw?lfs=true",
    };
    const csvData = await resourceStore.fetchData(res);
    csv = await CSV.initialize(csvData, "csv");
    console.log(csv);

    if (csv) {
      xAxis = csv.headers.at(0) || "";
      yAxis = csv.headers.at(-1) || "";
      updatePlot();
    }

    // get variable measured descriptions 
    variables = arcData.assayData[0].variableMeasured ?? [];
    
  });
  // let values = $derived(variables.map(v => arcData.getObjectById(v["@id"]).value));
  // $inspect(values);

  async function updatePlot() {
    const Plotly = await import("plotly.js-dist");
    if (!xAxis || !yAxis) {
      return;
    }

    const trace = {
      x: csv?.data.map((d) => d[xAxis]),
      y: csv?.data.map((d) => d[yAxis]),
      mode: "markers",
      type: "scatter",
    };

    const layout = {
      title: `${yAxis} vs. ${xAxis}`,
      xaxis: { title: xAxis },
      yaxis: { title: yAxis },
    };

    Plotly.newPlot("chart", [trace], layout);
  }
</script>

<section class="px-16">
  {#if !csv}
    Load CSV...
  {:else}
    <select class="select" bind:value={xAxis} onchange={() => updatePlot()}>
      <option disabled value="">Select X-Axis</option>
      {#each csv?.headers as header}
        <option>{header}</option>
      {/each}
    </select>

    <select class="select" bind:value={yAxis} onchange={() => updatePlot()}>
      <option disabled value="">Select Y-Axis</option>
      {#each csv?.headers as header}
        <option>{header}</option>
      {/each}
    </select>
  {/if}

  <div id="chart"></div>
  <!-- <Graph /> -->

  <!-- <CsvView /> -->
</section>
