import { PathResolver } from "$lib/services/PathResolver";
import type { ArcResource, ArcResourceType } from "$lib/types/types";



class ResourceStore {
    baseUrl: string = "";
    resolver: PathResolver | undefined;
    resources = $state<ArcResource[]>([]);


    init(arcId: number) {
        this.baseUrl = `https://git.nfdi4plants.org/api/v4/projects/${arcId}/repository/files`;
        this.resolver = new PathResolver(this.baseUrl);
    }

    addResource(path: string, type: ArcResourceType): ArcResource | null {
        if(!this.resolver){
            console.error("no resolver yet");
            return null;
        }
        const res = this.resolver.makeResource(path, type);
        this.resources.push(res);
        return res;
    }

    getApiExtensions(type: ArcResourceType) {
        switch (type) {
            case "image":
                return "/raw?lfs=true";
            case "markdown":
                return "/raw";
                break;
            case "other":
                break;
            default: return "";
        }
    }

}

export const resourceStore = new ResourceStore();
