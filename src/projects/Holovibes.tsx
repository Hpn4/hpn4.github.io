import { Link } from "react-router-dom";
import ZoomableImage from "../components/ZoomableImage";
import Connector from "../components/Connector";
import Page from "../components/Page";
import { Banner, Section, Paragraph } from "../components/Projects";
import { getProject } from "../data/projects";

const project = getProject("holovibes");

const Holovibes = () => {
  return (
    <Page>
      <Banner project={project} />

      <div className="project-body">
        <Connector />
        <Section title="Overview">
          <Paragraph>
            <a href="https://github.com/DigitalHolography/Holovibes" target="_blank" rel="noopener noreferrer">
              Holovibes
            </a>{" "}
            is an open-source, GPU-accelerated software platform for real-time digital holography,
            developed at the Digital Holography Foundation with support from{" "}
            <a href="https://www.cnrs.fr/" target="_blank" rel="noopener noreferrer">
              CNRS
            </a>{" "}
            and ESPCI. It turns raw interferograms captured by a high-speed camera into
            reconstructed holographic images, live, fast enough to watch blood actually flow
            through the vessels of the retina in real time. I joined as a developer and project
            lead for a 6 month internship at CNRS in Paris, working on the eye fundus imaging
            application built on top of it.
          </Paragraph>
          <ZoomableImage src="/projects/holovibes/oeil.jpg" alt="Real-time reconstructed eye fundus image, showing retinal blood vessels" />
        </Section>

        <Connector />
        <Section title="How it works">
          <Paragraph>
            A laser interferometer records how light reflected off the retina interferes with a
            reference beam. Each raw frame (an interferogram) doesn't look like an image on its
            own, it has to be reconstructed. Holovibes does that reconstruction (via Fresnel
            transforms and angular spectrum propagation) plus a further step of short-time analysis
            (STFT and PCA) that isolates the moving component of the signal, which is what actually
            reveals blood flow instead of just static tissue. All of it runs on the GPU to keep up
            with the camera: the published benchmark processes 256x256 pixel holograms at{" "}
            <strong>71,400 frames per second</strong> with minimal delay, while simultaneously
            recording the stream to disk.
          </Paragraph>
          <ZoomableImage src="/projects/holovibes/matos.jpg" alt="The optical bench and imaging hardware" fit="width" />
        </Section>

        <Connector />
        <Section title="Publication">
          <Paragraph>
            The platform is described in{" "}
            <a href="https://arxiv.org/abs/2508.03911" target="_blank" rel="noopener noreferrer">
              "Holovibes: Real-Time Ultrahigh-Speed Digital Hologram Rendering and Short-Time
              Analysis"
            </a>{" "}
            (arXiv, Aug 2025), co-authored with the full team of contributors who have worked on
            the project, myself included. See the <Link to="/research/holovibes">research page</Link>{" "}
            for the internship timeline.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Technology">
          <Paragraph>
            Written in <strong>C++</strong> and <strong>C</strong>, with the reconstruction
            pipeline running on <strong>NVIDIA GPUs</strong> through <strong>CUDA</strong>, built
            with <strong>CMake</strong>. Released under the Apache 2.0 license.
          </Paragraph>
        </Section>
      </div>
    </Page>
  );
};

export default Holovibes;
