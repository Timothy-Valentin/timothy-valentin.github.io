---
title: "Les passkeys : vers la fin des mots de passe ?"
description: "Pourquoi les mots de passe posent problème, comment fonctionne une passkey (clé d'accès), ce qu'elle apporte contre l'hameçonnage et les fuites de données, ses limites, et son arrivée en entreprise."
miseAJour: 2026-09-28
type: synthese
tags:
  - Passkeys
  - FIDO2
  - Authentification
  - MFA
  - Hameçonnage
  - ANSSI
  - CNIL
sources:
  - titre: "FIDO Alliance — Passkeys (présentation)"
    url: "https://fidoalliance.org/passkeys/"
  - titre: "passkeys.dev — Documentation de référence"
    url: "https://passkeys.dev/"
  - titre: "ANSSI — Recommandations relatives à l'authentification multifacteur et aux mots de passe (octobre 2021)"
    url: "https://messervices.cyber.gouv.fr/guides/recommandations-relatives-lauthentification-multifacteur-et-aux-mots-de-passe"
  - titre: "CNIL — Mots de passe : recommandations pour maîtriser sa sécurité (2022)"
    url: "https://www.cnil.fr/fr/mots-de-passe-recommandations-pour-maitriser-sa-securite"
  - titre: "Apple — Apple, Google et Microsoft s'engagent sur le standard FIDO (5 mai 2022)"
    url: "https://www.apple.com/newsroom/2022/05/apple-google-and-microsoft-commit-to-expanded-support-for-fido-standard/"
  - titre: "Microsoft Security Blog — Les nouveaux comptes Microsoft sans mot de passe par défaut (mai 2025)"
    url: "https://www.microsoft.com/en-us/security/blog/2025/05/01/pushing-passkeys-forward-microsofts-latest-updates-for-simpler-safer-sign-ins/"
  - titre: "FIDO Alliance — State of Passkeys 2026 (7 mai 2026)"
    url: "https://fidoalliance.org/fido-alliance-reports-accelerating-global-passkey-adoption-on-world-passkey-day-2026/"
  - titre: "GitHub Docs — À propos des passkeys"
    url: "https://docs.github.com/en/authentication/authenticating-with-a-passkey/about-passkeys"
ordre: 1
---

> Cette fiche est le produit de ma veille. La démarche suivie (sources, outils, organisation)
> est décrite dans la fiche [Méthodologie et outils de veille](../methodologie-outils-veille/).

## Pourquoi ce sujet de veille ?

Tout le monde utilise des mots de passe, tous les jours, et c'est pourtant l'un des points faibles
les plus exploités : mots de passe trop simples, réutilisés d'un site à l'autre, volés par
hameçonnage ou dans des fuites de bases de données.

Depuis 2022, les grands acteurs du numérique (Apple, Google, Microsoft) poussent une alternative :
les **passkeys**, ou **clés d'accès** en français. C'est un changement que chacun peut constater
sur son téléphone ou son ordinateur, et qui concerne directement un futur administrateur systèmes
et réseaux : l'authentification des utilisateurs fait partie de son travail quotidien.

## Le problème des mots de passe

| Problème | Conséquence |
| --- | --- |
| Mots de passe faibles | Devinés par force brute ou avec des listes de mots de passe courants |
| Réutilisation | Un mot de passe volé sur un site ouvre les autres comptes |
| Hameçonnage | L'utilisateur tape lui-même son mot de passe sur un faux site |
| Fuites de données | Le site stocke une empreinte du mot de passe, qui peut être volée puis cassée |
| Oublis | Réinitialisations fréquentes, charge pour le support informatique |

Les solutions habituelles réduisent ces risques sans les supprimer :

- le **gestionnaire de mots de passe** permet des mots de passe longs et uniques, mais il reste des mots de passe ;
- la **double authentification (MFA)** par SMS ou par code à usage unique ajoute une protection, mais un faux site bien conçu peut demander aussi le code et l'utiliser aussitôt.

