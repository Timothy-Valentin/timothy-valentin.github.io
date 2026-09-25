import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { COMPETENCE_IDS } from './config/referentiel';

const pattern = '**/*.{md,mdx}';

/** Toutes les réalisations : stage, formation et projets personnels. */
const realisations = defineCollection({
  loader: glob({ pattern, base: './src/content/realisations' }),
  schema: z.object({
    title: z.string(),
    /** Titre court pour les cartes et le tableau de synthèse. */
    court: z.string(),
    description: z.string(),
    contexte: z.enum(['stage', 'formation', 'personnel']),
    cadre: z.string(),
    periode: z.string(),
    competences: z.array(z.enum(COMPETENCE_IDS)).min(1),
    outils: z.array(z.string()).min(1),
    /** Lien vers la documentation détaillée (Google Docs du TP…), affiché s'il est renseigné. */
    documentation: z.url().optional(),
    confidentialite: z.string().optional(),
    ordre: z.number(),
    draft: z.boolean().default(false),
  }),
});

/** Veille technologique et réglementaire. */
const veille = defineCollection({
  loader: glob({ pattern, base: './src/content/veille' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    miseAJour: z.coerce.date(),
    type: z.enum(['synthese', 'methodologie']),
    tags: z.array(z.string()).min(1),
    sources: z.array(z.object({ titre: z.string(), url: z.url() })).default([]),
    ordre: z.number(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { realisations, veille };
