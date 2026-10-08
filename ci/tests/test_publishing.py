import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from publishing import PageHTML, expected_issues, output_file, parse_metadata, rendered_issues, source_issues, search_issues
from editorial import canonical, collect

BASE = 'https://www.sitebay.org/docs/'


class PublishingTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.addCleanup(self.temp.cleanup)
        (self.root / 'articles').mkdir()
        (self.root / 'ci').mkdir()
        self.public = self.root / 'public'
        self.public.mkdir()
        (self.public / 'index.html').write_text('<h1>Docs</h1>')

    def article(self, text, name='test.md'):
        path = self.root / 'articles' / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text)
        return path

    def test_source_discovery_does_not_scan_generated_html(self):
        self.article('---\ntitle: Test\n---\nContent')
        (self.root / 'docs').mkdir()
        (self.root / 'docs/index.html').write_text('HTML, not Markdown')
        issues, count = source_issues(self.root)
        self.assertEqual((issues, count), ([], 1))

    def test_empty_source_tree_fails(self):
        self.assertTrue(source_issues(self.root)[0])

    def test_reject_bad_yaml(self):
        self.article('---\ntitle: [unfinished\n---\n')
        self.assertTrue(source_issues(self.root)[0])

    def test_toml_and_yaml_and_header_whitespace(self):
        for text in ['+++\ntitle = "Test"\n+++\nBody', '---  \ntitle: Test\n---  \nBody']:
            metadata, body = parse_metadata(text)
            self.assertEqual(metadata['title'], 'Test')
            self.assertEqual(body, 'Body')

    def test_hugo_optional_metadata_and_headless_snippets(self):
        self.assertEqual(parse_metadata('A section without metadata'), ({}, 'A section without metadata'))
        self.article('---\nheadless: true\n---\nA reusable snippet')
        self.assertFalse(source_issues(self.root)[0])

    def test_unterminated_metadata_fails(self):
        with self.assertRaises(ValueError):
            parse_metadata('---\ntitle: Test\n')

    def test_source_prefix_and_misplaced_markdown_fail(self):
        self.article('---\ntitle: Test\n---\n[bad](/articles/sorti/)')
        (self.root / 'docs').mkdir()
        (self.root / 'docs/misplaced.md').write_text('Misplaced source')
        self.assertEqual(len(source_issues(self.root)[0]), 2)

    def test_generator_cannot_restore_bad_prefix(self):
        self.article('---\ntitle: Test\n---\n')
        path = self.root / 'ci/scripts'
        path.mkdir()
        (path / 'sync-forge-reference.mjs').write_text('[bad](/articles/sorti/)')
        self.assertTrue(source_issues(self.root)[0])

    def test_missing_and_wrong_expected_page_fail(self):
        (self.root / 'ci/expected-pages.json').write_text(json.dumps({'articles/sorti/how.md': '/docs/sorti/how/'}))
        self.assertTrue(expected_issues(self.root, []))
        self.assertTrue(expected_issues(self.root, [{'path': 'articles/sorti/how.md', 'permalink': BASE+'sorti/'}]))
        self.assertFalse(expected_issues(self.root, [{'path': 'articles/sorti/how.md', 'permalink': BASE+'sorti/how/'}]))

    def test_output_paths_and_external_links(self):
        self.assertEqual(output_file(self.public, BASE, BASE+'sorti/'), self.public/'sorti/index.html')
        self.assertIsNone(output_file(self.public, BASE, 'https://example.com/docs/test/'))
        self.assertIsNone(output_file(self.public, BASE, 'https://www.sitebay.org/signup'))
        with self.assertRaises(ValueError):
            output_file(self.public, BASE, BASE+'%2e%2e/private')

    def test_prose_scope_and_void_elements(self):
        parsed = PageHTML('<a href="/outside">header</a><div class="prose"><img src="a"><a href="/inside">body</a><h2 id="here">Heading</h2></div><a href="/footer">footer</a>')
        self.assertEqual(parsed.links, {'/inside'})
        self.assertIn('here', parsed.ids)

    def test_broken_link_and_fragment_mutations_are_caught(self):
        (self.public / 'test').mkdir()
        page = self.public / 'test/index.html'
        rows = [{'path': 'articles/test.md', 'permalink': BASE+'test/'}]
        page.write_text('<div class="prose"><h2 id="works">Good</h2><a href="#works">ok</a></div>')
        self.assertEqual(rendered_issues(self.root, self.public, rows, BASE), ([], 1))
        page.write_text('<div class="prose"><a href="#missing">bad</a><a href="/docs/gone/">bad</a></div>')
        issues, count = rendered_issues(self.root, self.public, rows, BASE)
        self.assertEqual(count, 2)
        self.assertEqual(len(issues), 2)

    def test_search_index_missing_page_and_empty_index_fail(self):
        source = "articles/sorti/how.md"
        url = "/docs/sorti/how/"
        (self.root / "ci/expected-pages.json").write_text(json.dumps({source: url}))
        rows = [{"path": source, "kind": "page"}]
        self.assertTrue(search_issues(self.root, self.public, rows))
        (self.public / "index.json").write_text("[]")
        self.assertTrue(search_issues(self.root, self.public, rows))
        (self.public / "index.json").write_text(json.dumps([{"href": "/docs/other/"}]))
        self.assertTrue(search_issues(self.root, self.public, rows))
        (self.public / "index.json").write_text(json.dumps([{"href": url}]))
        self.assertFalse(search_issues(self.root, self.public, rows))

    def test_missing_build_never_passes(self):
        (self.public / 'index.html').unlink()
        self.assertTrue(rendered_issues(self.root, self.public, [], BASE)[0])

    def test_editorial_ratchet_catches_added_whitespace(self):
        self.article('---\ntitle: Test\n---\nText\n')
        before = collect(self.root)
        self.article('---\ntitle: Test\n---\nText  \n')
        added = collect(self.root) - before
        self.assertTrue(any(key[1] == 'trailing_whitespace' for key in added))
        self.assertEqual(canonical('articles/sorti/index.md'), canonical('articles/sorti/_index.md'))


