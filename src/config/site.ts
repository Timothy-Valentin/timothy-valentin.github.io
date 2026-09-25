/**
 * Données d'identité centralisées : toute modification (e-mail, liens,
 * empreinte PGP) se fait ici et se répercute sur l'ensemble du site.
 */
export const SITE = {
  author: 'Timothy Valentin',
  title: 'Timothy Valentin — Portfolio SISR & Cybersécurité',
  shortTitle: 'timothy.valentin',
  description:
    "Portfolio technique de Timothy Valentin, étudiant BTS SIO option SISR : réseaux, administration système, virtualisation et sécurité défensive. Réalisations E4/E5, homelab, write-ups Root-Me et veille Zero Trust.",
  role: 'Étudiant BTS SIO — option SISR',
  tagline: 'Réseaux, administration système & sécurité défensive',
  location: 'France',
  lang: 'fr',
  email: 'timothy.valentins@gmail.com',
  github: {
    handle: 'valentin-timothy',
    url: 'https://github.com/valentin-timothy',
  },
  linkedin: {
    handle: 'timothy-valentin',
    url: 'https://www.linkedin.com/in/timothy-valentin',
  },
  rootme: {
    handle: 'TimothyValentin',
    url: 'https://www.root-me.org/TimothyValentin',
  },
  pgp: {
    file: 'pgp/timothy-valentin.asc',
    algorithm: 'ed25519 (signature) / cv25519 (chiffrement)',
    fingerprint: '7C3E 91A4 5D08 B2F6 1E4A  C9D7 3B85 60F2 A1D4 E729',
    keyId: '0x3B8560F2A1D4E729',
    created: '2026-09-01',
    expires: '2028-09-01',
  },
  objectives: [
    'Analyste SOC junior',
    'Administrateur systèmes & réseaux sécurisés',
    'Licence pro / école d’ingénieurs en cybersécurité',
  ],
} as const;

export const NAV = [
  { href: '', label: 'Accueil' },
  { href: 'projets/', label: 'Projets E4/E5' },
  { href: 'homelab/', label: 'Homelab' },
  { href: 'writeups/', label: 'Write-ups' },
  { href: 'veille/', label: 'Veille' },
  { href: 'contact/', label: 'Contact' },
] as const;
