---
title: "Pratique des fondamentaux réseau sur Root-Me : analyse de protocoles en clair"
court: "Root-Me"
description: "8 challenges validés dans la catégorie Réseau de Root-Me. Méthode d'analyse de trames avec Wireshark (HTTP, FTP, Telnet, DNS) et préconisations pour migrer vers des protocoles chiffrés (HTTPS, SFTP, SSH)."
contexte: personnel
cadre: "Root-Me — pseudo « Petitprince »"
periode: "En cours"
competences:
  - devpro
  - infra
  - usages
outils:
  - "Wireshark"
  - "Root-Me"
confidentialite: "Conformément aux règles de Root-Me, aucune solution ni aucun mot de passe de validation n'est publié."
ordre: 6
---

## Contexte

**Root-Me** est une plateforme française et légale d'entraînement à la sécurité informatique. Je
m'y entraîne en autonomie, en complément de ma formation, sous le pseudo
[Petitprince](https://www.root-me.org/Petitprince).

| Au 26 septembre 2026 | |
| --- | --- |
| Challenges validés | **8**, tous dans la catégorie **Réseau** |
| Points | 95 |

Les challenges de découverte de la catégorie Réseau fournissent des **captures réseau** à
analyser. Ils rejoignent directement ma formation SISR : comprendre ce qui circule réellement sur
un réseau et **mesurer le risque des protocoles non chiffrés**.

Cette fiche présente la **méthode** que j'applique, puis les **préconisations de sécurité** qui en
découlent pour un administrateur.

## 1. Méthodologie d'analyse avec Wireshark

### Étape 1 — Prendre connaissance de la capture

Avant de chercher un détail, j'identifie **ce que contient** la capture :

- _Statistiques › Hiérarchie des protocoles_ : quels protocoles sont présents et dans quelle proportion ;
- _Statistiques › Conversations_ : quelles machines échangent entre elles, sur quels ports.

Cette vue d'ensemble oriente la suite de l'analyse vers le ou les protocoles pertinents.

### Étape 2 — Filtrer les trames utiles

Les **filtres d'affichage** de Wireshark permettent de ne conserver que les trames intéressantes :

| Objectif | Filtre d'affichage |
| --- | --- |
| Trafic web non chiffré | `http` |
| Requêtes web uniquement | `http.request` |
| Commandes FTP | `ftp` |
| Session Telnet | `telnet` |
| Requêtes et réponses DNS | `dns` |
| Échanges d'une machine précise | `ip.addr == <adresse>` |
| Trafic sur un port donné | `tcp.port == <port>` |

### Étape 3 — Reconstituer les échanges

Une session applicative est découpée en de nombreux paquets. La fonction
**_Suivre › Flux TCP_** (clic droit sur une trame) reconstitue l'échange complet entre client et
serveur, dans l'ordre, en distinguant ce qu'envoie chaque partie. C'est l'outil le plus efficace
pour lire une session Telnet, une connexion FTP ou une requête HTTP.

### Étape 4 — Interpréter selon le protocole

| Protocole | Ce que l'analyse révèle lorsqu'il n'est pas chiffré |
| --- | --- |
| **HTTP** | L'URL demandée, les en-têtes, le contenu des formulaires envoyés et les réponses du serveur |
| **FTP** | Les commandes d'authentification (identifiant et mot de passe) et les noms des fichiers transférés |
| **Telnet** | L'intégralité de la session, y compris la saisie de l'identifiant et du mot de passe |
| **DNS** | Les noms de domaine consultés par une machine, qui renseignent sur son activité |

**Constat commun :** dès lors qu'un protocole transmet ses données en clair, **toute personne
en mesure de capturer le trafic** (sur un réseau Wi-Fi ouvert, sur un segment réseau mal
cloisonné…) peut lire les identifiants et le contenu des échanges.

## 2. Préconisations de sécurité

L'analyse de ces captures conduit à des recommandations concrètes pour un administrateur
systèmes et réseaux.

### Migrer vers des protocoles chiffrés

| Protocole en clair | Remplacement recommandé | Apport |
| --- | --- | --- |
| **HTTP** (port 80) | **HTTPS** (port 443, TLS) | Chiffrement et authentification du serveur par certificat |
| **FTP** (port 21) | **SFTP** (transfert de fichiers sur SSH, port 22) | Identifiants et fichiers chiffrés |
| **Telnet** (port 23) | **SSH** (port 22) | Session d'administration entièrement chiffrée |
| **DNS** classique | DNS chiffré (DNS over HTTPS / DNS over TLS), selon le contexte | Confidentialité des requêtes |

### Mesures complémentaires

- **Désactiver** les services en clair (Telnet, FTP) sur les serveurs et les équipements réseau une fois l'alternative chiffrée en place ;
- **Rediriger** systématiquement HTTP vers HTTPS sur les serveurs web ;
- **Segmenter le réseau** (VLAN) pour limiter les zones où un trafic peut être capturé — une notion mise en pratique dans mes [ateliers de formation](../modelisation-packet-tracer-vlan/) ;
- **Administrer les équipements en SSH** plutôt qu'en Telnet, comme je le fais avec [PuTTY](../administration-console-ssh-putty/).

## Ce que je retiens

- Wireshark est avant tout un **outil de diagnostic** pour l'administrateur : il montre ce qui circule réellement sur le réseau.
- Un protocole non chiffré expose ses données à **toute personne placée sur le chemin**.
- La bonne conclusion d'une analyse n'est pas seulement « l'information était lisible », mais **« voici comment empêcher qu'elle le soit »**.
