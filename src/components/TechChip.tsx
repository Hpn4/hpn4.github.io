import TechIcon, { techLabel } from "./TechIcon";
import "./TechChip.css";

export default function TechChip({ name }: { name: string }) {
  return (
    <span className="tech-chip">
      <TechIcon name={name} />
      <span className="tech-chip-label">{techLabel(name)}</span>
    </span>
  );
}
