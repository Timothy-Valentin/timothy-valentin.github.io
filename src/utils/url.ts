/**
 * Préfixe un chemin interne avec le `base` Astro (indispensable sur
 * GitHub Pages lorsque le site est servi depuis /<nom-du-dépôt>/).
 */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const clean = path.replace(/^\/+/, '');
  return `${base}/${clean}`;
}

/** Date au format français long : « 12 mars 2026 ». */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** Estimation du temps de lecture (≈ 220 mots/minute, blocs de code inclus). */
export function readingTime(body: string | undefined): string {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min de lecture`;
}

/** Tri décroissant par date (plus récent en premier). */
export function byDateDesc<T extends { data: { date: Date } }>(a: T, b: T): number {
  return b.data.date.valueOf() - a.data.date.valueOf();
}
