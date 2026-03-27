

# Add Major Brand Logos to Marquee

## Overview
Add luxury and major streetwear brand logos to the existing marquee. Currently 17 brands — expanding to ~30+ with high-profile names.

## New Brands to Add
**Luxury:** Louis Vuitton, Gucci, Celine, Balenciaga, Versace, Burberry, Dior, Prada
**Streetwear/Athletic:** Supreme, Off-White, BAPE, Under Armour, Lacoste, Ralph Lauren, Tommy Hilfiger, Hugo Boss, Calvin Klein, Asics

## Technical Steps

1. **Generate 18 new brand logo PNGs** using image generation — black wordmark/logo on transparent background, saved to `src/assets/brands/`
2. **Update `BrandMarquee.tsx`** — add imports for all new logos and entries in the `brands` array
3. **Adjust marquee speed** if needed — with ~35 brands the animation may need to be slightly faster or the gap reduced to keep it feeling smooth

## Files Changed
- `src/assets/brands/` — 18 new PNG files
- `src/components/BrandMarquee.tsx` — new imports and brand entries

