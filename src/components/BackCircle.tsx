import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ButtonText from "./text/ButtonText";

import "../home/HomeCircle.css";
import "./BackCircle.css"

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

const Circles = ({ lastCircle = true, centerText = "Back"}) => {
  const textRef = useRef(null);
  const [textBox, setTextBox] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      setTextBox({ width: bbox.width, height: bbox.height });
    }
  }, [centerText]);

  const baseRadius = Math.max(textBox.width, textBox.height) / 2 + 20;
  const maxRadius = baseRadius + 75;

  const orbitsData = [
    { radius: (baseRadius + 30), reverse: true, speed: 6, dashed: true, balls: [] },
    { radius: (baseRadius + 40), reverse: false, speed: 7, dashed: false, balls: [{ angle: Math.PI * 0.65 }, { angle: Math.PI * 1.3 }, { angle: Math.PI * 2 }] },
    ...(lastCircle ? [{ radius: (baseRadius + 75), reverse: true, speed: 10, dashed: false, balls: [{ angle: 0 }, { angle: Math.PI }] }] : [])
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
            textAnchor="middle"
            fill="transparent"
            fontSize="15"
            fontFamily="Astro, sans-serif"
            fontWeight="bold"
          >
            {centerText}
          </text>
        </g>
      </svg>
    </div>
  );
};

const BackCircle = ({ lastCircle = true, to="/" }) => {
  return (
    <div>
      <div className="back-title-circles">
        <Circles lastCircle={lastCircle}/>
      </div>
      
      <Link to={to}>
        <div className="back-title">
          <ButtonText>Back</ButtonText>
        </div>
      </Link>
    </div>
  );
}

export default BackCircle;
