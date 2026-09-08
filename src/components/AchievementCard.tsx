import type { AboutEntry } from "../data/about";
import "./AchievementCard.css";

export default function AchievementCard({ achievement }: { achievement: AboutEntry }) {
  const inner = (
    <>
      {achievement.logo && (
        <div className="achievement-card-logo">
          <img src={achievement.logo} alt={achievement.org} />
        </div>
      )}
      <div className="achievement-card-body">
        <p className="achievement-card-date">{achievement.date} · {achievement.org}</p>
        <h3 className="achievement-card-title">{achievement.title}</h3>
        {achievement.badge && <p className="achievement-card-badge">{achievement.badge}</p>}
      </div>
    </>
  );

  if (achievement.link) {
    return (
      <a href={achievement.link} target="_blank" rel="noopener noreferrer" className="achievement-card">
        {inner}
      </a>
    );
  }

  return <div className="achievement-card">{inner}</div>;
}
