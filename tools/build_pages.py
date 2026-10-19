#!/usr/bin/env python3
"""
Génère les pages de brandini.pro (FR/EN à la racine, AR dans /ar/).
Les textes sont dans assets/js/i18n.js (clés data-i18n).
Usage : python3 tools/build_pages.py   (puis python3 tools/build_media_hub.py)
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://brandini.pro"
V = "44"
FONTS = ("https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700"
         "&family=Quicksand:wght@400;500;600;700&family=Baloo+Bhaijaan+2:wght@500;600;700"
         "&family=Tajawal:wght@400;500;700&display=swap")


def head(slug, page, t_fr, t_en, t_ar, d_fr, d_en, d_ar, lang="fr"):
    url = "/" if slug == "index" else f"/{slug}"
    ar_url = "/ar/" if slug == "index" else f"/ar/{slug}"
    canonical = SITE + (ar_url if lang == "ar" else url)
    t = {"fr": t_fr, "en": t_en, "ar": t_ar}[lang]
    d = {"fr": d_fr, "en": d_en, "ar": d_ar}[lang]
    dir_attr = ' dir="rtl"' if lang == "ar" else ""
    return f"""<!doctype html>
<html lang="{lang}"{dir_attr}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{t}</title>
  <meta name="description" content="{d}">
  <meta property="og:title" content="{t}">
  <meta property="og:description" content="{d}">
  <meta property="og:type" content="website">
  <link rel="canonical" href="{canonical}">
  <link rel="alternate" hreflang="fr" href="{SITE}{url}">
  <link rel="alternate" hreflang="en" href="{SITE}{url}">
  <link rel="alternate" hreflang="ar" href="{SITE}{ar_url}">
  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
  <meta name="theme-color" content="#121c30">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="{FONTS}" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/style.css?v={V}">
  <script>try{{if(localStorage.getItem("brandini-theme")==="light")document.documentElement.setAttribute("data-theme","light")}}catch(e){{}}</script>
</head>
<body data-page="{page}"
      data-title-fr="{t_fr}" data-title-en="{t_en}" data-title-ar="{t_ar}"
      data-desc-fr="{d_fr}" data-desc-en="{d_en}" data-desc-ar="{d_ar}">

<header id="site-header"></header>

<main>
"""


FOOT = f"""</main>

<footer id="site-footer"></footer>

<script src="/assets/js/i18n.js?v={V}"></script>
<script src="/assets/js/main.js?v={V}"></script>
</body>
</html>
"""

CTA = """
  <section class="band-yellow cta">
    <div class="container">
      <h2 data-i18n="cta.title"></h2>
      <p data-i18n="cta.text"></p>
      <div class="cta-actions"><a href="/contact" class="btn btn-navy"><span data-i18n="cta.btn"></span> <span class="arrow">→</span></a></div>
    </div>
  </section>
