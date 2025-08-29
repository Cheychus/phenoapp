import {writable, get} from "svelte/store";

export let studyData = writable([]);
export let assayData = writable([]);


function createArcDataStore() {
    const store = writable({ '@graph': [] });
    return {
        subscribe: store.subscribe,
        set: store.set,
        update: store.update,
        getObjectByID: (id: string) => {
            const graph = get(store)['@graph'];
            return graph.find((node) => node['@id'] === id);
        }
    };
}
export const arcData = createArcDataStore();