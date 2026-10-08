# brandini.pro

Site vitrine statique (HTML/CSS/JS), hébergé gratuitement sur GitHub Pages. Pas de build, pas de Node.

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil |
| `services.html` | Services + méthode + FAQ |
| `realisations.html` | Portfolio filtrable |
| `agence.html` | L'agence, valeurs |
| `contact.html` | Formulaire (envoi par e-mail via FormSubmit) |
| `mentions-legales.html` | À compléter (obligatoire en France) |
| `assets/js/i18n.js` | **Tous les textes FR/EN** : c'est ici qu'on modifie le contenu |
| `assets/js/main.js` | Header/footer communs, e-mail et réseaux sociaux (en haut du fichier) |
| `assets/css/style.css` | Couleurs et polices dans `:root` |
| `assets/img/logo*.svg` | Logo vectorisé (monogramme, logo complet, version fond jaune) |

Les numéros WhatsApp de Ghita et Zak sont dans `TEAM`, en haut de `assets/js/main.js`.

## Mise en ligne (GitHub Pages + domaine Hostinger)

1. GitHub → dépôt `zakdhiba-byte/brandini` → **Settings → Pages** : Source « Deploy from a branch », branche `main`, dossier `/ (root)`. Custom domain : `brandini.pro`, puis cocher **Enforce HTTPS** quand c'est disponible.
2. hPanel Hostinger → **Domaines → brandini.pro → DNS / Serveurs de noms** :
   - supprimer les enregistrements `A` sur `@` et le `CNAME` sur `www` existants (parking Hostinger)
   - ajouter 4 enregistrements `A` sur `@` : `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - ajouter un `CNAME` : `www` → `zakdhiba-byte.github.io`
3. E-mail `contact@brandini.pro` → redirection gratuite via ImprovMX (enregistrements MX + TXT dans la même zone DNS).
4. Premier envoi du formulaire : FormSubmit envoie un e-mail d'activation à contact@brandini.pro → cliquer sur « Activate ».

Ensuite : chaque `git push` sur `main` = en ligne en ~1 minute.

## À remplacer avant le lancement

- [ ] Projets du portfolio (`realisations.html` et les 2 sur `index.html`) : ce sont des **concepts fictifs** avec un badge « Concept ».
      Remplacer `.work-visual` par une vraie image : `<img src="assets/img/projet.jpg" alt="...">`.
- [ ] Liens Instagram / LinkedIn dans `assets/js/main.js` et `contact.html`.
- [ ] Mentions légales : forme juridique, SIRET, adresse, directeur de publication.
- [ ] Image de partage (Open Graph) `assets/img/og.jpg` 1200×630, optionnel.
- [ ] Photos de Ghita et Zak (page L'agence) : remplacer les initiales par `<img>` dans `.photo`.