"""

DECO = '<div class="deco-line" data-deco aria-hidden="true"></div>'


def svc_card(i, cls="card"):
    return f"""        <article class="{cls}">
          <span class="card-num">{i:02d}</span>
          <h3 data-i18n="svc{i}.t"></h3>
          <p data-i18n="svc{i}.d"></p>
        </article>"""


REFS = [
    ("byLou", "B"), ("Somatrin / OTEC", "S"), ("Arganok", "A"), ("Tamazirt", "T"),
    ("Dr. Oudrhiri Kamal", "O"), ("Arena Ville Verte", "A"), ("Rein Ace", "R"), ("Abdullah Alkhalifa", "A"),
]


def ref_card(name, mono, tag="work.soon"):
    return f"""        <div class="ref">
          <span class="ref-mono">{mono}</span>
          <div><h3>{name}</h3><span data-i18n="{tag}"></span></div>
        </div>"""


# ----------------------------------------------------------------------------- Accueil
HOME = f"""
  <section class="hero">
    {DECO}
    <div class="container">
      <div class="hero-logo" data-logo="full"></div>
      <h1 class="display" data-i18n="home.title"></h1>
      <p class="lead" data-i18n="home.lead"></p>
      <div class="hero-actions">
        <a href="/contact" class="btn btn-primary"><span data-i18n="home.cta1"></span> <span class="arrow">→</span></a>
        <a href="/work" class="btn btn-ghost" data-i18n="home.cta2"></a>
      </div>
    </div>
  </section>

  <section class="about">
    <div class="container about-grid">
      <div>
        <span class="eyebrow" data-i18n="about.eyebrow"></span>
        <h2 class="h2" data-i18n="about.title"></h2>
      </div>
      <div>
        <p class="big" data-i18n="about.p1"></p>
        <p data-i18n="about.p2"></p>
        <a href="/agence" class="btn btn-ghost btn-sm"><span data-i18n="about.link"></span> <span class="arrow">→</span></a>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow" data-i18n="svcp.eyebrow"></span>
          <h2 class="h2" data-i18n="svcp.title"></h2>
        </div>
        <p class="lead" data-i18n="svcp.lead"></p>
      </div>
      <div class="cards">
{chr(10).join(svc_card(i) for i in (1, 2, 4, 5, 6, 10))}
      </div>
      <div class="more-row"><a href="/services" class="btn btn-ghost"><span data-i18n="svcp.all"></span> <span class="arrow">→</span></a></div>
    </div>
  </section>

  <section class="band-yellow">
    <div class="container band-inner">
      <div>
        <span class="eyebrow" data-i18n="consT.eyebrow"></span>
        <h2 class="h2" data-i18n="consT.title"></h2>
        <p class="lead" style="margin-top:16px" data-i18n="consT.lead"></p>
      </div>
      <a href="/contact?format=discovery" class="btn btn-navy"><span data-i18n="consT.btn"></span> <span class="arrow">→</span></a>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow" data-i18n="workH.eyebrow"></span>
          <h2 class="h2" data-i18n="workH.title"></h2>
        </div>
        <p class="lead" data-i18n="workH.lead"></p>
      </div>
      <div class="refs three">
{ref_card("Arganok", "A")}
{ref_card("byLou", "B")}
{ref_card("Tamazirt", "T")}
      </div>
      <div class="more-row"><a href="/work" class="btn btn-ghost"><span data-i18n="workH.all"></span> <span class="arrow">→</span></a></div>
    </div>
  </section>

  <section style="padding-top:0">
    <div class="container">
      <div class="stats">
        <div class="stat"><strong>16 <small data-i18n="stats.years.unit"></small></strong><span data-i18n="stats.years"></span></div>
        <div class="stat"><strong>17</strong><span data-i18n="stats.clients"></span></div>
        <div class="stat"><strong class="ltr">650&nbsp;k€</strong><span data-i18n="stats.budget"></span></div>
        <div class="stat"><strong class="ltr">12&nbsp;M</strong><span data-i18n="stats.views"></span></div>
      </div>
      <div class="sectors">
        <span class="sectors-label" data-i18n="sectors.label"></span>
        <ul>
          <li data-i18n="sector.realestate"></li><li data-i18n="sector.ecommerce"></li><li data-i18n="sector.fashion"></li><li data-i18n="sector.fnb"></li><li data-i18n="sector.setup"></li>
        </ul>
      </div>
    </div>
  </section>

  <section class="manifesto">
    <div class="container">
      <blockquote data-i18n="home.manifesto"></blockquote>
      <cite data-i18n="home.manifesto.cite"></cite>
    </div>
  </section>
{CTA}"""

# ----------------------------------------------------------------------------- Services
ICONS = [
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h4"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4"/><path d="M4 17v3h16v-3"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
]
SERVICES = f"""
  <section class="page-hero">
    {DECO}
    <div class="container">
      <span class="eyebrow" data-i18n="services.eyebrow"></span>
      <h1 class="display" data-i18n="services.title"></h1>
      <p class="lead" data-i18n="services.lead"></p>
    </div>
  </section>

  <section style="padding-top:0">
    <div class="container">
      <div class="cards">
{chr(10).join(svc_card(i) for i in range(1, 11))}
        <a href="/consulting" class="card card-yellow">
          <span class="card-num">11</span>
          <h3 data-i18n="svc11.t"></h3>
          <p data-i18n="svc11.d"></p>
          <span class="card-link"><span data-i18n="svc11.link"></span> <span class="arrow">→</span></span>
        </a>
      </div>
    </div>
  </section>

  <section style="padding-top:0">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow" data-i18n="process.eyebrow"></span>
          <h2 class="h2" data-i18n="process.title"></h2>
        </div>
      </div>
      <div class="process">
{chr(10).join(f'        <div class="step"><span class="n">0{i}</span><h3 data-i18n="step{i}.title"></h3><p data-i18n="step{i}.text"></p></div>' for i in range(1, 5))}
      </div>
    </div>
  </section>

  <section style="padding-top:0">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow" data-i18n="commit.eyebrow"></span>
          <h2 class="h2" data-i18n="commit.title"></h2>
        </div>
      </div>
      <div class="commitments">
{chr(10).join(f'        <div class="commitment"><span class="c-icon">{ICONS[i-1]}</span><h3 data-i18n="commit.{i}.t"></h3><p data-i18n="commit.{i}.d"></p></div>' for i in range(1, 5))}
      </div>
    </div>
  </section>
{CTA}"""

# ----------------------------------------------------------------------------- Consulting
def fmt(i, slug, btn_cls="btn-primary", extra=""):
    return f"""        <article class="format{extra}">
          {'<span class="format-badge" data-i18n="fmt.badge"></span>' if extra else ''}
          <span class="format-dur" data-i18n="fmt{i}.dur"></span>
          <h3 data-i18n="fmt{i}.t"></h3>
          <p data-i18n="fmt{i}.d"></p>
          <ul><li data-i18n="fmt{i}.l1"></li><li data-i18n="fmt{i}.l2"></li><li data-i18n="fmt{i}.l3"></li></ul>
          <a href="/contact?format={slug}" class="btn {btn_cls}"><span data-i18n="fmt{i}.btn"></span> <span class="arrow">→</span></a>
        </article>"""


CONSULTING = f"""
  <section class="page-hero">
    {DECO}
    <div class="container">
      <span class="eyebrow" data-i18n="cons.eyebrow"></span>
      <h1 class="display" data-i18n="cons.title"></h1>
      <p class="lead" data-i18n="cons.lead"></p>
    </div>
  </section>

  <section style="padding-top:12px">
    <div class="container">
      <div class="formats">
{fmt(1, "discovery")}
{fmt(2, "session")}
{fmt(3, "advisory", "btn-navy", " recommended")}
      </div>
    </div>
  </section>
{CTA}"""

# ----------------------------------------------------------------------------- Réalisations
WORK = f"""
  <section class="page-hero">
    {DECO}
    <div class="container">
      <span class="eyebrow" data-i18n="work.eyebrow"></span>
      <h1 class="display" data-i18n="work.title"></h1>
      <p class="lead" data-i18n="work.lead"></p>
    </div>
  </section>

  <section style="padding-top:0">
    <div class="container">
      <div class="refs">
{chr(10).join(ref_card(n, m, "work.personal" if n == "Abdullah Alkhalifa" else "work.soon") for n, m in REFS)}
      </div>
    </div>
  </section>
{CTA}"""

# ----------------------------------------------------------------------------- Agence
LI_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>'


def founder(name, cls, photo, role, flags, bio, items, li):
    chips = "".join(f"<li>{x}</li>" for x in items)
    return f"""        <article class="founder-card{cls}">
          <div class="fc-top">
            <div class="fc-photo"><img src="/assets/img/{photo}" alt="{name}" width="640" height="640" loading="lazy"></div>
            <div class="fc-id"><h3>{name}</h3><span class="fc-role" data-i18n="{role}"></span><span class="fc-flags" data-flags="{flags}"></span></div>
          </div>
          <p class="fc-bio" data-i18n="{bio}"></p>
          <div class="fc-track"><span class="fc-label" data-i18n="team.before"></span><ul>{chips}</ul></div>
          <a class="fc-li" href="{li}" target="_blank" rel="noopener">{LI_SVG}<span>LinkedIn</span></a>
        </article>"""


def crew(name, photo, role, bio, li):
    return f"""          <article class="crew-card">
            <div class="crew-photo"><img src="/assets/img/{photo}" alt="{name}" width="480" height="480" loading="lazy"></div>
            <div class="crew-info"><h4>{name}</h4><span class="crew-role" data-i18n="{role}"></span><span class="crew-flags" data-flags="ma"></span></div>
            <p class="crew-bio" data-i18n="{bio}"></p>
            <a class="crew-li" href="{li}" target="_blank" rel="noopener" aria-label="LinkedIn {name}">{LI_SVG}</a>
          </article>"""


AGENCY = f"""
  <section class="page-hero">
    {DECO}
    <div class="container">
      <span class="eyebrow" data-i18n="agency.eyebrow"></span>
      <h1 class="display" data-i18n="agency.title"></h1>
      <p class="lead" data-i18n="agency.lead"></p>
    </div>
  </section>

  <section style="padding-top:0">
    <div class="container mv">
      <div class="mv-card yellow"><span class="eyebrow" data-i18n="mv.mission.t"></span><p data-i18n="mv.mission.p"></p></div>
      <div class="mv-card"><span class="eyebrow" data-i18n="mv.vision.t"></span><p data-i18n="mv.vision.p"></p></div>
    </div>
  </section>

  <section style="padding-top:0">
    <div class="container">
      <div class="section-head"><div><span class="eyebrow" data-i18n="obj.eyebrow"></span><h2 class="h2" data-i18n="obj.title"></h2></div></div>
      <div class="objectives">
{chr(10).join(f'        <div class="objective"><span class="n">0{i}</span><h3 data-i18n="obj{i}.t"></h3><p data-i18n="obj{i}.d"></p></div>' for i in range(1, 4))}
      </div>
    </div>
  </section>

  <section style="padding-top:0">
    <div class="container">
      <div class="section-head">
        <div><span class="eyebrow" data-i18n="team.eyebrow"></span><h2 class="h2" data-i18n="team.title"></h2></div>
        <p class="lead" data-i18n="team.lead"></p>
      </div>
      <div class="founder-cards">
{founder("Ghita", " fc-yellow", "team-ghita.webp", "team.ghita.role", "ma,sa", "team.ghita.bio", ["UNESCO", "Samsung", "LEAP", "Cityscape", "World Defense Show", "Black Hat MEA", "GITEX"], "https://www.linkedin.com/in/lasfar-ghita/")}
{founder("Zak", "", "team-zak.webp", "team.zak.role", "fr,ae", "team.zak.bio", ["Rolls-Royce", "Porsche", "Audi", "ADIB", "Eagle Hills", "Landmark Group", "Danone", "L'Oréal", "Red Bull", "Nivea"], "https://www.linkedin.com/in/zakdhiba/")}
      </div>
      <div class="crew">
        <h3 class="crew-title" data-i18n="crew.title"></h3>
        <div class="crew-grid">
{crew("Sara Habib Chorfa", "team-sara.webp", "crew.sara.role", "crew.sara.bio", "https://www.linkedin.com/in/sara-habib-chorfa-381771175/")}
{crew("Zaineb Lasfar", "team-zaineb.webp", "crew.zaineb.role", "crew.zaineb.bio", "https://www.linkedin.com/in/zaineb-lasfar-4172a3432/")}
        </div>
      </div>
    </div>
  </section>

  <section style="padding-top:0">
    <div class="container">
      <div class="section-head"><div><span class="eyebrow" data-i18n="story.eyebrow"></span><h2 class="h2" data-i18n="story.title"></h2></div></div>
      <ol class="timeline">
        <li class="tl-item"><span class="tl-dot"></span><span class="tl-year">2019</span><h3 data-i18n="tl.1.t"></h3><p data-i18n="tl.1.d"></p></li>
        <li class="tl-item key"><span class="tl-dot"></span><span class="tl-year">2022</span><h3 data-i18n="tl.2.t"></h3><p data-i18n="tl.2.d"></p></li>
        <li class="tl-item"><span class="tl-dot"></span><span class="tl-year">2025</span><h3 data-i18n="tl.3.t"></h3><p data-i18n="tl.3.d"></p></li>
        <li class="tl-item key"><span class="tl-dot"></span><span class="tl-year">2026</span><h3 data-i18n="tl.4.t"></h3><p data-i18n="tl.4.d"></p></li>
      </ol>
    </div>
  </section>
{CTA}"""

# ----------------------------------------------------------------------------- Contact
SERVICES_OPTS = "".join(f'<option value="svc{i}" data-i18n="svc{i}.t"></option>' for i in range(1, 11))
CONTACT = f"""
  <section class="page-hero">
    {DECO}
    <div class="container">
      <span class="eyebrow" data-i18n="contact.eyebrow"></span>
      <h1 class="display" data-i18n="contact.title"></h1>
      <p class="lead" data-i18n="contact.lead"></p>
    </div>
  </section>

  <section style="padding-top:0">
    <div class="container contact-grid">
      <div class="contact-info">
        <h3 data-i18n="contact.direct"></h3>
        <div class="wa-cards" data-wa-cards></div>
        <h3 data-i18n="contact.emails"></h3>
        <ul class="contact-lines" data-emails></ul>
        <h3 data-i18n="contact.phones"></h3>
        <ul class="contact-lines" data-phones></ul>
        <h3 data-i18n="contact.social"></h3>
        <ul class="contact-lines"><li><a href="https://instagram.com/brandini.pro" target="_blank" rel="noopener">Instagram</a></li><li><a href="https://www.linkedin.com/company/brandini-agency" target="_blank" rel="noopener">LinkedIn</a></li></ul>
      </div>

      <form id="contact-form" class="form" method="post" novalidate>
        <div class="row">
          <div class="field"><label for="f-name" data-i18n="form.name"></label><input id="f-name" name="name" type="text" required autocomplete="name"></div>
          <div class="field"><label for="f-company" data-i18n="form.company"></label><input id="f-company" name="company" type="text" autocomplete="organization"></div>
        </div>
        <div class="row">
          <div class="field"><label for="f-email" data-i18n="form.email"></label><input id="f-email" name="email" type="email" required autocomplete="email" dir="ltr"></div>
          <div class="field"><label for="f-wa" data-i18n="form.whatsapp"></label><input id="f-wa" name="whatsapp" type="tel" autocomplete="tel" dir="ltr" placeholder="+212 6…"></div>
        </div>
        <div class="row">
          <div class="field">
            <label for="f-country" data-i18n="form.country"></label>
            <select id="f-country" name="country">
              <option value="" data-i18n="form.country.choose"></option>
              <option value="Maroc" data-i18n="country.ma"></option>
              <option value="Arabie saoudite" data-i18n="country.sa"></option>
              <option value="Émirats" data-i18n="country.ae"></option>
              <option value="Qatar" data-i18n="country.qa"></option>
              <option value="Koweït" data-i18n="country.kw"></option>
              <option value="France" data-i18n="country.fr"></option>
              <option value="Autre" data-i18n="country.other"></option>
            </select>
          </div>
          <div class="field">
            <label for="f-service" data-i18n="form.service"></label>
            <select id="f-service" name="service">
              <option value="" data-i18n="form.service.choose"></option>
              <optgroup label="Services" data-label="form.group.services">{SERVICES_OPTS}</optgroup>
              <optgroup label="Consulting" data-label="form.group.consulting">
                <option value="discovery" data-i18n="fmt1.t"></option>
                <option value="session" data-i18n="fmt2.t"></option>
                <option value="advisory" data-i18n="fmt3.t"></option>
              </optgroup>
              <option value="other" data-i18n="form.other"></option>
            </select>
          </div>
        </div>
        <div class="field"><label for="f-msg" data-i18n="form.message"></label><textarea id="f-msg" name="message" required data-i18n-ph="form.message.ph"></textarea></div>
        <div class="hp" aria-hidden="true"><input type="text" name="website" tabindex="-1" autocomplete="off"></div>
        <div><button type="submit" class="btn btn-primary"><span data-i18n="form.send"></span> <span class="arrow">→</span></button></div>
        <p class="form-status" role="status" aria-live="polite"></p>
      </form>
    </div>
  </section>
