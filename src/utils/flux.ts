import { XMLParser } from 'fast-xml-parser';
import { MOTS_CLES_FORTS, MOTS_CLES_LARGES, SOURCES, type Source } from '../config/veille-sources.ts';

export interface Article {
  titre: string;
  lien: string;
  date: Date;
  resume: string;
  source: Source;
}

export interface Collecte {
  articles: Article[];
  enEchec: Source[];
  date: Date;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@',
  htmlEntities: true,
  textNodeName: '#text',
});

const liste = <T>(v: T | T[] | undefined): T[] => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

/** Texte brut d'un nœud XML (chaîne, CDATA ou objet avec #text), sans balises HTML. */
function texte(v: unknown): string {
  const brut = typeof v === 'object' && v !== null ? String((v as Record<string, unknown>)['#text'] ?? '') : String(v ?? '');
  return decoderEntites(brut.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

const ENTITES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', laquo: '«', raquo: '»',
  hellip: '…', ndash: '–', mdash: '—', eacute: 'é', egrave: 'è', agrave: 'à', ccedil: 'ç',
};

/** Décode les entités HTML restantes (certains flux les encodent deux fois). */
function decoderEntites(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (tout, e: string) => {
    if (e[0] === '#') {
      const code = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : tout;
    }
    return ENTITES[e.toLowerCase()] ?? tout;
  });
}

function lienAtom(link: unknown): string {
  const liens = liste(link as Record<string, string> | Record<string, string>[]);
  const alt = liens.find((l) => !l['@rel'] || l['@rel'] === 'alternate') ?? liens[0];
  return alt?.['@href'] ?? '';
}

async function lireFlux(source: Source): Promise<Article[]> {
  const rep = await fetch(source.flux, {
    headers: { 'User-Agent': 'Mozilla/5.0 (portfolio de veille de Timothy Valentin)' },
    signal: AbortSignal.timeout(15000),
  });
  if (!rep.ok) throw new Error(`HTTP ${rep.status}`);
  const xml = parser.parse(await rep.text());

  // RSS 2.0
  const items = liste(xml?.rss?.channel?.item);
  if (items.length > 0) {
    return items.map((i: Record<string, unknown>) => ({
      titre: texte(i.title),
      lien: texte(i.link),
      date: new Date(texte(i.pubDate ?? i['dc:date'])),
      resume: texte(i.description).slice(0, 400),
      source,
    }));
  }
  // Atom
  return liste(xml?.feed?.entry).map((e: Record<string, unknown>) => ({
    titre: texte(e.title),
    lien: lienAtom(e.link),
    date: new Date(texte(e.published ?? e.updated)),
    resume: texte(e.summary ?? e.content).slice(0, 400),
    source,
  }));
}

let cache: Promise<Collecte> | undefined;

/** Collecte tous les flux automatiques (une seule fois par construction du site). */
export function collecter(): Promise<Collecte> {
  cache ??= (async () => {
    const auto = SOURCES.filter((s) => s.auto);
    const resultats = await Promise.allSettled(auto.map(lireFlux));
    const articles: Article[] = [];
    const enEchec: Source[] = [];
    resultats.forEach((r, i) => {
      if (r.status === 'fulfilled') articles.push(...r.value);
      else {
        enEchec.push(auto[i]);
        console.warn(`[veille] ${auto[i].nom} : ${r.reason}`);
      }
    });
    const valides = articles
      .filter((a) => a.titre && a.lien.startsWith('http') && !Number.isNaN(a.date.valueOf()))
      .sort((a, b) => b.date.valueOf() - a.date.valueOf());
    // Dédoublonnage : un même communiqué repris par plusieurs sites n'est gardé qu'une fois
    // (titre comparé sans le suffixe « - Nom du site » ajouté par les agrégateurs).
    const vus = new Set<string>();
    const uniques = valides.filter((a) => {
      const cle = normaliser(a.titre.replace(/ - [^-]+$/, '')).trim();
      if (vus.has(cle)) return false;
      vus.add(cle);
      return true;
    });
    return { articles: uniques, enEchec, date: new Date() };
  })();
  return cache;
}

const normaliser = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\u2018\u2019]/g, "'").toLowerCase();

const motifs = (mots: string[]) =>
  mots.map((m) => new RegExp(`(^|[^a-z0-9])${normaliser(m).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
const FORTS = motifs(MOTS_CLES_FORTS);
const LARGES = motifs(MOTS_CLES_LARGES);

/**
 * Niveau de pertinence d'un article pour le sujet de veille :
 * « fort » = mot-clé spécifique aux passkeys (titre ou résumé),
 * « large » = mot-clé d'authentification générale (titre seulement).
 */
export function niveauSujet(a: Article): 'fort' | 'large' | null {
  const titre = normaliser(a.titre);
  const tout = normaliser(`${a.titre} ${a.resume}`);
  if (FORTS.some((m) => m.test(tout))) return 'fort';
  if (LARGES.some((m) => m.test(titre))) return 'large';
  return null;
}

/** Vrai si l'article concerne le sujet de veille. */
export function surLeSujet(a: Article): boolean {
  return niveauSujet(a) !== null;
}
