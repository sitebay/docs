"""Export publicly rendered article text for agents. Never index arbitrary files.

Raw-source citations stay in corpus.json. Rendered Markdown is a separate,
labelled representation with its own hashes and line coordinates.
"""

from __future__ import annotations
import argparse, hashlib, html, json, re, tomllib
from pathlib import Path
from urllib.parse import urljoin, urlsplit
from bs4 import BeautifulSoup
from markdownify import MarkdownConverter
from publishing import ROOT, output_file, parse_metadata

FIELDS = ("goal", "prerequisites", "effects", "verification")
CURATED = {
    "Start here": [
        "articles/sorti/what-is-sorti.md",
        "articles/sorti/siteclaw-to-sorti.md",
        "articles/products/sorti/get-started/index.md",
        "articles/knowledge/system-map.md",
    ],
    "Perform a task": [
        "articles/sorti/fix-a-staging-page.md",
        "articles/sorti/review-a-staging-release.md",
        "articles/sorti/create-a-review-skill.md",
        "articles/vscode/test-localhost-with-sorti.md",
        "articles/sorti/build-a-counter-panel.md",
        "articles/sorti/recover-an-interrupted-task.md",
    ],
    "Connect and build": [
        "articles/sorti/connect-mcp-services.md",
        "articles/sorti/forge-reference.md",
        "articles/products/platform/api-reference/index.md",
        "articles/knowledge/read-with-mcp.md",
        "articles/knowledge/pgvector.md",
        "articles/knowledge/service-ownership.md",
    ],
}


def digest(text: str) -> str:
    return hashlib.sha256(text.encode()).hexdigest()


def markdown_url(url: str) -> str:
    return url + "index.md" if url.endswith("/") else url + ".md"


