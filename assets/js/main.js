/* ==========================================================================
   Brandini — header/footer partagés, langue, menu, animations, formulaire
   ========================================================================== */

(function () {
  var CONTACT_EMAIL = "contact@brandini.pro";

  /* WhatsApp — numéros au format international, sans "+" ni espaces */
  var TEAM = [
    { name: "Ghita", initials: "G", photo: "assets/img/team-ghita-sm.jpg", role: "team.ghita.role", zone: "team.ghita.zone", flags: ["ma", "sa"], theme: "violet", wa: "212680006050", linkedin: "https://www.linkedin.com/in/lasfar-ghita/" },
    { name: "Zak", initials: "Z", photo: "assets/img/team-zak-sm.jpg", role: "team.zak.role", zone: "team.zak.zone", flags: ["fr", "ae"], theme: "noir", wa: "971507250385", linkedin: "https://www.linkedin.com/in/zakdhiba/" }
  ];

  /* Drapeaux (SVG inline, s'affichent partout, y compris sous Windows) */
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

  // Logo officiel (tracés extraits du PDF) : haut marine (currentColor), bas jaune
  var MARK_SVG =
    '<svg class="logo-mark" viewBox="821 243 283 398" aria-hidden="true">' +
    '<path fill="currentColor" d="M1088.52 297.75 C1074.56 261.79 1045.54 245.79 1008.07 245.37 C953.39 244.75 898.72 245.08 844.04 245.24 C843.87 245.24 843.69 245.27 843.51 245.27 L823.09 245.44 L823.09 247.96 C823.09 262.27 822.88 275.81 823 289.09 C823 289.18 822.99 289.25 822.99 289.34 L822.99 330.24 C822.99 336.03 827.67 340.71 833.46 340.71 C839.25 340.71 843.93 336.03 843.93 330.24 L843.93 289.34 C843.93 289.21 843.91 289.08 843.9 288.94 C843.84 282.25 843.58 275.14 843.58 267.26 C899.83 267.26 953.38 266.61 1006.91 267.44 C1062.94 268.3 1088.45 313.19 1062.9 362.97 C1062.87 363.03 1062.84 363.09 1062.82 363.15 C1058.55 371.91 1071.01 379.3 1077.31 371.85 C1096.3 349.42 1098.88 324.45 1088.52 297.75"/>' +
    '<path fill="#eac14b" d="M1014.87 415.44 C974.54 407.11 932.13 409.16 888.34 408.58 C888.34 440.61 888.35 466.26 888.35 492.77 C888.35 505.94 888.35 519.62 888.34 533.36 L888.34 533.37 L888.34 538.91 L888.34 549.71 L888.34 549.89 C888.34 555.71 893.06 560.41 898.86 560.41 C904.67 560.41 909.37 555.71 909.37 549.89 L909.37 549.21 L909.37 539.86 L909.37 533.75 L909.37 533.37 L909.37 429.43 C938.75 429.43 966.92 427.06 994.53 429.95 C1041.03 434.82 1074.97 472.24 1077.82 517.38 C1080.65 562.09 1052.82 607.75 1008.49 612.79 C954.25 618.97 898.79 614.26 841.91 614.26 C841.91 548.52 841.66 483 842.01 417.5 C842.23 378.03 862.99 357.48 903.11 356.47 C922.59 355.97 942.14 357.05 961.56 356.22 L997.99 356.22 C1003.57 356.22 1008.08 351.7 1008.08 346.13 C1008.08 340.57 1003.57 336.06 997.99 336.06 L957.59 336.06 C940.64 335.57 923.63 336.05 906.65 336.15 C853.63 336.45 823.4 366.09 823.15 418.62 C822.85 484.26 822.99 549.88 823.09 615.52 C823.1 622.23 823.07 627.8 823.07 635.43 C881.83 635.43 940.5 638.64 997.11 635.17 C1050.66 631.88 1091.67 587.62 1096.48 536.1 C1101.75 479.47 1069.79 426.79 1014.87 415.44"/></svg>';
  var WORD_SVG =
    '<svg class="logo-word" viewBox="639 713 642 124" fill="currentColor" aria-hidden="true">' +
    '<path d="M680.85 816.16 C685.5 816.16 689.49 814.54 692.76 811.31 C695.99 808.03 697.6 804.06 697.6 799.4 C697.6 794.74 695.99 790.76 692.76 787.48 C689.49 784.2 685.5 782.56 680.85 782.56 L659.7 782.56 L659.7 813.31 C659.7 814.13 659.97 814.82 660.48 815.38 C661.04 815.9 661.73 816.16 662.55 816.16Z M659.7 763.8 L680.85 763.73 C685.04 763.73 688.62 762.29 691.53 759.43 C694.45 756.5 695.91 752.94 695.91 748.74 C695.91 744.59 694.45 741.05 691.53 738.13 C688.56 735.16 685 733.67 680.85 733.67 L662.55 733.67 C661.73 733.67 661.04 733.96 660.48 734.52 C659.97 735.09 659.7 735.78 659.7 736.59Z M640.88 736.59 C640.88 730.6 643 725.48 647.25 721.23 C651.51 717.02 656.61 714.92 662.55 714.92 L680.85 714.92 C690.23 714.92 698.22 718.22 704.83 724.84 C711.44 731.44 714.75 739.41 714.75 748.74 C714.75 759.3 711.44 767.34 704.83 772.88 C712.62 778.82 716.52 787.66 716.52 799.4 C716.52 809.18 713.03 817.57 706.06 824.54 C699.09 831.5 690.69 834.99 680.85 834.99 L662.55 834.99 C656.61 834.99 651.51 832.86 647.25 828.61 C643 824.35 640.88 819.25 640.88 813.31ZM770.32 773.03 C775.75 773.03 780.4 771.13 784.23 767.35 C788.08 763.5 790 758.87 790 753.43 C790 747.95 788.08 743.28 784.23 739.44 C780.4 735.65 775.75 733.75 770.32 733.75 L761.48 733.75 C757.64 733.75 754.64 734.8 752.49 736.9 C750.8 738.59 749.73 740.59 749.26 742.89 C749.16 743.46 749.11 744.36 749.11 745.58 L749.11 773.03Z M790 811.47 C790 806.03 788.08 801.39 784.23 797.55 C780.75 794.02 776.6 792.12 771.78 791.87 L749.11 791.87 L749.11 825.69 C749.11 828.25 748.21 830.42 746.42 832.22 C744.57 834.07 742.37 834.99 739.81 834.99 L739.65 834.99 C737.04 834.99 734.86 834.07 733.12 832.22 C731.27 830.48 730.35 828.3 730.35 825.69 L730.35 744.9 C730.35 736.64 733.27 729.6 739.11 723.75 C745 717.87 752.07 714.91 760.33 714.91 L770.32 714.91 C780.94 714.91 789.97 718.69 797.46 726.22 C805 733.75 808.76 742.82 808.76 753.43 C808.76 763.99 805 773.03 797.46 780.56 L795.68 782.41 L797.53 784.33 C805.02 791.81 808.76 800.85 808.76 811.47 L808.76 825.69 C808.76 828.3 807.83 830.48 805.99 832.22 C804.15 834.07 801.97 834.99 799.46 834.99 L799.3 834.99 C796.79 834.99 794.61 834.07 792.77 832.22 C790.92 830.48 790 828.3 790 825.69ZM882.55 772.65 L882.55 754.66 C882.55 748.87 880.53 743.92 876.48 739.82 C872.38 735.73 867.41 733.67 861.56 733.67 C855.77 733.67 850.83 735.73 846.74 739.82 C842.69 743.92 840.66 748.87 840.66 754.66 L840.66 772.65Z M901.39 825.69 C901.39 828.3 900.46 830.48 898.62 832.22 C896.77 834.07 894.59 834.99 892.08 834.99 L891.85 834.99 C889.34 834.99 887.17 834.07 885.32 832.22 C883.47 830.48 882.55 828.3 882.55 825.69 L882.55 791.41 L840.66 791.41 L840.66 825.69 C840.66 828.3 839.73 830.48 837.89 832.22 C836.05 834.07 833.87 834.99 831.36 834.99 L831.13 834.99 C828.61 834.99 826.44 834.07 824.59 832.22 C822.74 830.48 821.83 828.3 821.83 825.69 L821.83 754.66 C821.83 743.7 825.72 734.32 833.51 726.52 C841.3 718.78 850.65 714.91 861.56 714.91 C872.54 714.91 881.91 718.78 889.7 726.52 C897.49 734.32 901.39 743.7 901.39 754.66ZM997.86 825.69 C997.86 828.3 996.94 830.48 995.09 832.22 C993.24 834.07 991.07 834.99 988.56 834.99 L988.33 834.99 C985.82 834.99 983.64 834.07 981.79 832.22 C979.95 830.48 979.02 828.3 979.02 825.69 L979.02 754.66 C979.02 748.87 977 743.92 972.96 739.82 C968.85 735.73 963.88 733.67 958.04 733.67 C952.25 733.67 947.3 735.73 943.21 739.82 C939.16 743.92 937.13 748.87 937.13 754.66 L937.13 825.69 C937.13 828.3 936.21 830.48 934.36 832.22 C932.51 834.07 930.34 834.99 927.83 834.99 L927.61 834.99 C925.09 834.99 922.91 834.07 921.06 832.22 C919.22 830.48 918.3 828.3 918.3 825.69 L918.3 754.66 C918.3 743.7 922.2 734.32 929.98 726.52 C937.78 718.78 947.13 714.91 958.04 714.91 C969.01 714.91 978.39 718.78 986.17 726.52 C993.97 734.32 997.86 743.7 997.86 754.66ZM1033.6 813.31 C1033.6 814.13 1033.86 814.82 1034.37 815.39 C1034.93 815.9 1035.63 816.15 1036.45 816.15 L1048.06 816.15 C1059.48 816.15 1069.21 812.15 1077.26 804.16 C1085.31 796.12 1089.33 786.38 1089.33 774.95 C1089.33 763.52 1085.31 753.79 1077.26 745.74 C1069.21 737.7 1059.48 733.67 1048.06 733.67 L1036.45 733.67 C1035.63 733.67 1034.93 733.96 1034.37 734.51 C1033.86 735.08 1033.6 735.78 1033.6 736.6Z M1048.06 714.91 C1064.61 714.91 1078.75 720.78 1090.49 732.52 C1102.22 744.25 1108.09 758.4 1108.09 774.95 C1108.09 791.51 1102.22 805.65 1090.49 817.39 C1078.75 829.11 1064.61 834.99 1048.06 834.99 L1036.45 834.99 C1030.5 834.99 1025.4 832.86 1021.15 828.6 C1016.9 824.35 1014.77 819.25 1014.77 813.31 L1014.77 736.6 C1014.77 730.59 1016.9 725.48 1021.15 721.22 C1025.4 717.03 1030.5 714.91 1036.45 714.91ZM1132.99 714.91 C1135.51 714.91 1137.69 715.81 1139.53 717.6 C1141.37 719.45 1142.29 721.65 1142.29 724.22 L1142.29 825.69 C1142.29 828.3 1141.37 830.48 1139.53 832.21 C1137.69 834.06 1135.51 834.99 1132.99 834.99 L1132.77 834.99 C1130.25 834.99 1128.07 834.06 1126.23 832.21 C1124.38 830.48 1123.47 828.3 1123.47 825.69 L1123.47 724.22 C1123.47 721.65 1124.38 719.45 1126.23 717.6 C1128.07 715.81 1130.25 714.91 1132.77 714.91ZM1241.08 825.69 C1241.08 828.3 1240.16 830.48 1238.31 832.22 C1236.46 834.07 1234.29 834.99 1231.78 834.99 L1231.55 834.99 C1229.04 834.99 1226.86 834.07 1225.01 832.22 C1223.17 830.48 1222.24 828.3 1222.24 825.69 L1222.24 754.66 C1222.24 748.87 1220.22 743.92 1216.18 739.82 C1212.07 735.73 1207.1 733.67 1201.26 733.67 C1195.47 733.67 1190.52 735.73 1186.42 739.82 C1182.37 743.92 1180.35 748.87 1180.35 754.66 L1180.35 825.69 C1180.35 828.3 1179.43 830.48 1177.58 832.22 C1175.73 834.07 1173.56 834.99 1171.05 834.99 L1170.82 834.99 C1168.31 834.99 1166.13 834.07 1164.28 832.22 C1162.44 830.48 1161.52 828.3 1161.52 825.69 L1161.52 754.66 C1161.52 743.7 1165.41 734.32 1173.2 726.52 C1180.99 718.78 1190.35 714.91 1201.26 714.91 C1212.22 714.91 1221.61 718.78 1229.39 726.52 C1237.18 734.32 1241.08 743.7 1241.08 754.66ZM1269.82 714.91 C1272.34 714.91 1274.52 715.81 1276.36 717.6 C1278.2 719.45 1279.12 721.65 1279.12 724.22 L1279.12 825.69 C1279.12 828.3 1278.2 830.48 1276.36 832.21 C1274.52 834.06 1272.34 834.99 1269.82 834.99 L1269.6 834.99 C1267.08 834.99 1264.9 834.06 1263.07 832.21 C1261.22 830.48 1260.3 828.3 1260.3 825.69 L1260.3 724.22 C1260.3 721.65 1261.22 719.45 1263.07 717.6 C1264.9 715.81 1267.08 714.91 1269.6 714.91Z"/></svg>';
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
    return '<a class="wa-card wa-' + m.theme + '" data-wa="' + m.wa + '" href="https://wa.me/' + m.wa + '" target="_blank" rel="noopener">' +
      '<span class="wa-avatar">' + (m.photo ? '<img src="' + m.photo + '" alt="" width="60" height="60">' : m.initials) + "</span>" +
      '<span class="who"><strong>' + m.name + " " + flagsHtml(m.flags) + '</strong><span data-i18n="' + m.role + '"></span></span>' +
      '<span class="wa-icon">' + WA_SVG + "</span></a>";
  }
  var INSTAGRAM = "https://instagram.com/brandini.pro";
  var LINKEDIN = "https://www.linkedin.com/company/brandini-agency";

  var page = document.body.getAttribute("data-page") || "";

  /* ---------- Header & footer (communs à toutes les pages) ---------- */

  var navItems = [
    ["/", "nav.home", "home"],
    ["/services", "nav.services", "services"],
    ["/media-hub/", "nav.work", "hub"],
    ["/agence", "nav.agency", "agency"],
    ["/contact", "nav.contact", "contact"]
  ];

  var header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<div class="container nav">' +
        '<a href="/" class="logo" aria-label="Brandini">' + LOGO_HTML + '</a>' +
        '<ul class="nav-links" id="nav-links">' +
          navItems.map(function (n) {
            return '<li><a href="' + n[0] + '" data-i18n="' + n[1] + '"' +
              (page === n[2] ? ' class="active" aria-current="page"' : "") + "></a></li>";
          }).join("") +
          '<li class="nav-cta"><a href="/contact" data-i18n="nav.cta"></a></li>' +
        "</ul>" +
        '<div class="nav-right">' +
          '<button type="button" class="theme-toggle" aria-label="Thème sombre / clair" title="Thème sombre / clair">' +
            '<svg class="ico-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
            '<svg class="ico-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"/></svg>' +
          '</button>' +
          '<div class="lang-switch" role="group" aria-label="Language">' +
            '<button type="button" data-lang="fr">FR</button>' +
            '<button type="button" data-lang="en">EN</button>' +
          "</div>" +
          '<a href="/contact" class="btn btn-primary btn-sm" data-i18n="nav.cta"></a>' +
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
          '<div><a href="/" class="logo" aria-label="Brandini">' + LOGO_HTML + '</a><p data-i18n="footer.tagline"></p></div>' +
          '<div class="footer-col"><h4 data-i18n="footer.nav"></h4><ul>' +
            navItems.map(function (n) {
              return '<li><a href="' + n[0] + '" data-i18n="' + n[1] + '"></a></li>';
            }).join("") +
          "</ul></div>" +
          '<div class="footer-col"><h4 data-i18n="footer.services"></h4><ul>' +
            '<li><a href="/services" data-i18n="svc.strategy"></a></li>' +
            '<li><a href="/services" data-i18n="svc.identity"></a></li>' +
            '<li><a href="/services" data-i18n="svc.web"></a></li>' +
            '<li><a href="/services" data-i18n="svc.content"></a></li>' +
            '<li><a href="/services" data-i18n="svc.events"></a></li>' +
          "</ul></div>" +
          '<div class="footer-col"><h4 data-i18n="footer.contact"></h4><ul>' +
            '<li><a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + "</a></li>" +
            '<li><a href="' + INSTAGRAM + '" target="_blank" rel="noopener">Instagram</a></li>' +
            '<li><a href="' + LINKEDIN + '" target="_blank" rel="noopener">LinkedIn</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-big" aria-hidden="true">' + WORD_SVG.replace('class="logo-word"', 'class="footer-word"') + '</div>' +
        '<div class="footer-bottom">' +
          "<span>© " + new Date().getFullYear() + ' Brandini. <span data-i18n="footer.rights"></span></span>' +
          '<a href="/mentions-legales" data-i18n="footer.legal"></a>' +
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

  var LI_SVG =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>';

  // Page Contact : carte avec deux actions (WhatsApp + LinkedIn)
  function contactCard(m) {
    return '<div class="wa-card contact-card wa-' + m.theme + '">' +
      '<span class="wa-avatar">' + (m.photo ? '<img src="' + m.photo + '" alt="" width="60" height="60">' : m.initials) + "</span>" +
      '<span class="who"><strong>' + m.name + " " + flagsHtml(m.flags) + '</strong><span data-i18n="' + m.role + '"></span></span>' +
      '<span class="cc-actions">' +
        '<a class="cc-btn cc-wa" data-wa="' + m.wa + '" href="https://wa.me/' + m.wa + '" target="_blank" rel="noopener" aria-label="WhatsApp ' + m.name + '">' + WA_SVG + "</a>" +
        '<a class="cc-btn cc-li" href="' + m.linkedin + '" target="_blank" rel="noopener" aria-label="LinkedIn ' + m.name + '">' + LI_SVG + "</a>" +
      "</span></div>";
  }
  document.querySelectorAll("[data-wa-cards]").forEach(function (el) {
    el.innerHTML = TEAM.map(contactCard).join("");
  });
  document.querySelectorAll("[data-flags]").forEach(function (el) {
    el.innerHTML = flagsHtml(el.getAttribute("data-flags").split(","));
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

  /* ---------- Thème clair / sombre ---------- */

  function applyTheme(t) {
    var dark = t === "dark";
    if (dark) document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#0b1120" : "#f4f5f7");
    var b = document.querySelector(".theme-toggle");
    if (b) b.setAttribute("aria-pressed", dark ? "true" : "false");
  }
  applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".theme-toggle")) return;
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.classList.add("theme-anim");
    applyTheme(next);
    try { localStorage.setItem("brandini-theme", next); } catch (err) {}
    setTimeout(function () { document.documentElement.classList.remove("theme-anim"); }, 600);
  });

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
    reveals.forEach(function (el) {
      // ce qui est déjà à l'écran au chargement apparaît tout de suite
      if (el.getBoundingClientRect().top < window.innerHeight) {
        requestAnimationFrame(function () { el.classList.add("in"); });
      } else {
        io.observe(el);
      }
    });
    // sécurité : si l'animation ne s'est pas déclenchée, on affiche tout
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.in)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.5) el.classList.add("in");
      });
    }, 1500);
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Chiffres clés : compteur animé ---------- */

  var counters = document.querySelectorAll("[data-count]");
  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function runCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var start = null, dur = 1800;
    function step(t) {
      if (!start) start = t;
      var k = Math.min(1, (t - start) / dur);
      var eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(target * eased).toLocaleString(window.__lang === "en" ? "en-US" : "fr-FR");
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length && !reduceMotion && "IntersectionObserver" in window) {
    counters.forEach(function (el) { el.textContent = "0"; });
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCounter(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Offres : carrousel mobile ---------- */

  var offers = document.querySelector(".offers");
  if (offers && window.matchMedia && matchMedia("(max-width: 760px)").matches) {
    var cards = offers.querySelectorAll(".offer");
    var dots = document.createElement("div");
    dots.className = "offers-dots";
    dots.setAttribute("aria-hidden", "true");
    cards.forEach(function () { dots.appendChild(document.createElement("span")); });
    offers.parentNode.insertBefore(dots, offers.nextSibling);
    function current() {
      var mid = offers.scrollLeft + offers.clientWidth / 2, best = 0, dist = Infinity;
      cards.forEach(function (c, i) {
        var d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
        if (d < dist) { dist = d; best = i; }
      });
      dots.querySelectorAll("span").forEach(function (d, i) { d.classList.toggle("on", i === best); });
    }
    var featured = offers.querySelector(".offer.featured");
    if (featured) offers.scrollLeft = featured.offsetLeft - (offers.clientWidth - featured.offsetWidth) / 2;
    offers.addEventListener("scroll", current, { passive: true });
    current();
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

      var fd = new FormData(form);
      // Champ anti-spam rempli = robot : on fait comme si c'était envoyé
      if (fd.get("website")) {
        status.className = "form-status ok";
        status.textContent = dict["form.ok"];
        form.reset();
        btn.disabled = false;
        btnLabel.textContent = dict["form.send"];
        return;
      }
      var payload = {
        _subject: "Nouveau projet — " + fd.get("name") + (fd.get("company") ? " (" + fd.get("company") + ")" : ""),
        _template: "table",
        _captcha: "false",
        Nom: fd.get("name"),
        email: fd.get("email"),
        Entreprise: fd.get("company") || "-",
        Budget: fd.get("budget") || "-",
        Besoins: fd.getAll("needs[]").join(", ") || "-",
        Langue: window.__lang,
        Message: fd.get("message")
      };

      // Envoi via FormSubmit (gratuit, pas de serveur) vers CONTACT_EMAIL
      fetch("https://formsubmit.co/ajax/" + CONTACT_EMAIL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (res) {
          if (res && String(res.success) === "true") {
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
