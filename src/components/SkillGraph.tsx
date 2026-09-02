import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TechIcon, { techLabel } from "./TechIcon";
import type { ProjectMeta } from "../data/projects";
import "./SkillGraph.css";

interface Edge {
  tech: string;
  projectId: string;
}

interface Point {
  x: number;
  y: number;
}

export default function SkillGraph({ techs, projects }: { techs: string[]; projects: ProjectMeta[] }) {
  const categoryProjects = projects.filter((p) => techs.some((t) => p.techs.includes(t)));

  const edgesRef = useRef<Edge[] | undefined>(undefined);
  if (!edgesRef.current) {
    const list: Edge[] = [];
    for (const tech of techs) {
      for (const project of categoryProjects) {
        if (project.techs.includes(tech)) list.push({ tech, projectId: project.id });
      }
    }
    edgesRef.current = list;
  }
  const edges = edgesRef.current;

  const leftCol = techs.filter((_, i) => i % 2 === 0);
  const rightCol = techs.filter((_, i) => i % 2 === 1);

  const containerRef = useRef<HTMLDivElement>(null);
  const nodeElRefs = useRef<Record<string, HTMLElement | null>>({});
  const dimPathRef = useRef<SVGPathElement | null>(null);
  const activePathRef = useRef<SVGPathElement | null>(null);
  const positionsRef = useRef<Record<string, Point>>({});
  const [hovered, setHovered] = useState<string | null>(null);

  const highlighted = new Set<string>();
  if (hovered) {
    highlighted.add(hovered);
    for (const edge of edges) {
      if (edge.tech === hovered) highlighted.add(edge.projectId);
      if (edge.projectId === hovered) highlighted.add(edge.tech);
    }
  }

  function redraw(hoveredId: string | null) {
    const positions = positionsRef.current;
    let dim = "";
    let active = "";
    for (const edge of edges) {
      const a = positions[edge.tech];
      const b = positions[edge.projectId];
      if (!a || !b) continue;
      const segment = `M${a.x},${a.y}L${b.x},${b.y}`;
      if (hoveredId === edge.tech || hoveredId === edge.projectId) active += segment;
      else dim += segment;
    }
    dimPathRef.current?.setAttribute("d", dim);
    activePathRef.current?.setAttribute("d", active);
    if (dimPathRef.current) dimPathRef.current.style.opacity = hoveredId ? "0.08" : "0.35";
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function measure() {
      const containerRect = container!.getBoundingClientRect();
      const positions: Record<string, Point> = {};
      for (const id of Object.keys(nodeElRefs.current)) {
        const el = nodeElRefs.current[id];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        positions[id] = {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        };
      }
      positionsRef.current = positions;
      redraw(null);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    redraw(hovered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered]);

  function renderTech(tech: string) {
    return (
      <div
        key={tech}
        className={`skill-graph-node ${highlighted.has(tech) ? "active" : ""}`}
        onMouseEnter={() => setHovered(tech)}
        onMouseLeave={() => setHovered(null)}
      >
        <span
          className="skill-graph-node-icon"
          ref={(el) => {
            nodeElRefs.current[tech] = el;
          }}
        >
          <TechIcon name={tech} />
        </span>
        <span className="skill-graph-label">{techLabel(tech)}</span>
      </div>
    );
  }

  return (
    <div className="skill-graph" ref={containerRef}>
      <svg className="skill-graph-svg" aria-hidden="true">
        <path ref={dimPathRef} className="skill-graph-edge" />
        <path ref={activePathRef} className="skill-graph-edge skill-graph-edge-active" />
      </svg>

      <div className="skill-graph-col-tech">{leftCol.map(renderTech)}</div>

      <div className="skill-graph-col-project-wrap">
        <div className="skill-graph-col-project">
          {categoryProjects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className={`skill-graph-project ${highlighted.has(project.id) ? "active" : ""}`}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className="skill-graph-project-avatar"
                ref={(el) => {
                  nodeElRefs.current[project.id] = el;
                }}
                style={{ backgroundImage: `url(${project.thumb})` }}
              />
              <span className="skill-graph-project-label">{project.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="skill-graph-col-tech skill-graph-col-tech-b">{rightCol.map(renderTech)}</div>
    </div>
  );
}
