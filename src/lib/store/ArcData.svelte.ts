import type { Arc } from "./Database.svelte";

class ArcData {
    arc = $state<Arc>();
    context = $state([]);
    graph = $state([]);
    //  arcData = $state([])
    studyData = $state([]);
    assayData = $state([]);

    

    getObjectById(id: string) {
        return this.graph.find((node) => node['@id'] === id);
    }

    init(arc: Arc) {
        this.arc = arc;
        this.graph = arc.content['@graph'];

        // Extract Study Data
        this.studyData = this.graph.filter((el) => {
            return (
                el["@type"] === "Dataset" && el["additionalType"] === "Study"
            )
        })

        // Extract Assay Data
        this.assayData = this.graph.filter((el) => {
            return (
                el["@type"] === "Dataset" && el["additionalType"] === "Assay"
            )
        })
    }



}

export const arcData = new ArcData();