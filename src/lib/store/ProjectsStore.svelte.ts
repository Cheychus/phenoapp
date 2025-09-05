import type {Project} from "$lib/types/types";
import { arcData } from "./ArcData.svelte";

class ProjectStore {
    projects = $state<Project[]>([]);
    downloadProjects = $state<boolean>(true);

    baseUrl ="https://git.nfdi4plants.org/";
    apiUrl = "https://git.nfdi4plants.org/api/v4/";


    /**
     * Initialise project Store will download all available projects from git.ndfdi4plants /projects api and
     * push them into a projects array. This will persist the data until the setup page is reloaded.
     */
    async init() {
        let page = 1;
        while(this.downloadProjects) {
            const projectUrl = `https://git.nfdi4plants.org/api/v4/projects/?per_page=20&page=${page}`
            const result = await fetch(`/?target=${encodeURIComponent(projectUrl)}`);
            const data: Project[] = await result.json();
            if(data.length > 0) {
                this.projects.push(...data);
               // console.log(data);
                page++;
            }else {
                this.downloadProjects = false;
            }
        }
    }

    // url="https://git.nfdi4plants.org/api/v4/projects/{arcData.arc?.id}/repository/files/{encodeURIComponent(getPictureUrlPath(arcData.getObjectById(process.result['@id']).name))}/raw?lfs=true"

    markdowns = $state(new Map());

    async fetchMarkdownFile(path: string) {
        // const markdown = this.markdowns.get(path);
        // if(markdown){
        //     console.log("markdown found")
        //     return markdown;
        // }

        const id = arcData.arc?.id;
        const response = await fetch(`https://git.nfdi4plants.org/api/v4/projects/${id}/repository/files/${encodeURIComponent(path)}/raw`)
        const data = await response.text();
        this.markdowns.set(path, data);
        return data;
    }




}

export const projectStore = new ProjectStore();
