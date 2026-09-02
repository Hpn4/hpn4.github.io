export type ResearchEventType = "internship" | "publication" | "talk";

export interface ResearchEvent {
  date: string; // e.g. "2025-06" or "Jul 2025 - present"
  type: ResearchEventType;
  title: string;
  detail: string;
  link?: string;
  linkLabel?: string;
  image?: string;
  imageAlt?: string;
  imageFit?: "contain" | "width";
  logo?: string;
  logoAlt?: string;
}

export interface ResearchTopic {
  id: string;
  title: string;
  subtitle: string;
  banner: string;
  events: ResearchEvent[];
}

export const researchTopics: ResearchTopic[] = [
  {
    id: "nachos",
    title: "NACHOS",
    subtitle: "Automated segmentation and morphometry of chondritic meteorites.",
    banner: "/projects/chondritesviewer/ui.webp",
    events: [
      {
        date: "Jul 2025 - present",
        type: "internship",
        title: "NACHOS: Automated Extraction of Chondritic Components",
        detail:
          "Research internship at EPITA's LRE lab (Team TIRF), in collaboration with IMPMC (Sorbonne Université) and MNHN. Supervised by Élodie Puybareau, Jonathan Fabrizio and Guillaume Tochon. Built a patch-based CNN + watershed pipeline to automatically segment and measure chondritic components (chondrules, CAIs, matrix, metallic phases) from BSE/EDS meteorite scans, reaching 98.94% pixel accuracy on the DOM 08006 meteorite.",
        link: "/project/chondritesviewer",
        linkLabel: "See the ChondritesViewer project",
      },
      {
        date: "Aug 2026",
        type: "talk",
        title: "Poster at the Meteoritical Society Annual Meeting (Frankfurt)",
        detail:
          "Presented the full pipeline (patch CNN classification, watershed instance extraction and per-object morphometry), applied across DOM 08006, with a call for the community to help extend the training dataset.",
        image: "/research/nachos/poster.png",
        imageAlt: "NACHOS poster, Meteoritical Society Annual Meeting 2026",
        imageFit: "width",
        link: "https://www.metsoc2026-frankfurt.com/",
        linkLabel: "Meteoritical Society Annual Meeting 2026, Frankfurt",
        logo: "/research/nachos/metsoc-logo.png",
        logoAlt: "MetSoc 2026 Frankfurt logo",
      },
      {
        date: "Unconfirmed",
        type: "publication",
        title: "Possible future publication",
        detail:
          "A full journal article may follow this internship, but nothing is confirmed yet. The only published material so far is the MetSoc 2026 conference abstract behind the poster above.",
      },
    ],
  },
  {
    id: "holovibes",
    title: "Holovibes",
    subtitle: "Real-time GPU-accelerated digital holography for live eye fundus imaging.",
    banner: "/projects/holovibes/oeil.jpg",
    events: [
      {
        date: "Sept 2024 - Feb 2025",
        type: "internship",
        title: "Holovibes: Developer & Project Lead",
        detail:
          "6 month internship at CNRS (Paris), on the Holovibes open-source platform (C++/CUDA) developed at the Digital Holography Foundation with CNRS and ESPCI. Worked on the real-time eye fundus imaging application: reconstructing interferograms into live holographic video fast enough to observe blood flow in the retina.",
        link: "/project/holovibes",
        linkLabel: "See the Holovibes project",
      },
      {
        date: "Aug 2025",
        type: "publication",
        title: "Holovibes: Real-Time Ultrahigh-Speed Digital Hologram Rendering and Short-Time Analysis",
        detail:
          "arXiv preprint describing the platform: GPU-accelerated hologram reconstruction (Fresnel transforms, angular spectrum propagation) and short-time analysis (STFT, PCA), processing 256x256 pixel holograms at 71,400 frames per second. Co-authored with the full team of contributors to the project.",
        link: "https://arxiv.org/abs/2508.03911",
        linkLabel: "Read the paper on arXiv",
      },
    ],
  },
  {
    id: "sea-ice-segmentation",
    title: "Sea Ice Segmentation",
    subtitle: "Classifying Arctic sea-ice surface types from Sentinel-3 OLCI imagery to support radar altimetry-based thickness estimation.",
    banner: "/projects/onera/fig_21_vs_rgb.png",
    events: [
      {
        date: "Feb 2026 - Jul 2026",
        type: "internship",
        title: "ONERA: Sea Ice Surface Classification from Sentinel-3",
        detail:
          "Research internship at ONERA (The French Aerospace Lab), DTIS department, supporting Laura Orgambide's PhD work on sea-ice thickness estimation. Built a pipeline classifying sea-ice surface types (brash ice, floe, lead, thin ice) from Sentinel-3 OLCI imagery to help interpret SRAL radar altimetry. Fixed a leaking evaluation protocol with a spatio-temporal K-means split, improved data quality with a label-swap protocol that flagged 35% of thin ice samples for review, and compared a from-scratch CNN (0.870 accuracy after relabeling) against a DINOv3 foundation model probed on frozen embeddings (0.876). Also built the Sentinel-3 acquisition pipeline and a custom PyQt5/OpenGL annotation tool.",
        link: "/project/onera",
        linkLabel: "See the ONERA project",
      },
      {
        date: "Unconfirmed",
        type: "publication",
        title: "Upcoming co-authored publications",
        detail:
          "Part of this work is expected to feed into upcoming publications co-authored with Laura Orgambide's PhD research.",
      },
    ],
  },
];

export function getResearchTopic(id: string): ResearchTopic {
  const topic = researchTopics.find((t) => t.id === id);
  if (!topic) throw new Error(`Unknown research topic id: ${id}`);
  return topic;
}
