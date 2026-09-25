// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import ciscoIos from './src/plugins/cisco-ios.tmLanguage.mjs';

/**
 * Déploiement GitHub Pages sur le dépôt « timothy-valentin.github.io » :
 * le site est servi à la racine (https://timothy-valentin.github.io/).
 * En CI, `actions/configure-pages` fournit l'URL réelle (SITE_URL / BASE_PATH) ;
 * le site fonctionne donc aussi depuis un dépôt nommé autrement (…/nom-du-depot/).
 */
const site = process.env.SITE_URL || 'https://timothy-valentin.github.io';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      defaultColor: false,
      // @ts-ignore — grammaire TextMate locale (Cisco IOS), absente de Shiki
      langs: [ciscoIos],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
