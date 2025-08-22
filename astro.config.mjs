// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // We'll handle base styles manually for performance
    }),
  ],
  
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
  
  // Experimental features for performance
  experimental: {
    contentCollectionCache: true,
  },
  
  // Output settings for SSR
  output: 'static', // Generate static files for maximum performance
  
  // Compressor for optimal build size
  compressHTML: true,
});