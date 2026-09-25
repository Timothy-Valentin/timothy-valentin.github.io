---
title: "Hyperviseur Proxmox VE & VirtualBox"
description: "Montage matériel d'un serveur (installation de la mémoire vive et des disques durs), installation complète de Proxmox VE, puis création de machines virtuelles Debian, Ubuntu et d'un environnement de test Kali Linux. VirtualBox en complément pour les tests sur poste personnel."
date: 2026-02-14
tags:
  - Proxmox VE
  - VirtualBox
  - Montage matériel
  - Debian
  - Ubuntu
  - Kali Linux
ordre: 1
---

## Objectif

Disposer d'un environnement personnel pour **pratiquer en dehors des cours** : reproduire les
travaux des ateliers, tester des configurations sans risque et découvrir des outils de sécurité
dans un cadre maîtrisé.

J'utilise deux hyperviseurs complémentaires :

| | **Proxmox VE** | **VirtualBox** |
| --- | --- | --- |
| Type | Hyperviseur de type 1 (installé directement sur le matériel) | Hyperviseur de type 2 (logiciel installé sur un système existant) |
| Support | Serveur dédié | Mon ordinateur personnel |
| Usage | Machines virtuelles durables, administrées à distance | Tests rapides et ponctuels |

## 1. Montage matériel du serveur

Avant l'installation logicielle, j'ai réalisé moi-même la **préparation physique du serveur** :

- **installation des barrettes de mémoire vive** dans les emplacements prévus par la carte mère ;
- **installation et raccordement des disques durs** (fixation, câbles de données et d'alimentation) ;
- vérification au démarrage que la mémoire et les disques sont bien détectés par le BIOS/UEFI ;
- activation dans le BIOS/UEFI des **extensions de virtualisation** du processeur, indispensables au fonctionnement d'un hyperviseur.

**Précautions appliquées :** machine hors tension et débranchée, décharge de l'électricité
statique avant de manipuler les composants, respect du sens des détrompeurs.

## 2. Installation de Proxmox VE

L'installation complète du système a suivi les étapes suivantes :

1. **téléchargement de l'image ISO** depuis le site officiel de Proxmox et création d'une clé USB d'installation ;
2. **démarrage** du serveur sur la clé USB ;
3. **choix du disque cible** pour le système ;
4. paramètres régionaux, **mot de passe administrateur** et adresse e-mail de notification ;
5. **configuration réseau** de l'interface d'administration : nom d'hôte, adresse IP fixe, passerelle et serveur DNS ;
6. redémarrage, puis accès à l'**interface web d'administration** depuis un autre poste du réseau (port 8006, en HTTPS) ;
7. **mise à jour** du système après installation.

Une adresse IP **fixe** est indispensable : l'hyperviseur est administré à distance, son adresse
ne doit pas changer.

## 3. Création des machines virtuelles

Depuis l'interface web, j'ai créé plusieurs machines virtuelles :

| Machine virtuelle | Usage |
| --- | --- |
| **Debian** | Découverte de l'administration Linux en mode serveur |
| **Ubuntu** | Tests de services et d'interopérabilité (comme en atelier) |
| **Kali Linux** | Environnement de test pour la pratique de la sécurité |

Pour chaque machine, la démarche est identique : téléverser l'image ISO dans le stockage de
Proxmox, créer la VM en définissant ses ressources (processeurs, mémoire, taille du disque, carte
réseau), démarrer sur l'ISO, puis installer le système.

### Précautions pour l'environnement Kali Linux

Kali Linux regroupe des outils d'audit de sécurité. Leur usage est encadré par la loi : je ne les
utilise **que sur mes propres machines** ou sur des plateformes d'entraînement prévues à cet effet,
comme [Root-Me](../../writeups/root-me-fondamentaux-reseau-protocoles-en-clair/).

## 4. VirtualBox en complément

Sur mon ordinateur personnel, VirtualBox me permet de lancer rapidement une machine virtuelle
pour un test ponctuel. J'y utilise notamment les différents **modes réseau** proposés
(NAT, réseau interne, accès par pont), ce qui m'a aidé à comprendre concrètement les notions
d'isolement et d'adressage vues en cours.

## Ce que ce homelab m'apporte

- une vision complète, **du composant matériel jusqu'au service**, que les ateliers sur machines déjà préparées ne donnent pas ;
- la pratique régulière de l'installation et de l'administration de systèmes Linux ;
- un cadre sûr pour **expérimenter sans risque** pour une infrastructure de production.
