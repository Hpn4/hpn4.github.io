import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import BackCircle from "../components/BackCircle";

import "./ProjectsPage.css"

const projects = [
  { id: "tinyx", title: "Tinyx", img: "./projects/tinyx/services.png" },
  { id: "inde", title: "ButterflyKiller", img: "./projects/inde/drawing.png" },
  { id: "caseai", title: "CaseAI", img: "./projects/caseAI/scenescreen.png" },
];

function ProjectsPage() {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <BackCircle/>

      <div className="projects-container">
        {projects.map((p) => (
          <Link key={p.id} to={`/project/${p.id}`} className="project-link">
            <div className="project-strip">
              <img src={p.img} alt={p.title} className="project-img" />
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default ProjectsPage;
