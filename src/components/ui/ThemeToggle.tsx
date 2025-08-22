import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    // Get stored theme or default to dark
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = storedTheme || 'dark';
    
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-light-bg-hover dark:bg-dark-bg-hover animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="
        relative w-10 h-10 rounded-lg
        bg-light-bg-hover dark:bg-dark-bg-hover
        border border-light-border-light dark:border-dark-border-light
        hover:bg-light-bg-card dark:hover:bg-dark-bg-card
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2
        focus:ring-offset-light-bg-primary dark:focus:ring-offset-dark-bg-primary
        group
      "
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon - visible in dark mode */}
      <svg
        className={`
          absolute inset-2 w-6 h-6 text-yellow-500
          transition-all duration-300 ease-out
          ${theme === 'dark' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 rotate-90 scale-75'
          }
        `}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon icon - visible in light mode */}
      <svg
        className={`
          absolute inset-2 w-6 h-6 text-slate-700 dark:text-slate-300
          transition-all duration-300 ease-out
          ${theme === 'light' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 -rotate-90 scale-75'
          }
        `}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>

      {/* Hover effect indicator */}
      <div className="absolute inset-0 rounded-lg bg-primary-blue opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
    </button>
  );
}