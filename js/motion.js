/* CP Tracker — hero entrance (the one staged moment on the page).
   Eyebrow and figure land at 0ms, the numeral count-up starts at 120ms
   (see countUp's first-paint delay in app.js), lead/results/CTAs at
   420/460/500ms. Opacity plus an 8px rise, 360ms, no blur — the H1's
   textContent is never touched, find-in-page keeps working, and without JS
   (or under reduced motion / ?no-fx) nothing is ever hidden: the initial
   state only exists behind the html.fx-anim gate set below. */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (/(?:\?|&)no-fx(?:&|$)/.test(window.location.search)) {
    document.documentElement.classList.add('no-fx');
    return;
  }

  document.documentElement.classList.add('fx-anim');

  var STAGE = [
    ['.hero__eyebrow', 0],
    ['.hero__figure', 0],
    ['.hero__sub', 420],
    ['.hero__results', 460],
    ['.cta-row', 500]
  ];

  var els = [];
  STAGE.forEach(function (pair) {
    var el = document.querySelector(pair[0]);
    if (!el) return;
    el.classList.add('fx-rise');
    el.style.transitionDelay = pair[1] + 'ms';
    els.push(el);
  });
  if (!els.length) return;

  function reveal() {
    els.forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  if (!('IntersectionObserver' in window)) {
    reveal();
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    },
    { threshold: 0 }
  );
  els.forEach(function (el) {
    io.observe(el);
  });
})();
