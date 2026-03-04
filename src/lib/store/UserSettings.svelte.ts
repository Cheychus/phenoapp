import { browser } from '$app/environment';
import type { ArcDatabaseObject } from './Database.svelte';
import { Database } from './Database.svelte';
import { arcData, resetArcData } from './ArcData.svelte';

class UserSettings {
    theme = $state("");
    arcs: ArcDatabaseObject[] = $state<ArcDatabaseObject[]>([]);
    selectedArc = $state<ArcDatabaseObject>();
    selectedArcId = $state("");

    options = $state({
        autoDownloadImages: false,
        anotherOption: true,
    })

    constructor() { }

    // init user setting if browser is loaded
    init() {
        if (browser) {
            console.log("[INFO]: Initialise UserSettings...");
            const theme = localStorage.getItem("theme");
            if (theme) {
                this.theme = theme;
            }

            const selectedArcId = localStorage.getItem('selectedArcId');
            if (selectedArcId) {
                this.selectedArcId = selectedArcId;
                this.selectArc();
            }
            console.log("[INFO]: UserSettings was initialised!");
        }
    }

    saveTheme() {
        localStorage.setItem("theme", this.theme);
    }

    isArcExisting(id: number): boolean {
        return this.arcs.some(el => el.id === id);
    }

    async addArc(arc: ArcDatabaseObject) {
        await Database.getInstance().then(db => db.addArc(arc));
        this.arcs = await Database.getInstance().then(db => db.getArcs());
    }

    async removeArc(id: number) {
        const db = await Database.getInstance();
        await db.removeArc(id);
        this.arcs = await db.getArcs();

        if(Number(this.selectedArcId) === id){
            // remove arc data from selection and reset arc state
            console.log('reset?')
            this.selectedArcId = "";
            localStorage.setItem("selectedArcId", "");
            resetArcData();
        }

    }

    findArc(url: string): ArcDatabaseObject | undefined {
        return this.arcs.find((arc) => arc.url === url);
    }

    selectArc() {
        console.log(`[INFO]: ARC with id: ${this.selectedArcId} was selected`);
        localStorage.setItem('selectedArcId', this.selectedArcId);

        const arc = this.arcs.find((el) => el.id === Number(this.selectedArcId));
        if (arc) {
            this.selectedArc = arc;
            arcData.init(arc);
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