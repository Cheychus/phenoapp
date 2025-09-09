import type { Project } from "$lib/types/types";
import type { PageLoad } from "./$types";

// let projects = $state<Project[]>([]);
// let downloadProjects = $state<boolean>(true);

export const load: PageLoad = async ({ fetch }) => {

    const fetchProjects = async () => {
        console.log('try to fetch projects...');
        let downloadProjects = true;
        let projects: Project[] = [];
        let page = 1;
        while(downloadProjects) {
            const projectUrl = `https://git.nfdi4plants.org/api/v4/projects/?per_page=20&page=${page}`
            const result = await fetch(`/?target=${encodeURIComponent(projectUrl)}`);
            const data: Project[] = await result.json();
            if(data.length > 0) {
                projects.push(...data);
               // console.log(data);
                page++;
            }else {
                downloadProjects = false;
            }
        }
        console.log(projects);
        return projects;
    };
}


