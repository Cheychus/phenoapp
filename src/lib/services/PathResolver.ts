import { resourceStore } from "$lib/store/ResourceStore.svelte";
import type { ArcResource, ArcResourceType } from "$lib/types/types";

export class PathResolver {
    
    constructor(private baseUrl: string){}

    normalize(path: string): string {
        const splitPath: string[] = path.split('/');
        const dotIndex = splitPath.lastIndexOf('.');
        if (dotIndex === -1) {
            return splitPath.join('/');
        }

        const reducedPath = splitPath.slice(dotIndex + 1);
        return reducedPath.join('/');
    }

    toUrl(path: string): string {
        const clean = this.normalize(path);
        return this.baseUrl + '/' + encodeURIComponent(clean);
    }



    makeResource(path: string, type: ArcResourceType): ArcResource {
        return {
            type,
            rawPath: path,
            normalizedPath: this.normalize(path),
            url: this.toUrl(path) + resourceStore.getApiExtensions(type),
        };
    }

    

}