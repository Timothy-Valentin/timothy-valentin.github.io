---
title: "Root-Me : Analyse de trames réseau et extraction d'identifiants (Wireshark / PCAP)"
description: "Méthodologie d'analyse d'une capture réseau sur les challenges Réseau de Root-Me (FTP, TELNET) : filtres d'affichage, suivi de flux TCP, lecture des protocoles en clair — et la remédiation par chiffrement TLS/SSH côté défense."
date: 2026-05-10
plateforme: "Root-Me"
categorie: "Réseau"
difficulte: "Facile"
outils:
  - Wireshark
  - tshark
  - tcpdump
  - capinfos
tags:
  - PCAP
  - FTP
  - TELNET
  - Protocoles en clair
  - Filtres d'affichage
  - Follow TCP Stream
  - TLS
  - Remédiation
draft: false
---

## Objectif pédagogique

Les premiers challenges de la catégorie **Réseau** de Root-Me (« FTP — Authentification »,
« TELNET — Authentification ») fournissent un fichier de capture `.pcap` et demandent de
retrouver le mot de passe d'un utilisateur. L'intérêt n'est pas le mot de passe lui-même,
mais la **démonstration concrète** de ce qu'un attaquant positionné sur le chemin réseau
peut lire lorsqu'un protocole n'est pas chiffré.

> Conformément aux règles de Root-Me, ce write-up décrit la **démarche** et ne divulgue ni
> mot de passe ni flag de validation. Les valeurs visibles dans les exemples sont fictives.

## 1. Reconnaissance du fichier

Avant d'ouvrir Wireshark, je qualifie toujours la capture : durée, volume, type de lien.
Cela évite de chercher une aiguille sans savoir combien de bottes de foin il y a.

```bash
capinfos ch1.pcap
# File type:           Wireshark/tcpdump/... - pcap
# Number of packets:   ~100
# Capture duration:    quelques secondes
# Data link type:      Ethernet

tshark -r ch1.pcap -qz io,phs        # hiérarchie des protocoles
```

La **hiérarchie des protocoles** (`Statistiques > Hiérarchie des protocoles` dans
Wireshark) montre immédiatement la présence de trafic `ftp` sur TCP : c'est la piste
principale.

## 2. Vue d'ensemble : conversations et points de terminaison

```bash
tshark -r ch1.pcap -qz conv,tcp
```

`Statistiques > Conversations > TCP` révèle deux flux :

- un flux vers le **port 21** (canal de commande FTP) ;
- un flux vers un port éphémère (canal de données en mode passif, transfert de fichier ou listing).

## 3. Filtres d'affichage ciblés

Les filtres d'affichage (_display filters_) sont la compétence clé : ils réduisent des
milliers de paquets aux quelques lignes utiles.

| Objectif | Filtre d'affichage |
| --- | --- |
| Tout le canal de commande FTP | `ftp` |
| Seulement les commandes d'authentification | `ftp.request.command == "USER" \|\| ftp.request.command == "PASS"` |
| Réponses du serveur (codes 230 = succès, 530 = échec) | `ftp.response.code == 230 \|\| ftp.response.code == 530` |
| Session TELNET | `telnet` |
| Tout protocole transportant des identifiants en clair | `ftp \|\| telnet \|\| pop \|\| imap \|\| http.authorization \|\| smtp` |
| Isoler une conversation | `ip.addr == 10.20.30.40 && tcp.port == 21` |

Le filtre sur les commandes `USER`/`PASS` affiche directement l'identifiant, puis le
secret, **en clair dans le champ `Request arg`**. La réponse `230 Login successful`
confirme que le couple est valide.

La même extraction en ligne de commande — pratique pour traiter de nombreuses captures :

```bash
tshark -r ch1.pcap -Y 'ftp.request.command in {"USER" "PASS"}' \
       -T fields -e frame.number -e ip.src -e ftp.request.command -e ftp.request.arg
# 8   192.168.1.10   USER   alice
# 10  192.168.1.10   PASS   ********   (valeur masquée dans ce write-up)
```

## 4. Suivi de flux TCP

Pour **TELNET**, le problème est différent : chaque frappe clavier voyage dans un paquet
séparé, souvent avec l'**écho** du serveur. Un filtre paquet par paquet est illisible.

