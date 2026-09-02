import { Link } from "react-router-dom";
import type { ResearchTopic } from "../data/research";
import "./ResearchCard.css";

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="1.5" y="3" width="13" height="11" rx="1.5" />
      <line x1="1.5" y1="6.2" x2="14.5" y2="6.2" />
      <line x1="4.5" y1="1.3" x2="4.5" y2="4" />
      <line x1="11.5" y1="1.3" x2="11.5" y2="4" />
    </svg>
  );
}

export default function ResearchCard({ topic }: { topic: ResearchTopic }) {
  const count = topic.events.length;

  return (
    <Link to={`/research/${topic.id}`} className="research-card">
      <div className="research-card-thumb" style={{ backgroundImage: `url(${topic.banner})` }} />
      <div className="research-card-body">
        <div className="research-card-title-row">
          <h3 className="research-card-title">{topic.title}</h3>
          {count > 0 && (
            <span className="research-card-badge" title="Milestones">
              <CalendarIcon /> {count}
            </span>
          )}
        </div>
        <p className="research-card-subtitle">{topic.subtitle}</p>
      </div>
    </Link>
  );
}
