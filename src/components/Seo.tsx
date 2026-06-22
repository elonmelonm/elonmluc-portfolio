import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLang } from '../lib/lang';
import { ROUTE_META, SITE_URL, OG_IMAGE } from '../lib/seo';

// Met à jour dynamiquement le <head> selon la route et la langue.
export default function Seo() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const lang = getLang(i18n.language);

  const meta = ROUTE_META[pathname] ?? ROUTE_META['/'];
  const title = lang === 'fr' ? meta.titleFr : meta.titleEn;
  const description = lang === 'fr' ? meta.descFr : meta.descEn;
  const canonical = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:locale" content={lang === 'fr' ? 'fr_FR' : 'en_US'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
}
