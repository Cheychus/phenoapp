import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({params}) => {

    type ViewType = "overview" | "assays" | "studies";
    const VALID_VIEW_TYPES = ["overview", "assays", "studies"] as const;

    let viewType = params.viewType;

    if(!VALID_VIEW_TYPES.includes(viewType as ViewType)){
        throw redirect(302, "/explorer/overview");
    }

    return {
        viewType: params.viewType,
    }
}