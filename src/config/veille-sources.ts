/**
 * Sources de la veille technologique (flux RSS / Atom).
 * `auto: true` : source lue automatiquement pour le fil d'actualités du portfolio.
 * Les autres bloquent les robots et ne sont suivies que dans l'agrégateur (Inoreader).
 */
export type Categorie = 'officiel' | 'presse' | 'editeur';

export interface Source {
  nom: string;
  flux: string;
  site: string;
  categorie: Categorie;
  auto: boolean;
}

export const SOURCES: Source[] = [
  { nom: 'CERT-FR — Alertes', flux: 'https://www.cert.ssi.gouv.fr/alerte/feed/', site: 'https://www.cert.ssi.gouv.fr/', categorie: 'officiel', auto: true },
  { nom: 'CERT-FR — Actualités', flux: 'https://www.cert.ssi.gouv.fr/actualite/feed/', site: 'https://www.cert.ssi.gouv.fr/', categorie: 'officiel', auto: true },
  { nom: 'ANSSI', flux: 'https://cyber.gouv.fr/actualites/rss/', site: 'https://cyber.gouv.fr/', categorie: 'officiel', auto: true },
  { nom: 'Cybermalveillance.gouv.fr', flux: 'https://www.cybermalveillance.gouv.fr/feed/atom-flux-actualites', site: 'https://www.cybermalveillance.gouv.fr/', categorie: 'officiel', auto: true },
  { nom: 'CNIL', flux: 'https://www.cnil.fr/fr/rss.xml', site: 'https://www.cnil.fr/', categorie: 'officiel', auto: true },
  { nom: 'The Hacker News', flux: 'https://feeds.feedburner.com/TheHackersNews', site: 'https://thehackernews.com/', categorie: 'presse', auto: true },
  { nom: 'ZATAZ', flux: 'https://www.zataz.com/feed/', site: 'https://www.zataz.com/', categorie: 'presse', auto: true },
  { nom: 'Google Security Blog', flux: 'https://security.googleblog.com/feeds/posts/default', site: 'https://security.googleblog.com/', categorie: 'editeur', auto: true },
  { nom: 'GitHub Blog — Sécurité', flux: 'https://github.blog/security/feed/', site: 'https://github.blog/security/', categorie: 'editeur', auto: true },
  { nom: 'FIDO Alliance', flux: 'https://fidoalliance.org/feed/', site: 'https://fidoalliance.org/', categorie: 'editeur', auto: false },
  { nom: 'Microsoft Security Blog', flux: 'https://www.microsoft.com/en-us/security/blog/feed/', site: 'https://www.microsoft.com/en-us/security/blog/', categorie: 'editeur', auto: false },
];

/**
 * Mots-clés du sujet de veille (comparés sans accents ni majuscules).
 * FORTS : spécifiques aux passkeys, recherchés dans le titre et le résumé.
 * LARGES : liés à l'authentification en général, recherchés dans le titre seulement.
 */
export const MOTS_CLES_FORTS = [
  'passkey',
  "cle d'acces",
  "cles d'acces",
  'fido',
  'webauthn',
  'sans mot de passe',
  'passwordless',
];

export const MOTS_CLES_LARGES = [
  'mot de passe',
  'mots de passe',
  'password',
  'multifacteur',
  'multi-facteur',
  'mfa',
  '2fa',
  'authentification',
  'authentication',
  'hameconnage',
  'phishing',
];
