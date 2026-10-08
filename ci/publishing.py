"""Validate the real Hugo content tree and rendered output, never guessed routes.

No network requests or repository mutations are performed. A Hugo build and its
page inventory are required so empty/misconfigured source scans cannot pass.
"""
from __future__ import annotations

import argparse
import csv
import json
import os
import re
import subprocess
import sys
import tomllib
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

import yaml

ROOT = Path(__file__).resolve().parents[1]
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}


@dataclass(frozen=True, order=True)
class Issue:
    source: str
    target: str
    reason: str


class PageHTML(HTMLParser):
    """Collect authored prose links; also retain all IDs for fragment checks."""
    def __init__(self, text: str):
        super().__init__(convert_charrefs=True)
        self.stack: list[tuple[str, bool]] = []
        self.ids: set[str] = set()
        self.links: set[str] = set()
        self.canonical = ""
        self.redirect = False
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if tag == "a" and attrs.get("name"):
            self.ids.add(attrs["name"])
        in_prose = (self.stack[-1][1] if self.stack else False) or "prose" in (attrs.get("class") or "").split()
        if tag == "a" and in_prose and attrs.get("href"):
            self.links.add(attrs["href"])
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href", "")
        if tag == "meta" and (attrs.get("http-equiv") or "").lower() == "refresh":
            self.redirect = True
        if tag not in VOID:
            self.stack.append((tag, in_prose))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]
                return


def inventory(root: Path, hugo: str) -> list[dict[str, str]]:
    result = subprocess.run([hugo, "list", "all"], cwd=root, text=True, capture_output=True, check=True)
    rows = list(csv.DictReader(result.stdout.splitlines()))
    if not rows or not {"path", "permalink", "kind"} <= rows[0].keys():
        raise ValueError("Hugo produced no valid page inventory")
    return rows


def output_file(public: Path, base_url: str, url: str) -> Path | None:
    base, target = urlsplit(base_url), urlsplit(url)
    if target.scheme not in ("http", "https") or target.netloc != base.netloc:
        return None
    prefix = base.path.rstrip("/") + "/"
    path = unquote(target.path)
    if path == prefix.rstrip("/"):
        path += "/"
    if not path.startswith(prefix):
        return None
    relative = path[len(prefix):]
    file = (public / relative).resolve()
    if not file.is_relative_to(public.resolve()):
        raise ValueError("URL escapes the publishing directory")
    if path.endswith("/") or file.is_dir():
        file /= "index.html"
    return file


def parse_metadata(text: str) -> tuple[dict, str]:
    """Hugo accepts both YAML and TOML; headless snippets need no page title."""
    first_line, _, remainder = text.partition("\n")
    marker = first_line.strip()
    if marker not in ("---", "+++"):
        # Hugo permits content without explicit metadata (for example indexes).
        return {}, text
    closing = re.search(r"(?m)^" + re.escape(marker) + r"[ \t]*$", remainder)
    if not closing:
        raise ValueError("unterminated front matter")
    header = remainder[:closing.start()]
    body = remainder[closing.end():].lstrip("\n")
    metadata = yaml.safe_load(header) if marker == "---" else tomllib.loads(header)
    if not isinstance(metadata, dict):
        raise ValueError("front matter must be a mapping")
    return metadata, body



def source_issues(root: Path) -> tuple[list[Issue], int]:
    issues: list[Issue] = []
    files = sorted((root / "articles").rglob("*.md"))
    if not files:
        return [Issue("articles/", "", "no Markdown sources discovered")], 0
    for path in files:
        source = path.relative_to(root).as_posix()
        text = path.read_text(encoding="utf-8")
        if path.name == "_index.md" and path.with_name("index.md").is_file():
            issues.append(Issue(source, "index.md", "ambiguous section and leaf bundle in the same directory"))
        try:
            metadata, _ = parse_metadata(text)
            headless = metadata.get("headless") is True
            cascade = metadata.get("cascade", {})
            if isinstance(cascade, dict):
                headless = headless or cascade.get("_build", {}).get("render") in (False, "never")
            if metadata and not headless and (not isinstance(metadata.get("title"), str) or not metadata["title"].strip()):
                issues.append(Issue(source, "title", "missing nonempty title"))
        except (ValueError, yaml.YAMLError) as error:
            issues.append(Issue(source, "frontmatter", str(error)))
        for match in re.finditer(r'(?:\]\(|href=["\'])/articles/[^\s)"\']*', text):
            issues.append(Issue(source, match.group(0), "source directory used as public URL"))
    generator = root / "ci/scripts/sync-forge-reference.mjs"
    if generator.is_file() and "](/articles/" in generator.read_text():
        issues.append(Issue(generator.relative_to(root).as_posix(), "/articles/", "generator reintroduces invalid public URLs"))
    for path in (root / "docs").rglob("*.md"):
        issues.append(Issue(path.relative_to(root).as_posix(), "articles/", "Markdown outside Hugo's content mount"))
    return issues, len(files)


