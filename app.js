// Competitive Programming Solved Hub - Application Logic

let state = {
  user: null,
  platforms: [],
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
const syncSpinnerIcon = document.getElementById('sync-spinner-icon');
const btnOpenSettings = document.getElementById('btn-open-settings');
const btnCloseSettings = document.getElementById('btn-close-settings');
const btnCancelSettings = document.getElementById('btn-cancel-settings');
const btnSaveSettings = document.getElementById('btn-save-settings');
const settingsModal = document.getElementById('settings-modal');
const settingsFormContainer = document.getElementById('settings-form-container');
const toastEl = document.getElementById('toast-message');
const markdownBadgeSnippet = document.getElementById('markdown-badge-snippet');

// Toast Notification
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 3200);
}

// Number Counter Animation
function animateCounter(element, targetValue, duration = 1200) {
  const start = parseInt(element.textContent.replace(/[^\d]/g, '')) || 0;
  const startTime = performance.now();

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
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
      return; // Skip VJudge in deduplicated mode
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
  if (state.deduplicateVJudge) {
    subText.textContent = `Across 12 Native Judges (Excluding VJudge)`;
  } else {
    subText.textContent = `Across ${state.platforms.length} Online Judges`;
  }

  // Update shareable badge code if element exists
  if (markdownBadgeSnippet) {
    const roundedK = Math.floor(total / 100) * 100;
    const badgeUrl = `https://img.shields.io/badge/CP_Problems_Solved-${roundedK}%2B-blue?style=for-the-badge&logo=codeforces&logoColor=white`;
    markdownBadgeSnippet.textContent = `![Problems Solved](${badgeUrl})`;
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
    beecrowd: `Bee`,
    spoj: `SPOJ`,
    hackerrank: `HR`,
    hackerearth: `HE`,
    yosupo: `YC`
  };

  return icons[p.id] || p.name.substring(0, 2).toUpperCase();
}

// Render Platform Cards Grid
function renderPlatforms() {
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
            <button class="icon-btn" onclick="syncSinglePlatform('${p.id}')" title="Refresh ${p.name}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            </button>
            <a href="${p.profileUrl}" target="_blank" rel="noopener noreferrer" class="icon-btn" title="Open Profile">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            </a>
          </div>
        </div>

        <div class="card-stat">
          <div class="card-solved-number">
            ${p.solved.toLocaleString()}
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
              padding: 8
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
        labels: ['LeetCode Easy', 'LeetCode Medium', 'LeetCode Hard', 'AtCoder (148)', 'CSES (262)', 'Toph (364)'],
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
  btnSyncAll.classList.add('syncing');
  syncBtnText.textContent = 'Syncing...';

  try {
    // Try syncing via local python sync server if active
    const res = await fetch('/api/sync', { signal: AbortSignal.timeout(12000) });
    if (res.ok) {
      const data = await res.json();
      if (data.config && data.config.platforms) {
        state.platforms = data.config.platforms;
        localStorage.setItem('cp_tracker_platforms', JSON.stringify(state.platforms));
        renderHero();
        renderPlatforms();
        renderCharts();
        showToast('🚀 Live sync completed via background engine!');
        btnSyncAll.classList.remove('syncing');
        syncBtnText.textContent = 'Sync Live';
        return;
      }
    }
  } catch (e) {
    console.log('Local sync server unavailable or timed out, performing client-side fetch...');
  }

  // Fallback: Client-side fetch for direct CORS-friendly endpoints
  let updatedCount = 0;
  for (const p of state.platforms) {
    try {
      if (p.id === 'codeforces') {
        const r = await fetch(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(p.handle)}`);
        const d = await r.json();
        if (d.status === 'OK') {
          const solved = new Set();
          d.result.forEach(s => {
            if (s.verdict === 'OK') {
              solved.add(`${s.problem.contestId}_${s.problem.index}`);
            }
          });
          p.solved = solved.size;
          updatedCount++;
        }
      } else if (p.id === 'atcoder') {
        const r = await fetch(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=${encodeURIComponent(p.handle)}`);
        if (r.ok) {
          const d = await r.json();
          if (d.count) {
            p.solved = d.count;
            updatedCount++;
          }
        }
      } else if (p.id === 'vjudge') {
        const r = await fetch(`https://vjudge.net/user/solveDetail/${encodeURIComponent(p.handle)}`);
        if (r.ok) {
          const d = await r.json();
          if (d.acRecords) {
            let tot = 0;
            Object.values(d.acRecords).forEach(arr => tot += arr.length);
            p.solved = tot;
            updatedCount++;
          }
        }
      }
    } catch (err) {
      console.log(`Could not sync ${p.id} directly (likely CORS):`, err);
    }
  }

  localStorage.setItem('cp_tracker_platforms', JSON.stringify(state.platforms));
  renderHero();
  renderPlatforms();
  renderCharts();
  btnSyncAll.classList.remove('syncing');
  syncBtnText.textContent = 'Sync Live';
  showToast(`Updated stats for verified platforms!`);
}

