# Competitive Programming Solved Hub ⚡

> **Dynamic real-time problem-solving portfolio tracking 5,616 problems solved across 14 judge accounts — at least 5,033 of them distinct.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-ahsanjust.github.io/cp--tracker-blue?style=for-the-badge&logo=githubpages&logoColor=white)](https://ahsanjust.github.io/cp-tracker/)
[![Total Solved](https://img.shields.io/badge/Problems_Solved-5616%2B-emerald?style=for-the-badge&logo=codeforces&logoColor=white)](https://ahsanjust.github.io/cp-tracker/)
[![LeetCode Guardian](https://img.shields.io/badge/LeetCode-Guardian_2142-amber?style=for-the-badge&logo=leetcode&logoColor=white)](https://leetcode.com/u/Ahsanul_haque_/)
[![Codeforces Expert](https://img.shields.io/badge/Codeforces-Expert_1774-blue?style=for-the-badge&logo=codeforces&logoColor=white)](https://codeforces.com/profile/Ahsan_)

![Preview](assets/og_preview.png)

---

## 🏆 Profile & Competitions
- **Name**: Ahsanul Haque
- **Institution**: Jashore University of Science and Technology (JUST)
- **Competitive Achievements**:
  - 🏅 **ICPC Asia Dhaka Regional:** 34th (2025) & 63rd (2024)
  - 🥇 **JUST IDPC:** Champion (1st Place)
  - 🥈 **NWU IUPC 2025:** 1st Runner-Up
  - ⚡ **LeetCode Guardian:** Rating 2142 (Top 1.24% worldwide)
  - 🎯 **Codeforces Expert:** Rating 1774
  - 🌟 **CodeChef 4 Stars:** Rating 1900

---

## 📊 Online Judges & Current Breakdown

| Platform | Handle | Solved Count | Rating / Rank | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Codeforces** | [`Ahsan_`](https://codeforces.com/profile/Ahsan_) | **3,183** | 1774 (Expert) | Live REST API |
| **Virtual Judge** | [`Ahsan_`](https://vjudge.net/user/Ahsan_) | **583** | 21 Sub-Judges | Live REST API |
| **LeetCode** | [`Ahsanul_haque_`](https://leetcode.com/u/Ahsanul_haque_/) | **364** | 2142 (Guardian) | GraphQL API |
| **Toph** | [`AhSaN.x`](https://toph.co/u/AhSaN.x) | **364** | 364 Solved | Web Scraper / Sync |
| **CodeChef** | [`ahsanul_haque`](https://www.codechef.com/users/ahsanul_haque) | **265** | 1900 (4★) | Web Scraper / Sync |
| **CSES** | [`Ahsanul_Haque`](https://cses.fi/problemset/list/) | **262** | 262 Solved (65.5%) | Cached / Sync |
| **AtCoder** | [`AHSANx`](https://atcoder.jp/users/AHSANx) | **148** | Rank 45,634 | Kenkoooo API |
| **LightOJ** | [`ahsanul_haque99`](https://lightoj.com/user/ahsanul_haque99) | **133** | 181 ACs | Official REST API |
| **Beecrowd (URI)** | [`ahsanulhaque5588`](https://judge.beecrowd.com/en/profile/899745) | **118** | 316.60 Points (Top 4%) | Cached / Sync |
| **Serious OJ** | [`_ahsan_`](https://serious-oj.com/user/_ahsan_) | **85** | Rating 650 (Expert) | Web Scraper / Sync |
| **SPOJ** | [`ahsanul_haque`](https://www.spoj.com/users/ahsanul_haque/) | **68** | World Rank #5140 | Cached / Sync |
| **HackerRank** | [`_AhSaN_`](https://www.hackerrank.com/profile/_AhSaN_) | **30** | Problem Solving ★★★ | Official REST API |
| **HackerEarth** | [`ahsanulhaque5588`](https://www.hackerearth.com/@ahsanulhaque5588/) | **14** | Top 18% Data Structures | Web Scraper / Sync |
| **Library Checker** | [`_AhSaN_`](https://judge.yosupo.jp/profile) | **12** | Advanced Algorithms | Cached / Sync |
 
---

## 🛠️ Features
- **Live aggregate counter**: the hero total animates to the exact solved count across all judges, and updates when you filter.
- **Deduplication mode**: toggle off Virtual Judge overlaps for a deduplicated total; the distribution chart and total follow the same figure.
- **Accessible analytics**: per-judge ranking as a real HTML list and the LeetCode difficulty mix as one stacked bar with a mono legend — readable by screen readers, no canvas, no chart library to load.
- **Honest provenance**: the hero reports how many judges are read from live APIs, scheduled profile syncs, and tracked snapshots, plus the last verification time.
- **Category filters**: contests & speed / interview & prep / national & archives, with counts computed from the data.
- **Automated daily sync**: GitHub Actions runs daily at midnight UTC to query live APIs, update numbers, and redeploy.

See [DESIGN.md](DESIGN.md) for the design system, the accessibility contract, and why each decision was made.

---

## 💻 Running Locally

Clone and run the Python sync server:
```bash
git clone https://github.com/ahsanjust/cp-tracker.git
cd cp-tracker
python3 sync_server.py
```
Open `http://localhost:3333` in your browser.

Opening `index.html` directly over `file://` also works — the page falls back to its
offline snapshot and says so — but the local server is needed for **Sync live** to
query every judge.
