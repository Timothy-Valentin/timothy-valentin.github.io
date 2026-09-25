---
title: "Publication de mon portfolio professionnel sur GitHub Pages"
court: "Portfolio"
description: "Mise en ligne et maintenance de ce portfolio : site statique hébergé gratuitement sur GitHub Pages, publié automatiquement à chaque mise à jour, sans cookie ni traceur, avec un fichier security.txt pour le signalement de vulnérabilités."
contexte: personnel
cadre: "Projet personnel"
periode: "Septembre 2026"
competences:
  - presence
  - devpro
outils:
  - "Git"
  - "GitHub"
  - "GitHub Actions"
  - "GitHub Pages"
  - "Markdown"
ordre: 7
---

## Contexte

Pour ma recherche de stage et d'alternance, et pour l'épreuve du BTS, j'avais besoin d'une
**présence en ligne professionnelle** : un site qui présente mon parcours, mes réalisations et
les compétences qu'elles démontrent, accessible par un simple lien.

## Objectifs

- Un site **clair et rapide**, lisible sur ordinateur comme sur téléphone.
- Un hébergement **gratuit et fiable**.
- Une mise à jour **simple** : modifier un texte doit suffire à mettre le site à jour.
- Une démarche **sobre et respectueuse** des visiteurs : aucun cookie, aucun traceur.

## Choix techniques

| Besoin | Solution retenue | Pourquoi |
| --- | --- | --- |
| Hébergement | **GitHub Pages** | Gratuit, HTTPS inclus, lié au dépôt GitHub |
| Contenu | Fichiers **Markdown** | Chaque fiche est un simple fichier texte, facile à modifier et à versionner |
| Génération du site | **Astro** (générateur de site statique) | Produit des pages HTML statiques : rapides, sans base de données ni serveur applicatif à sécuriser |
| Publication | **GitHub Actions** | À chaque modification envoyée sur GitHub, le site est reconstruit et publié automatiquement |
| Sécurité | Fichier **security.txt** (RFC 9116) | Indique comment me signaler un problème de sécurité |

**Un site statique est aussi un choix de sécurité :** pas de formulaire, pas de base de données,
pas de code exécuté côté serveur, donc une surface d'attaque minimale.

## Fonctionnement

1. Je modifie ou j'ajoute une fiche (fichier Markdown) dans le dépôt Git.
2. J'envoie la modification sur GitHub (`git commit` puis `git push`).
3. GitHub Actions vérifie le projet, construit le site et le publie sur GitHub Pages.
4. Le site en ligne est à jour quelques minutes plus tard.

Chaque modification est **tracée dans l'historique Git** : on sait ce qui a changé, quand et
pourquoi, et l'on peut revenir en arrière.

## Réalisation

Le site a été construit avec l'aide d'un **assistant de programmation par IA** (Claude,
d'Anthropic). J'ai défini le contenu, la structure et les exigences (sobriété, lisibilité,
authenticité des informations), relu et validé chaque page, et je gère la publication et la mise
à jour du contenu.

## Bilan

Ce projet m'a fait découvrir la **gestion de version avec Git**, le principe de la **publication
automatisée** (intégration et déploiement continus) et l'importance d'une présence en ligne
**soignée et honnête** : tout ce qui est présenté ici correspond à des travaux que j'ai réellement
menés.
