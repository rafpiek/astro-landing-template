import type { Locale } from './types';

export const DEFAULT_LOCALE: Locale = 'en';
export const SUPPORTED_LOCALES: Locale[] = ['en', 'pl'];

// Storage keys for persistence
const LOCALE_STORAGE_KEY = 'astro-landing-locale';
const LOCALE_COOKIE_NAME = 'astro-landing-locale';

/**
 * Validates if a locale string is supported
 * @param locale - Locale string to validate
 * @returns boolean indicating if the locale is supported
 */
export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

/**
 * Gets the current locale from various sources (priority order):
 * 1. URL pathname
 * 2. localStorage (if available)
 * 3. Cookie
 * 4. Browser language
 * 5. Default locale
 */
export function getCurrentLocale(): Locale {
  // 1. Check URL pathname first (for SSR compatibility)
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    const localeFromPath = getLocaleFromPathname(pathname);
    if (localeFromPath) {
      return localeFromPath;
    }
  }
  
  // 2. Check localStorage (client-side only)
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored && isValidLocale(stored)) {
        return stored;
      }
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
    }
  }
  
  // 3. Check cookie (works both server and client side)
  const cookieLocale = getLocaleFromCookie();
  if (cookieLocale) {
    return cookieLocale;
  }
  
  // 4. Check browser language (client-side only)
  if (typeof window !== 'undefined' && window.navigator) {
    const browserLocale = getBrowserLocale();
    if (browserLocale) {
      return browserLocale;
    }
  }
  
  // 5. Fall back to default
  return DEFAULT_LOCALE;
}

/**
 * Extracts locale from URL pathname
 * @param pathname - URL pathname
 * @returns Locale if found, null otherwise
 */
export function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment;
  }
  
  return null;
}

/**
 * Gets locale from cookie
 * @returns Locale if found, null otherwise
 */
export function getLocaleFromCookie(): Locale | null {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === LOCALE_COOKIE_NAME && value && isValidLocale(value)) {
        return value;
      }
    }
  }
  return null;
}

/**
 * Gets best matching locale from browser language preferences
 * @returns Locale if match found, null otherwise
 */
export function getBrowserLocale(): Locale | null {
  if (typeof window === 'undefined' || !window.navigator) {
    return null;
  }
  
  const browserLanguages = navigator.languages || [navigator.language];
  
  for (const lang of browserLanguages) {
    // Extract language code (e.g., 'en' from 'en-US')
    const langCode = lang.split('-')[0].toLowerCase();
    
    if (isValidLocale(langCode)) {
      return langCode;
    }
  }
  
  return null;
}

/**
 * Persists locale preference to localStorage and cookie
 * @param locale - Locale to persist
 */
export function persistLocale(locale: Locale): void {
  // Save to localStorage (client-side only)
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }
  
  // Save to cookie (works both server and client side)
  if (typeof document !== 'undefined') {
    // Set cookie with 1 year expiry
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    
    document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  }
}

/**
 * Clears persisted locale preferences
 */
export function clearPersistedLocale(): void {
  // Clear localStorage
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.removeItem(LOCALE_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }
  
  // Clear cookie
  if (typeof document !== 'undefined') {
    document.cookie = `${LOCALE_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

/**
 * Generates URL for a given locale and path
 * @param locale - Target locale
 * @param path - Path without locale prefix
 * @returns Complete URL with locale prefix (if needed)
 */
export function getLocalizedPath(locale: Locale, path: string = '/'): string {
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // For default locale (English), don't add prefix
  if (locale === DEFAULT_LOCALE) {
    return cleanPath;
  }
  
  // For other locales, add prefix
  return `/${locale}${cleanPath}`;
}

/**
 * Removes locale prefix from path
 * @param pathname - Full pathname with potential locale prefix
 * @returns Path without locale prefix
 */
export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length > 0 && isValidLocale(segments[0])) {
    return '/' + segments.slice(1).join('/');
  }
  
  return pathname;
}

/**
 * Switches to a new locale by redirecting to the localized URL
 * @param newLocale - Target locale
 * @param currentPath - Current path (optional, defaults to current location)
 */
export function switchLocale(newLocale: Locale, currentPath?: string): void {
  if (!isValidLocale(newLocale)) {
    console.warn(`Invalid locale: ${newLocale}`);
    return;
  }
  
  // Get current path without locale
  const path = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const cleanPath = removeLocaleFromPath(path);
  
  // Generate new URL
  const newUrl = getLocalizedPath(newLocale, cleanPath);
  
  // Persist the locale preference
  persistLocale(newLocale);
  
  // Navigate to new URL
  if (typeof window !== 'undefined') {
    window.location.href = newUrl;
  }
}

/**
 * Gets locale display name for UI
 * @param locale - Target locale  
 * @param displayLocale - Locale to display name in (defaults to target locale)
 * @returns Display name for the locale
 */
export function getLocaleDisplayName(locale: Locale, displayLocale?: Locale): string {
  const names: Record<Locale, Record<Locale, string>> = {
    en: {
      en: 'English',
      pl: 'Polish'
    },
    pl: {
      en: 'Angielski', 
      pl: 'Polski'
    }
  };
  
  const targetDisplayLocale = displayLocale || locale;
  return names[targetDisplayLocale]?.[locale] || locale;
}

/**
 * Preloads a route for faster navigation (Astro-specific optimization)
 * @param locale - Target locale
 * @param path - Path to preload
 */
export function preloadRoute(locale: Locale, path: string): void {
  if (typeof window === 'undefined') return;
  
  const url = getLocalizedPath(locale, path);
  
  // Create a link element for preloading
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  
  document.head.appendChild(link);
  
  // Remove after a short delay to clean up
  setTimeout(() => {
    document.head.removeChild(link);
  }, 1000);
}

/**
 * Gets the opposite locale (for simple toggle)
 * Only works with two locales - for more complex scenarios use switchLocale directly
 * @param currentLocale - Current locale
 * @returns The other supported locale
 */
export function getAlternativeLocale(currentLocale: Locale): Locale {
  return currentLocale === 'en' ? 'pl' : 'en';
}

/**
 * Initialization function to be called on page load
 * Sets up locale persistence and any necessary browser-side logic
 */
export function initializeI18n(): Locale {
  const currentLocale = getCurrentLocale();
  
  // Ensure persistence is set up
  persistLocale(currentLocale);
  
  return currentLocale;
}