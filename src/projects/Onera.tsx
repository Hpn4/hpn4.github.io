import { Link } from "react-router-dom";
import ZoomableImage from "../components/ZoomableImage";
import Pipeline from "../components/Pipeline";
import Connector from "../components/Connector";
import Page from "../components/Page";
import { Banner, Section, Paragraph } from "../components/Projects";
import { getProject } from "../data/projects";

const project = getProject("onera");

const Onera = () => {
  return (
    <Page>
      <Banner project={project} />

      <div className="project-body">
        <Connector />
        <Section title="Overview & context">
          <Paragraph>
            A 6 month research internship at <strong>ONERA</strong> (The French Aerospace Lab),
            DTIS department, supporting Laura Orgambide's PhD work on Arctic sea-ice thickness
            estimation. Sentinel-3 combines <strong>SRAL</strong>, a radar altimeter that measures
            surface height (and from it, freeboard and thickness), with <strong>OLCI</strong>, an
            optical sensor with 21 spectral bands at 300 m resolution. SRAL alone can't tell what
            surface it's looking at, so I built a pipeline classifying OLCI imagery into four
            sea-ice surface types (brash ice, floe, lead, thin ice) to support that interpretation.
          </Paragraph>
          <ZoomableImage
            src="/projects/onera/fig_cryosphere.jpg"
            alt="Cross-section illustrating sea ice, an ice shelf, an ice sheet and an iceberg"
          />
        </Section>

        <Connector />
        <Section title="Dataset, evaluation and label quality">
          <Paragraph>
            The project started from 400 manually annotated samples, with three problems to solve:
            a small dataset, a leaking evaluation protocol, and inconsistent annotations (especially
            for thin ice). A naive random split put 68 train/test pairs less than 10 km apart; I
            replaced it with a K-means split over each sample's coordinates and acquisition date,
            assigning whole clusters to train or test. Using reflectance instead of raw radiance
            pushed the RGB CNN's accuracy from 0.791 to <strong>0.823</strong>, and a label-swap
            protocol (inspired by Levine &amp; Feizi, 2021) flagged 35% of thin ice samples for
            review, lifting the 21-band CNN to <strong>0.870</strong> after correcting 22 of them.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Foundation models: DINOv3">
          <Paragraph>
            I also tested whether pretrained foundation models (DINOv3, UniverSat, TerraMind,
            Prithvi-EO-2.0) could make up for the limited data, training only a linear probe on
            frozen embeddings. <strong>DINOv3 large</strong> reached <strong>0.876</strong>{" "}
            accuracy, edging out the from-scratch CNN, with visibly more structured embeddings.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Acquisition and annotation tooling">
          <Pipeline
            stages={[
              { label: "Copernicus metadata", detail: "OLCI + SRAL listings" },
              { label: "Match & filter", detail: "SRAL swath, S2 cloud cover" },
              { label: "Download", detail: "ZIP to HDF5" },
              { label: "Visual review", detail: "502 to 124 scenes" },
              { label: "Annotation", detail: "PyQt5 / OpenGL viewer" },
            ]}
          />
          <Paragraph>
            Turning raw satellite data into labeled samples needed its own pipeline: pulling
            OLCI/SRAL products from Copernicus, matching scenes to SRAL tracks, filtering cloud
            cover with Sentinel-2 statistics, deduplicating, and converting to HDF5, 502 candidate
            scenes, 124 kept after visual review. I built a custom <strong>PyQt5 / OpenGL</strong>{" "}
            viewer to paint labels directly onto the imagery, and hardened the pipeline against
            Copernicus's flaky API with retries and local caching.
          </Paragraph>
          <ZoomableImage
            src="/projects/onera/fig_viewer.png"
            alt="Custom PyQt5/OpenGL annotation tool, painting sea-ice labels over an OLCI scene"
          />
        </Section>

        <Connector />
        <Section title="Engineering and results">
          <Paragraph>
            The pipeline is cached and modular (reading, normalizing, embedding), backed by around
            twenty automated tests including a performance-regression suite, reproducible via{" "}
            <strong>Nix</strong>/<strong>uv</strong>, documented with MkDocs, and monitored through
            a <strong>Dash</strong> web app for browsing and comparing runs.
          </Paragraph>
          <ZoomableImage
            src="/projects/onera/fig_dash_recap.png"
            alt="Dash experiment viewer, showing per-class F1 scores and cross-fold metrics for the RGB CNN"
          />
          <Paragraph>
            Final numbers: <strong>0.823</strong> for the RGB CNN, <strong>0.870</strong> for the
            21-band CNN after relabeling, <strong>0.876</strong> for DINOv3 large, later
            transferred to Sentinel-2 without retraining by a teammate. Next up: fine-tuning
            Prithvi-EO-2.0 instead of just probing it, finishing the enriched dataset's annotation,
            and a stronger head on top of DINOv3. See the{" "}
            <Link to="/research/sea-ice-segmentation">research page</Link> for the internship
            timeline.
          </Paragraph>
        </Section>
      </div>
    </Page>
  );
};

export default Onera;
