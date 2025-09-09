import { PathResolver } from "$lib/services/PathResolver";
import type { ArcResource, ArcResourceType } from "$lib/types/types";
import type { Arc } from "./Database.svelte";

export class ResourceStore {
  baseUrl: string = "";
  resolver: PathResolver;
  resources = $state<ArcResource[]>([]);
  data = $state(new Map<string, any>());
  inflightMap = new Map<string, Promise<any>>();

  //   constructor(arcId: number) {
  //     console.log("init --> Resource Store");
  //     this.baseUrl = `https://git.nfdi4plants.org/api/v4/projects/${arcId}/repository/files`;
  //     this.resolver = new PathResolver(this.baseUrl);
  //   }

  init(arcId: number) {
    console.log("init --> Resource Store");
    this.baseUrl = `https://git.nfdi4plants.org/api/v4/projects/${arcId}/repository/files`;
    this.resolver = new PathResolver(this.baseUrl);
  }

  addResource(path: string, type: ArcResourceType): ArcResource {
    let res = this.resources.find((res) => res.rawPath === path);
    if (!res) {
      res = this.resolver.makeResource(path, type);
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

  async fetchData(resource: ArcResource): Promise<any> {
    if (!resource.url) {
      console.log("no resource url");
      return null;
    }
    // Is data already downloaded?
    let existingData = this.isResourceDataExisting(resource);
    if (existingData) {
      console.log("data already in store: ", existingData);
      return existingData;
    }

    const inflight = this.inflightMap.get(resource.url);
    if (inflight) {
      console.log("already fetching, watiting for the result...");
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

  getApiExtensions(type: ArcResourceType) {
    switch (type) {
      case "image":
      case "csv":
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

export const resourceStore = new ResourceStore();