def expected_issues(root: Path, rows: list[dict[str, str]]) -> list[Issue]:
    expected = json.loads((root / "ci/expected-pages.json").read_text())
    if not expected:
        return [Issue("ci/expected-pages.json", "", "expected page inventory must not be empty")]
    actual = {row["path"]: row for row in rows}
    issues = []
    for source, expected_url in expected.items():
        row = actual.get(source)
        if row is None:
            issues.append(Issue(source, expected_url, "expected page not published; check leaf versus branch bundle"))
        elif urlsplit(row["permalink"]).path != expected_url:
            issues.append(Issue(source, row["permalink"], f"expected canonical route {expected_url}"))
    return issues


def rendered_issues(root: Path, public: Path, rows: list[dict[str, str]], base_url: str) -> tuple[list[Issue], int]:
    if not (public / "index.html").is_file():
        return [Issue(str(public), "index.html", "missing built site; run Hugo first")], 0
    issues, checked = [], 0
    cache: dict[Path, PageHTML] = {}
    def load(path: Path) -> PageHTML:
        if path not in cache:
            cache[path] = PageHTML(path.read_text(encoding="utf-8"))
        return cache[path]
    for row in rows:
        if not row["path"].startswith("articles/"):
            continue
        source_url = row["permalink"]
        source_file = output_file(public, base_url, source_url)
        if source_file is None or not source_file.is_file():
            issues.append(Issue(row["path"], source_url, "inventoried page has no rendered output"))
            continue
        parsed = load(source_file)
        for href in sorted(parsed.links):
            target_url = urljoin(source_url, href)
            target = output_file(public, base_url, target_url)
            if target is None:
                if urlsplit(target_url).path.startswith("/articles/"):
                    issues.append(Issue(row["path"], href, "source directory used as public URL"))
                continue
            checked += 1
            if not target.is_file():
                issues.append(Issue(row["path"], href, "rendered internal link target does not exist"))
                continue
            fragment = unquote(urlsplit(target_url).fragment)
            if fragment and target.suffix == ".html":
                linked = load(target)
                if linked.redirect and linked.canonical:
                    canonical = output_file(public, base_url, linked.canonical)
                    if canonical and canonical.is_file():
                        linked = load(canonical)
                if fragment not in linked.ids:
                    issues.append(Issue(row["path"], href, "rendered fragment does not exist"))
    return issues, checked


def search_issues(root: Path, public: Path, rows: list[dict[str, str]]) -> list[Issue]:
    expected = json.loads((root / "ci/expected-pages.json").read_text())
    index = public / "index.json"
    if not index.is_file():
        return [Issue("index.json", "", "missing generated search index")]
    records = json.loads(index.read_text())
    if not isinstance(records, list) or not records:
        return [Issue("index.json", "", "search index must contain page records")]
    api_index = public / "api/index.json"
    if api_index.is_file():
        api_records = json.loads(api_index.read_text())
        if not isinstance(api_records, list):
            return [Issue("api/index.json", "", "API search index must be a list")]
        records += api_records
    hrefs = {record.get("href") for record in records}
    # All authored regular pages are covered, not just the original repair set.
    for row in rows:
        source_file = root / row["path"]
        if row["path"].startswith("articles/") and row.get("kind") == "page" and source_file.is_file():
            metadata, _ = parse_metadata(source_file.read_text())
            if metadata.get("doc_sources") and not metadata.get("headless") and not metadata.get("deprecated"):
                expected[row["path"]] = urlsplit(row["permalink"]).path
    published = {row["path"]: row for row in rows}
    issues = []
    for source, url in expected.items():
        if published.get(source, {}).get("kind") == "page" and url not in hrefs:
            issues.append(Issue(source, url, "published page missing from generated search index"))
    return issues


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--public-dir", type=Path, default=ROOT / "public")
    parser.add_argument("--hugo", default=os.environ.get("HUGO_BIN", "hugo"))
    parser.add_argument("--report", type=Path)
    parser.add_argument("--source-only", action="store_true")
    args = parser.parse_args(argv)
    try:
        issues, count = source_issues(ROOT)
        rows, checked = [], 0
        if not args.source_only:
            rows = inventory(ROOT, args.hugo)
            issues += expected_issues(ROOT, rows)
            import tomllib
            config = tomllib.loads((ROOT / "config.toml").read_text())
            rendered, checked = rendered_issues(ROOT, args.public_dir.resolve(), rows, config["baseURL"])
            issues += rendered
            issues += search_issues(ROOT, args.public_dir.resolve(), rows)
        issues = sorted(set(issues))
        data = {"source_files": count, "inventory_pages": len(rows), "checked_internal_links": checked,
                "issues": [vars(issue) for issue in issues]}
        if args.report:
            args.report.parent.mkdir(parents=True, exist_ok=True)
            args.report.write_text(json.dumps(data, indent=2) + "\n")
        print(f"Sources: {count}; inventoried pages: {len(rows)}; internal prose links checked: {checked}; issues: {len(issues)}")
        for issue in issues:
            print(f"{issue.source}: {issue.reason}: {issue.target}")
        return 1 if issues else 0
    except (OSError, ValueError, subprocess.CalledProcessError) as error:
        print(f"Publishing validation failed: {error}", file=sys.stderr)
        if isinstance(error, subprocess.CalledProcessError):
            print(error.stdout + error.stderr, file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
