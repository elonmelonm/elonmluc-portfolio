// URL canonique du site. ⚠️ À mettre à jour ici ET dans index.html / robots.txt /
// sitemap.xml le jour où tu passes sur un domaine perso.
export const SITE_URL = 'https://lucakakpo.com';

export const OG_IMAGE = `${SITE_URL}/elonm-luc-akakpo.jpg`;

interface RouteMeta {
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
}

// Meta par route (le titre contient le nom là où c'est pertinent pour le SEO).
export const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    titleFr: 'Elonm Luc Akakpo — Développeur Full Stack Web & Mobile',
    titleEn: 'Elonm Luc Akakpo — Full Stack Web & Mobile Developer',
    descFr: "Portfolio d'Elonm Luc Akakpo, développeur Full Stack (React, Next.js, React Native, Node.js) basé à Cotonou, Bénin. Applications web et mobiles performantes.",
    descEn: 'Portfolio of Elonm Luc Akakpo, Full Stack developer (React, Next.js, React Native, Node.js) based in Cotonou, Benin. High-performance web & mobile apps.',
  },
  '/about': {
    titleFr: 'À propos — Elonm Luc Akakpo',
    titleEn: 'About — Elonm Luc Akakpo',
    descFr: "Découvrez le parcours et l'expertise d'Elonm Luc Akakpo, développeur Full Stack avec plus de 3 ans d'expérience.",
    descEn: 'Learn about Elonm Luc Akakpo, a Full Stack developer with 3+ years of experience.',
  },
  '/projects': {
    titleFr: 'Projets — Elonm Luc Akakpo',
    titleEn: 'Projects — Elonm Luc Akakpo',
    descFr: "Sélection de projets web et mobiles réalisés par Elonm Luc Akakpo : React, Next.js, React Native et plus.",
    descEn: 'A selection of web and mobile projects by Elonm Luc Akakpo: React, Next.js, React Native and more.',
  },
  '/skills': {
    titleFr: 'Compétences — Elonm Luc Akakpo',
    titleEn: 'Skills — Elonm Luc Akakpo',
    descFr: "Compétences techniques d'Elonm Luc Akakpo : frontend, backend et outils de développement.",
    descEn: 'Technical skills of Elonm Luc Akakpo: frontend, backend and development tools.',
  },
  '/journey': {
    titleFr: 'Parcours — Elonm Luc Akakpo',
    titleEn: 'Journey — Elonm Luc Akakpo',
    descFr: "Expériences professionnelles, formation et certifications d'Elonm Luc Akakpo.",
    descEn: 'Professional experience, education and certifications of Elonm Luc Akakpo.',
  },
  '/contact': {
    titleFr: 'Contact — Elonm Luc Akakpo',
    titleEn: 'Contact — Elonm Luc Akakpo',
    descFr: "Contactez Elonm Luc Akakpo pour vos projets web et mobiles.",
    descEn: 'Get in touch with Elonm Luc Akakpo for your web and mobile projects.',
  },
};
