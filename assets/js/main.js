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
  var MARK_SVG = '<svg class="logo-mark" viewBox="392 -1059 518 693" fill="currentColor" aria-hidden="true"><path class="lg-top" d="M733.3 -1054.31 C732.86 -1051.87 734.52 -1052.85 736.02 -1052.75 C809.6 -1047.59 858.9 -994.15 866.78 -923.73 C868.67 -906.85 867.84 -894.62 863.38 -879.12 C859.29 -864.91 849.71 -847.53 840.06 -837.11 C839.04 -836.01 838.49 -834.22 837.3 -832.99 C835.24 -830.88 829.21 -828.12 826.3 -828.24 C822.79 -828.4 815.23 -831.99 813.44 -835.26 C808.11 -845.03 814.42 -852.97 818.15 -862.18 C830.89 -893.64 834.84 -920.97 822.85 -951.36 C819.07 -960.93 817.11 -964.47 811.52 -972.1 C775.18 -1021.64 713.94 -1015.31 657.61 -1015.89 C582.39 -1016.66 507.19 -1014.47 431.98 -1015.06 C433.47 -1009.34 432.52 -1003.27 432.73 -997.38 C433.69 -969.54 435.89 -933.75 433.58 -906.36 C433.44 -904.66 432.44 -899.42 431.92 -897.96 C431.73 -897.42 424.47 -890.1 423.88 -889.78 C421.13 -888.29 415.04 -887.51 411.93 -887.92 C409.04 -888.29 400.97 -893.48 399.26 -896.03 C398.8 -896.73 399.29 -898.13 398.81 -898.74 C398.48 -899.16 397.45 -898.86 397.45 -898.93 L397.45 -1052.74 C408.33 -1053.14 419.15 -1053.92 430.08 -1053.49 L431.98 -1054.31 Z"/><path class="lg-body" d="M509.66 -769.85 C510.19 -771.74 513.24 -770.23 514.73 -770.2 C639.05 -767.49 797.88 -792.26 856.08 -652.51 C904.77 -535.6 838.57 -392.35 707.79 -377.9 C649.02 -371.4 582.87 -374.95 523.43 -375.56 C481.13 -376.0 438.92 -376.42 396.66 -377.1 L396.63 -758.89 C400.47 -847.58 450.86 -893.09 538.27 -896.61 C592.16 -898.78 647.49 -894.92 701.52 -896.58 C722.19 -893.96 723.67 -865.52 703.11 -861.25 C652.63 -860.25 601.97 -861.59 551.61 -861.3 C475.71 -860.87 432.73 -836.43 429.59 -755.76 L429.62 -413.98 L501.45 -413.23 C572.85 -412.02 648.47 -406.59 719.47 -416.44 C822.78 -430.78 864.88 -558.18 821.88 -644.98 C789.28 -710.77 731.03 -733.41 660.75 -735.75 C622.64 -737.02 584.6 -733.59 546.54 -734.14 L546.54 -521.1 C546.54 -518.31 541.04 -511.82 538.65 -510.16 C529.72 -503.97 516.64 -507.14 511.88 -517.03 C511.46 -517.89 509.66 -522.99 509.66 -523.45 Z"/></svg>';
  var WORD_SVG = '<svg class="logo-word" viewBox="73 -253 1120 233" fill="currentColor" aria-hidden="true"><path d="M268.76 -138.55 L310.74 -138.55 C317.44 -138.55 328.65 -146.68 332.64 -151.96 C347.28 -171.29 336.45 -202.53 312.11 -205.83 C305.7 -206.7 284.84 -206.8 279.44 -204.38 C275.49 -202.62 268.76 -194.95 268.76 -190.73 Z M356.65 -30.26 L353.51 -30.26 C345.81 -33.19 340.1 -37.55 339.35 -46.32 C337.93 -63.01 343.56 -78.62 331.94 -93.05 C327.9 -98.06 317.26 -105.59 310.74 -105.59 L268.76 -105.59 L268.76 -43.99 C268.76 -43.57 267.42 -40.16 267.06 -39.41 C264.3 -33.66 258.77 -31.84 253.07 -30.26 L249.93 -30.26 C242.3 -32.94 236.66 -37.88 235.81 -46.36 C238.21 -93.28 232.59 -143.43 235.77 -189.98 C237.22 -211.17 251.51 -230.62 271.93 -237.0 C285.54 -241.25 317.93 -240.02 331.28 -234.43 C372.25 -217.28 385.49 -165.12 357.41 -130.33 C353.44 -125.42 347.84 -124.8 352.75 -118.56 C358.74 -110.94 362.87 -108.1 366.98 -98.27 C372.79 -84.4 374.03 -60.51 372.34 -45.56 C371.69 -39.76 367.69 -35.15 362.93 -32.21 ZM934.97 -30.26 L931.83 -30.26 C924.8 -32.78 918.56 -37.56 917.7 -45.56 L917.67 -223.72 C919.11 -243.51 947.45 -244.74 950.66 -225.26 L950.69 -45.53 C950.36 -39.65 946.46 -34.63 941.25 -32.22 ZM81.22 -65.57 L80.43 -65.57 L80.43 -205.25 L81.22 -205.25 C83.27 -159.4 78.48 -111.15 81.22 -65.57M114.57 -122.07 C114.31 -121.67 113.39 -121.11 113.39 -120.89 L113.39 -67.53 C113.39 -65.01 117.9 -63.46 120.06 -63.22 C130.54 -62.03 156.25 -62.31 165.12 -67.6 C190.32 -82.63 178.07 -122.07 153.02 -122.07 Z M113.39 -154.24 L152.23 -154.24 C153.1 -154.24 157.91 -155.57 159.12 -155.99 C185.4 -165.11 180.5 -204.21 151.44 -206.81 C144.33 -207.44 125.17 -207.81 118.54 -206.77 C116.78 -206.5 113.39 -204.14 113.39 -202.5 Z M81.22 -65.57 C78.48 -111.15 83.27 -159.4 81.22 -205.25 C81.17 -220.87 96.45 -236.73 111.63 -238.79 C125.05 -240.61 160.58 -240.1 172.78 -235.21 C201.64 -223.64 214.97 -191.8 206.99 -162.26 C204.35 -152.48 199.22 -145.67 192.68 -138.24 C227.46 -108.66 214.1 -49.21 171.65 -34.38 C158.09 -29.65 130.15 -29.97 115.32 -31.01 C96.91 -32.3 82.31 -47.31 81.22 -65.57M763.3 -64.97 C764.52 -64.09 765.97 -64.09 767.4 -63.97 C797.55 -61.52 822.7 -66.03 842.77 -89.89 C878.22 -132.01 851.42 -198.98 797.15 -205.94 C789.58 -206.91 774.79 -207.79 767.51 -206.74 C765.45 -206.45 763.33 -205.9 762.68 -203.73 Z M759.79 -238.79 C778.37 -241.31 807.74 -239.26 825.32 -232.53 C890.45 -207.6 913.47 -121.56 867.46 -68.34 C838.99 -35.41 804.59 -27.34 761.91 -31.02 C745.11 -32.46 730.55 -48.52 729.34 -65.15 C726.0 -110.97 731.84 -160.89 729.46 -207.13 C731.08 -221.74 745.12 -236.8 759.79 -238.79M500.25 -139.33 L500.25 -171.9 C500.25 -190.94 482.11 -206.66 463.76 -206.66 C445.41 -206.66 427.27 -190.94 427.27 -171.9 L427.27 -139.33 Z M500.25 -106.38 L427.27 -106.38 L427.27 -42.42 C427.27 -40.87 422.57 -34.97 420.94 -33.84 C409.15 -25.68 393.74 -34.56 394.28 -48.66 C396.07 -89.21 392.01 -131.61 394.28 -171.93 C396.02 -202.84 416.79 -231.07 447.8 -237.69 C492.05 -247.14 530.64 -216.49 533.24 -171.93 C535.58 -131.67 531.39 -89.17 533.24 -48.66 C533.89 -34.37 517.6 -25.34 506.13 -34.19 C504.67 -35.32 500.25 -41.02 500.25 -42.42 ZM988.61 -35.25 C986.0 -37.84 983.78 -42.58 983.59 -46.31 C985.63 -88.27 980.98 -132.61 983.59 -174.29 C986.34 -218.31 1028.12 -247.89 1070.89 -237.2 C1097.33 -230.59 1119.97 -204.92 1121.76 -177.43 C1124.57 -134.31 1119.55 -88.18 1121.76 -44.74 C1119.98 -26.54 1090.55 -24.8 1088.74 -47.89 C1085.57 -88.28 1091.63 -132.92 1088.8 -173.5 C1085.81 -216.54 1020.01 -218.16 1016.54 -171.93 L1016.39 -43.4 C1013.77 -31.11 997.38 -26.54 988.61 -35.25M620.91 -238.78 C661.81 -243.12 697.57 -216.02 700.37 -174.29 C703.18 -132.52 698.21 -87.65 700.35 -45.56 C697.37 -26.84 671.77 -25.6 667.46 -44.06 C664.98 -85.69 670.52 -130.7 667.42 -171.93 C663.98 -217.61 597.78 -219.32 594.38 -169.58 C591.61 -129.13 596.49 -85.53 594.44 -44.75 C592.34 -27.63 568.18 -26.0 562.61 -42.01 L562.21 -178.21 C564.36 -207.47 591.77 -235.68 620.91 -238.78M1187.64 -224.87 L1187.64 -45.17 C1185.67 -25.84 1157.38 -25.96 1154.9 -45.78 C1155.05 -106.53 1153.5 -167.58 1155.69 -228.17 C1161.4 -244.32 1186.35 -242.57 1187.64 -224.87"/></svg>';

  var WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.91.99 6.7 2.78a9.41 9.41 0 0 1 2.77 6.7c0 5.22-4.25 9.46-9.47 9.46zm8.06-17.53A11.32 11.32 0 0 0 12.04.63C5.76.63.65 5.74.65 12.02c0 2.01.52 3.97 1.52 5.69L.55 23.6l6.03-1.58a11.36 11.36 0 0 0 5.45 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.33-8.05z"/></svg>';
  var LI_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>';

  var FLAGS = {
    ma: '<path fill="#c1272d" d="M0 0h30v20H0z"/><path fill="none" stroke="#006233" stroke-width="1.5" stroke-linejoin="round" d="M15 5.2l3.06 9.41-8.01-5.82h9.9l-8.01 5.82z"/>',
    sa: '<path fill="#006c35" d="M0 0h30v20H0z"/><path fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" d="M8 9l1.5-2 1.5 2 1.5-2 1.5 2 1.5-2 1.5 2 1.5-2 1.5 2 1.5-2M8.5 13.5h12m0 0l1.5-1m-12 1v-1"/>',
    fr: '<path fill="#fff" d="M0 0h30v20H0z"/><path fill="#002654" d="M0 0h10v20H0z"/><path fill="#ce1126" d="M20 0h10v20H20z"/>',
    ae: '<path fill="#009739" d="M0 0h30v6.67H0z"/><path fill="#fff" d="M0 6.67h30v6.66H0z"/><path fill="#000" d="M0 13.33h30V20H0z"/><path fill="#ef3340" d="M0 0h8v20H0z"/>'
  };
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
    el.innerHTML = '<svg viewBox="73 -1059 1120 1039" fill="currentColor" role="img" aria-label="Brandini"><path class="lg-top" d="M733.3 -1054.31 C732.86 -1051.87 734.52 -1052.85 736.02 -1052.75 C809.6 -1047.59 858.9 -994.15 866.78 -923.73 C868.67 -906.85 867.84 -894.62 863.38 -879.12 C859.29 -864.91 849.71 -847.53 840.06 -837.11 C839.04 -836.01 838.49 -834.22 837.3 -832.99 C835.24 -830.88 829.21 -828.12 826.3 -828.24 C822.79 -828.4 815.23 -831.99 813.44 -835.26 C808.11 -845.03 814.42 -852.97 818.15 -862.18 C830.89 -893.64 834.84 -920.97 822.85 -951.36 C819.07 -960.93 817.11 -964.47 811.52 -972.1 C775.18 -1021.64 713.94 -1015.31 657.61 -1015.89 C582.39 -1016.66 507.19 -1014.47 431.98 -1015.06 C433.47 -1009.34 432.52 -1003.27 432.73 -997.38 C433.69 -969.54 435.89 -933.75 433.58 -906.36 C433.44 -904.66 432.44 -899.42 431.92 -897.96 C431.73 -897.42 424.47 -890.1 423.88 -889.78 C421.13 -888.29 415.04 -887.51 411.93 -887.92 C409.04 -888.29 400.97 -893.48 399.26 -896.03 C398.8 -896.73 399.29 -898.13 398.81 -898.74 C398.48 -899.16 397.45 -898.86 397.45 -898.93 L397.45 -1052.74 C408.33 -1053.14 419.15 -1053.92 430.08 -1053.49 L431.98 -1054.31 Z"/><path class="lg-body" d="M509.66 -769.85 C510.19 -771.74 513.24 -770.23 514.73 -770.2 C639.05 -767.49 797.88 -792.26 856.08 -652.51 C904.77 -535.6 838.57 -392.35 707.79 -377.9 C649.02 -371.4 582.87 -374.95 523.43 -375.56 C481.13 -376.0 438.92 -376.42 396.66 -377.1 L396.63 -758.89 C400.47 -847.58 450.86 -893.09 538.27 -896.61 C592.16 -898.78 647.49 -894.92 701.52 -896.58 C722.19 -893.96 723.67 -865.52 703.11 -861.25 C652.63 -860.25 601.97 -861.59 551.61 -861.3 C475.71 -860.87 432.73 -836.43 429.59 -755.76 L429.62 -413.98 L501.45 -413.23 C572.85 -412.02 648.47 -406.59 719.47 -416.44 C822.78 -430.78 864.88 -558.18 821.88 -644.98 C789.28 -710.77 731.03 -733.41 660.75 -735.75 C622.64 -737.02 584.6 -733.59 546.54 -734.14 L546.54 -521.1 C546.54 -518.31 541.04 -511.82 538.65 -510.16 C529.72 -503.97 516.64 -507.14 511.88 -517.03 C511.46 -517.89 509.66 -522.99 509.66 -523.45 Z"/><path class="lg-word" d="M268.76 -138.55 L310.74 -138.55 C317.44 -138.55 328.65 -146.68 332.64 -151.96 C347.28 -171.29 336.45 -202.53 312.11 -205.83 C305.7 -206.7 284.84 -206.8 279.44 -204.38 C275.49 -202.62 268.76 -194.95 268.76 -190.73 Z M356.65 -30.26 L353.51 -30.26 C345.81 -33.19 340.1 -37.55 339.35 -46.32 C337.93 -63.01 343.56 -78.62 331.94 -93.05 C327.9 -98.06 317.26 -105.59 310.74 -105.59 L268.76 -105.59 L268.76 -43.99 C268.76 -43.57 267.42 -40.16 267.06 -39.41 C264.3 -33.66 258.77 -31.84 253.07 -30.26 L249.93 -30.26 C242.3 -32.94 236.66 -37.88 235.81 -46.36 C238.21 -93.28 232.59 -143.43 235.77 -189.98 C237.22 -211.17 251.51 -230.62 271.93 -237.0 C285.54 -241.25 317.93 -240.02 331.28 -234.43 C372.25 -217.28 385.49 -165.12 357.41 -130.33 C353.44 -125.42 347.84 -124.8 352.75 -118.56 C358.74 -110.94 362.87 -108.1 366.98 -98.27 C372.79 -84.4 374.03 -60.51 372.34 -45.56 C371.69 -39.76 367.69 -35.15 362.93 -32.21 ZM934.97 -30.26 L931.83 -30.26 C924.8 -32.78 918.56 -37.56 917.7 -45.56 L917.67 -223.72 C919.11 -243.51 947.45 -244.74 950.66 -225.26 L950.69 -45.53 C950.36 -39.65 946.46 -34.63 941.25 -32.22 ZM81.22 -65.57 L80.43 -65.57 L80.43 -205.25 L81.22 -205.25 C83.27 -159.4 78.48 -111.15 81.22 -65.57M114.57 -122.07 C114.31 -121.67 113.39 -121.11 113.39 -120.89 L113.39 -67.53 C113.39 -65.01 117.9 -63.46 120.06 -63.22 C130.54 -62.03 156.25 -62.31 165.12 -67.6 C190.32 -82.63 178.07 -122.07 153.02 -122.07 Z M113.39 -154.24 L152.23 -154.24 C153.1 -154.24 157.91 -155.57 159.12 -155.99 C185.4 -165.11 180.5 -204.21 151.44 -206.81 C144.33 -207.44 125.17 -207.81 118.54 -206.77 C116.78 -206.5 113.39 -204.14 113.39 -202.5 Z M81.22 -65.57 C78.48 -111.15 83.27 -159.4 81.22 -205.25 C81.17 -220.87 96.45 -236.73 111.63 -238.79 C125.05 -240.61 160.58 -240.1 172.78 -235.21 C201.64 -223.64 214.97 -191.8 206.99 -162.26 C204.35 -152.48 199.22 -145.67 192.68 -138.24 C227.46 -108.66 214.1 -49.21 171.65 -34.38 C158.09 -29.65 130.15 -29.97 115.32 -31.01 C96.91 -32.3 82.31 -47.31 81.22 -65.57M763.3 -64.97 C764.52 -64.09 765.97 -64.09 767.4 -63.97 C797.55 -61.52 822.7 -66.03 842.77 -89.89 C878.22 -132.01 851.42 -198.98 797.15 -205.94 C789.58 -206.91 774.79 -207.79 767.51 -206.74 C765.45 -206.45 763.33 -205.9 762.68 -203.73 Z M759.79 -238.79 C778.37 -241.31 807.74 -239.26 825.32 -232.53 C890.45 -207.6 913.47 -121.56 867.46 -68.34 C838.99 -35.41 804.59 -27.34 761.91 -31.02 C745.11 -32.46 730.55 -48.52 729.34 -65.15 C726.0 -110.97 731.84 -160.89 729.46 -207.13 C731.08 -221.74 745.12 -236.8 759.79 -238.79M500.25 -139.33 L500.25 -171.9 C500.25 -190.94 482.11 -206.66 463.76 -206.66 C445.41 -206.66 427.27 -190.94 427.27 -171.9 L427.27 -139.33 Z M500.25 -106.38 L427.27 -106.38 L427.27 -42.42 C427.27 -40.87 422.57 -34.97 420.94 -33.84 C409.15 -25.68 393.74 -34.56 394.28 -48.66 C396.07 -89.21 392.01 -131.61 394.28 -171.93 C396.02 -202.84 416.79 -231.07 447.8 -237.69 C492.05 -247.14 530.64 -216.49 533.24 -171.93 C535.58 -131.67 531.39 -89.17 533.24 -48.66 C533.89 -34.37 517.6 -25.34 506.13 -34.19 C504.67 -35.32 500.25 -41.02 500.25 -42.42 ZM988.61 -35.25 C986.0 -37.84 983.78 -42.58 983.59 -46.31 C985.63 -88.27 980.98 -132.61 983.59 -174.29 C986.34 -218.31 1028.12 -247.89 1070.89 -237.2 C1097.33 -230.59 1119.97 -204.92 1121.76 -177.43 C1124.57 -134.31 1119.55 -88.18 1121.76 -44.74 C1119.98 -26.54 1090.55 -24.8 1088.74 -47.89 C1085.57 -88.28 1091.63 -132.92 1088.8 -173.5 C1085.81 -216.54 1020.01 -218.16 1016.54 -171.93 L1016.39 -43.4 C1013.77 -31.11 997.38 -26.54 988.61 -35.25M620.91 -238.78 C661.81 -243.12 697.57 -216.02 700.37 -174.29 C703.18 -132.52 698.21 -87.65 700.35 -45.56 C697.37 -26.84 671.77 -25.6 667.46 -44.06 C664.98 -85.69 670.52 -130.7 667.42 -171.93 C663.98 -217.61 597.78 -219.32 594.38 -169.58 C591.61 -129.13 596.49 -85.53 594.44 -44.75 C592.34 -27.63 568.18 -26.0 562.61 -42.01 L562.21 -178.21 C564.36 -207.47 591.77 -235.68 620.91 -238.78M1187.64 -224.87 L1187.64 -45.17 C1185.67 -25.84 1157.38 -25.96 1154.9 -45.78 C1155.05 -106.53 1153.5 -167.58 1155.69 -228.17 C1161.4 -244.32 1186.35 -242.57 1187.64 -224.87"/></svg>';
  });
  document.querySelectorAll("[data-deco]").forEach(function (el) {
    el.innerHTML = '<svg viewBox="392 -1059 518 693" fill="currentColor" aria-hidden="true"><path d="M733.3 -1054.31 C732.86 -1051.87 734.52 -1052.85 736.02 -1052.75 C809.6 -1047.59 858.9 -994.15 866.78 -923.73 C868.67 -906.85 867.84 -894.62 863.38 -879.12 C859.29 -864.91 849.71 -847.53 840.06 -837.11 C839.04 -836.01 838.49 -834.22 837.3 -832.99 C835.24 -830.88 829.21 -828.12 826.3 -828.24 C822.79 -828.4 815.23 -831.99 813.44 -835.26 C808.11 -845.03 814.42 -852.97 818.15 -862.18 C830.89 -893.64 834.84 -920.97 822.85 -951.36 C819.07 -960.93 817.11 -964.47 811.52 -972.1 C775.18 -1021.64 713.94 -1015.31 657.61 -1015.89 C582.39 -1016.66 507.19 -1014.47 431.98 -1015.06 C433.47 -1009.34 432.52 -1003.27 432.73 -997.38 C433.69 -969.54 435.89 -933.75 433.58 -906.36 C433.44 -904.66 432.44 -899.42 431.92 -897.96 C431.73 -897.42 424.47 -890.1 423.88 -889.78 C421.13 -888.29 415.04 -887.51 411.93 -887.92 C409.04 -888.29 400.97 -893.48 399.26 -896.03 C398.8 -896.73 399.29 -898.13 398.81 -898.74 C398.48 -899.16 397.45 -898.86 397.45 -898.93 L397.45 -1052.74 C408.33 -1053.14 419.15 -1053.92 430.08 -1053.49 L431.98 -1054.31 Z"/></svg>';
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
