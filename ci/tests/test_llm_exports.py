"""Keep agent exports faithful to rendered articles and original source identity."""

import copy
import hashlib
import html
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import llm_export as ex
from llm_readiness import audit, fenced_code_blocks

BASE = "https://example.test/docs/"


def document():
    raw = "---\ntitle: Fixture\nauthors: [SiteBay]\nmodified: 2026-10-08\n---\n\nA small reference.\n"
    return {
        "id": "sitebay:fixture",
        "namespace": "sitebay",
        "title": "Fixture",
        "description": "A small reference for testing.",
        "topic": "sorti",
        "url": BASE + "fixture/",
        "raw": raw,
        "authors": ["SiteBay"],
        "license": "CC BY 4.0",
        "reviewed": "2026-10-08",
        "basis": ["test"],
        "source": {
            "path": "articles/fixture.md",
            "revision": "a" * 40,
            "url": "https://github.com/sitebay/docs/blob/"
            + "a" * 40
            + "/articles/fixture.md",
            "sha256": ex.digest(raw),
        },
    }


def wrap(body):
    return (
        "<html><nav>Chrome only</nav><section data-pagefind-body><h1>Fixture</h1>"
        + body
        + "</section><footer>Footer only</footer></html>"
    )


class MarkdownTests(unittest.TestCase):
    def render(self, body):
        return ex.render_markdown(
            wrap(body), document(), {BASE + "fixture/", BASE + "other/"}
        )

    def test_excludes_navigation_scripts_but_keeps_warning(self):
        md, _ = self.render(
            '<nav>Inner navigation</nav><script>alert("bad")</script><p>Do not publish a preview.</p><p data-pagefind-ignore>UI control</p>'
        )
        self.assertIn("Do not publish a preview.", md)
        for text in (
            "Chrome only",
            "Inner navigation",
            "alert(",
            "Footer only",
            "UI control",
        ):
            self.assertNotIn(text, md)

    def test_chroma_line_numbers_never_flatten_source_into_a_table(self):
        code = "---\nname: task\n---\n\n# Step\nUse this skill.\n"
        md, sections = self.render(
            '<table class="lntable"><tr><td><pre><code><span class="lnt">1\n2\n3</span></code></pre></td><td><pre><code data-lang="markdown">'
            + html.escape(code)
            + "</code></pre></td></tr></table>"
        )
        self.assertIn("```markdown\n" + code + "```", md)
        self.assertNotIn("| --- |", md)
        self.assertEqual([s["heading"] for s in sections], ["Fixture"])

    def test_nested_fences_are_preserved_and_not_counted_as_sections(self):
        code = '```json\n{"value": 1}\n```\n# Code heading\n'
        md, sections = self.render(
            '<pre><code data-lang="markdown">'
            + html.escape(code)
            + '</code></pre><h2 id="next">Next</h2><p>Read on.</p>'
        )
        self.assertIn("````markdown\n" + code + "````", md)
        self.assertEqual([s["heading"] for s in sections], ["Fixture", "Next"])
        self.assertIn('<a id="next"></a>', md)
        for section in sections:
            self.assertTrue(md.splitlines()[section["line_start"] - 1].startswith("#"))

    def test_nested_list_code_retains_its_own_indentation(self):
        code = "if (ready) {\n  run();\n}\n"
        md, _ = self.render(
            '<ol><li>Execute:<pre><code data-lang="js">'
            + html.escape(code)
            + "</code></pre></li></ol>"
        )
        self.assertIn(code.strip(), fenced_code_blocks(md))

    def test_real_tables_and_absolute_links_remain(self):
        md, _ = self.render(
            '<h2 id="table">Table</h2><table><tr><th>Field</th><th>Effect</th></tr><tr><td>confirm</td><td>Approval</td></tr></table><a href="../other/">Other</a><a href="#table">Jump</a><img src="pic.png" alt="Example">'
        )
        self.assertIn("| Field | Effect |", md)
        self.assertIn(BASE + "other/index.md", md)
        self.assertIn(BASE + "fixture/#table", md)
        self.assertIn(BASE + "fixture/pic.png", md)

    def test_media_is_identified_not_transcribed_or_fetched(self):
        md, _ = self.render(
            '<iframe src="https://media.example.test/video" title="Demo"></iframe>'
        )
        self.assertIn("[Demo](https://media.example.test/video)", md)

    def test_missing_explicit_content_region_fails(self):
        with self.assertRaisesRegex(ValueError, "Missing explicit"):
            ex.render_markdown("<h1>Wrong</h1>", document(), set())

    def test_source_and_rendered_coordinates_are_distinguished(self):
        md, _ = self.render("<p>A small reference.</p>")
        self.assertIn(document()["source"]["url"], md)
        self.assertIn("line numbers differ", md)
        self.assertIn(document()["source"]["sha256"], md)


class ExportTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.public = self.root / "public"
        (self.public / "knowledge").mkdir(parents=True)
        (self.root / "config.toml").write_text('baseURL = "' + BASE + '"\n')
        (self.root / "ci").mkdir()
        (self.root / "ci/content-review.json").write_text('{"articles":{}}')
        self.doc = document()
        self.corpus = {
            "revision": "b" * 64,
            "git_revision": "a" * 40,
            "upstream_revision": None,
            "documents": [self.doc],
        }
        self.save()
        folder = self.public / "fixture"
        folder.mkdir()
        (folder / "index.html").write_text(
            wrap('<p>A small reference.</p><h2 id="check">Check</h2><p>Verify it.</p>')
        )
        self.p = patch.object(ex, "CURATED", {"Docs": ["articles/fixture.md"]})
        self.p.start()
        self.addCleanup(self.p.stop)

    def save(self):
        (self.public / "knowledge/corpus.json").write_text(json.dumps(self.corpus))

    def test_deterministic_build_and_manifest_line_hashes(self):
        ex.build(self.root, self.public)
        before = {str(p): p.read_bytes() for p in self.public.rglob("*") if p.is_file()}
        ex.build(self.root, self.public)
        self.assertEqual(
            before,
            {str(p): p.read_bytes() for p in self.public.rglob("*") if p.is_file()},
        )
        m = json.loads((self.public / "knowledge/documents.json").read_text())
        d = m["documents"][0]
        md = (self.public / "fixture/index.md").read_bytes()
        self.assertEqual(d["source"], self.doc["source"])
        self.assertEqual(d["markdown_sha256"], hashlib.sha256(md).hexdigest())
        self.assertEqual(m["corpus_revision"], self.corpus["revision"])
        self.assertIn(BASE + "fixture/index.md", (self.public / "llms.txt").read_text())

    def test_rejects_external_library_without_writing(self):
        self.doc["namespace"] = "linode"
        self.save()
        with self.assertRaisesRegex(ValueError, "public SiteBay"):
            ex.build(self.root, self.public)
        self.assertFalse((self.public / "fixture/index.md").exists())

    def test_rejects_noindex_source(self):
        self.doc["raw"] = self.doc["raw"].replace(
            "title: Fixture", "title: Fixture\nno_index: true"
        )
        self.doc["source"]["sha256"] = ex.digest(self.doc["raw"])
        self.save()
        with self.assertRaisesRegex(ValueError, "Excluded"):
            ex.build(self.root, self.public)

    def test_rejects_tampered_raw_hash(self):
        self.doc["raw"] += "tampered"
        self.save()
        with self.assertRaisesRegex(ValueError, "hash mismatch"):
            ex.build(self.root, self.public)

    def test_rejects_invalid_task_metadata(self):
        self.doc["raw"] = self.doc["raw"].replace(
            "title: Fixture", "title: Fixture\ntask:\n  goal: only one field"
        )
        self.doc["source"]["sha256"] = ex.digest(self.doc["raw"])
        self.save()
        with self.assertRaisesRegex(ValueError, "Task summary"):
            ex.build(self.root, self.public)

    def test_rejects_path_escape(self):
        self.doc["url"] = BASE + "%2e%2e/outside/"
        self.save()
        with self.assertRaisesRegex(ValueError, "escapes"):
            ex.build(self.root, self.public)

    def test_atomic_writer_refuses_symlink(self):
        target = self.root / "target"
        target.write_text("unchanged")
        link = self.public / "alias"
        link.symlink_to(target)
        with self.assertRaisesRegex(ValueError, "symlink"):
            ex.atomic_write(link, "changed")
        self.assertEqual(target.read_text(), "unchanged")

    def test_duplicate_ids_refused(self):
        d = copy.deepcopy(self.doc)
        d["url"] = BASE + "other/"
        self.corpus["documents"].append(d)
        self.save()
        with self.assertRaisesRegex(ValueError, "Duplicate corpus IDs"):
            ex.build(self.root, self.public)

    def test_score_does_not_credit_wrong_revision_or_unobserved_search(self):
        ex.build(self.root, self.public)
        r = self.root / "retrieval.json"
        r.write_text(
            json.dumps({"passed": True, "cases": 29, "corpus_revision": "wrong"})
        )
        result = audit(self.root, self.public, r)
        checks = {c["id"]: c for c in result["checks"]}
        self.assertEqual(checks["retrieval"]["earned"], 0)
        self.assertEqual(checks["search_inclusion"]["status"], "unassessed")
        self.assertEqual(result["unassessed_points"], 10)
        self.assertTrue(result["not_a_ranking_score"])