"""

# ----------------------------------------------------------------------------- Mentions légales
LEGAL = """
  <section class="page-hero">
    <div class="container"><h1 class="display" data-i18n="legal.title"></h1></div>
  </section>

  <section class="legal" style="padding-top:0">
    <div class="container has-ar">
      <!-- À COMPLÉTER avec les informations réelles de la société -->
      <div class="lang-fr">
        <h2>Éditeur du site</h2>
        <p>Brandini — [forme juridique] au capital de [montant]<br>Siège social : [adresse complète]<br>Immatriculation : [numéro]<br>E-mail : <a href="mailto:contact@brandini.pro">contact@brandini.pro</a><br>Directeur de la publication : [Prénom Nom]</p>
        <h2>Hébergement</h2>
        <p>GitHub, Inc.<br>88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis</p>
        <h2>Propriété intellectuelle</h2>
        <p>L'ensemble des contenus de ce site (textes, visuels, logos) est la propriété de Brandini ou de ses clients et ne peut être reproduit sans autorisation écrite préalable.</p>
        <h2>Données personnelles</h2>
        <p>Les informations envoyées via le formulaire de contact sont utilisées uniquement pour répondre à votre demande et ne sont jamais cédées à des tiers. Vous pouvez demander leur consultation, leur rectification ou leur suppression en écrivant à <a href="mailto:contact@brandini.pro">contact@brandini.pro</a>.</p>
        <h2>Cookies</h2>
        <p>Ce site n'utilise pas de cookies de suivi. Seule votre préférence de langue est enregistrée localement dans votre navigateur.</p>
      </div>
      <div class="lang-en">
        <h2>Publisher</h2>
        <p>Brandini — [legal form], share capital [amount]<br>Registered office: [full address]<br>Registration: [number]<br>Email: <a href="mailto:contact@brandini.pro">contact@brandini.pro</a><br>Publication director: [First Last name]</p>
        <h2>Hosting</h2>
        <p>GitHub, Inc.<br>88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, United States</p>
        <h2>Intellectual property</h2>
        <p>All content on this site (text, visuals, logos) belongs to Brandini or its clients and may not be reproduced without prior written permission.</p>
        <h2>Personal data</h2>
        <p>Information sent through the contact form is used only to answer your request and is never shared with third parties. You may ask to access, correct or delete it by writing to <a href="mailto:contact@brandini.pro">contact@brandini.pro</a>.</p>
        <h2>Cookies</h2>
        <p>This site uses no tracking cookies. Only your language preference is stored locally in your browser.</p>
      </div>
      <div class="lang-ar">
        <h2>ناشر الموقع</h2>
        <p>Brandini — [الشكل القانوني] برأسمال قدره [المبلغ]<br>المقر الاجتماعي: [العنوان الكامل]<br>رقم التسجيل: [الرقم]<br>البريد الإلكتروني: <a href="mailto:contact@brandini.pro">contact@brandini.pro</a><br>مدير النشر: [الاسم الكامل]</p>
        <h2>الاستضافة</h2>
        <p>GitHub, Inc.<br>88 Colin P. Kelly Jr. Street, San Francisco, CA 94107، الولايات المتحدة</p>
        <h2>الملكية الفكرية</h2>
        <p>جميع محتويات هذا الموقع (النصوص والصور والشعارات) ملك لـ Brandini أو لعملائها، ولا يجوز نسخها دون إذن كتابي مسبق.</p>
        <h2>البيانات الشخصية</h2>
        <p>تُستخدم المعلومات المرسلة عبر نموذج التواصل فقط للرد على طلبك، ولا تتم مشاركتها مع أي طرف ثالث. يمكنك طلب الاطلاع عليها أو تصحيحها أو حذفها عبر مراسلتنا على <a href="mailto:contact@brandini.pro">contact@brandini.pro</a>.</p>
        <h2>ملفات تعريف الارتباط</h2>
        <p>لا يستخدم هذا الموقع ملفات تعريف الارتباط للتتبع. يتم حفظ تفضيل اللغة فقط محليًا في متصفحك.</p>
      </div>
    </div>
  </section>
