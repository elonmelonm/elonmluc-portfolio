import cvFallback from '../cv/cv_LUC_ELONM_AKAKPO.pdf';
import { useSetting } from './useSetting';
import type { Lang } from '../lib/lang';

// CV de la langue demandée, repli sur l'autre langue puis sur le fichier bundlé.
export function useCv(lang: Lang) {
  const { value: cvFr } = useSetting('cv_url_fr');
  const { value: cvEn } = useSetting('cv_url_en');

  const chosen = lang === 'fr' ? (cvFr ?? cvEn) : (cvEn ?? cvFr);
  const downloadName = `cv-elonm-luc-akakpo-${lang}.pdf`;
  const url = chosen
    ? `${chosen}${chosen.includes('?') ? '&' : '?'}download=${downloadName}`
    : cvFallback;

  return { url, downloadName };
}
