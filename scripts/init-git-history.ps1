# Initialise le dépôt et crée l'historique de commits atomiques (Conventional Commits).
# À exécuter une seule fois, depuis la racine du projet, après installation de Git :
#   powershell -ExecutionPolicy Bypass -File scripts/init-git-history.ps1
$ErrorActionPreference = 'Stop'

if (Test-Path .git) { throw "Un dépôt Git existe déjà : historique non recréé." }

git init -b main
if (-not (git config user.name))  { git config user.name  'Timothy Valentin' }
if (-not (git config user.email)) { git config user.email 'timothy.valentins@gmail.com' }

function Commit([string[]]$Paths, [string]$Message) {
    git add -- $Paths
    git commit -m $Message | Out-Null
    Write-Host "✔ $Message"
}

Commit @('.gitignore', 'package.json', 'package-lock.json', 'tsconfig.json') `
       'chore: initialiser le projet Astro 7 avec TypeScript strict'
Commit @('astro.config.mjs', 'src/plugins') `
       'feat(build): configurer Tailwind, MDX, sitemap, Shiki et le rendu Mermaid'
Commit @('src/styles', 'src/config', 'src/utils') `
       'feat(ui): définir le thème sombre slate/zinc et la configuration du site'
Commit @('src/layouts', 'src/components/Header.astro', 'src/components/Footer.astro',
         'src/components/ThemeToggle.astro', 'src/components/BrandIcon.astro', 'src/scripts') `
       'feat(ui): ajouter les layouts, la navigation et la bascule de thème'
Commit @('src/components/EntryCard.astro', 'src/components/PageHeader.astro', 'src/content.config.ts') `
       'feat(content): déclarer les collections typées projets, homelab, writeups et veille'
Commit @('src/pages/index.astro') `
       'feat(accueil): présenter le profil et les quatre blocs de compétences'
Commit @('src/content/projets/deploiement-reseau-nouveau-batiment-justice.md') `
       'docs(projets): documenter le déploiement réseau du bâtiment judiciaire (E5)'
Commit @('src/content/projets/infrastructure-systeme-proxmox-dhcp-vlan.md') `
       'docs(projets): documenter l''infrastructure Proxmox et Kea DHCP HA (E4/E5)'
Commit @('src/pages/projets') `
       'feat(projets): ajouter la liste, la matrice de couverture et les fiches'
Commit @('src/content/homelab', 'src/pages/homelab') `
       'docs(homelab): documenter l''hyperviseur et le serveur Debian durci'
Commit @('src/content/writeups', 'src/pages/writeups') `
       'docs(writeups): ajouter le write-up Root-Me d''analyse de trames'
Commit @('src/content/veille', 'src/pages/veille') `
       'docs(veille): rédiger la synthèse Zero Trust / NIS 2 et la méthodologie'
Commit @('public/pgp', 'src/components/PgpKey.astro', 'src/pages/contact.astro') `
       'feat(contact): publier les canaux de contact et la clé OpenPGP'
Commit @('src/pages/recherche.astro', 'src/pages/404.astro') `
       'feat(recherche): intégrer la recherche plein texte Pagefind et la page 404'
Commit @('public/robots.txt', 'public/.well-known', 'public/favicon.svg') `
       'chore(public): ajouter robots.txt, security.txt (RFC 9116) et le favicon'
Commit @('.github') `
       'ci: déployer sur GitHub Pages avec build Astro et index Pagefind'
Commit @('README.md', 'scripts', '.claude') `
       'docs: rédiger le README et le script d''initialisation de l''historique'

$reste = git status --porcelain
if ($reste) { Write-Warning "Fichiers non commités :`n$reste" } else { Write-Host "`nHistorique prêt :"; git log --oneline }
