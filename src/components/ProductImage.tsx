import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
}

export default function ProductImage({ src, alt, className = "", aspectClass = "aspect-[3/4]" }: ProductImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${aspectClass}`}>
      {!loaded && (
        <div className="absolute inset-0 skeleton-shimmer rounded-sm" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        loading="lazy"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
