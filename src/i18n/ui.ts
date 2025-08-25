import type { Locale, TranslationData } from './types';

// Import translation data
const translations: Record<Locale, TranslationData> = {
  en: {} as TranslationData,
  pl: {} as TranslationData
};

// Function to lazy load translation files
let translationsLoaded = false;

async function loadTranslations() {
  if (translationsLoaded) return;
  
  try {
    const [enTranslations, plTranslations] = await Promise.all([
      import('./translations/en.json'),
      import('./translations/pl.json')
    ]);
    
    translations.en = enTranslations.default;
    translations.pl = plTranslations.default;
    translationsLoaded = true;
  } catch (error) {
    console.error('Failed to load translations:', error);
  }
}

/**
 * Gets a nested value from an object using a dot notation key
 * Example: getNestedValue(obj, 'nav.features') returns obj.nav.features
 */
function getNestedValue(obj: any, key: string): any {
  return key.split('.').reduce((current, keyPart) => {
    return current?.[keyPart];
  }, obj);
}

/**
 * Main translation function - gets translation by key
 * @param locale - The target locale (en, pl)
 * @param key - Dot notation key path (e.g., 'nav.features', 'hero.cta_button')
 * @param fallback - Optional fallback text if translation is not found
 * @returns The translated text
 */
export async function t(
  locale: Locale, 
  key: string, 
  fallback?: string
): Promise<string> {
  await loadTranslations();
  
  const translation = getNestedValue(translations[locale], key);
  
  if (translation !== undefined) {
    return String(translation);
  }
  
  // Fallback to English if translation not found in target locale
  if (locale !== 'en') {
    const englishTranslation = getNestedValue(translations.en, key);
    if (englishTranslation !== undefined) {
      return String(englishTranslation);
    }
  }
  
  // Use provided fallback or return the key itself
  return fallback || key;
}

/**
 * Synchronous version of translation function for contexts where we know translations are loaded
 * Should only be used after calling loadTranslations() or t() at least once
 */
export function tSync(locale: Locale, key: string, fallback?: string): string {
  if (!translationsLoaded) {
    console.warn('Translations not loaded yet, using fallback');
    return fallback || key;
  }
  
  const translation = getNestedValue(translations[locale], key);
  
  if (translation !== undefined) {
    return String(translation);
  }
  
  // Fallback to English if translation not found in target locale
  if (locale !== 'en') {
    const englishTranslation = getNestedValue(translations.en, key);
    if (englishTranslation !== undefined) {
      return String(englishTranslation);
    }
  }
  
  return fallback || key;
}

/**
 * Gets an array translation (useful for typewriter text, feature lists, etc.)
 * @param locale - The target locale
 * @param key - Dot notation key path
 * @returns Array of translated strings
 */
export async function tArray(
  locale: Locale, 
  key: string
): Promise<string[]> {
  await loadTranslations();
  
  const translation = getNestedValue(translations[locale], key);
  
  if (Array.isArray(translation)) {
    return translation;
  }
  
  // Fallback to English
  if (locale !== 'en') {
    const englishTranslation = getNestedValue(translations.en, key);
    if (Array.isArray(englishTranslation)) {
      return englishTranslation;
    }
  }
  
  return [];
}

/**
 * Gets an object translation (useful for complex nested data)
 * @param locale - The target locale
 * @param key - Dot notation key path  
 * @returns Object with translated content
 */
export async function tObject<T = any>(
  locale: Locale, 
  key: string
): Promise<T | null> {
  await loadTranslations();
  
  const translation = getNestedValue(translations[locale], key);
  
  if (translation && typeof translation === 'object') {
    return translation as T;
  }
  
  // Fallback to English
  if (locale !== 'en') {
    const englishTranslation = getNestedValue(translations.en, key);
    if (englishTranslation && typeof englishTranslation === 'object') {
      return englishTranslation as T;
    }
  }
  
  return null;
}

/**
 * Pre-loads all translations for a given locale
 * Useful for ensuring translations are available in client-side components
 */
export async function preloadTranslations(_locale?: Locale) {
  await loadTranslations();
}

/**
 * Checks if a translation key exists
 * @param locale - The target locale
 * @param key - Dot notation key path
 * @returns boolean indicating if the key exists
 */
export function hasTranslation(locale: Locale, key: string): boolean {
  if (!translationsLoaded) return false;
  
  const translation = getNestedValue(translations[locale], key);
  return translation !== undefined;
}

/**
 * Gets all translations for a given locale
 * @param locale - The target locale
 * @returns Complete translation object for the locale
 */
export async function getAllTranslations(locale: Locale): Promise<TranslationData> {
  await loadTranslations();
  return translations[locale];
}

export { loadTranslations };