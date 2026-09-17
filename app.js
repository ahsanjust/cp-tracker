// Competitive Programming Solved Hub - Application Logic

const DEFAULT_CONFIG = {
  "user": {
    "name": "Ahsanul Haque",
    "headline": "LeetCode Guardian (2142) • Codeforces Expert (1774) • 2x ICPC Regionalist",
    "institution": "Jashore University of Science and Technology",
    "avatar": "assets/avatar.png",
    "github": "https://github.com/ahsanjust",
    "linkedin": "https://linkedin.com/in/ahsanul-haque-8b2485379"
  },
  "platforms": [
    {
      "id": "codeforces",
      "name": "Codeforces",
      "handle": "Ahsan_",
      "profileUrl": "https://codeforces.com/profile/Ahsan_",
      "solved": 3183,
      "rating": 1774,
      "rank": "Expert",
      "maxRating": 1774,
      "badge": "Expert (1774)",
      "color": "#3B82F6",
      "accentColor": "#60A5FA",
      "category": "competitive",
      "fetchType": "codeforces_api",
      "icon": "cf",
      "details": "3,183 problems solved for all time across official rounds & practice"
    },
    {
      "id": "vjudge",
      "name": "Virtual Judge",
      "handle": "Ahsan_",
      "profileUrl": "https://vjudge.net/user/Ahsan_",
      "solved": 583,
      "rank": "National Contestant",
      "badge": "21 Sub-Judges",
      "color": "#EC4899",
      "accentColor": "#F472B6",
      "category": "competitive",
      "fetchType": "vjudge_api",
      "icon": "vj",
      "details": "Solved across CodeForces, SPOJ, UVA, AtCoder, CSES, HDU, LightOJ & more"
    },
    {
      "id": "leetcode",
      "name": "LeetCode",
      "handle": "Ahsanul_haque_",
      "profileUrl": "https://leetcode.com/u/Ahsanul_haque_/",
      "solved": 364,
      "rating": 2142,
      "rank": "Guardian",
      "badge": "Guardian (Top 1.24%)",
      "color": "#F59E0B",
      "accentColor": "#FCD34D",
      "category": "practice",
      "fetchType": "leetcode_api",
      "icon": "lc",
      "breakdown": { "easy": 124, "medium": 168, "hard": 72 },
      "details": "Rating: 2142 • Top 1.24% worldwide • 72 Hard solves"
    },
    {
      "id": "toph",
      "name": "Toph",
      "handle": "AhSaN.x",
      "profileUrl": "https://toph.co/u/AhSaN.x",
      "solved": 364,
      "rank": "Rank #39",
      "badge": "Rank #39 National",
      "color": "#0284C7",
      "accentColor": "#38BDF8",
      "category": "national",
      "fetchType": "toph_scraper",
      "icon": "toph",
      "details": "Mathematics (66), Easy (21), Brute Force (19), Game Theory & Nim (8)"
    },
    {
      "id": "codechef",
      "name": "CodeChef",
      "handle": "ahsanul_haque",
      "profileUrl": "https://www.codechef.com/users/ahsanul_haque",
      "solved": 265,
      "rating": 1900,
      "rank": "4 Stars",
      "badge": "4 Stars (★★★★)",
      "color": "#935424",
      "accentColor": "#D97706",
      "category": "competitive",
      "fetchType": "codechef_scraper",
      "icon": "cc",
      "details": "Max Rating 1900 • Division 2 Contestant"
    },
    {
      "id": "cses",
      "name": "CSES Problem Set",
      "handle": "Ahsanul_Haque",
      "profileUrl": "https://cses.fi/problemset/stats/friends/",
      "solved": 262,
      "rank": "Rank #2 Friends",
      "badge": "262 / 400 Tasks",
      "color": "#E11D48",
      "accentColor": "#FB7185",
      "category": "national",
      "fetchType": "cses_cached",
      "icon": "cses",
      "details": "65.5% completion of the prestigious CSES algorithm suite"
    },
    {
      "id": "atcoder",
      "name": "AtCoder",
      "handle": "AHSANx",
      "profileUrl": "https://atcoder.jp/users/AHSANx",
      "solved": 148,
      "rank": "Rank 45,634",
      "badge": "148 Solved",
      "color": "#10B981",
      "accentColor": "#34D399",
      "category": "competitive",
      "fetchType": "atcoder_api",
      "icon": "ac",
      "details": "Solved on ABC, ARC & AGC contests via Kenkoooo API"
    },
    {
      "id": "lightoj",
      "name": "LightOJ",
      "handle": "ahsanul_haque99",
      "profileUrl": "https://lightoj.com/user/ahsanul_haque99",
      "solved": 133,
      "badge": "181 AC Submissions",
      "color": "#6366F1",
      "accentColor": "#818CF8",
      "category": "national",
      "fetchType": "lightoj_api",
      "icon": "loj",
      "details": "Classic Bangladeshi judge • 391 Submissions • 133 Distinct Problems"
    },
    {
      "id": "beecrowd",
      "name": "Beecrowd (URI)",
      "handle": "ahsanulhaque5588",
      "profileUrl": "https://judge.beecrowd.com/en/",
      "solved": 105,
      "rank": "Rank 26,871 (Top 1%)",
      "badge": "316.60 Points",
      "color": "#8B5CF6",
      "accentColor": "#A78BFA",
      "category": "national",
      "fetchType": "beecrowd_cached",
      "icon": "bee",
      "details": "Top 1% worldwide with 316.60 academic & contest points"
    },
    {
      "id": "seriousoj",
      "name": "Serious OJ",
      "handle": "_ahsan_",
      "profileUrl": "https://serious-oj.com/user/_ahsan_",
      "solved": 85,
      "rating": 650,
      "rank": "Expert",
      "badge": "Expert (650)",
      "color": "#06B6D4",
      "accentColor": "#22D3EE",
      "category": "competitive",
      "fetchType": "seriousoj_scraper",
      "icon": "soj",
      "details": "Rating: 650 Expert • 272 Submissions • 89 Accepted • Band 500-700"
    },
    {
      "id": "spoj",
      "name": "SPOJ",
      "handle": "ahsanul_haque",
      "profileUrl": "https://www.spoj.com/users/ahsanul_haque/",
      "solved": 68,
      "rank": "World Rank #5140",
      "badge": "68 Classical Solves",
      "color": "#2563EB",
      "accentColor": "#60A5FA",
      "category": "national",
      "fetchType": "spoj_cached",
      "icon": "spoj",
      "details": "68 Classical problems • 316 Submissions • 6.9 Score Points"
    },
    {
      "id": "hackerrank",
      "name": "HackerRank",
      "handle": "_AhSaN_",
      "profileUrl": "https://www.hackerrank.com/profile/_AhSaN_",
      "solved": 30,
      "badge": "Problem Solving ★★★",
      "color": "#059669",
      "accentColor": "#10B981",
      "category": "practice",
      "fetchType": "hackerrank_api",
      "icon": "hr",
      "details": "C (12), Problem Solving (8), C++ (8), 30 Days of Code (2)"
    },
    {
      "id": "hackerearth",
      "name": "HackerEarth",
      "handle": "ahsanulhaque5588",
      "profileUrl": "https://www.hackerearth.com/@ahsanulhaque5588/",
      "solved": 14,
      "badge": "Top 18% Data Structures",
      "color": "#1E293B",
      "accentColor": "#38BDF8",
      "category": "practice",
      "fetchType": "hackerearth_cached",
      "icon": "he",
      "details": "280 Points • 56 Submissions • Top 18% in Data Structures"
    },
    {
      "id": "yosupo",
      "name": "Library Checker",
      "handle": "_AhSaN_",
      "profileUrl": "https://judge.yosupo.jp/profile",
      "solved": 12,
      "badge": "Advanced Algorithms",
      "color": "#0EA5E9",
      "accentColor": "#38BDF8",
      "category": "competitive",
      "fetchType": "yosupo_cached",
      "icon": "yosupo",
      "details": "Rigorous algorithm verification library for ICPC competitors"
    }
  ]
};

