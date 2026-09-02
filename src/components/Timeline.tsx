import { Fragment, type ReactNode } from "react";
import "./Timeline.css";

export interface TimelineItem {
  date: string;
  content: ReactNode;
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="timeline">
      {items.map((item, idx) => (
        <Fragment key={idx}>
          <div className="timeline-date">{item.date}</div>
          <div className="timeline-dot-wrap">
            <span className="timeline-dot" />
          </div>
          <div className="timeline-card-wrap">{item.content}</div>
        </Fragment>
      ))}
    </div>
  );
}
