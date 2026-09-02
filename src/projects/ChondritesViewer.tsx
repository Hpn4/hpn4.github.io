import { Link } from "react-router-dom";
import ZoomableImage from "../components/ZoomableImage";
import Pipeline from "../components/Pipeline";
import Connector from "../components/Connector";
import Page from "../components/Page";
import { Banner, Section, Paragraph } from "../components/Projects";
import { getProject } from "../data/projects";

const project = getProject("chondritesviewer");

const ChondritesViewer = () => {
  return (
    <Page>
      <Banner project={project} />

      <div className="project-body">
        <Connector />
        <Section title="Overview">
          <Paragraph>
            ChondritesViewer is the tool built for <strong>NACHOS</strong> (Neural network
            Automated CHOndrule and components Segmentation), a research project run at EPITA's LRE
            lab, in collaboration with IMPMC (Sorbonne Université) and MNHN. The goal: help
            geologists study meteorites faster, with software instead of hours spent counting
            grains by hand under a microscope.
          </Paragraph>
          <ZoomableImage src="/projects/chondritesviewer/ui.webp" alt="ChondritesViewer interface" />
        </Section>

        <Connector />
        <Section title="What is a chondrite?">
          <Paragraph>
            Chondrites are a type of stony meteorite, and actually the most common one. What makes
            them special is that they have barely changed since the birth of the solar system,
            4.5 billion years ago. Cut one open and you will see small round grains called{" "}
            <strong>chondrules</strong>, some of the oldest solid material known (called{" "}
            <strong>CAIs</strong>), tiny metal and mineral grains, all held together by a fine dust
            called the <strong>matrix</strong>. Measuring the size, shape and abundance of these
            components tells scientists how planets first formed out of dust and rock.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="The problem">
          <Paragraph>
            Today, identifying and measuring these components is mostly manual. A geologist looks
            at a microscope image, recognizes each grain by eye, and measures it one by one. This
            is slow, tiring, and two experts will not always agree on where exactly one grain ends
            and another begins. It also means only a small part of a meteorite can realistically be
            studied this way.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="How NACHOS works">
          <Paragraph>
            The starting point is a set of high resolution images from a scanning electron
            microscope: one grayscale image (BSE), plus seven more images, each showing where a
            specific chemical element (iron, calcium, magnesium...) is concentrated. Our software
            reads these images and does what a geologist would do by hand: it recognizes each grain,
            draws its outline, and measures it. The recognition part uses{" "}
            <a href="https://hpn4.github.io/QuartzObsidian/EPITA/IA/ML/" target="_blank" rel="noopener noreferrer">
              machine learning
            </a>{" "}
            , and the outlining and measuring part uses more classic image processing
            techniques.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="The interactive viewer">
          <Paragraph>
            ChondritesViewer is the desktop application built around this pipeline. It shows
            several views of the same region side by side (the raw scans, some elemental maps
            and the model's predictions), all synchronized. It also has an annotation mode: a
            geologist can draw over the images to label new grains by hand.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Going further: how the model works">
          <Pipeline
            stages={[
              { label: "BSE + 7xEDS maps", detail: "8 channel input" },
              { label: "Patch CNN", detail: "98.94% pixel accuracy" },
              { label: "Watershed + merge", detail: "object instances" },
              { label: "Morphometry", detail: "area, shape, counts" },
            ]}
          />
          <Paragraph>
            The dataset is a mosaic of <strong>DOM 08006</strong>, a pristine CO3.0 chondrite,
            imaged at under 1µm per pixel. Ground truth comes from a single expert annotating
            chondrules, CAIs, matrix and metallic phases in Ilastik: about 48,000 labeled pixels
            across 8 classes, split spatially so training and test tiles never share the same
            grain.
          </Paragraph>
          <Paragraph>
            25 classical machine learning classifiers were tried first (Random Forest, ExtraTrees,
            SVM...), topping out around 94% pixel accuracy with no notion of neighboring pixels.
            That result motivated a patch based CNN instead: a tiny, fully convolutional network
            (two 3x3 convolution layers, 8 to 32 to 64 channels, plus a 1x1 classification head,
            about 21k parameters total, no pooling), predicting one of 8 classes for every pixel
            from a small patch around it. It was picked by a random search over 100 configurations
            under 5 fold cross validation, and reaches <strong>98.94% pixel accuracy</strong> at
            the network output.
          </Paragraph>
          <Paragraph>
            The pixel by pixel prediction is then cleaned up with standard image processing (small
            objects and holes removed, then closing), and separated into individual grains with a{" "}
            <strong>watershed</strong> algorithm on the distance transform, so every chondrule, CAI,
            metal or sulfide grain becomes one measurable object instead of just a class label. A
            region merging pass (grouping neighboring regions by how similar their chemical
            signature is) reduces over segmentation on top of that. Each resulting object yields
            its area, perimeter, eccentricity, solidity and circularity, computed across the entire
            section to build a quantitative profile of the whole meteorite.
          </Paragraph>
          <Paragraph>
            The CNN and training pipeline are built with <strong>PyTorch</strong> and{" "}
            <strong>OpenCV</strong>, developed and evaluated in Jupyter notebooks. The viewer itself
            is a <strong>Qt (PySide6)</strong> desktop application rendering through{" "}
            <strong>OpenGL</strong>, with custom GLSL shaders for the image display, label overlays
            and brush painting across every synchronized view.
          </Paragraph>
          <Paragraph>
            This work was presented as a poster at the 2026 Meteoritical Society Annual Meeting in
            Frankfurt: see the <Link to="/research">research page</Link> for the abstract.
          </Paragraph>
        </Section>
      </div>
    </Page>
  );
};

export default ChondritesViewer;
