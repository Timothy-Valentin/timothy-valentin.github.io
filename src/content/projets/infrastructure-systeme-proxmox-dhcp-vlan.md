---
title: "Déploiement d'un domaine Active Directory et segmentation VLAN avec routage inter-VLAN"
description: "Ateliers de formation BTS SIO : modélisation sur Cisco Packet Tracer (VLAN administratif et technique, router-on-a-stick, étendues et exclusions DHCP), puis déploiement sur machines virtuelles d'un contrôleur de domaine Windows Server (AD DS, DNS, GPO) et intégration de clients Windows et de serveurs Ubuntu."
date: 2026-03-20
epreuve: "E4/E5"
cadre: "Ateliers pratiques — formation BTS SIO SISR"
contexte: "Mise en place d'une infrastructure segmentée et d'un domaine Active Directory pour une organisation fictive"
competences:
  - "Mettre à disposition des utilisateurs un service informatique"
  - "Concevoir une solution d'infrastructure réseau"
  - "Installer, tester et déployer une solution d'infrastructure réseau"
  - "Exploiter, dépanner et superviser une solution d'infrastructure réseau"
technologies:
  - "Cisco Packet Tracer"
  - "VLAN 802.1Q"
  - "Router-on-a-Stick"
  - "DHCP"
  - "Windows Server"
  - "AD DS"
  - "DNS"
  - "GPO"
  - "Ubuntu Server"
motsCles:
  - Segmentation
  - Routage inter-VLAN
  - Sous-interfaces
  - Étendues DHCP
  - Active Directory
  - Stratégies de groupe
  - Résolution de noms
  - Virtualisation
ordre: 2
---

## Contexte et objectifs

Ces ateliers pratiques de la formation BTS SIO avaient pour objectif de mettre en place, étape par
étape, l'infrastructure d'une organisation :

1. **concevoir et valider la partie réseau** sur un simulateur avant tout déploiement ;
2. **déployer les services d'infrastructure** (annuaire, DNS, stratégies de groupe) sur des machines virtuelles ;
3. **vérifier l'intégration** de postes clients Windows et de serveurs Linux : attribution des adresses et résolution de noms.

## Étape 1 — Modélisation sur Cisco Packet Tracer

### Découpage en VLAN

Le réseau a été segmenté en deux VLAN afin de séparer les populations :

| VLAN | Population |
| --- | --- |
| **Administratif** | Postes des services administratifs |
| **Technique** | Postes du service technique |

La segmentation limite la diffusion (chaque VLAN est un domaine de broadcast distinct) et permet
de contrôler les échanges entre services, puisque tout flux entre deux VLAN doit passer par le
routeur.

### Routage inter-VLAN : Router-on-a-Stick

Le routage entre les VLAN est assuré par un routeur relié au commutateur par **un seul lien
physique configuré en trunk 802.1Q**. Sur le routeur, chaque VLAN dispose d'une
**sous-interface** qui sert de passerelle.