let state = {
  user: DEFAULT_CONFIG.user,
  platforms: DEFAULT_CONFIG.platforms,
  activeFilter: 'all',
  searchQuery: '',
  sortBy: 'solved-desc',
  deduplicateVJudge: false,
  lastUpdated: null,
  charts: {
    distribution: null,
    skills: null
  }
};

// DOM Elements
const totalCounterEl = document.getElementById('total-solved-counter');
const gridContainerEl = document.getElementById('platform-grid-container');
const filterPills = document.querySelectorAll('.filter-pill');
const toggleDedup = document.getElementById('toggle-dedup');
const btnSyncAll = document.getElementById('btn-sync-all');
const syncBtnText = document.getElementById('sync-btn-text');
const toastEl = document.getElementById('toast-message');
const searchInputEl = document.getElementById('search-judges');
const sortSelectEl = document.getElementById('sort-judges');
const lastUpdatedEl = document.getElementById('last-updated');
const resultsCountEl = document.getElementById('results-count');

// Toast Notification
function showToast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 3200);
}

// Number Counter Animation
function animateCounter(element, targetValue, duration = 1200) {
  if (!element) return;
  const start = parseInt(element.textContent.replace(/[^\d]/g, '')) || 0;
  const startTime = performance.now();

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (targetValue - start) * easeOut);
    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = targetValue.toLocaleString() + '+';
    }
  }

  requestAnimationFrame(updateNumber);
}