// Sync a single platform
async function syncSinglePlatform(pid) {
  const p = state.platforms.find(x => x.id === pid);
  if (!p) return;
  showToast(`Syncing ${p.name}...`);
  await syncAllPlatforms();
}

// Build Settings Modal Form
function populateSettingsForm() {
  settingsFormContainer.innerHTML = '';
  
  state.platforms.forEach((p, idx) => {
    const item = document.createElement('div');
    item.style.cssText = 'background: rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:14px; margin-bottom:12px;';
    item.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <strong style="color:${p.color}; font-size:0.95rem;">${p.name}</strong>
        <span style="font-size:0.75rem; color:#94a3b8;">${p.category}</span>
      </div>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
        <div class="form-group" style="margin-bottom:6px;">
          <label>Handle / Username</label>
          <input type="text" class="form-control" data-idx="${idx}" data-field="handle" value="${p.handle || ''}">
        </div>
        <div class="form-group" style="margin-bottom:6px;">
          <label>Problems Solved</label>
          <input type="number" class="form-control" data-idx="${idx}" data-field="solved" value="${p.solved || 0}">
        </div>
      </div>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
        <div class="form-group" style="margin-bottom:0;">
          <label>Rating / Score</label>
          <input type="number" class="form-control" data-idx="${idx}" data-field="rating" value="${p.rating || ''}" placeholder="e.g. 1774">
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label>Badge / Rank Title</label>
          <input type="text" class="form-control" data-idx="${idx}" data-field="badge" value="${p.badge || ''}" placeholder="e.g. Guardian">
        </div>
      </div>
    `;
    settingsFormContainer.appendChild(item);
  });
}

// Save Settings Form
async function saveSettings() {
  const inputs = settingsFormContainer.querySelectorAll('input[data-idx]');
  inputs.forEach(inp => {
    const idx = parseInt(inp.getAttribute('data-idx'));
    const field = inp.getAttribute('data-field');
    const val = inp.value;

    if (field === 'solved') {
      state.platforms[idx].solved = parseInt(val) || 0;
    } else if (field === 'rating') {
      state.platforms[idx].rating = val ? parseInt(val) : null;
    } else {
      state.platforms[idx][field] = val;
    }
  });

  localStorage.setItem('cp_tracker_platforms', JSON.stringify(state.platforms));
  
  // Try saving back to server if running
  try {
    fetch('/api/save_all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: state.user, platforms: state.platforms })
    });
  } catch (e) {}

  settingsModal.classList.remove('active');
  renderHero();
  renderPlatforms();
  renderCharts();
  showToast('Saved custom handles and counts!');
}

// Initialize Application
async function init() {
  // Try loading from localStorage first
  const saved = localStorage.getItem('cp_tracker_platforms');
  let configData = null;

  try {
    const res = await fetch('config.json');
    if (res.ok) {
      configData = await res.json();
    }
  } catch (e) {
    console.log('Error fetching config.json:', e);
  }

  if (saved) {
    try {
      state.platforms = JSON.parse(saved);
      if (configData && configData.user) state.user = configData.user;
    } catch (e) {
      state.platforms = configData?.platforms || [];
      state.user = configData?.user;
    }
  } else if (configData) {
    state.platforms = configData.platforms;
    state.user = configData.user;
  }

  // Event Listeners
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeFilter = pill.getAttribute('data-filter');
      renderPlatforms();
    });
  });

  toggleDedup.addEventListener('change', (e) => {
    state.deduplicateVJudge = e.target.checked;
    renderHero();
    renderCharts();
  });

  btnSyncAll.addEventListener('click', syncAllPlatforms);

  btnOpenSettings.addEventListener('click', () => {
    populateSettingsForm();
    settingsModal.classList.add('active');
  });

  btnCloseSettings.addEventListener('click', () => settingsModal.classList.remove('active'));
  btnCancelSettings.addEventListener('click', () => settingsModal.classList.remove('active'));
  btnSaveSettings.addEventListener('click', saveSettings);

  window.addEventListener('click', (e) => {
    if (e.target === settingsModal) settingsModal.classList.remove('active');
  });

  // Initial Render
  renderHero();
  renderPlatforms();
  setTimeout(renderCharts, 300);
}

document.addEventListener('DOMContentLoaded', init);
