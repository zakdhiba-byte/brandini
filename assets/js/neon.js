/* ==========================================================================
   Brandini — traînée néon qui suit la souris
   Désactivée sur écrans tactiles et si "réduire les animations" est activé.
   Réglages : couleurs, durée de vie et épaisseur ci-dessous.
   ========================================================================== */

(function () {
  if (!window.matchMedia) return;
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var COLOR_START = [254, 210, 62];   // jaune Brandini (tête de la traînée)
  var COLOR_END = [95, 130, 220];     // bleu (queue)
  var LIFE = 420;                     // durée de vie d'un point (ms)
  var WIDTH = 7;                      // épaisseur max (px)
  if (window.BRANDINI_NEON_LIFE) LIFE = window.BRANDINI_NEON_LIFE;

  var canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9999";
  document.body.appendChild(canvas);
  var ctx = canvas.getContext("2d");

  var dpr = 1, w = 0, h = 0;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  var points = [];
  var running = false;

  window.addEventListener("pointermove", function (e) {
    if (e.pointerType && e.pointerType !== "mouse") return;
    points.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    if (points.length > 120) points.shift();
    if (!running) { running = true; requestAnimationFrame(draw); }
  }, { passive: true });

  document.addEventListener("mouseleave", function () { points.length = 0; });

  function mix(a, b, k) {
    return [
      Math.round(a[0] + (b[0] - a[0]) * k),
      Math.round(a[1] + (b[1] - a[1]) * k),
      Math.round(a[2] + (b[2] - a[2]) * k)
    ];
  }

  function draw(now) {
    ctx.clearRect(0, 0, w, h);
    while (points.length && now - points[0].t > LIFE) points.shift();

    if (points.length < 2) {
      running = false;
      ctx.clearRect(0, 0, w, h);
      return;
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // trois passes : halo flou, tube coloré, filament blanc
    for (var pass = 0; pass < 3; pass++) {
      for (var i = 1; i < points.length; i++) {
        var p0 = points[i - 1], p1 = points[i];
        var life = 1 - (now - p1.t) / LIFE;           // 1 = récent, 0 = mort
        if (life <= 0) continue;
        var k = Math.sqrt(life);                       // fondu plus lent : reste lumineux plus longtemps
        var c = mix(COLOR_END, COLOR_START, life);
        var rgb = c[0] + "," + c[1] + "," + c[2];

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);

        if (pass === 0) {
          ctx.shadowBlur = 22;
          ctx.shadowColor = "rgba(" + rgb + "," + k + ")";
          ctx.strokeStyle = "rgba(" + rgb + "," + (0.45 * k) + ")";
          ctx.lineWidth = WIDTH * 2.4 * k + 2;
        } else if (pass === 1) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(" + rgb + ",1)";
          ctx.strokeStyle = "rgba(" + rgb + "," + k + ")";
          ctx.lineWidth = WIDTH * k + 1;
        } else {
          ctx.shadowBlur = 0;
          ctx.strokeStyle = "rgba(255,255,255," + (0.9 * k) + ")";
          ctx.lineWidth = Math.max(0.8, WIDTH * 0.28 * k);
        }
        ctx.stroke();
      }
    }
    ctx.shadowBlur = 0;

    requestAnimationFrame(draw);
  }
})();