Exemple de syntaxe (les numéros de VLAN et les adresses sont donnés à titre d'illustration) :

```cisco
! Commutateur : création des VLAN et lien trunk vers le routeur
vlan 10
 name ADMINISTRATIF
vlan 20
 name TECHNIQUE
!
interface FastEthernet0/1
 switchport mode access
 switchport access vlan 10
!
interface GigabitEthernet0/1
 switchport mode trunk
!
! Routeur : une sous-interface 802.1Q par VLAN
interface GigabitEthernet0/0
 no shutdown
!
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.254 255.255.255.0
!
interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.254 255.255.255.0
```

**Point de vigilance :** le numéro indiqué dans `encapsulation dot1Q` doit correspondre au VLAN
réellement transporté par le trunk. Une incohérence à cet endroit isole complètement le VLAN
concerné — c'est d'ailleurs l'un des types de panne que j'ai eu à diagnostiquer pendant
[mon stage](../deploiement-reseau-nouveau-batiment-justice/).

### DHCP : étendues et exclusions

Une **étendue DHCP** a été définie pour chaque VLAN, et les adresses réservées aux équipements
configurés manuellement (passerelle, serveurs) ont été **exclues** de la distribution :

```cisco
! Exclusion des adresses attribuées manuellement
ip dhcp excluded-address 192.168.10.250 192.168.10.254
ip dhcp excluded-address 192.168.20.250 192.168.20.254
!
ip dhcp pool VLAN10-ADMINISTRATIF
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.254
 dns-server 192.168.10.250
!
ip dhcp pool VLAN20-TECHNIQUE
 network 192.168.20.0 255.255.255.0
 default-router 192.168.20.254
 dns-server 192.168.10.250
```

Lorsque le serveur DHCP ne se trouve pas dans le même VLAN que les clients, le routeur doit
**relayer** les requêtes (qui sont des broadcasts, donc non routées) vers ce serveur, grâce à la
commande `ip helper-address` sur la sous-interface concernée.

### Validation sur le simulateur

Avant de passer aux machines virtuelles, la maquette a été validée dans Packet Tracer :

- obtention d'une adresse IP par DHCP sur les postes de chaque VLAN ;
- `ping` entre postes d'un même VLAN, puis entre VLAN via le routeur ;
- vérification des configurations avec `show vlan brief`, `show interfaces trunk` et `show ip interface brief`.

## Étape 2 — Déploiement du domaine sur machines virtuelles

### Contrôleur de domaine Windows Server

Sur une machine virtuelle **Windows Server**, j'ai installé et configuré :

- le rôle **AD DS** (services de domaine Active Directory), puis promu le serveur en **contrôleur de domaine** d'une nouvelle forêt ;
- le **serveur DNS**, indispensable à Active Directory : les clients localisent le contrôleur de domaine grâce aux enregistrements DNS du domaine ;
- l'organisation de l'annuaire (unités d'organisation, comptes utilisateurs et groupes) ;
- des **stratégies de groupe (GPO) de base** consacrées à la **sécurité des sessions** utilisateurs.

Le contrôleur de domaine dispose d'une **adresse IP fixe** : un serveur d'annuaire et de DNS ne
doit pas dépendre d'une attribution dynamique.

### Stratégies de groupe

Les GPO permettent d'appliquer de façon centralisée et homogène des paramètres à tous les
utilisateurs ou ordinateurs d'une unité d'organisation, plutôt que de configurer chaque poste
individuellement. La démarche suivie :

1. créer la GPO dans la console de gestion des stratégies de groupe ;
2. la lier à l'unité d'organisation ciblée ;
3. forcer l'application sur un poste client avec `gpupdate /force` ;
4. vérifier les stratégies réellement appliquées avec `gpresult /r`.

## Étape 3 — Intégration des clients Windows et des serveurs Linux

### Clients Windows

Les postes clients Windows ont été **joints au domaine**. Les vérifications réalisées :

| Vérification | Commande |
| --- | --- |
| Adresse, passerelle et serveur DNS reçus | `ipconfig /all` |
| Résolution du nom du domaine et du contrôleur | `nslookup` |
| Application des stratégies de groupe | `gpresult /r` |
| Ouverture de session avec un compte du domaine | Connexion interactive |

### Serveurs Linux (Ubuntu Server)

Des serveurs **Ubuntu Server** ont été intégrés au réseau pour tester, depuis un système
différent, l'**attribution des adresses** et la **résolution de noms** :

```bash
ip address show        # adresse IP obtenue sur l'interface
ip route               # passerelle par défaut
resolvectl status      # serveur DNS utilisé
nslookup <nom-du-controleur-de-domaine>
ping <nom-d-un-poste-du-domaine>
```

Ces tests confirment que le DNS du domaine répond correctement à des clients qui ne sont pas des
machines Windows, et que l'adressage est cohérent d'un système à l'autre.

## Bilan

**Compétences mobilisées :**

- conception et validation d'une architecture segmentée sur simulateur **avant** déploiement ;
- routage inter-VLAN et services DHCP (étendues, exclusions, relais) ;
- déploiement d'un domaine Active Directory avec DNS intégré et stratégies de groupe ;
- tests d'interopérabilité entre clients Windows et serveurs Linux.

**Ce que je retiens :** modéliser d'abord sur Packet Tracer permet de détecter les erreurs de
conception à moindre coût ; ensuite, le **DNS** est la pièce centrale d'un domaine Active
Directory — la plupart des dysfonctionnements côté client s'expliquent par une mauvaise
configuration DNS.
