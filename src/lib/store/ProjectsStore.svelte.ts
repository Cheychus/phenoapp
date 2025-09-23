import { browser } from "$app/environment";
import type {Project} from "$lib/types/types";
import { Tween } from "svelte/motion";
import { cubicOut } from "svelte/easing";

class ProjectStore {
    private perPage = 20;
    private page = 1;
    private projectUrl = `https://git.nfdi4plants.org/api/v4/projects/`;

    public projects = $state<Project[]>([]);
    public projectsCount = new Tween(0, {
        duration: 2000,
        easing: cubicOut,
    });
    // $derived(this.projects.length);
    private downloadProjects = $state<boolean>(true);

    private constructor(){}

    /**
     * Create a new Project Store and initialise it with an api call to the projects API.
     * This will load all available ARC Projects and stores them in this.projects
     * @returns new ProjectStore
     */
    static create(){
        const projectStore = new ProjectStore();
        projectStore.init();
        return projectStore;
    }

    /**
     * Initialise project Store will download all available projects from git.ndfdi4plants /projects api and
     * push them into a projects array. This will persist the data until the setup page is reloaded.
     */
    private async init() {
        if(!browser){
            console.log("SSR init() projectStore --> return");
            return;
        }
        console.log("projectStore --> init()");
        // Download all projects from api
        while(this.downloadProjects) {
            const apiUrl = `${this.projectUrl}?per_page=${this.perPage}&page=${this.page}`;
            const result = await fetch(`/?target=${encodeURIComponent(apiUrl)}`);
            const response = await result.json();
            const error = response.message?.error;
            if(error){
                console.error(error);
                return;
            }
            const data: Project[] = response;
            if(data.length > 0) {
                this.projects.push(...data);
                this.page++;
                this.projectsCount.target = this.projects.length;
            }else {
                this.downloadProjects = false;
            }
        }
    }
}

export const projectStore = ProjectStore.create();
