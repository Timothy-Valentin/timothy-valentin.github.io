/**
 * Récapitulatif hebdomadaire de la veille sur les passkeys.
 * Collecte les flux et garde les articles des 7 derniers jours, en deux groupes :
 * ceux qui portent spécifiquement sur les passkeys, puis l'authentification en général.
 * Écrit <sortie> (corps Markdown) et <sortie>.titre. N'écrit rien si aucun article ne correspond.
 * Usage : node scripts/veille-hebdo.ts <fichier-de-sortie>
 */
import { writeFileSync } from 'node:fs';
import { collecter, niveauSujet, type Article } from '../src/utils/flux.ts';

const sortie = process.argv[2];
if (!sortie) throw new Error('Usage : node scripts/veille-hebdo.ts <fichier-de-sortie>');

const JOURS = 7;
const MAX_LARGES = 10;
const depuis = Date.now() - JOURS * 24 * 3600 * 1000;

const { articles, enEchec } = await collecter();
const recents = articles.filter((a) => a.date.valueOf() >= depuis);
const forts = recents.filter((a) => niveauSujet(a) === 'fort');
const larges = recents.filter((a) => niveauSujet(a) === 'large');

const jour = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', timeZone: 'Europe/Paris' });
const ligne = (a: Article) => `- [${a.titre.replace(/[[\]]/g, '')}](${a.lien}) — ${a.source.nom}, ${jour.format(a.date)}`;

if (forts.length === 0 && larges.length === 0) {
  console.log(`Aucun article sur le sujet ces ${JOURS} derniers jours : pas de récapitulatif.`);
} else {
  const corps = [
    `Récapitulatif automatique des ${JOURS} derniers jours, à partir de mes sources de veille.`,
    '',
    `## Passkeys (${forts.length})`,
    '',
    forts.length > 0
      ? forts.map(ligne).join('\n')
      : '_Aucune publication portant spécifiquement sur les passkeys cette semaine._',
    '',
    `## Authentification en général (${larges.length})`,
    '',
    larges.length > 0
      ? larges.slice(0, MAX_LARGES).map(ligne).join('\n')
      : '_Aucune publication cette semaine._',
    larges.length > MAX_LARGES ? `\n… et ${larges.length - MAX_LARGES} autre(s), visibles dans le fil complet.` : '',
    '',
    '---',
    'À faire : lire, vérifier la source primaire, puis reporter les informations utiles dans la fiche de synthèse.',
    enEchec.length > 0 ? `\nSources indisponibles lors de la collecte : ${enEchec.map((s) => s.nom).join(', ')}.` : '',
    '',
    'Fil complet : https://timothy-valentin.github.io/veille/actualites/',
  ].join('\n');

  const titre = `Veille passkeys — semaine du ${jour.format(new Date(depuis))} au ${jour.format(new Date())} (${forts.length} sur les passkeys, ${larges.length} sur l'authentification)`;
  writeFileSync(sortie, corps);
  writeFileSync(`${sortie}.titre`, titre);
  console.log(titre);
}
