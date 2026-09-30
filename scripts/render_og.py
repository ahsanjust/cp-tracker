"""Render a number-fresh OG/social card with Pillow.

A raster OG image with a baked-in total goes stale on every sync. This script
redraws assets/og_preview.png from config.json (total, distinct, judge count,
top judges, verification date), so the LinkedIn/Slack unfurl always quotes the
live record. Run after the sync step in CI; commit when the bytes change.

Usage: python3 scripts/render_og.py
Requires: pillow
"""
import json
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
W, H = 1200, 630
INK = (8, 9, 12)
PANEL = (17, 20, 27)
LINE = (38, 46, 58)
TEXT1 = (242, 245, 249)
TEXT2 = (168, 178, 192)
ACCENT = (56, 189, 248)
GOLD = (251, 191, 36)


def font(bold, size):
    for name in (
        f"DejaVuSans-{ 'Bold' if bold else ''}".rstrip("-") + ".ttf",
        "DejaVuSans.ttf",
    ):
        p = Path("/usr/share/fonts/truetype/dejavu") / name
        if p.exists():
            return ImageFont.truetype(str(p), size)
    return ImageFont.load_default()


def main():
    cfg = json.loads((ROOT / "config.json").read_text())
    plats = sorted(cfg["platforms"], key=lambda p: -int(p["solved"]))
    total = sum(int(p["solved"]) for p in plats)
    vj = next(int(p["solved"]) for p in plats if p["id"] == "vjudge")
    distinct = total - vj
    try:
        dt = datetime.fromisoformat(cfg.get("lastUpdated", ""))
        stamp = dt.strftime("%b %d, %Y").replace(" 0", " ")
    except ValueError:
        stamp = ""

    img = Image.new("RGB", (W, H), INK)
    d = ImageDraw.Draw(img)

    # Faint concentric rings, top-right — the instrument-panel motif.
    for r in range(60, 560, 26):
        d.ellipse([W - 260 - r, -320 - r, W - 260 + r, -320 + r],
                  outline=(26, 34, 48), width=2)
    for r in range(40, 420, 30):
        d.ellipse([-220 - r, H - 160 - r, -220 + r, H - 160 + r],
                  outline=(30, 28, 52), width=2)

    f_name = font(True, 64)
    f_role = font(False, 30)
    f_sub = font(False, 26)
    f_num = font(True, 120)
    f_lab = font(True, 24)
    f_row = font(False, 26)
    f_row_b = font(True, 26)
    f_foot = font(False, 24)

    d.text((70, 56), "Ahsanul Haque", font=f_name, fill=TEXT1)
    d.text((72, 140), "Competitive Programming Record  ·  Verifiable solve history",
           font=f_role, fill=ACCENT)
    d.text((72, 182), "Jashore University of Science and Technology  ·  2× ICPC Regionalist",
           font=f_sub, fill=TEXT2)

    # Left panel: the headline total.
    d.rounded_rectangle([70, 250, 560, 540], radius=18, fill=PANEL, outline=LINE, width=2)
    d.text((104, 268), "TOTAL PROBLEMS SOLVED", font=f_lab, fill=ACCENT)
    d.text((100, 300), f"{total:,}", font=f_num, fill=TEXT1)
    d.text((104, 440), f"Across {len(plats)} judges  ·  ≥{distinct:,} distinct",
           font=f_row, fill=TEXT2)
    top = plats[:3]
    d.text((104, 482), "  ·  ".join(f"{p['name'].split()[0]} {int(p['solved']):,}" for p in top),
           font=f_row_b, fill=TEXT1)

    # Right panel: the credentials that survive a 2-second glance.
    d.rounded_rectangle([600, 250, 1130, 540], radius=18, fill=PANEL, outline=LINE, width=2)
    d.text((634, 268), "VERIFIED CREDENTIALS", font=f_lab, fill=(196, 141, 255))
    rows = [
        (GOLD, "LeetCode Guardian — rating 2,142", "Top 1.24% worldwide"),
        (ACCENT, "Codeforces Expert — rating 1,774", f"{next(int(p['solved']) for p in plats if p['id']=='codeforces'):,} problems solved"),
        ((251, 146, 60), "CodeChef 4 Stars — rating 1,900", "Division 2 competitor"),
        ((52, 211, 153), "ICPC Asia Dhaka Regional", "34th (2025) · 63rd (2024)"),
    ]
    y = 316
    for dot, head, sub in rows:
        d.ellipse([634, y + 8, 650, y + 24], fill=dot)
        d.text((664, y - 4), head, font=f_row_b, fill=TEXT1)
        d.text((664, y + 28), sub, font=f_foot, fill=TEXT2)
        y += 58

    d.text((70, 572), "ahsanjust.github.io/cp-tracker", font=f_foot, fill=ACCENT)
    d.text((1130 - d.textlength(f"Verified {stamp}", font=f_foot), 572),
           f"Verified {stamp}", font=f_foot, fill=TEXT2)

    out = ROOT / "assets" / "og_preview.png"
    img.save(out)
    print(f"wrote {out} ({total:,} total, ≥{distinct:,} distinct)")


if __name__ == "__main__":
    main()
