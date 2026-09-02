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

function TeamIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
      <path d="M5.5 7a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm5 0a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5ZM0 12.5c0-1.93 2.46-3 5.5-3 1.06 0 2.03.13 2.85.37C7.5 10.5 7 11.4 7 12.5v1H0v-1Zm16 0v1H8.5v-1c0-1.1-.5-2-1.35-2.63.82-.24 1.79-.37 2.85-.37 3.04 0 5.5 1.07 5.5 3Z" />
    </svg>
  );
}

function RoleIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
      <path d="M9.1 1.2 8 .5l-1.1.7-.4 1.27a5.5 5.5 0 0 0-1.14.66L3.9 2.9l-1.02.6-.02 1.28c-.24.4-.43.83-.56 1.28L1.1 6.9l-.1 1.2.1 1.2 1.2.83c.13.45.32.88.56 1.28l.02 1.28 1.02.6 1.46-.3c.36.28.75.5 1.14.66l.4 1.27L8 15.5l1.1-.7.4-1.27a5.5 5.5 0 0 0 1.14-.66l1.46.3 1.02-.6.02-1.28c.24-.4.43-.83.56-1.28l1.2-.83.1-1.2-.1-1.2-1.2-.83a5.4 5.4 0 0 0-.56-1.28L13.02 3.5 12 2.9l-1.46.3a5.5 5.5 0 0 0-1.14-.66L9.1 1.2ZM8 10.5A2.5 2.5 0 1 1 8 5.5a2.5 2.5 0 0 1 0 5Z" />
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
      <span className="meta-badge" title="Team size">
        <TeamIcon /> {project.teamSize === 1 ? "Solo" : `${project.teamSize}`}
      </span>
      <span className="meta-badge" title="Role">
        <RoleIcon /> {project.roleShort}
      </span>
      <span className="meta-badge" title="Period">
        <CalendarIcon /> {project.period}
      </span>
    </div>
  );
}
