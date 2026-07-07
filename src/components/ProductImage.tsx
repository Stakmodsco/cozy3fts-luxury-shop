import { useState } from "react";
import placeholder from "@/assets/logo.png";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
}

export default function ProductImage({ src, alt, className = "", aspectClass = "aspect-[3/4]" }: ProductImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  // Security: render the real artwork as a CSS background on a <div>.
  // This defeats "Save image as…", "Open image in new tab", and drag-to-save
  // because there is no <img> vector for the browser's context menu to target.
  // A 1x1 transparent <img> is layered on top only to preserve the alt text
  // for accessibility and SEO — it carries no visual data.
  const resolvedSrc = errored || !src ? placeholder : src;
  const TRANSPARENT_PX =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  // Preload so we can flip the loaded state and swap in the background.
  if (typeof window !== "undefined" && !loaded && !errored) {
    const preloader = new Image();
    preloader.onload = () => setLoaded(true);
    preloader.onerror = () => {
      setErrored(true);
      setLoaded(true);
    };
    preloader.src = resolvedSrc;
  }

  return (
    <div
      className={`relative ${aspectClass} select-none protected-image ${className}`}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      role="img"
      aria-label={alt}
      style={{
        backgroundImage: loaded ? `url("${resolvedSrc}")` : undefined,
        backgroundSize: errored ? "contain" : "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: errored ? "hsl(var(--secondary))" : undefined,
        WebkitUserSelect: "none",
        userSelect: "none",
        WebkitTouchCallout: "none",
      }}
    >
      {!loaded && (
        <div className="absolute inset-0 skeleton-shimmer rounded-sm" />
      )}
      {/* Invisible accessibility layer — no real image bytes, so Save-As grabs nothing useful */}
      <img
        src={TRANSPARENT_PX}
        alt={alt}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
      />
      {/* Transparent tap-shield: absorbs long-press / right-click on mobile & desktop */}
      <div
        className="absolute inset-0"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        style={{ WebkitTouchCallout: "none", userSelect: "none" }}
      />
    </div>
  );
}
