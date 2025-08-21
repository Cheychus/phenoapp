import { writable } from "svelte/store";

export let data = writable({
    '@graph' : []
})

export function getObjectByID() {
    // such funktion
}