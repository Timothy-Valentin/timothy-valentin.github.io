/**
 * Préfixe un chemin interne avec le `base` Astro (utile si le site est servi
 * depuis un sous-dossier, ex. https://<user>.github.io/<depot>/).
 */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const clean = path.replace(/^\/+/, '');
  return `${base}/${clean}`;
}

/** Date au format français long : « 26 septembre 2026 ». */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
