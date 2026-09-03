import Page from "../components/Page";
import TerminalCard from "../components/TerminalCard";
import Connector from "../components/Connector";
import SkillGraph from "../components/SkillGraph";
import { projects } from "../data/projects";
import { groupTechsByCategory } from "../data/skills";
import "./SkillsPage.css";

const usedTechs = Array.from(new Set(projects.flatMap((p) => p.techs)));
const CATEGORIES = groupTechsByCategory(usedTechs);

function SkillsPage() {
  return (
    <Page>
      <TerminalCard
        prompt="~/skills $"
        command="ls"
        description={[
          "Every skill listed was used for a project, hover a node to trace the link.",
        ]}
      />

      <div className="skills-categories">
        {CATEGORIES.map((category) => (
          <div className="skills-category-block" key={category.name}>
            <Connector />
            <div className="skills-category">
              <h2>{category.name}</h2>
              <SkillGraph techs={category.techs} projects={projects} />
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

export default SkillsPage;
