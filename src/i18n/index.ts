import { dictionary as ptBR } from './dictionaries/pt-BR';
import { dictionary as en } from './dictionaries/en';

export type Locale = 'pt-BR' | 'en';
export type Dictionary = typeof ptBR;

const dictionaries: Record<Locale, Dictionary> = {
  'pt-BR': ptBR,
  'en': en,
};

export const locales: Locale[] = ['pt-BR', 'en'];
export const defaultLocale: Locale = 'pt-BR';

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
