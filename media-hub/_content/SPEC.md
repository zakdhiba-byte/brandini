# Format des articles du Media Hub (brandini.pro)

Chaque article est un fichier JSON : `media-hub/_content/<slug>.json`

```json
{
  "slug": "digital-marketing-moyen-orient",
  "date": "2026-10-13",
  "read_min": 7,
  "category_fr": "Marketing digital",
  "category_en": "Digital marketing",
  "region_fr": "Moyen-Orient",
  "region_en": "Middle East",
  "title_fr": "…",
  "title_en": "…",
  "excerpt_fr": "1 à 2 phrases, 160-220 caractères",
  "excerpt_en": "…",
  "body_fr": "<p>…</p><h2>…</h2>…",
  "body_en": "<p>…</p><h2>…</h2>…",
  "sources": [
    { "n": 1, "title": "Digital 2025: The United Arab Emirates", "publisher": "DataReportal", "year": "2025", "url": "https://…" }
  ]
}
```

## Règles de contenu
- Voix : celle de l'agence Brandini (branding + marketing de performance, présente en France, à Dubaï, au Maroc et en Arabie saoudite). Ton expert, clair, concret, sans jargon creux. Jamais de mention d'IA ni d'outils.
- 900 à 1 300 mots en français ; la version anglaise est une vraie traduction naturelle du même contenu (mêmes chiffres, mêmes sources).
- Structure : intro (2-3 paragraphes) → 3 à 5 sections `<h2>` → une section finale « Ce qu'il faut retenir » / "Key takeaways" en `<ul>` → pas de CTA (le gabarit l'ajoute).
- **Chaque chiffre doit venir d'une source réelle vérifiée** (page ouverte et lue). Aucun chiffre inventé, arrondi trompeur ou extrapolé. Toujours préciser l'année de la donnée. Si un chiffre ne peut pas être vérifié, ne pas l'utiliser.
- Citations dans le texte : `<sup><a href="#src-1">[1]</a></sup>` juste après le chiffre ou l'affirmation.
- Privilégier les sources primaires ou reconnues : DataReportal / We Are Social & Meltwater, GSMA, Banque mondiale, ITU, autorités statistiques nationales (HCP Maroc, GASTAT, FCSC UAE), banques centrales, Dubai Land Department, Vision 2030 officiel, rapports PwC / McKinsey / Deloitte / Kantar / WARC, études publiées des plateformes. Éviter blogs anonymes et agrégateurs sans source.
- 5 à 10 sources par article, numérotées dans l'ordre d'apparition.
- Aucune citation inventée de personnes réelles. Pas de témoignage client.

## HTML autorisé dans body_fr / body_en
`<p> <h2> <h3> <ul> <ol> <li> <strong> <em> <a href> <blockquote> <sup>`
et les encadrés chiffres :
`<div class="stat-callout"><strong>99 %</strong><span>de la population des EAU utilise internet (2025)<sup><a href="#src-1">[1]</a></sup></span></div>`
(2 à 3 encadrés par article, pour les chiffres les plus marquants)

Pas d'images, pas de classes autres que `stat-callout`, pas de styles inline. Français : espaces insécables avant `? ! : ;` et `%` (utiliser `&nbsp;`).
