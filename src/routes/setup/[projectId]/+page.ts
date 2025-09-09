import type { Project } from "$lib/types/types";
import type { PageLoad } from "./$types";
import { projectStore } from "$lib/store/ProjectsStore.svelte";

export const load: PageLoad = async ({ fetch, params }) => {

  const fetchProject = async (id: string) => {
    const projectUrl = `https://git.nfdi4plants.org/api/v4/projects/${id}`;
    const result = await fetch(`/?target=${encodeURIComponent(projectUrl)}`);
    const data: Project = await result.json();
    return data;
  };


  return {
    project: await fetchProject(params.projectId),
  };
};
