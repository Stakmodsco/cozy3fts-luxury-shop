import { useEffect, useRef } from "react";

const MERCHANDISE_IMAGES = [
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400", // hoodie
  "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=400", // cap
  "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400", // bag
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400", // tshirt
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400", // jacket
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400", // sweater
  "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400", // cap 2
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", // backpack
  "https://images.unsplash.com/photo-1564557287817-3085a1a1b679?w=400", // streetwear
  "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400", // joggers
];

export default function Carousel3D() {
  const n = MERCHANDISE_IMAGES.length;

  return (
    <div className="carousel-scene">
      <div
        className="carousel-a3d"
        style={{ "--n": n } as React.CSSProperties}
      >
        {MERCHANDISE_IMAGES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Merchandise ${i + 1}`}
            className="carousel-card"
            style={{ "--i": i } as React.CSSProperties}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
