import type { Arc } from "./Database.svelte";
import type {Assay, Organization, Person} from "$lib/types/types";
import { PathResolver } from "$lib/services/PathResolver";
import { resourceStore } from "./ResourceStore.svelte";

class ArcData {
    arc = $state<Arc>();
    context = [];
    graph = [];
    studyData = [];
    assayData: Assay[] = [];

    organizations: Organization[] = [];
    persons: Person[] = [];

    

    getObjectById(id: string) {
        return this.graph.find((node) => node['@id'] === id);
    }

    init(arc: Arc) {
        console.log("init arc -->", arc.id);
        resourceStore.init(Number(arc.id));
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

    // url="https://git.nfdi4plants.org/api/v4/projects/{arcData.arc?.id}/repository/files/{encodeURIComponent(getPictureUrlPath(arcData.getObjectById(process.result['@id']).name))}/raw?lfs=true"

    markdowns = $state(new Map());

    async fetchMarkdownFile(path: string) {
        const markdown = this.markdowns.get(path);
        if(markdown){
            console.log("markdown found")
            return markdown;
        }

        const id = arcData.arc?.id;
        const response = await fetch(`https://git.nfdi4plants.org/api/v4/projects/${id}/repository/files/${encodeURIComponent(path)}/raw`)
        const data = await response.text();
        this.markdowns.set(path, data);
        console.log(this.markdowns);
        return data;
    }

}

export const arcData = new ArcData();