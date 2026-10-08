---
title: "Administrer les équipements en console série et en SSH avec PuTTY"
court: "PuTTY"
description: "Méthode d'administration utilisée au quotidien : liaison série en console pour la configuration initiale et le dépannage des équipements réseau, SSH pour la gestion à distance sécurisée, et bonnes pratiques associées."
contexte: formation
cadre: "BTS SIO SISR — formation et stage"
periode: "Pratique quotidienne"
competences:
  - exploiter
  - usages
  - infra
outils:
  - "PuTTY"
  - "Console série"
  - "SSH"
  - "Syntaxe Cisco IOS"
ordre: 6
---

## PuTTY, l'outil d'administration du quotidien

**PuTTY** est un client libre pour Windows qui permet d'ouvrir une session en ligne de commande
sur un équipement ou un serveur. Je l'utilise dans deux situations bien distinctes :

| Mode | Liaison | Quand l'utiliser |
| --- | --- | --- |
| **Série (console)** | Câble console branché directement sur l'équipement | Équipement neuf ou réinitialisé, perte de l'accès réseau, dépannage |
| **SSH** | Réseau IP, connexion chiffrée | Administration courante à distance, une fois l'équipement configuré |

## 1. Accès en console par liaison série

L'accès console est l'accès **« hors bande »** : il ne dépend pas du réseau. C'est le seul
moyen de configurer un commutateur ou un routeur neuf, et le recours ultime quand une erreur de
configuration a coupé l'accès réseau. Je l'ai utilisé en permanence sur la maquette de
[mon stage](../deploiement-reseau-nouveau-batiment-justice/).

### Procédure

1. **Brancher le câble console** entre le port console de l'équipement et le poste d'administration (câble USB-série le plus souvent).
2. **Identifier le port COM** attribué par Windows : _Gestionnaire de périphériques › Ports (COM et LPT)_.
3. Dans PuTTY, choisir le type de connexion **Serial** et renseigner les paramètres :

   | Paramètre | Valeur usuelle sur les équipements Cisco |
   | --- | --- |
   | Port | `COM3` (exemple, selon le poste) |
   | Vitesse | `9600` bauds |
   | Bits de données | `8` |
   | Parité | Aucune |
   | Bits d'arrêt | `1` |
   | Contrôle de flux | Aucun |

4. Ouvrir la session puis appuyer sur **Entrée** pour faire apparaître l'invite de commande.

### Premiers réflexes une fois connecté

```cisco
enable                          ! passage en mode privilégié
show running-config             ! configuration active
show ip interface brief         ! état et adresses des interfaces
configure terminal              ! passage en mode configuration
```

## 2. Administration distante en SSH

Une fois l'équipement ou le serveur joignable sur le réseau, l'administration se fait en
**SSH**, qui **chiffre** l'intégralité de la session : identifiants et commandes ne circulent
jamais en clair. À l'inverse, **Telnet** transmet tout en clair et ne doit plus être utilisé —
ce que j'ai pu constater concrètement en analysant des captures réseau sur
[Root-Me](../root-me-analyse-protocoles-en-clair/).

### Procédure dans PuTTY

1. Type de connexion **SSH**, saisie de l'adresse IP ou du nom d'hôte, port `22`.
2. **Enregistrer la session** sous un nom explicite, pour la retrouver et éviter les erreurs de cible.
3. À la première connexion, PuTTY affiche l'**empreinte de la clé d'hôte** du serveur. Elle doit être vérifiée avant d'être acceptée : une empreinte qui change ensuite de manière inattendue peut signaler une interception.

## 3. Bonnes pratiques d'administration

- **Privilégier SSH** pour l'administration distante, et réserver la console aux cas où le réseau n'est pas disponible.
- **Désactiver Telnet** sur les équipements dès que SSH est opérationnel.
- **Vérifier la cible** avant toute commande : nom d'hôte affiché dans l'invite, session PuTTY nommée clairement.
- **Tracer ses interventions** : la journalisation de session de PuTTY (_Session › Logging_) permet de conserver un historique des commandes saisies et des résultats obtenus, utile pour documenter une intervention ou revenir sur une erreur.
- **Sauvegarder la configuration** avant toute modification importante, et l'enregistrer une fois validée (`copy running-config startup-config` sur un équipement Cisco).
