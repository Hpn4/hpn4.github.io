import React, { useRef, useEffect } from "react";
import EnergyBall from "./../components/EnergyBall";

function drawHudBall(ctx, {
  x, y, text = "", angle = 0, radius = 20, arcRadius = 40
}) {
  const arcStart = angle - Math.PI / 6;
  const arcEnd = angle + Math.PI / 6;
  ctx.beginPath();
  ctx.arc(x, y, radius + arcRadius, arcStart, arcEnd);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
  ctx.stroke();

  let side = "right";
  if (angle > Math.PI / 2 && angle < Math.PI * 1.5)
    side = "left";

  // Ligne partant du milieu de l’arc
  const midAngle = (arcStart + arcEnd) / 2;
  const lineStartX = x + (radius + arcRadius) * Math.cos(midAngle);
  const lineStartY = y + (radius + arcRadius) * Math.sin(midAngle);

  const lineLength = 100;
  const lineEndX = lineStartX + (side === "right" ? lineLength : -lineLength);
  const lineEndY = lineStartY + (angle > Math.PI ? - 40 : 40);

  ctx.beginPath();
  ctx.moveTo(lineStartX, lineStartY);
  ctx.lineTo(lineEndX, lineEndY);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Texte HUD
  ctx.fillStyle = "white";
  ctx.font = "20px Astro";
  ctx.textAlign = side === "right" ? "left" : "right";
  ctx.textBaseline = "middle";
  ctx.fillText(text, lineEndX + (side === "right" ? 10 : -10), lineEndY + 7);
}

export default function MenuHome({
  width = window.innerWidth,
  height = window.innerHeight,
  max_radius = Math.min(width, height) / 2,
  orbitsData = [
    {
      radius: max_radius * 0.95,
      speed: 0.000,
      direction: 1,
      dashed: false,
      balls: [
        { angle: 7 * Math.PI * 2 / 8, text: "About", link: "http://hpn4.github.io/QuartzObsidian/" },
        { angle: Math.PI * 2 / 8, text: "Notes", link: "http://hpn4.github.io/QuartzObsidian/" },
        { angle: 3 * Math.PI * 2 / 8, text: "Skills", link: "/blog" },
        { angle: 5 * Math.PI * 2 / 8, text: "Projects", link: "/blog" },
      ],
    },
  ],
}) {
  const canvasRef = useRef(null);
  const energyBallCanvasRef = useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    const centerX = width / 2;
    const centerY = height / 2;

    function animate() {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "white";

      // Dessin des orbites et boules (texte)
      orbitsData.forEach((orbit) => {
        ctx.strokeStyle = "white";
        orbit.rotation = (orbit.rotation || 0) + orbit.speed * orbit.direction;
        ctx.save();

        ctx.translate(centerX, centerY); // place le centre de rotation
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(0, 0, orbit.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        orbit.balls.forEach((ball) => {
          const x = centerX + orbit.radius * Math.cos(ball.angle) * orbit.direction;
          const y = centerY + orbit.radius * Math.sin(ball.angle) * orbit.direction;

          if (ball.link) {
            const dx = mouseX - x;
            const dy = mouseY - y;
            const size = dx * dx + dy * dy <= 100 * 100 ? 120 : 90;

            ctx.drawImage(
              energyBallCanvasRef.current,
              x - size / 2, 
              y - size / 2, 
              size, 
              size
            );

            drawHudBall(ctx, {x: x, y: y, text: ball.text, angle: ball.angle});
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Clic sur texte/boule
    function handleClick(e) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      orbitsData.forEach((orbit) => {
        orbit.balls.forEach((ball) => {
          const x = centerX + orbit.radius * Math.cos(ball.angle);
          const y = centerY + orbit.radius * Math.sin(ball.angle);
          const dx = mouseX - x;
          const dy = mouseY - y;

          if (dx * dx + dy * dy < 100 * 100 && ball.link) {
            window.open(ball.link, "_blank");
          }
        });
      });
    }

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    canvas.addEventListener("click", handleClick);
    return () => canvas.removeEventListener("click", handleClick);
  }, [width, height, orbitsData]);

  return (
    <>
    <EnergyBall ref={energyBallCanvasRef} />
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
        background: "transparent",
        width: "100%",
        height: "100%",
      }}
    />
    </>
  );
}
