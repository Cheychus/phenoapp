import type { ArcResourceType } from "$lib/types/types";

export function isPictureType(filename: string): boolean {
    let extension = filename.split('.').pop();

    switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
            return true;
        default: return false;
    }
}

export function getResourceType(filename: string): ArcResourceType {
    if(!filename.includes('.')){
        return "other";
    }
    let extension = filename.split('.').pop();
    switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
            return "image";
        case 'md': 
            return "markdown";
        case 'csv':
            return "csv";
    }

    if(!extension){
        return "other";
    }

    if(extension.includes("csv")){
        return "csv";
    }

    return "other";
}

export function getCleanPath(filename: string) {
    const splitPath: string[] = filename.split('/');
    const dotIndex = splitPath.lastIndexOf('.');
    if (dotIndex === -1) {
        return splitPath.join('/');
    }

    const reducedPath = splitPath.slice(dotIndex + 1);
    return reducedPath.join('/');
}

export function isMarkdownType(filename: string): boolean {
    return filename.split('.').pop() === "md";
}

export function getMarkdownName(filepath: string) {
    return filepath.split('/').pop();
}
