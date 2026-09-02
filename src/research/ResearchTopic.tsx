import { useParams, Link } from "react-router-dom";
import Page from "../components/Page";
import ZoomableImage from "../components/ZoomableImage";
import Timeline from "../components/Timeline";
import { Section, Paragraph } from "../components/Projects";
import { getResearchTopic } from "../data/research";
import "./ResearchTopic.css";

function EventLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith("/")) {
    return <Link to={href}>{children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function ResearchTopic() {
  const { id } = useParams<{ id: string }>();
  const topic = getResearchTopic(id ?? "");
  const events = topic.events;

  return (
    <Page>
      <div className="project-header">
        <div className="banner" style={{ backgroundImage: `url(${topic.banner})` }}>
          <div className="overlay">
            <h1 className="title">{topic.title}</h1>
            <p className="subtitle">{topic.subtitle}</p>
          </div>
        </div>
      </div>

      <Timeline
        items={
          events.length === 0
            ? [
                {
                  date: "",
                  content: (
                    <Section title="Coming soon">
                      <Paragraph>More details on {topic.title} are on their way.</Paragraph>
                    </Section>
                  ),
                },
              ]
            : events.map((event) => ({
                date: event.date,
                content: (
                  <Section title={event.title}>
                    {event.link && event.logo && (
                      <a
                        className="research-event-logo-link"
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={event.linkLabel}
                      >
                        <img src={event.logo} alt={event.logoAlt ?? event.linkLabel ?? ""} />
                      </a>
                    )}
                    <Paragraph>{event.detail}</Paragraph>
                    {event.image && (
                      <ZoomableImage
                        src={event.image}
                        alt={event.imageAlt ?? event.title}
                        fit={event.imageFit}
                      />
                    )}
                    {event.link && !event.logo && (
                      <Paragraph>
                        <EventLink href={event.link}>{event.linkLabel ?? event.link}</EventLink>
                      </Paragraph>
                    )}
                  </Section>
                ),
              }))
        }
      />
    </Page>
  );
}

export default ResearchTopic;
