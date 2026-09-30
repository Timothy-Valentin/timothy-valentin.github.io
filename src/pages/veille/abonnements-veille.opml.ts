import type { APIRoute } from 'astro';
import { SOURCES, type Categorie } from '@/config/veille-sources';

const DOSSIERS: Record<Categorie, string> = {
  officiel: 'Sources officielles',
  presse: 'Presse spécialisée',
  editeur: 'Éditeurs et standards',
};

const xml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Abonnements de veille au format OPML, importable dans Inoreader, Feedly, Thunderbird… */
export const GET: APIRoute = () => {
  const dossiers = (Object.keys(DOSSIERS) as Categorie[])
    .map((c) => {
      const flux = SOURCES.filter((s) => s.categorie === c)
        .map((s) => `      <outline type="rss" text="${xml(s.nom)}" title="${xml(s.nom)}" xmlUrl="${xml(s.flux)}" htmlUrl="${xml(s.site)}"/>`)
        .join('\n');
      return `    <outline text="${xml(DOSSIERS[c])}" title="${xml(DOSSIERS[c])}">\n${flux}\n    </outline>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head>
    <title>Veille technologique — Timothy Valentin</title>
  </head>
  <body>
  <outline text="Veille — Passkeys et cybersécurité" title="Veille — Passkeys et cybersécurité">
${dossiers}
  </outline>
  </body>
</opml>
`;
  return new Response(body, { headers: { 'Content-Type': 'text/x-opml; charset=utf-8' } });
};