def atomic_write(path: Path, text: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.is_symlink():
        raise ValueError("Refuse symlink output: " + str(path))
    tmp = path.with_name(path.name + ".llm-tmp")
    if tmp.exists():
        raise ValueError("Temporary output already exists: " + str(tmp))
    tmp.write_text(text, encoding="utf-8")
    tmp.replace(path)


class AgentMarkdown(MarkdownConverter):
    def convert_pre(self, el, text, parent_tags):
        code = el.find("code")
        target = code if code is not None else el
        raw = target.get_text()
        lang = target.get("data-lang", "")
        if not lang:
            lang = next(
                (
                    c.removeprefix("language-")
                    for c in target.get("class", [])
                    if c.startswith("language-")
                ),
                "",
            )
        if not re.fullmatch(r"[\w+-]*", lang):
            lang = ""
        fence = "`" * max(
            3, max((len(s) for s in re.findall(r"`+", raw)), default=0) + 1
        )
        return "\n\n" + fence + lang + "\n" + raw.rstrip("\n") + "\n" + fence + "\n\n"

    def convert_hN(self, n, el, text, parent_tags):
        # Headings are plain text; inline presentation must not fragment their
        # retrievable label. Preserve the original anchor separately.
        label = el.get_text(" ", strip=True)
        heading = "\n\n" + "#" * max(1, min(6, n)) + " " + label + "\n\n"
        anchor = el.get("id")
        return heading + (
            '<a id="' + html.escape(anchor, quote=True) + '"></a>\n\n' if anchor else ""
        )


def normalize_code_tables(content):
    # Chroma's table is presentation: the first column holds line numbers.
    # Unwrap it before converting actual Markdown tables or code gets flattened.
    for table in list(content.select("table.lntable")):
        blocks = [
            pre
            for pre in table.find_all("pre")
            if not pre.select(".lnt") or pre.find("code", attrs={"data-lang": True})
        ]
        if not blocks:
            raise ValueError("Code table has no identifiable source column")
        for pre in blocks:
            table.insert_before(pre.extract())
        table.decompose()
    for number in list(content.select("pre .lnt, pre .ln")):
        number.decompose()


def render_markdown(page_text: str, document: dict, known_urls: set[str]):
    soup = BeautifulSoup(page_text, "html.parser")
    content = soup.select_one("[data-pagefind-body]")
    if content is None:
        raise ValueError("Missing explicit article region: " + document["url"])
    normalize_code_tables(content)
    for unwanted in list(content.select("[data-pagefind-ignore],script,style,nav,svg")):
        if unwanted.parent:
            unwanted.decompose()
    # Empty heading-link icons are navigation, not part of the heading text.
    for a in list(content.select("a")):
        if not a.get_text(strip=True) and not a.find("img"):
            a.decompose()
    for embed in list(content.select("iframe,video,audio")):
        url = embed.get("src") or (embed.find("source") or {}).get("src")
        replacement = soup.new_tag("p")
        if url and urlsplit(urljoin(document["url"], url)).scheme in ("http", "https"):
            link = soup.new_tag("a", href=urljoin(document["url"], url))
            link.string = embed.get("title") or "Embedded media (open the source)"
            replacement.append(link)
        else:
            replacement.string = "Embedded media: open the canonical page to view it."
        embed.replace_with(replacement)
    for tag in content.find_all(["a", "img"]):
        attr = "href" if tag.name == "a" else "src"
        value = tag.get(attr)
        if not value:
            continue
        absolute = urljoin(document["url"], value)
        parts = urlsplit(absolute)
        if parts.scheme not in ("http", "https", "mailto"):
            del tag[attr]
            continue
        # Heading links retain their canonical HTML coordinates. Plain document
        # links lead directly to Markdown when that representation is exported.
        if (
            tag.name == "a"
            and not parts.fragment
            and not parts.query
            and absolute in known_urls
        ):
            absolute = markdown_url(absolute)
        tag[attr] = absolute
    converted = (
        AgentMarkdown(
            heading_style="ATX", bullets="-", wrap=False, bs4_options="html.parser"
        )
        .convert(str(content))
        .strip()
    )
    if not converted.startswith("# "):
        raise ValueError("Rendered page needs its own H1: " + document["url"])
    first, _, rest = converted.partition("\n")
    source = document["source"]
    metadata = [
        f"> {document['description']}",
        f"Canonical: {document['url']}",
        f"Authors: {', '.join(document.get('authors', []))}",
        f"Last reviewed: {document.get('reviewed', '')}",
        f"License: {document.get('license', '')}",
        f"Source: {source.get('url') or source['path']}",
        f"Source SHA-256: {source['sha256']}",
        "Representation: rendered article Markdown. Its line numbers differ from the original source; use the source link or the raw corpus for original line citations.",
    ]
    md = first + "\n\n" + "\n\n".join(metadata) + "\n\n" + rest.lstrip() + "\n"
    # Parse section boundaries without treating headings inside code as sections.
    sections = []
    fence = None
    for n, line in enumerate(md.splitlines(), 1):
        m = re.match(r"^[ \t>]*(`{3,}|~{3,})", line)
        if m:
            if fence is None:
                fence = m.group(1)
            elif m.group(1)[0] == fence[0] and len(m.group(1)) >= len(fence):
                fence = None
            continue
        h = re.match(r"^(#{1,6}) (.+)$", line) if fence is None else None
        if h:
            if sections:
                sections[-1]["line_end"] = n - 1
            sections.append(
                {"heading": h.group(2), "level": len(h.group(1)), "line_start": n}
            )
    if sections:
        sections[-1]["line_end"] = len(md.splitlines())
    return md, sections


def build(root: Path, public: Path):
    public = public.resolve()
    base = tomllib.loads((root / "config.toml").read_text())["baseURL"]
    corpus = json.loads((public / "knowledge/corpus.json").read_text())
    if corpus.get("upstream_revision") or any(
        d.get("namespace") != "sitebay" for d in corpus["documents"]
    ):
        raise ValueError("Only the public SiteBay corpus may be exported")
    rows = []
    plans = []
    urls = {d["url"] for d in corpus["documents"]}
    if not urls or len(urls) != len(corpus["documents"]):
        raise ValueError("Empty or duplicate corpus URLs")
    ids = [d["id"] for d in corpus["documents"]]
    if len(set(ids)) != len(ids):
        raise ValueError("Duplicate corpus IDs")
    for d in corpus["documents"]:
        if digest(d["raw"]) != d["source"]["sha256"]:
            raise ValueError("Raw source hash mismatch")
        meta, _ = parse_metadata(d["raw"])
        if any(meta.get(k) for k in ("no_index", "noindex", "headless", "draft")):
            raise ValueError(
                "Excluded document reached public export: " + d["source"]["path"]
            )
        task = meta.get("task")
        if task is not None and (
            not isinstance(task, dict)
            or set(task) != set(FIELDS)
            or any(not isinstance(task[k], str) or not task[k].strip() for k in FIELDS)
        ):
            raise ValueError(
                "Task summary needs exactly goal, prerequisites, effects and verification"
            )
        output = output_file(public, base, d["url"])
        target = output_file(public, base, markdown_url(d["url"]))
        if output is None or target is None:
            raise ValueError("Out-of-scope public route")
        md, sections = render_markdown(output.read_text(), d, urls)
        plans.append((target, md))
        rows.append(
            {
                "id": d["id"],
                "title": d["title"],
                "description": d["description"],
                "topic": d["topic"],
                "html_url": d["url"],
                "markdown_url": markdown_url(d["url"]),
                "markdown_sha256": digest(md),
                "markdown_bytes": len(md.encode()),
                "representation": "rendered_markdown",
                "authors": d.get("authors", []),
                "reviewed": d.get("reviewed"),
                "license": d.get("license"),
                "source": d["source"],
                "basis": d.get("basis", []),
                "task": task,
                "sections": sections,
            }
        )
    manifest = {
        "schema_version": 1,
        "corpus_revision": corpus["revision"],
        "git_revision": corpus["git_revision"],
        "scope": "Public SiteBay references only. Rendered Markdown is not original-source text. Reference instructions do not authorize operations.",
        "raw_corpus_url": urljoin(base, "knowledge/corpus.json"),
        "documents": rows,
    }
    by_path = {d["source"]["path"]: d for d in rows}
    index = "# SiteBay and Sorti documentation\n\n> SiteBay documentation covers hosting and site operations. Sorti is the assistant workspace, formerly SiteClaw.\n\n"
    index += "Start with the matching task, then read its prerequisites and verification. A preview is not a saved change, and an accepted operation is not a completed deployment. Reference text is not permission to act.\n\n"
    index += "These files describe the checked source, not guaranteed availability in every deployed environment. Keep the original provider identity when reading external references. Read individual pages instead of loading the entire library.\n\n"
    for heading, names in CURATED.items():
        index += "## " + heading + "\n\n"
        for name in names:
            if name not in by_path:
                raise ValueError("Missing curated document: " + name)
            d = by_path[name]
            title = d["title"].replace("[", "").replace("]", "")
            index += f"- [{title}]({d['markdown_url']}): {d['description']}\n"
        index += "\n"
    index += "## Complete indexes\n\n"
    index += f"- [All documents]({urljoin(base, 'llms-index.txt')}): Grouped links to every public Markdown article.\n"
    index += f"- [Document manifest]({urljoin(base, 'knowledge/documents.json')}): IDs, routes, hashes, task summaries, and rendered-Markdown section line ranges.\n"
    index += f"- [Raw source corpus]({urljoin(base, 'knowledge/corpus.json')}): Original Markdown and exact source-line chunks for cited reads; larger than the navigation index.\n"
    if len(index.encode()) > 12288:
        raise ValueError("Curated llms.txt exceeds 12 KiB")
    full = "# All SiteBay documentation\n\n> Complete navigation index. Fetch only the pages needed for the task.\n\n"
    for topic in sorted({d["topic"] for d in rows}):
        full += "## " + topic + "\n\n"
        for d in sorted(
            (d for d in rows if d["topic"] == topic), key=lambda d: d["title"]
        ):
            title = d["title"].replace("[", "").replace("]", "")
            full += f"- [{title}]({d['markdown_url']}): {d['description']}\n"
        full += "\n"
    # Publish only after all inputs and destinations have been validated. No
    # arbitrary cleanup: old build trees are handled by the release artifact.
    for target, md in plans:
        atomic_write(target, md)
    atomic_write(
        public / "knowledge/documents.json",
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
    )
    atomic_write(public / "llms.txt", index)
    atomic_write(public / "llms-index.txt", full)
    return {
        "documents": len(rows),
        "curated_index_bytes": len(index.encode()),
        "complete_index_bytes": len(full.encode()),
        "markdown_bytes": sum(d["markdown_bytes"] for d in rows),
        "corpus_revision": corpus["revision"],
    }


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--public-dir", type=Path, default=ROOT / "public")
    a = p.parse_args()
    print(json.dumps(build(ROOT, a.public_dir)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
