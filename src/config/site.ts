/**
 * Données d'identité centralisées : toute modification (e-mail, liens)
 * se fait ici et se répercute sur l'ensemble du site.
 * Un lien laissé à `null` n'est pas affiché.
 */
export const SITE = {
  author: 'Timothy Valentin',
  title: 'Timothy Valentin — Portfolio BTS SIO SISR',
  description:
    "Portfolio de Timothy Valentin, étudiant en BTS SIO option SISR : réalisations professionnelles E4/E5, homelab, pratique Root-Me et veille technologique. Recherche d'une alternance en cybersécurité.",
  role: 'Étudiant en BTS SIO — option SISR',
  lang: 'fr',
  email: 'timothy.valentins@gmail.com',
  github: {
    handle: 'timothy-valentin',
    url: 'https://github.com/timothy-valentin',
  },
  linkedin: null as { handle: string; url: string } | null,
  rootme: null as { handle: string; url: string } | null,
  certifications: [
    {
      titre: 'Introduction to Cybersecurity',
      organisme: 'Cisco Networking Academy',
      detail: "Badge d'initiation (6 h)",
    },
  ],
  outils: ['PuTTY (liaison série et SSH)', 'Cisco Packet Tracer', 'Proxmox VE', 'VirtualBox'],
  objectifs: [
    'Poursuite d’études en alternance dans la cybersécurité',
    'Analyste SOC junior',
    'Administration des systèmes et réseaux sécurisés',
  ],
};

export const NAV = [
  { href: '', label: 'Accueil' },
  { href: 'projets/', label: 'Projets E4/E5' },
  { href: 'homelab/', label: 'Homelab' },
  { href: 'writeups/', label: 'Root-Me' },
  { href: 'veille/', label: 'Veille' },
  { href: 'contact/', label: 'Contact' },
] as const;
