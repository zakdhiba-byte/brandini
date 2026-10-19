/* ==========================================================================
   Brandini — en-tête, pied de page, langues (FR / EN / AR), WhatsApp, formulaire
   Pas d'animation au défilement, pas de compteur, pas d'effet lumineux.
   ========================================================================== */

(function () {
  var CONTACT_EMAIL = "contact@brandini.pro";
  var SECOND_EMAIL = "infos@brandini.cc";
  var PHONES = [
    { flag: "ma", key: "country.ma", tel: "+212680006050", display: "+212 680 006 050" },
    { flag: "sa", key: "country.sa", tel: "+966563460605", display: "+966 56 346 0605" }
  ];
  var INSTAGRAM = "https://instagram.com/brandini.pro";
  var LINKEDIN = "https://www.linkedin.com/company/brandini-agency";

  /* Équipe joignable sur WhatsApp — numéros au format international, sans "+" */
  var TEAM = [
    { name: "Ghita", photo: "/assets/img/team-ghita-sm.webp", role: "team.ghita.role", flags: ["ma", "sa"], wa: "212680006050", linkedin: "https://www.linkedin.com/in/lasfar-ghita/" },
    { name: "Zak", photo: "/assets/img/team-zak-sm.webp", role: "team.zak.role", flags: ["fr", "ae"], wa: "971507250385", linkedin: "https://www.linkedin.com/in/zakdhiba/" }
  ];

  /* Logo officiel (tracés du PDF), version jaune : currentColor */
  var MARK_SVG = '<svg class="logo-mark" viewBox="__MV__" fill="currentColor" aria-hidden="true"><path class="lg-top" d="__TOP__"/><path class="lg-body" d="__LOW__"/></svg>';
  var WORD_SVG = '<svg class="logo-word" viewBox="__WV__" fill="currentColor" aria-hidden="true"><path d="__WORD__"/></svg>';

  var WA_SVG = __WA__;
  var LI_SVG = __LI__;

__FLAGS__
  var FLAG_NAMES = { ma: "Maroc", sa: "Arabie saoudite", fr: "France", ae: "Émirats arabes unis" };
  function flagsHtml(codes) {
    return '<span class="flags">' + codes.map(function (c) {
      return '<svg class="flag" viewBox="0 0 30 20" role="img" aria-label="' + FLAG_NAMES[c] + '"><title>' + FLAG_NAMES[c] + "</title>" + FLAGS[c] + "</svg>";
    }).join("") + "</span>";
  }

  /* ---------- Langue ---------- */

  var path = location.pathname;
  var isAr = path === "/ar" || path.indexOf("/ar/") === 0;
  function getLang() {
    if (isAr) return "ar";
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "fr" || q === "en") return q;
    try { var s = localStorage.getItem("brandini-lang"); if (s === "fr" || s === "en") return s; } catch (e) {}
    return (navigator.language || "fr").toLowerCase().indexOf("fr") === 0 ? "fr" : "en";
  }
  var lang = getLang();
  window.__lang = lang;
  var basePath = isAr ? (path.replace(/^\/ar/, "") || "/") : path;
  function href(p) { return isAr ? "/ar" + p : p; }

  var page = document.body.getAttribute("data-page") || "";
  var navItems = [
    ["/", "nav.home", "home"],
    ["/services", "nav.services", "services"],
    ["/consulting", "nav.consulting", "consulting"],
    ["/work", "nav.work", "work"],
    ["/agence", "nav.agency", "agency"],
    ["/media-hub/", "nav.hub", "hub"],
    ["/contact", "nav.contact", "contact"]
  ];

  var header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<div class="container nav">' +
        '<a href="' + href("/") + '" class="logo" aria-label="Brandini">' + MARK_SVG + WORD_SVG + "</a>" +
        '<ul class="nav-links" id="nav-links">' +
          navItems.map(function (n) {
            return '<li><a href="' + href(n[0]) + '" data-i18n="' + n[1] + '"' + (page === n[2] ? ' class="active" aria-current="page"' : "") + "></a></li>";
          }).join("") +
          '<li class="nav-cta"><a href="' + href("/contact") + '" data-i18n="nav.cta"></a></li>' +
        "</ul>" +
        '<div class="nav-right">' +
          '<button type="button" class="theme-toggle" aria-label="Thème clair / sombre" title="Thème clair / sombre">' +
            '<svg class="ico-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"/></svg>' +
            '<svg class="ico-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
          '</button>' +
          '<nav class="lang-switch" aria-label="Language">' +
            '<a data-lang="fr" href="' + basePath + '?lang=fr" lang="fr">FR</a>' +
            '<a data-lang="en" href="' + basePath + '?lang=en" lang="en">EN</a>' +
            '<a data-lang="ar" href="/ar' + basePath + '" lang="ar">عربي</a>' +
          "</nav>" +
          '<a href="' + href("/contact") + '" class="btn btn-primary btn-sm" data-i18n="nav.cta"></a>' +
          '<button type="button" class="menu-toggle" aria-label="Menu" aria-expanded="false" aria-controls="nav-links"><span></span><span></span></button>' +
        "</div>" +
      "</div>";
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-top">' +
          '<div><a href="' + href("/") + '" class="logo" aria-label="Brandini">' + MARK_SVG + WORD_SVG + '</a><p data-i18n="footer.tagline"></p></div>' +
          '<div class="footer-col"><h4 data-i18n="footer.nav"></h4><ul>' +
            navItems.map(function (n) { return '<li><a href="' + href(n[0]) + '" data-i18n="' + n[1] + '"></a></li>'; }).join("") +
          "</ul></div>" +
          '<div class="footer-col"><h4 data-i18n="footer.services"></h4><ul>' +
            ["svc1", "svc4", "svc5", "svc9", "svc10"].map(function (k) { return '<li><a href="' + href("/services") + '" data-i18n="' + k + '.t"></a></li>'; }).join("") +
            '<li><a href="' + href("/consulting") + '" data-i18n="nav.consulting"></a></li>' +
          "</ul></div>" +
          '<div class="footer-col"><h4 data-i18n="footer.contact"></h4><ul>' +
            '<li><a class="ltr" href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + "</a></li>" +
            '<li><a class="ltr" href="mailto:' + SECOND_EMAIL + '">' + SECOND_EMAIL + "</a></li>" +
            PHONES.map(function (p) { return '<li><a class="ltr" href="tel:' + p.tel + '">' + p.display + "</a></li>"; }).join("") +
            '<li><a href="' + INSTAGRAM + '" target="_blank" rel="noopener">Instagram</a> · <a href="' + LINKEDIN + '" target="_blank" rel="noopener">LinkedIn</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-big" aria-hidden="true">' + WORD_SVG.replace('class="logo-word"', 'class="footer-word"') + "</div>" +
        '<div class="footer-bottom">' +
          "<span>© " + new Date().getFullYear() + ' Brandini. <span data-i18n="footer.rights"></span></span>' +
          '<a href="' + href("/mentions-legales") + '" data-i18n="footer.legal"></a>' +
        "</div>" +
      "</div>";
  }

  /* Logo complet / décoration statique (la ligne jaune du logo) */
  document.querySelectorAll("[data-logo]").forEach(function (el) {
    el.innerHTML = '<svg viewBox="__FV__" fill="currentColor" role="img" aria-label="Brandini"><path class="lg-top" d="__TOP__"/><path class="lg-body" d="__LOW__"/><path class="lg-word" d="__WORD__"/></svg>';
  });
  document.querySelectorAll("[data-deco]").forEach(function (el) {
    el.innerHTML = '<svg viewBox="__MV__" fill="currentColor" aria-hidden="true"><path d="__TOP__"/></svg>';
  });

  /* ---------- WhatsApp ---------- */

  function waLink(m) {
    var msg = lang === "ar" ? "مرحبًا " + m.name + "، أودّ التحدث عن مشروع مع Brandini." :
      lang === "en" ? "Hello " + m.name + ", I'd like to talk about a project with Brandini." :
      "Bonjour " + m.name + ", je souhaite parler d'un projet avec Brandini.";
    return "https://wa.me/" + m.wa + "?text=" + encodeURIComponent(msg);
  }
  function waCard(m) {
    return '<a class="wa-card" data-wa="' + m.wa + '" href="https://wa.me/' + m.wa + '" target="_blank" rel="noopener">' +
      '<span class="wa-avatar"><img src="' + m.photo + '" alt="" width="60" height="60" loading="lazy"></span>' +
      '<span class="who"><strong>' + m.name + " " + flagsHtml(m.flags) + '</strong><span data-i18n="' + m.role + '"></span></span>' +
      '<span class="wa-icon">' + WA_SVG + "</span></a>";
  }
  function contactCard(m) {
    return '<div class="wa-card">' +
      '<span class="wa-avatar"><img src="' + m.photo + '" alt="" width="60" height="60" loading="lazy"></span>' +
      '<span class="who"><strong>' + m.name + " " + flagsHtml(m.flags) + '</strong><span data-i18n="' + m.role + '"></span></span>' +
      '<span class="cc-actions">' +
        '<a class="cc-btn cc-wa" data-wa="' + m.wa + '" href="https://wa.me/' + m.wa + '" target="_blank" rel="noopener" aria-label="WhatsApp ' + m.name + '">' + WA_SVG + "</a>" +
        '<a class="cc-btn cc-li" href="' + m.linkedin + '" target="_blank" rel="noopener" aria-label="LinkedIn ' + m.name + '">' + LI_SVG + "</a>" +
      "</span></div>";
  }

  var waFloat = document.createElement("div");
  waFloat.className = "wa-float";
  waFloat.innerHTML = '<div class="wa-menu" id="wa-menu"><p data-i18n="wa.choose"></p>' + TEAM.map(waCard).join("") + "</div>" +
    '<button type="button" class="wa-float-btn" aria-label="WhatsApp" aria-expanded="false" aria-controls="wa-menu">' + WA_SVG + "</button>";
  document.body.appendChild(waFloat);
  var waBtn = waFloat.querySelector(".wa-float-btn");
  waBtn.addEventListener("click", function () {
    var open = waFloat.classList.toggle("open");
    waBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("click", function (e) {
    if (!waFloat.contains(e.target)) { waFloat.classList.remove("open"); waBtn.setAttribute("aria-expanded", "false"); }
  });

  document.querySelectorAll("[data-wa-cards]").forEach(function (el) { el.innerHTML = TEAM.map(contactCard).join(""); });
  document.querySelectorAll("[data-phones]").forEach(function (el) {
    el.innerHTML = PHONES.map(function (p) {
      return '<li><a href="tel:' + p.tel + '"><span class="ltr">' + p.display + "</span> " + flagsHtml([p.flag]) + ' <small data-i18n="' + p.key + '"></small></a></li>';
    }).join("");
  });
  document.querySelectorAll("[data-emails]").forEach(function (el) {
    el.innerHTML = [CONTACT_EMAIL, SECOND_EMAIL].map(function (m) { return '<li><a class="ltr" href="mailto:' + m + '">' + m + "</a></li>"; }).join("");
  });
  document.querySelectorAll("[data-flags]").forEach(function (el) { el.innerHTML = flagsHtml(el.getAttribute("data-flags").split(",")); });

  /* Liens internes : préfixe /ar sur les pages arabes */
  if (isAr) {
    document.querySelectorAll("main a[href^='/']").forEach(function (a) {
      var h = a.getAttribute("href");
      if (h.indexOf("/ar/") !== 0 && h.indexOf("/assets/") !== 0) a.setAttribute("href", "/ar" + h);
    });
  }

  /* ---------- Application de la langue ---------- */

  function applyLang() {
    var dict = (window.I18N && window.I18N[lang]) || {};
    var fb = (window.I18N && window.I18N.en) || {};
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n"); var v = dict[k] != null ? dict[k] : fb[k];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-label]").forEach(function (el) {
      var k = el.getAttribute("data-label"); var v = dict[k] != null ? dict[k] : fb[k];
      if (v != null) el.setAttribute("label", v);
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-ph"); var v = dict[k] != null ? dict[k] : fb[k];
      if (v != null) el.setAttribute("placeholder", v);
    });
    var t = document.body.getAttribute("data-title-" + lang) || document.body.getAttribute("data-title-en");
    if (t) document.title = t;
    var d = document.body.getAttribute("data-desc-" + lang) || document.body.getAttribute("data-desc-en");
    var meta = document.querySelector('meta[name="description"]');
    if (d && meta) meta.setAttribute("content", d);
    document.querySelectorAll(".lang-switch a").forEach(function (a) {
      var on = a.getAttribute("data-lang") === lang;
      a.classList.toggle("on", on);
      if (on) a.setAttribute("aria-current", "true");
    });
    document.querySelectorAll("[data-wa]").forEach(function (a) {
      var m = TEAM.filter(function (t) { return t.wa === a.getAttribute("data-wa"); })[0];
      if (m) a.href = waLink(m);
    });
    if (lang !== "ar") { try { localStorage.setItem("brandini-lang", lang); } catch (e) {} }
  }
  applyLang();

  /* ---------- Thème : marine par défaut, clair au choix ---------- */

  function applyTheme(t) {
    var light = t === "light";
    if (light) document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", light ? "#ffffff" : "#121c30");
    var b = document.querySelector(".theme-toggle");
    if (b) b.setAttribute("aria-pressed", light ? "true" : "false");
  }
  applyTheme(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".theme-toggle")) return;
    var next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
    try { localStorage.setItem("brandini-theme", next); } catch (err) {}
  });

  /* ---------- Menu mobile + en-tête ---------- */

  var toggle = document.querySelector(".menu-toggle");
  if (toggle) toggle.addEventListener("click", function () {
    var open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  function onScroll() { if (header) header.classList.toggle("scrolled", window.scrollY > 10); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Formulaire de contact ---------- */

  var form = document.getElementById("contact-form");
  if (form) {
    var params = new URLSearchParams(location.search);
    var pre = params.get("format") || params.get("service");
    var sel = form.querySelector('select[name="service"]');
    if (pre && sel && sel.querySelector('option[value="' + pre + '"]')) sel.value = pre;

    var status = form.querySelector(".form-status");
    var btn = form.querySelector('button[type="submit"]');
    var btnLabel = btn.querySelector("[data-i18n]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var dict = window.I18N[lang] || window.I18N.en;
      var fd = new FormData(form);
      if (fd.get("website")) { status.className = "form-status ok"; status.textContent = dict["form.ok"]; form.reset(); return; }
      btn.disabled = true; btnLabel.textContent = dict["form.sending"];
      status.className = "form-status"; status.textContent = "";
      var svcOpt = sel && sel.options[sel.selectedIndex];
      var payload = {
        _subject: "Nouveau contact — " + fd.get("name") + (fd.get("company") ? " (" + fd.get("company") + ")" : ""),
        _template: "table",
        _captcha: "false",
        Nom: fd.get("name"),
        Entreprise: fd.get("company") || "-",
        email: fd.get("email"),
        WhatsApp: fd.get("whatsapp") || "-",
        Pays: fd.get("country") || "-",
        Service: svcOpt && svcOpt.value ? svcOpt.text : "-",
        Langue: lang,
        Message: fd.get("message")
      };
      fetch("https://formsubmit.co/ajax/" + CONTACT_EMAIL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (res) {
          if (res && String(res.success) === "true") { status.className = "form-status ok"; status.textContent = dict["form.ok"]; form.reset(); }
          else throw new Error("send failed");
        })
        .catch(function () { status.className = "form-status err"; status.textContent = dict["form.err"]; })
        .then(function () { btn.disabled = false; btnLabel.textContent = dict["form.send"]; });
    });
  }
})();
