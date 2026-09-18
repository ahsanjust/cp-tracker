/* ==========================================================================
   CP Tracker — application logic
   Renders the record from config.json, with an inline offline snapshot,
   live sync, and an accessible (canvas-free) analytics layer.

   Sections
   1. Offline snapshot   4. Renderers
   2. Platform helpers   5. Sync
   3. State              6. Interaction & init
   ========================================================================== */

(function () {
  'use strict';

  /* 1. Offline snapshot -----------------------------------------------------
     config.json is the source of truth: sync_server.py and the daily GitHub
     Action both write it. This inline mirror keeps the page complete when the
     fetch cannot run (file:// previews, a failed request), so the record is
     never blank. When config.json loads it replaces this outright.
     ------------------------------------------------------------------------ */

  const SNAPSHOT = {
    lastUpdated: '2026-09-17T20:23:47+00:00',
    platforms: [
      { id: 'codeforces', name: 'Codeforces', handle: 'Ahsan_', profileUrl: 'https://codeforces.com/profile/Ahsan_', solved: 3183, rating: 1774, rank: 'Expert', badge: 'Expert (1774)', color: '#3B82F6', accentColor: '#60A5FA', category: 'competitive', fetchType: 'codeforces_api',
        details: 'Current 1477 • Peak 1774 (Expert) • 3,183 problems solved across official rounds & practice' },
      { id: 'vjudge', name: 'Virtual Judge', handle: 'Ahsan_', profileUrl: 'https://vjudge.net/user/Ahsan_', solved: 583, rank: 'National Contestant', badge: '21 Sub-Judges', color: '#EC4899', accentColor: '#F472B6', category: 'competitive', fetchType: 'vjudge_api',
        details: 'Solved across CodeForces, SPOJ, UVA, AtCoder, CSES, HDU, LightOJ & more' },
      { id: 'leetcode', name: 'LeetCode', handle: 'Ahsanul_haque_', profileUrl: 'https://leetcode.com/u/Ahsanul_haque_/', solved: 364, rating: 2142, rank: 'Guardian', badge: 'Guardian (Top 1.24%)', color: '#F59E0B', accentColor: '#FCD34D', category: 'practice', fetchType: 'leetcode_api', breakdown: { easy: 124, medium: 168, hard: 72 },
        details: 'Rating: 2142 • Top 1.24% worldwide • 72 Hard solves' },
      { id: 'toph', name: 'Toph', handle: 'AhSaN.x', profileUrl: 'https://toph.co/u/AhSaN.x', solved: 364, rank: 'Rank #39', badge: 'Rank #39 National', color: '#0284C7', accentColor: '#38BDF8', category: 'national', fetchType: 'toph_scraper',
        details: 'Mathematics (66), Easy (21), Brute Force (19), Game Theory & Nim (8)' },
      { id: 'codechef', name: 'CodeChef', handle: 'ahsanul_haque', profileUrl: 'https://www.codechef.com/users/ahsanul_haque', solved: 265, rating: 1900, rank: '4 Stars', badge: '4 Stars (★★★★)', color: '#935424', accentColor: '#D97706', category: 'competitive', fetchType: 'codechef_scraper',
        details: 'Max Rating 1900 • Division 2 Contestant' },
      { id: 'cses', name: 'CSES Problem Set', handle: 'Ahsanul_Haque', profileUrl: 'https://cses.fi/problemset/stats/friends/', solved: 262, rank: 'Rank #2 Friends', badge: '262 / 400 Tasks', color: '#E11D48', accentColor: '#FB7185', category: 'national', fetchType: 'cses_cached',
        details: '65.5% completion of the prestigious CSES algorithm suite' },
      { id: 'atcoder', name: 'AtCoder', handle: 'AHSANx', profileUrl: 'https://atcoder.jp/users/AHSANx', solved: 148, rank: 'Rank 45,634', badge: '148 Solved', color: '#10B981', accentColor: '#34D399', category: 'competitive', fetchType: 'atcoder_api',
        details: 'Solved on ABC, ARC & AGC contests via Kenkoooo API' },
      { id: 'lightoj', name: 'LightOJ', handle: 'ahsanul_haque99', profileUrl: 'https://lightoj.com/user/ahsanul_haque99', solved: 133, badge: '181 AC Submissions', color: '#6366F1', accentColor: '#818CF8', category: 'national', fetchType: 'lightoj_api',
        details: 'Classic Bangladeshi judge • 391 Submissions • 133 Distinct Problems' },
      { id: 'beecrowd', name: 'Beecrowd (URI)', handle: 'ahsanulhaque5588', profileUrl: 'https://judge.beecrowd.com/en/', solved: 105, rank: 'Rank 26,871 (Top 1%)', badge: '316.60 Points', color: '#8B5CF6', accentColor: '#A78BFA', category: 'national', fetchType: 'beecrowd_cached',
        details: 'Top 1% worldwide with 316.60 academic & contest points' },
      { id: 'spoj', name: 'SPOJ', handle: 'ahsanul_haque', profileUrl: 'https://www.spoj.com/users/ahsanul_haque/', solved: 68, rank: 'World Rank #5140', badge: '68 Classical Solves', color: '#2563EB', accentColor: '#60A5FA', category: 'national', fetchType: 'spoj_cached',
        details: '68 Classical problems • 316 Submissions • 6.9 Score Points' },
      { id: 'hackerrank', name: 'HackerRank', handle: '_AhSaN_', profileUrl: 'https://www.hackerrank.com/profile/_AhSaN_', solved: 30, badge: 'Problem Solving ★★★', color: '#059669', accentColor: '#10B981', category: 'practice', fetchType: 'hackerrank_api',
        details: 'C (12), Problem Solving (8), C++ (8), 30 Days of Code (2)' },
      { id: 'hackerearth', name: 'HackerEarth', handle: 'ahsanulhaque5588', profileUrl: 'https://www.hackerearth.com/@ahsanulhaque5588/', solved: 14, badge: 'Top 18% Data Structures', color: '#1E293B', accentColor: '#38BDF8', category: 'practice', fetchType: 'hackerearth_scraper',
        details: '280 Points • 56 Submissions • Top 18% in Data Structures' },
      { id: 'yosupo', name: 'Library Checker', handle: '_AhSaN_', profileUrl: 'https://judge.yosupo.jp/profile', solved: 12, badge: 'Advanced Algorithms', color: '#0EA5E9', accentColor: '#38BDF8', category: 'competitive', fetchType: 'yosupo_cached',
        details: 'Rigorous algorithm verification library for ICPC competitors' },
      { id: 'seriousoj', name: 'Serious OJ', handle: '_ahsan_', profileUrl: 'https://serious-oj.com/user/_ahsan_', solved: 85, rating: 650, rank: 'Expert', badge: 'Expert (650)', color: '#06B6D4', accentColor: '#22D3EE', category: 'competitive', fetchType: 'seriousoj_scraper',
        details: 'Rating: 650 Expert • 272 Submissions • 89 Accepted • Band 500-700' }
    ]
  };

  /* 2. Platform helpers ---------------------------------------------------- */

  const ICON_SVG = (inner) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${inner}</svg>`;
  const ICON_STROKE = (inner) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;

  const JUDGE_ICONS = {
    codeforces: ICON_SVG('<rect x="2" y="9" width="4.5" height="13" rx="1.2"/><rect x="9.5" y="5" width="4.5" height="17" rx="1.2"/><rect x="17" y="2" width="4.5" height="20" rx="1.2"/>'),
    leetcode: ICON_SVG('<path d="M13.2 2.3 4.9 10.6c-.4.4-.6.9-.6 1.5v.5c0 .6.2 1.1.6 1.5l2 2c.8.8 2.1.8 2.9 0l.4-.4 2.4 2.4-.6.6c-2 2-5.3 2-7.3 0l-2-2a5.1 5.1 0 0 1 0-7.2l8.3-8.3c.4-.4 1-.4 1.4 0l.2.2c.4.4.4 1 0 1.4Zm6.6 6.6-2.5 2.5c-.4.4-.4 1 0 1.4l1.2 1.2c.4.4.4 1 0 1.4l-4.1 4.1c-.8.8-2.1.8-2.9 0l-1.2-1.2 2.5-2.5 1.2 1.2c.4.4 1 .4 1.4 0l2.7-2.7-1.2-1.2 2.9-2.9c.4-.4 1-.4 1.4 0l.2.2c.4.4.4 1 0 1.4Z"/>'),
    atcoder: ICON_STROKE('<path d="M12 3.5 3.5 20h17L12 3.5Zm0 5.6L15.8 17H8.2L12 9.1Z"/>'),
    codechef: ICON_SVG('<path d="M7.4 4h9.2v2.4h-2.4v11.2h4.4v2.4H5.4v-2.4h4.4V6.4H7.4V4Z"/><path d="M18.4 7c1.4 0 2.6 2.4 2.6 5.4s-1.2 5.4-2.6 5.4" fill="none" stroke="currentColor" stroke-width="1.5"/>'),
    toph: ICON_SVG('<path d="M4 5h16v2.6H4V5Zm2 4.4h12v2.4c0 3.3-2.5 5.8-6 5.8s-6-2.5-6-5.8V9.4Zm6 6.4a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Z"/>'),
    vjudge: ICON_SVG('<path d="M3 5.5h18L12 19.5 3 5.5Zm4.4 2L12 14.4l4.6-6.9H7.4Z"/>'),
    lightoj: ICON_STROKE('<circle cx="12" cy="12" r="8.2"/><path d="M12 7.6V12l3.1 1.9"/>'),
    beecrowd: ICON_SVG('<path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.3L18.7 8 12 11.7 5.3 8 12 4.3ZM5 9.7l6 3.4v6.6l-6-3.4V9.7Zm8 10v-6.6l6-3.4v6.6l-6 3.4Z"/>'),
    spoj: ICON_SVG('<path d="M4 4h16v3.6H4V4Zm0 6h16v3.6H4V10Zm0 6h10.5v3.6H4V16Z"/>'),
    hackerrank: ICON_SVG('<path d="M6 3h2.8v6.9L15.4 3h3.4l-6.6 7.6L19.2 21h-3.5L10 13.4V21H6V3Z"/>'),
    hackerearth: ICON_SVG('<path d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19ZM8.6 8.6h6.8v1.8H8.6V8.6Zm-1 4h8.8v1.8H7.6v-1.8Zm1.6 4h5.6v1.8H9.2v-1.8Z"/>'),
    seriousoj: ICON_STROKE('<path d="M13 2.5 5 13.8h5.6L9.6 21.5 18 10.2h-5.7L13 2.5Z"/>'),
    yosupo: ICON_STROKE('<rect x="5" y="5" width="14" height="14" rx="1.6"/><path d="M9 10.5h6M9 14h6"/>')
  };

  const $ = (id) => document.getElementById(id);
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const formatInt = (value) => Number(value || 0).toLocaleString('en-US');

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function hexToRgba(hex, alpha) {
    const raw = String(hex || '').replace('#', '');
    const full = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw;
    const parsed = parseInt(full, 16);
    if (full.length !== 6 || Number.isNaN(parsed)) return `rgba(56, 189, 248, ${alpha})`;
    return `rgba(${(parsed >> 16) & 255}, ${(parsed >> 8) & 255}, ${parsed & 255}, ${alpha})`;
  }

  /* Badges render as plain text. Drop the parenthetical star run that just
     repeats the rating already stated, and spell out any remaining stars so a
     font-dependent glyph never reaches the UI. */
  function tidyBadge(text) {
    return String(text || '')
      .replace(/\s*\(★+\)\s*/g, ' ')
      .replace(/\s*★+/g, (run) => ` · ${(run.match(/★/g) || []).length} stars`)
      .trim();
  }

  const initials = (name) => String(name || '')
    .replace(/[^A-Za-z0-9 ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

  /* How a figure was obtained decides how much we trust it — surface that. */
  function classifySource(platform) {
    const type = String(platform.fetchType || '');
    if (type.endsWith('_api')) return 'api';
    if (type.endsWith('_scraper')) return 'sync';
    if (type.endsWith('_cached')) return 'snapshot';
    return platform.source === 'api' || platform.source === 'sync' ? platform.source : 'snapshot';
  }

  function normalize(platform) {
    const breakdown = platform.breakdown;
    return {
      id: platform.id,
      name: platform.name || platform.id,
      handle: platform.handle || '',
      url: platform.profileUrl || platform.url || '#',
      solved: Number(platform.solved) || 0,
      rating: platform.rating == null || platform.rating === '' ? null : Number(platform.rating),
      rank: platform.rank || '',
      badge: tidyBadge(platform.badge),
      tint: platform.accentColor || platform.color || '#38BDF8',
      category: platform.category || 'competitive',
      source: classifySource(platform),
      details: platform.details || '',
      breakdown: breakdown && typeof breakdown === 'object'
        ? {
            easy: Number(breakdown.easy) || 0,
            medium: Number(breakdown.medium) || 0,
            hard: Number(breakdown.hard) || 0
          }
        : null
    };
  }

  /* 3. State -------------------------------------------------------------- */

  const state = {
    platforms: [],
    filter: 'all',
    dedup: false,
    updatedAt: null,
    offline: false,
    rendered: false
  };

  let baseHeroSub = '';

  const visiblePlatforms = () => (state.dedup ? state.platforms.filter((p) => p.id !== 'vjudge') : state.platforms);
  const totalSolved = () => visiblePlatforms().reduce((sum, p) => sum + p.solved, 0);

  /* 4. Renderers ---------------------------------------------------------- */

  function countUp(el, target) {
    if (!el) return;
    const from = Number(String(el.textContent).replace(/[^0-9]/g, '')) || 0;

    if (el.cpRaf) cancelAnimationFrame(el.cpRaf);
    clearTimeout(el.cpTimer);

    if (reduceMotion() || from === target) {
      el.textContent = formatInt(target);
      return;
    }

    const started = performance.now();
    const duration = 900;
    const finish = () => { el.textContent = formatInt(target); };
    const step = (now) => {
      const progress = Math.min((now - started) / duration, 1);
      if (progress >= 1) { finish(); return; }
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatInt(Math.round(from + (target - from) * eased));
      el.cpRaf = requestAnimationFrame(step);
    };

    el.cpRaf = requestAnimationFrame(step);
    // Frames pause in background tabs; this guarantees the exact figure lands.
    el.cpTimer = setTimeout(finish, duration + 300);
  }

  function renderHero() {
    countUp($('hero-total'), totalSolved());

    // The claim reads "Tracking N problems across M online judges", so M is how
    // many judges are tracked, not how many contributed. Excluding Virtual Judge
    // moves the total alone; the sub-copy below explains why.
    const judges = $('hero-judges');
    if (judges) judges.textContent = String(state.platforms.length);

    // The headline figure changes meaning with the toggle, so the line that
    // reads it changes with it: "5,033 ... of which at least 5,033 are distinct"
    // would be nonsense.
    const sumUnit = $('hero-unit-sum');
    const dedupUnit = $('hero-unit-dedup');
    if (sumUnit && dedupUnit) {
      sumUnit.classList.toggle('is-hidden', state.dedup);
      dedupUnit.classList.toggle('is-hidden', !state.dedup);
    }

    const sub = $('hero-sub');
    if (sub) {
      const excluded = state.platforms.find((p) => p.id === 'vjudge');
      sub.textContent = state.dedup && excluded
        ? `Deduplicated total: Virtual Judge mirrors problems that already exist on the native judges, so all ${formatInt(excluded.solved)} of its solves are removed from this figure. Problems unique to Virtual Judge are dropped too, so the true unique count sits between it and the full total.`
        : baseHeroSub;
    }
  }

  /* Python's isoformat() emits six fractional digits and a "+00:00" offset, but
     the spec's Date Time String Format defines three digits and "Z". Chrome
     tolerates the extra digits and other engines need not, so normalise before
     parsing instead of depending on a lenient fallback parser. */
  function parseTimestamp(value) {
    if (!value) return null;
    const normalised = String(value).trim()
      .replace(/\.(\d{3})\d+/, '.$1')
      .replace(/([+-])00:00$/, 'Z');
    const date = new Date(normalised);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function renderUpdated() {
    const el = $('last-updated');
    if (!el) return;
    const date = parseTimestamp(state.updatedAt);
    if (!date) {
      el.textContent = 'Not yet verified';
      el.removeAttribute('datetime');
      return;
    }
    // Stated in UTC so the figure is identical for every viewer and can be held
    // against the documented sync schedule.
    el.textContent = `${date.toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', timeZone: 'UTC'
    })} UTC`;
    el.setAttribute('datetime', date.toISOString());
  }

  function renderProvenance() {
    const counts = { api: 0, sync: 0, snapshot: 0 };
    state.platforms.forEach((p) => { counts[p.source] += 1; });
    const live = $('count-live');
    const sync = $('count-sync');
    const snap = $('count-snapshot');
    if (live) live.textContent = String(counts.api);
    if (sync) sync.textContent = String(counts.sync);
    if (snap) snap.textContent = String(counts.snapshot);

    // Derived from the same classification as the counts above, so the section
    // can never claim a different freshness than the hero reports.
    const note = $('judges-note');
    if (note) {
      const total = state.platforms.length;
      const refreshed = counts.api + counts.sync;
      const remaining = counts.snapshot === 1
        ? 'The remaining judge is a verified snapshot.'
        : `The remaining ${counts.snapshot} are verified snapshots.`;
      note.textContent = `${refreshed} of ${total} judges refresh automatically — daily at 00:00 UTC and on every deploy. ${remaining}`;
    }
  }

  const TRACKER_URL = 'https://ahsanjust.github.io/cp-tracker/';

  /* The badge gets pasted into a CV or README, so it has to quote the live
     total rather than a number frozen into the markup. */
  function renderEmbed() {
    const el = $('embed-code');
    if (!el) return;
    const total = state.platforms.reduce((sum, p) => sum + p.solved, 0);
    el.textContent = `[![CP Tracker — ${formatInt(total)} solves across ${state.platforms.length} judges](${TRACKER_URL}assets/og_preview.png)](${TRACKER_URL})`;
  }

  /* The headline sums 14 separate judge accounts, so an overlapping solve is
     counted twice. Dropping Virtual Judge — which mirrors the others — leaves
     the figure that is certainly distinct, and it is stated beside the total
     rather than buried in a footnote. */
  function renderDistinctFloor() {
    const el = $('hero-unique');
    if (!el) return;
    const floor = state.platforms
      .filter((p) => p.id !== 'vjudge')
      .reduce((sum, p) => sum + p.solved, 0);
    el.textContent = formatInt(floor);
  }

  function renderFilterCounts() {
    const counts = { all: state.platforms.length, competitive: 0, practice: 0, national: 0 };
    state.platforms.forEach((p) => {
      if (counts[p.category] != null) counts[p.category] += 1;
    });
    document.querySelectorAll('[data-count]').forEach((el) => {
      const key = el.getAttribute('data-count');
      el.textContent = counts[key] == null ? '' : String(counts[key]);
    });
  }

  const EXTERNAL_ICON = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14.5V19a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19V8a1.5 1.5 0 0 1 1.5-1.5H10"/></svg>';

  function judgeCard(platform, excluded) {
    const badge = platform.badge.toLowerCase();
    const showRating = platform.rating != null && !badge.includes(String(platform.rating));
    const showRank = platform.rank !== '' && !badge.includes(platform.rank.toLowerCase());

    const tags = [
      platform.badge ? `<span class="tag tag--accent">${esc(platform.badge)}</span>` : '',
      showRating ? `<span class="tag">Rating ${esc(formatInt(platform.rating))}</span>` : '',
      showRank ? `<span class="tag">${esc(platform.rank)}</span>` : '',
      excluded ? '<span class="tag tag--muted">Excluded from total</span>' : ''
    ].filter(Boolean).join('');

    const glyph = JUDGE_ICONS[platform.id] ||
      `<span class="judge-chip__text">${esc(initials(platform.name))}</span>`;

    return `
      <div class="judge-card__head">
        <span class="judge-chip" aria-hidden="true" style="--chip-bg:${hexToRgba(platform.tint, 0.13)};--chip-line:${hexToRgba(platform.tint, 0.3)};--chip-fg:${esc(platform.tint)}">${glyph}</span>
        <div class="judge-card__id">
          <h3 class="judge-card__name">${esc(platform.name)}</h3>
          <span class="judge-card__handle">@${esc(platform.handle)}</span>
        </div>
        <a class="judge-card__link" href="${esc(platform.url)}" target="_blank" rel="noopener noreferrer"
           aria-label="Open the ${esc(platform.name)} profile (opens in a new tab)">${EXTERNAL_ICON}</a>
      </div>
      <p class="judge-card__count">
        <span class="judge-card__num">${formatInt(platform.solved)}</span>
        <span class="judge-card__unit">solved</span>
      </p>
      ${tags ? `<div class="judge-card__tags">${tags}</div>` : ''}
      ${platform.details ? `<p class="judge-card__details">${esc(platform.details)}</p>` : ''}
    `;
  }

  function renderJudges() {
    const grid = $('judge-grid');
    const empty = $('judges-empty');
    if (!grid) return;

    const list = state.filter === 'all'
      ? state.platforms
      : state.platforms.filter((p) => p.category === state.filter);

    if (!list.length) {
      grid.innerHTML = '';
      grid.classList.add('is-hidden');
      if (empty) empty.classList.remove('is-hidden');
      return;
    }

    grid.classList.remove('is-hidden');
    if (empty) empty.classList.add('is-hidden');

    const fragment = document.createDocumentFragment();
    list.forEach((platform) => {
      const excluded = state.dedup && platform.id === 'vjudge';
      const card = document.createElement('li');
      card.className = `judge-card reveal${excluded ? ' is-excluded' : ''}`;
      card.innerHTML = judgeCard(platform, excluded);
      fragment.appendChild(card);
      reveal(card, state.rendered);
    });
    grid.replaceChildren(fragment);
  }

  function paintBars(listEl, items) {
    if (!listEl) return;
    listEl.innerHTML = items.map((item, index) => `
      <li class="bar${item.emph ? ' bar--emph' : ''}" style="--i:${index}">
        <div class="bar__row">
          <span class="bar__label">${esc(item.label)}</span>
          <span class="bar__val">${formatInt(item.value)}</span>
          <span class="bar__pct">${(item.share * 100).toFixed(1)}%</span>
        </div>
        <div class="bar__track" aria-hidden="true">
          <span class="bar__fill" style="--w:${item.value > 0 ? Math.max(item.share, 0.006).toFixed(4) : '0'};--bar-color:${item.color}"></span>
        </div>
      </li>`).join('');
    // Bars animate themselves from CSS, so a re-render needs no reveal step.
  }

  /* Difficulty mix as one stacked bar instead of three separate rows: the bands
     read as parts of a single whole, which is what a share actually is. Segment
     widths come from flex-grow, so the numbers stay the source of truth. */
  function paintStack(barEl, legendEl, items) {
    if (!barEl || !legendEl) return;
    const total = items.reduce((sum, item) => sum + item.value, 0);
    if (!total) {
      barEl.innerHTML = '';
      legendEl.innerHTML = '';
      return;
    }
    barEl.innerHTML = items.map((item, index) =>
      `<span class="stack__seg" style="--w:${(item.value / total).toFixed(4)};--seg-color:${item.color};--i:${index}"></span>`
    ).join('');
    legendEl.innerHTML = items.map((item) => `
      <li class="stack__item">
        <span class="stack__dot" style="--seg-color:${item.color}" aria-hidden="true"></span>
        <span class="stack__label">${esc(item.label)}</span>
        <span class="stack__val num">${formatInt(item.value)}</span>
        <span class="stack__pct num">${((item.value / total) * 100).toFixed(1)}%</span>
      </li>`).join('');
  }

  function renderAnalytics() {
    // Distribution — ranked, and consistent with the headline total.
    const ranked = visiblePlatforms().slice().sort((a, b) => b.solved - a.solved);
    const total = ranked.reduce((sum, p) => sum + p.solved, 0) || 1;

    paintBars($('bars-judges'), ranked.map((p, index) => ({
      label: p.name,
      value: p.solved,
      share: p.solved / total,
      color: 'var(--accent)',
      emph: index === 0
    })));

    const judgeNote = $('judge-bars-note');
    if (judgeNote) {
      judgeNote.textContent = state.dedup
        ? `${formatInt(total)} problems · Virtual Judge excluded`
        : `${formatInt(total)} problems across ${ranked.length} judges`;
    }

    // Difficulty mix — only LeetCode reports a per-difficulty breakdown.
    const leetcode = state.platforms.find((p) => p.id === 'leetcode');
    const mix = leetcode && leetcode.breakdown;
    const diffNote = $('difficulty-bars-note');

    if (!mix || (!mix.easy && !mix.medium && !mix.hard)) {
      paintStack($('difficulty-bar'), $('difficulty-legend'), []);
      if (diffNote) diffNote.textContent = 'Breakdown unavailable';
      return;
    }

    const sum = mix.easy + mix.medium + mix.hard;
    paintStack($('difficulty-bar'), $('difficulty-legend'), [
      { label: 'Easy', value: mix.easy, color: 'var(--easy)' },
      { label: 'Medium', value: mix.medium, color: 'var(--medium)' },
      { label: 'Hard', value: mix.hard, color: 'var(--hard)' }
    ]);

    if (diffNote) {
      diffNote.textContent = `${formatInt(sum)} solved · ${Math.round((mix.hard / sum) * 100)}% hard`;
    }
  }

  function renderNotice() {
    const notice = $('data-notice');
    if (notice) notice.classList.toggle('is-hidden', !state.offline);
  }

  function renderAll() {
    renderHero();
    renderUpdated();
    renderProvenance();
    renderEmbed();
    renderFilterCounts();
    renderJudges();
    renderAnalytics();
    renderNotice();
    renderDistinctFloor();
    positionTabIndicator(false);
    state.rendered = true;
  }

  /* 5. Sync --------------------------------------------------------------- */

  async function getJson(url, timeoutMs) {
    const response = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  function codeforcesRankTitle(rating) {
    if (rating >= 3000) return 'Legendary Grandmaster';
    if (rating >= 2600) return 'International Grandmaster';
    if (rating >= 2400) return 'Grandmaster';
    if (rating >= 2300) return 'International Master';
    if (rating >= 2100) return 'Master';
    if (rating >= 1900) return 'Candidate Master';
    if (rating >= 1600) return 'Expert';
    if (rating >= 1400) return 'Specialist';
    if (rating >= 1200) return 'Pupil';
    return 'Newbie';
  }

  /* The headline badge tracks the PEAK, so a live dip never downgrades it. */
  function applyCodeforcesLive(platform, info, liveSolved) {
    if (typeof liveSolved === 'number' && liveSolved > platform.solved) {
      platform.solved = liveSolved;
    }
    const peak = Math.max(Number(platform.rating) || 0, Number(info.maxRating) || 0, Number(info.rating) || 0);
    if (peak > 0) {
      platform.rating = peak;
      platform.rank = codeforcesRankTitle(peak);
      platform.badge = `${platform.rank} (${peak})`;
      const current = info.rating ? `Current ${info.rating} • ` : '';
      platform.details = `${current}Peak ${peak} (${platform.rank}) • ${formatInt(platform.solved)} problems solved across official rounds & practice`;
    }
  }

  function applyConfig(config) {
    if (Array.isArray(config.platforms) && config.platforms.length) {
      state.platforms = config.platforms.map(normalize);
    }
    if (config.lastUpdated) state.updatedAt = config.lastUpdated;
  }

  function showToast(message, tone) {
    const toast = $('toast');
    const text = $('toast-text');
    const icon = $('toast-icon');
    if (!toast || !text) return;

    text.textContent = message;
    toast.classList.toggle('toast--ok', tone === 'ok');
    toast.classList.toggle('toast--warn', tone === 'warn');

    if (icon) {
      icon.innerHTML = tone === 'warn'
        ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.2v.1"/></svg>'
        : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4.5 4.5L19 7"/></svg>';
    }

    toast.classList.add('is-visible');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 3600);
  }

  /* Identifies the rendered record, so an unchanged config refresh can skip
     rebuilding 14 cards and 17 bars (and the scroll reveal that goes with it). */
  const signature = () => state.platforms
    .map((p) => [p.id, p.solved, p.rating, p.rank, p.badge, p.details].join('|'))
    .join('#');

  async function syncLive() {
    const button = $('btn-sync');
    const label = $('sync-label');
    if (!button || button.getAttribute('aria-busy') === 'true') return;

    button.setAttribute('aria-busy', 'true');
    if (label) label.textContent = 'Syncing…';

    const isLocalServer = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    const before = signature();
    let reachable = false;    // at least one live source answered
    let configLoaded = false; // an authoritative timestamp was received
    let liveTouched = false;  // a browser-side fetch changed the record

    try {
      if (isLocalServer) {
        // sync_server.py performs the real per-judge fetches; the page just asks.
        try {
          const payload = await getJson('/api/sync', 20000);
          if (payload && payload.config) {
            applyConfig(payload.config);
            reachable = true;
            configLoaded = true;
          }
        } catch (error) { /* not running the sync server — use the static path */ }
      }

      if (!configLoaded) {
        // Static hosting: refresh from the deployed config, then top up the one
        // judge that is safe to query directly from the browser.
        try {
          applyConfig(await getJson(`config.json?t=${Date.now()}`, 6000));
          reachable = true;
          configLoaded = true;
        } catch (error) { /* fall through to the Codeforces refresh */ }

        const codeforces = state.platforms.find((p) => p.id === 'codeforces');
        if (codeforces) {
          const cfKey = (p) => [p.solved, p.rating, p.rank, p.badge, p.details].join('|');
          const cfBefore = cfKey(codeforces);
          let liveSolved;
          try {
            const status = await getJson(
              `https://codeforces.com/api/user.status?handle=${encodeURIComponent(codeforces.handle)}`, 6000);
            if (status && status.status === 'OK' && Array.isArray(status.result)) {
              const solved = new Set();
              status.result.forEach((submission) => {
                if (submission.verdict === 'OK' && submission.problem) {
                  solved.add(`${submission.problem.contestId}_${submission.problem.index}`);
                }
              });
              // The public profile excludes ~15 unindexed / mashup tasks.
              // Keep in step with the equivalent offset in sync_server.py.
              liveSolved = Math.max(0, solved.size - 15);
              reachable = true;
            }
          } catch (error) { /* best effort */ }

          try {
            const info = await getJson(
              `https://codeforces.com/api/user.info?handles=${encodeURIComponent(codeforces.handle)}`, 5000);
            if (info && info.status === 'OK' && info.result && info.result[0]) {
              applyCodeforcesLive(codeforces, info.result[0], liveSolved);
              reachable = true;
            }
          } catch (error) { /* best effort */ }

          if (cfKey(codeforces) !== cfBefore) liveTouched = true;
        }
      }
    } finally {
      button.setAttribute('aria-busy', 'false');
      if (label) label.textContent = 'Sync live';
    }

    if (!reachable) {
      showToast('Live sync needs the local server (python3 sync_server.py) or the deployed site.', 'warn');
      return;
    }

    // The timestamp has to describe the record on screen: stamp now when a
    // browser-side fetch changed it, otherwise config.json stays authoritative.
    if (!configLoaded || liveTouched) state.updatedAt = new Date().toISOString();
    // Only a full record load clears the snapshot warning; refreshing one judge
    // does not make the other thirteen current.
    if (configLoaded) state.offline = false;

    const shown = `${formatInt(totalSolved())} problems across ${visiblePlatforms().length} judges`;
    if (signature() !== before) {
      renderAll();
      showToast(liveTouched ? `Codeforces refreshed — ${shown}` : `Updated — ${shown}`, 'ok');
    } else {
      renderUpdated();
      renderNotice();
      showToast(`Already up to date — ${shown}`, 'ok');
    }
  }

  async function loadConfig() {
    const before = signature();
    try {
      applyConfig(await getJson(`config.json?t=${Date.now()}`, 8000));
      state.offline = false;
    } catch (error) {
      state.offline = true;
    }

    if (state.offline || signature() !== before) {
      renderAll();
    } else {
      renderUpdated();
    }
  }

  /* 6. Interaction & init ------------------------------------------------- */

  let revealObserver = null;

  function initReveal() {
    if (!('IntersectionObserver' in window) || reduceMotion()) return;
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
  }

  /* `immediate` is used for re-renders (filters, dedup) where the content must
     appear at once — waiting a frame could leave a card invisible if frames
     are starved. The scroll reveal is reserved for the initial paint. */
  function reveal(el, immediate) {
    if (!el) return;
    if (immediate || !revealObserver) {
      el.classList.add('is-in');
      return;
    }
    el.classList.remove('is-in');
    revealObserver.observe(el);
  }

  /* The active tab owns one sliding underline, so its geometry is re-measured
     whenever the active tab, the counts or the wrapped line breaks change.
     `animate` is false for layout-driven moves (first paint, resize, re-filter)
     so the bar jumps into place instead of sliding for no reason. */
  function positionTabIndicator(animate) {
    const group = $('judge-filter');
    const indicator = group && group.querySelector('.tabs__indicator');
    if (!indicator) return;
    const active = group.querySelector('.tabs__btn[aria-pressed="true"]');
    if (!active) {
      indicator.style.width = '0px';
      return;
    }
    if (!animate) indicator.style.transition = 'none';
    // Offset by the active tab's own row, because the tabs wrap to two rows on
    // a phone; the underline lands on that tab's rule either way.
    const top = active.offsetTop + active.offsetHeight - 2;
    indicator.style.transform = `translate(${active.offsetLeft}px, ${top}px)`;
    indicator.style.width = `${active.offsetWidth}px`;
    if (!animate) {
      // Force the un-animated position to commit before restoring the
      // transition, otherwise the first move animates in from the top-left.
      void indicator.offsetWidth;
      indicator.style.transition = '';
    }
  }

  function setFilter(value) {
    state.filter = value;
    const group = $('judge-filter');
    if (group) {
      group.querySelectorAll('.tabs__btn').forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.filter === value));
      });
    }
    positionTabIndicator(true);
    renderJudges();
  }

  function initFilter() {
    const group = $('judge-filter');
    if (group) {
      group.addEventListener('click', (event) => {
        const button = event.target.closest('.tabs__btn');
        if (button && group.contains(button)) setFilter(button.dataset.filter);
      });

      group.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        const buttons = Array.from(group.querySelectorAll('.tabs__btn'));
        const index = buttons.indexOf(document.activeElement);
        if (index === -1) return;
        event.preventDefault();
        const next = buttons[(index + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length];
        next.focus();
      });
    }

    const clear = document.querySelector('[data-clear-filter]');
    if (clear) clear.addEventListener('click', () => setFilter('all'));
  }

  function initDedup() {
    const toggle = $('toggle-dedup');
    if (!toggle) return;
    toggle.addEventListener('change', () => {
      state.dedup = toggle.checked;
      renderHero();
      renderJudges();
      renderAnalytics();
    });
  }

  function initHeader() {
    const header = $('site-header');
    if (!header) return;
    // A single class toggle is cheap enough to run per scroll event, and doing
    // it directly means the state can never lag behind the viewport.
    const update = () => header.classList.toggle('is-stuck', window.scrollY > 8);
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initAvatar() {
    const image = $('user-avatar');
    if (!image) return;
    image.addEventListener('error', () => {
      const monogram = document.createElement('span');
      monogram.className = 'identity__avatar identity__avatar--text';
      monogram.setAttribute('role', 'img');
      monogram.setAttribute('aria-label', 'Ahsanul Haque');
      monogram.textContent = 'AH';
      image.replaceWith(monogram);
    }, { once: true });
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        // Bounded: a clipboard write that never settles must not leave the
        // button silent, so fall back to the legacy path instead of hanging.
        await Promise.race([
          navigator.clipboard.writeText(text),
          new Promise((_, reject) => setTimeout(() => reject(new Error('clipboard timeout')), 1200))
        ]);
        return true;
      } catch (error) { /* fall through to the legacy path */ }
    }

    try {
      const scratch = document.createElement('textarea');
      scratch.value = text;
      scratch.setAttribute('readonly', '');
      scratch.style.position = 'fixed';
      scratch.style.top = '-1000px';
      document.body.appendChild(scratch);
      scratch.select();
      const copied = document.execCommand('copy');
      scratch.remove();
      return copied;
    } catch (error) {
      return false;
    }
  }

  function initCopy() {
    document.querySelectorAll('.copy-btn').forEach((button) => {
      const original = button.innerHTML;
      button.addEventListener('click', async () => {
        const target = $(button.dataset.copyTarget);
        if (!target) return;
        const copied = await copyText(target.textContent.trim());
        if (!copied) {
          showToast('Copy failed — select the text manually', 'warn');
          return;
        }
        showToast('Copied to clipboard', 'ok');
        button.textContent = 'Copied';
        clearTimeout(button.cpTimer);
        button.cpTimer = setTimeout(() => { button.innerHTML = original; }, 1800);
      });
    });
  }

  function initSyncButton() {
    const button = $('btn-sync');
    if (button) button.addEventListener('click', syncLive);
  }

  async function init() {
    const sub = $('hero-sub');
    baseHeroSub = sub ? sub.textContent : '';

    state.platforms = SNAPSHOT.platforms.map(normalize);
    state.updatedAt = SNAPSHOT.lastUpdated;

    initReveal();
    initHeader();
    initAvatar();
    initFilter();
    initDedup();
    initCopy();
    initSyncButton();

    // Wrapping changes which row a tab sits on, so the underline is re-measured.
    window.addEventListener('resize', () => positionTabIndicator(false), { passive: true });

    // A web font arriving after first paint changes the tab widths, which would
    // leave the underline too short, so it is re-measured once fonts settle.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => positionTabIndicator(false));
    }

    // Paint the verified snapshot immediately; refresh in the background.
    renderAll();
    await loadConfig();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
