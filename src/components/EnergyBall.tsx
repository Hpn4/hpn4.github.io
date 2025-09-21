import React, { useRef, useEffect, forwardRef } from "react";

const EnergyBall = forwardRef(({ numParticles = 25 }, ref) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (ref) ref.current = canvasRef.current;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = (canvas.width = 120);
    const height = (canvas.height = 120);

    const distance = 60; 
    const maxDistance = distance * 30;

    class Particle {
      constructor() {
        this.x = width / 2 + (Math.random() - 0.5) * 70;
        this.y = height / 2 + (Math.random() - 0.5) * 70;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        const dx = width / 2 - this.x;
        const dy = height / 2 - this.y;
        this.vx += dx * 0.0005;
        this.vy += dy * 0.0005;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "#3477eb";
        ctx.fill();
      }
    }

    const particles = Array.from({ length: numParticles }, () => new Particle());

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < numParticles; i++) {
        for (let j = i + 1; j < numParticles; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = dx * dx + dy * dy;

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = 1 - dist / maxDistance;
            ctx.strokeStyle = `rgba(52, 119, 235, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, [numParticles, ref]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        background: "transparent",
        display: "block",
        display: "none",
        borderRadius: "50%",
      }}
    />
  );
});

export default EnergyBall;