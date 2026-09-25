---
title: "Montage d'un serveur physique dédié et durcissement de l'OS"
description: "Du choix des composants à un serveur Debian sans interface graphique durci : partitionnement, SSH par clés ed25519 uniquement, root et mots de passe désactivés, fail2ban, nftables et mises à jour de sécurité automatiques."
date: 2026-04-18
tags:
  - Debian 13
  - Hardware
  - SSH
  - ed25519
  - fail2ban
  - nftables
  - Durcissement
  - ANSSI
materiel:
  - "AMD Ryzen 5 PRO 4650G (6 cœurs, support ECC)"
  - "ASRock B550M Pro4"
  - "2 × 16 Go DDR4-3200 ECC UDIMM"
  - "SSD NVMe 500 Go (système) + 2 × HDD 4 To CMR (données, miroir)"
  - "Alimentation 450 W 80+ Gold"
  - "Onduleur 700 VA"
ordre: 2
---

## Objectif

Disposer d'un **serveur physique allumé 24 h/24** pour héberger les services de mon
homelab (sauvegardes, dépôt Git, collecteur de journaux), en appliquant les
recommandations de l'ANSSI pour un système GNU/Linux : surface minimale, accès
d'administration fort, traçabilité.

## Choix du matériel

| Composant | Choix | Justification |
| --- | --- | --- |
| Processeur | Ryzen 5 PRO 4650G | Les APU **PRO** prennent en charge la mémoire **ECC** ; GPU intégré suffisant pour l'installation ; 65 W de TDP |
| Mémoire | 32 Go DDR4 **ECC** | Détecte et corrige les erreurs de bits : indispensable pour un serveur qui stocke des sauvegardes |
| Stockage système | NVMe 500 Go | Rapide, séparé des données |
| Stockage données | 2 × HDD 4 To **CMR** en miroir | Les disques SMR s'effondrent en reconstruction RAID ; le miroir tolère la perte d'un disque |
| Alimentation | 450 W 80+ Gold | Rendement élevé à faible charge (le serveur consomme ~35 W au repos) |
| Onduleur | 700 VA, liaison USB | Arrêt propre automatique (`nut`) en cas de coupure prolongée |

Après montage : mise à jour du BIOS, activation de la virtualisation (SVM), désactivation
des périphériques inutiles (audio, Wi-Fi), **mot de passe BIOS** et démarrage limité au
NVMe. Un test mémoire complet (`memtest86+`, 4 passes) a validé la RAM ECC avant toute
installation.

## Installation de Debian sans interface graphique

Installation depuis l'ISO _netinst_ (signature GPG et somme SHA-512 vérifiées), en mode
expert. À l'étape « Sélection des logiciels », **seuls « serveur SSH » et « utilitaires
usuels du système »** sont cochés : aucun environnement de bureau, aucun serveur d'impression.

### Partitionnement

Séparer les points de montage permet d'appliquer des options restrictives
(recommandation ANSSI R28) et d'éviter qu'un journal qui déborde ne sature la racine.

| Point de montage | Taille | Options |
| --- | --- | --- |
| `/boot/efi` | 512 Mo | `umask=0077` |
| `/boot` | 1 Go | `nosuid,nodev,noexec` |
| `/` | 30 Go | — |
| `/home` | 20 Go | `nosuid,nodev` |
| `/tmp` | 4 Go | `nosuid,nodev,noexec` |
| `/var` | 40 Go | `nosuid,nodev` |
| `/var/log` | 20 Go | `nosuid,nodev,noexec` |
| `/var/log/audit` | 5 Go | `nosuid,nodev,noexec` |
| `swap` | 8 Go | — |

L'ensemble (hors `/boot` et `/boot/efi`) repose sur **LVM** pour pouvoir redimensionner
les volumes à chaud.

### Premier démarrage

```bash
apt update && apt full-upgrade -y
apt install -y sudo vim curl nftables fail2ban unattended-upgrades \
               apt-listchanges needrestart auditd chrony
# Compte d'administration nominatif, membre de sudo
adduser tvalentin && usermod -aG sudo tvalentin
# Aucun paquet graphique ne doit être présent
dpkg -l | grep -Ei 'xserver|wayland|gnome|kde' || echo "OK : aucun paquet graphique"
```

## SSH sécurisé

### Clés ed25519

Sur mon poste d'administration, génération d'une paire de clés **ed25519** protégée par
une phrase de passe (algorithme moderne, clés courtes, résistant aux erreurs
d'implémentation de l'aléa qui affectent ECDSA) :

```bash
ssh-keygen -t ed25519 -a 100 -C "tvalentin@admin-laptop" -f ~/.ssh/homelab_ed25519
ssh-copy-id -i ~/.ssh/homelab_ed25519.pub tvalentin@192.168.20.10
# Vérifier la connexion par clé AVANT de désactiver les mots de passe !
ssh -i ~/.ssh/homelab_ed25519 tvalentin@192.168.20.10
```

`-a 100` augmente le nombre de tours de dérivation de la phrase de passe : une clé privée
volée est bien plus lente à attaquer par force brute.

### Configuration du démon

Les directives sont placées dans un fichier dédié, pour ne pas être écrasées par une mise
à jour du paquet :

