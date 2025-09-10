import type { PageLoad } from "./$types";

export const load: PageLoad = ({params}) => {


    return {
        viewType: params.viewType,
    }
}