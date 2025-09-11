import { resourceStore } from "$lib/store/ResourceStore.svelte";
import type { ArcResource, ArcResourceType } from "$lib/types/types";

export class PathResolver {
  constructor(private baseUrl: string) {}

  normalize(path: string): string {
    const splitPath: string[] = path.split("/");
    const dotIndex = splitPath.lastIndexOf(".");
    if (dotIndex === -1) {
      return splitPath.join("/");
    }

    const reducedPath = splitPath.slice(dotIndex + 1);
    return reducedPath.join("/");
  }

  toUrl(path: string): string {
    const clean = this.normalize(path);
    return this.baseUrl + "/" + encodeURIComponent(clean);
  }

  getName(path: string): string {
    return this.normalize(path).split("/").pop() || "undefined";
  }

  getType(path: string): ArcResourceType {
    if (!path.includes(".")) {
      return "other";
    }

    let extension = path.split(".").pop();
    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
        return "image";
      case "md":
        return "markdown";
      case "csv":
        return "csv";
        case "tsv":
        return "tsv";
    }

    if (!extension) {
      return "other";
    }

    if (extension.includes("csv")) {
      return "csv";
    }

    return "other";
  }

  makeResource(path: string): ArcResource {
    const type = this.getType(path);
    console.log

    return {
      type: type,
      name: this.getName(path),
      rawPath: path,
      normalizedPath: this.normalize(path),
      url: this.toUrl(path) + resourceStore.getApiExtensions(type),
    };
  }
}
