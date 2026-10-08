/* ==========================================================================
   Brandini — header/footer partagés, langue, menu, animations, formulaire
   ========================================================================== */

(function () {
  var CONTACT_EMAIL = "contact@brandini.pro";

  /* WhatsApp — numéros au format international, sans "+" ni espaces */
  var TEAM = [
    { name: "Ghita", initials: "G", role: "team.ghita.role", zone: "team.ghita.zone", wa: "212680006050", display: "+212 680 006 050" },
    { name: "Zak", initials: "Z", role: "team.zak.role", zone: "team.zak.zone", wa: "971507250385", display: "+971 50 725 0385" }
  ];

  var MARK_SVG =
    '<svg class="logo-mark" viewBox="46 14 54 74" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">' +
    '<path d="M51.5 32V19.5H83A11.5 11.5 0 0 1 94.5 31V37.5"/>' +
    '<path d="M81 34.5H61A9.5 9.5 0 0 0 51.5 44V82H81A13.5 13.5 0 0 0 94.5 68.5V60.5A13.5 13.5 0 0 0 81 47H63V70.5"/></svg>';
  var WORD_SVG =
    '<svg class="logo-word" viewBox="18 96 111 23" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M21 117V99.5h5a3.5 4 0 0 1 0 8H21M21 107.5h5.5a4 4.25 0 0 1 0 8.5H21M36 117V99.5h6a4 4.25 0 0 1 0 8.5H36M42 108a4 4 0 0 1 4 4V117M51 117V105a5.5 5.5 0 0 1 11 0V117M51 108.5H62M68 117V105a5 5.5 0 0 1 10 0V117M84 99.5V116h5a8 8.25 0 0 0 0-16.5H84ZM103 98V117M109 117V105a5.25 5.5 0 0 1 10.5 0V117M126 98V117"/></svg>';
  var LOGO_HTML = MARK_SVG + WORD_SVG;

  var WA_SVG =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.91.99 6.7 2.78a9.41 9.41 0 0 1 2.77 6.7c0 5.22-4.25 9.46-9.47 9.46zm8.06-17.53A11.32 11.32 0 0 0 12.04.63C5.76.63.65 5.74.65 12.02c0 2.01.52 3.97 1.52 5.69L.55 23.6l6.03-1.58a11.36 11.36 0 0 0 5.45 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.33-8.05z"/></svg>';

  function waLink(m) {
    var msg = (window.__lang === "en")
      ? "Hello " + m.name + ", I'd like to talk about a project with Brandini."
      : "Bonjour " + m.name + ", je souhaite parler d'un projet avec Brandini.";
    return "https://wa.me/" + m.wa + "?text=" + encodeURIComponent(msg);
  }

  function waCard(m) {
    return '<a class="wa-card" data-wa="' + m.wa + '" href="https://wa.me/' + m.wa + '" target="_blank" rel="noopener">' +
      '<span class="wa-avatar">' + m.initials + "</span>" +
      '<span class="who"><strong>' + m.name + '</strong><span data-i18n="' + m.role + '"></span><small><span data-i18n="' + m.zone + '"></span> · ' + m.display + "</small></span>" +
      '<span class="wa-icon">' + WA_SVG + "</span></a>";
  }
  var INSTAGRAM = "https://instagram.com/brandini.pro";
  var LINKEDIN = "https://linkedin.com/company/brandini";

  var page = document.body.getAttribute("data-page") || "";

  /* ---------- Header & footer (communs à toutes les pages) ---------- */

  var navItems = [
    ["index.html", "nav.home", "home"],
    ["services.html", "nav.services", "services"],
    ["realisations.html", "nav.work", "work"],
    ["agence.html", "nav.agency", "agency"],
    ["contact.html", "nav.contact", "contact"]
  ];

  var header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<div class="container nav">' +
        '<a href="index.html" class="logo" aria-label="Brandini">' + LOGO_HTML + '</a>' +
        '<ul class="nav-links" id="nav-links">' +
          navItems.map(function (n) {
            return '<li><a href="' + n[0] + '" data-i18n="' + n[1] + '"' +
              (page === n[2] ? ' class="active" aria-current="page"' : "") + "></a></li>";
          }).join("") +
        "</ul>" +
        '<div class="nav-right">' +
          '<div class="lang-switch" role="group" aria-label="Language">' +
            '<button type="button" data-lang="fr">FR</button>' +
            '<button type="button" data-lang="en">EN</button>' +
          "</div>" +
          '<a href="contact.html" class="btn btn-primary btn-sm" data-i18n="nav.cta"></a>' +
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
          '<div><a href="index.html" class="logo" aria-label="Brandini">' + LOGO_HTML + '</a><p data-i18n="footer.tagline"></p></div>' +
          '<div class="footer-col"><h4 data-i18n="footer.nav"></h4><ul>' +
            navItems.map(function (n) {
              return '<li><a href="' + n[0] + '" data-i18n="' + n[1] + '"></a></li>';
            }).join("") +
          "</ul></div>" +
          '<div class="footer-col"><h4 data-i18n="footer.services"></h4><ul>' +
            '<li><a href="services.html" data-i18n="svc.strategy"></a></li>' +
            '<li><a href="services.html" data-i18n="svc.identity"></a></li>' +
            '<li><a href="services.html" data-i18n="svc.web"></a></li>' +
            '<li><a href="services.html" data-i18n="svc.content"></a></li>' +
          "</ul></div>" +
          '<div class="footer-col"><h4 data-i18n="footer.contact"></h4><ul>' +
            '<li><a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + "</a></li>" +
            TEAM.map(function (m) {
              return '<li><a data-wa="' + m.wa + '" href="https://wa.me/' + m.wa + '" target="_blank" rel="noopener">WhatsApp ' + m.name + "</a></li>";
            }).join("") +
            '<li><a href="' + INSTAGRAM + '" target="_blank" rel="noopener">Instagram</a></li>' +
            '<li><a href="' + LINKEDIN + '" target="_blank" rel="noopener">LinkedIn</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-big" aria-hidden="true">BRANDINI</div>' +
        '<div class="footer-bottom">' +
          "<span>© " + new Date().getFullYear() + ' Brandini. <span data-i18n="footer.rights"></span></span>' +
          '<a href="mentions-legales.html" data-i18n="footer.legal"></a>' +
        "</div>" +
      "</div>";
  }

  /* ---------- WhatsApp : bouton flottant + cartes ---------- */

  var waFloat = document.createElement("div");
  waFloat.className = "wa-float";
  waFloat.innerHTML =
    '<div class="wa-menu" id="wa-menu"><p data-i18n="wa.choose"></p>' + TEAM.map(waCard).join("") + "</div>" +
    '<button type="button" class="wa-float-btn" aria-label="WhatsApp" aria-expanded="false" aria-controls="wa-menu">' + WA_SVG + "</button>";
  document.body.appendChild(waFloat);
  var waBtn = waFloat.querySelector(".wa-float-btn");
  waBtn.addEventListener("click", function () {
    var open = waFloat.classList.toggle("open");
    waBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("click", function (e) {
    if (!waFloat.contains(e.target)) {
      waFloat.classList.remove("open");
      waBtn.setAttribute("aria-expanded", "false");
    }
  });

  document.querySelectorAll("[data-wa-cards]").forEach(function (el) {
    el.innerHTML = TEAM.map(waCard).join("");
  });
  document.querySelectorAll("[data-wa-member]").forEach(function (el) {
    var m = TEAM.filter(function (t) { return t.name === el.getAttribute("data-wa-member"); })[0];
    if (m) el.innerHTML = WA_SVG + "WhatsApp";
    if (m) { el.setAttribute("data-wa", m.wa); el.href = "https://wa.me/" + m.wa; el.target = "_blank"; el.rel = "noopener"; }
  });

  /* ---------- Langue ---------- */

  function getLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "fr" || q === "en") return q;
    try {
      var saved = localStorage.getItem("brandini-lang");
      if (saved === "fr" || saved === "en") return saved;
    } catch (e) {}
    return (navigator.language || "fr").toLowerCase().indexOf("fr") === 0 ? "fr" : "en";
  }

  function applyLang(lang) {
    var dict = (window.I18N && window.I18N[lang]) || {};
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n")];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n-ph")];
      if (v != null) el.setAttribute("placeholder", v);
    });

    var t = document.body.getAttribute("data-title-" + lang);
    if (t) document.title = t;
    var d = document.body.getAttribute("data-desc-" + lang);
    var meta = document.querySelector('meta[name="description"]');
    if (d && meta) meta.setAttribute("content", d);

    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    try { localStorage.setItem("brandini-lang", lang); } catch (e) {}
    window.__lang = lang;

    document.querySelectorAll("[data-wa]").forEach(function (a) {
      var m = TEAM.filter(function (t) { return t.wa === a.getAttribute("data-wa"); })[0];
      if (m) a.href = waLink(m);
    });
  }

  applyLang(getLang());

  document.addEventListener("click", function (e) {
    var b = e.target.closest(".lang-switch button");
    if (b) applyLang(b.getAttribute("data-lang"));
  });

  /* ---------- Menu mobile ---------- */

  var toggle = document.querySelector(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Header au scroll ---------- */

  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Animations d'apparition ---------- */

  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Filtres réalisations ---------- */

  var filters = document.querySelectorAll(".filter");
  var grid = document.querySelector(".work-grid");
  filters.forEach(function (f) {
    f.addEventListener("click", function () {
      var cat = f.getAttribute("data-filter");
      filters.forEach(function (x) { x.classList.toggle("on", x === f); });
      if (grid) grid.classList.toggle("filtered", cat !== "all");
      document.querySelectorAll(".work-card").forEach(function (c) {
        var show = cat === "all" || (c.getAttribute("data-cat") || "").indexOf(cat) !== -1;
        c.classList.toggle("hidden", !show);
        if (show) c.classList.add("in");
      });
    });
  });

  /* ---------- Formulaire de contact ---------- */

  var form = document.getElementById("contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    var btn = form.querySelector('button[type="submit"]');
    var btnLabel = btn.querySelector("[data-i18n]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var dict = window.I18N[window.__lang] || window.I18N.fr;
      btn.disabled = true;
      btnLabel.textContent = dict["form.sending"];
      status.className = "form-status";
      status.textContent = "";

      var data = new FormData(form);
      data.append("lang", window.__lang);

      fetch(form.getAttribute("action"), { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
        .then(function (res) {
          if (res && res.ok) {
            status.className = "form-status ok";
            status.textContent = dict["form.ok"];
            form.reset();
          } else {
            throw new Error("send failed");
          }
        })
        .catch(function () {
          status.className = "form-status err";
          status.textContent = dict["form.err"];
        })
        .then(function () {
          btn.disabled = false;
          btnLabel.textContent = dict["form.send"];
        });
    });
  }
})();
