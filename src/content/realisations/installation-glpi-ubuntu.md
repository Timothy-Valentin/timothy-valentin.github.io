---
title: "Installation et paramétrage de GLPI sur Ubuntu : gestion de parc et assistance"
court: "GLPI"
description: "Mise en place complète d'un serveur GLPI en partant de zéro, puis simulation du fonctionnement d'un vrai service d'assistance : des utilisateurs de différents postes de l'entreprise signalent des pannes de gravité variable depuis plusieurs machines Ubuntu, et l'administrateur y répond."
contexte: formation
cadre: "BTS SIO SISR — lycée Henri Matisse"
periode: "Formation BTS SIO"
competences:
  - patrimoine
  - incidents
  - service
  - deployer
outils:
  - "GLPI"
  - "Ubuntu"
ordre: 4
---

## Contexte

**GLPI** est un logiciel libre français de gestion des services informatiques. Il répond à deux
besoins de tout service informatique : **savoir ce que l'on possède** (inventaire du parc :
ordinateurs, logiciels, matériels réseau) et **suivre les demandes des utilisateurs** (tickets
d'assistance).

J'ai mis en place un serveur GLPI **en partant de zéro** : création de la machine Ubuntu,
installation de l'application et paramétrage. Je l'ai ensuite fait vivre comme dans une vraie
entreprise, en **simulant des pannes** : des utilisateurs signalent leurs problèmes, et
l'administrateur leur répond.

## Objectifs

- Créer une machine **Ubuntu** dédiée à GLPI.
- **Installer** GLPI et le **paramétrer** entièrement.
- Créer un **compte administrateur** et des **comptes utilisateurs** représentant différents
  postes de l'entreprise.
- **Simuler de vraies pannes** : tickets de gravités différentes, créés depuis plusieurs machines
  Ubuntu, puis traités avec le compte administrateur.

## Architecture

![Architecture : plusieurs machines Ubuntu de test se connectent, avec des comptes utilisateurs différents, à l'interface web de GLPI installé sur une machine Ubuntu](../../assets/schemas/glpi-parc-assistance.svg)

GLPI est une **application web** : elle s'installe sur un serveur et s'utilise ensuite depuis le
navigateur de n'importe quel poste du réseau. Pour fonctionner, elle a besoin de trois briques
sur le serveur :

| Brique | Rôle |
| --- | --- |
| **Serveur web** | Reçoit les requêtes des navigateurs et y répond |
| **PHP** | Exécute le code de l'application GLPI |
| **Base de données** | Conserve le parc, les tickets, les comptes et la configuration |

## Réalisation

### 1. La machine Ubuntu

Création de la machine et installation d'**Ubuntu**, qui sert de serveur à GLPI.

### 2. L'installation de GLPI

Installation, sur cette machine, des briques dont GLPI dépend, puis de GLPI lui-même. Rien
n'était préinstallé : tout a été mis en place à la main, depuis le système jusqu'à l'application.

### 3. Le paramétrage et les comptes

Une fois GLPI installé, je l'ai paramétré puis j'ai créé les comptes nécessaires à la
simulation :

| Compte | Rôle dans la simulation |
| --- | --- |
| **Administrateur** | Le service informatique : reçoit les tickets et y répond |
| **Utilisateurs** | Des personnes occupant **différents postes dans l'entreprise**, qui signalent leurs problèmes |

Créer plusieurs utilisateurs aux postes différents, plutôt qu'un seul compte de test, permet de
reproduire la situation réelle d'un service d'assistance : les demandes arrivent de plusieurs
personnes, qui n'ont ni les mêmes besoins ni la même urgence.

## Simulation de pannes

### Le principe

Depuis **plusieurs machines Ubuntu**, chaque utilisateur se connecte à GLPI avec son propre
compte et **crée un ticket** pour signaler un problème. Les tickets ont volontairement des
**niveaux de gravité différents**, de la simple gêne à la panne bloquante. Avec le **compte
administrateur**, je réponds ensuite à ces tickets, comme le ferait le service informatique.

### La gravité d'un ticket dans GLPI

GLPI ne se contente pas d'empiler les demandes : il aide à décider **dans quel ordre** les
traiter.

| Notion | Qui la définit | Ce qu'elle exprime |
| --- | --- | --- |
| **Urgence** | L'utilisateur | À quel point le problème le gêne dans son travail |
| **Impact** | Le service informatique | Combien de personnes ou de services sont touchés |
| **Priorité** | Calculée par GLPI | Le croisement des deux : l'ordre de traitement |

Un problème signalé comme très urgent par une seule personne ne passe donc pas forcément devant
une panne moins « bruyante » mais qui bloque tout un service.

### La vie d'un ticket

1. **Nouveau** : l'utilisateur vient de créer son ticket.
2. **En cours** : le ticket est pris en charge par le service informatique.
3. **Suivi** : l'administrateur répond ; l'échange reste rattaché au ticket et l'utilisateur le
   voit depuis son compte.
4. **Résolu**, puis **clos** : une solution a été apportée et la demande est terminée.

Tout est conservé : qui a demandé quoi, quand, et ce qui a été répondu.

## Résultat

Un serveur GLPI fonctionnel, installé et paramétré de bout en bout sur une machine que j'ai
créée, puis utilisé dans des conditions proches du réel : plusieurs utilisateurs, plusieurs
postes, des pannes de gravité différente et un administrateur qui y répond.

## Bilan

**Ce que j'en retiens :**

- une application web repose sur une **chaîne de services** (serveur web, PHP, base de données) :
  chacun doit fonctionner pour que l'application démarre ;
- installer un service ne suffit pas : il faut le **tester dans les conditions d'utilisation**,
  depuis d'autres machines et avec d'autres comptes que le sien ;
- tous les tickets ne se valent pas : distinguer l'**urgence** ressentie par l'utilisateur de
  l'**impact** réel sur l'organisation permet de traiter les pannes dans le bon ordre ;
- un outil de tickets garde la **trace** de chaque demande et de chaque réponse, ce qu'un
  échange oral ou un simple e-mail ne permet pas.
