import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('browser_coverage', Path(__file__).resolve().parents[1] / 'browser-coverage.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class BrowserCoverageTests(unittest.TestCase):
    def report(self, pages):
        return {'passed': True, 'pages': pages, 'viewports': [{'width': 320, 'route': '/docs/a/', 'overflow': False}],
                'navigationClick': True, 'errors': [], 'missingAssets': [],
                'searchChecks': [{'query': q, 'results': 1, 'clicked': True} for q in ['Forge', 'API key', 'pgvector']],
                'searchKeyboard': True, 'searchSectionFilter': True, 'noJavaScriptReading': True}

    def test_complete_coverage_passes(self):
        result = module.combine([self.report(['/docs/a/']), self.report(['/docs/b/'])], {'/docs/a/', '/docs/b/'})
        self.assertTrue(result['passed'])
        self.assertEqual(result['checked_routes'], 2)

    def test_search_and_accessibility_evidence_is_required(self):
        for field, value in [('searchChecks', []), ('searchKeyboard', False),
                             ('searchSectionFilter', False), ('noJavaScriptReading', False)]:
            with self.subTest(field=field):
                with self.assertRaises(ValueError):
                    module.combine([{**self.report(['/docs/a/']), field: value}], {'/docs/a/'})

    def test_missing_duplicate_and_failed_reports_fail(self):
        for reports, expected in [
            ([self.report(['/docs/a/'])], {'/docs/a/', '/docs/b/'}),
            ([self.report(['/docs/a/']), self.report(['/docs/a/'])], {'/docs/a/'}),
            ([{**self.report(['/docs/a/']), 'passed': False}], {'/docs/a/'}),
            ([{**self.report(['/docs/a/']), 'errors': ['error']}], {'/docs/a/'}),
            ([{**self.report(['/docs/a/']), 'viewports': []}], {'/docs/a/'}),
            ([{**self.report(['/docs/a/']), 'navigationClick': False}], {'/docs/a/'})
        ]:
            with self.subTest(reports=reports):
                with self.assertRaises(ValueError):
                    module.combine(reports, expected)


if __name__ == '__main__':
    unittest.main()
