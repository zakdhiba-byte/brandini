#!/usr/bin/env python3
"""
Génère le Media Hub de brandini.pro à partir des fichiers media-hub/_content/*.json :
  - media-hub/index.html        (liste des articles)
  - media-hub/<slug>.html       (une page par article)
  - le bloc « Media Hub » de la page d'accueil (entre <!-- HUB:START --> et <!-- HUB:END -->)
  - sitemap.xml

Usage : python3 tools/build_media_hub.py
Pour une image de couverture : ajouter "cover": "/assets/img/hub/<slug>.jpg" dans le JSON.
"""
import html
import json
import re
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "media-hub" / "_content"
OUT = ROOT / "media-hub"
SITE = "https://brandini.pro"
ASSET_V = None  # lu depuis index.html pour rester aligné sur le cache-busting du site

MONTHS_FR = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août",
             "septembre", "octobre", "novembre", "décembre"]
MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August",
             "September", "October", "November", "December"]

FONTS = "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"

MARK = ('<svg class="hub-mark" viewBox="821 243 283 398" fill="currentColor" aria-hidden="true">'
        '<path d="M1088.52 297.75 C1074.56 261.79 1045.54 245.79 1008.07 245.37 C953.39 244.75 898.72 245.08 844.04 245.24 C843.87 245.24 843.69 245.27 843.51 245.27 L823.09 245.44 L823.09 247.96 C823.09 262.27 822.88 275.81 823 289.09 C823 289.18 822.99 289.25 822.99 289.34 L822.99 330.24 C822.99 336.03 827.67 340.71 833.46 340.71 C839.25 340.71 843.93 336.03 843.93 330.24 L843.93 289.34 C843.93 289.21 843.91 289.08 843.9 288.94 C843.84 282.25 843.58 275.14 843.58 267.26 C899.83 267.26 953.38 266.61 1006.91 267.44 C1062.94 268.3 1088.45 313.19 1062.9 362.97 C1062.87 363.03 1062.84 363.09 1062.82 363.15 C1058.55 371.91 1071.01 379.3 1077.31 371.85 C1096.3 349.42 1098.88 324.45 1088.52 297.75"/><path d="M1014.87 415.44 C974.54 407.11 932.13 409.16 888.34 408.58 C888.34 440.61 888.35 466.26 888.35 492.77 C888.35 505.94 888.35 519.62 888.34 533.36 L888.34 533.37 L888.34 538.91 L888.34 549.71 L888.34 549.89 C888.34 555.71 893.06 560.41 898.86 560.41 C904.67 560.41 909.37 555.71 909.37 549.89 L909.37 549.21 L909.37 539.86 L909.37 533.75 L909.37 533.37 L909.37 429.43 C938.75 429.43 966.92 427.06 994.53 429.95 C1041.03 434.82 1074.97 472.24 1077.82 517.38 C1080.65 562.09 1052.82 607.75 1008.49 612.79 C954.25 618.97 898.79 614.26 841.91 614.26 C841.91 548.52 841.66 483 842.01 417.5 C842.23 378.03 862.99 357.48 903.11 356.47 C922.59 355.97 942.14 357.05 961.56 356.22 L997.99 356.22 C1003.57 356.22 1008.08 351.7 1008.08 346.13 C1008.08 340.57 1003.57 336.06 997.99 336.06 L957.59 336.06 C940.64 335.57 923.63 336.05 906.65 336.15 C853.63 336.45 823.4 366.09 823.15 418.62 C822.85 484.26 822.99 549.88 823.09 615.52 C823.1 622.23 823.07 627.8 823.07 635.43 C881.83 635.43 940.5 638.64 997.11 635.17 C1050.66 631.88 1091.67 587.62 1096.48 536.1 C1101.75 479.47 1069.79 426.79 1014.87 415.44"/></svg>')


def esc(s):
    return html.escape(s or "", quote=True)


def fmt_date(d, lang):
    y, m, dd = (int(x) for x in d.split("-"))
    if lang == "fr":
        return f"{dd} {MONTHS_FR[m - 1]} {y}"
    return f"{MONTHS_EN[m - 1]} {dd}, {y}"


def bi(fr, en, tag="span", cls=""):
    c = f" {cls}" if cls else ""
    return f'<{tag} class="lang-fr{c}">{fr}</{tag}><{tag} class="lang-en{c}">{en}</{tag}>'


