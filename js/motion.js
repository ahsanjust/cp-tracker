/* CP Tracker — enchanting text motion (vanilla ports of BlurText 08,
   SplitText 07, ScrollFloat 09). Word-span entrances fire once via IO;
   float drift is transform-only + rAF-throttled + disabled on phones and
   under reduced motion / ?no-fx. Zero dependencies. */
(function () {
  'use strict';

  function killSwitch() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    if (/(?:\?|&)no-fx(?:&|$)/.test(window.location.search)) return true;
    return false;
  }

  function splitWords(el) {
    if (el.dataset.fxSplit === '1') return;
    el.dataset.fxSplit = '1';
    var nodes = Array.prototype.slice.call(el.childNodes);
    var idx = 0;
    nodes.forEach(function (node) {
      if (node.nodeType !== 3) return;
      var frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
          return;
        }
        var s = document.createElement('span');
        s.className = 'fx-w';
        s.style.setProperty('--i', String(idx++));
        s.textContent = part;
        frag.appendChild(s);
      });
      el.replaceChild(frag, node);
    });
  }

  function autoTag() {
    /* Short H2s cascade (SplitText); prose unfurls (BlurText). Numerals,
       links and mono values are never split, so figures stay selectable. */
    document.querySelectorAll('.section-head__title, .band__title').forEach(function (el) {
      if (!el.hasAttribute('data-fx')) el.setAttribute('data-fx', 'split');
    });
    document
      .querySelectorAll('.hero__sub, .section-head__note, .band__note, .board__note')
      .forEach(function (el) {
        if (!el.hasAttribute('data-fx')) el.setAttribute('data-fx', 'blur');
      });
    document.querySelectorAll('[data-fx="blur"], [data-fx="split"]').forEach(splitWords);
  }

  function initEntrances() {
    var els = Array.prototype.slice.call(
      document.querySelectorAll('[data-fx="blur"], [data-fx="split"]')
    );
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) {
        el.classList.add('is-in');
      });
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
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  function initFloat() {
    var els = Array.prototype.slice.call(
      document.querySelectorAll('.section-head__title, .band__title')
    );
    if (!els.length) return;
    if (window.matchMedia('(max-width: 599px)').matches) return;
    var queued = false;
    function update() {
      queued = false;
      var vh = window.innerHeight || 1;
      els.forEach(function (el, k) {
        var r = el.getBoundingClientRect();
        var p = (r.top + r.height / 2 - vh / 2) / vh; /* -0.5..0.5 on screen */
        p = Math.max(-0.5, Math.min(0.5, p));
        var y = (-p * 12).toFixed(2);
        var dir = k % 2 === 0 ? 1 : -1;
        el.style.transform = 'translateY(' + y * dir + 'px)';
      });
    }
    function schedule() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    update();
  }

  if (killSwitch()) {
    document.documentElement.classList.add('no-fx');
    autoTag();
    document.querySelectorAll('[data-fx]').forEach(function (el) {
      el.classList.add('is-in');
    });
    return;
  }
  if (/(?:\?|&)no-fx(?:&|$)/.test(window.location.search)) {
    document.documentElement.classList.add('no-fx');
  }
  autoTag();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initEntrances();
      initFloat();
    });
  } else {
    initEntrances();
    initFloat();
  }
})();
