<script lang="ts">
  import { onMount } from "svelte";

  onMount(async () => {
    const Plotly = await import("plotly.js-dist");
    let TESTER = document.getElementById("tester");
    Plotly.newPlot(
      TESTER,
      [
        {
          x: [1, 2, 3, 4, 5],
          y: [1, 2, 4, 8, 16],
        },
      ],
      {
        margin: { t: 0 },
      }
    );

    var data = [
      {
        x: ["giraffes", "orangutans", "monkeys"],
        y: [20, 14, 23],
        type: "bar",
      },
    ];

    Plotly.newPlot("myDiv", data);
  });
</script>

<div id="tester"></div>

<div id="myDiv"></div>
