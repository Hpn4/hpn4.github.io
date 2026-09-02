import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isHub: boolean;
}

const LINK_DISTANCE = 150;
const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE;
// Links are grouped by distance into a handful of alpha buckets, each drawn
// as a single batched path, instead of one stroke() call per link.
const ALPHA_BUCKETS = 6;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

export default function NetworkBackground({ density = 0.0035 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const style = getComputedStyle(document.documentElement);
    const lineColor = style.getPropertyValue("--text-muted").trim() || "#8b949e";
    const hubColor = style.getPropertyValue("--accent-green").trim() || "#3fb950";
    const nodeColor = style.getPropertyValue("--text-bright").trim() || "#f0f6fc";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let animationFrame = 0;
    let lastTime = 0;

    function makeNodes() {
      const count = Math.max(50, Math.min(150, Math.round(width * height * density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        isHub: Math.random() < 0.12,
      }));
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
      makeNodes();
    }

    function drawFrame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      // Batch every link into one path per alpha bucket. Bucketed purely off
      // squared distance (no sqrt at all) — the falloff curve is quadratic
      // instead of linear, but it's still a smooth 0..1 fade.
      const linkPaths: Path2D[] = Array.from({ length: ALPHA_BUCKETS }, () => new Path2D());
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq >= LINK_DISTANCE_SQ) continue;
          const t = 1 - distSq / LINK_DISTANCE_SQ;
          const bucket = Math.min(ALPHA_BUCKETS - 1, Math.floor(t * ALPHA_BUCKETS));
          linkPaths[bucket].moveTo(a.x, a.y);
          linkPaths[bucket].lineTo(b.x, b.y);
        }
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = lineColor;
      for (let b = 0; b < ALPHA_BUCKETS; b++) {
        ctx.globalAlpha = 0.3 * ((b + 0.5) / ALPHA_BUCKETS);
        ctx.stroke(linkPaths[b]);
      }

      // Batch every node into two paths (hub / regular) instead of one
      // beginPath()+arc()+fill() per node.
      const hubPath = new Path2D();
      const nodePath = new Path2D();
      for (const node of nodes) {
        const path = node.isHub ? hubPath : nodePath;
        path.moveTo(node.x, node.y);
        path.arc(node.x, node.y, node.isHub ? 2.2 : 1.4, 0, Math.PI * 2);
      }

      ctx.globalAlpha = 0.3;
      ctx.fillStyle = nodeColor;
      ctx.fill(nodePath);
      ctx.fillStyle = hubColor;
      ctx.fill(hubPath);
      ctx.globalAlpha = 1;
    }

    function step(time: number) {
      animationFrame = requestAnimationFrame(step);
      if (time - lastTime < FRAME_INTERVAL) return;
      lastTime = time;
      drawFrame();
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      drawFrame();
    } else {
      animationFrame = requestAnimationFrame(step);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
