# Portfolio technique — Timothy Valentin

Portfolio BTS SIO option **SISR** (épreuves E4 / E5) et candidatures en alternance
cybersécurité : réalisations professionnelles, homelab, write-ups Root-Me et veille
technologique sur l'architecture Zero Trust.

## Stack

| Élément | Choix |
| --- | --- |
| Framework | [Astro 7](https://astro.build) (site 100 % statique), Markdown via Sätteri + MDX |
| Styles | Tailwind CSS 4 + `@tailwindcss/typography`, thème sombre par défaut |
| Recherche | [Pagefind](https://pagefind.app), index généré au build, exécuté côté client |
| Diagrammes | Mermaid.js (chargé uniquement sur les pages qui en contiennent) |
| Icônes | `@lucide/astro` (SVG inline) |
| Code | Shiki bi-thème + grammaire Cisco IOS maison (`src/plugins/cisco-ios.tmLanguage.mjs`) |
| Déploiement | GitHub Actions → GitHub Pages |

## Commandes

```bash
npm ci            # installation reproductible
npm run dev       # serveur de développement (la recherche n'y est pas disponible)
npm run build     # astro check + build + index Pagefind
npm run preview   # prévisualisation du build de production
```

## Arborescence

```text
src/
├── config/site.ts        # identité, liens, empreinte PGP (source unique)
├── content.config.ts     # schémas Zod des collections
├── content/
│   ├── projets/          # fiches E4/E5
│   ├── homelab/          # infrastructure personnelle
│   ├── writeups/         # entraînement Root-Me
│   └── veille/           # veille Zero Trust / NIS 2
├── layouts/  components/  pages/  plugins/  scripts/  styles/
public/
├── .well-known/security.txt   # RFC 9116
├── pgp/timothy-valentin.asc   # clé publique OpenPGP
└── robots.txt
```

## Ajouter une fiche

Créer un fichier `.md` ou `.mdx` dans la collection voulue ; le frontmatter est validé au
build (voir `src/content.config.ts`). Les diagrammes s'écrivent dans un bloc de code
`mermaid`, les configurations Cisco dans un bloc `cisco`.

## Déploiement

1. Dépôt GitHub → **Settings › Pages › Source : GitHub Actions**.
2. Pousser sur `main` : le workflow `.github/workflows/deploy.yml` construit et publie le site.

L'URL et le chemin de base sont fournis automatiquement par `actions/configure-pages`
(variables `SITE_URL` / `BASE_PATH`) ; les valeurs par défaut de `astro.config.mjs`
ne servent qu'aux builds locaux. `public/robots.txt` et `public/.well-known/security.txt`
contiennent des URL absolues à ajuster si le nom du dépôt diffère de `portfolio`.

## Licence

Code sous licence MIT. Contenus rédactionnels © Timothy Valentin.
