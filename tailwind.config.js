/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Color system from style guide
      colors: {
        primary: {
          blue: '#4F81F4',
          'blue-hover': '#3B6FE8',
          'blue-light': '#E3EBFE',
        },
        success: {
          green: '#10B981',
          'green-light': '#D1FAE5',
        },
        achievement: {
          orange: '#F59E0B',
          'orange-light': '#FEF3C7',
        },
        accent: {
          purple: '#8B5CF6',
          'purple-light': '#EDE9FE',
        },
        // Light mode colors
        light: {
          'bg-primary': '#FFFFFF',
          'bg-secondary': '#F9FAFB',
          'bg-card': '#FFFFFF',
          'bg-hover': '#F3F4F6',
          'text-primary': '#111827',
          'text-secondary': '#6B7280',
          'text-muted': '#9CA3AF',
          'border-light': '#E5E7EB',
          'border-medium': '#D1D5DB',
        },
        // Dark mode colors
        dark: {
          'bg-primary': '#0A0A0A',
          'bg-secondary': '#1A1A1A',
          'bg-card': '#161616',
          'bg-hover': '#262626',
          'text-primary': '#FFFFFF',
          'text-secondary': '#A3A3A3',
          'text-muted': '#737373',
          'border-light': '#262626',
          'border-medium': '#404040',
        },
      },
      
      // Typography from style guide
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      
      fontSize: {
        // Display - Hero headings
        '6xl': ['3.75rem', { lineHeight: '1.25' }], // 60px
        '5xl': ['3rem', { lineHeight: '1.25' }],    // 48px
        // Headings
        '4xl': ['2.25rem', { lineHeight: '1.25' }], // 36px
        '3xl': ['1.875rem', { lineHeight: '1.25' }], // 30px
        '2xl': ['1.5rem', { lineHeight: '1.5' }],   // 24px
        'xl': ['1.25rem', { lineHeight: '1.5' }],   // 20px
        'lg': ['1.125rem', { lineHeight: '1.5' }],  // 18px
        // Body
        'base': ['1rem', { lineHeight: '1.5' }],    // 16px
        'sm': ['0.875rem', { lineHeight: '1.5' }],  // 14px
        'xs': ['0.75rem', { lineHeight: '1.5' }],   // 12px
      },
      
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      
      // Spacing scale from style guide
      spacing: {
        '1': '0.25rem',   // 4px
        '2': '0.5rem',    // 8px
        '3': '0.75rem',   // 12px
        '4': '1rem',      // 16px
        '6': '1.5rem',    // 24px
        '8': '2rem',      // 32px
        '12': '3rem',     // 48px
        '16': '4rem',     // 64px
        '20': '5rem',     // 80px
        '24': '6rem',     // 96px
        '32': '8rem',     // 128px
      },
      
      // Container sizes
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1280px',
        'container-2xl': '1536px',
      },
      
      // Border radius
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
      },
      
      // Box shadows
      boxShadow: {
        'light': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'dark': '0 1px 3px rgba(0, 0, 0, 0.3)',
        'screenshot': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
      
      // Animations optimized for performance
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      
      transitionTimingFunction: {
        'out': 'ease-out',
        'in-out': 'ease-in-out',
      },
      
      // Transform for hover effects
      scale: {
        '102': '1.02',
      },
      
      // For screenshot aspect ratios
      aspectRatio: {
        'screenshot': '16 / 10',
      },
    },
  },
  
  plugins: [
    // Plugin for reduced motion support
    function({ addUtilities }) {
      const newUtilities = {
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            'animation-duration': '0.01ms !important',
            'animation-iteration-count': '1 !important',
            'transition-duration': '0.01ms !important',
            'scroll-behavior': 'auto !important'
          }
        }
      }
      addUtilities(newUtilities)
    }
  ],
}