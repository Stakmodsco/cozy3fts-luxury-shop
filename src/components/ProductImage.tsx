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

  return (
    <div className={`relative ${aspectClass}`}>
      {!loaded && (
        <div className="absolute inset-0 skeleton-shimmer rounded-sm" />
      )}
      <img
        src={errored || !src ? placeholder : src}
        alt={alt}
        className={`w-full h-full ${errored ? "object-contain p-8 bg-secondary" : "object-cover"} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        loading="lazy"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setErrored(true);
          setLoaded(true);
        }}
      />
    </div>
  );
}
