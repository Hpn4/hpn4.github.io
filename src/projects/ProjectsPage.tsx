import Page from "../components/Page";
import TerminalCard from "../components/TerminalCard";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import "./ProjectsPage.css";

function ProjectsPage() {
  return (
    <Page>
      <TerminalCard
        prompt="~/projects $"
        command="ls"
        description={[
          "A selection of academic and personal projects, with a focus on DevOps and deployment, plus a wide range of others driven by curiosity and a taste for trying new things.",
        ]}
      />

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Page>
  );
}

export default ProjectsPage;
