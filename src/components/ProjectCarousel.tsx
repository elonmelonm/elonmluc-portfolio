import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProjectCarousel: React.FC<{ images: string[]; title: string; height?: string }> = ({
  images,
  title,
  height = "h-48"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!isHovered || images.length <= 1) return;
    const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % images.length), 2500);
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  if (images.length <= 1) {
    return (
      <div className={`relative overflow-hidden ${height}`}>
        <img
          src={images[0]}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  const controlClass = "grid size-8 place-items-center rounded-full bg-ink/60 text-paper hover:bg-indigo transition-colors focus-ring";

  return (
    <div
      className={`group/carousel relative overflow-hidden ${height}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - image ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full object-cover object-top"
        />
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 transition-opacity duration-300 group-hover/carousel:opacity-100 focus-within:opacity-100">
        <button type="button" onClick={prevSlide} aria-label="Image précédente" className={controlClass}>
          <ChevronLeft size={18} />
        </button>
        <button type="button" onClick={nextSlide} aria-label="Image suivante" className={controlClass}>
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center gap-1.5">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-4 bg-indigo' : 'w-1.5 bg-paper/70'}`}
          />
        ))}
      </div>
    </div>
  );
};
