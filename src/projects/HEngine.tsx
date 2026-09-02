import ZoomableImage from "../components/ZoomableImage";
import Connector from "../components/Connector";
import Page from "../components/Page";
import { Banner, Section, Paragraph } from "../components/Projects";
import { getProject } from "../data/projects";

const project = getProject("hengine");

const HEngine = () => {
  return (
    <Page>
      <Banner project={project} />

      <div className="project-body">
        <Connector />
        <Section title="Overview">
          <Paragraph>
            HEngine is a hobby 3D game engine, written from scratch in Java on top of{" "}
            <a href="https://www.lwjgl.org/" target="_blank" rel="noopener noreferrer">
              LWJGL
            </a>{" "}
            (a low-level binding to OpenGL, GLFW and friends). It was never meant to be efficient
            or production-ready: the point was to actually learn how modern 3D rendering works by
            implementing it, not just using an existing engine.
          </Paragraph>
          <ZoomableImage src="/projects/hengine/screenshot.webp" alt="HEngine rendering a city street scene" />
        </Section>

        <Connector />
        <Section title="Features">
          <Paragraph>
            <ul>
              <li>Directional, point and spot lights.</li>
              <li>Animated models, most common 3D file formats (via Assimp), basic transparency.</li>
              <li>Particle systems, fog, skybox, SSAO, bloom, shadows, decals.</li>
              <li>Frustum culling, mesh instancing, and deferred rendering through GBuffers.</li>
            </ul>
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Technology">
          <Paragraph>
            Built on <strong>LWJGL</strong> and <strong>OpenGL</strong>, with{" "}
            <strong>Assimp</strong> for model loading, <strong>STB</strong> for images,{" "}
            <strong>JOML</strong> for the math, <strong>GLFW</strong> for windowing and{" "}
            <strong>OpenAL</strong> for audio. A small custom UI layer was also built on top of
            GLFW and <strong>NanoVG</strong>, Swing-style, for the engine's own tooling.
          </Paragraph>
        </Section>
      </div>
    </Page>
  );
};

export default HEngine;
