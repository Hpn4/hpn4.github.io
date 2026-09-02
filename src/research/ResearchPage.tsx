import Page from "../components/Page";
import TerminalCard from "../components/TerminalCard";
import ResearchCard from "../components/ResearchCard";
import { researchTopics } from "../data/research";
import "./ResearchPage.css";

function ResearchPage() {
  return (
    <Page>
      <TerminalCard
        prompt="~/research $"
        command="ls"
        description={["Research topics, alongside the engineering work. Each one is a timeline of internships, talks and publications."]}
      />

      <div className="research-grid">
        {researchTopics.map((topic) => (
          <ResearchCard key={topic.id} topic={topic} />
        ))}
      </div>
    </Page>
  );
}

export default ResearchPage;
