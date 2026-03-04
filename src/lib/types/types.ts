export interface Project {
  avatar_url: string;
  createdAt: string;
  description: string;
  forks_count: number;
  http_url_to_repo: string;
  id: number;
  last_activity_at: Date;
  name: string;
  url: string;
  created_at: Date;
  namespace: string;
  readme_url: string;
  star_count: number;
}

export interface Person extends GraphNode {
  givenName?: string;
  familyName?: string;
  additionalName?: string;
  email?: string;
  address?: string;
}

export interface Organization {
  name?: string;
}

export interface Experiment extends GraphNode{
  identifier?: string;
  about?: Array<GraphNode>;
  hasPart?: Array<GraphNode>;
  variableMeasured?: Array<any>;
}

export interface Investigation extends GraphNode{
  citation?: any | GraphNode;
  comment?: any;
  creator?: any;
  license?: any;
  name?: any;
}



export interface Arc {
  "@context": any[];
  "@graph": GraphNode[];
}

export interface GraphNode {
  "@id"?: any;
  "@type"?: any;
  identifier?: string;
  name?: string;
  additionalType?: any;
  additionalProperty?: any[];
  value?: string;
}



export interface Graph {
  identifier: number;
}


export type ArcResourceType = "image" | "markdown" | "csv" | "tsv" | "txt" | "other";

export interface ArcResource {
  type: ArcResourceType;
  name: string;
  rawPath: string;
  normalizedPath: string;
  url: string;
}

export interface Comment {
  ["@id"]?: string;
  ["@type"]?: string;
  name?: string;
  text?: string;
}
