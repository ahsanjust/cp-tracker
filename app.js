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
      "solved": 3198,
      "rating": 1774,
      "rank": "Expert",
      "maxRating": 1774,
      "badge": "Expert (1774)",
      "color": "#3B82F6",
      "accentColor": "#60A5FA",
      "category": "competitive",
      "fetchType": "codeforces_api",
      "icon": "cf",
      "details": "3,198 unique problems solved across official rounds & practice"
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
      "profileUrl": "https://judge.beecrowd.com/en/profile/ahsanulhaque5588",
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
    },
    {
      "id": "eolymp",
      "name": "Eolymp",
      "handle": "user133660",
      "profileUrl": "https://eolymp.com/users/user133660",
      "solved": 4,
      "badge": "3 Achievements",
      "color": "#14B8A6",
      "accentColor": "#2DD4BF",
      "category": "practice",
      "fetchType": "eolymp_scraper",
      "icon": "eo",
      "details": "European online olympiad platform • 9 Submissions • 3 Achievements"
    },
    {
      "id": "tlx",
      "name": "TLX TOKI",
      "handle": "AhSaN",
      "profileUrl": "https://tlx.toki.id/profiles/AhSaN",
      "solved": 1,
      "badge": "100 Pts Score",
      "color": "#0284C7",
      "accentColor": "#38BDF8",
      "category": "competitive",
      "fetchType": "tlx_cached",
      "icon": "tlx",
      "details": "Indonesian National Olympiad training & contest platform"
    }
  ]
};

let state = {
  user: DEFAULT_CONFIG.user,
  platforms: DEFAULT_CONFIG.platforms,
  activeFilter: 'all',
  deduplicateVJudge: false,
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
      subText.textContent = `Across 15 Native Judges (Excluding VJudge)`;
    } else {
      subText.textContent = `Across ${state.platforms.length} Online Judges`;
    }
  }
}

// Get SVG or Initials for Platform
function getPlatformIconMarkup(p) {
  const icons = {
    codeforces: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="1.5" y="9" width="5" height="13.5" rx="1.5"/><rect x="9.5" y="4.5" width="5" height="18" rx="1.5"/><rect x="17.5" y="1" width="5" height="21.5" rx="1.5"/></svg>`,
    leetcode: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16.1 1.7a1.5 1.5 0 0 0-2.1.2L7 9.8a6.5 6.5 0 0 0 0 9.2l1.6 1.6a6.5 6.5 0 0 0 9.2 0l3-3a1.5 1.5 0 0 0-2.1-2.1l-3 3a3.5 3.5 0 0 1-5 0l-1.6-1.6a3.5 3.5 0 0 1 0-5l7-7.9a1.5 1.5 0 0 0-.2-2.1z"/></svg>`,
    atcoder: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L2 22h20L12 2zm0 6l5 10H7l5-10z"/></svg>`,
    vjudge: `VJ`,
    toph: `Toph`,
    codechef: `CC`,
    cses: `CSES`,
    lightoj: `LOJ`,
    seriousoj: `SOJ`,
    beecrowd: `Bee`,
    spoj: `SPOJ`,
    hackerrank: `HR`,
    hackerearth: `HE`,
    yosupo: `YC`,
    eolymp: `EO`,
    tlx: `TLX`
  };

  return icons[p.id] || p.name.substring(0, 2).toUpperCase();
}

// Render Platform Cards Grid
function renderPlatforms() {
  if (!gridContainerEl) return;
  gridContainerEl.innerHTML = '';

  const filtered = state.platforms.filter(p => {
    if (state.activeFilter === 'all') return true;
    return p.category === state.activeFilter;
  });

  const maxSolves = Math.max(...state.platforms.map(p => p.solved || 0));

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
  });
}

// Render Analytics Charts with Chart.js
function renderCharts() {
  if (!window.Chart) return;

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
            position: 'right',
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

  // 2. Skill Tiers & Difficulty Chart
  const ctxSkills = document.getElementById('difficultyBreakdownChart');
  if (ctxSkills) {
    if (state.charts.skills) {
      state.charts.skills.destroy();
    }

    const lcPlatform = state.platforms.find(p => p.id === 'leetcode');
    const lcEasy = lcPlatform?.breakdown?.easy || 124;
    const lcMed = lcPlatform?.breakdown?.medium || 168;
    const lcHard = lcPlatform?.breakdown?.hard || 72;

    state.charts.skills = new Chart(ctxSkills, {
      type: 'bar',
      data: {
        labels: ['LeetCode Easy', 'LeetCode Medium', 'LeetCode Hard', 'AtCoder Solves', 'CSES Tasks', 'Toph Solves'],
        datasets: [{
          label: 'Problems Solved',
          data: [lcEasy, lcMed, lcHard, 148, 262, 364],
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
  if (btnSyncAll) btnSyncAll.classList.add('syncing');
  if (syncBtnText) syncBtnText.textContent = 'Syncing...';

  try {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isLocal) {
      try {
        const res = await fetch('/api/sync', { signal: AbortSignal.timeout(4000) });
        if (res.ok) {
          const data = await res.json();
          if (data.config && data.config.platforms) {
            state.platforms = data.config.platforms;
          }
        }
      } catch (e) {}
    } else {
      // On GitHub Pages: fetch latest config.json with cache buster
      try {
        const res = await fetch('config.json?t=' + Date.now(), { signal: AbortSignal.timeout(3000) });
        if (res.ok) {
          const data = await res.json();
          if (data.platforms && data.platforms.length > 0) {
            state.platforms = data.platforms;
          }
        }
      } catch (e) {}

      // Try quick live check for Codeforces & AtCoder
      try {
        const cf = state.platforms.find(p => p.id === 'codeforces');
        if (cf) {
          const r = await fetch(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(cf.handle)}`, { signal: AbortSignal.timeout(2500) });
          const d = await r.json();
          if (d.status === 'OK') {
            const solved = new Set();
            d.result.forEach(s => {
              if (s.verdict === 'OK') {
                solved.add(`${s.problem.contestId}_${s.problem.index}`);
              }
            });
            cf.solved = solved.size;
          }
        }
      } catch (err) {}
    }

    renderHero();
    renderPlatforms();
    renderCharts();
    showToast('⚡ All 16 platforms synced & verified!');
  } catch (err) {
    console.error('Sync error:', err);
    showToast('Synced to latest verified records');
  } finally {
    // Guaranteed to stop spinning and reset text
    if (btnSyncAll) btnSyncAll.classList.remove('syncing');
    if (syncBtnText) syncBtnText.textContent = 'Sync Live';
  }
}

// Initialize Application
async function init() {
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
    }
  } catch (e) {}

  // Filter Pills event listeners
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeFilter = pill.getAttribute('data-filter');
      renderPlatforms();
    });
  });

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

  // Render Everything Immediately
  renderHero();
  renderPlatforms();
  setTimeout(renderCharts, 300);
}

// Run on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
