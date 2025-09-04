import type {Project} from "$lib/types/types";

class ProjectStore {
    projects = $state<Project[]>([]);
    downloadProjects = $state<boolean>(true);

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
}

export const projectStore = new ProjectStore();
