"""Verify that article changes retain a review record and a known source basis.

Hashes detect unreviewed drift; they do not replace a factual review. Update the
record only after reviewing the changed content against its named sources.
"""
from __future__ import annotations
import argparse
from hashlib import sha256
import json
from pathlib import Path
from publishing import ROOT, parse_metadata


def review_issues(root: Path) -> tuple[list[str], int]:
    audit = json.loads((root/'ci/content-review.json').read_text())
    sources = json.loads((root/'ci/source-registry.json').read_text())['sources']
    entries = audit['articles']
    paths = {p.relative_to(root).as_posix():p for p in (root/'articles').rglob('*.md')}
    issues = []
    for missing in sorted(paths.keys() - entries.keys()):
        issues.append(f'{missing}: no review record')
    for removed in sorted(entries.keys() - paths.keys()):
        issues.append(f'{removed}: review record has no source file')
    for name in sorted(paths.keys() & entries.keys()):
        path, entry = paths[name], entries[name]
        metadata, body = parse_metadata(path.read_text())
        if not body.strip():
            issues.append(f'{name}: empty article')
        if sha256(path.read_bytes()).hexdigest() != entry['file_sha256']:
            issues.append(f'{name}: content changed after review')
        basis = metadata.get('doc_sources',[])
        if not basis or basis != entry['basis']:
            issues.append(f'{name}: missing or mismatched source basis')
        for key in basis:
            if key not in sources or not (sources[key].get('files') or sources[key].get('urls')):
                issues.append(f'{name}: unknown or empty source {key}')
        if not entry.get('change'):
            issues.append(f'{name}: review must describe the change')
    return issues, len(paths)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--report',type=Path)
    args = parser.parse_args()
    issues, count = review_issues(ROOT)
    report = {'reviewed_sources':count,'issues':issues}
    if args.report:
        args.report.parent.mkdir(parents=True,exist_ok=True)
        args.report.write_text(json.dumps(report,indent=2)+'\n')
    print(f'Reviewed sources: {count}; issues: {len(issues)}')
    for issue in issues:print(issue)
    return 1 if issues else 0


if __name__ == '__main__':
    raise SystemExit(main())
