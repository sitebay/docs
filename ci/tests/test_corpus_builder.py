"""Source-line and publication boundaries of the human/agent shared corpus."""
import importlib.util
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('build_docs_corpus', Path(__file__).resolve().parents[1] / 'scripts/build-docs-corpus.py')
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)


class CorpusBuilderTests(unittest.TestCase):
    def test_exact_source_lines_and_provider_attribution(self):
        raw = '---\ntitle: External reference\nauthors: [Akamai]\nlicense: CC BY-ND 4.0\n---\n\nIntroduction.\n\n## Read first\nKeep this text unchanged.\n'
        doc = builder.document(raw, 'linode', 'docs/guides/example.md', 'https://example.test', 'a'*40, 'linode/docs')
        self.assertEqual(doc['raw'], raw)
        self.assertEqual(doc['body_start'], 7)
        self.assertEqual(doc['authority'], 'external-reference')
        self.assertEqual(doc['license'], 'CC BY-ND 4.0')
        self.assertEqual(doc['authors'], ['Akamai'])
        for chunk in doc['chunks']:
            self.assertEqual(chunk['text'], '\n'.join(raw.splitlines()[chunk['line_start']-1:chunk['line_end']]))
            self.assertEqual(chunk['sha256'], builder.digest(chunk['text']))

    def test_code_headings_do_not_become_sections(self):
        raw = '## Procedure\n```sh\n# Not a document heading\nprintf hello\n```\n\n## Verify\nRead the result.\n'
        chunks = builder.chunks(raw, 1, 'sitebay:test', 'Example')
        self.assertEqual([c['heading'] for c in chunks], ['Procedure', 'Verify'])
        self.assertIn('# Not a document heading', chunks[0]['text'])

    def test_long_chunks_keep_source_line_ranges(self):
        raw = '\n'.join('line '+str(i) for i in range(260))
        chunks = builder.chunks(raw, 1, 'sitebay:test', 'Long example')
        self.assertTrue(all(c['line_end']-c['line_start'] < 100 for c in chunks))
        self.assertEqual('\n'.join(c['text'] for c in chunks), raw)

    def make_repo(self, root):
        subprocess.run(['git','init','-q',str(root)], check=True)
        (root/'articles').mkdir()
        for name, extra in [('visible',''),('hidden','headless: true\n'),('draft','draft: true\n')]:
            (root/f'articles/{name}.md').write_text(f'---\ntitle: {name}\n{extra}---\n\nA useful reference.\n')
        subprocess.run(['git','-C',str(root),'add','articles'], check=True)
        subprocess.run(['git','-C',str(root),'-c','user.name=Fixture','-c','user.email=fixture@example.test','-c','core.hooksPath=/dev/null','commit','-qm','fixture'], check=True)
        return [{'path':f'articles/{name}.md','permalink':f'https://example.test/docs/{name}/'} for name in ['visible','hidden','draft']]

    def test_published_inventory_excludes_headless_and_draft(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder); rows=self.make_repo(root)
            with patch.object(builder, 'inventory', return_value=rows):
                corpus=builder.build(root,'unused')
            self.assertEqual(len(corpus['documents']),1)
            self.assertEqual(len(corpus['git_revision']),40)
            self.assertIn(corpus['git_revision'],corpus['documents'][0]['source']['url'])

    def test_dirty_sources_do_not_claim_committed_citations(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder); rows=self.make_repo(root)
            (root/'articles/visible.md').write_text('Uncommitted changes.\n')
            with patch.object(builder, 'inventory', return_value=rows):
                corpus=builder.build(root,'unused')
            self.assertIsNone(corpus['git_revision'])
            self.assertIsNone(corpus['documents'][0]['source']['url'])

    def test_symlink_source_is_rejected(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder); rows=self.make_repo(root)
            (root/'outside.md').write_text('Not public.\n')
            (root/'articles/link.md').symlink_to(root/'outside.md')
            rows.insert(0, {'path':'articles/link.md','permalink':'https://example.test/docs/link/'})
            with patch.object(builder,'inventory',return_value=rows):
                with self.assertRaisesRegex(ValueError,'Unsafe source path'):
                    builder.build(root,'unused')


if __name__ == '__main__':
    unittest.main()
