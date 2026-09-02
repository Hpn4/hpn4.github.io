import ZoomableImage from "../components/ZoomableImage";
import Pipeline from "../components/Pipeline";
import Connector from "../components/Connector";
import Page from "../components/Page";
import { Banner, Section, Paragraph } from "../components/Projects";
import { getProject } from "../data/projects";

const project = getProject("inde");

const Inde = () => {
  return (
    <Page>
      <Banner project={project} />

      <div className="project-body">
        <Connector />
        <Section title="INDE: Butterfly Killer">
          <Paragraph>
            A proof-of-concept for the <em>Introduction to Data Engineering</em> course, built as a
            distributed multi-service system designed to process large volumes of data and react in
            real time.
          </Paragraph>

          <Paragraph>
            We created the project around a playful scenario: <strong>a deadly mutant butterfly
            species</strong> is spreading across Europe. Cameras are deployed in forests to detect
            them, identify the species, and trigger a deadly spray.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Architecture">
          <Pipeline
            stages={[
              { label: "Camera service", detail: "IoT simulation" },
              { label: "Identification", detail: "CV model" },
              { label: "Storage", detail: "Kafka + MinIO" },
              { label: "Analytics", detail: "Spark + TimescaleDB + Grafana" },
            ]}
          />
          <Paragraph>
            <ul>
              <li><strong>Camera service (IoT simulation):</strong> Sends butterfly images at intervals and reacts to alerts.</li>
              <li><strong>Identification service (CV model):</strong> Classifies butterflies and emits alerts if a mutant is detected.</li>
              <li><strong>Storage service (Kafka + MinIO):</strong> Collects and batches messages into blob storage.</li>
              <li><strong>Analytics service (Spark + TimescaleDB + Grafana):</strong> Performs distributed analysis and visualizes results.</li>
            </ul>
          </Paragraph>

          <Paragraph>
            The whole system runs on <strong>Kubernetes with Minikube and Helm</strong>, with Docker
            images built for each service. Grafana dashboards provide real-time monitoring of the data
            pipeline.
          </Paragraph>

          <ZoomableImage src="/projects/inde/architecture.png" alt="ButterflyKiller architecture" />
        </Section>
      </div>
    </Page>
  );
};

export default Inde;
