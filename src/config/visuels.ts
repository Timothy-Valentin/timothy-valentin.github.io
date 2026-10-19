/**
 * Apparence des fiches : icône de chaque réalisation et couleur de chaque contexte.
 * Une fiche absente de la liste reçoit l'icône par défaut.
 */
import {
  Award, Flag, Globe, HardDrive, Landmark, LifeBuoy, Network, ScrollText, SquareTerminal, Target, Waypoints,
} from '@lucide/astro';
import type { Contexte } from './referentiel';

export const ICONES = {
  'deploiement-reseau-nouveau-batiment-justice': Landmark,
  'reseau-entreprise-proxmox-ad-pfsense': Network,
  'centralisation-logs-graylog-opensearch': ScrollText,
  'installation-glpi-ubuntu': LifeBuoy,
  'modelisation-packet-tracer-vlan': Waypoints,
  'serveurs-reconditionnes-proxmox': HardDrive,
  'administration-console-ssh-putty': SquareTerminal,
  'root-me-analyse-protocoles-en-clair': Flag,
  'portfolio-github-pages': Globe,
} as const;

export const ICONES_DIVERS = { award: Award, flag: Flag, target: Target } as const;

export function iconeFiche(id: string) {
  return ICONES[id as keyof typeof ICONES] ?? Network;
}

/** Classe CSS de couleur associée à chaque contexte (voir global.css). */
export const TEINTE: Record<Contexte, string> = {
  stage: 'teinte-stage',
  formation: 'teinte-formation',
  personnel: 'teinte-perso',
};
