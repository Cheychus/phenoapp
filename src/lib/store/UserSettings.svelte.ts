import { browser } from '$app/environment';
import type { Arc } from './Database.svelte';
import { db } from './Database.svelte';
import { arcData } from './ArcData.svelte';
import { resourceStore } from './ResourceStore.svelte';

class UserSettings {

    theme = $state("");
    arcs: Arc[] = $state<Arc[]>([]);
    selectedArc = $state<Arc>();
    selectedArcId = $state("");

    options = $state({
        autoDownloadImages: false,
        anotherOption: true,
    })

    constructor() { }

    // init user setting if browser is loaded
    init() {
        console.log("init() --> userSettings");
        if (browser) {
            const theme = localStorage.getItem("theme");
            if (theme) {
                this.theme = theme;
            }

            const selectedArcId = localStorage.getItem('selectedArcId');
            if (selectedArcId) {
    
                this.selectedArcId = selectedArcId;
                this.selectArc();
            }

        }
    }

    saveTheme() {
        localStorage.setItem("theme", this.theme);
    }

    isArcExisting(id: string): boolean {
        return this.arcs.some(el => el.id === id);
    }

    async addArc(arc: Arc) {
        await db.instance.addArc(arc);
        this.arcs = await db.instance.getArcs();
    }

    async removeArc(id: string) {
        await db.instance.removeArc(id);
        this.arcs = await db.instance.getArcs();
    }

    findArc(url: string): Arc | undefined {
        return this.arcs.find((arc) => arc.url === url);
    }

    selectArc() {
        console.log("select Arc ID: ", this.selectedArcId);
        localStorage.setItem('selectedArcId', this.selectedArcId);

        const arc = this.arcs.find((el) => el.id === Number(this.selectedArcId));
        if (arc) {
            this.selectedArc = arc;
            arcData.init(arc);
            resourceStore.init(Number(arc.id)); 
        } else {
            console.error(`No arc with id: ${this.selectedArcId} found!`);
        }
    }

}

export const userSettings = new UserSettings();










export const themes = [
    "ipk",
    "light",
    // "dark",
    "cupcake",
    "bumblebee",
    // "--default",
    "emerald",
    "corporate",
    //  "synthwave",
    //  "--prefersdark",
    //   "retro",
    "cyberpunk",
    //   "valentine",
    //  "halloween",
    //  "garden",
    //  "forest",
    //   "aqua",
    "lofi",
    //   "pastel",
    "fantasy",
    //   "wireframe",
    //   "black",
    //   "luxury",
    //  "dracula",
    "cmyk",
    //   "autumn",
    //   "business",
    //  "acid",
    //   "lemonade",
    //   "night",
    //   "coffee",
    //   "winter",
    //   "dim",
    "nord",
    //  "sunset",
    //   "caramellatte",
    //  "abyss",
    "silk",
];