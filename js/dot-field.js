/* CP Tracker — hero living field (vanilla port of React Bits DotField, 02).
   Canvas 2D dot grid with cursor bulge + idle wave + diagonal gradient ink.
   Zero dependencies. Pauses off-screen, freezes under reduced motion / ?no-fx.
   Tuned dim for a numbers-first page: 1.3px dots, 18px pitch, 8-12% ink. */
(function () {
  'use strict';

  var canvas = document.getElementById('hero-field');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (/(?:\?|&)no-fx(?:&|$)/.test(window.location.search)) return;

  var hero = canvas.closest('.hero') || canvas.parentElement;
  var ctx = null;
  try {
    ctx = canvas.getContext('2d', { alpha: true });
  } catch (err) {
    return;
  }
  if (!ctx) return;

  var OPTS = {
    dotRadius: 1.3,
    dotSpacing: 18,
    cursorRadius: 150,
    bulgeStrength: 40,
    glowRadius: 140,
    waveAmplitude: 1.4
  };

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var dots = [];
  var W = 0;
  var H = 0;
  var mx = -9999;
  var my = -9999;
  var frame = 0;
  var raf = 0;
  var running = false;
  var visible = true;
  var resizeTimer = 0;

  function build(w, h) {
    var step = OPTS.dotRadius + OPTS.dotSpacing;
    var cols = Math.max(1, Math.floor(w / step));
    var rows = Math.max(1, Math.floor(h / step));
    var padX = (w - cols * step) / 2 + step / 2;
    var padY = (h - rows * step) / 2 + step / 2;
    dots = new Array(cols * rows);
    var i = 0;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var ax = padX + c * step;
        var ay = padY + r * step;
        dots[i++] = { ax: ax, ay: ay, sx: ax, sy: ay };
      }
    }
  }

  function resize() {
    if (!hero) return;
    var rect = hero.getBoundingClientRect();
    var w = Math.round(rect.width);
    var h = Math.round(rect.height);
    if (w <= 0 || h <= 0) return;
    W = w;
    H = h;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build(w, h);
  }

  function scheduleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  }

  function tick() {
    raf = 0;
    if (!visible || document.hidden) {
      running = false;
      return;
    }
    running = true;
    frame++;
    var t = frame * 0.02;
    ctx.clearRect(0, 0, W, H);
    if (W > 0 && H > 0 && dots.length) {
      var grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.11)');
      grad.addColorStop(1, 'rgba(139, 92, 246, 0.08)');
      ctx.fillStyle = grad;
      var cr = OPTS.cursorRadius;
      var crSq = cr * cr;
      var rad = OPTS.dotRadius / 2;
      ctx.beginPath();
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        var dx = mx - d.ax;
        var dy = my - d.ay;
        var distSq = dx * dx + dy * dy;
        if (distSq < crSq) {
          var dist = Math.sqrt(distSq) || 0.001;
          var f = 1 - dist / cr;
          var push = f * f * OPTS.bulgeStrength;
          var ang = Math.atan2(dy, dx);
          d.sx += (d.ax - Math.cos(ang) * push - d.sx) * 0.15;
          d.sy += (d.ay - Math.sin(ang) * push - d.sy) * 0.15;
        } else {
          d.sx += (d.ax - d.sx) * 0.1;
          d.sy += (d.ay - d.sy) * 0.1;
        }
        var x = d.sx + Math.cos(d.ay * 0.03 + t * 0.7) * OPTS.waveAmplitude * 0.5;
        var y = d.sy + Math.sin(d.ax * 0.03 + t) * OPTS.waveAmplitude;
        ctx.moveTo(x + rad, y);
        ctx.arc(x, y, rad, 0, 6.283185307179586);
      }
      ctx.fill();
      /* Soft cursor glow laid with the same amber wash as the eyebrow pill. */
      var g = ctx.createRadialGradient(mx, my, 0, mx, my, OPTS.glowRadius);
      g.addColorStop(0, 'rgba(56, 189, 248, 0.07)');
      g.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(mx, my, OPTS.glowRadius, 0, 6.283185307179586);
      ctx.fill();
    }
    raf = requestAnimationFrame(tick);
  }

  function kick() {
    if (!running && visible && !document.hidden) tick();
  }

  function onMove(e) {
    var rect = canvas.getBoundingClientRect();
    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;
    kick();
  }

  function onLeave() {
    mx = -9999;
    my = -9999;
  }

  resize();
  window.addEventListener('resize', scheduleResize, { passive: true });
  window.addEventListener('mousemove', onMove, { passive: true });
  document.addEventListener('mouseleave', onLeave);
  if ('fonts' in document && document.fonts && document.fonts.ready) {
    document.fonts.ready.then(resize).catch(function () {});
  }

  if ('IntersectionObserver' in window && hero) {
    new IntersectionObserver(
      function (entries) {
        visible = !!entries[0].isIntersecting;
        if (visible) kick();
        else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
          running = false;
        }
      },
      { threshold: 0 }
    ).observe(hero);
  }
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) kick();
  });
  kick();
})();
