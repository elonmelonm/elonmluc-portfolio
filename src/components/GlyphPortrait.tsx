import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { RAMPS, GLYPH_FONT, prefersReducedMotion, sampleLuminance, type RampName } from '../lib/glyphs';

interface Cell {
  hx: number; hy: number; x: number; y: number; vx: number; vy: number;
  // v : luminosité étirée (0..1) ; bg : cellule du fond de la photo
  v: number; bg: boolean;
}

interface GlyphPortraitProps {
  src: string;
  alt: string;
  // Zone de la photo à cadrer, en fractions (la photo source est en paysage).
  crop?: { x: number; y: number; w: number; h: number };
}

const DEFAULT_CROP = { x: 0.18, y: 0, w: 0.533, h: 1 };

// Couleur de fond du site, lue dans les variables CSS (« 237 238 242 »).
const pageBackground = () =>
  `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()})`;

// Sombre : caractères clairs. Clair : encre. Le fond est toujours celui du site.
const PALETTES = {
  dark: { glyph: '233,230,220', accent: '#9BA6FF' },
  light: { glyph: '20,22,43', accent: '#2A3590' },
};

// Zone de la tête dans le cadrage. Les cheveux y sont protégés du remplissage :
// ce sont les pixels plus sombres que le fond (ceux que le mode sombre laisse vides).
const SUBJECT = { cx: 0.55, cy: 0.3, rx: 0.19, ry: 0.22 };

/**
 * Marque le fond de la photo par remplissage depuis les bords :
 * on avance de proche en proche tant que la luminosité varie peu (le fond est un dégradé lisse).
 */
function backgroundMask(lum: number[], stretched: number[], cols: number, rows: number): boolean[] {
  const border: number[] = [];
  for (let x = 0; x < cols; x++) border.push(lum[x]);
  for (let y = 0; y < rows; y++) border.push(lum[y * cols], lum[y * cols + cols - 1]);
  border.sort((a, b) => a - b);
  const ref = border[Math.floor(border.length / 2)];
  const min = ref - 0.035;
  const max = ref + 0.14;

  const allowed = (i: number) => {
    if (lum[i] <= min || lum[i] >= max) return false;
    const x = ((i % cols) + 0.5) / cols;
    const y = (Math.floor(i / cols) + 0.5) / rows;
    const inHead = ((x - SUBJECT.cx) / SUBJECT.rx) ** 2 + ((y - SUBJECT.cy) / SUBJECT.ry) ** 2 < 1;
    return !(inHead && stretched[i] < 0.06);
  };

  const mask = new Array<boolean>(lum.length).fill(false);
  const stack: number[] = [];
  const seed = (i: number) => {
    if (!mask[i] && allowed(i)) { mask[i] = true; stack.push(i); }
  };
  for (let x = 0; x < cols; x++) seed(x);
  for (let y = 0; y < rows; y++) { seed(y * cols); seed(y * cols + cols - 1); }

  while (stack.length) {
    const i = stack.pop()!;
    const x = i % cols;
    const neighbours = [x > 0 ? i - 1 : -1, x < cols - 1 ? i + 1 : -1, i >= cols ? i - cols : -1, i < (rows - 1) * cols ? i + cols : -1];
    for (const j of neighbours) {
      if (j >= 0 && !mask[j] && Math.abs(lum[j] - lum[i]) < 0.012 && allowed(j)) {
        mask[j] = true;
        stack.push(j);
      }
    }
  }
  return mask;
}

