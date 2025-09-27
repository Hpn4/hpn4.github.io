import React from "react";
import "./Projects.css";

const TechIcon = ({ name }) => {
  const src = name.startsWith("file:")
    ? name.replace("file:", "/logo/")
    : `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;

  return (
    <img
      src={src}
      alt={name}
      title={name}
      className="tech-icon"
    />
  );
};


export function Banner({ banner, title, subtitle, techs, duration, groupSize, link, role }) {
  return (
    <div className="project-header">
      <div
        className="banner"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="overlay">
          <h1 className="title">{title}</h1>
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="project-metadata">
        {duration && (<><strong>Duration:</strong> {duration}<br/></>)}
        {groupSize && (<><strong>Group size:</strong> {groupSize}<br/></>)}
        {link && (<>
          <strong>Link:</strong> <a href={link} target="_blank" rel="noopener noreferrer">here</a><br/>
        </>)}
        {role && (<><strong>Role:</strong> {role}<br/></>)}
      </div>

      {techs && techs.length > 0 && (
        <div className="tech-stack">
          <p className="tech-label">Technical Stack:</p>
          <div className="tech-icons">
            {techs.map((tech) => (
              <TechIcon key={tech} name={tech} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export function Section({ title, children }: SectionProps) {
  return (
    <div className="project-section">
      <h2 className="project-title">{title}</h2>
      <div className="project-content">{children}</div>
    </div>
  );
};

type ParagraphProps = {
  children: React.ReactNode;
};

export function Paragraph({ children }: ParagraphProps) {
  return <p className="project-paragraph">{children}</p>;
}
