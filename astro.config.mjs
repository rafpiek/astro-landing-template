// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://zeyn.app', // Required for proper URL generation
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // We'll handle base styles manually for performance
    }),
  ],
  
  // Internationalization configuration
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pl'],
    routing: {
      prefixDefaultLocale: false // Clean URLs for English (default)
    }
  },
  
  // Performance optimizations
  build: {
    inlineStylesheets: 'auto', // Inline critical CSS
  },
  
  // Prefetch configuration for better navigation
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  
  // Image optimization
  image: {
    domains: [],
    remotePatterns: [],
  },
  
  // No experimental features needed for this project
  
  // Output settings for SSR
  output: 'static', // Generate static files for maximum performance
  
  // Compressor for optimal build size
  compressHTML: true,
});