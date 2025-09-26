import React, { useRef, useState, useEffect } from "react";
import "./HomeCircle.css";

const Orbit = ({ radius = 100, reverse = false, speed = 10, dashed = false, balls = [] }) => {
  const dashProps = dashed ? { strokeDasharray: "1 4" } : {};

  return (
    <g className={`orbit-group ${reverse ? "reverse" : ""}`} style={{ animationDuration: `${speed}s` }}>
      <circle
        r={radius}
        cx="0"
        cy="0"
        stroke="white"
        strokeWidth={dashed ? "5" : "1"}
        fill="none"
        {...dashProps}
      />
      {balls.map((ball, idx) => {
        const x = radius * Math.cos(ball.angle || 0);
        const y = radius * Math.sin(ball.angle || 0);
        return <circle key={idx} cx={x} cy={y} r="5" fill="white" />;
      })}
    </g>
  );
};

const HomeCircle = ({ mobile = false, centerText = "Etienne SENIGOUT", roleText = "{Junior Developper}" }) => {
  const textRef = useRef(null);
  const [textBox, setTextBox] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      setTextBox({ width: bbox.width, height: bbox.height });
    }
  }, [centerText, roleText]);

  const baseRadius = Math.max(textBox.width, textBox.height) / 2 + 20;
  const maxRadius = (window.innerHeight / 2) * 0.4;
  const radiusScale = maxRadius / (baseRadius + 110);

  const orbitsData = [
    { radius: (baseRadius + 10), reverse: true, speed: 6, dashed: true, balls: [] },
    { radius: (baseRadius + 20), reverse: false, speed: 7, dashed: false, balls: [{ angle: Math.PI * 0.65 }, { angle: Math.PI * 1.3 }, { angle: Math.PI * 2 }] },
    { radius: (baseRadius + 100) * radiusScale, reverse: true, speed: 10, dashed: false, balls: [{ angle: 0 }, { angle: Math.PI }] },
    { radius: (baseRadius + 110) * radiusScale, reverse: false, speed: 15, dashed: true, balls: [{ angle: Math.PI / 2 }, { angle: Math.PI * 1.5 }] },
  ];

  return (
    <div className="orbit-container" style={{
      width: maxRadius * 2 + 50,
      height: maxRadius * 2 + 50
    }}>
      <svg
        width={maxRadius * 2 + 50}
        height={maxRadius * 2 + 50}
        style={{ overflow: "visible" }}
      >
        <g transform={`translate(${maxRadius + 25}, ${maxRadius + 25})`}>
          {orbitsData.map((orbit, idx) => (
            <Orbit key={idx} {...orbit} />
          ))}

          {/* Texte au centre */}
          <text
            ref={textRef}
            x="0"
            y={mobile ? "30" : "-5"}
            textAnchor="middle"
            fill="white"
            fontSize="18"
            fontFamily="Astro, sans-serif"
            fontWeight="bold"
          >
            {centerText}
          </text>
          <text
            x="0"
            y={mobile ? "50" : "15"}
            textAnchor="middle"
            fill="#3477eb"
            fontSize="15"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
          >
            {roleText}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default HomeCircle;
