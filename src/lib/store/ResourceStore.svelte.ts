import { PathResolver } from "$lib/services/PathResolver";
import type { ArcResource, ArcResourceType } from "$lib/types/types";

export class ResourceStore {
  private baseUrl: string = "";
  private resolver: PathResolver | null = null;
  resources = $state<ArcResource[]>([]);
  data = $state(new Map<string, any>());
  private inflightMap = new Map<string, Promise<any>>();

  constructor() {}

  /**
   * This method must be called after a arc is selected with the given id, because only then the resources for this arc can be created
   * @param arcId
   */
  init(arcId: number) {
    console.log("[INFO]: Initialise ResourceStore...");
    this.baseUrl = `https://git.nfdi4plants.org/api/v4/projects/${arcId}/repository/files`;
    this.resolver = new PathResolver(this.baseUrl);
    console.log("[INFO]: ResourceStore was initialised with ARC-ID: ", arcId);
  }

  /**
   * Add a resource to this store with the path from the arc.
   * @param path can be something like /assays/experiment/file.csv
   * @returns 
   */
  addResource(path: string): ArcResource {
    if(!this.resolver){
      throw new Error("No Path resolver. Did you forget to call init() first?");
    }

    // try to find resource if it already exists or make new one
    let res = this.resources.find((res) => res.rawPath === path);
    if (!res) {
      res = this.resolver.makeResource(path);
      this.resources.push(res);
    }
    return res;
  }

  isResourceDataExisting(resource: ArcResource): any | false {
    let data = this.data.get(resource.rawPath);
    if (!data) {
      return false;
    } else {
      return data;
    }
  }

  getResourceWithName(name: string): ArcResource | null {
    return this.resources.find((res) => res.name === name) || null;
  }

  /**
   * Try to fetch the data from a given resource. 
   * This method is dependent on the right content type to parse the data in the right format.
   * @param resource ArcResource 
   * @returns any data, can be raw text for csv data or json...
   */
  async fetchData(resource: ArcResource): Promise<any> {
    if (!resource.url) {
      console.log("no resource url");
      return null;
    }
    // Is data already downloaded?
    let existingData = this.isResourceDataExisting(resource);
    if (existingData) {
      return existingData;
    }

    // Only download files one time, if multiple asynchronous calls were made
    const inflight = this.inflightMap.get(resource.url);
    if (inflight) {
      return inflight;
    }

    // Fetch Data
    const fetchPromise = (async () => {
      try {
        const response = await fetch(resource.url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType) {
          throw new Error("no content type specified");
        }

        let data;
        if (contentType.includes("application/json")) {
          data = await response.json();
        } else if (contentType.includes("text/plain")) {
          data = await response.text();
        } else if (contentType.includes("binary")) {
          data = await response.text();
        } else {
          throw new Error(`unsupported Content Type: ${contentType}`);
        }
        this.data.set(resource.rawPath, data);

        return data;
      } catch (error) {
        console.error("Error:", error);
      } finally {
        this.inflightMap.delete(resource.url);
      }
    })();

    this.inflightMap.set(resource.url, fetchPromise);
    return fetchPromise;
  }

  /**
   * Use this method to add specific url parameters when trying to fetch a resource.
   * @param type 
   * @returns 
   */
  static getApiExtensions(type: ArcResourceType) {
    switch (type) {
      case "image":
      case "csv":
      case "tsv":
        return "/raw?lfs=true";
      case "markdown":
        return "/raw";
      case "other":
        break;
      default:
        return "";
    }
  }
}

export let resourceStore = new ResourceStore();

