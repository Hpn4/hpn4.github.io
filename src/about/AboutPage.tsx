import { Link } from "react-router-dom";
import Page from "../components/Page";
import TerminalCard from "../components/TerminalCard";
import Timeline from "../components/Timeline";
import ZoomableImage from "../components/ZoomableImage";
import { Section, Paragraph } from "../components/Projects";
import { experience, education, achievements, type AboutEntry } from "../data/about";
import "./AboutPage.css";

function entryContent(entry: AboutEntry) {
  return (
    <Section title={entry.title}>
      <div className="about-entry-header">
        {entry.logo && (
          <div className="about-entry-logo">
            <img src={entry.logo} alt={entry.org} />
          </div>
        )}
        <div className="about-entry-info">
          <p className="about-entry-org-row">
            <span className="about-entry-org">{entry.org}</span>
            {entry.type && <span className="about-entry-type">{entry.type}</span>}
          </p>
          <p className="about-entry-meta-row">
            <span>{entry.period}</span>
            {entry.location && <span>{entry.location}</span>}
            {entry.mode && <span>{entry.mode}</span>}
          </p>
        </div>
      </div>
      <Paragraph>{entry.detail}</Paragraph>
      {entry.badge && <p className="about-entry-badge">{entry.badge}</p>}
      {entry.image && <ZoomableImage src={entry.image} alt={entry.imageAlt ?? entry.title} />}
      {entry.link && (
        <Paragraph>
          <Link to={entry.link}>{entry.linkLabel ?? "See more"}</Link>
        </Paragraph>
      )}
    </Section>
  );
}

function AboutPage() {
  return (
    <Page>
      <TerminalCard
        prompt="~/about $"
        command="ls"
        description={["A quick introduction to who I am and what I'm looking for."]}
      />

      <nav className="about-jumpnav" aria-label="Jump to section">
        <a href="#experience">Experience</a>
        <a href="#education">Education</a>
        <a href="#achievements">Achievements</a>
      </nav>

      <section id="experience" className="about-section">
        <h2 className="about-section-title">Experience</h2>
        <Timeline items={experience.map((entry) => ({ date: entry.date, content: entryContent(entry) }))} />
      </section>

      <section id="education" className="about-section">
        <h2 className="about-section-title">Education</h2>
        <Timeline items={education.map((entry) => ({ date: entry.date, content: entryContent(entry) }))} />
      </section>

      <section id="achievements" className="about-section">
        <h2 className="about-section-title">Achievements</h2>
        <Timeline items={achievements.map((entry) => ({ date: entry.date, content: entryContent(entry) }))} />
      </section>
    </Page>
  );
}

export default AboutPage;