"""

NOTFOUND = """
  <section class="page-hero" style="min-height:60vh">
    <div class="container">
      <span class="eyebrow">404</span>
      <h1 class="display" data-i18n="404.title"></h1>
      <p class="lead" data-i18n="404.lead"></p>
      <p style="margin-top:32px"><a href="/" class="btn btn-primary"><span data-i18n="404.btn"></span> <span class="arrow">→</span></a></p>
    </div>
  </section>
"""

PAGES = [
    ("index", "home", HOME,
     "Brandini — Agence de branding & marketing", "Brandini — Branding & marketing agency", "Brandini — وكالة العلامات التجارية والتسويق",
     "Brandini, plus qu'une simple agence boutique : stratégie de marque, design, contenus et performance.",
     "Brandini, more than just a boutique agency: brand strategy, design, content and performance.",
     "Brandini، أكثر من مجرد وكالة بوتيك: استراتيجية العلامة التجارية والتصميم والمحتوى والأداء."),
    ("services", "services", SERVICES, "Services — Brandini", "Services — Brandini", "الخدمات — Brandini",
     "Brand development, positionnement, design, contenus, communication 360, naming, sites web, PR & événements, Meta & Google Ads.",
     "Brand development, positioning, design, content, 360 communication, naming, websites, PR & events, Meta & Google Ads.",
     "تطوير العلامة التجارية، التموضع، التصميم، المحتوى، التواصل 360، اختيار الاسم، المواقع، العلاقات الإعلامية والإعلانات."),
    ("consulting", "consulting", CONSULTING, "Consulting — Brandini", "Consulting — Brandini", "الاستشارات — Brandini",
     "Discovery Call, session stratégique 360° et accompagnement mensuel : la stratégie au-delà de la conversation.",
     "Discovery Call, 360° Strategic Session and Monthly Advisory: strategy beyond conversation.",
     "مكالمة استكشافية، جلسة استراتيجية 360° ومرافقة شهرية: الاستراتيجية أبعد من مجرد حوار."),
    ("work", "work", WORK, "Réalisations — Brandini", "Work — Brandini", "أعمالنا — Brandini",
     "Les marques accompagnées par Brandini.", "Brands supported by Brandini.", "العلامات التجارية التي رافقتها Brandini."),
    ("agence", "agency", AGENCY, "L'agence — Brandini", "Agency — Brandini", "الوكالة — Brandini",
     "Plus qu'une simple agence boutique : mission, vision, équipe et histoire de Brandini.",
     "More than just a boutique agency: Brandini's mission, vision, team and story.",
     "أكثر من مجرد وكالة بوتيك: مهمة Brandini ورؤيتها وفريقها وقصتها."),
    ("contact", "contact", CONTACT, "Contact — Brandini", "Contact — Brandini", "تواصل معنا — Brandini",
     "Collaborons et faisons briller votre marque.", "Let's collaborate and make your brand shine.", "لنتعاون ونجعل علامتك التجارية تتألّق."),
    ("mentions-legales", "legal", LEGAL, "Mentions légales — Brandini", "Legal notice — Brandini", "الإشعار القانوني — Brandini",
     "Mentions légales de brandini.pro.", "Legal notice for brandini.pro.", "الإشعار القانوني لموقع brandini.pro."),
    ("404", "404", NOTFOUND, "Page introuvable — Brandini", "Page not found — Brandini", "الصفحة غير موجودة — Brandini",
     "Page introuvable.", "Page not found.", "الصفحة غير موجودة."),
]


def main():
    (ROOT / "ar").mkdir(exist_ok=True)
    for slug, page, body, tfr, ten, tar, dfr, den, dar in PAGES:
        for lang, folder in (("fr", ROOT), ("ar", ROOT / "ar")):
            html = head(slug, page, tfr, ten, tar, dfr, den, dar, lang) + body + FOOT
            if slug in ("404", "mentions-legales"):
                html = html.replace('<meta name="theme-color"', '<meta name="robots" content="noindex">\n  <meta name="theme-color"')
            (folder / f"{slug}.html").write_text(html, encoding="utf-8")
    print(f"{len(PAGES)} pages × 2 langues (racine + /ar/)")


if __name__ == "__main__":
    main()
