import {browser} from '$app/environment';

class UserSettings {

    theme =  $state("");
    arcs: { name: string; url: string; content: string}[] = $state([]);
    selectedArc = $state("Arc Name or ID");
    // downloads: { name: string; url: string; content: string}[] = $state([]);


    constructor() {
        if(browser){
            const theme = localStorage.getItem("theme");
            if(theme){
                this.theme = theme;
            }

            this.arcs = this.getArcs();
            console.log(this.arcs);
        }
    }

    saveTheme() {
        localStorage.setItem("theme", this.theme);
    }

    isArcExisting(url: string): boolean {
        return this.arcs.some(el => el.url === url);
    }



    saveArcs(){
        localStorage.setItem('arcs', JSON.stringify(this.arcs));
    }

    getArcs() {
        const arcs = localStorage.getItem("arcs");
        if(arcs){
            return JSON.parse(arcs);
        }else {
            return [];
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