```bash
# /etc/ssh/sshd_config.d/10-durcissement.conf
Port 22
AddressFamily inet
ListenAddress 192.168.20.10          # uniquement sur le VLAN d'administration

# Authentification
PermitRootLogin no                   # root ne se connecte jamais à distance
PasswordAuthentication no            # clés uniquement
KbdInteractiveAuthentication no
PermitEmptyPasswords no
PubkeyAuthentication yes
AuthenticationMethods publickey
AllowUsers tvalentin                 # liste blanche nominative
MaxAuthTries 3
LoginGraceTime 30

# Algorithmes (ANSSI : suites modernes uniquement)
HostKeyAlgorithms ssh-ed25519
PubkeyAcceptedAlgorithms ssh-ed25519
KexAlgorithms sntrup761x25519-sha512@openssh.com,curve25519-sha256
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com

# Réduction de surface
X11Forwarding no
AllowAgentForwarding no
AllowTcpForwarding no
PermitTunnel no
ClientAliveInterval 300
ClientAliveCountMax 2

# Traçabilité
LogLevel VERBOSE                     # journalise l'empreinte de la clé utilisée
Banner /etc/issue.net
```

On ne garde que la clé d'hôte ed25519 et on vérifie la syntaxe **avant** de redémarrer :

```bash
sudo rm /etc/ssh/ssh_host_{rsa,ecdsa}_key*
sudo sshd -t && sudo systemctl restart ssh
# Dans un SECOND terminal, sans fermer la session courante :
ssh -i ~/.ssh/homelab_ed25519 tvalentin@192.168.20.10
ssh -o PubkeyAuthentication=no tvalentin@192.168.20.10   # doit échouer : Permission denied (publickey)
ssh root@192.168.20.10                                    # doit échouer
```

## Pare-feu nftables

Politique d'entrée en **refus par défaut** : seul SSH depuis le VLAN d'administration est
autorisé.

```bash
#!/usr/sbin/nft -f
# /etc/nftables.conf
flush ruleset

table inet filter {
    set admin_net {
        type ipv4_addr; flags interval
        elements = { 192.168.20.0/24 }
    }

    chain input {
        type filter hook input priority filter; policy drop;
        ct state established,related accept
        ct state invalid drop
        iif "lo" accept
        ip protocol icmp icmp type { echo-request, destination-unreachable, time-exceeded } limit rate 5/second accept
        ip saddr @admin_net tcp dport 22 ct state new limit rate 10/minute accept
        log prefix "[nft-drop] " level info limit rate 10/minute
    }
    chain forward {
        type filter hook forward priority filter; policy drop;
    }
    chain output {
        type filter hook output priority filter; policy accept;
    }
}
```

```bash
sudo nft -c -f /etc/nftables.conf && sudo systemctl enable --now nftables
```

## fail2ban

Même limité au VLAN d'administration, SSH est protégé contre la force brute. Sous Debian
13, les journaux sont dans `journald` : on utilise donc le backend `systemd` et l'action
`nftables`.

```ini
# /etc/fail2ban/jail.local
[DEFAULT]
backend   = systemd
banaction = nftables-multiport
bantime   = 1h
bantime.increment = true         # récidive : 1 h, 2 h, 4 h…
bantime.maxtime   = 1w
findtime  = 10m
maxretry  = 3
ignoreip  = 127.0.0.1/8

[sshd]
enabled = true
port    = 22
mode    = aggressive             # détecte aussi les échanges de clés avortés
```

```bash
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd
```

## Mises à jour, journalisation et heure

- **`unattended-upgrades`** limité aux mises à jour de sécurité (`origin=Debian,codename=${distro_codename}-security`), avec redémarrage automatique à 4 h si le noyau l'exige.
- **`auditd`** avec des règles sur les fichiers sensibles (`/etc/passwd`, `/etc/shadow`, `/etc/sudoers`, `/etc/ssh/sshd_config.d/`) : toute modification est tracée.
- **`chrony`** synchronisé sur les serveurs NTP du pool français : sans heure fiable, les journaux sont inexploitables.
- **Journaux envoyés** vers le collecteur Syslog de mon homelab (`rsyslog` en TCP), pour qu'un attaquant ne puisse pas effacer ses traces localement.

## Paramètres noyau

```bash
# /etc/sysctl.d/90-durcissement.conf (extrait)
kernel.kptr_restrict = 2
kernel.dmesg_restrict = 1
kernel.yama.ptrace_scope = 1
net.ipv4.conf.all.rp_filter = 1             # anti-usurpation d'adresse source
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.tcp_syncookies = 1
net.ipv4.icmp_echo_ignore_broadcasts = 1
fs.protected_symlinks = 1
fs.protected_hardlinks = 1
```

## Contrôle final

Audit de conformité avec **Lynis** (`lynis audit system`) :

| Étape | Indice de durcissement Lynis |
| --- | --- |
| Installation Debian par défaut | 61 |
| Après SSH + nftables + fail2ban | 74 |
| Après partitionnement, sysctl, auditd, mises à jour auto | **83** |

Les avertissements restants ont été analysés un par un : certains sont acceptés et
documentés (par exemple l'absence d'antivirus, sans objet sur ce serveur sans utilisateur
interactif).

Et un scan externe depuis un autre VLAN confirme la surface d'exposition attendue :

```bash
nmap -sS -p- -T4 192.168.20.10       # depuis le VLAN utilisateurs → 0 port ouvert (filtered)
nmap -sV -p 22 192.168.20.10         # depuis le VLAN admin → 22/tcp open ssh OpenSSH
```

## Ce que j'en retiens

- Le durcissement est un **processus**, pas une case à cocher : mesurer (Lynis, Nmap), corriger, re-mesurer.
- **Toujours garder une session ouverte** lors d'une modification SSH ou pare-feu — et prévoir un accès console de secours.
- Chaque mesure doit être justifiée par un risque : c'est ce qui permet de l'expliquer à un jury ou à un responsable sécurité.
