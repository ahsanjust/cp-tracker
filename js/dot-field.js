/* CP Tracker — hero living field (vanilla port of React Bits DotField, 02).
   Canvas dot grid, idle-quiescent: no rAF loop while the pointer is still.
   Motion wakes for 600ms after pointer movement inside the hero, then one
   static frame is drawn and the loop stops. 32px pitch, 1px dots, rest ink at
   10% --text-3; within 140px of the pointer dots ease toward --accent at 45%
   with ≤4px displacement. DPR capped at 1.5. Starts after first paint via
   requestIdleCallback. Disabled under reduced motion, coarse pointers,
   saveData, or ?no-fx — the CSS hairline grid underneath is the fallback. */
(function () {
  'use strict';

  var canvas = document.getElementById('hero-field');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (navigator.connection && navigator.connection.saveData) return;
  if (/(?:\?|&)no-fx(?:&|$)/.test(window.location.search)) return;

  var hero = canvas.closest('.hero') || canvas.parentElement;
  var ctx = null;
  try {
    ctx = canvas.getContext('2d', { alpha: true });
  } catch (err) {
    return;
  }
  if (!ctx) return;

  var PITCH = 32;
  var RADIUS = 1;
  var NEAR = 140;
  var REST_A = 0.10;
  var NEAR_A = 0.45;
  var MAX_PUSH = 4;
  var IDLE_MS = 600;

  function channel(value, fallback) {
    var m = /#([0-9a-f]{6})/i.exec(String(value || ''));
    if (!m) return fallback;
    var n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  var style = window.getComputedStyle(document.documentElement);
  var REST = channel(style.getPropertyValue('--text-3'), [138, 148, 166]);
  var ACC = channel(style.getPropertyValue('--accent'), [56, 189, 248]);

  var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  var dots = [];
  var W = 0;
  var H = 0;
  var mx = -9999;
  var my = -9999;
  var raf = 0;
  var idleTimer = 0;
  var visible = true;
  var resizeTimer = 0;

  function build(w, h) {
    dots = [];
    var padX = (w % PITCH) / 2 + PITCH / 2;
    var padY = (h % PITCH) / 2 + PITCH / 2;
    for (var y = padY; y <= h; y += PITCH) {
      for (var x = padX; x <= w; x += PITCH) {
        dots.push(x, y);
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
    draw();
  }

  function scheduleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  }

  /* One frame. `live` applies the cursor field; the settled frame is pure
     rest ink, so the stopped state costs nothing and looks intentional. */
  function draw(live) {
    ctx.clearRect(0, 0, W, H);
    if (!dots.length) return;
    for (var i = 0; i < dots.length; i += 2) {
      var x = dots[i];
      var y = dots[i + 1];
      var t = 0;
      var dx = 0;
      var dy = 0;
      if (live) {
        var vx = x - mx;
        var vy = y - my;
        var dist = Math.sqrt(vx * vx + vy * vy);
        if (dist < NEAR && dist > 0.001) {
          t = 1 - dist / NEAR;
          var push = t * t * MAX_PUSH;
          dx = (vx / dist) * push;
          dy = (vy / dist) * push;
        }
      }
      var a = REST_A + (NEAR_A - REST_A) * t;
      var r = Math.round(REST[0] + (ACC[0] - REST[0]) * t);
      var g = Math.round(REST[1] + (ACC[1] - REST[1]) * t);
      var b = Math.round(REST[2] + (ACC[2] - REST[2]) * t);
      ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a.toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(x + dx, y + dy, RADIUS, 0, 6.283185307179586);
      ctx.fill();
    }
  }

  function frame() {
    raf = 0;
    if (!visible || document.hidden) return;
    draw(true);
    raf = requestAnimationFrame(frame);
  }

  function kick() {
    if (!visible || document.hidden) return;
    if (!raf) raf = requestAnimationFrame(frame);
  }

  /* The pointer stopped: cancel the loop and land one static frame. */
  function settle() {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    mx = -9999;
    my = -9999;
    draw(false);
  }

  function onMove(e) {
    var rect = canvas.getBoundingClientRect();
    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;
    kick();
    clearTimeout(idleTimer);
    idleTimer = setTimeout(settle, IDLE_MS);
  }

  function start() {
    resize();
    window.addEventListener('resize', scheduleResize, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    if ('fonts' in document && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(resize).catch(function () {});
    }
    if ('IntersectionObserver' in window && hero) {
      new IntersectionObserver(
        function (entries) {
          visible = !!entries[0].isIntersecting;
          if (!visible && raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
        },
        { threshold: 0 }
      ).observe(hero);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
  }

  /* After the numeral has painted — the field is atmosphere, never LCP. */
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(start, { timeout: 1500 });
  } else {
    window.setTimeout(start, 0);
  }
})();
