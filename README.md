# Portfolio — Timothy Valentin

Portfolio professionnel de BTS SIO option SISR (lycée Henri Matisse, Cugnaux).

**🌐 Site en ligne : https://timothy-valentin.github.io**

## Ce que contient le site

| Page | Contenu |
| --- | --- |
| [Parcours](https://timothy-valentin.github.io/parcours/) | Formation, stages et alternances, certifications, rapport de stage |
| [Réalisations](https://timothy-valentin.github.io/realisations/) | Une fiche par réalisation : contexte, objectifs, démarche, résultat, compétences mobilisées |
| [Compétences](https://timothy-valentin.github.io/competences/) | Tableau de synthèse : chaque compétence du référentiel BTS SIO reliée aux réalisations qui la démontrent |
| [Veille](https://timothy-valentin.github.io/veille/) | Veille technologique sur les passkeys, méthode de veille et fil d'actualités |
| [Contact](https://timothy-valentin.github.io/contact/) | E-mail et profils professionnels |

## Fonctionnement

Le site est **statique** : il est généré à partir de fichiers texte (Markdown), puis publié sur
GitHub Pages. Il n'utilise ni base de données, ni cookie, ni traceur, ni script tiers.

Deux tâches sont automatisées avec GitHub Actions :

| Tâche | Fréquence | Fichier |
| --- | --- | --- |
| Construction et publication du site, avec actualisation du fil de veille | À chaque modification, et chaque matin | `.github/workflows/deploy.yml` |
| Récapitulatif des articles de la semaine sur les passkeys, publié sous forme de ticket | Chaque lundi | `.github/workflows/veille-hebdo.yml` |

## Organisation du dépôt

| Emplacement | Rôle |
| --- | --- |
| `src/content/realisations/` | Les fiches de réalisation |
| `src/content/veille/` | Les fiches de veille |
| `src/config/site.ts` | Coordonnées et liens (e-mail, LinkedIn, Root-Me, TryHackMe, CV) |
| `src/config/referentiel.ts` | Compétences du référentiel BTS SIO |
| `src/config/veille-sources.ts` | Sources et mots-clés de la veille |
| `src/pages/` | Les pages du site |
| `scripts/veille-hebdo.ts` | Script du récapitulatif hebdomadaire |
| `public/` | Fichiers publiés tels quels (rapport de stage, `security.txt`) |

## Mettre à jour le contenu

Le contenu se modifie dans des fichiers texte, sans toucher au code :

| Je veux… | Fichier à modifier |
| --- | --- |
| Modifier mes liens, mon e-mail, ajouter mon CV | `src/config/site.ts` |
| Modifier ou ajouter une réalisation | `src/content/realisations/*.md` |
| Ajouter le lien vers la documentation d'un TP | champ `documentation:` en haut de la fiche |
| Modifier la veille | `src/content/veille/*.md` |
| Ajouter une source ou un mot-clé de veille | `src/config/veille-sources.ts` |
| Modifier mon parcours | `src/pages/parcours.astro` |

**Ajouter le CV :** déposer le PDF dans `public/` (par exemple `public/cv-timothy-valentin.pdf`),
puis renseigner `cv: 'cv-timothy-valentin.pdf'` dans `src/config/site.ts`. Les boutons
« Télécharger mon CV » apparaissent alors automatiquement.

**Nouvelle réalisation :** copier une fiche existante et adapter l'en-tête. Le champ
`competences` utilise les identifiants définis dans `src/config/referentiel.ts` ; le tableau de
synthèse se met à jour tout seul.

## Commandes

```bash
npm ci            # installation des dépendances
npm run dev       # aperçu local pendant l'édition (http://localhost:4321)
npm run build     # vérification et génération du site dans dist/
```

Chaque `git push` sur la branche `main` reconstruit et publie le site.

## Technologies

Astro (générateur de site statique), Tailwind CSS, icônes Lucide, schémas en SVG, GitHub Actions
et GitHub Pages.
