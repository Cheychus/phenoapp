import { browser } from "$app/environment";
import type { Project } from "$lib/types/types";
import { Tween } from "svelte/motion";
import { cubicOut } from "svelte/easing";
import { Database, type ArcDatabaseObject } from "./Database.svelte";
import { userSettings } from "./UserSettings.svelte";
import { showToast } from "$lib/utils/toast";
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
  // $derived(this.projects.length);
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
    console.log("projectStore --> init()");

    const dbArcs = await Database.getInstance().then((db) => db.getArcs());

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

          // check here if project is newer than db version if arc is in db
          const dbArc = dbArcs.find((dbArc) => dbArc.id === project.id);
          if (dbArc) {
            const apiDate = new Date(project.last_activity_at);
            const dbDate = new Date(dbArc.lastActivity);
            console.log("apiDate: ", apiDate, "dbDate: ", dbDate);
            if (apiDate.getTime() !== dbDate.getTime()) {
              console.log("Update needed on ARC: ", dbArc.name);
              this.upgradeProjects.push(Number(dbArc.id));
            } else {
              console.log("dbArc: ", dbArc.name, " is up to date");
            }
          }
        });
        this.page++;
        this.projectsCount.target = this.projects.size;
      } else {
        this.downloadProjects = false;
      }
    }
  }

  public async downloadProject(id: number): Promise<ArcDatabaseObject | null> {
    // get project data from projects
    const apiUrl = `https://git.nfdi4plants.org/api/v4/projects/${id}/packages/generic/isa_arc_json/0.0.1/arc-ro-crate-metadata.json`;
    const project: Project | undefined = this.projects.get(id);
    if (!project) {
      console.log(
        `Cant download Project with id: ${id} (not found in projects)`
      );
      return null;
    }
    const res = await fetch(`/?target=${encodeURIComponent(apiUrl)}`);
    if (!res.ok) {
      console.error("Download failed", res.status);
      return null;
    }

    const json = await res.json();
    console.log(json, "downloaded Arc");

    const arcObj = Database.createArcObject(
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