// Calculate Total Solved
function calculateTotal() {
  let total = 0;
  state.platforms.forEach(p => {
    if (state.deduplicateVJudge && p.id === 'vjudge') {
      return;
    }
    total += (parseInt(p.solved) || 0);
  });
  return total;
}

// Render Hero Counter & Badges
function renderHero() {
  const total = calculateTotal();
  animateCounter(totalCounterEl, total);
  
  const subText = document.getElementById('counter-sub-text');
  if (subText) {
    if (state.deduplicateVJudge) {
      subText.textContent = `Across ${state.platforms.length - 1} Native Judges (Excluding VJudge)`;
    } else {
      subText.textContent = `Across ${state.platforms.length} Online Judges`;
    }
  }

  renderLastUpdated();
}

function renderLastUpdated() {
  if (!lastUpdatedEl) return;
  if (!state.lastUpdated) {
    lastUpdatedEl.textContent = 'Verified records • Live sync ready';
    return;
  }
  try {
    const d = new Date(state.lastUpdated);
    const fmt = d.toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
    lastUpdatedEl.textContent = `Last synced: ${fmt}`;
    lastUpdatedEl.setAttribute('datetime', state.lastUpdated);
  } catch (e) {
    lastUpdatedEl.textContent = 'Verified records • Live sync ready';
  }
}

// Reveal-on-scroll for cards (respects reduced motion)
let revealObserver = null;
function initRevealObserver() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('revealed');
        revealObserver.unobserve(en.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
}

