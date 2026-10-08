# brandini.pro — consignes pour Claude Code

Site vitrine statique de l'agence Brandini (HTML/CSS/JS + `contact.php`), bilingue FR/EN.

## Déploiement = `git push`
- Dépôt GitHub branché sur Hostinger (hPanel > Sites web > brandini.pro > Avancé > Git), déploiement automatique sur `main`.
- Tout commit poussé sur `main` est en ligne en quelques secondes sur https://brandini.pro.
- Quand l'utilisateur demande un changement : modifier, vérifier en local (aperçu navigateur), commit, push sur `main`.
- Le dépôt est servi tel quel dans `public_html` : ne jamais y committer de secrets.

## Où sont les choses
- Textes FR/EN : `assets/js/i18n.js` (clés `data-i18n` dans les pages). Toujours modifier les deux langues.
- Header, footer, bouton WhatsApp, numéros de l'équipe (`TEAM`), e-mail : haut de `assets/js/main.js`.
- Couleurs / polices : `:root` dans `assets/css/style.css` (jaune `#fed23e`, encre `#1c1d26`).
- Logo vectorisé : `assets/img/logo*.svg` (le même tracé est inline dans `main.js` et `agence.html`).
- Cache : les pages chargent `style.css?v=N`, `i18n.js?v=N`, `main.js?v=N`. À chaque modif de CSS/JS, incrémenter N dans **toutes** les pages `*.html` (`sed -i '' 's/?v=N"/?v=N+1"/g' *.html`).