`Clic droit > Suivre > Flux TCP` (ou `tcp.stream eq 0`) reconstitue la session complète :

- en **rouge**, ce qu'envoie le client ;
- en **bleu**, ce que répond le serveur.

On y lit l'invite `login:`, l'identifiant tapé (doublé par l'écho), puis l'invite
`Password:` suivie des caractères du mot de passe — que le serveur ne renvoie pas en écho,
mais que le client, lui, a bien transmis en clair.

```bash
# Reconstitution en ligne de commande, en ASCII
tshark -r ch2.pcap -qz follow,tcp,ascii,0
```

**Piège rencontré** : le mode d'affichage par défaut `ASCII` mélange les deux sens. Passer
l'affichage sur « Client uniquement » permet de ne lire que les frappes de l'utilisateur,
y compris les corrections (caractère `DEL` / `0x7f`) qu'il faut interpréter.

## 5. Ce que l'attaquant obtient (et comment)

Pour capturer ce trafic dans la réalité, un attaquant doit être **sur le chemin** :

- sur le même segment Wi-Fi ouvert ;
- après un **empoisonnement ARP** sur un réseau local non protégé ;
- sur un équipement réseau compromis, ou via un port miroir (SPAN) mal protégé.

Il obtient alors les identifiants, mais aussi **tout le contenu** échangé (fichiers FTP,
commandes TELNET). Et comme les mots de passe sont souvent réutilisés, la compromission
s'étend rapidement à d'autres services.

## 6. Remédiation côté défense

C'est la partie qui m'intéresse le plus pour un poste en SOC ou en administration.

| Protocole en clair | Remplacement chiffré | Port |
| --- | --- | --- |
| FTP (21) | **SFTP** (sur SSH) ou **FTPS** explicite (`AUTH TLS`) | 22 / 21 |
| TELNET (23) | **SSH** (clés ed25519) | 22 |
| HTTP (80) | **HTTPS** (TLS 1.2 minimum, TLS 1.3 recommandé) + HSTS | 443 |
| POP3 / IMAP (110 / 143) | POP3S / IMAPS | 995 / 993 |
| SNMP v1/v2c | **SNMPv3** avec `authPriv` | 161 |
| Syslog UDP | Syslog sur **TLS** (RFC 5425) | 6514 |

Exemple de durcissement d'un serveur `vsftpd` qui devrait conserver FTP :

```ini
# /etc/vsftpd.conf (extrait)
ssl_enable=YES
force_local_logins_ssl=YES     # refuse USER/PASS hors TLS
force_local_data_ssl=YES       # chiffre aussi le canal de données
ssl_tlsv1_2=YES
ssl_sslv2=NO
ssl_sslv3=NO
rsa_cert_file=/etc/ssl/certs/ftp.example.crt
rsa_private_key_file=/etc/ssl/private/ftp.example.key
```

Après correction, la même capture ne montre plus que `AUTH TLS`, une négociation TLS,
puis des `Application Data` illisibles : **l'attaque passive ne donne plus rien**.

### Mesures complémentaires

- **Détecter** : une règle d'IDS (Suricata) qui alerte sur tout `USER`/`PASS` FTP ou toute session TELNET sortant d'un segment sensible.
- **Prévenir l'interception** : DHCP Snooping et Dynamic ARP Inspection sur les commutateurs (mis en place lors de mon [stage](../../projets/deploiement-reseau-nouveau-batiment-justice/)).
- **Réduire l'impact** : MFA et mots de passe uniques, pour qu'un identifiant volé ne suffise pas.
- **Auditer** : inventorier régulièrement les services exposés du parc pour repérer tout protocole en clair encore actif.

## Ce que j'en retiens

- Un protocole non chiffré, c'est un protocole **lisible par quiconque se trouve sur le chemin**.
- Wireshark n'est pas qu'un outil offensif : c'est l'outil de diagnostic n° 1 de l'administrateur (je l'ai utilisé pour résoudre un problème de PXE en [atelier](../../projets/infrastructure-systeme-proxmox-dhcp-vlan/)).
- La bonne réponse d'un défenseur n'est pas « j'ai trouvé le mot de passe », mais « voici pourquoi il était lisible, et voici comment l'empêcher ».
