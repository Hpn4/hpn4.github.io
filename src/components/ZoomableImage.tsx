import { useState, useEffect } from "react";
import "./ZoomableImage.css";

type ZoomableImageProps = {
  src: string;
  alt?: string;
  // "contain" (default): shrink to fit the screen, no scrolling.
  // "width": fill the available width and scroll vertically instead of
  // shrinking, better for tall images like an A0 poster.
  fit?: "contain" | "width";
};

export default function ZoomableImage({ src, alt, fit = "contain" }: ZoomableImageProps) {
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
          className={`zoomable-overlay ${fit === "width" ? "zoomable-overlay-scroll" : ""} ${isClosing ? "closing" : ""}`}
          onClick={close}
        >
          <img
            src={src}
            alt={alt}
            className={`zoomable-full ${fit === "width" ? "zoomable-full-width" : ""} ${isClosing ? "closing" : ""}`}
          />
        </div>
      )}
    </>
  );
}