def load_articles():
    arts = []
    for f in sorted(CONTENT.glob("*.json")):
        a = json.loads(f.read_text(encoding="utf-8"))
        a.setdefault("order", 99)
        arts.append(a)
    arts.sort(key=lambda a: (a.get("order", 99), a["slug"]))
    for i, a in enumerate(arts):
        a["_tone"] = i % 3
    return arts


def head(title, desc, canonical, page, title_en, desc_en):
    return f"""<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(desc)}">
  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(desc)}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:type" content="{'article' if page == 'article' else 'website'}">
  <link rel="canonical" href="{canonical}">
  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
  <meta name="theme-color" content="#f6f4ee">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="{FONTS}" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/style.css?v={ASSET_V}">
  <script>try{{if(localStorage.getItem("brandini-theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}}catch(e){{}}</script>
</head>
<body data-page="hub"
      data-title-fr="{esc(title)}" data-title-en="{esc(title_en)}"
      data-desc-fr="{esc(desc)}" data-desc-en="{esc(desc_en)}">

<header id="site-header"></header>
"""


def foot():
    return f"""
<footer id="site-footer"></footer>

<script src="/assets/js/i18n.js?v={ASSET_V}"></script>
<script src="/assets/js/main.js?v={ASSET_V}"></script>
<script src="/assets/js/neon.js?v={ASSET_V}"></script>
</body>
</html>
"""


def cta():
    return """
  <section class="cta">
    <div class="container">
      <h2 class="display reveal" data-i18n="cta.title"></h2>
      <p class="reveal d1" data-i18n="cta.text"></p>
      <a href="/contact" class="btn btn-primary reveal d2"><span data-i18n="cta.btn"></span> <span class="arrow">→</span></a>
    </div>
  </section>
"""


def cover(a, big=False):
    if a.get("cover"):
        return (f'<div class="hub-cover has-img{" big" if big else ""}">'
                f'<img src="{esc(a["cover"])}" alt="" loading="lazy"></div>')
    return (f'<div class="hub-cover tone-{a["_tone"]}{" big" if big else ""}" aria-hidden="true">'
            f'<span class="hub-cover-cat">{bi(esc(a["category_fr"]), esc(a["category_en"]))}</span>'
            f'<span class="hub-cover-title">{bi(esc(a["title_fr"]), esc(a["title_en"]))}</span>'
            f'<span class="hub-cover-foot">{MARK}<span>{bi(esc(a["region_fr"]), esc(a["region_en"]))}</span></span>'
            f'</div>')


def card(a, featured=False):
    return f"""        <a class="hub-card reveal{' featured' if featured else ''}" href="/media-hub/{a['slug']}">
          {cover(a)}
          <div class="hub-card-body">
            <span class="hub-card-meta">{bi(esc(a['region_fr']), esc(a['region_en']))} · {a['read_min']} min</span>
            <h3>{bi(esc(a['title_fr']), esc(a['title_en']))}</h3>
            <p>{bi(esc(a['excerpt_fr']), esc(a['excerpt_en']))}</p>
            <span class="hub-card-link">{bi("Lire l'article", "Read the article")} <span class="arrow">→</span></span>
          </div>
        </a>"""


def build_index(arts):
    cards = "\n".join(card(a, i == 0) for i, a in enumerate(arts))
    page = head("Media Hub — Brandini",
                "Analyses, chiffres et tendances du marketing au Moyen-Orient, au Maroc et en France, par l'agence Brandini.",
                f"{SITE}/media-hub/", "hub", "Media Hub — Brandini",
                "Insights, figures and marketing trends across the Middle East, Morocco and France, by Brandini.")
    page += f"""
<main>
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow reveal" data-i18n="hub.eyebrow"></span>
      <h1 class="display reveal d1" data-i18n="hub.title"></h1>
      <p class="lead reveal d2" data-i18n="hub.lead"></p>
    </div>
  </section>

  <section style="padding-top:0">
    <div class="container">
      <div class="hub-grid">
{cards}
      </div>
    </div>
  </section>
{cta()}</main>
{foot()}"""
    (OUT / "index.html").write_text(page, encoding="utf-8")


