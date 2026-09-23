import { Link } from "react-router-dom";
import type { ProjectMeta } from "../data/projects";
import TechChipRow from "./TechChipRow";
import ProjectMetaBadges from "./ProjectMetaBadges";
import "./ProjectCard.css";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="2.5" y1="8" x2="13.5" y2="8" />
      <polyline points="9,3.5 13.5,8 9,12.5" />
    </svg>
  );
}

export default function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <Link to={`/project/${project.id}`} className="project-card">
      <div className="project-card-thumb" style={{ backgroundImage: `url(${project.thumb})` }}>
        <span className="project-card-cta">
          <span>View project</span>
          <ArrowIcon />
        </span>
      </div>
      <div className="project-card-body">
        <ProjectMetaBadges project={project} />
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-subtitle">{project.subtitle}</p>
        <div className="project-card-techs">
          <TechChipRow techs={project.techs} />
        </div>
      </div>
    </Link>
  );
}
