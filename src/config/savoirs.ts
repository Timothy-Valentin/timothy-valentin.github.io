/**
 * Savoirs du bloc 1 (S1 à S18), tels que suivis dans mon dépôt de suivi pédagogique
 * (fork de lynjadev/btssio). Un savoir n'est marqué « validé » que s'il l'est dans ce suivi.
 * `fiches` : identifiants des fiches de réalisation qui servent de preuve.
 */
export interface Savoir {
  code: string;
  titre: string;
  detail: string;
  valide: boolean;
  preuve?: string;
  fiches?: string[];
  liens?: { label: string; href: string }[];
}

export interface Activite {
  code: string;
  titre: string;
  savoirs: Savoir[];
}

export const SUIVI_PEDAGOGIQUE = 'https://github.com/Timothy-Valentin/btssio/blob/main/competences_acquises.md';

export const ACTIVITES: Activite[] = [
  {
    code: '1.1',
    titre: 'Gérer le patrimoine informatique',
    savoirs: [
      {
        code: 'S1', titre: 'Patrimoine informatique', valide: true,
        detail: 'Outils de gestion et de recensement des actifs (CMDB), composants matériels et logiciels.',
        preuve: 'TP GLPI : installation du serveur et inventaire du parc (ordinateurs, logiciels, matériels réseau).',
        fiches: ['installation-glpi-ubuntu'],
      },
      {
        code: 'S2', titre: 'Systèmes d’exploitation et habilitations', valide: true,
        detail: 'Comptes utilisateurs, droits d’accès, privilèges, groupes et politiques d’authentification.',
        preuve: 'Comptes, groupes, unités d’organisation et GPO dans Active Directory ; comptes utilisateurs et administrateur dans GLPI ; compte en lecture seule dans Graylog.',
        fiches: ['reseau-entreprise-proxmox-ad-pfsense', 'installation-glpi-ubuntu', 'centralisation-logs-graylog-opensearch'],
      },
      {
        code: 'S3', titre: 'Disponibilité et continuité d’activité', valide: false,
        detail: 'Enjeux de la disponibilité, plans de continuité (PCA) et de reprise d’activité (PRA).',
      },
      {
        code: 'S4', titre: 'Sauvegardes et restaurations', valide: true,
        detail: 'Typologies de sauvegarde, supports, stratégies et tests de restauration.',
        preuve: 'Sauvegarde des machines virtuelles depuis Proxmox VE, puis copie sur mon ordinateur personnel pour disposer d’un exemplaire hors du serveur. Test de restauration : à réaliser.',
        fiches: ['reseau-entreprise-proxmox-ad-pfsense'],
      },
      {
        code: 'S5', titre: 'Cadre juridique et contractuel du patrimoine', valide: false,
        detail: 'Licences logicielles, contrats de prestation, archivage, charte informatique.',
      },
    ],
  },
  {
    code: '1.2',
    titre: 'Répondre aux incidents et aux demandes d’assistance et d’évolution',
    savoirs: [
      {
        code: 'S6', titre: 'Gestion des incidents et assistance', valide: true,
        detail: 'Outils de ticketing, cycle de traitement des demandes, ITIL, bases de connaissances.',
        preuve: 'TP GLPI : tickets de gravités différentes créés par des utilisateurs depuis plusieurs postes, puis traités avec le compte administrateur.',
        fiches: ['installation-glpi-ubuntu'],
      },
      {
        code: 'S7', titre: 'Diagnostic et résolution', valide: true,
        detail: 'Analyse causale de panne, recherche de causes racines, outils de diagnostic.',
        preuve: 'Stage : pannes injectées sur une maquette physique, diagnostic par couches du modèle OSI ; résolution d’une panne de démarrage liée au processeur (Graylog).',
        fiches: ['deploiement-reseau-nouveau-batiment-justice', 'centralisation-logs-graylog-opensearch'],
      },
      {
        code: 'S8', titre: 'Fondamentaux des réseaux', valide: true,
        detail: 'Modèles OSI et TCP/IP, adressage IP, sous-réseaux, routage, DNS.',
        preuve: 'VLAN, routage inter-VLAN, adressage et DHCP sur Packet Tracer ; DNS et DHCP du domaine.',
        fiches: ['modelisation-packet-tracer-vlan', 'reseau-entreprise-proxmox-ad-pfsense'],
      },
      {
        code: 'S9', titre: 'Systèmes et virtualisation', valide: true,
        detail: 'Systèmes clients et serveurs (Linux, Windows), principes de la virtualisation.',
        preuve: 'Installation de Proxmox VE et création de machines virtuelles Debian, Ubuntu et Kali ; clients Windows et Ubuntu, Windows Server.',
        fiches: ['serveurs-reconditionnes-proxmox', 'reseau-entreprise-proxmox-ad-pfsense'],
      },
      {
        code: 'S10', titre: 'Développement et automatisation système', valide: false,
        detail: 'Algorithmique de base, scripts d’administration (Bash, PowerShell).',
      },
      {
        code: 'S11', titre: 'Niveaux de service (SLA)', valide: false,
        detail: 'Contrats d’assistance, indicateurs GTR/GTI, obligations de moyens et de résultats.',
      },
    ],
  },
  {
    code: '1.3',
    titre: 'Développer la présence en ligne de l’organisation',
    savoirs: [
      {
        code: 'S12', titre: 'Technologies et programmation Web', valide: true,
        detail: 'HTML/CSS, langages client et serveur, CMS, référencement.',
        preuve: 'Bases de HTML et de CSS apprises en cours ; première version de mon portfolio commencée avec WordPress, puis abandonnée au profit d’un site statique publié sur GitHub Pages. À approfondir : langages côté serveur, requêtage de données, référencement.',
        fiches: ['portfolio-github-pages'],
      },
      {
        code: 'S13', titre: 'Cadre économique et juridique du Web', valide: false,
        detail: 'E-réputation, mentions légales, CGU, RGPD appliqué au web, noms de domaine.',
      },
    ],
  },
  {
    code: '1.4',
    titre: 'Travailler en mode projet',
    savoirs: [
      {
        code: 'S14', titre: 'Gestion de projet', valide: false,
        detail: 'Planification (cycle en V, Gantt) et démarches agiles (Scrum, Kanban).',
      },
      {
        code: 'S15', titre: 'Outils de suivi de projet', valide: false,
        detail: 'Tableaux de bord de projet, calcul des charges, indicateurs d’avancement.',
      },
    ],
  },
  {
    code: '1.5',
    titre: 'Mettre à disposition des utilisateurs un service informatique',
    savoirs: [
      {
        code: 'S16', titre: 'Architecture et déploiement de services', valide: true,
        detail: 'Composants d’un service, protocoles associés, outils de déploiement.',
        preuve: 'Déploiement de Graylog, OpenSearch et MongoDB en conteneurs avec Docker Compose ; services AD DS, DNS et DHCP.',
        fiches: ['centralisation-logs-graylog-opensearch', 'reseau-entreprise-proxmox-ad-pfsense'],
      },
      {
        code: 'S17', titre: 'Validation et recette', valide: false,
        detail: 'Jeux d’essais, tests d’acceptation, procès-verbal de recette.',
      },
    ],
  },
  {
    code: '1.6',
    titre: 'Organiser son développement professionnel',
    savoirs: [
      {
        code: 'S18', titre: 'Veille et développement de carrière', valide: true,
        detail: 'Méthodes de veille, outils de curation, identité numérique professionnelle.',
        preuve: 'Veille sur les passkeys, méthode de veille et fil d’actualités automatisé ; identité professionnelle : portfolio, GitHub, LinkedIn.',
        liens: [
          { label: 'Veille', href: 'veille/' },
          { label: 'GitHub', href: 'https://github.com/Timothy-Valentin' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/timothyvalentin/' },
        ],
      },
    ],
  },
];

export const TOUS_SAVOIRS = ACTIVITES.flatMap((a) => a.savoirs);