// Portrait dessiné en caractères qui fuient le curseur, avec bascule vers la vraie photo.
export default function GlyphPortrait({ src, alt, crop = DEFAULT_CROP }: GlyphPortraitProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellsRef = useRef<Cell[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, ch: 10 });
  const rampRef = useRef<RampName>('density');
  const [ramp, setRamp] = useState<RampName>('density');
  const [showPhoto, setShowPhoto] = useState(false);
  const photoModeRef = useRef(false);

  useEffect(() => {
    rampRef.current = ramp;
  }, [ramp]);

  useEffect(() => {
    photoModeRef.current = showPhoto;
    if (prefersReducedMotion()) window.dispatchEvent(new Event('resize'));
  }, [showPhoto]);

  useEffect(() => {
    themeRef.current = theme;
    if (prefersReducedMotion()) window.dispatchEvent(new Event('resize'));
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = prefersReducedMotion();
    const mouse = { x: -1e4, y: -1e4 };
    const img = new Image();
    // Loupe autour du pointeur : la photo sous le code, ou le code sous la photo.
    const lens = { x: 0, y: 0, r: 0 };
    const photo = document.createElement('canvas');
    const lensCanvas = document.createElement('canvas');
    let codeAlpha = photoModeRef.current ? 0 : 1;
    let raf = 0;
    let resizeTimer = 0;

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = rect.width;
      const h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cw = w < 420 ? 6 : w < 640 ? 7 : 8;
      const ch = cw * 1.25;
      const cols = Math.floor(w / cw);
      const rows = Math.floor(h / ch);
      sizeRef.current = { w, h, ch };

      // Photo pré-rendue au format du canvas, même cadrage que les caractères.
      photo.width = w * dpr;
      photo.height = h * dpr;
      photo.getContext('2d')?.drawImage(
        img,
        img.naturalWidth * crop.x, img.naturalHeight * crop.y,
        img.naturalWidth * crop.w, img.naturalHeight * crop.h,
        0, 0, photo.width, photo.height
      );

      // Étirement de contraste : la photo a un fond sombre et des tons moyens.
      const lum = sampleLuminance(img, cols, rows, crop);
      const sorted = [...lum].sort((a, b) => a - b);
      const lo = sorted[Math.floor(sorted.length * 0.05)];
      const hi = sorted[Math.floor(sorted.length * 0.985)];

      const stretched = lum.map((l) => Math.pow(Math.max(0, Math.min(1, (l - lo) / (hi - lo || 1))), 0.85));
      const bgMask = backgroundMask(lum, stretched, cols, rows);

      const cells: Cell[] = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const v = stretched[i];
          // Vide dans les deux modes : rien à dessiner.
          if (bgMask[i] && v < 0.06) continue;
          const hx = x * cw + cw / 2;
          const hy = y * ch + ch / 2;
          cells.push({
            hx, hy, vx: 0, vy: 0, v, bg: bgMask[i],
            x: reduce ? hx : hx + (Math.random() - 0.5) * w * 0.9,
            y: reduce ? hy : hy + (Math.random() - 0.5) * h * 0.9,
          });
        }
      }
      cellsRef.current = cells;
    };

    const drawGlyphs = (g: CanvasRenderingContext2D, ox: number, oy: number, clip?: { x: number; y: number; r: number }) => {
      const { ch } = sizeRef.current;
      const chars = RAMPS[rampRef.current];
      const n = chars.length - 1;
      const light = themeRef.current === 'light';
      const palette = PALETTES[light ? 'light' : 'dark'];
      g.font = `600 ${ch * 0.95}px ${GLYPH_FONT}`;
      g.textAlign = 'center';
      g.textBaseline = 'middle';

      for (const p of cellsRef.current) {
        if (clip && (Math.abs(p.x - clip.x) > clip.r + ch || Math.abs(p.y - clip.y) > clip.r + ch)) continue;
        // Clair : densité = obscurité, et le fond de la photo reste vide.
        if (light && p.bg) continue;
        const ink = light ? Math.pow(1 - p.v, 1.15) : p.v;
        if (ink < 0.06) continue;
        const off = Math.hypot(p.x - p.hx, p.y - p.hy);
        let ci = Math.round(ink * n);
        if (off > 4 && rampRef.current === 'code') ci = Math.min(n, ci + 3);
        const glyph = chars[ci];
        if (glyph === ' ') continue;
        g.fillStyle = off > 6 || ink > 0.93 ? palette.accent : `rgba(${palette.glyph},${0.35 + ink * 0.65})`;
        g.fillText(glyph, p.x - ox, p.y - oy);
      }
    };

    const draw = () => {
      const { w, h } = sizeRef.current;
      const radius = Math.min(w, h) * 0.16;
      const photoMode = photoModeRef.current;

      // Fondu entre les deux modes (le code s'efface quand la photo est au-dessus).
      const codeTarget = photoMode ? 0 : 1;
      codeAlpha = reduce ? codeTarget : codeAlpha + (codeTarget - codeAlpha) * 0.12;

      const inside = mouse.x > -1e3;
      const lensTarget = inside ? radius * 0.9 : 0;
      if (reduce) {
        lens.r = lensTarget;
        if (inside) { lens.x = mouse.x; lens.y = mouse.y; }
      } else {
        lens.r += (lensTarget - lens.r) * 0.15;
        if (inside) {
          lens.x += (mouse.x - lens.x) * (lens.r < 1 ? 1 : 0.25);
          lens.y += (mouse.y - lens.y) * (lens.r < 1 ? 1 : 0.25);
        }
      }

      if (!reduce) {
        for (const p of cellsRef.current) {
          // En mode photo, les caractères restent en place pour remplir la loupe.
          if (!photoMode) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < radius * radius) {
              const d = Math.sqrt(d2) || 1;
              const force = (1 - d / radius) * 2.4;
              p.vx += (dx / d) * force;
              p.vy += (dy / d) * force;
            }
          }
          p.vx = (p.vx + (p.hx - p.x) * 0.06) * 0.8;
          p.vy = (p.vy + (p.hy - p.y) * 0.06) * 0.8;
          p.x += p.vx;
          p.y += p.vy;
        }
      }

      ctx.clearRect(0, 0, w, h);
      if (lens.r > 0.5) drawLens(1 - codeAlpha);
      if (codeAlpha > 0.01) {
        ctx.globalAlpha = codeAlpha;
        drawGlyphs(ctx, 0, 0);
        ctx.globalAlpha = 1;
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    /**
     * Loupe à bords adoucis autour du pointeur.
     * Mode code : elle montre la photo. Mode photo : elle montre les caractères sur le fond du site.
     * `mix` va de 0 (mode code) à 1 (mode photo) pendant le fondu.
     */
    const drawLens = (mix: number) => {
      const dpr = photo.width / (sizeRef.current.w || 1);
      const size = Math.ceil(lens.r * 2 * dpr);
      if (size < 2) return;
      lensCanvas.width = size;
      lensCanvas.height = size;
      const lc = lensCanvas.getContext('2d');
      if (!lc) return;
      const ox = lens.x - lens.r;
      const oy = lens.y - lens.r;

      if (mix < 1) {
        lc.globalAlpha = 1 - mix;
        lc.drawImage(photo, ox * dpr, oy * dpr, size, size, 0, 0, size, size);
      }
      if (mix > 0) {
        lc.globalAlpha = mix;
        lc.setTransform(dpr, 0, 0, dpr, 0, 0);
        lc.fillStyle = pageBackground();
        lc.fillRect(0, 0, lens.r * 2, lens.r * 2);
        drawGlyphs(lc, ox, oy, lens);
        lc.setTransform(1, 0, 0, 1, 0, 0);
      }
      lc.globalAlpha = 1;

      const fade = lc.createRadialGradient(size / 2, size / 2, size * 0.25, size / 2, size / 2, size / 2);
      fade.addColorStop(0, 'rgba(0,0,0,1)');
      fade.addColorStop(1, 'rgba(0,0,0,0)');
      lc.globalCompositeOperation = 'destination-in';
      lc.fillStyle = fade;
      lc.fillRect(0, 0, size, size);
      ctx.drawImage(lensCanvas, ox, oy, lens.r * 2, lens.r * 2);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (reduce) draw();
    };
    const onLeave = () => {
      mouse.x = mouse.y = -1e4;
      if (reduce) draw();
    };
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => { layout(); if (reduce) draw(); }, 150);
    };

    img.onload = () => {
      layout();
      // Attend la police pour que les caractères aient la bonne chasse.
      document.fonts.ready.then(() => { raf = requestAnimationFrame(draw); });
    };
    img.src = src;

    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [src, crop]);

  // Retour au code : les caractères se redispersent puis se réassemblent.
  const togglePhoto = () => {
    const next = !showPhoto;
    setShowPhoto(next);
    if (!next && !prefersReducedMotion()) {
      const { w, h } = sizeRef.current;
      for (const p of cellsRef.current) {
        p.x = p.hx + (Math.random() - 0.5) * w * 0.6;
        p.y = p.hy + (Math.random() - 0.5) * h * 0.6;
      }
    }
  };

  // Mode réduit : redessiner une fois quand la rampe change.
  useEffect(() => {
    if (prefersReducedMotion()) window.dispatchEvent(new Event('resize'));
  }, [ramp]);

  const ease = 'duration-700 ease-[cubic-bezier(.16,1,.3,1)]';

  return (
    <figure className="m-0 w-full">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded">
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover object-[38.6%_center] transition-[opacity,transform,filter] ${ease} ${showPhoto ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[1.02] blur-md'}`}
        />
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={t('home.portrait.label')}
          className="relative block h-full w-full cursor-crosshair touch-pan-y"
        />
      </div>

      <figcaption className="label mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="inline-flex items-center gap-2">
          <span className={showPhoto ? '' : 'text-ink'}>{t('home.portrait.code')}</span>
          <button
            type="button"
            role="switch"
            aria-checked={showPhoto}
            aria-label={t('home.portrait.show_photo')}
            onClick={togglePhoto}
            className={`relative h-[22px] w-10 rounded-full transition-colors focus-ring ${showPhoto ? 'bg-indigo' : 'bg-rule'}`}
          >
            <span
              className={`absolute left-[3px] top-[3px] size-4 rounded-full transition-transform duration-200 ${showPhoto ? 'translate-x-[18px] bg-paper' : 'bg-ink'}`}
            />
          </button>
          <span className={showPhoto ? 'text-ink' : ''}>{t('home.portrait.photo')}</span>
        </span>
        <button
          type="button"
          onClick={() => setRamp(ramp === 'density' ? 'code' : 'density')}
          className="text-indigo underline underline-offset-[3px] focus-ring"
        >
          {t('home.portrait.mode')} : {ramp === 'density' ? t('home.portrait.density') : t('home.portrait.code_chars')}
        </button>
        <span className="hidden sm:inline">{showPhoto ? t('home.portrait.hint_photo') : t('home.portrait.hint')}</span>
      </figcaption>
    </figure>
  );
}
