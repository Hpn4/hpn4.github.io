import { Link } from "react-router-dom";
import type { ProjectMeta } from "../data/projects";
import TechChipRow from "./TechChipRow";
import ProjectMetaBadges from "./ProjectMetaBadges";
import "./ProjectCard.css";

export default function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <Link to={`/project/${project.id}`} className="project-card">
      <div className="project-card-thumb" style={{ backgroundImage: `url(${project.thumb})` }} />
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
