// Normalise i18n.language ('fr-FR', 'en-US', ...) vers 'fr' | 'en'.
export type Lang = 'fr' | 'en';

export function getLang(language?: string): Lang {
  return language?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}
