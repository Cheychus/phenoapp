import { browser } from '$app/environment';

class UserSettings {

    theme =  $state("");
    arcs = [];

    constructor() {
        if(browser){
            const theme = localStorage.getItem("theme");
            if(theme){
                this.theme = theme;
            }
        }
    }

    getStorageItem(key: string): string {
        if(browser){
            return localStorage.getItem(key) || "";
        }
        return "";
    }

    saveTheme() {
        localStorage.setItem("theme", this.theme);
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