import { techLabel } from "../components/TechIcon";

export const CATEGORY_ORDER = [
  "Languages",
  "Frameworks & ML",
  "Systems & Graphics",
  "Data & Messaging",
  "DevOps & Infrastructure",
] as const;

type Category = (typeof CATEGORY_ORDER)[number];

// Single source of truth: which category a tech icon belongs to. Add a new
// entry here when a project introduces a tech the skills page hasn't seen
// before — everything else (which techs show up, which projects link to
// them) is derived automatically from `projects.ts`.
export const TECH_CATEGORY: Record<string, Category> = {
  java: "Languages",
  javascript: "Languages",
  python: "Languages",
  c: "Languages",
  cplusplus: "Languages",
  kotlin: "Languages",
  scala: "Languages",
  bash: "Languages",
  html5: "Languages",
  css3: "Languages",
  prolog: "Languages",

  quarkus: "Frameworks & ML",
  hibernate: "Frameworks & ML",
  maven: "Frameworks & ML",
  apachespark: "Frameworks & ML",
  pytorch: "Frameworks & ML",
  numpy: "Frameworks & ML",
  opencv: "Frameworks & ML",
  jupyter: "Frameworks & ML",
  android: "Frameworks & ML",
  jetpackcompose: "Frameworks & ML",
  cmake: "Frameworks & ML",

  qt: "Systems & Graphics",
  opengl: "Systems & Graphics",
  "file:nvidia.svg": "Systems & Graphics",

  mongodb: "Data & Messaging",
  neo4j: "Data & Messaging",
  elasticsearch: "Data & Messaging",
  redis: "Data & Messaging",
  apachekafka: "Data & Messaging",
  "file:minio.png": "Data & Messaging",
  "file:timescaledb.webp": "Data & Messaging",
  postgresql: "Data & Messaging",

  docker: "DevOps & Infrastructure",
  kubernetes: "DevOps & Infrastructure",
  helm: "DevOps & Infrastructure",
  gitlab: "DevOps & Infrastructure",
  githubactions: "DevOps & Infrastructure",
  github: "DevOps & Infrastructure",
  grafana: "DevOps & Infrastructure",
  terraform: "DevOps & Infrastructure",
  openstack: "DevOps & Infrastructure",
  ansible: "DevOps & Infrastructure",
  k3s: "DevOps & Infrastructure",
  argocd: "DevOps & Infrastructure",
};

export interface SkillCategory {
  name: string;
  techs: string[];
}

// Builds the category list straight from whatever techs actually appear
// across `projects`, so removing/adding a project (or a tech on one)
// updates the skills page with no further edits needed here.
export function groupTechsByCategory(techs: string[]): SkillCategory[] {
  const buckets = new Map<string, string[]>();
  for (const tech of techs) {
    const category = TECH_CATEGORY[tech] ?? "Other";
    if (!buckets.has(category)) buckets.set(category, []);
    buckets.get(category)!.push(tech);
  }
  for (const bucket of buckets.values()) {
    bucket.sort((a, b) => techLabel(a).localeCompare(techLabel(b)));
  }

  const orderedNames = [...CATEGORY_ORDER, "Other"];
  return orderedNames
    .filter((name) => buckets.has(name))
    .map((name) => ({ name, techs: buckets.get(name)! }));
}
