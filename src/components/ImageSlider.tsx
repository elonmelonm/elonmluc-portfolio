import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import GlyphReveal from './GlyphReveal';

interface ImageSliderProps {
  images: string[];
  title: string;
  className?: string;
}

/**
 * Carrousel d'images en scroll-snap : glissement natif au doigt, flèches, points et clavier.
 * Chaque image arrive en caractères puis se résout (GlyphReveal).
 */
export default function ImageSlider({ images, title, className = '' }: ImageSliderProps) {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const count = images.length;

  // Diapositive courante, déduite de la position de défilement.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => setIndex(Math.round(track.scrollLeft / (track.clientWidth || 1)));
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = (i + count) % count;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: target * track.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
  };

  if (!count) return null;

  const arrowClass =
    'grid size-10 place-items-center rounded-full border border-rule bg-paper/80 text-ink backdrop-blur transition-colors hover:border-indigo hover:text-indigo focus-ring disabled:opacity-0';

  return (
    <section
      className={`group/slider relative ${className}`}
      aria-roledescription="carousel"
      aria-label={title}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <div
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-md border border-rule focus-ring"
      >
        {images.map((src, i) => (
          <div
            key={src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${count}`}
            className="relative aspect-[16/9] w-full flex-none snap-center"
          >
            <img
              src={src}
              alt={`${title} — ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              className="absolute inset-0 h-full w-full object-contain"
            />
            <GlyphReveal src={src} fit="contain" hovered={hovered && i === index} />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between opacity-100 transition-opacity md:opacity-0 md:group-hover/slider:opacity-100 md:group-focus-within/slider:opacity-100">
            <button type="button" onClick={() => goTo(index - 1)} aria-label={t('case.prev_image')} className={`pointer-events-auto ${arrowClass}`}>
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={() => goTo(index + 1)} aria-label={t('case.next_image')} className={`pointer-events-auto ${arrowClass}`}>
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`${t('case.image')} ${i + 1}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-300 focus-ring ${i === index ? 'w-8 bg-indigo' : 'w-3 bg-rule hover:bg-muted'}`}
                />
              ))}
            </div>
            <span className="label">{String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
          </div>
        </>
      )}
    </section>
  );
}
