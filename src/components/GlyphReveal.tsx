import { useEffect, useRef } from 'react';
import { RAMPS, GLYPH_FONT, prefersReducedMotion, sampleLuminance } from '../lib/glyphs';
import { useTheme } from '../context/ThemeContext';

interface GlyphRevealProps {
  src: string;
  // Repasse en code au survol de l'élément parent marqué `group`.
  hovered?: boolean;
  // Doit correspondre à l'object-fit de l'image recouverte.
  fit?: 'cover' | 'contain';
}

const CELL_W = 9;
const CELL_H = 11;

const GLYPHS = { dark: '155,166,255', light: '20,22,43' };

// Couleur de fond du site, lue dans les variables CSS (« 237 238 242 »).
const pageBackground = () =>
  `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()})`;

/**
 * Calque posé sur une capture : la capture arrive en caractères,
 * se résout en image quand elle entre à l'écran, et repasse en code au survol.
 */
export default function GlyphReveal({ src, hovered = false, fit = 'cover' }: GlyphRevealProps) {
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const renderRef = useRef<() => void>(() => {});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef(0);
  const progressRef = useRef(0);
  const animateRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = prefersReducedMotion();
    const img = new Image();
    let lum: number[] = [];
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let observer: IntersectionObserver | null = null;
    let revealTimer = 0;

    const prepare = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(rect.width / CELL_W);
      rows = Math.floor(rect.height / CELL_H);
      try {
        lum = sampleLuminance(img, cols, rows, undefined, fit);
        return true;
      } catch {
        // Image d'un autre domaine sans CORS : on affiche l'image directement.
        return false;
      }
    };

    const render = () => {
      const p = progressRef.current;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      if (p >= 1) return;
      ctx.globalAlpha = 1 - p;
      const light = themeRef.current === 'light';
      ctx.fillStyle = pageBackground();
      ctx.fillRect(0, 0, width, height);
      ctx.font = `600 10px ${GLYPH_FONT}`;
      ctx.textBaseline = 'top';
      const chars = RAMPS.density;
      const n = chars.length - 1;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Clair : la densité suit l'obscurité (encre sur papier).
          const raw = lum[y * cols + x];
          if (Number.isNaN(raw)) continue;
          const v = light ? 1 - raw : raw;
          const glyph = chars[Math.round(v * n)];
          if (glyph === ' ') continue;
          ctx.fillStyle = `rgba(${GLYPHS[light ? 'light' : 'dark']},${0.25 + v * 0.75})`;
          ctx.fillText(glyph, x * CELL_W, y * CELL_H);
        }
      }
      ctx.globalAlpha = 1;
    };

    renderRef.current = render;

    const step = () => {
      const target = targetRef.current;
      progressRef.current += (target - progressRef.current) * 0.12;
      if (Math.abs(target - progressRef.current) < 0.01) progressRef.current = target;
      render();
      if (progressRef.current !== target) raf = requestAnimationFrame(step);
    };

    animateRef.current = () => {
      cancelAnimationFrame(raf);
      if (reduce) {
        progressRef.current = targetRef.current;
        render();
      } else {
        raf = requestAnimationFrame(step);
      }
    };

    img.onload = () => {
      if (!prepare()) return;
      progressRef.current = 0;
      targetRef.current = 0;
      render();
      observer = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          revealTimer = window.setTimeout(() => {
            targetRef.current = 1;
            animateRef.current();
          }, 400);
          observer?.disconnect();
        }
      }, { threshold: 0.4 });
      observer.observe(canvas);
    };
    img.crossOrigin = 'anonymous';
    img.src = src;

    const onResize = () => { if (img.complete) { prepare(); render(); } };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(revealTimer);
      observer?.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [src, fit]);

  useEffect(() => {
    themeRef.current = theme;
    // Attendre que la classe .dark soit appliquée (effet du parent) avant de relire --paper.
    const id = requestAnimationFrame(() => renderRef.current());
    return () => cancelAnimationFrame(id);
  }, [theme]);

  useEffect(() => {
    // Le survol ne compte qu'une fois l'image révélée une première fois.
    if (progressRef.current === 0 && targetRef.current === 0) return;
    targetRef.current = hovered ? 0 : 1;
    animateRef.current();
  }, [hovered]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
