---
title: "Installation et paramétrage de GLPI sur Ubuntu : gestion de parc et assistance"
court: "GLPI"
description: "Mise en place complète d'un serveur GLPI en partant de zéro : création de la machine Ubuntu, installation et paramétrage de l'application, puis tests depuis plusieurs machines Ubuntu avec plusieurs comptes."
contexte: formation
cadre: "BTS SIO SISR — lycée Henri Matisse"
periode: "Formation BTS SIO"
competences:
  - patrimoine
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
installation de l'application, paramétrage, puis tests avec plusieurs machines et plusieurs
comptes.

## Objectifs

- Créer une machine **Ubuntu** dédiée à GLPI.
- **Installer** GLPI et le **paramétrer** entièrement.
- **Tester** le service depuis plusieurs machines Ubuntu, avec plusieurs comptes.

## Architecture

![Architecture : plusieurs machines Ubuntu de test se connectent, avec des comptes différents, à l'interface web de GLPI installé sur une machine Ubuntu](../../assets/schemas/glpi-parc-assistance.svg)

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

### 3. Le paramétrage

Paramétrage de GLPI une fois l'application installée, et création de **plusieurs comptes**.

## Tests

Le service a été testé depuis **plusieurs machines Ubuntu**, avec **plusieurs comptes** : GLPI
doit être utilisable depuis d'autres postes que le serveur lui-même, et par d'autres personnes
que celle qui l'a installé.

## Résultat

Un serveur GLPI fonctionnel, installé et paramétré de bout en bout sur une machine que j'ai
créée, et utilisable depuis plusieurs postes avec plusieurs comptes.

## Bilan

**Ce que j'en retiens :**

- une application web repose sur une **chaîne de services** (serveur web, PHP, base de données) :
  chacun doit fonctionner pour que l'application démarre ;
- installer un service ne suffit pas : il faut le **tester dans les conditions d'utilisation**,
  depuis d'autres machines et avec d'autres comptes que le sien.
