import { useEffect, useState } from "react";
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
  const resolvedSrc = errored || !src ? placeholder : src;

  useEffect(() => {
    setLoaded(false);
    setErrored(false);
    const img = new Image();
    let cancelled = false;
    img.onload = () => !cancelled && setLoaded(true);
    img.onerror = () => {
      if (cancelled) return;
      setErrored(true);
      setLoaded(true);
    };
    img.src = src || placeholder;
    return () => {
      cancelled = true;
    };
  }, [src]);

  // Real artwork is rendered as a CSS background — there's no <img> vector
  // for "Save image as…" or "Open image in new tab" to target.
  const TRANSPARENT_PX =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

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
