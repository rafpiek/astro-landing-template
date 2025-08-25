import { useState, useEffect, useRef } from 'react';
import { LANGUAGES, type Locale } from '../../i18n/types';
import { 
  switchLocale, 
  getAlternativeLocale,
  initializeI18n 
} from '../../i18n/utils';

interface LanguageSwitcherProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dropdown' | 'toggle';
}

export default function LanguageSwitcher({ 
  className = '', 
  size = 'md',
  variant = 'dropdown'
}: LanguageSwitcherProps) {
  const [currentLocale, setCurrentLocale] = useState<Locale>('en');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize locale on mount
  useEffect(() => {
    const locale = initializeI18n();
    setCurrentLocale(locale);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSwitch = (locale: Locale) => {
    if (locale === currentLocale) return;
    
    setIsOpen(false);
    switchLocale(locale);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          button: 'px-2 py-1 text-xs',
          flag: 'text-sm',
          text: 'text-xs',
          dropdown: 'min-w-32'
        };
      case 'lg':
        return {
          button: 'px-4 py-3 text-base',
          flag: 'text-lg',
          text: 'text-base',
          dropdown: 'min-w-40'
        };
      default: // md
        return {
          button: 'px-3 py-2 text-sm',
          flag: 'text-base',
          text: 'text-sm',
          dropdown: 'min-w-36'
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const currentLanguage = LANGUAGES[currentLocale];

  // Toggle variant - simple button that switches between two languages
  if (variant === 'toggle') {
    const alternativeLocale = getAlternativeLocale(currentLocale);
    const alternativeLanguage = LANGUAGES[alternativeLocale];
    
    return (
      <button
        onClick={() => handleLanguageSwitch(alternativeLocale)}
        className={`
          inline-flex items-center justify-center
          ${sizeClasses.button}
          bg-gray-900/80 hover:bg-gray-800/90
          border border-gray-800/50 hover:border-gray-700/80
          rounded-lg
          text-gray-400 hover:text-gray-200
          transition-all duration-200 ease-out
          font-mono text-xs font-medium
          min-w-[44px]
          ${className}
        `}
        title={`Switch to ${alternativeLanguage.name}`}
      >
        {currentLanguage.code.toUpperCase()}
      </button>
    );
  }

  // Dropdown variant - shows all available languages
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          inline-flex items-center justify-center gap-1
          ${sizeClasses.button}
          bg-gray-900/80 hover:bg-gray-800/90
          border border-gray-800/50 hover:border-gray-700/80
          rounded-lg
          text-gray-400 hover:text-gray-200
          transition-all duration-200 ease-out
          font-mono text-xs font-medium
          min-w-[52px]
        `}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {currentLanguage.code.toUpperCase()}
        <svg 
          className={`w-3 h-3 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`
          absolute top-full right-0 mt-2 
          ${sizeClasses.dropdown}
          bg-gray-900/95 backdrop-blur-lg
          border border-gray-700/50
          rounded-lg shadow-xl
          py-1
          z-50
          animate-in fade-in slide-in-from-top-2 duration-200
        `}>
          {Object.values(LANGUAGES).map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSwitch(language.code)}
              className={`
                w-full flex items-center justify-between px-3 py-2
                text-left ${sizeClasses.text}
                transition-colors duration-150
                ${currentLocale === language.code 
                  ? 'bg-gray-800/50 text-white' 
                  : 'text-gray-300 hover:bg-gray-800/30 hover:text-white'
                }
              `}
            >
              <div className="flex flex-col">
                <span className="font-medium font-mono">{language.code.toUpperCase()}</span>
                <span className="text-xs text-gray-500">{language.nativeName}</span>
              </div>
              {currentLocale === language.code && (
                <svg 
                  className="w-4 h-4 text-green-400 ml-auto" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}