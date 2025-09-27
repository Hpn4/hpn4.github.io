import React, { useRef, useEffect } from "react";

export default function Background({ starCount = 1000 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Stars color
    const starColors = [
      "rgba(255, 255, 255, OPACITY)",   // white
      "rgba(255, 244, 214, OPACITY)",   // yellow
      "rgba(255, 200, 150, OPACITY)",   // orange
      "rgba(200, 170, 255, OPACITY)",   // cyan
      "rgba(255, 180, 180, OPACITY)"    // light red
    ];

    // Create more white stars
    function pickStarColor() {
      if (Math.random() < 0.7) return starColors[0];
      return starColors[Math.floor(Math.random() * (starColors.length - 1)) + 1];
    }

    // Génération des étoiles
    let stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.01,
      opacity: Math.random(),
      speed: Math.random() * 0.007 + 0.001,
      baseColor: pickStarColor(),
    }));

    // Variables pour halo naturel
    let haloRadius = canvas.width * 1.5;
    let haloAlpha = 0.25;
    let haloTargetRadius = haloRadius;
    let haloTargetAlpha = haloAlpha;

    function randomHaloTarget() {
      haloTargetRadius = haloRadius + (Math.random() * 100 - 50); // ±50 px
      haloTargetAlpha = 0.18 + Math.random() * 0.12;              // alpha 0.08–0.2
    }

    const intervalId = setInterval(randomHaloTarget, 3000 + Math.random() * 1500);

    // function animate() {
      //ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background color
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Blue pulsing halo in the bottom right part
      haloRadius += (haloTargetRadius - haloRadius) * 0.01;
      haloAlpha += (haloTargetAlpha - haloAlpha) * 0.01;

      const halo = ctx.createRadialGradient(
        canvas.width, canvas.height, 50,
        canvas.width, canvas.height, haloRadius
      );
      halo.addColorStop(0, `rgba(40,150,255,${haloAlpha * 1.1})`);
      halo.addColorStop(0.05, `rgba(30,150,255,${haloAlpha * 0.9})`);
      halo.addColorStop(0.2, `rgba(20,140,255,${haloAlpha * 0.8})`);
      halo.addColorStop(0.3, `rgba(10,120,255,${haloAlpha * 0.6})`);
      halo.addColorStop(0.5, `rgba(2,100,255,${haloAlpha * 0.4})`);
      halo.addColorStop(0.6, `rgba(2,100,255,${haloAlpha * 0.2})`);
      halo.addColorStop(0.8, `rgba(2,100,255,${haloAlpha * 0.1})`);
      halo.addColorStop(1, "transparent");

      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Blinking stars
      stars.forEach((star) => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0) star.speed = -star.speed;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.baseColor.replace("OPACITY", star.opacity.toFixed(2));
        ctx.fill();
      });

      //requestAnimationFrame(animate);
    //}

    //animate();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(intervalId);
    };
  }, [starCount]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
}
