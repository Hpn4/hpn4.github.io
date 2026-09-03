import type { ProjectContext, ProjectMeta } from "../data/projects";
import "./ProjectMetaBadges.css";

const CONTEXT_LABEL: Record<ProjectContext, string> = {
  school: "Academic",
  personal: "Personal",
  work: "Work",
};

function ContextIcon({ context }: { context: ProjectContext }) {
  if (context === "school") {
    return (
      <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
        <path d="M8 1 .5 4.5 8 8l6-2.73V9h1V4.5L8 1Zm-5 6.16V11c0 1.38 2.24 3 5 3s5-1.62 5-3V7.16l-5 2.27-5-2.27Z" />
      </svg>
    );
  }
  if (context === "work") {
    return (
      <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
        <path d="M5 3V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h3a1 1 0 0 1 1 1v2H1V4a1 1 0 0 1 1-1h3Zm1 0h4V2H6v1ZM1 8h14v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V8Zm6 1v1h2V9H7Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 1.5c-2.67 0-6 1.34-6 3.5v1h12v-1c0-2.16-3.33-3.5-6-3.5Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="1.5" y="3" width="13" height="11" rx="1.5" />
      <line x1="1.5" y1="6.2" x2="14.5" y2="6.2" />
      <line x1="4.5" y1="1.3" x2="4.5" y2="4" />
      <line x1="11.5" y1="1.3" x2="11.5" y2="4" />
    </svg>
  );
}

export default function ProjectMetaBadges({ project }: { project: ProjectMeta }) {
  return (
    <div className="meta-badges">
      <span className="meta-badge" title="Context">
        <ContextIcon context={project.context} /> {CONTEXT_LABEL[project.context]}
      </span>
      <span className="meta-badge" title="Period">
        <CalendarIcon /> {project.period}
      </span>
    </div>
  );
}
