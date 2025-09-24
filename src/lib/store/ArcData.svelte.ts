import type { ArcDatabaseObject } from "./Database.svelte";
import type { ArcResource, ArcResourceType, Assay, Organization, Person } from "$lib/types/types";
import { toArray } from "$lib/utils/helpers";
// import { resourceStore } from "./ResourceStore.svelte";
import { getResourceType } from "$lib/utils/typeHandler";
import { errorStore } from "./ErrorStore.svelte";
import { SvelteMap } from "svelte/reactivity";
import { resourceStore, ResourceStore } from "./ResourceStore.svelte";

class ArcData {
  arc = $state<ArcDatabaseObject>();
  context = [];
  graph = $state([]);
  graphMap = new Map<string, any>();

  studyData = $state([]);
  studyProcesses = $state(new SvelteMap<string, any[]>());
  studyDatafiles = $state(new SvelteMap<string, any[]>);

  assayData: Assay[] = $state([]);
  assayProcesses = $state(new SvelteMap<string, any[]>());
  assayDatafiles = $state(new SvelteMap<string, any[]>());
  investigationData = $state([]);

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

    if(!this.graph){
      console.error('no graph');
      return;
    }

    this.graph?.forEach(node => {
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

    // console.log(this.investigationData);



    this.organizations = this.graph.filter((el) => el["@type"] === "Organization");
    this.persons = this.graph.filter((el) => el["@type"] === "Person");

    // Extract Data Files and process data
    for (const study of this.studyData) {

      // Extract process Data 
      let processData: any = this.graph.find((e: GraphNode) => e.identifier === study.identifier);
      this.studyProcesses.set(study.identifier, processData);


      if (!study.hasPart) {
        console.log(`study ${study.identifier} has no datafiles`)
        continue;
      }

      this.studyDatafiles.set(study.identifier, this.extractDataFiles(study.hasPart));
    }

    for (const assay of this.assayData) {

      // Extract process Data 
      let processData: any = this.graph.find((e: GraphNode) => e.identifier === assay.identifier);
      this.assayProcesses.set(assay.identifier, processData);

      if (!assay.hasPart) {
        console.log(`assay ${assay.identifier} has no datafiles`);
        continue;
      }
      this.assayDatafiles.set(assay.identifier, this.extractDataFiles(assay.hasPart));
    }
    console.log(`[INFO]: ARC with id ${arc.id}... was initialised`);
  }


  extractDataFiles(hasPart: any): ArcResource[] {
    const datafiles = [];
    try {
      hasPart = toArray(hasPart);
      const fileObjects: any[] = hasPart.map((part) => this.getObjectById(part["@id"]) || null);
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
