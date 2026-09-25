# Portfolio — Timothy Valentin

Portfolio de BTS SIO option SISR (lycée Henri Matisse, Cugnaux) : parcours, réalisations,
tableau de synthèse des compétences et veille technologique.

**En ligne :** https://timothy-valentin.github.io

## Mettre à jour le contenu

Tout le contenu se modifie dans des fichiers texte, sans toucher au code :

| Je veux… | Fichier |
| --- | --- |
| Modifier mes liens, mon e-mail, ajouter mon CV ou LinkedIn | `src/config/site.ts` |
| Modifier ou ajouter une réalisation | `src/content/realisations/*.md` |
| Ajouter le lien Google Docs d'un TP | champ `documentation:` en haut de la fiche |
| Modifier la veille | `src/content/veille/*.md` |
| Modifier mon parcours (formations, expériences) | `src/pages/parcours.astro` |

**Ajouter le CV :** déposer le PDF dans `public/` (par exemple `public/cv-timothy-valentin.pdf`),
puis renseigner `cv: 'cv-timothy-valentin.pdf'` dans `src/config/site.ts`. Les boutons
« Télécharger mon CV » apparaissent alors automatiquement.

**Nouvelle réalisation :** copier une fiche existante et adapter l'en-tête. Le champ
`competences` utilise les identifiants définis dans `src/config/referentiel.ts` ; le tableau de
synthèse se met à jour tout seul.

## Commandes

```bash
npm ci            # installation
npm run dev       # aperçu local pendant l'édition (http://localhost:4321)
npm run build     # vérification + génération du site dans dist/
```

## Publication

Le dépôt doit s'appeler `timothy-valentin.github.io`. Dans GitHub : **Settings › Pages › Source :
GitHub Actions**. Chaque `git push` sur `main` reconstruit et publie le site
(`.github/workflows/deploy.yml`).

## Technique

Astro 7 (site statique), Tailwind CSS 4, icônes Lucide, schémas en SVG. Aucun cookie, aucun
traceur, aucun script tiers : le site complet pèse moins de 400 Ko.
