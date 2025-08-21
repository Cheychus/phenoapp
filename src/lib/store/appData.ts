import {writable, type Writable, get} from "svelte/store";

type Arc = {
    '@graph': Array<any>
}

// export let arcData : Writable<Arc>= writable({
//     '@graph' : []
// })
export let studyData = writable([]);
export let assayData = writable([]);

// export function getObjectByID(graph, id) {
//     // such funktion
//     console.log('search for node...');
//     return graph.find((node) => node['@id'] === id);
// }

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