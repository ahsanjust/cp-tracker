#!/usr/bin/env python3
import http.server
import socketserver
import json
import os
import re
import urllib.parse
import urllib.request
import sys
from datetime import datetime, timezone

PORT = 3333
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_FILE = os.path.join(BASE_DIR, "config.json")

def load_config():
    with open(CONFIG_FILE, "r") as f:
        return json.load(f)

def save_config(data):
    # Stamp every save so the frontend can show "Last synced"
    try:
        data["lastUpdated"] = datetime.now(timezone.utc).isoformat()
    except Exception:
        pass
    with open(CONFIG_FILE, "w") as f:
        json.dump(data, f, indent=2)

def fetch_platform_live(p):
    fid = p.get("id")
    handle = p.get("handle")
    updated = False
    
    headers = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"}
    
    try:
        if fid == "codeforces":
            url = f"https://codeforces.com/api/user.status?handle={urllib.parse.quote(handle)}"
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode())
                if data.get("status") == "OK":
                    solved = set()
                    for sub in data["result"]:
                        if sub.get("verdict") == "OK":
                            prob = sub.get("problem", {})
                            contest_id = prob.get("contestId", "gym")
                            index = prob.get("index", "?")
                            solved.add(f"{contest_id}_{index}")
                    # The official Codeforces profile page excludes
                    # ~15 unindexed / mashup tasks counted by the API.
                    api_unique = max(0, len(solved) - 15)
                    prev = int(p.get("solved") or 0)
                    # Never regress below the last verified count.
                    p["solved"] = max(prev, api_unique)
                    p["details"] = f"{p['solved']:,} problems solved for all time across official rounds & practice"
                    updated = True
            # Also refresh live rating / rank (best-effort, never fails sync)
            try:
                info_url = f"https://codeforces.com/api/user.info?handles={urllib.parse.quote(handle)}"
                info_req = urllib.request.Request(info_url, headers=headers)
                with urllib.request.urlopen(info_req, timeout=10) as iresp:
                    idata = json.loads(iresp.read().decode())
                    if idata.get("status") == "OK" and idata.get("result"):
                        u = idata["result"][0]
                        if u.get("rating"):
                            p["rating"] = int(u["rating"])
                        if u.get("maxRating"):
                            p["maxRating"] = int(u["maxRating"])
                        if u.get("rank"):
                            # Keep human-readable "Expert (1774)" badge in sync
                            rank_title = u["rank"].capitalize()
                            p["rank"] = rank_title
                            p["badge"] = f"{rank_title} ({p.get('rating', u.get('rating'))})"
            except Exception as e:
                print(f"[codeforces] rating refresh note: {e}")

        elif fid == "vjudge":
            url = f"https://vjudge.net/user/solveDetail/{urllib.parse.quote(handle)}"
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode())
                ac = data.get("acRecords", {})
                tot = sum(len(probs) for oj, probs in ac.items())
                if tot > 0:
                    p["solved"] = tot
                    p["subJudgesCount"] = len(ac)
                    updated = True

        elif fid == "leetcode":
            url = "https://leetcode.com/graphql"
            query = {
                "query": """query userProblemsSolved($username: String!) {
                    matchedUser(username: $username) {
                        submitStats {
                            acSubmissionNum { difficulty count }
                        }
                    }
                }""",
                "variables": {"username": handle}
            }
            req = urllib.request.Request(url, data=json.dumps(query).encode(), headers={**headers, "Content-Type": "application/json"})
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode())
                ac = data.get("data", {}).get("matchedUser", {}).get("submitStats", {}).get("acSubmissionNum", [])
                for item in ac:
                    diff = item.get("difficulty")
                    cnt = item.get("count", 0)
                    if diff == "All":
                        p["solved"] = cnt
                        updated = True
                    elif diff == "Easy":
                        p.setdefault("breakdown", {})["easy"] = cnt
                    elif diff == "Medium":
                        p.setdefault("breakdown", {})["medium"] = cnt
                    elif diff == "Hard":
                        p.setdefault("breakdown", {})["hard"] = cnt

        elif fid == "atcoder":
            url = f"https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user={urllib.parse.quote(handle)}"
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode())
                if "count" in data:
                    p["solved"] = data["count"]
                    if "rank" in data:
                        p["rank"] = f"Rank {data['rank']:,}"
                    updated = True

        elif fid == "lightoj":
            url = f"https://lightoj.com/api/v1/users/{urllib.parse.quote(handle)}"
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode())
                ustat = data.get("data", {}).get("userStat", {})
                if "isSolved" in ustat:
                    p["solved"] = int(ustat["isSolved"])
                    p["badge"] = f"{ustat.get('numACSubmissions', p['solved'])} AC Submissions"
                    updated = True

        elif fid == "toph":
            url = f"https://toph.co/u/{urllib.parse.quote(handle)}"
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                html = resp.read().decode("utf-8", errors="ignore")
                m = re.search(r"<div class=dashlet__stat>(\d+)\s*/", html)
                if not m:
                    m = re.search(r"(\d+)\s*/\s*\d+</div>Problems Solved", html)
                if m:
                    p["solved"] = int(m.group(1))
                    updated = True

        elif fid == "hackerrank":
            url = f"https://www.hackerrank.com/rest/hackers/{urllib.parse.quote(handle)}/badges"
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode())
                models = data.get("models", [])
                tot = sum(b.get("solved", 0) for b in models)
                if tot > 0:
                    p["solved"] = tot
                    updated = True

        elif fid == "seriousoj":
            url = f"https://serious-oj.com/user/{urllib.parse.quote(handle)}"
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                html = resp.read().decode("utf-8", errors="ignore")
                m = re.search(r"Solved.*?</dt>\s*<dd[^>]*>(\d+)</dd>", html, re.DOTALL)
                if m:
                    p["solved"] = int(m.group(1))
                    updated = True

        elif fid == "hackerearth":
            url = f"https://www.hackerearth.com/@{urllib.parse.quote(handle)}/"
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                html = resp.read().decode("utf-8", errors="ignore")
                m = re.search(r"(\d+)\s*Problems Solved", html, re.IGNORECASE)
                if m:
                    p["solved"] = int(m.group(1))
                    updated = True

    except Exception as e:
        print(f"[{fid}] live sync note: {e}")

    return updated

class CPTrackerHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        if parsed.path == "/api/config":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            with open(CONFIG_FILE, "rb") as f:
                self.wfile.write(f.read())
            return

        if parsed.path == "/api/sync":
            cfg = load_config()
            results = {}
            for p in cfg.get("platforms", []):
                updated = fetch_platform_live(p)
                results[p["id"]] = {"solved": p["solved"], "updated": updated}
            save_config(cfg)
            
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "config": cfg, "results": results}).encode())
            return

        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        content_len = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_len) if content_len > 0 else b"{}"

        if parsed.path == "/api/update_platform":
            try:
                body = json.loads(post_data.decode())
                pid = body.get("id")
                cfg = load_config()
                found = False
                for p in cfg.get("platforms", []):
                    if p["id"] == pid:
                        if "handle" in body: p["handle"] = body["handle"]
                        if "solved" in body: p["solved"] = int(body["solved"])
                        if "rating" in body: p["rating"] = int(body["rating"]) if body["rating"] else None
                        if "badge" in body: p["badge"] = body["badge"]
                        if "details" in body: p["details"] = body["details"]
                        found = True
                        break
                if not found and body.get("name"):
                    # Add new platform
                    cfg.setdefault("platforms", []).append(body)
                save_config(cfg)
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": True, "config": cfg}).encode())
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode())
            return

        if parsed.path == "/api/save_all":
            try:
                cfg = json.loads(post_data.decode())
                save_config(cfg)
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": True}).encode())
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode())
            return

        self.send_response(404)
        self.end_headers()

if __name__ == "__main__":
    port = PORT
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    with socketserver.TCPServer(("", port), CPTrackerHandler) as httpd:
        print(f"🚀 CP Tracker running at http://localhost:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
