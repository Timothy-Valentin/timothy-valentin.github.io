---
title: "Méthodologie et outils de veille"
description: "La démarche de veille technologique et réglementaire mise en place dans le cadre du BTS SIO : définition du sujet, sources institutionnelles (ANSSI, CERT-FR), agrégation des flux RSS, tri, vérification et restitution."
miseAJour: 2026-09-28
type: methodologie
tags:
  - Méthodologie
  - Flux RSS
  - Inoreader
  - ANSSI
  - CNIL
  - Fiabilité des sources
sources:
  - titre: "CERT-FR — Alertes, avis et bulletins d'actualité"
    url: "https://www.cert.ssi.gouv.fr/"
  - titre: "ANSSI — Actualités et publications"
    url: "https://cyber.gouv.fr/"
  - titre: "CNIL — Actualités"
    url: "https://www.cnil.fr/fr/actualites"
  - titre: "FIDO Alliance — Actualités"
    url: "https://fidoalliance.org/news/"
  - titre: "The Hacker News"
    url: "https://thehackernews.com/"
  - titre: "Inoreader"
    url: "https://www.inoreader.com/"
ordre: 2
---

## Pourquoi une démarche de veille ?

La veille technologique fait partie des compétences évaluées au BTS SIO (« Organiser son
développement professionnel ») : un technicien doit être capable de **se tenir informé de
manière organisée**, de **vérifier** ce qu'il lit et de **restituer** une synthèse argumentée.

Ma veille porte sur les **passkeys** (clés d'accès), qui remplacent progressivement les mots de
passe. Ce sujet relie ma formation SISR (gestion des comptes, authentification des utilisateurs) à
mon projet de poursuite d'études en cybersécurité.

## La démarche en cinq étapes

| Étape | Objectif |
| --- | --- |
| **1. Définir** | Délimiter le sujet et choisir les mots-clés |
| **2. Collecter** | Recevoir automatiquement les publications des sources choisies (flux RSS) |
| **3. Trier** | Ne garder que ce qui concerne le sujet |
| **4. Vérifier** | Remonter à la source primaire, recouper, contrôler la date |
| **5. Restituer** | Rédiger et mettre à jour la fiche de synthèse |

### 1. Définir le sujet et les mots-clés

Un sujet trop large rend la veille ingérable. J'ai donc délimité le mien par une problématique
(les passkeys peuvent-elles remplacer les mots de passe, pour le grand public comme en entreprise ?)
et par une liste de mots-clés : _passkey_, _clé d'accès_, _FIDO2_, _WebAuthn_, _sans mot de passe_,
_authentification multifacteur_, _hameçonnage_.

### 2. Collecter : sources et outils

**Sources institutionnelles**, prioritaires car fiables et en français :

| Source | Contenu utile |
| --- | --- |
| **ANSSI** (`cyber.gouv.fr`) | Guides, dont les recommandations sur l'authentification multifacteur et les mots de passe |
| **CNIL** (`cnil.fr`) | Recommandation sur les mots de passe, conseils au grand public |
| **CERT-FR** (`cert.ssi.gouv.fr`) | Alertes de sécurité, avis sur les vulnérabilités, bulletins d'actualité |

**Sources complémentaires :**

- **The Hacker News** : actualité internationale de la cybersécurité ;
- la **FIDO Alliance**, qui publie les standards et des rapports sur l'adoption des passkeys ;
- les **blogs sécurité** de Google, Microsoft, Apple et GitHub, qui annoncent les nouveautés de leurs services ;
- comptes d'experts en sécurité suivis sur **Mastodon** et **Bluesky**, utiles pour repérer tôt un sujet.

**Outil d'agrégation : les flux RSS dans Inoreader.** Plutôt que de consulter chaque site un par
un, je m'abonne à leurs **flux RSS** : les nouvelles publications arrivent automatiquement dans un
agrégateur unique, **Inoreader**, où je les classe en dossiers (sources institutionnelles, presse,
passkeys). La liste de mes abonnements est disponible au format OPML, un format standard que tout
agrégateur RSS sait importer.

**Fil d'actualités automatique sur ce portfolio.** En complément, le [fil d'actualités](../actualites/)
de ce site rassemble chaque jour les dernières publications de mes sources, et met en avant celles
qui contiennent un mot-clé de mon sujet. Il est actualisé automatiquement chaque matin par
GitHub Actions, sans intervention de ma part. Deux niveaux de mots-clés limitent le bruit :

- les mots-clés **spécifiques** (_passkey_, _FIDO_, _WebAuthn_, _sans mot de passe_) sont recherchés dans le titre et le résumé ;
- les mots-clés **plus larges** (_mot de passe_, _MFA_, _hameçonnage_…) ne sont recherchés que dans le titre.

Ce tri automatique ne remplace pas le travail de veille : il me fait gagner du temps sur la
collecte, mais la lecture, la vérification et la synthèse restent manuelles.

### 3. Trier

À chaque consultation, je parcours les titres et ne conserve que les articles en lien avec mes
mots-clés ou avec les technologies que j'utilise. Les autres sont écartés sans lecture complète.

### 4. Vérifier la fiabilité

Avant d'utiliser une information, je contrôle :

- **l'origine** : je remonte jusqu'à la source primaire (texte officiel, publication de l'ANSSI, du NIST, bulletin d'un éditeur) ;
- **le recoupement** : une information issue de la presse ou des réseaux sociaux doit être confirmée par une seconde source indépendante ;
- **la date** : une information ancienne peut ne plus être d'actualité (par exemple, la liste des services compatibles avec les passkeys évolue très vite).

### 5. Restituer

La veille aboutit à une **fiche de synthèse** — la [fiche sur les passkeys](../passkeys-fin-des-mots-de-passe/) —
qui explique le sujet, compare les approches, cite ses sources et propose une analyse personnelle.
Elle est mise à jour lorsque de nouvelles informations significatives sont publiées ; la date de
dernière mise à jour y est indiquée.

## Ce que m'apporte cette démarche

- une méthode réutilisable pour **se former en continu**, indispensable dans le domaine de la cybersécurité ;
- l'habitude de **privilégier les sources officielles** (ANSSI, CERT-FR) et de vérifier avant de relayer une information ;
- une meilleure compréhension des enjeux d'authentification, au cœur de la sécurité des organisations pour lesquelles je souhaite travailler.
