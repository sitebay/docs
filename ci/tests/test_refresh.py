import hashlib
import importlib.util
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from content_review import review_issues
from publishing import source_issues, search_issues

ROOT=Path(__file__).resolve().parents[2]
def load_script(name):
 spec=importlib.util.spec_from_file_location(name,ROOT/'ci/scripts'/f'{name}.py')
 mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod);return mod
api=load_script('sync-api-catalog')
knowledge=load_script('build-knowledge-index')

class ReviewTests(unittest.TestCase):
 def setUp(self):
  self.temp=tempfile.TemporaryDirectory();self.addCleanup(self.temp.cleanup);self.root=Path(self.temp.name)
  (self.root/'articles').mkdir();(self.root/'ci').mkdir()
  self.file=self.root/'articles/page.md';self.file.write_text('---\ntitle: Test\ndoc_sources: [contract]\n---\n\nTest body.\n')
  entry={'file_sha256':hashlib.sha256(self.file.read_bytes()).hexdigest(),'basis':['contract'],'change':'Review the test contract.'}
  (self.root/'ci/content-review.json').write_text(json.dumps({'articles':{'articles/page.md':entry}}))
  (self.root/'ci/source-registry.json').write_text(json.dumps({'sources':{'contract':{'urls':['https://example.com/contract']}}}))
 def test_review_accepts_exact_content(self):self.assertEqual(review_issues(self.root),([],1))
 def test_new_file_requires_review(self):
  (self.root/'articles/new.md').write_text('New file')
  self.assertIn('no review record',' '.join(review_issues(self.root)[0]))
 def test_changed_text_requires_review(self):
  self.file.write_text(self.file.read_text()+'An unsupported promise.\n')
  self.assertIn('changed after review',' '.join(review_issues(self.root)[0]))
 def test_unknown_source_fails(self):
  (self.root/'ci/source-registry.json').write_text('{"sources":{}}')
  self.assertIn('unknown or empty source',' '.join(review_issues(self.root)[0]))
 def test_empty_reviewed_body_fails(self):
  self.file.write_text('---\ntitle: Test\ndoc_sources: [contract]\n---\n')
  self.assertIn('empty article',' '.join(review_issues(self.root)[0]))
 def test_conflicting_bundle_is_rejected(self):
  (self.root/'articles/index.md').write_text('---\ntitle: Leaf\n---\nLeaf')
  (self.root/'articles/_index.md').write_text('---\ntitle: Section\n---\nSection')
  self.assertTrue(any('ambiguous' in issue.reason for issue in source_issues(self.root)[0]))
 def test_new_regular_page_must_be_searchable(self):
  public=self.root/'public';public.mkdir();(public/'index.json').write_text('[{"href":"/docs/other/"}]')
  (self.root/'ci/expected-pages.json').write_text('{}')
  rows=[{'path':'articles/page.md','kind':'page','permalink':'https://www.sitebay.org/docs/page/'}]
  self.assertTrue(search_issues(self.root,public,rows))
  (public/'index.json').write_text('[{"href":"/docs/page/"}]')
  self.assertFalse(search_issues(self.root,public,rows))

class GeneratorTests(unittest.TestCase):
 def test_api_refuses_empty_contract(self):
  with self.assertRaises(ValueError):api.make_catalog(b'{"paths":{}}')
 def test_api_limits_scope_and_retains_required_parameters(self):
  operation={'tags':['account'],'summary':'Read account','parameters':[{'name':'test','in':'query','required':True}],'responses':{'200':{}}}
  raw=json.dumps({'paths':{'/f/api/v1/account/me':{'get':operation},'/internal/account/me':{'get':operation},'/f/api/v1/admin/secret':{'get':operation}}}).encode()
  out=api.make_catalog(raw)
  self.assertEqual(len(out['operations']),1);self.assertEqual(out['operations'][0]['path'],'/f/api/v1/account/me')
  self.assertTrue(out['operations'][0]['parameters'][0]['required'])
  self.assertEqual(out['source_sha256'],hashlib.sha256(raw).hexdigest())
 def test_knowledge_retains_body_and_resolves_real_routes(self):
  with tempfile.TemporaryDirectory() as d:
   root=Path(d);(root/'articles').mkdir()
   (root/'articles/test.md').write_text('---\ntitle: Test\ndescription: A useful guide\nbible: true\n---\n\nRead [Next]({{< relref "next.md" >}}).\n')
   routes={'articles/test.md':'https://www.sitebay.org/docs/test/','articles/next.md':'https://www.sitebay.org/docs/next/'}
   records=knowledge.build_index(root,routes);self.assertEqual(len(records),1)
   self.assertIn('https://www.sitebay.org/docs/next/',records[0]['content'])
   self.assertEqual(records[0]['url'],routes['articles/test.md'])
   with self.assertRaises(ValueError):knowledge.build_index(root,{'articles/test.md':routes['articles/test.md']})
 def test_knowledge_does_not_accept_empty_curated_article(self):
  with tempfile.TemporaryDirectory() as d:
   root=Path(d);(root/'articles').mkdir();(root/'articles/test.md').write_text('---\ntitle: Test\nbible: true\n---\n')
   with self.assertRaises(ValueError):knowledge.build_index(root,{'articles/test.md':'/docs/test/'})

class ShortcodeTests(unittest.TestCase):
 def test_real_shortcodes_build_and_reject_invalid_rating(self):
  hugo=os.environ.get('HUGO_BIN','hugo')
  with tempfile.TemporaryDirectory() as d:
   root=Path(d);(root/'layouts/shortcodes').mkdir(parents=True);(root/'layouts/_default').mkdir();(root/'content').mkdir()
   (root/'hugo.toml').write_text('baseURL = "https://example.invalid/"\n')
   (root/'layouts/_default/single.html').write_text('{{ .Content }}')
   for name in ['browser-mockup','deal-card']:
    shutil.copyfile(ROOT/f'layouts/shortcodes/{name}.html',root/f'layouts/shortcodes/{name}.html')
   content=root/'content/test.md'
   text='---\ntitle: Fixture\n---\n{{< browser-mockup page="dashboard" >}}\n{{< deal-card face="$1" notional="$1" stars_face="3" >}}\n'
   content.write_text(text)
   good=subprocess.run([hugo,'--source',str(root)],capture_output=True,text=True)
   self.assertEqual(good.returncode,0,good.stderr)
   self.assertIn('Editorial rating: 3', (root/'public/test/index.html').read_text())
   content.write_text(text.replace('stars_face="3"','stars_face="6"'))
   bad=subprocess.run([hugo,'--source',str(root)],capture_output=True,text=True)
   self.assertNotEqual(bad.returncode,0)
   self.assertIn('between 0 and 5',bad.stdout+bad.stderr)

if __name__=='__main__':unittest.main()