## Qu'est-ce qu'une passkey ?

Une passkey remplace le mot de passe par une **paire de clés cryptographiques**, créée pour
**un seul site** :

- une **clé privée**, qui reste sur l'appareil de l'utilisateur (téléphone, ordinateur, clé de sécurité USB) et ne lui est jamais envoyée ;
- une **clé publique**, envoyée au site lors de l'inscription.

C'est le même principe que l'authentification **SSH par clé** : le serveur connaît la clé
publique, et seul celui qui possède la clé privée peut prouver son identité.

Les passkeys reposent sur des **standards ouverts** : **FIDO2**, défini par la FIDO Alliance, et
**WebAuthn**, défini par le W3C (l'organisme qui normalise le Web). Elles fonctionnent donc sur
tous les systèmes et navigateurs récents.

### Comment se passe une connexion ?

1. L'utilisateur choisit « Se connecter avec une passkey ».
2. Le site envoie un **défi** : une donnée aléatoire, différente à chaque connexion.
3. L'appareil demande à l'utilisateur de le **déverrouiller** : empreinte digitale, reconnaissance faciale ou code PIN.
4. L'appareil **signe** le défi avec la clé privée et renvoie la signature.
5. Le site vérifie la signature avec la clé publique : si elle est valide, l'utilisateur est connecté.

L'empreinte digitale ou le visage servent **uniquement à déverrouiller l'appareil** : ils ne
quittent jamais celui-ci et ne sont jamais transmis au site.

### Deux facteurs en un seul geste

Une connexion par passkey combine :

- **ce que je possède** : l'appareil qui contient la clé privée ;
- **ce que je suis ou ce que je sais** : l'empreinte, le visage ou le code PIN qui le déverrouille.

C'est pourquoi des services comme GitHub considèrent qu'une passkey remplace à la fois le mot de
passe **et** la double authentification.

## Ce que les passkeys apportent

| Menace | Mot de passe | Passkey |
| --- | --- | --- |
| Mot de passe faible ou deviné | Possible | Impossible : la clé est générée par l'appareil |
| Réutilisation sur plusieurs sites | Fréquente | Impossible : une passkey différente par site |
| Hameçonnage (faux site) | L'utilisateur donne son mot de passe | La passkey ne fonctionne que sur le vrai site |
| Fuite de la base de données du site | Empreintes de mots de passe à casser | Seulement des clés publiques, inutilisables |
| Oubli | Réinitialisation nécessaire | Rien à retenir |

**Pourquoi l'hameçonnage ne fonctionne plus :** chaque passkey est liée au **nom de domaine**
du site pour lequel elle a été créée. Sur un faux site à l'adresse proche, le navigateur ne
propose tout simplement pas la passkey : l'utilisateur ne peut pas la donner par erreur.

## Où sont stockées les passkeys ?

- **Passkeys synchronisées** : elles sont sauvegardées dans un gestionnaire (trousseau iCloud, gestionnaire de mots de passe de Google, ou gestionnaire indépendant) et disponibles sur tous les appareils du même compte. C'est le cas le plus courant pour le grand public.
- **Passkeys liées à un appareil** : elles restent sur une **clé de sécurité physique** (clé USB FIDO2) et ne peuvent pas être copiées. C'est la solution privilégiée pour les comptes sensibles, comme les comptes d'administration.

Il est aussi possible d'utiliser la passkey de son téléphone pour se connecter sur un
ordinateur : le site affiche un **QR code**, que l'on scanne avec le téléphone, qui doit se
trouver à proximité.

## Les limites

- **Perte de l'appareil** : avec des passkeys synchronisées, elles restent disponibles sur les autres appareils. Avec une clé physique unique, il faut prévoir une **seconde clé** ou un moyen de récupération.
- **Dépendance à un écosystème** : les passkeys synchronisées sont souvent liées au compte Apple, Google ou Microsoft de l'utilisateur, et passer de l'un à l'autre n'est pas encore toujours simple.
- **Adoption partielle** : tous les sites ne proposent pas encore les passkeys, et beaucoup gardent le mot de passe comme solution de secours. Tant qu'il existe, un attaquant peut encore le viser.
- **Le moyen de récupération devient le point faible** : si un compte peut être récupéré par un simple SMS ou e-mail, c'est cette procédure qu'un attaquant tentera d'abuser.

## Ce qu'en disent l'ANSSI et la CNIL

- L'**ANSSI**, dans ses recommandations sur l'authentification multifacteur et les mots de passe (2021), recommande de **privilégier l'authentification multifacteur** et les facteurs de **possession**, en partant d'une analyse de risque.
- La **CNIL**, dans sa recommandation de 2022 sur les mots de passe, fixe des règles minimales lorsqu'un mot de passe est utilisé, mais encourage à mettre en place une **authentification forte** lorsque c'est possible.

Les passkeys vont dans le sens de ces deux recommandations : un facteur de possession, protégé
par un second facteur, sans mot de passe à retenir.

## Et en entreprise ?

Pour un administrateur, les passkeys existent aussi dans les environnements professionnels :

- **Windows Hello Entreprise** permet d'ouvrir sa session Windows avec un code PIN ou la biométrie, sur le même principe de clé privée stockée dans l'ordinateur ;
- **Microsoft Entra ID** (l'annuaire cloud de Microsoft 365) accepte les passkeys et les clés de sécurité FIDO2 pour la connexion des salariés ;
- les **comptes d'administration** sont les premiers à protéger avec des clés de sécurité physiques, car ce sont les plus recherchés par les attaquants.

Le déploiement demande de la préparation : inventaire des applications compatibles, choix entre
passkeys synchronisées et clés physiques, procédure en cas de perte, et information des
utilisateurs.

## Démonstration

Les passkeys se testent facilement sur un compte GitHub :

1. **Settings › Password and authentication › Passkeys › Add a passkey** ;
2. Windows propose d'enregistrer la passkey avec **Windows Hello** (code PIN ou biométrie) ;
3. se déconnecter, puis choisir **Sign in with a passkey** : la connexion se fait sans saisir de mot de passe ni de code de double authentification.

## Fil d'actualité de ma veille

| Date | Source | Événement |
| --- | --- | --- |
| 5 mai 2022 | Apple, Google, Microsoft | Engagement commun à généraliser la connexion sans mot de passe basée sur le standard FIDO |
| Juillet 2022 | CNIL | Nouvelle recommandation sur les mots de passe, qui encourage l'authentification forte |
| Mai 2025 | Microsoft | Les nouveaux comptes Microsoft sont créés **sans mot de passe** par défaut |
| 7 mai 2026 | FIDO Alliance | Rapport « State of Passkeys 2026 » : environ **5 milliards** de passkeys utilisées dans le monde ; 75 % des personnes interrogées en ont activé au moins une |

## Analyse personnelle

- Les passkeys règlent **le problème de l'utilisateur** (retenir des mots de passe) et **celui de la sécurité** (hameçonnage, réutilisation) en même temps. C'est rare, et c'est ce qui explique leur adoption rapide.
- Elles ne suppriment pas le travail de l'administrateur, elles le déplacent : **gérer les appareils**, les **clés de sécurité**, et surtout sécuriser les **procédures de récupération** de compte.
- Pendant la transition, les mots de passe restent souvent en secours : les bonnes pratiques (mots de passe longs, uniques, double authentification) restent donc nécessaires.

## Conclusion

Les passkeys ne font pas disparaître les mots de passe du jour au lendemain, mais elles offrent
pour la première fois une solution à la fois **plus simple** et **plus sûre**. Pour un futur
administrateur systèmes et réseaux, comprendre leur fonctionnement et savoir les déployer, en
particulier pour protéger les comptes d'administration, sera une compétence de plus en plus
demandée.
