import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pattern = '**/*.{md,mdx}';

/** Réalisations professionnelles présentées aux épreuves E4 / E5. */
const projets = defineCollection({
  loader: glob({ pattern, base: './src/content/projets' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    epreuve: z.enum(['E4', 'E5', 'E4/E5']),
    cadre: z.string(),
    contexte: z.string(),
    duree: z.string(),
    equipe: z.string(),
    competences: z.array(z.string()).min(1),
    technologies: z.array(z.string()).min(1),
    motsCles: z.array(z.string()).min(1),
    confidentialite: z.string().optional(),
    ordre: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

/** Documentation de l'infrastructure personnelle de test. */
const homelab = defineCollection({
  loader: glob({ pattern, base: './src/content/homelab' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).min(1),
    materiel: z.array(z.string()).default([]),
    ordre: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

/** Write-ups d'entraînement (Root-Me, plateformes légales). */
const writeups = defineCollection({
  loader: glob({ pattern, base: './src/content/writeups' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    plateforme: z.string(),
    categorie: z.string(),
    difficulte: z.enum(['Facile', 'Moyen', 'Difficile']),
    outils: z.array(z.string()).min(1),
    tags: z.array(z.string()).min(1),
    draft: z.boolean().default(false),
  }),
});

/** Veille technologique et réglementaire. */
const veille = defineCollection({
  loader: glob({ pattern, base: './src/content/veille' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    miseAJour: z.coerce.date().optional(),
    type: z.enum(['synthese', 'methodologie']),
    tags: z.array(z.string()).min(1),
    sources: z
      .array(z.object({ titre: z.string(), url: z.url() }))
      .default([]),
    ordre: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projets, homelab, writeups, veille };