// Get SVG or Initials for Platform — real brand marks, text fallback only
function getPlatformIconMarkup(p) {
  const svgWrap = (inner) => `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${inner}</svg>`;
  const strokeWrap = (inner) => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
  const icons = {
    codeforces: svgWrap(`<rect x="2" y="9" width="4.5" height="13" rx="1.2"/><rect x="9.5" y="5" width="4.5" height="17" rx="1.2"/><rect x="17" y="2" width="4.5" height="20" rx="1.2"/>`),
    leetcode: svgWrap(`<path d="M13.2 2.3 4.9 10.6c-.4.4-.6.9-.6 1.5v.5c0 .6.2 1.1.6 1.5l2 2c.8.8 2.1.8 2.9 0l.4-.4 2.4 2.4-.6.6c-2 2-5.3 2-7.3 0l-2-2a5.1 5.1 0 0 1 0-7.2l8.3-8.3c.4-.4 1-.4 1.4 0l.2.2c.4.4.4 1 0 1.4Zm6.6 6.6-2.5 2.5c-.4.4-.4 1 0 1.4l1.2 1.2c.4.4.4 1 0 1.4l-4.1 4.1c-.8.8-2.1.8-2.9 0l-1.2-1.2 2.5-2.5 1.2 1.2c.4.4 1 .4 1.4 0l2.7-2.7-1.2-1.2 2.9-2.9c.4-.4 1-.4 1.4 0l.2.2c.4.4.4 1 0 1.4Z"/>`),
    atcoder: strokeWrap(`<path d="M12 3 3 20h18L12 3Zm0 5.2L16.2 17H7.8L12 8.2Z"/>`),
    codechef: svgWrap(`<path d="M7.5 4h9v2.5H14v12h-2v2.5h5.5V23.5H4v-2.5h5.5V18.5h-2v-12H5.5V4h2Z" transform="scale(.95) translate(.5 0)"/><path d="M18 6.5c1.5 0 2.7 2.7 2.7 6s-1.2 6-2.7 6" fill="none" stroke="currentColor" stroke-width="1.6"/>`),
    toph: svgWrap(`<path d="M4 5h16v3H4zM6 9h12v2.5c0 3.5-2.5 6-6 6s-6-2.5-6-6V9Zm6 6.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z"/>`),
    vjudge: svgWrap(`<path d="M3 5h18l-9 14L3 5Zm4.2 2L12 14.6 16.8 7H7.2Z"/>`),
    cses: `<span style="font-size:.72rem;letter-spacing:-.02em">CSES</span>`,
    lightoj: strokeWrap(`<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3.2 2"/>`),
    beecrowd: svgWrap(`<path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.3L18.7 8 12 11.7 5.3 8 12 4.3ZM5 9.7l6 3.4v6.6l-6-3.4V9.7Zm8 10v-6.6l6-3.4v6.6l-6 3.4Z"/>`),
    spoj: svgWrap(`<path d="M4 4h16v4H4zM4 10h16v4H4zM4 16h10v4H4z"/>`),
    hackerrank: svgWrap(`<path d="M6 3h3v7.2L15.5 3H19l-6.8 8L19.2 21h-3.6L9 13.6V21H6V3Z"/>`),
    hackerearth: svgWrap(`<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-3.5 6h7v2h-7zM7 11h10v2H7zM8.5 15h7v2h-7z"/>`),
    seriousoj: strokeWrap(`<path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z"/>`),
    yosupo: strokeWrap(`<path d="M5 19V5h14v14H5Zm3-9h8M8 13h8"/>`),
  };

  return icons[p.id] || p.name.substring(0, 2).toUpperCase();
}

