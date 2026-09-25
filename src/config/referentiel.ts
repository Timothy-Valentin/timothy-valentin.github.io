/**
 * Compétences du référentiel BTS SIO (option SISR).
 * Chaque réalisation déclare les compétences qu'elle mobilise (clés ci-dessous) ;
 * le tableau de synthèse de la page « Compétences » est généré à partir de ces données.
 */
export const BLOCS = [
  {
    id: 'bloc1',
    titre: 'Bloc 1 — Support et mise à disposition de services informatiques',
    competences: [
      { id: 'patrimoine', label: 'Gérer le patrimoine informatique' },
      { id: 'incidents', label: 'Répondre aux incidents et aux demandes d’assistance et d’évolution' },
      { id: 'presence', label: 'Développer la présence en ligne de l’organisation' },
      { id: 'projet', label: 'Travailler en mode projet' },
      { id: 'service', label: 'Mettre à disposition des utilisateurs un service informatique' },
      { id: 'devpro', label: 'Organiser son développement professionnel' },
    ],
  },
  {
    id: 'bloc2',
    titre: 'Bloc 2 — Administration des systèmes et des réseaux (option SISR)',
    competences: [
      { id: 'concevoir', label: 'Concevoir une solution d’infrastructure réseau' },
      { id: 'deployer', label: 'Installer, tester et déployer une solution d’infrastructure réseau' },
      { id: 'exploiter', label: 'Exploiter, dépanner et superviser une solution d’infrastructure réseau' },
    ],
  },
  {
    id: 'bloc3',
    titre: 'Bloc 3 — Cybersécurité des services informatiques',
    competences: [
      { id: 'donnees', label: 'Protéger les données à caractère personnel' },
      { id: 'identite', label: 'Préserver l’identité numérique de l’organisation' },
      { id: 'usages', label: 'Sécuriser les équipements et les usages des utilisateurs' },
      {
        id: 'dic',
        label:
          'Garantir la disponibilité, l’intégrité et la confidentialité des services informatiques et des données de l’organisation face à des cyberattaques',
      },
      { id: 'infra', label: 'Assurer la cybersécurité d’une infrastructure réseau, d’un système, d’un service' },
    ],
  },
] as const;

export type CompetenceId = (typeof BLOCS)[number]['competences'][number]['id'];

export const COMPETENCE_IDS = BLOCS.flatMap((b) => b.competences.map((c) => c.id)) as [
  CompetenceId,
  ...CompetenceId[],
];

export function competenceLabel(id: CompetenceId): string {
  for (const bloc of BLOCS) {
    const c = bloc.competences.find((x) => x.id === id);
    if (c) return c.label;
  }
  return id;
}

export function blocOf(id: CompetenceId): string {
  return BLOCS.find((b) => b.competences.some((c) => c.id === id))?.id ?? '';
}

/** Contextes de réalisation. */
export const CONTEXTES = {
  stage: 'En entreprise',
  formation: 'En formation',
  personnel: 'Projet personnel',
} as const;

export type Contexte = keyof typeof CONTEXTES;
