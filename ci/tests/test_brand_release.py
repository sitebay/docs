import json
from pathlib import Path
import sys
import tempfile
import unittest
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from legacy_routes import build
from current_brand import check

class BrandReleaseTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory();self.addCleanup(self.temp.cleanup)
        self.root=Path(self.temp.name);self.public=self.root/'public'
        (self.public/'sorti').mkdir(parents=True);(self.root/'data').mkdir()
        (self.root/'articles').mkdir();(self.root/'articles/example.md').write_text('# Sorti\n')
        (self.public/'sorti/index.html').write_text('<h1>Sorti</h1>')
        (self.root/'config.toml').write_text('baseURL="https://www.sitebay.org/docs/"\n')
        self.routes={'/docs/siteclaw/':'/docs/sorti/'};self.save()
    def save(self):
        (self.root/'data/legacy-doc-routes.json').write_text(json.dumps(self.routes))
    def test_redirect_is_current_only_nonindexable_and_repeatable(self):
        build(self.root,self.public);p=self.public/'siteclaw/index.html';first=p.read_text()
        self.assertIn('content="noindex"',first);self.assertNotIn('siteclaw',first.lower())
        build(self.root,self.public);self.assertEqual(first,p.read_text());self.assertEqual(check(self.root,self.public)['issues'],[])
    def test_brand_rejects_article_body_and_path(self):
        (self.root/'articles/siteclaw.md').write_text('# SiteClaw\n')
        self.assertEqual(len(check(self.root)['issues']),2)
    def test_brand_rejects_raw_corpus_alias_leakage(self):
        (self.public/'corpus.json').write_text('{"raw":"aliases: /products/siteclaw/"}')
        self.assertTrue(check(self.root,self.public)['issues'])
    def test_old_route_must_not_be_a_real_article(self):
        p=self.public/'siteclaw/index.html';p.parent.mkdir();p.write_text('<h1>Old article</h1>')
        with self.assertRaisesRegex(ValueError,'collides'):build(self.root,self.public)
        self.assertIn('Old article',p.read_text())
        self.assertTrue(check(self.root,self.public)['issues'])
    def test_missing_target_does_not_write_partial_map(self):
        self.routes['/docs/second/']='/docs/missing/';self.save()
        with self.assertRaisesRegex(ValueError,'destination'):build(self.root,self.public)
        self.assertFalse((self.public/'siteclaw/index.html').exists())
    def test_chain_or_external_target_refused(self):
        for routes in [{'/docs/siteclaw/':'/docs/siteclaw/'},{'/docs/siteclaw/':'https://other.example/'},{'/docs/siteclaw/':'/elsewhere/'},{'/docs/siteclaw/':'/docs/../outside/'}]:
            self.routes=routes;self.save()
            with self.assertRaises(ValueError):build(self.root,self.public)
    def test_visible_old_brand_not_allowed_inside_redirect(self):
        build(self.root,self.public);p=self.public/'siteclaw/index.html';p.write_text(p.read_text().replace('Sorti documentation','SiteClaw'))
        self.assertTrue(check(self.root,self.public)['issues'])
