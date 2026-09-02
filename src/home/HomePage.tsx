import { Link } from "react-router-dom";
import Page from "../components/Page";
import TerminalCard from "../components/TerminalCard";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import "./HomePage.css";

function HomePage() {
  return (
    <Page>
      <section className="hero">
        <TerminalCard
          command="whoami"
          title="Etienne Senigout"
          description={[
            "Computer Science Engineer looking for a DevOps / SRE position.",
            "Curious and rigorous, I like understanding things deeply and solving problems.",
          ]}
        />
      </section>

      <section className="home-section">
        <div className="home-section-header">
          <h2>Featured projects</h2>
          <Link to="/projects" className="home-section-more">see all</Link>
        </div>
        <div className="home-project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </Page>
  );
}

export default HomePage;
