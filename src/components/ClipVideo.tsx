import "./ClipVideo.css";

type ClipVideoProps = {
  src: string;
  alt?: string;
};

export default function ClipVideo({ src, alt }: ClipVideoProps) {
  return (
    <video
      className="clip-video"
      src={src}
      autoPlay
      loop
      muted
      playsInline
      controls
      aria-label={alt}
    />
  );
}
