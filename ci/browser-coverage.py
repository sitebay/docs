"""Combine disjoint browser shards and reject missing, repeated or failed routes."""
from __future__ import annotations
import argparse
from collections import Counter
import json
import os
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]


def combine(reports: list[dict], expected: set[str]) -> dict:
    if not expected or not reports:
        raise ValueError('Expected routes and browser reports must be nonempty')
    counts = Counter(page for report in reports for page in report['pages'])
    if set(counts) != expected or any(count != 1 for count in counts.values()):
        raise ValueError('Browser coverage has missing, unexpected or repeated routes')
    if any(not report.get('passed') or report.get('errors') or report.get('missingAssets') for report in reports):
        raise ValueError('A browser shard failed or reported runtime/resource errors')
    viewports = [case for report in reports for case in report.get('viewports', [])]
    if not viewports or any(case.get('overflow') for case in viewports):
        raise ValueError('Viewport checks are missing or show horizontal overflow')
    if not any(report.get('navigationClick') is True for report in reports):
        raise ValueError('No successful navigation click was recorded')
    searches = [case for report in reports for case in report.get('searchChecks', [])]
    if not {'Forge', 'API key', 'pgvector'}.issubset({case.get('query') for case in searches}):
        raise ValueError('Required real search queries were not checked')
    if any(not case.get('clicked') or case.get('results', 0) < 1 for case in searches):
        raise ValueError('A real search query or result click failed')
    for field in ('searchKeyboard', 'searchSectionFilter', 'noJavaScriptReading', 'searchReopen'):
        if not any(report.get(field) is True for report in reports):
            raise ValueError(f'Missing browser verification: {field}')
    return {'passed': True, 'published_routes': len(expected), 'checked_routes': sum(counts.values()),
            'pages': sorted(counts), 'viewport_cases': viewports, 'navigation_click': True,
            'errors': [], 'missing_assets': [], 'shards': len(reports),
            'search_checks': searches, 'keyboard': True, 'search_reopen': True,
            'no_javascript_reading': any(report.get('noJavaScriptReading') for report in reports),
            'section_filter': any(report.get('searchSectionFilter') for report in reports),
            'scope': 'Production export with real local Pagefind; unrelated external embeds replaced by fixtures.'}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('reports', nargs='+', type=Path)
    parser.add_argument('--report', type=Path, required=True)
    args = parser.parse_args()
    try:
        expected = set(json.loads(subprocess.check_output(
            [os.environ.get('PYTHON', 'python3'), 'ci/scripts/list-page-routes.py'], cwd=ROOT, text=True)))
        result = combine([json.loads(path.read_text()) for path in args.reports], expected)
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(json.dumps(result, indent=2) + '\n')
        print(f"Browser coverage: {result['checked_routes']}/{result['published_routes']} routes; "
              f"{len(result['viewport_cases'])} viewport checks; zero runtime errors")
        return 0
    except (OSError, ValueError, KeyError, subprocess.CalledProcessError) as error:
        parser.exit(1, str(error) + '\n')


if __name__ == '__main__':
    raise SystemExit(main())
