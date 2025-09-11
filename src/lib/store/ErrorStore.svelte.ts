class ErrorStore {
    errors: string[] = $state([]);

    constructor(){
        this.errors = []; // clear error store 
    }

    add(error: string){
        this.errors.push(error);
    }
}

export const errorStore = new ErrorStore();