def build_article(a, arts):
    others = [o for o in arts if o["slug"] != a["slug"]][:3]
    srcs = "\n".join(
        f'          <li id="src-{s["n"]}"><span class="src-pub">{esc(s.get("publisher", ""))}'
        f'{(" · " + esc(str(s["year"]))) if s.get("year") else ""}</span> '
        f'<a href="{esc(s["url"])}" target="_blank" rel="noopener">{esc(s["title"])}</a></li>'
        for s in sorted(a["sources"], key=lambda s: s["n"]))
    related = "\n".join(card(o) for o in others)
    page = head(f"{a['title_fr']} — Brandini", a["excerpt_fr"], f"{SITE}/media-hub/{a['slug']}",
                "article", f"{a['title_en']} — Brandini", a["excerpt_en"])
    page += f"""
<main>
  <article class="article">
    <header class="article-hero">
      <div class="container article-narrow">
        <a class="article-back reveal" href="/media-hub/"><span class="arrow">←</span> Media Hub</a>
        <div class="article-tags reveal">
          <span class="article-tag">{bi(esc(a['category_fr']), esc(a['category_en']))}</span>
          <span class="article-tag ghost">{bi(esc(a['region_fr']), esc(a['region_en']))}</span>
        </div>
        <h1 class="article-title reveal d1">{bi(esc(a['title_fr']), esc(a['title_en']))}</h1>
        <p class="article-lead reveal d2">{bi(esc(a['excerpt_fr']), esc(a['excerpt_en']))}</p>
        <p class="article-meta reveal d2">{bi(fmt_date(a['date'], 'fr'), fmt_date(a['date'], 'en'))} · {a['read_min']} min {bi('de lecture', 'read')}</p>
      </div>
    </header>

    <div class="container article-wide reveal">
      {cover(a, big=True)}
    </div>

    <div class="container article-narrow">
      <div class="article-body lang-fr">
{a['body_fr']}
      </div>
      <div class="article-body lang-en">
{a['body_en']}
      </div>

      <section class="article-sources" aria-label="Sources">
        <h2>Sources</h2>
        <ol>
{srcs}
        </ol>
      </section>
    </div>
  </article>

  <section class="hub-related">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow" data-i18n="hub.eyebrow"></span>
          <h2 class="h2" data-i18n="hub.related"></h2>
        </div>
      </div>
      <div class="hub-grid three">
{related}
      </div>
    </div>
  </section>
{cta()}</main>
{foot()}"""
    (OUT / f"{a['slug']}.html").write_text(page, encoding="utf-8")


def build_home_block(arts):
    idx = ROOT / "index.html"
    s = idx.read_text(encoding="utf-8")
    cards = "\n".join(card(a) for a in arts[:3])
    block = f"""<!-- HUB:START -->
  <section class="home-hub">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow reveal" data-i18n="hub.eyebrow"></span>
          <h2 class="h2 reveal d1" data-i18n="hub.home.title"></h2>
        </div>
        <div class="reveal d2">
          <p class="lead" data-i18n="hub.home.lead"></p>
          <p style="margin-top:24px"><a href="/media-hub/" class="btn btn-ghost btn-sm"><span data-i18n="hub.all"></span> <span class="arrow">→</span></a></p>
        </div>
      </div>
      <div class="hub-grid three">
{cards}
      </div>
    </div>
  </section>
  <!-- HUB:END -->"""
    s = re.sub(r"<!-- HUB:START -->.*?<!-- HUB:END -->", block, s, flags=re.S)
    idx.write_text(s, encoding="utf-8")


def build_sitemap(arts):
    urls = ["/", "/services", "/agence", "/contact", "/media-hub/"] + [f"/media-hub/{a['slug']}" for a in arts]
    body = "\n".join(f"  <url><loc>{SITE}{u}</loc></url>" for u in urls)
    (ROOT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + body + "\n</urlset>\n",
        encoding="utf-8")


def main():
    global ASSET_V
    m = re.search(r"style\.css\?v=(\d+)", (ROOT / "index.html").read_text(encoding="utf-8"))
    ASSET_V = m.group(1) if m else "1"
    arts = load_articles()
    if not arts:
        raise SystemExit("Aucun article dans media-hub/_content/")
    build_index(arts)
    for a in arts:
        build_article(a, arts)
    build_home_block(arts)
    build_sitemap(arts)
    print(f"{len(arts)} articles générés (assets v{ASSET_V}).")


if __name__ == "__main__":
    main()
