"""Stamp live figures from config.json into static surfaces.

The page renders from config.json at runtime, but crawlers, link unfurls and
no-JS readers only see the static markup. This script rewrites every hard-coded
figure in index.html and README.md so those surfaces can never drift from the
data. Run after the sync step in CI; --check fails the workflow if stale.

Usage:
    python3 scripts/stamp_site.py          # rewrite in place
    python3 scripts/stamp_site.py --check  # exit 1 when stale
"""
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def classify(fetch_type):
    t = str(fetch_type or "")
    if t.endswith("_api"):
        return "api"
    if t.endswith("_scraper"):
        return "sync"
    return "snapshot"


def load_figures():
    cfg = json.loads((ROOT / "config.json").read_text())
    platforms = cfg["platforms"]
    total = sum(int(p["solved"]) for p in platforms)
    vjudge = next((int(p["solved"]) for p in platforms if p["id"] == "vjudge"), 0)
    distinct = total - vjudge
    counts = {"api": 0, "sync": 0, "snapshot": 0}
    for p in platforms:
        counts[classify(p.get("fetchType"))] += 1
    updated = cfg.get("lastUpdated", "")
    try:
        dt = datetime.fromisoformat(updated)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        stamp = dt.astimezone(timezone.utc).strftime("%b %-d, %Y, %-I:%M %p UTC")
    except ValueError:
        stamp, dt = updated, None
    iso = dt.isoformat() if dt else updated
    fmt = lambda n: f"{n:,}"  # noqa: E731
    return {
        "total": total, "distinct": distinct, "judges": len(platforms),
        "total_f": fmt(total), "distinct_f": fmt(distinct),
        "live": counts["api"], "sync": counts["sync"], "snap": counts["snapshot"],
        "stamp": stamp, "iso": iso, "platforms": platforms,
    }


def patch(path, replacements):
    text = path.read_text()
    for pattern, repl in replacements:
        new, n = re.subn(pattern, repl, text, count=1)
        if n != 1:
            raise SystemExit(f"stamp: pattern not found once in {path.name}: {pattern[:70]}")
        text = new
    path.write_text(text)


def stamp_index(f):
    p = ROOT / "index.html"
    patch(p, [
        (r"<title>Ahsanul Haque — Competitive Programming Record \([\d,]+ solves, \d+ judges\)</title>",
         f"<title>Ahsanul Haque — Competitive Programming Record ({f['total_f']} solves, {f['judges']} judges)</title>"),
        (r'(<meta name="description" content="A verifiable record of )[\d,]+( problems)',
         rf"\g<1>{f['total_f']}\g<2>"),
        (r"(overlapping solve counts twice; at least )[\d,]+( are distinct)",
         rf"\g<1>{f['distinct_f']}\g<2>"),
        (r'(<meta property="og:title" content="Ahsanul Haque — Competitive Programming Record \()[\d,]+( solves, \d+ judges\)">)',
         rf"\g<1>{f['total_f']}\g<2>"),
        (r'(<meta property="og:description" content=")[\d,]+( problems solved across \d+ judge accounts, at least )[\d,]+( of them distinct)',
         rf"\g<1>{f['total_f']}\g<2>{f['distinct_f']}\g<3>"),
        (r'(<meta name="twitter:description" content=")[\d,]+( solved across \d+ judge accounts \()≥[\d,]+( distinct\))',
         rf"\g<1>{f['total_f']}\g<2>≥{f['distinct_f']}\g<3>"),
        (r'(<span class="hero__num num" id="hero-total">)[\d,]+(</span>)',
         rf"\g<1>{f['total_f']}\g<2>"),
        (r'(<span class="num" id="hero-unique">)[\d,]+(</span>)',
         rf"\g<1>{f['distinct_f']}\g<2>"),
        (r"(leaves the )[\d,]+( that are certainly distinct)",
         rf"\g<1>{f['distinct_f']}\g<2>"),
        (r'<time class="readout__val num" id="last-updated"(?: datetime="[^"]*")?>.*?</time>',
         f"<time class=\"readout__val num\" id=\"last-updated\" datetime=\"{f['iso']}\">{f['stamp']}</time>"),
        (r'(<span class="readout__val num" id="count-live">)\d+(</span>)',
         rf"\g<1>{f['live']}\g<2>"),
        (r'(<span class="readout__val num" id="count-sync">)\d+(</span>)',
         rf"\g<1>{f['sync']}\g<2>"),
        (r'(<span class="readout__val num" id="count-snapshot">)\d+(</span>)',
         rf"\g<1>{f['snap']}\g<2>"),
    ])


def stamp_readme(f):
    p = ROOT / "README.md"
    text = p.read_text()
    text, n1 = re.subn(r"tracking [\d,]+ problems solved across \d+ judge accounts — at least [\d,]+ of them distinct",
                       f"tracking {f['total_f']} problems solved across {f['judges']} judge accounts — at least {f['distinct_f']} of them distinct",
                       text, count=1)
    text, n2 = re.subn(r"Problems_Solved-\d+%2B", f"Problems_Solved-{f['total']}%2B", text, count=1)
    if n1 != 1 or n2 != 1:
        raise SystemExit("stamp: README intro/badge pattern not found")
    for plat in f["platforms"]:
        names = [plat["name"], {"CSES Problem Set": "CSES"}.get(plat["name"], plat["name"])]
        for name in names:
            row = re.compile(r"(\| \*\*" + re.escape(name) + r"\*\* \| \[.*?\]\(.*?\) \| \*\*)[\d,]+(\*\* \|)")
            text, n = row.subn(rf"\g<1>{plat['solved']:,}\g<2>", text, count=1)
            if n == 1:
                break
        if n != 1:
            print(f"stamp: warning — README row not found for {plat['name']}", file=sys.stderr)
    p.write_text(text)


def check(f):
    problems = []
    index = (ROOT / "index.html").read_text()
    readme = (ROOT / "README.md").read_text()
    design = (ROOT / "DESIGN.md").read_text()
    for label, text in (("index.html", index), ("README.md", readme)):
        for want in (f["total_f"], f["distinct_f"]):
            if want not in text:
                problems.append(f"{label} lacks {want}")
    for stale in ("5,629", "5,616", "5,033", "5,046", "Problems_Solved-5616"):
        for label, text in (("index.html", index), ("README.md", readme), ("DESIGN.md", design)):
            if stale in text:
                problems.append(f"{label} still contains stale {stale}")
    if f["stamp"] not in index or 'id="last-updated" datetime=' not in index:
        problems.append("index.html lacks stamped last-verified time")
    if problems:
        print("stale static figures:\n- " + "\n- ".join(problems))
        return 1
    print(f"static figures fresh: {f['total_f']} total, {f['distinct_f']} distinct, {f['judges']} judges")
    return 0


def main():
    figures = load_figures()
    if "--check" in sys.argv:
        return check(figures)
    stamp_index(figures)
    stamp_readme(figures)
    return check(figures)


if __name__ == "__main__":
    sys.exit(main())
