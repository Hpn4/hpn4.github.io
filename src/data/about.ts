export interface AboutEntry {
  date: string;
  title: string;
  org: string;
  type?: string;
  period: string;
  location?: string;
  mode?: string;
  detail: string;
  badge?: string;
  logo?: string;
  link?: string;
  linkLabel?: string;
  image?: string;
  imageAlt?: string;
}

export const experience: AboutEntry[] = [
  {
    date: "2026",
    title: "Research Intern",
    org: "ONERA - The French Aerospace Lab",
    type: "Internship",
    period: "Feb 2026 - Jul 2026 (6 months)",
    location: "Paris area",
    mode: "On-site",
    detail:
      "Project within the DTIS department: developing and evaluating semantic segmentation models applied to sea ice, using remote sensing data (Sentinel-3 satellite imagery, ice concentration data).",
    logo: "/about/logos/onera.svg",
    link: "/project/onera",
    linkLabel: "See the ONERA project",
  },
  {
    date: "2025 - 26",
    title: "AI & Computer Vision Research Intern - Chondrite Analysis & Classification, LRE EPITA",
    org: "LRDE (EPITA Research & Development Lab)",
    type: "Internship",
    period: "Feb 2025 - Feb 2026 (1 year 1 month)",
    location: "Paris, France",
    mode: "On-site",
    detail:
      "Classification of chondrites from BSE and hyperspectral data provided by the MNHN (French National Museum of Natural History) and IMPMC (Sorbonne University). Built pipelines to extract chondritic components and deployed AI / computer-vision-based classification models.",
    logo: "/about/logos/lrde.png",
    link: "/project/chondritesviewer",
    linkLabel: "See the ChondritesViewer project",
  },
  {
    date: "2024 - 25",
    title: "Developer & Project Lead Intern",
    org: "CNRS",
    type: "Internship",
    period: "Sept 2024 - Feb 2025 (6 months)",
    location: "Paris, France",
    mode: "On-site",
    detail:
      "Developed Holovibes, an open-source C++/CUDA platform for real-time visualization of the eye fundus from interferograms.",
    logo: "/about/logos/cnrs.svg",
    link: "/project/holovibes",
    linkLabel: "See the Holovibes project",
  },
  {
    date: "2023 - 24",
    title: "Fullstack, Cloud & DevOps Developer Intern",
    org: "EPITA (La Forge dev lab)",
    type: "Internship",
    period: "Sept 2023 - Jul 2024 (11 months)",
    location: "Rennes, France",
    mode: "Hybrid",
    detail:
      "Six-month practical project designing and deploying cloud applications at EPITA's Forge dev lab. Designed network and software architectures around the CQRS pattern, and automated infrastructure and service deployment with Kubernetes, ArgoCD, Ansible, OpenStack and Terraform. Contributed end to end to a form-management application, from requirements analysis to data modeling and delivery.",
    logo: "/about/logos/epita.png",
    link: "/project/epita-forge-deploy",
    linkLabel: "See the Forge Deploy project",
  },
  {
    date: "2023",
    title: "Store Associate",
    org: "Carrefour",
    type: "Fixed-term contract",
    period: "Aug 2023 (1 month)",
    location: "Saint-Grégoire, France",
    mode: "On-site",
    detail: "Checkout, shelf stocking, inventory and stock management, delivery receiving and parcel handling.",
    logo: "/about/logos/carrefour.png",
  },
  {
    date: "2022 - 23",
    title: "Store Associate",
    org: "Carrefour",
    type: "Permanent contract",
    period: "Jul 2022 - Jan 2023 (7 months)",
    location: "Saint-Grégoire, France",
    mode: "On-site",
    detail: "Checkout, shelf stocking, inventory and stock management, parcel handling.",
    logo: "/about/logos/carrefour.png",
  },
];

export const education: AboutEntry[] = [
  {
    date: "2021 - 26",
    title: "Master's in Computer Science, Software Engineering",
    org: "EPITA - School of Engineering and Computer Science",
    period: "2021 - 2026",
    detail: "Five-year engineering program covering software engineering, systems and infrastructure.",
    logo: "/about/logos/epita.png",
  },
  {
    date: "2023",
    title: "Bachelor of Engineering, Computer Science",
    org: "EHU",
    period: "Jan 2023 - Jul 2023",
    detail: "One-semester academic exchange as part of the EPITA engineering program.",
    logo: "/about/logos/ehu.svg",
  },
];

export const achievements: AboutEntry[] = [
  {
    date: "2025",
    title: "Drone Defense Hackathon",
    org: "Artefact",
    period: "Nov 2025",
    detail: "Hackathon on drone-based crisis response.",
    badge: "🥇 Winner of Challenge 4: Deliver in a crisis situation",
    logo: "/about/logos/artefact.png",
    image: "/about/hackathon.jpg",
    imageAlt: "Team photo after winning Challenge 4 at the Drone Defense Hackathon",
  },
];
