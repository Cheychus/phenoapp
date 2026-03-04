import { browser } from "$app/environment";
import type { Project } from "$lib/types/types";
import { Tween } from "svelte/motion";
import { cubicOut } from "svelte/easing";
import { Database, type ArcDatabaseObject } from "./Database.svelte";
import { SvelteMap } from "svelte/reactivity";

class ProjectStore {
  private perPage = 20;
  private page = 1;
  private projectUrl = `https://git.nfdi4plants.org/api/v4/projects/`;

  public projects = $state(new SvelteMap<number, Project>());
  public projectsCount = new Tween(0, {
    duration: 1000,
    easing: cubicOut,
  });
  public upgradeProjects = $state<number[]>([]);
  private downloadProjects = $state<boolean>(true);

  private constructor() {}

  /**
   * Create a new Project Store and initialise it with an api call to the projects API.
   * This will load all available ARC Projects and stores them in this.projects
   * @returns new ProjectStore
   */
  static create() {
    const projectStore = new ProjectStore();
    projectStore.init();
    return projectStore;
  }

  /**
   * Initialise project Store will download all available projects from git.ndfdi4plants /projects api and
   * push them into a projects array. This will persist the data until the setup page is reloaded.
   */
  private async init() {
    if (!browser) {
      console.log("SSR init() projectStore --> return");
      return;
    }
    console.log("[INFO]: Initialise ProjectStore...");
    await this.checkForUpdates();
    console.log(`[INFO]: ProjectStore was initialised!`);
  }

  /**
   * Fetch all projects available on projects api with a specified amount of projects per call
   * @returns 
   */
  public async fetchAllProjects(): Promise<void>{
    // Download all projects from api
    while (this.downloadProjects) {
      const apiUrl = `${this.projectUrl}?per_page=${this.perPage}&page=${this.page}`;
      const result = await fetch(`/?target=${encodeURIComponent(apiUrl)}`);
      const response = await result.json();
      const error = response.message?.error;
      if (error) {
        console.error(error);
        return;
      }
      const data: Project[] = response;
      if (data.length > 0) {
        data.forEach((project) => {
          this.projects.set(project.id, project);
        });
        this.page++;
        this.projectsCount.target = this.projects.size;
      } else {
        this.downloadProjects = false;
      }
    }
  }

  /**
   * Fetch only one project from projects api. Useful for showing/getting project information from a specific id
   * @param id project ID
   * @returns 
   */
  async fetchSingleProject(id: number) {
    const apiUrl = `${this.projectUrl}${id}`;
    const result = await fetch(`/?target=${encodeURIComponent(apiUrl)}`);
    const response = await result.json();
    const error = response.message?.error;
    if (error) {
      console.error(error);
      return null;
    }
    const data: Project = response;
    return data;
  }

  /**
   * Get all saved arcs from the database and check if a newer version is available with projects api. 
   */
  private async checkForUpdates() {
    // get db arcs
    const db = await Database.getInstance();
    const dbArcs = await db.getArcs();

    dbArcs.forEach(async (dbArc) => {
      // get newest project version from api with id from db
      const apiArc = await this.fetchSingleProject(dbArc.id);
      if (apiArc) {
        const apiDate = new Date(apiArc.last_activity_at);
        const dbDate = new Date(dbArc.lastActivity);
        if (apiDate.getTime() !== dbDate.getTime()) {
          console.log("Update needed on ARC: ", dbArc.name);
          console.log("apiDate: ", apiDate, "\n dbDate: ", dbDate);
          this.upgradeProjects.push(Number(dbArc.id));
        }
      } else {
        console.warn("[WARNING]: Could not update ARC with id: ", dbArc.id);
      }
    });
  }

  /**
   * Download the arc-ro-crate metadata json file for a specific project. 
   * The data is stored in a ArcDatabaseObject and can be directly saved in the database. 
   * @param id 
   * @returns 
   */
  public async downloadProject(id: number): Promise<ArcDatabaseObject | null> {
    // get project data from projects
    const arcRoCrateURL = `https://git.nfdi4plants.org/api/v4/projects/${id}/packages/generic/isa_arc_json/0.0.1/arc-ro-crate-metadata.json`;
    const project: Project | null =
      this.projects.get(id) ?? (await this.fetchSingleProject(id));

    if (!project) {
      console.log(`Could not download project with id ${id}!`);
      return null;
    }

    const res = await fetch(`/?target=${encodeURIComponent(arcRoCrateURL)}`);
    if (!res.ok) {
      console.error("Download failed", res.status);
      return null;
    }

    const json = await res.json();
    console.log(json, "downloaded Arc");

    const arcObj = Database.createArcDatabaseObject(
      id,
      project.name,
      project.url,
      project.last_activity_at,
      json
    );
    return arcObj;
  }
}

export const projectStore = ProjectStore.create();
