import { GLYPH_FONT, prefersReducedMotion } from './glyphs';

const CHARS = '.:-=+*#%@{}[]<>/';
const DECODE_POOL = '{}[]<>/=+*#%$;:';
const CELL_W = 14;
const CELL_H = 18;
// Durées (ms) : couverture, écran plein, découverte.
const IN = 260;
const HOLD = 60;
const OUT = 300;

const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/**
 * Dissolution en caractères : les cases couvrent l'écran dans le désordre,
 * `onCovered` change la page sous le calque, puis les cases se retirent.
 */
export function dissolve(canvas: HTMLCanvasElement, onCovered: () => void): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx || prefersReducedMotion()) {
    onCovered();
    return Promise.resolve();
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const cols = Math.ceil(w / CELL_W);
  const rows = Math.ceil(h / CELL_H);
  const delays = Array.from({ length: cols * rows }, () => Math.random() * 0.75);

  const bg = `rgb(${cssVar('--paper')})`;
  const glyph = cssVar('--ink');
  const accent = cssVar('--indigo');
  ctx.font = `600 13px ${GLYPH_FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  return new Promise((resolve) => {
    const start = performance.now();
    let swapped = false;

    const frame = (now: number) => {
      const t = now - start;
      const phase = t < IN ? 'in' : t < IN + HOLD ? 'hold' : 'out';
      const k = phase === 'in' ? t / IN : phase === 'hold' ? 1 : Math.min(1, (t - IN - HOLD) / OUT);
      if (phase !== 'in' && !swapped) {
        swapped = true;
        onCovered();
      }

      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < delays.length; i++) {
        const d = delays[i];
        // Couverture de la case : 0 → 1 à l'entrée, 1 → 0 à la sortie, dans le même ordre aléatoire.
        const local = Math.min(1, Math.max(0, (k - d) / 0.25));
        const cover = phase === 'in' ? local : phase === 'hold' ? 1 : 1 - local;
        if (cover <= 0) continue;

        const x = (i % cols) * CELL_W;
        const y = Math.floor(i / cols) * CELL_H;
        ctx.globalAlpha = cover >= 0.98 ? 1 : cover * 0.9;
        ctx.fillStyle = bg;
        ctx.fillRect(x, y, CELL_W, CELL_H);

        // Caractères sur les cases en mouvement (et quelques étincelles sur l'écran plein).
        if (cover < 0.98 || Math.random() < 0.04) {
          ctx.globalAlpha = Math.random() < 0.25 ? 1 : 0.4 + cover * 0.5;
          ctx.fillStyle = Math.random() < 0.25 ? `rgb(${accent})` : `rgb(${glyph})`;
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x + CELL_W / 2, y + CELL_H / 2);
        }
      }
      ctx.globalAlpha = 1;

      if (t < IN + HOLD + OUT) {
        requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, w, h);
        resolve();
      }
    };
    requestAnimationFrame(frame);
  });
}

/**
 * Le titre « se décode » : ses lettres défilent en caractères puis se fixent de gauche à droite.
 * Ne touche qu'aux nœuds texte et les restaure exactement à la fin.
 */
export function decodeHeading(el: HTMLElement | null, duration = 520) {
  if (!el || prefersReducedMotion()) return;

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: { node: Text; text: string }[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (node.nodeValue?.trim()) nodes.push({ node, text: node.nodeValue });
  }
  const total = nodes.reduce((n, { text }) => n + text.length, 0);
  if (!total) return;

  const start = performance.now();
  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    let k = 0;
    for (const { node, text } of nodes) {
      // Le nœud a pu être remplacé par React entre-temps : on s'arrête.
      if (!node.isConnected) return;
      node.nodeValue = [...text]
        .map((ch) => {
          const fixed = k++ / total < t * 1.15 - 0.1;
          return ch === ' ' || fixed ? ch : DECODE_POOL[Math.floor(Math.random() * DECODE_POOL.length)];
        })
        .join('');
    }
    if (t < 1) requestAnimationFrame(frame);
    else nodes.forEach(({ node, text }) => { node.nodeValue = text; });
  };
  requestAnimationFrame(frame);
}
