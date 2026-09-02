import "./TechIcon.css";

const LABELS: Record<string, string> = {
  java: "Java",
  javascript: "JavaScript",
  scala: "Scala",
  bash: "Bash",
  html5: "HTML5",
  css3: "CSS3",
  prolog: "Prolog",
  json: "JSON",
  quarkus: "Quarkus",
  hibernate: "Hibernate",
  maven: "Maven",
  apachespark: "Apache Spark",
  apachekafka: "Apache Kafka",
  mongodb: "MongoDB",
  neo4j: "Neo4j",
  elasticsearch: "Elasticsearch",
  redis: "Redis",
  docker: "Docker",
  kubernetes: "Kubernetes",
  helm: "Helm",
  gitlab: "GitLab",
  githubactions: "GitHub Actions",
  github: "GitHub",
  grafana: "Grafana",
  python: "Python",
  c: "C",
  pytorch: "PyTorch",
  numpy: "NumPy",
  opencv: "OpenCV",
  jupyter: "Jupyter",
  qt: "Qt",
  opengl: "OpenGL",
  kotlin: "Kotlin",
  android: "Android",
  jetpackcompose: "Jetpack Compose",
  cplusplus: "C++",
  cmake: "CMake",
  "minio.png": "MinIO",
  "timescaledb.webp": "TimescaleDB",
  "nvidia.svg": "NVIDIA / CUDA",
  terraform: "Terraform",
  openstack: "OpenStack",
  ansible: "Ansible",
  k3s: "k3s",
  argocd: "ArgoCD",
  postgresql: "PostgreSQL",
  scikitlearn: "scikit-learn",
  nixos: "Nix",
};

export function techIconSrc(name: string): string {
  return name.startsWith("file:")
    ? name.replace("file:", "/logo/")
    : `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;
}

export function techLabel(name: string): string {
  const key = name.startsWith("file:") ? name.replace("file:", "") : name;
  return LABELS[key] ?? key;
}

// These devicon logos are near-black, so they disappear on dark backgrounds
// (e.g. the terminal-dark icon boxes on the Skills page) unless recolored.
const DARK_LOGOS = new Set(["neo4j", "github", "apachekafka", "bash"]);

export default function TechIcon({ name }: { name: string }) {
  return (
    <img
      src={techIconSrc(name)}
      alt={techLabel(name)}
      title={techLabel(name)}
      className={`tech-icon ${DARK_LOGOS.has(name) ? "tech-icon-invert" : ""}`}
      loading="lazy"
    />
  );
}
