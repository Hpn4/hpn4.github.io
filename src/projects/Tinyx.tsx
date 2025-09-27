import React from "react";

import ZoomableImage from "../components/ZoomableImage"
import BackCircle from "../components/BackCircle"
import { Banner, Section, Paragraph } from "../components/Projects"

const Tinyx = () => {
  return (
    <>
      <BackCircle lastCircle={false} to={"/projects"}/>
      <Banner
        banner="/projects/tinyx/services.png"
        title="Tinyx"
        subtitle="A distributed Twitter-like platform built with a microservices architecture."
        techs={[
          "java", "javascript",           // languages
          "quarkus", "hibernate", "maven",// frameworks
          "mongodb", "neo4j", "elasticsearch", "redis", // databases
          "docker", "kubernetes", "gitlab", "githubactions" // DevOps
        ]}
        duration="2 months"
        groupSize="14 with Guillaume H., Martin L., Bastien G., Lucas B., Grégoire S., Ali O., Quentin N., Pierre B., Jinhyuk, Kendrick O., Paul P., Kylian G., Neil S. and myself."
        role="Team lead, architecture designer & Kubernetes developer"
      />

      <div className="project-body">
        <Section title="Overview">
          <Paragraph>
            Each feature (posts, search, social interactions, timelines, media, users) is implemented as an independent service. Services communicate through Redis Streams, with decoupled read/write services for horizontal scalability. Data is persisted in MongoDB (content and timelines), ElasticSearch (search and hashtags), and Neo4j (social graph).
          </Paragraph>
          <ZoomableImage src="/projects/tinyx/services.png" alt="Tinyx architecture"/>
        </Section>

        <Section title="CI/CD">
          <Paragraph>
            We implemented GitLab CI/CD pipelines to automate builds and deployments. On each push, the pipeline runs linting, compilation, and unit tests for every service. On tagged pushes (e.g. build-v1.2.3), services are packaged into Docker images and pushed to a private registry with the corresponding version tag.
          </Paragraph>
        </Section>

        <Section title="Deployment">
          <Paragraph>
            All services run on a Kubernetes cluster, which pulls the Docker images from our registry.
          </Paragraph>
          <ZoomableImage src="/projects/tinyx/k8s.png" alt="Tinyx kubernetes architecture"/>
        </Section>
      </div>
    </>
  );
};

export default Tinyx;
