import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

/**
 * GitHub Pages has no rewrite rules, so a deep link like /writing/two-walls
 * would 404 on refresh. Pages serves 404.html for unknown paths, so shipping a
 * copy of index.html under that name lets the client router resolve the route.
 */
function spaFallback() {
  return {
    name: 'spa-404-fallback',
    closeBundle() {
      const dist = resolve(__dirname, 'dist');
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'));
    },
  };
}

export default defineConfig({
  plugins: [spaFallback()],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
