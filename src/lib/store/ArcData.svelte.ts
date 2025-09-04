import type { Arc } from "./Database.svelte";
import type {Organization, Person} from "$lib/types/types";

class ArcData {
    arc = $state<Arc>();
    context = [];
    graph = [];
    studyData = [];
    assayData = [];

    organizations: Organization[] = [];
    persons: Person[] = [];

    

    getObjectById(id: string) {
        return this.graph.find((node) => node['@id'] === id);
    }

    init(arc: Arc) {
        console.log("init arc -->", arc.name);
        this.arc = arc;
        this.graph = arc.content['@graph'];

        // Extract Study Data
        this.studyData = this.graph.filter((el) => {
            return (
                el["@type"] === "Dataset" && el["additionalType"] === "Study"
            )
        });
        // Extract Assay Data
        this.assayData = this.graph.filter((el) => {
            return (
                el["@type"] === "Dataset" && el["additionalType"] === "Assay"
            )
        });
        this.organizations = this.graph.filter((el) => el["@type"] === "Organization");
        this.persons = this.graph.filter((el) => el["@type"] === "Person");
    }

}

export const arcData = new ArcData();