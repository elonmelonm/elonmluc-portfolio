import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCarousel } from './ProjectCarousel';
import GlyphReveal from './GlyphReveal';

interface ProjectFeatureProps {
  images: string[];
  title: string;
  desc: string;
  kind?: string;
  tags: string[];
  index: number;
  action: React.ReactNode;
}

// Projet en grand format : capture et texte alternés gauche/droite.
export default function ProjectFeature({ images, title, desc, kind, tags, index, action }: ProjectFeatureProps) {
  const flipped = index % 2 === 1;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      className="group grid items-center gap-[clamp(20px,4vw,56px)] md:grid-cols-[7fr_5fr]"
    >
      <div
        className={`relative overflow-hidden rounded border border-rule bg-surface ${flipped ? 'md:order-2' : ''}`}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <ProjectCarousel images={images} title={title} height="aspect-[16/10]" />
        {images[0] && <GlyphReveal src={images[0]} hovered={images.length === 1 && hovered} />}
      </div>
      <div className="min-w-0">
        {kind && <span className="label">{kind}</span>}
        <h3 className="mb-3 mt-2 font-display text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">{title}</h3>
        <p className="mb-[18px] max-w-[52ch] text-muted whitespace-pre-line">{desc}</p>
        {tags.length > 0 && (
          <div className="mb-[18px] flex flex-wrap gap-2">
            {tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
          </div>
        )}
        {action}
      </div>
    </motion.article>
  );
}
