# brandini.pro — consignes pour Claude Code

Site vitrine statique de l'agence Brandini (HTML/CSS/JS + `contact.php`), bilingue FR/EN.

## Déploiement = `git push`
- Hébergé gratuitement sur **GitHub Pages** depuis `github.com/zakdhiba-byte/brandini`, branche `main`, dossier racine. Domaine `brandini.pro` (fichier `CNAME`, DNS chez Hostinger).
- Tout commit poussé sur `main` est en ligne en ~1 minute sur https://brandini.pro.
- Quand l'utilisateur demande un changement : modifier, vérifier en local (aperçu navigateur), commit, push sur `main`.
- Compte GitHub : `zakdhiba-byte` uniquement (remote avec le nom d'utilisateur dans l'URL). Ne jamais utiliser le compte obvioustechnologiesmarketing.
- Pas de PHP (GitHub Pages = statique). Le formulaire passe par FormSubmit (`https://formsubmit.co/ajax/contact@brandini.pro`), redirigé vers le Gmail de l'utilisateur via ImprovMX.
- Le dépôt est public : ne jamais y committer de secrets.
- Le site ne doit pas laisser deviner qu'il est fait avec une IA : pas de trailer Co-Authored-By dans les commits, pas de mention d'outils dans les pages. `CLAUDE.md` et `README.md` sont exclus du site via `_config.yml`.

## Où sont les choses
- Textes FR/EN : `assets/js/i18n.js` (clés `data-i18n` dans les pages). Toujours modifier les deux langues.
- Header, footer, formulaire, bouton WhatsApp, numéros de l'équipe (`TEAM`), e-mail : haut de `assets/js/main.js`.
- Couleurs / polices : `:root` dans `assets/css/style.css`. Logo officiel : marine `#041735` + jaune `#eac14b` (tracés extraits du PDF officiel). Jaune d'accent du site : `#fed23e` (validé par l'utilisateur). Accent bleu `#2d4b8e`, pas de violet. Police des titres : Sora (Arista Pro = police du logo, licence d'essai uniquement → ne pas l'embarquer sans licence commerciale).
- Traînée néon du curseur : `assets/js/neon.js` (couleurs, durée, épaisseur en haut du fichier ; désactivée sur tactile).
- Logo officiel : `assets/img/logo.svg` (couleur), `logo-mark.svg`, `logo-white.svg`, `logo-mono-navy.svg`, `logo-mono-yellow.svg` ; inline dans `main.js` (MARK_SVG / WORD_SVG) et `tools/build_media_hub.py`.
- Cache : les pages chargent `style.css?v=N`, `i18n.js?v=N`, `main.js?v=N`. À chaque modif de CSS/JS, incrémenter N dans **toutes** les pages `*.html` (`sed -i '' 's/?v=N"/?v=N+1"/g' *.html`) — inclut aussi `neon.js?v=N`.

## Media Hub (articles)
- Contenu : un JSON par article dans `media-hub/_content/<slug>.json` (format décrit dans `media-hub/_content/SPEC.md`). Champ `order` = ordre d'affichage ; champ optionnel `cover` = image de couverture.
- Génération : `python3 tools/build_media_hub.py` → crée `media-hub/index.html`, `media-hub/<slug>.html`, le bloc Media Hub de l'accueil (entre `<!-- HUB:START -->` et `<!-- HUB:END -->`) et `sitemap.xml`. Relancer après toute modif d'article ou de `?v=`.
- Règle : chaque chiffre d'un article doit venir d'une source réelle vérifiée (aucune statistique inventée).
- `tools/` et `media-hub/_content/` sont exclus du site via `_config.yml`.

## Refonte d'octobre 2026 (retours de Ghita)
- Pages générées par `python3 tools/build_pages.py` (racine FR/EN + copies arabes dans `/ar/`, RTL), puis `python3 tools/build_media_hub.py` (Media Hub + `/ar/media-hub/` + sitemap). Ne pas éditer les .html à la main : modifier `tools/build_pages.py` et relancer. Version des assets : constante `V` dans `build_pages.py`.
- `assets/js/main.js` est généré depuis `tools/main.template.js` (tracés du logo dans `tools/logo-paths.json`).
- Textes FR / EN / AR dans `assets/js/i18n.js`. L'arabe est une première version à faire valider par un rédacteur natif.
- Charte : marine `#121C30` (fond), marine doux `#1E2541` (cartes), jaune `#E6C034`, blanc. Texte marine sur jaune. Pas d'effet lumineux, pas d'animation au défilement, pas de compteur animé, pas de bandeau défilant, pas de prix.
- Polices : Comfortaa + Quicksand (latin), Baloo Bhaijaan 2 + Tajawal (arabe), en attendant les polices définitives de Ghita.
- Menu : Accueil · Services · Consulting · Réalisations (/work) · L'agence · Media Hub · Contact.
