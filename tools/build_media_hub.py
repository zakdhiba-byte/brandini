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

FONTS = ("https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700"
         "&family=Quicksand:wght@400;500;600;700&family=Baloo+Bhaijaan+2:wght@500;600;700"
         "&family=Tajawal:wght@400;500;700&display=swap")

_L = json.loads((Path(__file__).resolve().parent / "logo-paths.json").read_text())
MARK = (f'<svg class="hub-mark" viewBox="{_L["MV"]}" fill="currentColor" aria-hidden="true">'
        f'<path d="{_L["top"]}"/><path d="{_L["low"]}"/></svg>')


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
  <meta name="theme-color" content="#121c30">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="{FONTS}" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/style.css?v={ASSET_V}">
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
    base = ["/", "/services", "/consulting", "/work", "/agence", "/contact", "/media-hub/"] + [f"/media-hub/{a['slug']}" for a in arts]
    urls = base + ["/ar" + u for u in base]
    body = "\n".join(f"  <url><loc>{SITE}{u}</loc></url>" for u in urls)
    (ROOT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + body + "\n</urlset>\n",
        encoding="utf-8")


def build_ar():
    """Copie le Media Hub dans /ar/media-hub/ (interface en arabe, articles en anglais)."""
    dst = ROOT / "ar" / "media-hub"
    dst.mkdir(parents=True, exist_ok=True)
    for f in OUT.glob("*.html"):
        html = f.read_text(encoding="utf-8").replace('<html lang="fr">', '<html lang="ar" dir="rtl">', 1)
        (dst / f.name).write_text(html, encoding="utf-8")


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
    build_ar()
    print(f"{len(arts)} articles générés (assets v{ASSET_V}).")


if __name__ == "__main__":
    main()
