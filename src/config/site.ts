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
  rootme: { handle: 'TimothyValentin', url: 'https://www.root-me.org/TimothyValentin' },
  tryhackme: { handle: 'TimothyValentin', url: 'https://tryhackme.com/p/TimothyValentin' },
  linkedin: { handle: 'timothyvalentin', url: 'https://www.linkedin.com/in/timothyvalentin/' } as {
    handle: string;
    url: string;
  } | null,
  /** Chemin du CV dans /public (ex. 'cv-timothy-valentin.pdf'), ou null tant qu'il n'est pas prêt. */
  cv: 'cv-timothy-valentin.pdf' as string | null,
  recherche: [
    'Stage de 2e année de BTS SIO',
    'Alternance en cybersécurité pour la rentrée 2027 (SOC, administration systèmes et réseaux sécurisés)',
  ],
  /** Version courte de la recherche, pour les pastilles de l'accueil. */
  rechercheCourte: ['Stage de 2e année', 'Alternance en cybersécurité — rentrée 2027'],
};

export const NAV = [
  { href: 'realisations/', label: 'Réalisations' },
  { href: 'competences/', label: 'Compétences' },
  { href: 'parcours/', label: 'Parcours' },
  { href: 'veille/', label: 'Veille' },
] as const;
