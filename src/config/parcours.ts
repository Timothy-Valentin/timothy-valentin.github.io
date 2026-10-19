/** Parcours : formation, expériences, certifications et entraînement. */
import { SITE } from './site';

export interface Etape {
  titre: string;
  lieu?: string;
  periode?: string;
  detail: string;
  enCours?: boolean;
  /** Fiche de réalisation associée (identifiant). */
  fiche?: string;
  /** Document publié dans /public. */
  rapport?: string;
}

export const FORMATION: Etape[] = [
  {
    titre: 'BTS SIO — option SISR',
    lieu: SITE.ecole,
    periode: '2025 – 2027',
    detail: '2e année en cours. Solutions d’Infrastructure, Systèmes et Réseaux.',
    enCours: true,
  },
  {
    titre: 'Licence Métiers de la forme',
    detail: 'En alternance chez SD Sport et Santé, comme préparateur physique.',
  },
  {
    titre: 'DEUST Métiers de la forme',
    detail: 'Stages de coach sportif en 1re année (Gymnasia, Tournefeuille) puis en 2e année (L’Orange Bleue, Saint-Lys).',
  },
];

export const EXPERIENCES: Etape[] = [
  {
    titre: 'Stage de 1re année — Ministère de la Justice (DIT)',
    lieu: 'Toulouse (Jolimont)',
    periode: 'Mai – juin 2026 · 5 semaines',
    detail: 'Recueil des besoins et proposition d’infrastructure pour un bâtiment judiciaire, soutenance devant un jury de spécialistes, maquette physique et résolution de pannes réseau.',
    fiche: 'deploiement-reseau-nouveau-batiment-justice',
    rapport: 'documents/rapport-de-stage-ministere-justice.pdf',
  },
  {
    titre: 'Alternance — Préparateur physique, SD Sport et Santé',
    periode: 'Licence Métiers de la forme',
    detail: 'Préparation physique et coaching de particuliers comme de sportifs professionnels, en football et dans d’autres disciplines.',
  },
  {
    titre: 'Stage — Coach sportif, L’Orange Bleue',
    lieu: 'Saint-Lys',
    periode: 'DEUST Métiers de la forme, 2e année',
    detail: 'Stage de coach sportif en salle de sport, en 2e année de DEUST.',
  },
  {
    titre: 'Stage — Coach sportif, Gymnasia',
    lieu: 'Tournefeuille',
    periode: 'DEUST Métiers de la forme, 1re année',
    detail: 'Stage de coach sportif en salle de sport.',
  },
];

export const ENTRAINEMENT = [
  {
    titre: 'Introduction to Cybersecurity',
    source: 'Cisco Networking Academy',
    detail: 'Badge d’initiation (6 h).',
    icone: 'award',
  },
  {
    titre: 'Root-Me',
    source: `Pseudo « ${SITE.rootme.handle} »`,
    detail: '8 challenges validés, catégorie Réseau.',
    icone: 'flag',
    lien: SITE.rootme.url,
    fiche: 'root-me-analyse-protocoles-en-clair',
  },
  {
    titre: 'TryHackMe',
    source: `Pseudo « ${SITE.tryhackme.handle} »`,
    detail: '6 salles terminées, dont Junior Security Analyst Intro, Defensive Security Intro, What is Networking? et Careers in Cyber.',
    icone: 'target',
    lien: SITE.tryhackme.url,
  },
] as const;

/** Durée totale de stage en informatique (semaines), pour le contrôle des 10 semaines exigées. */
export const SEMAINES_STAGE_INFO = 5;
