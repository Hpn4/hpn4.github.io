import type { ReactNode } from "react";
import type { ProjectMeta } from "../data/projects";
import TechChip from "./TechChip";
import ProjectMetaBadges from "./ProjectMetaBadges";
import "./Projects.css";

export function Banner({ project }: { project: ProjectMeta }) {
  const { banner, title, subtitle, techs, duration, groupSize, link, role } = project;

  return (
    <div className="project-header">
      <div className="banner" style={{ backgroundImage: `url(${banner})` }}>
        <div className="overlay">
          <ProjectMetaBadges project={project} />
          <h1 className="title">{title}</h1>
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="project-metadata">
        {duration && (<div><strong>Duration</strong><span>{duration}</span></div>)}
        {groupSize && (<div><strong>Group size</strong><span>{groupSize}</span></div>)}
        {role && (<div><strong>Role</strong><span>{role}</span></div>)}
        {link && (
          <div>
            <strong>Repository</strong>
            <a href={link} target="_blank" rel="noopener noreferrer">{link.replace("https://", "")}</a>
          </div>
        )}
      </div>

      {techs && techs.length > 0 && (
        <div className="tech-stack">
          <p className="tech-label">Tech stack</p>
          <div className="tech-icons">
            {techs.map((tech) => (
              <TechChip key={tech} name={tech} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

type SectionProps = {
  title: string;
  children: ReactNode;
};

export function Section({ title, children }: SectionProps) {
  return (
    <div className="project-section">
      <h2 className="project-title">{title}</h2>
      <div className="project-content">{children}</div>
    </div>
  );
}

type ParagraphProps = {
  children: ReactNode;
};

export function Paragraph({ children }: ParagraphProps) {
  return <p className="project-paragraph">{children}</p>;
}
