import { useLayoutEffect, useRef, useState } from "react";
import TechChip from "./TechChip";
import "./TechChipRow.css";

export default function TechChipRow({ techs }: { techs: string[] }) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(techs.length);

  useLayoutEffect(() => {
    const container = measureRef.current;
    if (!container) return;

    const chips = Array.from(container.children) as HTMLElement[];
    if (chips.length === 0) return;

    const firstTop = chips[0].offsetTop;
    let firstLineCount = 0;
    for (const chip of chips) {
      if (chip.offsetTop !== firstTop) break;
      firstLineCount++;
    }

    // Leave room for a "+N" indicator chip when some techs don't fit.
    const count = firstLineCount >= techs.length ? techs.length : Math.max(1, firstLineCount - 1);
    setVisibleCount(count);
  }, [techs]);

  const hidden = techs.length - visibleCount;

  return (
    <>
      {/* Hidden measuring pass: full list, allowed to wrap, used only to compute what fits. */}
      <div className="tech-chip-row measuring" ref={measureRef} aria-hidden="true">
        {techs.map((tech) => (
          <TechChip key={tech} name={tech} />
        ))}
      </div>

      <div className="tech-chip-row">
        {techs.slice(0, visibleCount).map((tech) => (
          <TechChip key={tech} name={tech} />
        ))}
        {hidden > 0 && <span className="tech-chip-more">+{hidden}</span>}
      </div>
    </>
  );
}
