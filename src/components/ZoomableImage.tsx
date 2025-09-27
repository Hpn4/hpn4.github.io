import React, { useState, useEffect } from "react";
import "./ZoomableImage.css";

type ZoomableImageProps = {
  src: string;
  alt?: string;
};

export default function ZoomableImage({ src, alt }: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Fermer avec animation
  const close = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsOpen(false);
    }, 250); // durée = durée de l’anim CSS
  };

  // Échap pour fermer
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="zoomable-thumb"
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div
          className={`zoomable-overlay ${isClosing ? "closing" : ""}`}
          onClick={close}
        >
          <img
            src={src}
            alt={alt}
            className={`zoomable-full ${isClosing ? "closing" : ""}`}
          />
        </div>
      )}
    </>
  );
}
