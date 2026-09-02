import ZoomableImage from "../components/ZoomableImage";
import Pipeline from "../components/Pipeline";
import Connector from "../components/Connector";
import Page from "../components/Page";
import { Banner, Section, Paragraph } from "../components/Projects";
import { getProject } from "../data/projects";

const project = getProject("tinyx");

const Tinyx = () => {
  return (
    <Page>
      <Banner project={project} />

      <div className="project-body">
        <Connector />
        <Section title="Overview">
          <Paragraph>
            Tinyx is a distributed, Twitter-like platform built as a microservices architecture.
            Each feature (posts, search, social interactions, timelines, media, users) is
            implemented as an independent service. Services communicate through Redis Streams, with
            decoupled read and write services for horizontal scalability. Data is persisted in
            MongoDB (content and timelines), ElasticSearch (search and hashtags), and Neo4j (social
            graph).
          </Paragraph>
          <ZoomableImage src="/projects/tinyx/services.png" alt="Tinyx architecture"/>
        </Section>

        <Connector />
        <Section title="CI/CD">
          <Paragraph>
            We built GitLab CI/CD pipelines to automate builds and deployments. On each push, the
            pipeline runs linting, compilation, and unit tests for every service. On tagged pushes
            (e.g. build-v1.2.3), services are packaged into Docker images and pushed to a private
            registry with the corresponding version tag.
          </Paragraph>
          <Pipeline
            stages={[
              { label: "git push" },
              { label: "Lint & compile" },
              { label: "Unit tests" },
              { label: "Docker build", detail: "on tagged push" },
              { label: "Registry", detail: "versioned image" },
            ]}
          />
        </Section>

        <Connector />
        <Section title="Deployment">
          <Paragraph>
            All services run on a Kubernetes cluster, which pulls the Docker images from our registry.
          </Paragraph>
          <Pipeline
            stages={[
              { label: "Registry" },
              { label: "Kubernetes", detail: "pulls images" },
              { label: "Running services" },
            ]}
          />
          <ZoomableImage src="/projects/tinyx/k8s.png" alt="Tinyx kubernetes architecture"/>
        </Section>
      </div>
    </Page>
  );
};

export default Tinyx;
