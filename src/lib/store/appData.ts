import {get,writable } from "svelte/store";

export let arcData = writable({
    '@graph' : []
})
export let studyData = writable([]);
export let assayData = writable([]);

export function getObjectByID(graph, id) {
    // such funktion
    console.log('search for node...');
    return graph.find((node) => node['@id'] === id);
}