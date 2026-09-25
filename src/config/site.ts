/**
 * Données d'identité centralisées. Un champ laissé à `null` n'est pas affiché.
 */
export const SITE = {
  author: 'Timothy Valentin',
  title: 'Timothy Valentin — Portfolio BTS SIO SISR',
  description:
    'Portfolio de Timothy Valentin, étudiant en 2e année de BTS SIO option SISR au lycée Henri Matisse (Cugnaux) : réalisations, tableau de synthèse des compétences et veille technologique.',
  role: 'Étudiant en 2e année de BTS SIO — option SISR',
  ecole: 'Lycée Henri Matisse, Cugnaux (31)',
  lang: 'fr',
  email: 'timothy.valentins@gmail.com',
  github: { handle: 'timothy-valentin', url: 'https://github.com/timothy-valentin' },
  rootme: { handle: 'Petitprince', url: 'https://www.root-me.org/Petitprince' },
  linkedin: null as { handle: string; url: string } | null,
  /** Chemin du CV dans /public (ex. 'cv-timothy-valentin.pdf'), ou null tant qu'il n'est pas prêt. */
  cv: null as string | null,
  recherche: [
    'Stage de 2e année de BTS SIO',
    'Alternance en cybersécurité pour la rentrée 2027 (SOC, administration systèmes et réseaux sécurisés)',
  ],
};

export const NAV = [
  { href: '', label: 'Accueil' },
  { href: 'parcours/', label: 'Parcours' },
  { href: 'realisations/', label: 'Réalisations' },
  { href: 'competences/', label: 'Compétences' },
  { href: 'veille/', label: 'Veille' },
  { href: 'contact/', label: 'Contact' },
] as const;
