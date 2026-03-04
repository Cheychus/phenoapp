import type { ArcDatabaseObject } from "./Database.svelte";
import { type Investigation, type ArcResource, type Experiment, type Graph, type GraphNode, type Organization, type Person } from "$lib/types/types";
import { toArray } from "$lib/utils/helpers";
import { errorStore } from "./ErrorStore.svelte";
import { SvelteMap } from "svelte/reactivity";
import { resourceStore } from "./ResourceStore.svelte";

class ArcData {
  arc = $state<ArcDatabaseObject>();
  context = [];
  graph = $state<GraphNode[]>([]);
  graphMap = new Map<string, any>();

  studyData = $state<Experiment[]>([]);
  studyProcesses = $state(new SvelteMap<string, any[]>());
  studyDatafiles = $state(new SvelteMap<string, any[]>());

  assayData = $state<Experiment[]>([]);
  assayProcesses = $state(new SvelteMap<string, any[]>());
  assayDatafiles = $state(new SvelteMap<string, any[]>());
  investigationData = $state<Investigation[]>([]);

  organizations: Organization[] = $state([]);
  persons: Person[] = $state([]);

  getObjectById(id: string) {
    return this.graphMap.get(id);
  }

  init(arc: ArcDatabaseObject) {
    console.log(`[INFO]: Initialise ARC with id ${arc.id}...`);
    this.arc = arc;
    this.graph = arc.content["@graph"];

    // Init resource store here because now the arc ID is known
    resourceStore.init(arc.id);

    if (!this.graph) {
      console.error("no graph");
      return;
    }

    this.graph?.forEach((node) => {
      const key = node["@id"];
      const value = node;
      this.graphMap.set(key, value);
    });

    // Extract Study Data
    this.studyData = this.graph.filter((el) => {
      return el["@type"] === "Dataset" && el["additionalType"] === "Study";
    });
    // Extract Assay Data
    this.assayData = this.graph.filter((el) => {
      return el["@type"] === "Dataset" && el["additionalType"] === "Assay";
    });

    // Extract Investigation Data
    this.investigationData = this.graph.filter((el) => {
      return el["@type"] === "Dataset" && el["additionalType"] === "Investigation";
    });

    this.organizations = this.graph.filter((el) => el["@type"] === "Organization");
    this.persons = this.graph.filter((el) => el["@type"] === "Person");

    // Extract Data Files and process data from study
    for (const study of this.studyData) {
      if (!study.identifier) {
        console.warn(`study has no identifier!`);
        continue;
      }
      if (!study.hasPart) {
        console.warn(`study ${study.identifier} has no datafiles`);
        continue;
      }
      let processData: any = this.graph.find((e: GraphNode) => e.identifier === study.identifier);
      this.studyProcesses.set(study.identifier, processData);
      this.studyDatafiles.set(study.identifier, this.extractDataFiles(study.hasPart));
    }

    // Extract Data Files and process data from assay
    for (const assay of this.assayData) {
      if (!assay.identifier) {
        console.warn(`assay has no identifier!`);
        continue;
      }
      if (!assay.hasPart) {
        console.warn(`assay ${assay.identifier} has no datafiles`);
        continue;
      }
      let processData: any = this.graph.find((e: GraphNode) => e.identifier === assay.identifier);
      this.assayProcesses.set(assay.identifier, processData);
      this.assayDatafiles.set(assay.identifier, this.extractDataFiles(assay.hasPart));
    }

    console.log(`[INFO]: ARC with id ${arc.id}... was initialised`);
  }

  extractDataFiles(hasPart: GraphNode[] | GraphNode): ArcResource[] {
    const datafiles = [];
    try {
      const parts = toArray(hasPart);
      const fileObjects: any[] = parts.map((part) => this.getObjectById(part["@id"]) || null);
      for (const file of fileObjects) {
        const path = file.name; // Path to file is under .name
        if (!path) {
          continue;
        }
        const res = resourceStore.addResource(path);
        // console.log(res, " res");
        datafiles.push(res);
      }
      return datafiles;
    } catch (error) {
      console.error("extract Data Files failed: ", error);
      errorStore.add("Could  not extract some data files. See console for details.");
      return [];
    }
  }
}

export let arcData = new ArcData();

export function resetArcData() {
  console.log("arc data was reset...");
  arcData = new ArcData();
}
