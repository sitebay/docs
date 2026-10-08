"""Project-specific documentation readiness rubric, NOT a search-engine SEO score.

90 points test built artifacts and bounded task retrieval. The remaining 10
require separate public delivery and observed search-inclusion evidence.
Unknown checks earn no verified points and are explicitly labelled unassessed.
"""

from __future__ import annotations
import argparse, hashlib, json, re, tomllib
from collections import defaultdict
from pathlib import Path
from urllib.parse import urljoin
from xml.etree import ElementTree as ET
from bs4 import BeautifulSoup
from publishing import ROOT, output_file, parse_metadata

TASKS = [
    "articles/sorti/fix-a-staging-page.md",
    "articles/sorti/review-a-staging-release.md",
    "articles/sorti/create-a-review-skill.md",
    "articles/vscode/test-localhost-with-sorti.md",
    "articles/sorti/build-a-counter-panel.md",
    "articles/sorti/recover-an-interrupted-task.md",
]
FIELDS = ("goal", "prerequisites", "effects", "verification")
RUBRIC = {
    "static_body": ("Crawl and identity", 5, "Static main text and one H1"),
    "canonical": (
        "Crawl and identity",
        5,
        "Self-canonical authored pages, no accidental noindex",
    ),
    "sitemap": ("Crawl and identity", 5, "Authored canonical routes in sitemap"),
    "lastmod": (
        "Crawl and identity",
        5,
        "Sitemap lastmod matches explicit modified date",
    ),
    "markdown": (
        "Machine reading",
        5,
        "Individual rendered Markdown documents with hashes",
    ),
    "discovery": (
        "Machine reading",
        5,
        "HTML declares its Markdown alternate and llms index",
    ),
    "index": (
        "Machine reading",
        5,
        "Curated index under 12 KiB, grouped Markdown links",
    ),
    "manifest": (
        "Machine reading",
        5,
        "Complete revision-matched manifest and section locations",
    ),
    "fidelity": (
        "Machine reading",
        5,
        "Export retains every code block and prose heading",
    ),
    "source": ("Provenance", 5, "Raw source hashes and committed source links"),
    "review": (
        "Provenance",
        5,
        "All public article hashes match source review records",
    ),
    "schema": (
        "Provenance",
        5,
        "Page-specific JSON-LD with matching title, URL and dates",
    ),
    "attribution": (
        "Provenance",
        5,
        "Visible authors, modified date and source reference",
    ),
    "descriptions": (
        "Task usefulness",
        5,
        "Nonempty page description and opening answer text",
    ),
    "taskcards": (
        "Task usefulness",
        5,
        "Six walkthroughs declare goal, prerequisites, effects and checks",
    ),
    "rename": (
        "Task usefulness",
        5,
        "Sorti rename is explicit and legacy redirects verified",
    ),
    "retrieval": (
        "Task usefulness",
        10,
        "Version-matched curated task retrieval and citation checks",
    ),
}
assert sum(v[1] for v in RUBRIC.values()) == 90


def sha(raw: bytes) -> str:
    return hashlib.sha256(raw).hexdigest()


def load(path: Path, default):
    return json.loads(path.read_text()) if path.is_file() else default


def fenced_code_blocks(markdown):
    """Remove only Markdown container prefixes, never code indentation."""
    blocks = []
    fence = None
    prefix = ""
    lines = []
    for line in markdown.splitlines():
        if fence is None:
            opening = re.match(r"^([ \t]*(?:>[ ]*)?)(`{3,}|~{3,})[^`]*$", line)
            if opening:
                prefix, fence = opening.groups()
                lines = []
        else:
            text = line[len(prefix) :] if prefix and line.startswith(prefix) else line
            if re.fullmatch(
                re.escape(fence[0]) + "{" + str(len(fence)) + r",}[ \t]*", text
            ):
                blocks.append("\n".join(lines).strip())
                fence = None
            else:
                lines.append(text)
    return blocks


