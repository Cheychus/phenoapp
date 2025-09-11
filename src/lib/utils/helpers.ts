  export function toArray(input: any[]): any[] {
    if (!input) {
      return [];
    }
    return Array.isArray(input) ? input : [input];
  }