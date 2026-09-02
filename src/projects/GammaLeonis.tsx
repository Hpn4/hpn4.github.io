import ZoomableImage from "../components/ZoomableImage";
import Connector from "../components/Connector";
import Page from "../components/Page";
import { Banner, Section, Paragraph } from "../components/Projects";
import { getProject } from "../data/projects";

const project = getProject("gamma-leonis");

const GammaLeonis = () => {
  return (
    <Page>
      <Banner project={project} />

      <div className="project-body">
        <Connector />
        <Section title="Overview">
          <Paragraph>
            Gamma Leonis is a desktop client for{" "}
            <a href="https://joinmastodon.org/" target="_blank" rel="noopener noreferrer">
              Mastodon
            </a>
            , a decentralized alternative to Twitter/X, built in Java with JavaFX as a school
            project at EPITA with a team of five. It supports multiple accounts, the full timeline
            and interaction set, and ships as a native installer for Windows, macOS and Linux.
          </Paragraph>
          <ZoomableImage src="/projects/gamma-leonis/main.png" alt="Gamma Leonis main window" />
        </Section>

        <Connector />
        <Section title="Features">
          <Paragraph>
            <ul>
              <li>Home timeline, favourites, bookmarks and notifications, across multiple accounts.</li>
              <li>Follow/unfollow, account profiles, and browsing followers/following.</li>
              <li>Search and trending hashtags and toots.</li>
              <li>Favourite, bookmark, boost, reply and delete toots, with link/hashtag/mention navigation.</li>
              <li>Composing toots with content warnings, public/direct visibility, and multiple media attachments (image, video, audio).</li>
              <li>Interface available in English, French and Spanish.</li>
            </ul>
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Technology">
          <Paragraph>
            Built with <strong>Java</strong> and <strong>JavaFX</strong>, using{" "}
            <strong>Hibernate</strong>/JPA for the local account database and a hand-written client
            for the Mastodon API. <strong>GitHub Actions</strong> builds and packages native
            installers for all three desktop platforms on every release.
          </Paragraph>
        </Section>
      </div>
    </Page>
  );
};

export default GammaLeonis;
