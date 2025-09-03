export type Arc = { name: string; url: string; id: string | number; content: string };


export class Database {
    private db!: IDBDatabase;

    private constructor() { }

    static async create(): Promise<Database> {
        const instance = new Database();
        instance.db = await instance.openDB();
        return instance;
    }


    // DB öffnen/erstellen
    private openDB() {
        return new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open("UserDatabase", 2);

            request.onerror = (event) => {
                console.error(request.error);
            };
            request.onupgradeneeded = () => {
                const db = request.result;
                
                const objectStore = db.createObjectStore("arcs", {
                    keyPath: "id",
                });
                objectStore.createIndex("name", "name", { unique: false });
                objectStore.createIndex("id", "id", {unique: true});
                objectStore.createIndex("url", "url", { unique: true });
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }


    async addArc(arc: Arc): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["arcs"], "readwrite");
            const objectStore = transaction.objectStore("arcs");
            const request = objectStore.add(arc);

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        })

    }

    async removeArc(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = this.db
                .transaction(["arcs"], "readwrite")
                .objectStore("arcs")
                .delete(id);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        })

    }

    async getArcs(): Promise<Arc[]> {
        return new Promise((resolve, reject) => {
            const request = this.db
                .transaction(["arcs"])
                .objectStore("arcs")
                .getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        })

    }


}


// export let dbInstance: Database = await Database.create();
let dbInstance: Database | null = null;
export const db = {
    async init() {
        if (typeof window === 'undefined'){
            throw new Error("indexedDB is not availiable in SSR");
        }

        if(!dbInstance){
            console.log('no db instance --> init database...');
            dbInstance = await Database.create();
        }
    },

    get instance(): Database {
        if(!dbInstance) {
            throw new Error("Database is not initialized. Call db.init() firtst");
        }

        return dbInstance;
    }
}