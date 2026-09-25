// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';
import mermaid from './src/plugins/mermaid.mjs';
import ciscoIos from './src/plugins/cisco-ios.tmLanguage.mjs';

/**
 * Déploiement GitHub Pages.
 * En CI, `actions/configure-pages` fournit l'origine et le chemin de base réels
 * (SITE_URL / BASE_PATH) : le site fonctionne donc aussi bien sur un dépôt
 * « projet » (https://<user>.github.io/<repo>/) que sur un dépôt « utilisateur »
 * (https://<user>.github.io/) ou un domaine personnalisé.
 * Les valeurs par défaut ci-dessous servent aux builds locaux.
 */
const site = process.env.SITE_URL || 'https://valentin-timothy.github.io';
// BASE_PATH vide (dépôt <user>.github.io ou domaine personnalisé) → racine « / ».
const base = process.env.BASE_PATH === undefined ? '/portfolio' : process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  markdown: {
    // Sätteri : processeur Markdown natif d'Astro 7 (Rust), étendu par un plugin HAST Mermaid.
    processor: satteri({ hastPlugins: [mermaid] }),
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      defaultColor: false,
      wrap: false,
      // @ts-ignore — grammaire TextMate locale (Cisco IOS), absente de Shiki
      langs: [ciscoIos],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    // Mermaid (~600 ko) n'est chargé que par import dynamique sur les pages à diagramme.
    build: { chunkSizeWarningLimit: 1500 },
  },
});