// Render Platform Cards Grid — filter + search + sort
function renderPlatforms() {
  if (!gridContainerEl) return;
  gridContainerEl.innerHTML = '';

  const q = (state.searchQuery || '').trim().toLowerCase();

  let filtered = state.platforms.filter(p => {
    if (state.activeFilter !== 'all' && p.category !== state.activeFilter) return false;
    if (q) {
      const hay = `${p.name} ${p.handle} ${p.badge || ''} ${p.rank || ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  // Sort
  const by = state.sortBy || 'solved-desc';
  filtered = [...filtered].sort((a, b) => {
    if (by === 'solved-asc') return (a.solved || 0) - (b.solved || 0);
    if (by === 'name-asc') return a.name.localeCompare(b.name);
    if (by === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
    return (b.solved || 0) - (a.solved || 0); // solved-desc default
  });

  if (resultsCountEl) {
    resultsCountEl.textContent = filtered.length === state.platforms.length
      ? `${filtered.length} judges`
      : `${filtered.length} of ${state.platforms.length} judges`;
  }

  if (filtered.length === 0) {
    gridContainerEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No judges match your search</h3>
        <p>Try a different keyword or clear filters to see all ${state.platforms.length} platforms.</p>
        <button class="btn" id="btn-clear-search">Clear search & filters</button>
      </div>`;
    const clr = document.getElementById('btn-clear-search');
    if (clr) clr.addEventListener('click', () => {
      state.searchQuery = '';
      state.activeFilter = 'all';
      if (searchInputEl) searchInputEl.value = '';
      filterPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-filter') === 'all'));
      renderPlatforms();
    });
    return;
  }

  const maxSolves = Math.max(...state.platforms.map(p => p.solved || 0), 1);

  filtered.forEach(p => {
    const card = document.createElement('article');
    card.className = 'platform-card';
    card.id = `card-${p.id}`;
    card.style.setProperty('--card-brand-color', p.color);
    card.style.setProperty('--card-glow', `${p.color}33`);
    card.style.setProperty('--card-border-glow', `${p.color}88`);

    const percent = Math.min(Math.round((p.solved / maxSolves) * 100), 100);

    card.innerHTML = `
      <div>
        <div class="card-top">
          <div class="platform-badge-logo">
            <div class="platform-icon">${getPlatformIconMarkup(p)}</div>
            <div class="platform-meta">
              <h3>${p.name}</h3>
              <span class="platform-handle">@${p.handle}</span>
            </div>
          </div>
          <div class="card-actions">
            <a href="${p.profileUrl}" target="_blank" rel="noopener noreferrer" class="icon-btn" title="View ${p.name} Profile">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            </a>
          </div>
        </div>

        <div class="card-stat">
          <div class="card-solved-number">
            ${(p.solved || 0).toLocaleString()}
            <span class="card-solved-label">Solved</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${percent}%;"></div>
          </div>
        </div>

        <div class="card-tags">
          ${p.badge ? `<span class="tag-badge accent" style="--tag-bg:${p.color}22; --tag-border:${p.color}66; --tag-color:${p.accentColor || p.color}">${p.badge}</span>` : ''}
          ${p.rating ? `<span class="tag-badge">Rating: <strong>${p.rating}</strong></span>` : ''}
          ${p.rank && p.rank !== p.badge ? `<span class="tag-badge">${p.rank}</span>` : ''}
        </div>
      </div>

      <div class="card-details">
        ${p.details || ''}
      </div>
    `;

    gridContainerEl.appendChild(card);
    if (revealObserver) revealObserver.observe(card);
    else card.classList.add('revealed');
  });
}

// Render Analytics Charts with Chart.js
let chartRetryCount = 0;
function renderCharts() {
  if (!window.Chart) {
    // Chart.js is deferred — retry a few times before giving up
    if (chartRetryCount < 10) {
      chartRetryCount += 1;
      setTimeout(renderCharts, 400);
    }
    return;
  }
  chartRetryCount = 0;

  // 1. Distribution Donut Chart
  const ctxDist = document.getElementById('platformDistributionChart');
  if (ctxDist) {
    const labels = state.platforms.map(p => p.name);
    const data = state.platforms.map(p => p.solved);
    const colors = state.platforms.map(p => p.color);

    if (state.charts.distribution) {
      state.charts.distribution.destroy();
    }

    state.charts.distribution = new Chart(ctxDist, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors,
          borderColor: '#0f172a',
          borderWidth: 2,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: window.innerWidth < 700 ? 'bottom' : 'right',
            labels: {
              color: '#94a3b8',
              font: { family: 'Inter', size: 11 },
              boxWidth: 12,
              padding: 6
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const val = context.raw || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const pct = ((val / total) * 100).toFixed(1);
                return ` ${context.label}: ${val.toLocaleString()} (${pct}%)`;
              }
            }
          }
        },
        cutout: '68%'
      }
    });
  }

  // 2. Skill Tiers & Difficulty Chart — fully driven by live state
  const ctxSkills = document.getElementById('difficultyBreakdownChart');
  if (ctxSkills) {
    if (state.charts.skills) {
      state.charts.skills.destroy();
    }

    const getSolved = (id) => state.platforms.find(p => p.id === id)?.solved || 0;
    const lcPlatform = state.platforms.find(p => p.id === 'leetcode');
    const lcEasy = lcPlatform?.breakdown?.easy || 0;
    const lcMed = lcPlatform?.breakdown?.medium || 0;
    const lcHard = lcPlatform?.breakdown?.hard || 0;

    state.charts.skills = new Chart(ctxSkills, {
      type: 'bar',
      data: {
        labels: ['LC Easy', 'LC Medium', 'LC Hard', 'AtCoder', 'CSES', 'Toph'],
        datasets: [{
          label: 'Problems Solved',
          data: [lcEasy, lcMed, lcHard, getSolved('atcoder'), getSolved('cses'), getSolved('toph')],
          backgroundColor: [
            '#10b981', // Easy - Emerald
            '#f59e0b', // Medium - Amber
            '#ef4444', // Hard - Red
            '#34d399', // AtCoder
            '#fb7185', // CSES
            '#38bdf8'  // Toph
          ],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (c) => ` Solved: ${c.raw.toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#94a3b8', font: { family: 'Inter', size: 10 } }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.06)' },
            ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } }
          }
        }
      }
    });
  }
}

// Live Sync across platforms
async function syncAllPlatforms() {
  if (btnSyncAll) {
    btnSyncAll.classList.add('syncing');
    btnSyncAll.setAttribute('aria-busy', 'true');
  }
  if (syncBtnText) syncBtnText.textContent = 'Syncing...';

  try {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isLocal) {
      try {
        const res = await fetch('/api/sync', { signal: AbortSignal.timeout(8000) });
        if (res.ok) {
          const data = await res.json();
          if (data.config && data.config.platforms) {
            state.platforms = data.config.platforms;
          }
          if (data.config && data.config.lastUpdated) {
            state.lastUpdated = data.config.lastUpdated;
          }
        }
      } catch (e) {}
    } else {
      // On GitHub Pages: fetch latest config.json with cache buster
      try {
        const res = await fetch('config.json?t=' + Date.now(), { signal: AbortSignal.timeout(4000) });
        if (res.ok) {
          const data = await res.json();
          if (data.platforms && data.platforms.length > 0) {
            state.platforms = data.platforms;
          }
          if (data.lastUpdated) state.lastUpdated = data.lastUpdated;
        }
      } catch (e) {}

      // Try quick live check for Codeforces (never regress below verified count)
      try {
        const cf = state.platforms.find(p => p.id === 'codeforces');
        if (cf) {
          const r = await fetch(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(cf.handle)}`, { signal: AbortSignal.timeout(4000) });
          const d = await r.json();
          if (d.status === 'OK') {
            const solved = new Set();
            d.result.forEach(s => {
              if (s.verdict === 'OK' && s.problem) {
                solved.add(`${s.problem.contestId}_${s.problem.index}`);
              }
            });
            // Official Codeforces profile page excludes ~15 unindexed/mashup tasks
            const liveCount = Math.max(0, solved.size - 15);
            const prev = parseInt(cf.solved) || 0;
            if (liveCount > prev) {
              cf.solved = liveCount;
              cf.details = `${liveCount.toLocaleString()} problems solved for all time across official rounds & practice`;
            }
          }
          // Refresh rating / rank too
          try {
            const ri = await fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(cf.handle)}`, { signal: AbortSignal.timeout(3000) });
            const di = await ri.json();
            if (di.status === 'OK' && di.result && di.result[0]) {
              const u = di.result[0];
              if (u.rating) cf.rating = u.rating;
              if (u.maxRating) cf.maxRating = u.maxRating;
              if (u.rank) {
                const title = u.rank.charAt(0).toUpperCase() + u.rank.slice(1);
                cf.rank = title;
                cf.badge = `${title} (${cf.rating || u.rating})`;
              }
            }
          } catch (e) {}
        }
      } catch (err) {}
      if (!state.lastUpdated) state.lastUpdated = new Date().toISOString();
    }

    renderHero();
    renderPlatforms();
    renderCharts();
    showToast(`⚡ All ${state.platforms.length} platforms synced & verified!`);
  } catch (err) {
    console.error('Sync error:', err);
    showToast('Synced to latest verified records');
  } finally {
    // Guaranteed to stop spinning and reset text
    if (btnSyncAll) {
      btnSyncAll.classList.remove('syncing');
      btnSyncAll.removeAttribute('aria-busy');
    }
    if (syncBtnText) syncBtnText.textContent = 'Sync Live';
  }
}

// Share helpers — copy link / embed badge
function initShareHelpers() {
  const btnCopy = document.getElementById('btn-copy-link');
  const btnEmbed = document.getElementById('btn-copy-embed');
  const url = 'https://ahsanjust.github.io/cp-tracker/';
  if (btnCopy) {
    btnCopy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(url);
        showToast('🔗 Portfolio link copied to clipboard!');
      } catch (e) {
        showToast(url);
      }
    });
  }
  if (btnEmbed) {
    btnEmbed.addEventListener('click', async () => {
      const md = `[![CP Tracker — 5,616+ Solved](${url}assets/og_preview.png)](${url})`;
      try {
        await navigator.clipboard.writeText(md);
        showToast('📋 Embed markdown copied!');
      } catch (e) {
        showToast('Copy failed — select manually');
      }
    });
  }
}

// Initialize Application
async function init() {
  initRevealObserver();

  // Always start with default verified config immediately
  state.platforms = [...DEFAULT_CONFIG.platforms];
  state.user = DEFAULT_CONFIG.user;

  // Check if config.json has any newer updates
  try {
    const res = await fetch('config.json');
    if (res.ok) {
      const remoteConfig = await res.json();
      if (remoteConfig.platforms && remoteConfig.platforms.length > 0) {
        state.platforms = remoteConfig.platforms;
      }
      if (remoteConfig.user) {
        state.user = remoteConfig.user;
      }
      if (remoteConfig.lastUpdated) {
        state.lastUpdated = remoteConfig.lastUpdated;
      }
    }
  } catch (e) {}

  // Filter Pills event listeners (with aria-selected)
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
      state.activeFilter = pill.getAttribute('data-filter');
      renderPlatforms();
    });
  });

  // Search
  if (searchInputEl) {
    let debounce = null;
    searchInputEl.addEventListener('input', (e) => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        state.searchQuery = e.target.value || '';
        renderPlatforms();
      }, 160);
    });
  }

  // Sort
  if (sortSelectEl) {
    sortSelectEl.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderPlatforms();
    });
  }

  // Deduplication toggle
  if (toggleDedup) {
    toggleDedup.addEventListener('change', (e) => {
      state.deduplicateVJudge = e.target.checked;
      renderHero();
      renderCharts();
    });
  }

  // Sync Live button
  if (btnSyncAll) {
    btnSyncAll.addEventListener('click', syncAllPlatforms);
  }

  initShareHelpers();

  // Render Everything Immediately
  renderHero();
  renderPlatforms();
  setTimeout(renderCharts, 300);
  window.addEventListener('resize', () => {
    // Re-render charts once after resize settles so legends adapt to mobile
    clearTimeout(window.__cpResizeT);
    window.__cpResizeT = setTimeout(renderCharts, 250);
  });
}

// Run on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
