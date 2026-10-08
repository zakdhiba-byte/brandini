# brandini.pro

Site vitrine statique (HTML/CSS/JS + un PHP pour le formulaire). Pas de build, pas de Node.

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil |
| `services.html` | Services + méthode + FAQ |
| `realisations.html` | Portfolio filtrable |
| `agence.html` | L'agence, valeurs |
| `contact.html` + `contact.php` | Formulaire (envoi par mail) |
| `mentions-legales.html` | À compléter (obligatoire en France) |
| `assets/js/i18n.js` | **Tous les textes FR/EN** : c'est ici qu'on modifie le contenu |
| `assets/js/main.js` | Header/footer communs, e-mail et réseaux sociaux (en haut du fichier) |
| `assets/css/style.css` | Couleurs et polices dans `:root` |
| `assets/img/logo*.svg` | Logo vectorisé (monogramme, logo complet, version fond jaune) |

Les numéros WhatsApp de Ghita et Zak sont dans `TEAM`, en haut de `assets/js/main.js`.

## Mise en ligne sur Hostinger

1. hPanel → **Sites web** → ajouter `brandini.pro` (si ce n'est pas déjà fait).
2. **Gestionnaire de fichiers** → dossier `public_html` → supprimer le `default.php` / `index.php` d'Hostinger.
3. Envoyer tout le contenu de ce dossier dans `public_html`, y compris `.htaccess` (fichier caché).
   Le plus simple : zipper le dossier, l'envoyer, puis faire « Extraire » dans le gestionnaire.
4. hPanel → **Sécurité → SSL** : activer le certificat gratuit.
5. hPanel → **Emails** : créer la boîte `contact@brandini.pro` (le formulaire envoie depuis et vers cette adresse).
6. Tester le formulaire sur https://brandini.pro/contact.

## À remplacer avant le lancement

- [ ] Projets du portfolio (`realisations.html` et les 2 sur `index.html`) : ce sont des **concepts fictifs** avec un badge « Concept ».
      Remplacer `.work-visual` par une vraie image : `<img src="assets/img/projet.jpg" alt="...">`.
- [ ] Liens Instagram / LinkedIn dans `assets/js/main.js` et `contact.html`.
- [ ] Mentions légales : forme juridique, SIRET, adresse, directeur de publication.
- [ ] Image de partage (Open Graph) `assets/img/og.jpg` 1200×630, optionnel.
- [ ] Photos de Ghita et Zak (page L'agence) : remplacer les initiales par `<img>` dans `.photo`.
