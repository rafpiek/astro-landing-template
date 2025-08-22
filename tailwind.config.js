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
          pink: '#EC4899',
          'pink-light': '#FCE7F3',
          teal: '#14B8A6',
          'teal-light': '#CCFBF1',
          indigo: '#6366F1',
          'indigo-light': '#E0E7FF',
        },
        // Extended color palette
        vibrant: {
          coral: '#FF6B6B',
          mint: '#4ECDC4', 
          sky: '#45B7D1',
          sage: '#96CEB4',
          cream: '#FFEAA7',
          lavender: '#DDA0DD',
          peach: '#FFAB91',
          ocean: '#006BA6',
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
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      
      fontSize: {
        // Display - Hero headings
        '8xl': ['6rem', { lineHeight: '1.1' }],     // 96px
        '7xl': ['4.5rem', { lineHeight: '1.1' }],   // 72px
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
        extrabold: 800,
        black: 900,
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
        'glass': '0 8px 32px rgba(79, 129, 244, 0.15)',
        'glow': '0 0 50px rgba(79, 129, 244, 0.25)',
        'glow-coral': '0 0 50px rgba(255, 107, 107, 0.25)',
        'glow-mint': '0 0 50px rgba(78, 205, 196, 0.25)',
        'glow-purple': '0 0 50px rgba(139, 92, 246, 0.25)',
        'glow-pink': '0 0 50px rgba(236, 72, 153, 0.25)',
        'xl-glass': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'inner-glass': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'rainbow': '0 0 60px rgba(255, 107, 107, 0.15), 0 0 60px rgba(78, 205, 196, 0.15), 0 0 60px rgba(69, 183, 209, 0.15)',
      },
      
      // Modern gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'gradient-hero': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-premium': 'linear-gradient(135deg, #4F81F4 0%, #8B5CF6 50%, #F59E0B 100%)',
        'gradient-vibrant': 'linear-gradient(45deg, #FF6B6B 0%, #4ECDC4 25%, #45B7D1 50%, #96CEB4 75%, #FFEAA7 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 25%, #FECFEF 50%, #B7F8DB 75%, #50E3C2 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        'gradient-cosmic': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 25%, #EF4444 50%, #F59E0B 75%, #10B981 100%)',
        'mesh-pattern': 'radial-gradient(circle at 25% 25%, #4F81F4 0%, transparent 50%), radial-gradient(circle at 75% 75%, #8B5CF6 0%, transparent 50%)',
        'mesh-colorful': 'radial-gradient(circle at 20% 20%, #FF6B6B 0%, transparent 40%), radial-gradient(circle at 80% 80%, #4ECDC4 0%, transparent 40%), radial-gradient(circle at 40% 60%, #45B7D1 0%, transparent 40%)',
      },
      
      // Backdrop blur
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '40px',
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