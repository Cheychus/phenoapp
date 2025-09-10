class ErrorStore {
    errors: string[] = $state([]);

    add(error: string){
        this.errors.push(error);
    }
}

export const errorStore = new ErrorStore();