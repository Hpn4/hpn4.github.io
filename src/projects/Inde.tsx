import React from "react";

import ZoomableImage from "../components/ZoomableImage"
import BackCircle from "../components/BackCircle"
import { Banner, Section, Paragraph } from "../components/Projects"

const Inde = () => {
  return (
    <>
      <BackCircle lastCircle={false} to={"/projects"}/>
      <Banner
        banner="/projects/inde/drawing.png"
        title="Butterfly Killer"
        subtitle="A playful scalable data engineering POC."
        techs={[
          "scala", "bash",           // languages
          "apachespark",// frameworks
          "apachekafka", "file:minio.png", "file:timescaledb.webp", // databases
          "grafana", "docker", "kubernetes", "helm", "github" // DevOps
        ]}
        duration="2 months"
        groupSize="4 with Pierre B., Paul P., Matthieu F. and myself."
        role="Architecture designer & Kubernetes developer"
        link="https://github.com/Hpn4/INDE-ButterflyKiller/"
      />

      <div className="project-body">
        <Section title="INDE – Butterfly Killer" subtitle="A playful yet scalable data engineering POC">
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

        <Section title="Architecture">
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
    </>
  );
};

export default Inde;
