// Rampes de caractères du clair au dense, partagées par le portrait et les captures.
export const RAMPS = {
  density: " .'`:-=+*%#@",
  code: " .,;:=+<>/{}[]()$#",
} as const;

export type RampName = keyof typeof RAMPS;

export const GLYPH_FONT = '"IBM Plex Mono", ui-monospace, monospace';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Échantillonne une image en grille de luminances (0..1).
 * `crop` sélectionne une zone de l'image source en fractions de sa taille.
 */
export function sampleLuminance(
  img: HTMLImageElement,
  cols: number,
  rows: number,
  crop = { x: 0, y: 0, w: 1, h: 1 },
  fit: 'stretch' | 'cover' = 'stretch'
): number[] {
  const canvas = document.createElement('canvas');
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];

  const sx = img.naturalWidth * crop.x;
  const sy = img.naturalHeight * crop.y;
  const sw = img.naturalWidth * crop.w;
  const sh = img.naturalHeight * crop.h;

  if (fit === 'cover') {
    // Comme object-fit: cover; object-position: top
    const scale = Math.max(cols / sw, rows / sh);
    ctx.drawImage(img, sx, sy, sw, sh, (cols - sw * scale) / 2, 0, sw * scale, sh * scale);
  } else {
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
  }

  const data = ctx.getImageData(0, 0, cols, rows).data;
  const out: number[] = [];
  for (let i = 0; i < data.length; i += 4) {
    out.push((data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11) / 255);
  }
  return out;
}
