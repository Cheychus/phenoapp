import {writable, type Writable, type get} from "svelte/store";

type Arc = {
    '@graph': Array<any>
}

export let arcData : Writable<Arc>= writable({
    '@graph' : []
})
export let studyData = writable([]);
export let assayData = writable([]);

export function getObjectByID(graph, id) {
    // such funktion
    console.log('search for node...');
    return graph.find((node) => node['@id'] === id);
}