class SyncTests(unittest.TestCase):
    def test_sync_preserves_config_ci_admin_and_local_overrides(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            script = root/'scripts/sync-upstream-theme.sh'
            script.parent.mkdir()
            original = Path(__file__).resolve().parents[2]/'scripts/sync-upstream-theme.sh'
            shutil.copyfile(original, script)
            upstream = root/'_vendor/github.com/linode/linode-docs-theme'
            local = root/'_vendor/github.com/sitebay/sitebay-docs-theme'
            for relative, data in [('assets/css/test.css', 'new css'), ('config.toml', 'upstream tenant'), ('layouts/test.html', 'upstream layout')]:
                path = upstream/relative
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(data)
            local.mkdir(parents=True)
            (local/'config.toml').write_text('site-owned config')
            (root/'layouts').mkdir()
            (root/'layouts/test.html').write_text('site-owned override')
            (root/'ci').mkdir()
            (root/'ci/check-links.py').write_text('site-owned checker')
            subprocess.run(['git', 'init', '-q', str(root)], check=True)
            subprocess.run(['git', 'add', '.'], cwd=root, check=True)
            subprocess.run(['git', '-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-qm', 'fixture'], cwd=root, check=True)
            dry = subprocess.run(['bash', str(script), '--dry-run', '--ref', 'HEAD'], cwd=root, capture_output=True, text=True, check=True)
            self.assertIn('Presentation candidates: 1;', dry.stdout)
            self.assertFalse((local/'assets/css/test.css').exists())
            subprocess.run(['bash', str(script), '--ref', 'HEAD'], cwd=root, capture_output=True, check=True)
            self.assertEqual((local/'assets/css/test.css').read_text(), 'new css')
            self.assertEqual((local/'config.toml').read_text(), 'site-owned config')
            self.assertEqual((root/'layouts/test.html').read_text(), 'site-owned override')
            self.assertEqual((root/'ci/check-links.py').read_text(), 'site-owned checker')
            self.assertFalse((local/'layouts/test.html').exists())
            bad = subprocess.run(['bash', str(script), '--ref', 'not-a-revision'], cwd=root, capture_output=True)
            self.assertNotEqual(bad.returncode, 0)


if __name__ == '__main__':
    unittest.main()