def audit(
    root: Path, public: Path, retrieval: Path | None = None, live: Path | None = None
):
    base = tomllib.loads((root / "config.toml").read_text())["baseURL"]
    corpus = load(public / "knowledge/corpus.json", {})
    docs = corpus.get("documents", [])
    if not docs:
        raise ValueError("Build a nonempty corpus before auditing")
    records = load(public / "knowledge/documents.json", {})
    manifest = {d["id"]: d for d in records.get("documents", [])}
    review = load(root / "ci/content-review.json", {}).get("articles", {})
    sitemap = {}
    if (public / "sitemap.xml").is_file():
        for entry in ET.fromstring((public / "sitemap.xml").read_text()):
            fields = {e.tag.rsplit("}", 1)[-1]: e.text for e in entry}
            sitemap[fields.get("loc")] = fields.get("lastmod") or ""
    values = defaultdict(list)
    details = defaultdict(list)

    def record(key, ok, name):
        values[key].append(bool(ok))
        if not ok:
            details[key].append(name)

    for d in docs:
        name = d["source"]["path"]
        url = d["url"]
        meta, body = parse_metadata(d["raw"])
        page = output_file(public, base, url)
        soup = BeautifulSoup(
            page.read_text() if page and page.is_file() else "", "html.parser"
        )
        main = soup.select_one("[data-pagefind-body]")
        record(
            "static_body",
            main
            and len(main.get_text(" ", strip=True)) > 50
            and len(main.select("h1")) == 1,
            name,
        )
        canon = soup.find("link", rel="canonical")
        robots = soup.find("meta", attrs={"name": "robots"})
        record(
            "canonical",
            canon
            and canon.get("href") == url
            and not (robots and "noindex" in robots.get("content", "").lower()),
            name,
        )
        record("sitemap", url in sitemap, name)
        if meta.get("modified"):
            record(
                "lastmod", sitemap.get(url, "")[:10] == str(meta["modified"])[:10], name
            )
        source = d["source"]
        record(
            "source",
            source.get("revision")
            and source.get("url")
            and source.get("sha256") == sha(d["raw"].encode()),
            name,
        )
        record(
            "review",
            review.get(name, {}).get("file_sha256") == sha(d["raw"].encode())
            and bool(d.get("basis")),
            name,
        )
        schema = []
        for script in soup.find_all("script", type="application/ld+json"):
            try:
                j = json.loads(script.string or script.get_text())
                schema.extend(j.get("@graph", [j]) if isinstance(j, dict) else j)
            except (TypeError, ValueError):
                pass
        matching = [
            s
            for s in schema
            if isinstance(s, dict)
            and s.get("@type") in ("TechArticle", "CollectionPage", "WebPage")
            and s.get("url") == url
            and s.get("name") == d["title"]
        ]
        record(
            "schema",
            matching
            and (
                not meta.get("modified")
                or matching[0].get("dateModified", "")[:10]
                == str(meta["modified"])[:10]
            ),
            name,
        )
        footer = soup.select_one(".docs-page-tools")
        record(
            "attribution",
            footer
            and bool(d.get("authors"))
            and all(a in footer.get_text() for a in d["authors"])
            and str(meta.get("modified", "")) in footer.get_text()
            and bool(footer.select_one("a[data-docs-source]")),
            name,
        )
        description = soup.find("meta", attrs={"name": "description"})
        record(
            "descriptions",
            description
            and len(description.get("content", "").strip()) >= 15
            and main
            and len(body.strip()) > 50,
            name,
        )
        m = manifest.get(d["id"], {})
        md_file = output_file(public, base, m.get("markdown_url", ""))
        md = md_file.read_text() if md_file and md_file.is_file() else ""
        record(
            "markdown",
            md.startswith("# ") and m.get("markdown_sha256") == sha(md.encode()),
            name,
        )
        alternate = soup.find(
            "link", attrs={"rel": "alternate", "type": "text/markdown"}
        )
        desc = soup.find("link", rel="describedby")
        record(
            "discovery",
            alternate
            and urljoin(url, alternate.get("href", "")) == m.get("markdown_url")
            and desc
            and urljoin(url, desc.get("href", "")) == urljoin(base, "llms.txt"),
            name,
        )
        record(
            "manifest",
            records.get("corpus_revision") == corpus["revision"]
            and m.get("source") == source
            and bool(m.get("sections"))
            and m.get("html_url") == url,
            name,
        )
        # Hugo/Chroma line-number columns are UI, not authored code.
        codes = [
            pre.get_text().strip()
            for pre in (main.find_all("pre") if main else [])
            if not pre.select(".lnt") or pre.find("code", attrs={"data-lang": True})
        ]
        # Export escaping is allowed outside fences; code must remain byte-for-byte.
        headings = [
            h.get_text(" ", strip=True).rstrip("#").strip()
            for h in (main.select("h2,h3,h4,h5,h6") if main else [])
            if not h.find_parent(attrs={"data-pagefind-ignore": True})
        ]
        plainmd = re.sub(r"\\([_*\[\]])", r"\1", md)
        record(
            "fidelity",
            bool(md)
            and all(c in fenced_code_blocks(md) for c in codes)
            and all(h in plainmd for h in headings),
            name,
        )
        if name in TASKS:
            card = soup.select_one("[data-task-summary]")
            task = meta.get("task", {})
            record(
                "taskcards",
                card
                and all(
                    isinstance(task.get(k), str)
                    and task[k] in card.get_text(" ", strip=True)
                    for k in FIELDS
                ),
                name,
            )
    index = (public / "llms.txt").read_text() if (public / "llms.txt").exists() else ""
    md_links = re.findall(r"\]\((https?://[^)]+\.md)\)", index)
    record(
        "index",
        len(index.encode()) <= 12288
        and bool(re.search(r"^> ", index, re.M))
        and bool(re.search(r"^## ", index, re.M))
        and len(md_links) >= 8,
        "llms.txt",
    )
    # Read known generated redirect, not the presence of an alias in source alone.
    old = public / "products/siteclaw/index.html"
    target = urljoin(base, "products/sorti/")
    redirect = BeautifulSoup(old.read_text() if old.is_file() else "", "html.parser")
    alias = redirect.find("link", rel="canonical")
    rename = next(
        (
            d
            for d in docs
            if d["source"]["path"] == "articles/sorti/siteclaw-to-sorti.md"
        ),
        {},
    )
    record(
        "rename",
        bool(rename)
        and "SiteClaw" in rename.get("raw", "")
        and "Sorti" in rename.get("raw", "")
        and alias
        and alias.get("href") == target,
        "SiteClaw rename and redirect",
    )
    r = load(retrieval, {}) if retrieval else {}
    # Evaluator labels its corpus revision; never reuse a green result from another corpus.
    r_revision = r.get("revision", r.get("corpus_revision"))
    record(
        "retrieval",
        r.get("passed")
        and r_revision == corpus["revision"]
        and r.get("cases", 0) >= 10,
        "fresh curated evaluator report",
    )
    checks = []
    for key, (group, weight, title) in RUBRIC.items():
        total = len(values[key])
        n = sum(values[key])
        ratio = n / total if total else 0
        checks.append(
            {
                "id": key,
                "category": group,
                "label": title,
                "possible": weight,
                "earned": round(weight * ratio, 4),
                "passed": n,
                "checked": total,
                "status": "pass"
                if total and n == total
                else "partial"
                if n
                else "fail",
                "failure_examples": details[key][:8],
            }
        )
    probes = load(live, []) if live else []
    delivery_ok = bool(probes) and all(p.get("status") == 200 for p in probes)
    checks.extend(
        [
            {
                "id": "public_delivery",
                "category": "Live validation",
                "label": "Public HTML, robots and discovery endpoints reachable",
                "possible": 5,
                "earned": 5 if delivery_ok else 0,
                "status": "pass" if delivery_ok else "fail" if probes else "unassessed",
            },
            {
                "id": "search_inclusion",
                "category": "Live validation",
                "label": "Actual crawl/index and external AI citation measurement",
                "possible": 5,
                "earned": 0,
                "status": "unassessed",
            },
        ]
    )
    totals = defaultdict(lambda: {"earned": 0, "possible": 0})
    for c in checks:
        totals[c["category"]]["earned"] += c["earned"]
        totals[c["category"]]["possible"] += c["possible"]
    return {
        "rubric": "sitebay-documentation-llm-readiness-v1",
        "not_a_ranking_score": True,
        "scope": "Built documentation and bounded lexical retrieval; no causal claim about AI search ranking.",
        "corpus_revision": corpus["revision"],
        "documents": len(docs),
        "verified_points": round(sum(c["earned"] for c in checks), 1),
        "possible_points": 100,
        "local_verified_points": round(
            sum(c["earned"] for c in checks if c["category"] != "Live validation"), 1
        ),
        "local_possible_points": 90,
        "unassessed_points": sum(
            c["possible"] for c in checks if c["status"] == "unassessed"
        ),
        "categories": dict(totals),
        "checks": checks,
        "live_probe": probes,
    }


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--public-dir", type=Path, default=ROOT / "public")
    p.add_argument("--root", type=Path, default=ROOT)
    p.add_argument("--retrieval-report", type=Path)
    p.add_argument("--live-report", type=Path)
    p.add_argument("--report", type=Path, required=True)
    p.add_argument("--check", action="store_true")
    a = p.parse_args()
    r = audit(a.root, a.public_dir, a.retrieval_report, a.live_report)
    a.report.parent.mkdir(parents=True, exist_ok=True)
    a.report.write_text(json.dumps(r, indent=2) + "\n")
    print(
        json.dumps(
            {
                k: r[k]
                for k in [
                    "verified_points",
                    "possible_points",
                    "local_verified_points",
                    "local_possible_points",
                    "unassessed_points",
                    "documents",
                ]
            }
        )
    )
    for c in r["checks"]:
        if c["status"] not in ("pass", "unassessed"):
            print(
                c["id"],
                c.get("passed"),
                c.get("checked"),
                c.get("failure_examples", []),
            )
    return int(
        a.check
        and any(
            c["status"] != "pass"
            for c in r["checks"]
            if c["category"] != "Live validation"
        )
    )


if __name__ == "__main__":
    raise SystemExit(main())
