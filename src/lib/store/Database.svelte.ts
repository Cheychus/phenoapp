import { browser } from "$app/environment";
import type { Arc } from "$lib/types/types";

export type ArcDatabaseObject = {
  name: string;
  url: string;
  id: number;
  lastActivity: Date;
  content: Arc;
};


export class Database {
  private db!: IDBDatabase;
  private static instance: Promise<Database> | null = null;

  private constructor() {}

  public static getInstance(): Promise<Database> {
    if(!browser){
        throw new Error("Database can only be used in browser");
    }

    if(!this.instance){
        console.log("[INFO]: Create Database instance...");
        this.instance = (async () => {
            const db = new Database();
            db.db = await db.openDB();
            console.log("[INFO]: Database was created!");
            return db;
        })();
    }
    return this.instance;
  }

  // DB öffnen/erstellen
  private openDB() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open("UserDatabase", 3);

      request.onerror = (event) => {
        console.error(request.error);
      };
      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains("arcs")) {
          const objectStore = db.createObjectStore("arcs", {
            keyPath: "id",
          });
          objectStore.createIndex("name", "name", { unique: false });
          objectStore.createIndex("id", "id", { unique: true });
          objectStore.createIndex("url", "url", { unique: true });
          objectStore.createIndex("lastActivity", "lastActivity", {
            unique: false,
          });
        } else {
          const objectStore = request.transaction!.objectStore("arcs");

          if (!objectStore.indexNames.contains("lastActivity")) {
            objectStore.createIndex("lastActivity", "lastActivity", {
              unique: false,
            });
          }
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async addArc(arc: ArcDatabaseObject): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["arcs"], "readwrite");
      const objectStore = transaction.objectStore("arcs");
      const request = objectStore.add(arc);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  async removeArc(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = this.db
        .transaction(["arcs"], "readwrite")
        .objectStore("arcs")
        .delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getArcs(): Promise<ArcDatabaseObject[]> {
    return new Promise((resolve, reject) => {
      const request = this.db
        .transaction(["arcs"])
        .objectStore("arcs")
        .getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  public static createArcDatabaseObject(id: number, name: string, url: string, lastActivity: Date, content: any): ArcDatabaseObject{
    return {
        id: id,
        name: name,
        url: url,
        lastActivity: lastActivity,
        content: content,
    }
  }


}

