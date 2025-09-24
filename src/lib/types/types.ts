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

export interface Person {
  givenName: string;
  familyName: string;
  additionalName: string;
  email: string;
  address: string;
}

export interface Organization {
  name: string;
}

export interface Assay {
  identifier: string;
  about?: Array<any>;
  hasPart?: Array<any>;
  variableMeasured?: Array<any>;
}

export interface Graph {
  identifier: number;
}

export interface GraphNode {
  identifier: string;
}

export type ArcResourceType = "image" | "markdown" | "csv" | "tsv" | "other";

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
