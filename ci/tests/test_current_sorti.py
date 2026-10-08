import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
import yaml
ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('redirect_check', ROOT/'ci/check-redirects.py')
redirects = importlib.util.module_from_spec(spec); spec.loader.exec_module(redirects)

class CurrentSortiTests(unittest.TestCase):
    def test_current_brand_metadata(self):
        for p in (ROOT/'articles').rglob('*'):
            if p.is_file() and p.suffix in ('.md','.json','.svg'):
                self.assertNotIn('siteclaw', p.read_text().lower(), str(p))
                self.assertNotIn('siteclaw', p.relative_to(ROOT).as_posix().lower())
        expected=json.loads((ROOT/'ci/expected-redirects.json').read_text())
        self.assertEqual(expected,json.loads((ROOT/'data/legacy-doc-routes.json').read_text()))
    def test_machine_identifiers_survive_brand_change(self):
        settings = (ROOT/'articles/vscode/settings.md').read_text()
        for key in ['sitebay.roomName','sitebay.serverUrl','sitebay.mcpProxy.enabled']:
            self.assertIn(key, settings)
        hooks = (ROOT/'articles/products/sorti/signal-hooks/index.md').read_text()
        for channel in ['git_changed','editor_signal','ExternalSignal']: self.assertIn(channel, hooks)
    def test_alias_targets_are_verified(self):
        with tempfile.TemporaryDirectory() as folder:
            output = Path(folder); old = output/'old/index.html'; new = output/'new/index.html'
            old.parent.mkdir(); new.parent.mkdir(); new.write_text('Current page')
            old.write_text('<link rel="canonical" href="https://www.sitebay.org/docs/new/"><meta http-equiv="refresh" content="0; url=https://www.sitebay.org/docs/new/">')
            self.assertEqual(redirects.check(output, {'/docs/old/':'/docs/new/'}), [])
            self.assertTrue(redirects.check(output, {'/docs/old/':'/docs/missing/'}))
            old.write_text('<link rel="canonical" href="https://other.example/">')
            self.assertTrue(redirects.check(output, {'/docs/old/':'/docs/new/'}))

if __name__ == '__main__': unittest.main()
